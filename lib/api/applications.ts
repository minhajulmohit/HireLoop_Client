import { JobApplicationData } from "../types/applications"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export const getAppliocations = async (
  query = ""
): Promise<JobApplicationData[]> => {
  const res = await fetch(`${baseUrl}/applications?${query}`)
  return res.json()
}

export const getAppliocationsCount = async (
  query = ""
): Promise<{ count: number }> => {
  const res = await fetch(`${baseUrl}/applications/count?${query}`)
  return res.json()
}
