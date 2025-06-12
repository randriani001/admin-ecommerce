import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Head } from "@inertiajs/react";
import { Category, Order, OrderItem } from "@/types"
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface Props {
    items: OrderItem[]
}

export default function OrderPage({items}: Props) {
    console.log(items)

    //return (
    //    <div>CategoryPage</div>
    //)

    return (
        <>
        <Head title="Order" />
        <DashboardLayout>
            <div className="p-10">
                <h1 className="text-2xl font-bold tracking-tight">Order Items</h1>
                <p className="text-muted-foreground">List of order item</p>
                <div className="mt-5">
                    <DataTable columns={columns} data={items}/>
                </div>
            </div>
        </DashboardLayout>
        </>
    )
}