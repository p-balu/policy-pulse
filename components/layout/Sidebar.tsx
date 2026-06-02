import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  CheckSquare,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Shield,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { to: '/regulations', icon: FileText, label: 'Regulatory feed' },
  { to: '/policies', icon: BookOpen, label: 'Policy library' },
  { to: '/tasks', icon: CheckSquare, label: 'Task queue' },
  { to: '/audit', icon: ClipboardList, label: 'Audit log' },
]

const BADGE: Record<string, number> = {
  '/regulations': 4,
  '/tasks': 7,
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <aside
      className={cn(
        'relative flex h-screen flex-col border-r bg-sidebar transition-all duration-200 ease-in-out',
        'border-sidebar-border',
        collapsed ? 'w-14' : 'w-56',
      )}
    >
      {/* Logo */}
      <div className={cn(
        'relative flex h-14 items-center border-b border-sidebar-border',
        collapsed ? 'justify-center px-0' : 'gap-3 px-4',
      )}>
        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary shadow-lg shadow-sidebar-primary/30">
          <Shield className="size-4 text-sidebar-primary-foreground" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div>
            <span className="text-[13px] font-bold tracking-tight text-sidebar-accent-foreground">
              PolicyPulse
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <Zap className="size-2.5 text-sidebar-primary" />
              <span className="text-[9px] font-medium text-sidebar-primary tracking-wide uppercase">AI-powered</span>
            </div>
          </div>
        )}
      </div>

      {/* Nav section label */}
      {!collapsed && (
        <div className="px-4 pt-4 pb-1">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50">
            Navigation
          </span>
        </div>
      )}

      {/* Nav items */}
      <nav className="relative flex-1 overflow-y-auto py-2">
        <ul className="space-y-0.5 px-2">
          {navItems.map(({ to, icon: Icon, label, exact }) => {
            const isActive = exact
              ? location.pathname === to
              : location.pathname.startsWith(to)
            const badge = BADGE[to]

            return (
              <li key={to}>
                <NavLink
                  to={to}
                  className={cn(
                    'group relative flex h-9 items-center rounded-lg transition-all duration-150',
                    collapsed ? 'justify-center px-0' : 'gap-3 px-3',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
                  )}
                  title={collapsed ? label : undefined}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r-full bg-sidebar-primary" />
                  )}
                  <Icon
                    className={cn(
                      'shrink-0 transition-colors',
                      collapsed ? 'size-4.5' : 'size-4',
                      isActive ? 'text-sidebar-primary' : 'text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground',
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {!collapsed && (
                    <>
                      <span className={cn(
                        'flex-1 text-[13px] font-medium',
                        isActive ? 'text-sidebar-accent-foreground' : '',
                      )}>
                        {label}
                      </span>
                      {badge && (
                        <span className="flex size-4.5 items-center justify-center rounded-full bg-sidebar-primary/20 text-[9px] font-bold text-sidebar-primary">
                          {badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom: user + collapse */}
      <div className="border-t border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-4 py-3">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-[11px] font-bold text-sidebar-primary-foreground">
              SC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-sidebar-accent-foreground truncate">Sarah Chen</p>
              <p className="text-[10px] text-sidebar-foreground truncate">Chief Compliance Officer</p>
            </div>
          </div>
        )}
        <div className={cn('px-2 pb-3', !collapsed && 'pt-0')}>
          <button
            onClick={() => setCollapsed(c => !c)}
            className={cn(
              'flex h-8 w-full items-center rounded-lg px-2 text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
              collapsed ? 'justify-center' : 'justify-between',
            )}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {!collapsed && <span className="text-[11px]">Collapse</span>}
            {collapsed
              ? <ChevronRight className="size-3.5" />
              : <ChevronLeft className="size-3.5" />}
          </button>
        </div>
      </div>
    </aside>
  )
}
