import { Children, ReactNode } from 'react'
import { AppSidebar } from '../app-sidebar'
import { SiteHeader } from '../site-header'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'

interface Props {
    children : ReactNode
}

export default function DashboardLayout({children}:Props) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
