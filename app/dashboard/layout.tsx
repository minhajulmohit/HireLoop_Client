import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import type { ReactNode } from "react"
import { DashboardSidebar } from "@/components/layout/dashboardsidebar"

const dashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="min-w-0 flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default dashboardLayout
