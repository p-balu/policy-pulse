import type { Severity, RegStatus } from './mock-data/regulations'
import type { PolicyStatus } from './mock-data/policies'
import type { TaskStatus, TaskPriority } from './mock-data/tasks'

export function severityBadge(severity: Severity): string {
  switch (severity) {
    case 'critical': return 'border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400'
    case 'high':     return 'border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-400'
    case 'medium':   return 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-400'
    case 'low':      return 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400'
  }
}

export function regStatusBadge(status: RegStatus): string {
  switch (status) {
    case 'new':       return 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400'
    case 'in-review': return 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-400'
    case 'resolved':  return 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400'
  }
}

export function policyStatusBadge(status: PolicyStatus): string {
  switch (status) {
    case 'current':        return 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400'
    case 'update-pending': return 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-400'
    case 'out-of-date':    return 'border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400'
  }
}

export function taskStatusLabel(status: TaskStatus): string {
  switch (status) {
    case 'new':            return 'New'
    case 'in-review':      return 'In review'
    case 'awaiting-human': return 'Awaiting human'
    case 'resolved':       return 'Resolved'
  }
}

export function priorityBadge(priority: TaskPriority): string {
  switch (priority) {
    case 'critical': return 'border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400'
    case 'high':     return 'border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-400'
    case 'medium':   return 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-400'
    case 'low':      return 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400'
  }
}

export function statusBadge(status: RegStatus): string {
  return regStatusBadge(status)
}

export function formatTimeAgo(dateStr: string): string {
  const now = new Date('2026-06-02T12:00:00Z')
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 30) return `${diffDays} days ago`
  const diffMonths = Math.floor(diffDays / 30)
  return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`
}

export function formatDeadlineCountdown(dateStr: string): { label: string; color: string } {
  const now = new Date('2026-06-02')
  const deadline = new Date(dateStr)
  const diffMs = deadline.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / 86400000)

  if (diffDays < 0) return { label: `${Math.abs(diffDays)}d overdue`, color: 'text-red-600 dark:text-red-400' }
  if (diffDays === 0) return { label: 'Due today', color: 'text-red-600 dark:text-red-400' }
  if (diffDays <= 7) return { label: `${diffDays}d left`, color: 'text-amber-600 dark:text-amber-400' }
  if (diffDays <= 30) return { label: `${diffDays}d left`, color: 'text-foreground' }
  return { label: `${diffDays}d left`, color: 'text-muted-foreground' }
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
