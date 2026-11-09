import type { JobListing } from "@/lib/types/jobs"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export const getJobs = async (): Promise<JobListing[]> => {
  const res = await fetch(`${baseUrl}/jobs`)
  return res.json()
}
