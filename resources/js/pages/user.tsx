import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Head } from "@inertiajs/react"

export default function Page() {
  return (
    <>
    <Head title="User" />
    <DashboardLayout>
      <h1>Hello User</h1>
    </DashboardLayout>
    </>
  )
}