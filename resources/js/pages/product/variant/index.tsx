import DashboardLayout from "@/components/layouts/dashboard-layout";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Product, ProductVariant } from "@/types";

interface Props {
  product: Product;
  variants: ProductVariant[];
}

export default function ProductVariantPage({ product, variants }: Props) {
  return (
    <DashboardLayout>
      <div className="p-10">
        <h1 className="text-2xl font-bold tracking-tight">Variants</h1>
        <p className="text-muted-foreground">List of variants for {product.name}</p>
                   
        <DataTable productId={product.id} columns={columns} data={variants}/>
      </div>
    </DashboardLayout>
  )
}
