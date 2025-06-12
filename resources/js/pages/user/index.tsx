import DashboardLayout from "@/components/layouts/dashboard-layout";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Product, ProductVariant, User } from "@/types";

interface Props {
    users: User[]
}

export default function UserPage({ users }: Props) {
  console.log (users)

  return (
    <DashboardLayout>
      <div className="p-10">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">List of user</p>
                   
        <DataTable userId={users.id} columns={columns} data={users}/>
      </div>
    </DashboardLayout>
  )
}