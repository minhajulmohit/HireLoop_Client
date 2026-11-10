import type { JobListing } from "@/lib/types/jobs"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export const getJobs = async (query = ""): Promise<JobListing[]> => {
  const res = await fetch(`${baseUrl}/jobs?${query}`)
  return res.json()
}

export const getJobById = async (jobId: string): Promise<JobListing | null> => {
  const res = await fetch(`${baseUrl}/jobs/${jobId}`)

  const text = await res.text()
  return text ? JSON.parse(text) : null
}
