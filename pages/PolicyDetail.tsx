import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, CalendarDays, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { getPolicyById } from '@/lib/mock-data/policies'
import { getRegulationById } from '@/lib/mock-data/regulations'
import { getUserById } from '@/lib/mock-data/users'
import { policyStatusBadge, severityBadge, formatDate } from '@/lib/display-utils'

export default function PolicyDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 250)
    return () => clearTimeout(t)
  }, [])

  const policy = getPolicyById(id!)
  if (!loading && !policy) return (
    <div className="p-6">
      <p className="text-muted-foreground">Policy not found.</p>
      <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate('/policies')}>Back to library</Button>
    </div>
  )

  useEffect(() => {
    if (policy && policy.sections.length > 0) {
      setActiveSection(policy.sections[0].id)
    }
  }, [policy?.id])

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-3/4" />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24" />)}
          </div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20" />)}
          </div>
        </div>
      </div>
    )
  }

  const owner = getUserById(policy!.ownerId)

  return (
    <div className="p-6 space-y-4 max-w-[1400px]">
      <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs -ml-1 text-muted-foreground" onClick={() => navigate('/policies')}>
        <ArrowLeft className="size-3.5" /> Back to library
      </Button>

      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">{policy!.domain}</Badge>
          <Badge variant="outline" className={`text-xs ${policyStatusBadge(policy!.status)}`}>
            {policy!.status === 'update-pending' ? 'Update pending' :
             policy!.status === 'out-of-date' ? 'Out of date' : 'Current'}
          </Badge>
        </div>
        <h1 className="text-lg font-semibold">{policy!.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><User className="size-3.5" />{owner?.name} · {owner?.role}</span>
          <span className="flex items-center gap-1.5"><CalendarDays className="size-3.5" />Last updated {formatDate(policy!.lastUpdated)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Policy content */}
        <Card className="lg:col-span-2">
          <CardContent className="p-0">
            {/* Section nav */}
            <div className="flex gap-0 overflow-x-auto border-b border-border">
              {policy!.sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`shrink-0 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                    activeSection === section.id
                      ? 'border-foreground text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
            <div className="p-4">
              {policy!.sections.filter(s => s.id === activeSection).map(section => (
                <div key={section.id}>
                  <h2 className="text-sm font-semibold mb-3">{section.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-3">
          {/* Linked regulations */}
          <Card>
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-semibold">Linked regulations</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-1.5">
              {policy!.linkedRegulations.length === 0 ? (
                <p className="text-xs text-muted-foreground">No linked regulations.</p>
              ) : (
                policy!.linkedRegulations.map(regId => {
                  const reg = getRegulationById(regId)
                  if (!reg) return null
                  return (
                    <Link
                      key={regId}
                      to={`/regulations/${regId}`}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-muted transition-colors"
                    >
                      <span>{reg.jurisdictionFlag}</span>
                      <span className="truncate flex-1 font-medium">{reg.regulator}</span>
                      <Badge variant="outline" className={`text-[10px] shrink-0 ${severityBadge(reg.severity)}`}>{reg.severity}</Badge>
                    </Link>
                  )
                })
              )}
            </CardContent>
          </Card>

          {/* Version history */}
          <Card>
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-semibold">Version history</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
              {policy!.versions.map((v, i) => (
                <div key={v.version}>
                  {i > 0 && <Separator className="mb-3" />}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold">v{v.version}</span>
                        {i === 0 && <Badge variant="secondary" className="text-[10px] py-0">Current</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{v.summary}</p>
                      <p className="text-xs text-muted-foreground mt-1">{v.author} · {formatDate(v.date)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Owner */}
          <Card>
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-semibold">Policy owner</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {owner?.initials}
                </div>
                <div>
                  <p className="text-sm font-medium">{owner?.name}</p>
                  <p className="text-xs text-muted-foreground">{owner?.role}</p>
                  <p className="text-xs text-muted-foreground">{owner?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
