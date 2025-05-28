import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Category, Product } from "@/types"
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface Props {
    products: Product & {
        category: Category;
    }[];
}

export default function ProductPage({products}: Props) {
    console.log(products)
 
    return (
        <DashboardLayout>
            <div className="p-10">
                <h1 className="text-2xl font-bold tracking-tight">Product</h1>
                <p className="text-muted-foreground">List of product</p>
            
                <DataTable columns={columns} data={products}/>
            </div>
        </DashboardLayout>
    )
}
  
