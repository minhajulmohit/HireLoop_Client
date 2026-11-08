"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import type { ComponentType } from "react"

type DashboardRole = "seeker" | "recruiter" | "admin"
type MenuItem = {
  name: string
  url: string
  icon: ComponentType
}

const menuItemsByRole: Record<DashboardRole, MenuItem[]> = {
  seeker: [],
  recruiter: [],
  admin: [],
}

export function DashboardSidebar() {
  const { data: session } = useSession()
  const role: DashboardRole =
    session?.user?.role === "recruiter"
      ? "recruiter"
      : session?.user?.role === "admin"
        ? "admin"
        : "seeker"

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
            {menuItemsByRole[role].map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton render={<a href={item.url} />}>
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
