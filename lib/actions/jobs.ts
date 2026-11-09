const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

// Add-jobs form er data — backend (POST /jobs) e jacche
export type JobFormData = {
  jobTitle: string
  companyName: string
  category: string
  jobType: string
  postedDate: string
  remote: boolean
  location: string
  deadline: string
  minSalary: number
  maxSalary: number
  salaryFrequency: string
  responsibilities: string
  requirements: string
}

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
