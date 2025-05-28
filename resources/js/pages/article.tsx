import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Head } from "@inertiajs/react"

export default function Page() {
  return (
    <>
    <Head title="Article" />
    <DashboardLayout>
      <h1>Hello Article</h1>
    </DashboardLayout>
    </>
  )
}