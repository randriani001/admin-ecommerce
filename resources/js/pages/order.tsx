import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Head } from "@inertiajs/react"

export default function Page() {
  return (
    <>
    <Head title="Order" />
    <DashboardLayout>
      <h1>Hello Order</h1>
    </DashboardLayout>
    </>
  )
}