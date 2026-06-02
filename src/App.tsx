import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import AppLayout from '@/components/layout/AppLayout'
import Dashboard from '@/pages/Dashboard'
import Regulations from '@/pages/Regulations'
import RegulationDetail from '@/pages/RegulationDetail'
import Policies from '@/pages/Policies'
import PolicyDetail from '@/pages/PolicyDetail'
import Tasks from '@/pages/Tasks'
import TaskReview from '@/pages/TaskReview'
import AuditLog from '@/pages/AuditLog'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/regulations" element={<Regulations />} />
          <Route path="/regulations/:id" element={<RegulationDetail />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/policies/:id" element={<PolicyDetail />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:id" element={<TaskReview />} />
          <Route path="/audit" element={<AuditLog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
