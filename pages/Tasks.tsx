import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grip } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { tasks as initialTasks, type Task, type TaskStatus } from '@/lib/mock-data/tasks'
import { regulations } from '@/lib/mock-data/regulations'
import { users } from '@/lib/mock-data/users'
import { priorityBadge, formatDeadlineCountdown } from '@/lib/display-utils'

const COLUMNS: { id: TaskStatus; label: string; color: string; dot: string }[] = [
  { id: 'new', label: 'New', color: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900', dot: 'bg-blue-500' },
  { id: 'in-review', label: 'In review', color: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900', dot: 'bg-amber-500' },
  { id: 'awaiting-human', label: 'Awaiting human', color: 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900', dot: 'bg-purple-500' },
  { id: 'resolved', label: 'Resolved', color: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900', dot: 'bg-emerald-500' },
]

export default function Tasks() {
  const [loading, setLoading] = useState(true)
  const [taskList, setTaskList] = useState<Task[]>([])
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dragOverCol, setDragOverCol] = useState<TaskStatus | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => { setTaskList(initialTasks); setLoading(false) }, 250)
    return () => clearTimeout(t)
  }, [])

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId)
    setDraggingId(taskId)
  }

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData('taskId')
    if (taskId) setTaskList(prev => prev.map(t => t.id === taskId ? { ...t, status } : t))
    setDraggingId(null)
    setDragOverCol(null)
  }

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-40" />
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-8 w-24" />
              {Array.from({ length: 2 }).map((_, j) => <Skeleton key={j} className="h-28 rounded-xl" />)}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-[1440px]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-base font-bold">Task queue</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Drag cards between columns to update status</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{taskList.filter(t => t.status !== 'resolved').length}</span> open
          <span className="mx-1">·</span>
          <span className="font-semibold text-foreground">{taskList.filter(t => t.status === 'resolved').length}</span> resolved
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 overflow-x-auto">
        {COLUMNS.map(col => {
          const colTasks = taskList.filter(t => t.status === col.id)
          const isOver = dragOverCol === col.id

          return (
            <div
              key={col.id}
              className={`flex flex-col gap-2 rounded-xl border p-2.5 min-h-[400px] transition-colors ${col.color} ${isOver ? 'ring-2 ring-primary/40' : ''}`}
              onDrop={e => handleDrop(e, col.id)}
              onDragOver={e => { e.preventDefault(); setDragOverCol(col.id) }}
              onDragLeave={() => setDragOverCol(null)}
            >
              <div className="flex items-center justify-between px-1 py-1">
                <div className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${col.dot}`} />
                  <span className="text-xs font-bold text-foreground">{col.label}</span>
                </div>
                <span className="flex size-5 items-center justify-center rounded-full bg-background/80 text-[10px] font-bold text-muted-foreground">
                  {colTasks.length}
                </span>
              </div>

              {colTasks.map(task => {
                const reg = regulations.find(r => r.id === task.regulationId)
                const assignee = users.find(u => u.id === task.assignedToId)
                const countdown = formatDeadlineCountdown(task.deadline)
                const isDragging = draggingId === task.id

                return (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={e => handleDragStart(e, task.id)}
                    onDragEnd={() => { setDraggingId(null); setDragOverCol(null) }}
                    onClick={() => navigate(`/tasks/${task.id}`)}
                    className={`group rounded-lg border border-border bg-background p-3.5 cursor-pointer shadow-sm hover:shadow-md transition-all ${isDragging ? 'opacity-40 scale-95' : 'hover:-translate-y-0.5'}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Grip className="size-3 text-muted-foreground/30 shrink-0 mt-0.5" />
                      <p className="text-[12px] font-semibold leading-snug flex-1 line-clamp-2">{task.title}</p>
                    </div>

                    {reg && (
                      <div className="flex items-center gap-1.5 mb-2.5 ml-5">
                        <span className="text-sm">{reg.jurisdictionFlag}</span>
                        <span className="text-[10px] text-muted-foreground truncate">{reg.regulator}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between ml-5">
                      <Badge variant="outline" className={`text-[9px] py-0 capitalize font-semibold ${priorityBadge(task.priority)}`}>
                        {task.priority}
                      </Badge>
                      <span className={`text-[10px] font-semibold ${countdown.color}`}>
                        {countdown.label}
                      </span>
                    </div>

                    <div className="mt-2.5 ml-5 flex items-center gap-1.5">
                      <div className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-[8px] font-bold text-primary">
                        {assignee?.initials}
                      </div>
                      <span className="text-[10px] text-muted-foreground">{assignee?.name.split(' ')[0]}</span>
                    </div>
                  </div>
                )
              })}

              {colTasks.length === 0 && (
                <div className={`flex flex-1 items-center justify-center rounded-lg border-2 border-dashed transition-colors min-h-[100px] ${isOver ? 'border-primary/50 bg-primary/5' : 'border-transparent'}`}>
                  <p className="text-[11px] text-muted-foreground/50">Drop here</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
