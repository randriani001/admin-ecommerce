import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"
import { router } from "@inertiajs/react"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const handleOrder = () => {
    router.visit('/profiles', {
      method: "get",
      data: {
        tab: "settings" 
      },
      onSuccess: () => { 
        alert("Berpindah halaman sukses")
      },
      onError: () => {
        alert("Terjadi kesalahan");
      }
    });
  }

  return (
    <div className="min-h-160 place-items-center content-center">
      <h1 className="text-2xl mb-6">Hello Dashboard!</h1>
      <Button onClick={handleOrder}>Click Here</Button>
    </div>

    //<SidebarProvider
    //  style={
    //    {
    //      "--sidebar-width": "calc(var(--spacing) * 72)",
    //      "--header-height": "calc(var(--spacing) * 12)",
    //    } as React.CSSProperties
    //  }
    //>
    //  <AppSidebar variant="inset" />
    //  <SidebarInset>
    //    <SiteHeader />
    //    <div className="flex flex-1 flex-col">
    //      <div className="@container/main flex flex-1 flex-col gap-2">
    //        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
    //          <SectionCards />
    //          <div className="px-4 lg:px-6">
    //           <ChartAreaInteractive />
    //          </div>
    //          <DataTable data={data} />
    //        </div>
    //      </div>
    //    </div>
    //  </SidebarInset>
    //</SidebarProvider>
  )
};
