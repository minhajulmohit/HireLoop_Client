import { headers } from "next/headers"
import { auth } from "../auth"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export const getUserPremiumById = async (userId: string) => {
  const response = await fetch(`${baseUrl}/users/${userId}/premium`)
  return response.json()
}

export const getUsers = async () => {
  const users = await auth.api.listUsers({
    query: {
      sortBy: "name", // The field to sort by.
      sortDirection: "desc", // The direction to sort
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  })
  return users
}
