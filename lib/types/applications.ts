export type ApplicationStatus =
  | "Applied"
  | "Review"
  | "Shortlisted"
  | "Interview"
  | "Rejected"
  | "Offered"

export type JobApplicationData = {
  jobId: string
  jobTitle: string
  companyName: string
  applicantId: string
  email: string
  remote: boolean
  jobType: string
  status: ApplicationStatus
  applyDate: string | Date
}
