import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Head } from "@inertiajs/react";
import { Category, Order } from "@/types"
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface Props {
    orders: Order[]
}

export default function OrderPage({orders}: Props) {
    console.log(orders)

    //return (
    //    <div>CategoryPage</div>
    //)

    return (
        <>
        <Head title="Order" />
        <DashboardLayout>
            <div className="p-10">
                <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
                <p className="text-muted-foreground">List of order</p>
                <div className="mt-5">
                    <DataTable columns={columns} data={orders}/>
                </div>
            </div>
        </DashboardLayout>
        </>
    )
}