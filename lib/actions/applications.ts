import type { JobApplicationData } from "@/lib/types/applications"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export async function applyToJob(data: JobApplicationData) {
  const response = await fetch(`${baseUrl}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return response.json()
}
