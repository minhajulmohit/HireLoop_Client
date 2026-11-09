import type { JobFormData } from "@/lib/types/jobs"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export type { JobFormData } from "@/lib/types/jobs"

export const createJob = async (jobData: JobFormData) => {
  const res = await fetch(`${baseUrl}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  })
  return res.json()
}
export const deleteJob = async (jobId: string) => {
  const res = await fetch(`${baseUrl}/jobs/${jobId}`, {
    method: "DELETE",
  })
  return res.json()
}
