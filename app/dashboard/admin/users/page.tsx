import { getAdminUsers } from "@/lib/api/admin-users"
import { notFound } from "next/navigation"

import { AdminUsersTable } from "@/components/admin/admin-users-table"
import { getSession } from "@/lib/core/server"

export default async function AdminUsersPage() {
  const session = await getSession()

  if (session?.user.role !== "admin") {
    notFound()
  }

  const userList = await getAdminUsers()

  return (
    <AdminUsersTable
      users={userList.users}
      totalUsers={userList.total}
      currentUserId={session.user.id}
    />
  )
}
