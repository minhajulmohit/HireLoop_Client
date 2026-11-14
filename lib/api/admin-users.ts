import { headers } from "next/headers"

export async function getAdminUsers() {
  const authBaseUrl = process.env.BETTER_AUTH_URL

  if (!authBaseUrl) {
    throw new Error("BETTER_AUTH_URL is required to load admin users.")
  }

  const url = new URL(
    `${authBaseUrl.replace(/\/+$/, "")}/api/auth/admin/list-users`
  )
  url.searchParams.set("sortBy", "name")
  url.searchParams.set("sortDirection", "desc")
  url.searchParams.set("limit", "100")

  const response = await fetch(url, {
    method: "GET",
    headers: await headers(),
    cache: "no-store",
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Failed to load users (${response.status})`)
  }

  return response.json()
}
