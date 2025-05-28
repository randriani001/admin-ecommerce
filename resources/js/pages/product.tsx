import { DataTable } from "@/components/data-table"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Head, Link } from "@inertiajs/react"
import { columns } from "./product/columns"
import { Product } from "@/types"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
    products: Product[]
}

export default function ProductPage({products}: Props) {

  return (
    <>
    <Head title="Product" />
    <DashboardLayout>
      <h1 className="text-2xl font-bold tracking-tight">Products</h1>
      <p className="text-muted-foreground">List of product</p>
    </DashboardLayout>
    </>
  )
}