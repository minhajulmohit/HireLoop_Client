import type { ApplicationStatus, JobApplicationData } from "@/lib/types/applications"

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

export const updateApplicationsStatus = async (
  id: string,
  data: { status: ApplicationStatus }
) => {
  const response = await fetch(`${baseUrl}/applications/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Failed to update application (${response.status})`)
  }

  return response.json()
}
