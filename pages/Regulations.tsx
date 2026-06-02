import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronRight, SlidersHorizontal, X, FileText, Filter } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { regulations } from '@/lib/mock-data/regulations'
import { severityBadge, regStatusBadge, formatDate } from '@/lib/display-utils'

const JURISDICTIONS = ['All', 'US', 'EU', 'UK', 'AU', 'SG', 'CA', 'IN', 'INTL']
const INDUSTRIES = ['All', 'Financial', 'Healthcare', 'Privacy', 'Energy', 'General', 'Employment']
const SEVERITIES = ['All', 'critical', 'high', 'medium', 'low']
const STATUSES = ['All', 'new', 'in-review', 'resolved']

const SEVERITY_BAR: Record<string, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-amber-500',
  low: 'bg-blue-400',
}

export default function Regulations() {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [jurisdiction, setJurisdiction] = useState('All')
  const [industry, setIndustry] = useState('All')
  const [severity, setSeverity] = useState('All')
  const [status, setStatus] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 250)
    return () => clearTimeout(t)
  }, [])

  const filtered = regulations.filter(r => {
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) &&
        !r.regulator.toLowerCase().includes(search.toLowerCase())) return false
    if (jurisdiction !== 'All' && !r.jurisdiction.startsWith(jurisdiction)) return false
    if (industry !== 'All' && r.industry !== industry) return false
    if (severity !== 'All' && r.severity !== severity) return false
    if (status !== 'All' && r.status !== status) return false
    return true
  })

  const hasFilters = jurisdiction !== 'All' || industry !== 'All' || severity !== 'All' || status !== 'All'
  const clearFilters = () => { setJurisdiction('All'); setIndustry('All'); setSeverity('All'); setStatus('All'); setSearch('') }

  const selectClass = "h-8 rounded-lg border border-border bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-56" />
        <div className="flex gap-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-8 w-28" />)}</div>
        {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-14 rounded-lg" />)}
      </div>
    )
  }

  return (
    <div className="p-6 space-y-4 max-w-[1440px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold">Regulatory feed</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monitoring {regulations.length} regulations across 9 jurisdictions
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="text-sm font-bold text-foreground">{filtered.length}</span> results
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-sm">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/60" />
          <input
            placeholder="Search regulations..."
            className="h-8 w-52 rounded-lg border border-border bg-background pl-8 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="h-5 w-px bg-border mx-1" />

        <select value={jurisdiction} onChange={e => setJurisdiction(e.target.value)} className={selectClass}>
          {JURISDICTIONS.map(j => <option key={j} value={j}>{j === 'All' ? '🌐 All jurisdictions' : j}</option>)}
        </select>
        <select value={industry} onChange={e => setIndustry(e.target.value)} className={selectClass}>
          {INDUSTRIES.map(i => <option key={i} value={i}>{i === 'All' ? 'All industries' : i}</option>)}
        </select>
        <select value={severity} onChange={e => setSeverity(e.target.value)} className={selectClass}>
          {SEVERITIES.map(s => <option key={s} value={s}>{s === 'All' ? 'All severities' : s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} className={selectClass}>
          {STATUSES.map(s => <option key={s} value={s}>{s === 'All' ? 'All statuses' : s === 'in-review' ? 'In review' : s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>

        {(hasFilters || search) && (
          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground" onClick={clearFilters}>
            <X className="size-3" /> Clear
          </Button>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-xl border border-border bg-card text-center shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-xl bg-muted mb-3">
            <SlidersHorizontal className="size-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold">No regulations match your filters</p>
          <p className="text-xs text-muted-foreground mt-1 mb-4">Try adjusting or clearing the active filters</p>
          <Button variant="outline" size="sm" className="text-xs" onClick={clearFilters}>Clear all filters</Button>
        </div>
      ) : (
        <Card className="overflow-hidden shadow-sm py-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Regulation</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground w-24">Jurisdiction</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground w-28">Effective</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground w-24">Severity</th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground w-28">Status</th>
                <th className="w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((reg, i) => (
                <tr
                  key={reg.id}
                  className="group hover:bg-primary/5 cursor-pointer transition-colors"
                  onClick={() => navigate(`/regulations/${reg.id}`)}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-start gap-3">
                      <div className={`mt-1.5 w-0.5 h-6 rounded-full shrink-0 ${SEVERITY_BAR[reg.severity] ?? 'bg-muted'}`} />
                      <div>
                        <p className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors">{reg.title}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{reg.regulator} · {reg.industry}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1.5 text-xs">
                      <span className="text-base">{reg.jurisdictionFlag}</span>
                      <span className="text-muted-foreground font-medium">{reg.jurisdiction}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(reg.effectiveDate)}
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant="outline" className={`text-xs capitalize font-medium ${severityBadge(reg.severity)}`}>
                      {reg.severity}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant="outline" className={`text-xs font-medium ${regStatusBadge(reg.status)}`}>
                      {reg.status === 'in-review' ? 'In review' : reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <ChevronRight className="size-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}
