import { createFileRoute } from '@tanstack/react-router'
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard'

export const Route = createFileRoute('/admin_dashboard')({
  component: AdminDashboard,
})
