import { authFetch } from "../core/server"
import type { JobApplicationRecord } from "../types/applications"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export const getApplications = async (
  query = ""
): Promise<JobApplicationRecord[]> => {
  const api = `${baseUrl}/applications?${query}`

  const res = await authFetch(api)
  return res.json()
}

export const getApplicationsCount = async (
  query = ""
): Promise<{ count: number }> => {
  const res = await fetch(`${baseUrl}/applications/count?${query}`)
  return res.json()
}
