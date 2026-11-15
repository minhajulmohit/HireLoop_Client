import { requireRole } from "@/lib/core/server"

const adminDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  await requireRole("admin")

  return children
}

export default adminDashboardLayout
