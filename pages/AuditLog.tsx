import { useEffect, useState } from 'react'
import { Bot, User, Search, X, SlidersHorizontal, ChevronDown, ChevronUp, ClipboardList } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { auditLog, type AuditAction } from '@/lib/mock-data/audit-log'
import { users } from '@/lib/mock-data/users'
import { formatDate } from '@/lib/display-utils'

const ACTION_STYLES: Record<AuditAction, string> = {
  regulation_detected:     'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-400',
  policy_gap_identified:   'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-400',
  recommendation_generated:'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-400',
  task_assigned:           'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400',
  task_accepted:           'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400',
  task_rejected:           'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-400',
  task_reassigned:         'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400',
  detail_requested:        'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400',
  policy_updated:          'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400',
  policy_version_created:  'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400',
  task_status_changed:     'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400',
}

const ACTION_FILTERS = [
  { value: 'all', label: 'All actions' },
  { value: 'regulation_detected', label: 'Detected' },
  { value: 'recommendation_generated', label: 'AI recommendations' },
  { value: 'task_accepted', label: 'Accepted' },
  { value: 'task_rejected', label: 'Rejected' },
  { value: 'policy_version_created', label: 'Policy versions' },
]

export default function AuditLog() {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [actorFilter, setActorFilter] = useState('All')
  const [actionFilter, setActionFilter] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 250)
    return () => clearTimeout(t)
  }, [])

  const sorted = [...auditLog].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const filtered = sorted.filter(event => {
    if (search) {
      const q = search.toLowerCase()
      if (!event.target.toLowerCase().includes(q) && !event.actionLabel.toLowerCase().includes(q) && !event.detail.toLowerCase().includes(q)) return false
    }
    if (actorFilter === 'AI' && event.actorType !== 'ai') return false
    if (actorFilter === 'Human' && event.actorType !== 'human') return false
    if (actionFilter !== 'all' && event.action !== actionFilter) return false
    return true
  })

  const hasFilters = actorFilter !== 'All' || actionFilter !== 'all' || search
  const clearFilters = () => { setSearch(''); setActorFilter('All'); setActionFilter('all') }
  const selectClass = "h-8 rounded-lg border border-border bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-36" />
        <div className="flex gap-2">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-8 w-36" />)}</div>
        {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-14 rounded-lg" />)}
      </div>
    )
  }

  return (
    <div className="p-6 space-y-4 max-w-[1440px]">
      <div>
        <h1 className="text-base font-bold">Audit log</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Complete event history — AI detections, recommendations, human decisions, and policy changes
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'AI detections', count: auditLog.filter(e => e.action === 'regulation_detected').length, color: 'text-blue-600' },
          { label: 'Recommendations', count: auditLog.filter(e => e.action === 'recommendation_generated').length, color: 'text-violet-600' },
          { label: 'Human accepts', count: auditLog.filter(e => e.action === 'task_accepted').length, color: 'text-emerald-600' },
          { label: 'Human rejects', count: auditLog.filter(e => e.action === 'task_rejected').length, color: 'text-red-600' },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-3.5 shadow-sm">
            <div className={`text-xl font-bold ${stat.color}`}>{stat.count}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-sm">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/60" />
          <input
            placeholder="Search events..."
            className="h-8 w-48 rounded-lg border border-border bg-background pl-8 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="h-5 w-px bg-border mx-1" />
        {['All', 'AI', 'Human'].map(a => (
          <button
            key={a}
            onClick={() => setActorFilter(a)}
            className={`h-8 rounded-lg px-3 text-xs font-medium transition-all ${
              actorFilter === a
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-background border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {a === 'AI' ? '🤖 AI' : a === 'Human' ? '👤 Human' : 'All actors'}
          </button>
        ))}
        <div className="h-5 w-px bg-border mx-1" />
        <select value={actionFilter} onChange={e => setActionFilter(e.target.value)} className={selectClass}>
          {ACTION_FILTERS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
        </select>
        {hasFilters && (
          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs" onClick={clearFilters}>
            <X className="size-3" /> Clear
          </Button>
        )}
        <span className="ml-auto text-xs text-muted-foreground">{filtered.length} events</span>
      </div>

      {/* Events */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-xl border border-border bg-card text-center shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-xl bg-muted mb-3">
            <ClipboardList className="size-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold">No events match your filters</p>
          <Button variant="outline" size="sm" className="mt-4 text-xs" onClick={clearFilters}>Clear filters</Button>
        </div>
      ) : (
        <Card className="overflow-hidden shadow-sm py-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {['Timestamp', 'Actor', 'Action', 'Target', 'Details'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(event => {
                const actor = event.actorType === 'ai' ? null : users.find(u => u.id === event.actorId)
                const isExpanded = expandedId === event.id

                return (
                  <>
                    <tr key={event.id} className={`hover:bg-muted/20 transition-colors ${isExpanded ? 'bg-muted/10' : ''}`}>
                      <td className="px-5 py-3 text-xs text-muted-foreground whitespace-nowrap font-mono">
                        {new Date(event.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} {new Date(event.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`flex size-6 shrink-0 items-center justify-center rounded-full ${event.actorType === 'ai' ? 'bg-primary/10' : 'bg-muted'}`}>
                            {event.actorType === 'ai'
                              ? <Bot className="size-3 text-primary" />
                              : <User className="size-3 text-muted-foreground" />}
                          </div>
                          <span className="text-xs font-medium truncate">
                            {event.actorType === 'ai' ? 'PolicyPulse AI' : actor?.name ?? 'Unknown'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={`text-[10px] font-medium ${ACTION_STYLES[event.action]}`}>
                          {event.actionLabel}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs text-foreground max-w-[200px]">
                        <span className="truncate block">{event.target}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                          onClick={() => setExpandedId(isExpanded ? null : event.id)}
                        >
                          {isExpanded ? <><ChevronUp className="size-3" /> Hide</> : <><ChevronDown className="size-3" /> View</>}
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr key={`${event.id}-detail`} className="bg-muted/10">
                        <td colSpan={5} className="px-5 py-3 border-b border-border">
                          <div className="flex items-start gap-2">
                            <div className="size-1.5 mt-1.5 rounded-full bg-primary shrink-0" />
                            <p className="text-xs text-muted-foreground leading-relaxed">{event.detail}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                )
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}
