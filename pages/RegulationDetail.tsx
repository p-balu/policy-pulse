import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, CalendarDays, Building2,
  Users, BookOpen, CheckSquare, CheckCircle2, Mail, ChevronRight, GraduationCap,
  AlertCircle, Clock,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { getRegulationById } from '@/lib/mock-data/regulations'
import { policies } from '@/lib/mock-data/policies'
import { tasks } from '@/lib/mock-data/tasks'
import { users } from '@/lib/mock-data/users'
import { getPeopleImpactByRegulation } from '@/lib/mock-data/people-impact'
import { severityBadge, regStatusBadge, formatDate } from '@/lib/display-utils'

const CONFIDENCE_SCORES: Record<string, number> = {
  'pol-003': 0.97, 'pol-002': 0.91, 'pol-015': 0.99, 'pol-007': 0.88,
  'pol-006': 0.93, 'pol-001': 0.85, 'pol-009': 0.82, 'pol-004': 0.94,
  'pol-010': 0.89, 'pol-012': 0.87, 'pol-013': 0.83,
}

function ImpactLevelBadge({ level }: { level: 'high' | 'medium' | 'low' }) {
  const cls = level === 'high'
    ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800'
    : level === 'medium'
    ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800'
    : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800'
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${cls}`}>{level}</span>
}

export default function RegulationDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [highlightedPara, setHighlightedPara] = useState<string | null>(null)
  const [checkedActions, setCheckedActions] = useState<Set<string>>(new Set())
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 250)
    return () => clearTimeout(t)
  }, [])

  const reg = getRegulationById(id!)
  const peopleImpact = id ? getPeopleImpactByRegulation(id) : undefined

  if (!loading && !reg) return (
    <div className="p-6">
      <p className="text-muted-foreground">Regulation not found.</p>
      <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate('/regulations')}>Back</Button>
    </div>
  )

  const linkedTasks = tasks.filter(t => t.regulationId === id)
  const linkedPolicyIds = [...new Set(linkedTasks.map(t => t.policyId))]
  const linkedPolicies = policies.filter(p => linkedPolicyIds.includes(p.id))

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-3/4" />
        <div className="flex gap-2"><Skeleton className="h-6 w-24" /><Skeleton className="h-6 w-24" /></div>
        <Skeleton className="h-8 w-96" />
        <Skeleton className="h-64" />
      </div>
    )
  }

  const highlightCitation = (idx: number) => {
    const paraId = `para-${idx}`
    setHighlightedPara(paraId)
    document.getElementById(paraId)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => setHighlightedPara(null), 3000)
  }

  const bodyParagraphs = reg!.body.split('\n\n').filter(Boolean)
  const toggleAction = (id: string) => {
    setCheckedActions(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="p-6 space-y-4 max-w-[1400px]">
      <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs -ml-1 text-muted-foreground" onClick={() => navigate('/regulations')}>
        <ArrowLeft className="size-3.5" /> Back to feed
      </Button>

      {/* Header */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-2xl">{reg!.jurisdictionFlag}</span>
          <Badge variant="outline" className={`capitalize ${severityBadge(reg!.severity)}`}>{reg!.severity}</Badge>
          <Badge variant="outline" className={regStatusBadge(reg!.status)}>
            {reg!.status === 'in-review' ? 'In review' : reg!.status.charAt(0).toUpperCase() + reg!.status.slice(1)}
          </Badge>
          <Badge variant="secondary" className="text-xs">{reg!.industry}</Badge>
        </div>
        <h1 className="text-lg font-bold leading-snug text-foreground">{reg!.title}</h1>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-3xl">{reg!.summary}</p>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Building2 className="size-3.5 text-primary" />{reg!.regulator}</span>
          <span className="flex items-center gap-1.5"><CalendarDays className="size-3.5 text-primary" />Effective {formatDate(reg!.effectiveDate)}</span>
          <span className="flex items-center gap-1.5"><CalendarDays className="size-3.5 text-muted-foreground/60" />Published {formatDate(reg!.publishedDate)}</span>
        </div>
        {linkedTasks.length > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{linkedTasks.length} open task{linkedTasks.length > 1 ? 's' : ''} ·</span>
            <Button size="sm" variant="outline" className="h-6 text-xs gap-1 px-2 text-primary border-primary/30 hover:bg-primary/5" onClick={() => navigate('/tasks')}>
              View tasks <ChevronRight className="size-3" />
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="summary">
        <TabsList className="h-9 gap-0.5">
          <TabsTrigger value="summary" className="text-xs">Change summary</TabsTrigger>
          <TabsTrigger value="diff" className="text-xs">Diff view</TabsTrigger>
          <TabsTrigger value="policies" className="text-xs">
            Affected policies{linkedPolicies.length > 0 && <span className="ml-1.5 flex size-4 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary">{linkedPolicies.length}</span>}
          </TabsTrigger>
          <TabsTrigger value="people" className="text-xs">
            <Users className="size-3.5 mr-1" />
            People impact{peopleImpact && <span className="ml-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-100 px-1 text-[9px] font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">{peopleImpact.totalHeadcount}</span>}
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="text-xs">
            AI recommendations{linkedTasks.length > 0 && <span className="ml-1.5 flex size-4 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary">{linkedTasks.length}</span>}
          </TabsTrigger>
        </TabsList>

        {/* SUMMARY */}
        <TabsContent value="summary" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2 shadow-sm">
              <CardHeader className="pb-2 pt-4 px-5">
                <CardTitle className="text-sm font-semibold">Full regulatory text</CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div ref={bodyRef} className="space-y-3 text-sm leading-relaxed">
                  {bodyParagraphs.map((para, i) => {
                    const isHighlighted = highlightedPara === `para-${i}`
                    return (
                      <p
                        key={i}
                        id={`para-${i}`}
                        className={`transition-all duration-500 rounded-md px-2 -mx-2 py-0.5 ${isHighlighted ? 'bg-amber-100 dark:bg-amber-900/25 text-foreground' : 'text-muted-foreground'}`}
                      >
                        {para}
                      </p>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
            <div className="space-y-3">
              <Card className="shadow-sm">
                <CardHeader className="pb-2 pt-4 px-4"><CardTitle className="text-sm font-semibold">Key themes</CardTitle></CardHeader>
                <CardContent className="px-4 pb-4 flex flex-wrap gap-1.5">
                  {reg!.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                </CardContent>
              </Card>
              {linkedTasks.length > 0 && (
                <Card className="shadow-sm">
                  <CardHeader className="pb-2 pt-4 px-4"><CardTitle className="text-sm font-semibold">Linked tasks</CardTitle></CardHeader>
                  <CardContent className="px-3 pb-3 space-y-1.5">
                    {linkedTasks.map(task => {
                      const assignee = users.find(u => u.id === task.assignedToId)
                      return (
                        <button
                          key={task.id}
                          onClick={() => navigate(`/tasks/${task.id}`)}
                          className="w-full text-left rounded-lg border border-border/60 px-3 py-2.5 hover:bg-muted/40 hover:border-primary/30 transition-all"
                        >
                          <p className="text-xs font-medium text-foreground line-clamp-1">{task.title}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{assignee?.name} · {task.priority}</p>
                        </button>
                      )
                    })}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* DIFF */}
        <TabsContent value="diff" className="mt-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="text-sm font-semibold">Before / after comparison</CardTitle>
              <p className="text-xs text-muted-foreground">Strikethrough = removed · underline = added</p>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              {linkedTasks.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">No policy amendments generated yet.</p>
              ) : (
                <div className="space-y-6">
                  {linkedTasks.map(task => {
                    const policy = policies.find(p => p.id === task.policyId)
                    return (
                      <div key={task.id}>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">{policy?.title}</p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                              <div className="size-2 rounded-full bg-red-500" /> Before
                            </div>
                            <div className="rounded-lg border border-red-200/70 bg-red-50/40 dark:border-red-900 dark:bg-red-950/15 p-3 leading-relaxed">
                              <span className="bg-red-100 dark:bg-red-900/40 line-through decoration-red-500 text-red-800 dark:text-red-300">
                                {task.aiRecommendation.proposedEdit.original}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                              <div className="size-2 rounded-full bg-emerald-500" /> After
                            </div>
                            <div className="rounded-lg border border-emerald-200/70 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/15 p-3 leading-relaxed">
                              <span className="bg-emerald-100 dark:bg-emerald-900/40 underline decoration-emerald-600 text-emerald-900 dark:text-emerald-200">
                                {task.aiRecommendation.proposedEdit.revised}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* AFFECTED POLICIES */}
        <TabsContent value="policies" className="mt-4">
          {linkedPolicies.length === 0 ? (
            <Card><CardContent className="py-12 text-center text-sm text-muted-foreground">No affected policies identified.</CardContent></Card>
          ) : (
            <div className="space-y-2">
              {linkedPolicies.map(policy => {
                const score = CONFIDENCE_SCORES[policy.id] ?? 0.80
                const owner = users.find(u => u.id === policy.ownerId)
                return (
                  <Card key={policy.id} className="py-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <BookOpen className="size-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link to={`/policies/${policy.id}`} className="font-medium text-sm hover:text-primary transition-colors">{policy.title}</Link>
                        <p className="text-xs text-muted-foreground mt-0.5">{policy.domain} · {owner?.name}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="text-[10px] text-muted-foreground">AI confidence</div>
                          <div className="text-sm font-bold text-foreground">{(score * 100).toFixed(0)}%</div>
                        </div>
                        <div className="h-6 w-24 rounded-full bg-muted overflow-hidden relative">
                          <div className="absolute inset-y-0 left-0 rounded-full bg-primary/30 transition-all duration-700" style={{ width: `${score * 100}%` }} />
                          <div className="absolute inset-y-0 left-0 rounded-full bg-primary border-r border-primary/50" style={{ width: `${score * 100}%`, maxWidth: '4px', minWidth: '4px' }} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        {/* PEOPLE IMPACT */}
        <TabsContent value="people" className="mt-4">
          {!peopleImpact ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="size-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">People impact analysis not yet available for this regulation.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Summary strip */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Card className="py-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-foreground">{peopleImpact.totalHeadcount}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1"><Users className="size-3" /> Employees impacted</div>
                  </CardContent>
                </Card>
                <Card className="py-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-foreground">{peopleImpact.departments.length}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1"><Building2 className="size-3" /> Departments affected</div>
                  </CardContent>
                </Card>
                <Card className="py-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-foreground">{peopleImpact.training.length}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1"><GraduationCap className="size-3" /> Training modules</div>
                  </CardContent>
                </Card>
                <Card className="py-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-foreground">{peopleImpact.actionChecklist.length}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1"><CheckSquare className="size-3" /> Action items</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {/* Departments */}
                <Card className="shadow-sm">
                  <CardHeader className="pb-2 pt-4 px-5">
                    <div className="flex items-center gap-2">
                      <Users className="size-4 text-primary" />
                      <CardTitle className="text-sm font-semibold">Affected departments</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="px-5 pb-5 space-y-2.5">
                    {peopleImpact.departments.map(dept => (
                      <div key={dept.name} className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-[10px] font-bold text-muted-foreground">
                          {dept.headcount}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-medium">{dept.name}</span>
                            <ImpactLevelBadge level={dept.impact} />
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{dept.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Training */}
                <Card className="shadow-sm">
                  <CardHeader className="pb-2 pt-4 px-5">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="size-4 text-primary" />
                      <CardTitle className="text-sm font-semibold">Required training</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="px-5 pb-5 space-y-3">
                    {peopleImpact.training.map((t, i) => (
                      <div key={i} className="rounded-lg border border-border/60 p-3 hover:border-primary/20 transition-colors">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold leading-snug">{t.module}</p>
                          {t.mandatory && (
                            <span className="shrink-0 rounded-full bg-red-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-red-600 border border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800">
                              Mandatory
                            </span>
                          )}
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-2 text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-0.5"><Clock className="size-2.5" /> {t.duration}</span>
                          <span className="flex items-center gap-0.5"><CalendarDays className="size-2.5" /> Due {formatDate(t.deadline)}</span>
                          <span className="flex items-center gap-0.5"><BookOpen className="size-2.5" /> {t.format}</span>
                        </div>
                        <p className="mt-1 text-[10px] text-muted-foreground/80 italic">{t.targetAudience}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Action checklist */}
                <Card className="shadow-sm">
                  <CardHeader className="pb-2 pt-4 px-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckSquare className="size-4 text-primary" />
                        <CardTitle className="text-sm font-semibold">Employee action checklist</CardTitle>
                      </div>
                      <span className="text-xs text-muted-foreground">{checkedActions.size}/{peopleImpact.actionChecklist.length} done</span>
                    </div>
                  </CardHeader>
                  <CardContent className="px-5 pb-5 space-y-2">
                    {peopleImpact.actionChecklist.map(item => {
                      const checked = checkedActions.has(item.id)
                      const catColor = {
                        training: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400',
                        process: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400',
                        system: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400',
                        acknowledgment: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400',
                        communication: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/30 dark:text-pink-400',
                      }[item.category]
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleAction(item.id)}
                          className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-all ${
                            checked
                              ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20'
                              : 'border-border/60 hover:border-primary/20 hover:bg-muted/30'
                          }`}
                        >
                          <div className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded ${
                            checked ? 'bg-emerald-500' : 'border-2 border-muted-foreground/30'
                          }`}>
                            {checked && <CheckCircle2 className="size-3 text-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs leading-snug ${checked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{item.action}</p>
                            <div className="mt-1 flex flex-wrap items-center gap-1.5">
                              <span className={`rounded border px-1.5 py-0.5 text-[9px] font-semibold capitalize ${catColor}`}>{item.category}</span>
                              <span className="text-[10px] text-muted-foreground">{item.owner}</span>
                              <span className="text-[10px] text-muted-foreground/70">· {formatDate(item.deadline)}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                {/* Internal comms */}
                <div className="space-y-3">
                  <Card className="shadow-sm">
                    <CardHeader className="pb-2 pt-4 px-5">
                      <div className="flex items-center gap-2">
                        <Mail className="size-4 text-primary" />
                        <CardTitle className="text-sm font-semibold">Internal communications plan</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="px-5 pb-5 space-y-2.5">
                      {peopleImpact.communications.map((c, i) => (
                        <div key={i} className="flex gap-3 rounded-lg border border-border/60 p-3 hover:bg-muted/20 transition-colors">
                          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <Mail className="size-3.5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-semibold">{c.type}</span>
                              <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{c.channel}</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-0.5">{c.description}</p>
                            <div className="mt-1 flex flex-wrap gap-2 text-[10px] text-muted-foreground">
                              <span>By {formatDate(c.deadline)}</span>
                              <span>· {c.owner}</span>
                              <span>· {c.audience}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Key changes for employees */}
                  <Card className="shadow-sm">
                    <CardHeader className="pb-2 pt-4 px-5">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="size-4 text-amber-500" />
                        <CardTitle className="text-sm font-semibold">What changes for employees</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="px-5 pb-5 space-y-2">
                      {peopleImpact.keyChanges.map((change, i) => (
                        <div key={i} className="flex gap-2.5 rounded-lg bg-amber-50/60 dark:bg-amber-950/15 border border-amber-100 dark:border-amber-900/30 px-3 py-2.5">
                          <span className="text-amber-500 text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                          <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">{change}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        {/* AI RECOMMENDATIONS */}
        <TabsContent value="recommendations" className="mt-4">
          {linkedTasks.length === 0 ? (
            <Card><CardContent className="py-12 text-center text-sm text-muted-foreground">No AI recommendations generated yet.</CardContent></Card>
          ) : (
            <div className="space-y-4">
              {linkedTasks.map(task => {
                const policy = policies.find(p => p.id === task.policyId)
                const owner = users.find(u => u.id === task.aiRecommendation.suggestedOwnerId)
                return (
                  <Card key={task.id} className="shadow-sm">
                    <CardHeader className="pb-2 pt-4 px-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <CardTitle className="text-sm font-semibold">{task.title}</CardTitle>
                          <p className="text-xs text-muted-foreground mt-0.5">Affects: {policy?.title}</p>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs h-7 shrink-0 gap-1 border-primary/30 text-primary hover:bg-primary/5" onClick={() => navigate(`/tasks/${task.id}`)}>
                          Review <ChevronRight className="size-3" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="px-5 pb-5 space-y-4">
                      <div className="rounded-lg border border-border bg-muted/20 p-3.5 text-sm leading-relaxed">
                        <span className="bg-red-100 dark:bg-red-950/50 line-through text-red-700 dark:text-red-400">{task.aiRecommendation.proposedEdit.original}</span>
                        {' '}
                        <span className="bg-emerald-100 dark:bg-emerald-950/50 underline text-emerald-800 dark:text-emerald-300">{task.aiRecommendation.proposedEdit.revised}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{task.aiRecommendation.rationale}</p>
                      <div className="space-y-1.5">
                        {task.aiRecommendation.citations.map((cit, idx) => (
                          <button key={cit.id} onClick={() => highlightCitation(idx + 2)} className="w-full text-left rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 px-3 py-2 text-xs hover:bg-blue-100 dark:hover:bg-blue-950/40 transition-colors">
                            <span className="font-semibold text-blue-700 dark:text-blue-400">{cit.ref}</span>
                            {' — '}
                            <span className="text-muted-foreground line-clamp-1">'{cit.text}'</span>
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-border/50">
                        <div className="text-xs text-muted-foreground">
                          Assigned to <span className="font-medium text-foreground">{owner?.name}</span> · Due <span className="font-medium text-foreground">{formatDate(task.aiRecommendation.deadline)}</span>
                        </div>
                        <Button size="sm" className="h-7 text-xs gap-1" onClick={() => navigate(`/tasks/${task.id}`)}>
                          Open review workspace <ChevronRight className="size-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
