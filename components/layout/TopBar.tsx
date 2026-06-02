import { useState } from 'react'
import { Bell, Search, Sun, Moon, ChevronDown, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function TopBar() {
  const [dark, setDark] = useState(false)

  const toggleDark = () => {
    setDark(d => !d)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="flex h-14 items-center gap-3 border-b border-border bg-background/95 px-5 backdrop-blur-sm">
      {/* Search */}
      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/60" />
        <input
          placeholder="Search regulations, policies, tasks..."
          className="flex h-8 w-full rounded-lg border border-border bg-muted/40 px-3 pl-9 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 rounded border border-border bg-muted px-1 text-[9px] text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      {/* Status chip */}
      <div className="hidden md:flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 dark:border-emerald-800 dark:bg-emerald-950/30">
        <span className="relative flex size-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">AI monitoring active</span>
      </div>

      <div className="ml-auto flex items-center gap-1">
        {/* Dark mode */}
        <button
          onClick={toggleDark}
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Toggle dark mode"
        >
          {dark
            ? <Sun className="size-4" />
            : <Moon className="size-4" />}
        </button>

        {/* Notifications */}
        <button
          className="relative flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground leading-none">
            3
          </span>
        </button>

        {/* Divider */}
        <div className="mx-1 h-5 w-px bg-border" />

        {/* User */}
        <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted transition-colors">
          <div className="flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
            SC
          </div>
          <span className="hidden sm:block text-xs font-medium text-foreground">Sarah Chen</span>
          <ChevronDown className="hidden sm:block size-3 text-muted-foreground" />
        </button>
      </div>
    </header>
  )
}
