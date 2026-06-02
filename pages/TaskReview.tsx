import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, CheckCircle2, XCircle, UserCheck, Save,
  Send, Bot, User, Sparkles, RefreshCw, ThumbsUp, ThumbsDown,
  ChevronDown, ChevronUp, Layers, Users, MessageSquare, X,
  AlertTriangle, ShieldAlert, Quote,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { getTaskById } from '@/lib/mock-data/tasks'
import { getRegulationById } from '@/lib/mock-data/regulations'
import { getPolicyById } from '@/lib/mock-data/policies'
import { getUserById } from '@/lib/mock-data/users'
import { getConversationByTaskId, followUpResponses } from '@/lib/mock-data/ai-conversations'
import { getAlternativesByTaskId, type AlternativeRecommendation } from '@/lib/mock-data/alternatives'
import { getPeopleImpactByRegulation } from '@/lib/mock-data/people-impact'
import type { AIMessage } from '@/lib/mock-data/ai-conversations'
import { severityBadge, priorityBadge, formatDate, formatDeadlineCountdown } from '@/lib/display-utils'

const VARIANT_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  'phased-rollout': { color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
  'stricter':       { color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' },
  'minimal-change': { color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
}

function AlternativeCard({ alt, onAccept, onReject }: {
  alt: AlternativeRecommendation
  onAccept: () => void
  onReject: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const style = VARIANT_STYLES[alt.variant]

  return (
    <div className={`rounded-xl border ${style.border} ${style.bg} p-4`}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <span className={`text-xs font-bold ${style.color}`}>{alt.label}</span>
          <p className="text-[11px] text-muted-foreground mt-0.5">{alt.tagline}</p>
        </div>
        <button onClick={() => setExpanded(e => !e)} className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors shrink-0">
          {expanded ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
          {expanded ? 'Less' : 'Details'}
        </button>
      </div>

      <div className="rounded-lg border border-white/70 bg-white/70 p-3 text-xs leading-relaxed">
        <span className="line-through text-red-600/70">{alt.proposedEdit.original}</span>
        <span className="text-muted-foreground mx-1">→</span>
        <span className={`font-medium ${style.color}`}>{alt.proposedEdit.revised}</span>
      </div>

      {expanded && (
        <div className="mt-3 space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">{alt.rationale}</p>
          <div className="grid grid-cols-2 gap-2">
            {alt.tradeoffs.map((t, i) => (
              <div key={i} className={`rounded-lg border p-2.5 text-[11px] leading-snug ${
                i % 2 === 0
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                  : 'border-amber-200 bg-amber-50 text-amber-800'
              }`}>
                <span className="font-bold block mb-0.5">{i % 2 === 0 ? '✓' : '✗'}</span>
                {i % 2 === 0 ? t.pro : t.con}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-3 flex gap-2 pt-2.5 border-t border-white/60">
        <Button size="sm" variant="outline" className="h-7 text-xs gap-1 flex-1 text-red-600 border-red-200 hover:bg-red-50" onClick={onReject}>
          <ThumbsDown className="size-3" /> Reject
        </Button>
        <Button size="sm" className="h-7 text-xs gap-1 flex-[2]" onClick={onAccept}>
          <ThumbsUp className="size-3" /> Accept this variant
        </Button>
      </div>
    </div>
  )
}

export default function TaskReview() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [highlightedPara, setHighlightedPara] = useState<string | null>(null)
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [chatInput, setChatInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [responseIdx, setResponseIdx] = useState(0)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [showAlternatives, setShowAlternatives] = useState(false)
  const [generatingAlts, setGeneratingAlts] = useState(false)
  const [showPeopleImpact, setShowPeopleImpact] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const regParaRefs = useRef<Record<string, HTMLParagraphElement>>({})

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false)
      const conv = getConversationByTaskId(id!)
      if (conv) setMessages(conv.messages)
    }, 300)
    return () => clearTimeout(t)
  }, [id])

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const task = getTaskById(id!)
  const reg = task ? getRegulationById(task.regulationId) : undefined
  const policy = task ? getPolicyById(task.policyId) : undefined
  const assignee = task ? getUserById(task.assignedToId) : undefined
  const suggestedOwner = task ? getUserById(task.aiRecommendation.suggestedOwnerId) : undefined
  const altsData = id ? getAlternativesByTaskId(id) : undefined
  const peopleImpact = reg ? getPeopleImpactByRegulation(reg.id) : undefined

  const highlightCitation = (idx: number) => {
    const paraKey = `reg-para-${idx}`
    setHighlightedPara(paraKey)
    regParaRefs.current[paraKey]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => setHighlightedPara(null), 3000)
  }

  const sendMessage = async () => {
    if (!chatInput.trim()) return
    const userMsg: AIMessage = { role: 'user', content: chatInput, timestamp: new Date().toISOString() }
    setMessages(prev => [...prev, userMsg])
    setChatInput('')
    setIsSending(true)
    await new Promise(r => setTimeout(r, 900))
    const aiMsg: AIMessage = {
      role: 'assistant',
      content: followUpResponses[responseIdx % followUpResponses.length],
      timestamp: new Date().toISOString(),
    }
    setMessages(prev => [...prev, aiMsg])
    setResponseIdx(i => i + 1)
    setIsSending(false)
  }

  const generateAlternatives = async () => {
    setGeneratingAlts(true)
    await new Promise(r => setTimeout(r, 1200))
    setGeneratingAlts(false)
    setShowAlternatives(true)
    toast.success('3 alternative variants generated', { description: 'Based on regulatory text and risk tolerance.' })
  }

  const handleAccept = () => {
    toast.success('Recommendation accepted', { description: 'Policy queued for version update.' })
    navigate('/tasks')
  }

  const handleReject = () => {
    if (!rejectReason.trim()) return
    toast.error('Recommendation rejected', { description: rejectReason })
    setShowRejectModal(false)
    setRejectReason('')
    navigate('/tasks')
  }

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="grid grid-cols-3 gap-4 h-[calc(100vh-180px)]">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-full rounded-xl" />)}
        </div>
      </div>
    )
  }

  if (!task || !reg || !policy) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground text-sm">Task not found.</p>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate('/tasks')}>← Back</Button>
      </div>
    )
  }

  const regParagraphs = reg.body.split('\n\n').filter(Boolean)
  const countdown = formatDeadlineCountdown(task.deadline)
  const affectedSection = policy.sections[1] ?? policy.sections[0]

  return (
    <div className="flex h-[calc(100vh-56px)] flex-col bg-background">

      {/* ── Header ── */}
      <div className="flex items-center gap-3 border-b border-border bg-background px-5 py-2.5 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground shrink-0"
          onClick={() => navigate('/tasks')}
        >
          <ArrowLeft className="size-3.5" /> Back
        </Button>
        <Separator orientation="vertical" className="h-5 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold truncate leading-tight">{task.title}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[11px] text-muted-foreground">{reg.regulator}</span>
            <span className="text-muted-foreground/40 text-xs">·</span>
            <Badge variant="outline" className={`text-[10px] h-4 px-1.5 capitalize ${severityBadge(reg.severity)}`}>{reg.severity}</Badge>
            <Badge variant="outline" className={`text-[10px] h-4 px-1.5 capitalize ${priorityBadge(task.priority)}`}>{task.priority}</Badge>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {peopleImpact && (
            <Button
              variant="outline"
              size="sm"
              className={`h-7 text-xs gap-1.5 transition-colors ${showPeopleImpact ? 'border-amber-300 bg-amber-50 text-amber-700' : ''}`}
              onClick={() => setShowPeopleImpact(v => !v)}
            >
              <Users className="size-3.5" />
              {peopleImpact.totalHeadcount} affected
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className={`h-7 text-xs gap-1.5 transition-colors ${showChat ? 'border-primary/40 bg-primary/5 text-primary' : ''}`}
            onClick={() => setShowChat(v => !v)}
          >
            <MessageSquare className="size-3.5" />
            AI Chat
          </Button>
          <Separator orientation="vertical" className="h-5" />
          <div className="flex items-center gap-1.5">
            <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary shrink-0">
              {assignee?.initials}
            </div>
            <span className="text-xs text-muted-foreground hidden sm:block">{assignee?.name.split(' ')[0]}</span>
          </div>
          <span className={`text-xs font-semibold ${countdown.color}`}>{countdown.label}</span>
        </div>
      </div>

      {/* ── People impact strip ── */}
      {showPeopleImpact && peopleImpact && (
        <div className="flex items-center gap-4 overflow-x-auto border-b border-amber-200 bg-amber-50 px-5 py-2.5 shrink-0">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 shrink-0">
            <Users className="size-3.5 text-amber-500" />
            {peopleImpact.totalHeadcount} employees affected
          </span>
          <div className="h-4 w-px bg-amber-200 shrink-0" />
          <div className="flex items-center gap-2">
            {peopleImpact.departments.map(d => (
              <span key={d.name} className="shrink-0 rounded-full border border-amber-200 bg-white/70 px-2.5 py-0.5 text-[11px] font-medium text-amber-800">
                {d.name} ({d.headcount})
              </span>
            ))}
          </div>
          <div className="h-4 w-px bg-amber-200 shrink-0" />
          <span className="text-[11px] text-amber-700 shrink-0">
            {peopleImpact.training.filter(t => t.mandatory).length} mandatory training modules · due {formatDate(peopleImpact.training[0]?.deadline)}
          </span>
        </div>
      )}

      {/* ── Three-column workspace ── */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* Left — Regulatory text */}
        <div className="flex w-[30%] flex-col border-r border-border min-h-0 overflow-hidden">
          <div className="flex items-center gap-2.5 border-b border-border bg-blue-50/60 px-4 py-3 shrink-0">
            <div className="flex size-7 items-center justify-center rounded-lg bg-blue-100 shrink-0">
              <span className="text-sm">📋</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-blue-900 leading-tight">Regulatory text</p>
              <p className="text-[11px] text-blue-500 truncate">{reg.regulator}</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="p-5 space-y-3">
              {regParagraphs.map((para, i) => {
                const paraKey = `reg-para-${i}`
                const isCited = task.aiRecommendation.citations.some((_, ci) => ci === i)
                const isHighlighted = highlightedPara === paraKey
                return (
                  <p
                    key={i}
                    ref={el => { if (el) regParaRefs.current[paraKey] = el }}
                    className={`text-xs leading-relaxed transition-all duration-500 rounded-lg px-2.5 py-1 -mx-2.5 ${
                      isHighlighted
                        ? 'bg-amber-100 ring-1 ring-amber-300 text-foreground'
                        : isCited
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {isCited && !isHighlighted && (
                      <span className="mr-1.5 inline-flex size-1.5 rounded-full bg-blue-500 align-middle" />
                    )}
                    {para}
                  </p>
                )
              })}
            </div>
          </div>
        </div>

        {/* Middle — AI recommendation */}
        <div className="flex w-[38%] flex-col border-r border-border min-h-0 overflow-hidden">
          <div className="flex items-center gap-2.5 border-b border-border bg-primary/5 px-4 py-3 shrink-0">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/15 shrink-0">
              <Bot className="size-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-primary leading-tight">AI recommendation</p>
              <p className="text-[11px] text-primary/60">
                PolicyPulse AI · Avg confidence{' '}
                <span className="font-bold text-primary">
                  {Math.round(
                    (task.aiRecommendation.citations.reduce((s, c) => s + c.confidence, 0) /
                      task.aiRecommendation.citations.length) * 100
                  )}%
                </span>
              </p>
            </div>
            <Sparkles className="size-3.5 text-primary/40 shrink-0" />
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="p-5 space-y-5">

              {/* Why this policy was matched */}
              <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3.5">
                <p className="text-[10px] font-bold uppercase tracking-wide text-blue-500 mb-1.5">Why this policy was matched</p>
                <p className="text-xs text-blue-900 leading-relaxed">{task.aiRecommendation.matchReason}</p>
              </div>

              {/* Triggering clause */}
              <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-3.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Quote className="size-3 text-violet-400" />
                  <p className="text-[10px] font-bold uppercase tracking-wide text-violet-500">Triggering clause</p>
                </div>
                <p className="text-xs text-violet-900 leading-relaxed font-medium">{task.aiRecommendation.triggeringClause}</p>
              </div>

              {/* Proposed change diff */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Proposed change</p>
                <div className="space-y-2">
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-red-400 mb-1.5">Remove</p>
                    <p className="text-xs line-through text-red-700 leading-relaxed">{task.aiRecommendation.proposedEdit.original}</p>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-500 mb-1.5">Replace with</p>
                    <p className="text-xs text-emerald-800 font-medium leading-relaxed">{task.aiRecommendation.proposedEdit.revised}</p>
                  </div>
                </div>
              </div>

              {/* Generate alternatives */}
              <Button
                variant="outline"
                size="sm"
                className="w-full h-8 text-xs gap-2 border-dashed border-primary/40 text-primary hover:bg-primary/5 hover:border-primary/60"
                onClick={generateAlternatives}
                disabled={generatingAlts || showAlternatives}
              >
                {generatingAlts
                  ? <><RefreshCw className="size-3.5 animate-spin" /> Generating...</>
                  : showAlternatives
                  ? <><Layers className="size-3.5" /> Alternatives generated</>
                  : <><Layers className="size-3.5" /> Generate alternative recommendations</>}
              </Button>

              {/* Alternative variant cards */}
              {showAlternatives && altsData && (
                <div className="space-y-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Alternative variants</p>
                  {altsData.alternatives.map(alt => (
                    <AlternativeCard
                      key={alt.variant}
                      alt={alt}
                      onAccept={() => { toast.success(`"${alt.label}" accepted`); navigate('/tasks') }}
                      onReject={() => toast.error(`"${alt.label}" rejected`)}
                    />
                  ))}
                </div>
              )}

              <Separator />

              {/* Risk if ignored */}
              <div className="rounded-xl border border-orange-200 bg-orange-50 p-3.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <ShieldAlert className="size-3.5 text-orange-500" />
                  <p className="text-[10px] font-bold uppercase tracking-wide text-orange-600">Risk if ignored</p>
                </div>
                <p className="text-xs text-orange-900 leading-relaxed">{task.aiRecommendation.riskIfIgnored}</p>
              </div>

              {/* Rationale */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Rationale</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{task.aiRecommendation.rationale}</p>
              </div>

              {/* Citations */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Source citations <span className="normal-case font-normal text-muted-foreground/70">(click to highlight)</span>
                </p>
                <div className="space-y-1.5">
                  {task.aiRecommendation.citations.map((cit, idx) => {
                    const pct = Math.round(cit.confidence * 100)
                    const confColor = pct >= 90 ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
                      : pct >= 80 ? 'text-amber-600 bg-amber-50 border-amber-200'
                      : 'text-red-600 bg-red-50 border-red-200'
                    return (
                      <button
                        key={cit.id}
                        onClick={() => highlightCitation(idx)}
                        className="w-full text-left rounded-lg border border-blue-100 bg-blue-50/60 px-3 py-2.5 text-xs hover:bg-blue-100 transition-colors group"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-bold text-blue-700 group-hover:text-blue-900">{cit.ref}</span>
                          <span className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] font-bold ${confColor}`}>
                            {pct}% confidence
                          </span>
                        </div>
                        <span className="text-muted-foreground/80 italic line-clamp-1">"{cit.text}"</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Uncertainty flags */}
              {task.aiRecommendation.uncertaintyFlags.length > 0 && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5">
                  <div className="flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="size-3.5 text-amber-500" />
                    <p className="text-[10px] font-bold uppercase tracking-wide text-amber-600">Legal / compliance uncertainty</p>
                  </div>
                  <ul className="space-y-1.5">
                    {task.aiRecommendation.uncertaintyFlags.map((flag, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-amber-900 leading-relaxed">
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-amber-400" />
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Separator />

              {/* Meta */}
              <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Suggested owner</span>
                  <div className="flex items-center gap-1.5">
                    <div className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-[8px] font-bold text-primary">
                      {suggestedOwner?.initials}
                    </div>
                    <span className="font-medium">{suggestedOwner?.name}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Recommended deadline</span>
                  <span className={`font-semibold ${countdown.color}`}>{formatDate(task.aiRecommendation.deadline)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Current policy */}
        <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
          <div className="flex items-center gap-2.5 border-b border-border bg-muted/20 px-4 py-3 shrink-0">
            <div className="flex size-7 items-center justify-center rounded-lg bg-muted shrink-0">
              <span className="text-sm">📄</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground leading-tight">Current policy</p>
              <p className="text-[11px] text-muted-foreground truncate">{policy.title}</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="p-5 space-y-3">
              {policy.sections.map(section => (
                <div
                  key={section.id}
                  className={`rounded-xl px-4 py-3 -mx-1 transition-colors ${
                    section.id === affectedSection.id
                      ? 'bg-amber-50 border border-amber-200'
                      : 'hover:bg-muted/20'
                  }`}
                >
                  {section.id === affectedSection.id && (
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="size-1.5 rounded-full bg-amber-500 inline-block" />
                      <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">Affected section</span>
                    </div>
                  )}
                  <h3 className="text-xs font-bold mb-1.5 text-foreground">{section.title}</h3>
                  <p className={`text-xs leading-relaxed ${
                    section.id === affectedSection.id ? 'text-amber-900' : 'text-muted-foreground'
                  }`}>
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── AI Chat panel (collapsible, default closed) ── */}
      {showChat && (
        <div className="border-t border-border bg-background shrink-0">
          <div className="flex items-center gap-2 px-5 py-2 border-b border-border/60">
            <div className="flex size-5 items-center justify-center rounded-full bg-primary/10">
              <Bot className="size-3 text-primary" />
            </div>
            <span className="text-xs font-semibold">AI Chat</span>
            <span className="text-xs text-muted-foreground">— ask follow-up questions about this recommendation</span>
            <Button variant="ghost" size="icon" className="ml-auto size-6 text-muted-foreground" onClick={() => setShowChat(false)}>
              <X className="size-3" />
            </Button>
          </div>

          <div className="max-h-40 overflow-y-auto px-5 py-3 space-y-2.5">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex size-6 shrink-0 items-center justify-center rounded-full ${msg.role === 'user' ? 'bg-primary' : 'bg-primary/10'}`}>
                  {msg.role === 'user'
                    ? <User className="size-3 text-primary-foreground" />
                    : <Bot className="size-3 text-primary" />}
                </div>
                <div className={`max-w-[72%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-sm'
                    : 'bg-muted text-foreground rounded-tl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex gap-2.5">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="size-3 text-primary" />
                </div>
                <div className="flex items-center gap-1 bg-muted rounded-xl px-3 py-2">
                  {[0, 150, 300].map(delay => (
                    <span key={delay} className="size-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="flex items-end gap-2 px-5 pb-3 pt-1.5">
            <Textarea
              placeholder="e.g. What if we phase this in over 6 months? What are the risks if we delay past the deadline?"
              className="min-h-8 max-h-20 resize-none text-xs py-2 rounded-xl"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
            />
            <Button
              size="icon"
              className="size-9 shrink-0 rounded-xl"
              onClick={sendMessage}
              disabled={!chatInput.trim() || isSending}
            >
              <Send className="size-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* ── Action bar ── */}
      <div className="flex items-center gap-2 border-t border-border bg-background px-5 py-3 shrink-0">
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs text-red-600 border-red-200 hover:bg-red-50" onClick={() => setShowRejectModal(true)}>
          <XCircle className="size-3.5" /> Reject
        </Button>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
          <UserCheck className="size-3.5" /> Reassign
        </Button>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" onClick={() => toast.info('Draft saved')}>
          <Save className="size-3.5" /> Save draft
        </Button>
        <Button size="sm" className="h-8 gap-1.5 text-xs ml-auto" onClick={handleAccept}>
          <CheckCircle2 className="size-3.5" /> Accept and apply
        </Button>
      </div>

      {/* ── Reject modal ── */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="size-4 text-red-500" />
              <h2 className="text-sm font-bold">Reject recommendation</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Your reason will be permanently written to the audit trail and cannot be edited after submission.</p>
            <Textarea
              placeholder="e.g. The proposed threshold change requires legal review before implementation. The 30-day timeline is operationally infeasible — requesting a phased approach."
              className="min-h-24 text-xs resize-none rounded-xl"
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
            />
            {rejectReason.trim() && (
              <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-amber-600 mb-1">Will be logged as</p>
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  <span className="font-semibold">{assignee?.name}</span> rejected AI recommendation for <span className="font-semibold">{task.title}</span>. Override reason: "{rejectReason.trim()}"
                </p>
              </div>
            )}
            <div className="flex gap-2 justify-end mt-4">
              <Button variant="outline" size="sm" className="text-xs h-8" onClick={() => setShowRejectModal(false)}>Cancel</Button>
              <Button size="sm" className="text-xs h-8 bg-red-600 text-white hover:bg-red-700" onClick={handleReject} disabled={!rejectReason.trim()}>
                Confirm rejection
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
