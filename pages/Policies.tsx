import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { policies } from '@/lib/mock-data/policies'
import { users } from '@/lib/mock-data/users'
import { policyStatusBadge, formatDate } from '@/lib/display-utils'

const DOMAINS = [
  'AML / Financial Crime',
  'Data Privacy',
  'Technology Risk',
  'Consumer Affairs',
  'ESG & Sustainability',
  'Employee Conduct',
  'Operational Risk',
]

export default function Policies() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 250)
    return () => clearTimeout(t)
  }, [])

  const groupedPolicies = DOMAINS.reduce<Record<string, typeof policies>>((acc, domain) => {
    const group = policies.filter(p => p.domain === domain)
    if (group.length > 0) acc[domain] = group
    return acc
  }, {})

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-5 w-36" />
            {Array.from({ length: 3 }).map((_, j) => <Skeleton key={j} className="h-14" />)}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-base font-semibold">Policy library</h1>
        <p className="text-xs text-muted-foreground mt-0.5">{policies.length} policies across {Object.keys(groupedPolicies).length} domains</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-3">
        {[
          { label: 'Current', value: policies.filter(p => p.status === 'current').length, cls: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40' },
          { label: 'Update pending', value: policies.filter(p => p.status === 'update-pending').length, cls: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40' },
          { label: 'Out of date', value: policies.filter(p => p.status === 'out-of-date').length, cls: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40' },
        ].map(item => (
          <Card key={item.label} className="py-0">
            <CardContent className="p-4">
              <div className={`text-2xl font-bold ${item.cls.split(' ')[0]}`}>{item.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{item.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Policy groups */}
      <div className="space-y-5">
        {Object.entries(groupedPolicies).map(([domain, domainPolicies]) => (
          <div key={domain}>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="size-3.5 text-muted-foreground" />
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{domain}</h2>
              <span className="text-xs text-muted-foreground">({domainPolicies.length})</span>
            </div>
            <Card className="overflow-hidden py-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Policy</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground w-32">Owner</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground w-28">Last updated</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground w-20">Linked regs</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground w-28">Status</th>
                    <th className="w-10" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {domainPolicies.map(policy => {
                    const owner = users.find(u => u.id === policy.ownerId)
                    return (
                      <tr
                        key={policy.id}
                        className="hover:bg-muted/30 cursor-pointer transition-colors"
                        onClick={() => navigate(`/policies/${policy.id}`)}
                      >
                        <td className="px-4 py-2.5">
                          <span className="font-medium text-sm">{policy.title}</span>
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                              {owner?.initials}
                            </div>
                            <span className="text-xs text-muted-foreground truncate">{owner?.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(policy.lastUpdated)}
                        </td>
                        <td className="px-4 py-2.5 text-xs text-muted-foreground">
                          {policy.linkedRegulations.length}
                        </td>
                        <td className="px-4 py-2.5">
                          <Badge variant="outline" className={`text-xs ${policyStatusBadge(policy.status)}`}>
                            {policy.status === 'update-pending' ? 'Update pending' :
                             policy.status === 'out-of-date' ? 'Out of date' : 'Current'}
                          </Badge>
                        </td>
                        <td className="px-4 py-2.5">
                          <ChevronRight className="size-3.5 text-muted-foreground" />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
