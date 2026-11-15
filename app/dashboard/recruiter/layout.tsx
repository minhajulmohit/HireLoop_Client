import { requireRole } from "@/lib/core/server"

const recruiterDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  await requireRole("recruiter")

  return children
}

export default recruiterDashboardLayout
