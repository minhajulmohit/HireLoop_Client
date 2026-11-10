"use client"

import {
  BriefcaseBusiness,
  Building2,
  CreditCard,
  LayoutDashboard,
  Settings,
  Users,
  WalletCards,
  Bookmark,
  FileText,
  type LucideIcon,
  PlusCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
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

type DashboardRole = "seeker" | "recruiter" | "admin"
type MenuItem = {
  name: string
  url: string
  icon: LucideIcon
}

const menuItemsByRole: Record<DashboardRole, MenuItem[]> = {
  admin: [
    { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Users", url: "/dashboard/admin/users", icon: Users },
    { name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { name: "Jobs", url: "/dashboard/admin/jobs", icon: BriefcaseBusiness },
    { name: "Payments", url: "/dashboard/admin/payments", icon: CreditCard },
    { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
  recruiter: [
    { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    {
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: BriefcaseBusiness,
    },
    {
      name: "Add Jobs",
      url: "/dashboard/recruiter/jobs/new",
      icon: PlusCircle,
    },
    {
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    { name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
  seeker: [
    { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { name: "Jobs", url: "/dashboard/seeker/jobs", icon: BriefcaseBusiness },
    { name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
    {
      name: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    { name: "Billing", url: "/dashboard/seeker/billing", icon: WalletCards },
    { name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
}

export function DashboardSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const role: DashboardRole =
    session?.user?.role === "recruiter"
      ? "recruiter"
      : session?.user?.role === "admin"
        ? "admin"
        : "seeker"

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/brand/logo.png"
            alt="HireLoop"
            width={126}
            height={36}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {session?.user && (
          <div className="mt-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
              {session.user.name?.charAt(0).toUpperCase() ?? "U"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {session.user.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {role === "admin"
                  ? "Administrator"
                  : role === "recruiter"
                    ? "Recruiter"
                    : "Seeker Portal"}
              </p>
            </div>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItemsByRole[role].map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  render={<Link href={item.url} />}
                  isActive={pathname === item.url}
                >
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
