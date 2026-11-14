"use client"

import { useMemo, useState } from "react"
import { Download, Search, ShieldCheck, UserRound, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { authClient } from "@/lib/auth-client"

type UserRole = "admin" | "recruiter" | "seeker"

type AdminUser = {
  id: string
  name: string
  email: string
  role?: string | null
  image?: string | null
  createdAt: Date | string
  banned?: boolean | null
}

const ROLES: UserRole[] = ["admin", "recruiter", "seeker"]

const ROLE_STYLES: Record<UserRole, string> = {
  admin:
    "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  recruiter:
    "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  seeker: "border-zinc-500/30 bg-zinc-500/10 text-zinc-700 dark:text-zinc-300",
}

function getRole(role?: string | null): UserRole | null {
  return ROLES.find((item) => item === role) ?? null
}

function formatDate(value: Date | string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Date unavailable"

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function downloadUsers(users: AdminUser[]) {
  const rows = [
    ["Name", "Email", "Role", "Joined", "Status"],
    ...users.map((user) => [
      user.name,
      user.email,
      user.role ?? "seeker",
      formatDate(user.createdAt),
      user.banned ? "Suspended" : "Active",
    ]),
  ]
  const csv = rows
    .map((row) =>
      row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(",")
    )
    .join("\r\n")
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }))
  const link = document.createElement("a")
  link.href = url
  link.download = "hireloop-users.csv"
  link.click()
  URL.revokeObjectURL(url)
}

export function AdminUsersTable({
  users: initialUsers,
  totalUsers,
  currentUserId,
}: {
  users: AdminUser[]
  totalUsers: number
  currentUserId: string
}) {
  const isDemo = initialUsers.length === 0
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null)

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      const matchesRole = roleFilter === "all" || user.role === roleFilter

      return matchesSearch && matchesRole
    })
  }, [users, search, roleFilter])

  const activeUsers = users.filter((user) => !user.banned).length
  const recruiters = users.filter((user) => user.role === "recruiter").length
  const suspendedUsers = users.filter((user) => user.banned).length
  const seekers = users.filter((user) => user.role === "seeker").length

  async function changeRole(userId: string, role: UserRole) {
    setUpdatingUserId(userId)

    try {
      const result = await authClient.admin.setRole({ userId, role })

      if (result.error) {
        throw new Error(result.error.message || "Could not change user role.")
      }

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === userId ? { ...user, role } : user
        )
      )
      toast.add({
        title: "User role updated",
        description: `Role changed to ${role}.`,
        type: "success",
      })
    } catch (error) {
      console.error("Failed to change user role", error)
      toast.add({
        title: "Couldn't change user role",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      })
    } finally {
      setUpdatingUserId(null)
    }
  }

  const stats = [
    {
      label: isDemo ? "Sample users" : "Total users",
      value: (isDemo ? users.length : totalUsers).toLocaleString(),
      detail: isDemo ? "Demo data only" : `${activeUsers} active in this list`,
      icon: Users,
      color: "text-violet-600 dark:text-violet-400",
    },
    {
      label: "Recruiters",
      value: recruiters.toLocaleString(),
      detail: "Recruiter accounts",
      icon: ShieldCheck,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Suspended",
      value: suspendedUsers.toLocaleString(),
      detail: "Suspended accounts",
      icon: UserRound,
      color: "text-red-600 dark:text-red-400",
    },
    {
      label: "Seekers",
      value: seekers.toLocaleString(),
      detail: "Seeker accounts",
      icon: Users,
      color: "text-amber-600 dark:text-amber-400",
    },
  ]

  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-xs text-muted-foreground">
            Admin / User Management
          </p>
          <h1 className="text-3xl font-semibold">User management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review accounts and manage user roles.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => downloadUsers(filteredUsers)}
        >
          <Download className="size-4" />
          Export list
        </Button>
      </header>

      {isDemo && (
        <div className="mb-5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
          Showing sample users because no accounts were returned. Role controls
          are disabled for sample data.
        </div>
      )}

      <section
        aria-label="User statistics"
        className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <stat.icon className={`size-4 ${stat.color}`} />
            </div>
            <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.detail}</p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border bg-card">
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or email"
              aria-label="Search users"
              className="h-10 w-full rounded-lg border border-input bg-background pr-3 pl-9 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            Role
            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              className="h-10 rounded-lg border border-input bg-background px-3 text-foreground"
            >
              <option value="all">All roles</option>
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role[0].toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-240 text-left text-sm">
            <thead>
              <tr className="border-b bg-muted/30 text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">User name</th>
                <th className="px-4 py-3 font-medium">Email address</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Join date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Change role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const role = getRole(user.role)
                const isSelf = user.id === currentUserId
                const isUpdating = updatingUserId === user.id

                return (
                  <tr
                    key={user.id}
                    className="border-b last:border-b-0 hover:bg-muted/20"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-violet-500/10 font-medium text-violet-700 dark:text-violet-300">
                          {user.name
                            .split(/\s+/)
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                      {user.email}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
                          role
                            ? ROLE_STYLES[role]
                            : "border-muted bg-muted text-muted-foreground"
                        }`}
                      >
                        {role ?? user.role ?? "Unknown"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                          user.banned
                            ? "text-red-600 dark:text-red-400"
                            : "text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        <span
                          className={`size-2 rounded-full ${
                            user.banned ? "bg-red-500" : "bg-emerald-500"
                          }`}
                        />
                        {user.banned ? "Suspended" : "Active"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        {ROLES.map((nextRole) => (
                          <Button
                            key={nextRole}
                            type="button"
                            size="sm"
                            variant={role === nextRole ? "default" : "outline"}
                            disabled={
                              isSelf ||
                              isDemo ||
                              isUpdating ||
                              role === nextRole ||
                              !role
                            }
                            onClick={() => changeRole(user.id, nextRole)}
                            aria-label={`Make ${user.name} ${nextRole}`}
                            title={
                              isSelf
                                ? "You cannot change your own role"
                                : `Make ${nextRole}`
                            }
                          >
                            {isUpdating ? "Saving..." : nextRole}
                          </Button>
                        ))}
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    No users match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t px-4 py-3 text-xs text-muted-foreground">
          Showing {filteredUsers.length} of {users.length} loaded users
          {totalUsers > users.length ? ` · ${totalUsers} total accounts` : ""}
        </div>
      </section>
    </div>
  )
}
