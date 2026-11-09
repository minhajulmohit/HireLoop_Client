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

export type JobStatus = "Active" | "Expired"

export type JobListing = JobFormData & {
  _id: string
}
