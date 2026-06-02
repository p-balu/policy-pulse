import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AlertTriangle, CheckCircle2, Clock, ListTodo,
  ChevronRight, Bot, User, TrendingUp, TrendingDown, Minus,
  ArrowUpRight, FileText, Shield, Activity,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { regulations } from '@/lib/mock-data/regulations'
import { tasks } from '@/lib/mock-data/tasks'
import { auditLog } from '@/lib/mock-data/audit-log'
import { users } from '@/lib/mock-data/users'
import { severityBadge, formatTimeAgo, formatDeadlineCountdown } from '@/lib/display-utils'

function ComplianceRing({ score }: { score: number }) {
  const r = 36
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  return (
    <div className="relative flex items-center justify-center">
      <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
        <circle cx="48" cy="48" r={r} fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/60" />
        <circle
          cx="48" cy="48" r={r} fill="none"
          stroke="currentColor" strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          className="text-primary transition-all duration-1000"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-xl font-bold leading-none">{score}%</div>
        <div className="text-[10px] text-muted-foreground mt-0.5">compliant</div>
      </div>
    </div>
  )
}

function SparkBar({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values)
  return (
    <div className="flex items-end gap-0.5 h-6">
      {values.map((v, i) => (
        <div
          key={i}
          className={`flex-1 rounded-sm ${color} opacity-${i === values.length - 1 ? '100' : '50'}`}
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  )
}

const kpis = [
  {
    label: 'Open tasks',
    value: '12',
    trend: +3,
    trendLabel: 'vs last week',
    icon: ListTodo,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    spark: [5, 8, 6, 9, 10, 11, 12],
    sparkColor: 'bg-blue-400',
  },
  {
    label: 'Overdue',
    value: '2',
    trend: -1,
    trendLabel: 'vs last week',
    icon: AlertTriangle,
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/40',
    spark: [4, 3, 5, 2, 3, 4, 2],
    sparkColor: 'bg-red-400',
  },
  {
    label: 'Resolved this week',
    value: '8',
    trend: +2,
    trendLabel: 'vs last week',
    icon: CheckCircle2,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    spark: [4, 5, 3, 6, 5, 7, 8],
    sparkColor: 'bg-emerald-400',
  },
  {
    label: 'Avg. resolution',
    value: '1.4d',
    trend: -0.3,
    trendLabel: 'improvement',
    icon: Clock,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    spark: [2.1, 1.9, 2.4, 1.7, 1.5, 1.6, 1.4],
    sparkColor: 'bg-amber-400',
  },
]

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 280)
    return () => clearTimeout(t)
  }, [])

  const recentRegulations = [...regulations]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, 7)

  const openTasks = tasks.filter(t => t.status !== 'resolved')
  const criticalTasks = openTasks.filter(t => t.priority === 'critical' || t.priority === 'high').slice(0, 4)
  const recentActivity = [...auditLog]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 8)

  if (loading) {
    return (
      <div className="p-6 space-y-5">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-2">
            <Skeleton className="h-6 w-48" />
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-14" />)}
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-36" />
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20" />)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-5 max-w-[1440px]">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-foreground">Compliance overview</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Monday, June 2, 2026 · Monitoring {regulations.length} regulations across 9 jurisdictions</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 dark:border-blue-800 dark:bg-blue-950/30">
            <Activity className="size-3 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Live feed</span>
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map(kpi => {
          const isNegativeTrend = kpi.label === 'Overdue' ? kpi.trend > 0 : kpi.label === 'Avg. resolution' ? kpi.trend > 0 : kpi.trend < 0
          const TrendIcon = kpi.trend === 0 ? Minus : isNegativeTrend ? TrendingDown : TrendingUp
          const trendColor = isNegativeTrend
            ? 'text-red-500 dark:text-red-400'
            : kpi.trend === 0 ? 'text-muted-foreground'
            : 'text-emerald-500 dark:text-emerald-400'

          return (
            <Card key={kpi.label} className="py-0 overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${kpi.bg}`}>
                    <kpi.icon className={`size-4.5 ${kpi.color}`} strokeWidth={2} />
                  </div>
                  <div className={`flex items-center gap-0.5 text-[10px] font-medium ${trendColor}`}>
                    <TrendIcon className="size-3" />
                    <span>{Math.abs(kpi.trend)}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold tracking-tight leading-none mb-0.5">{kpi.value}</div>
                <div className="text-[11px] text-muted-foreground">{kpi.label}</div>
                <div className="mt-3">
                  <SparkBar values={kpi.spark} color={kpi.sparkColor} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Left: Regulation feed + Activity */}
        <div className="xl:col-span-2 space-y-4">
          {/* Recent regulatory changes */}
          <Card className="overflow-hidden shadow-sm">
            <CardHeader className="py-3 px-4 border-b border-border/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded bg-primary/10">
                    <FileText className="size-3.5 text-primary" />
                  </div>
                  <CardTitle className="text-sm font-semibold">Recent regulatory changes</CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary hover:text-primary/80" onClick={() => navigate('/regulations')}>
                  View all <ChevronRight className="size-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {recentRegulations.map((reg, i) => (
                <div key={reg.id}>
                  <div
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted/40 cursor-pointer transition-colors group"
                    onClick={() => navigate(`/regulations/${reg.id}`)}
                  >
                    {/* Severity left bar */}
                    <div className={`w-0.5 h-8 rounded-full shrink-0 ${
                      reg.severity === 'critical' ? 'bg-red-500' :
                      reg.severity === 'high' ? 'bg-orange-500' :
                      reg.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-400'
                    }`} />
                    <span className="text-base leading-none select-none shrink-0">{reg.jurisdictionFlag}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium leading-snug text-foreground truncate group-hover:text-primary transition-colors">
                        {reg.title}
                      </p>
                      <div className="mt-0.5 flex items-center gap-1.5">
                        <span className="text-[11px] text-muted-foreground">{reg.regulator}</span>
                        <span className="text-muted-foreground/40 text-xs">·</span>
                        <span className="text-[11px] text-muted-foreground">{reg.industry}</span>
                        <span className="text-muted-foreground/40 text-xs">·</span>
                        <span className="text-[11px] text-muted-foreground">{formatTimeAgo(reg.publishedDate)}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <Badge variant="outline" className={`text-[10px] py-0 capitalize ${severityBadge(reg.severity)}`}>
                        {reg.severity}
                      </Badge>
                      <ChevronRight className="size-3.5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                    </div>
                  </div>
                  {i < recentRegulations.length - 1 && <Separator className="ml-14" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Activity timeline */}
          <Card className="shadow-sm">
            <CardHeader className="py-3 px-4 border-b border-border/60">
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded bg-primary/10">
                  <Activity className="size-3.5 text-primary" />
                </div>
                <CardTitle className="text-sm font-semibold">Activity timeline</CardTitle>
                <span className="text-[10px] text-muted-foreground ml-1">Last 14 days</span>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-0">
                {recentActivity.map((event, i) => (
                  <div key={event.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`flex size-6 shrink-0 items-center justify-center rounded-full ring-2 ring-background ${
                        event.actorType === 'ai'
                          ? 'bg-primary/10'
                          : 'bg-muted'
                      }`}>
                        {event.actorType === 'ai'
                          ? <Bot className="size-3 text-primary" />
                          : <User className="size-3 text-muted-foreground" />}
                      </div>
                      {i < recentActivity.length - 1 && <div className="w-px flex-1 bg-border my-0.5 min-h-[12px]" />}
                    </div>
                    <div className="pb-3 min-w-0 pt-0.5">
                      <p className="text-[12px] leading-snug">
                        <span className="font-semibold text-foreground">
                          {event.actorType === 'ai' ? 'PolicyPulse AI' : users.find(u => u.id === event.actorId)?.name}
                        </span>
                        <span className="text-muted-foreground"> {event.actionLabel.toLowerCase()}</span>
                        <span className="text-muted-foreground"> — </span>
                        <span className="text-muted-foreground">{event.target}</span>
                      </p>
                      <p className="text-[11px] text-muted-foreground/70 mt-0.5">{formatTimeAgo(event.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Compliance score */}
          <Card className="shadow-sm">
            <CardHeader className="py-3 px-4 border-b border-border/60">
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded bg-primary/10">
                  <Shield className="size-3.5 text-primary" />
                </div>
                <CardTitle className="text-sm font-semibold">Compliance posture</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <ComplianceRing score={76} />
                <div className="space-y-2 flex-1">
                  {[
                    { label: 'Current', count: 5, color: 'bg-emerald-500' },
                    { label: 'Update pending', count: 7, color: 'bg-amber-500' },
                    { label: 'Out of date', count: 3, color: 'bg-red-500' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={`size-2 shrink-0 rounded-full ${item.color}`} />
                      <span className="text-[11px] text-muted-foreground flex-1">{item.label}</span>
                      <span className="text-[11px] font-semibold">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50/60 p-2.5 dark:border-amber-800 dark:bg-amber-950/20">
                <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">2 critical deadlines in next 30 days</p>
                <p className="text-[10px] text-amber-600/80 dark:text-amber-500/80 mt-0.5">FinCEN BOV threshold (Jun 20) · NYDFS MFA (Jun 30)</p>
              </div>
            </CardContent>
          </Card>

          {/* High-priority tasks */}
          <Card className="shadow-sm">
            <CardHeader className="py-3 px-4 border-b border-border/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded bg-primary/10">
                    <AlertTriangle className="size-3.5 text-primary" />
                  </div>
                  <CardTitle className="text-sm font-semibold">Needs attention</CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary" onClick={() => navigate('/tasks')}>
                  All tasks <ChevronRight className="size-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-3 space-y-2">
              {criticalTasks.map(task => {
                const user = users.find(u => u.id === task.assignedToId)
                const countdown = formatDeadlineCountdown(task.deadline)
                return (
                  <div
                    key={task.id}
                    className="group rounded-lg border border-border/60 p-3 hover:border-primary/30 hover:bg-primary/5 cursor-pointer transition-all"
                    onClick={() => navigate(`/tasks/${task.id}`)}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <div className={`mt-0.5 size-1.5 shrink-0 rounded-full ${task.priority === 'critical' ? 'bg-red-500' : 'bg-orange-500'}`} />
                      <p className="text-[12px] font-medium leading-snug line-clamp-2 flex-1">{task.title}</p>
                    </div>
                    <div className="flex items-center justify-between ml-3.5">
                      <div className="flex items-center gap-1.5">
                        <div className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary">
                          {user?.initials}
                        </div>
                        <span className="text-[10px] text-muted-foreground">{user?.name.split(' ')[0]}</span>
                      </div>
                      <span className={`text-[10px] font-semibold ${countdown.color}`}>
                        {countdown.label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Jurisdiction coverage */}
          <Card className="shadow-sm">
            <CardHeader className="py-3 px-4 border-b border-border/60">
              <CardTitle className="text-sm font-semibold">Jurisdiction coverage</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { flag: '🇺🇸', code: 'US', count: regulations.filter(r => r.jurisdiction.startsWith('US')).length },
                  { flag: '🇪🇺', code: 'EU', count: regulations.filter(r => r.jurisdiction === 'EU').length },
                  { flag: '🇬🇧', code: 'UK', count: regulations.filter(r => r.jurisdiction === 'UK').length },
                  { flag: '🇦🇺', code: 'AU', count: regulations.filter(r => r.jurisdiction === 'AU').length },
                  { flag: '🇸🇬', code: 'SG', count: regulations.filter(r => r.jurisdiction === 'SG').length },
                  { flag: '🇨🇦', code: 'CA', count: regulations.filter(r => r.jurisdiction === 'CA').length },
                  { flag: '🇮🇳', code: 'IN', count: regulations.filter(r => r.jurisdiction === 'IN').length },
                  { flag: '🌐', code: 'INTL', count: regulations.filter(r => r.jurisdiction === 'INTL').length },
                ].map(j => (
                  <div key={j.code} className="flex flex-col items-center rounded-lg bg-muted/40 py-2 px-1">
                    <span className="text-base">{j.flag}</span>
                    <span className="text-[9px] font-semibold text-muted-foreground mt-0.5">{j.code}</span>
                    <span className="text-[11px] font-bold text-foreground">{j.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
