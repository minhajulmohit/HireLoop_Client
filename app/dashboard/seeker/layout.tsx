import { requireRole } from "@/lib/core/server"

const seekerDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  await requireRole("seeker")

  return children
}

export default seekerDashboardLayout
