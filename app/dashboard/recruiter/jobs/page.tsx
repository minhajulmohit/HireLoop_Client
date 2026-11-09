import Link from "next/link"
import { Plus, MoreVertical, Edit2, MapPinCheck } from "lucide-react"
import { BsPeople } from "react-icons/bs"

import { DeleteJobDialog } from "@/app/components/deletejobdialog"
import { getJobs } from "@/lib/api/jobs"
import {
  JobStatusBadge,
  JobTableCell,
  JobTableHeader,
  JobTypeBadge,
} from "@/components/jobs/job-table"
import type { JobListing, JobStatus } from "@/lib/types/jobs"

export type TJobs = JobListing
// deadline gate gele job ta Expired — status ekhane theke automatic ashe
function getStatus(deadline: string): JobStatus {
  if (new Date(deadline) < new Date()) return "Expired"
  return "Active"
}

// "2026-12-20" er moto string ke "Dec 20, 2026" style e dekhay
function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatPostedAgo(date: string) {
  if (!date) return "Posted date unavailable"

  const [year, month, day] = date.split("-").map(Number)
  const postedAt = Date.UTC(year, month - 1, day)
  const now = new Date()
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  const days = Math.floor((today - postedAt) / 86_400_000)

  if (!Number.isFinite(postedAt)) return "Posted date unavailable"
  if (days === 0) return "Posted today"
  if (days === 1) return "Posted 1 day ago"
  if (days > 1) return `Posted ${days} days ago`
  if (days === -1) return "Posts tomorrow"
  return `Posts in ${Math.abs(days)} days`
}

const manageJobsPage = async () => {
  const jobs = await getJobs()

  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      {/* header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-xs text-muted-foreground">
            Manage Jobs / Job Listings &amp; Postings
          </p>
          <h1 className="text-3xl font-semibold">Manage Job Posts</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review, update, and organize all of your current and past job
            listings in one central hub.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/jobs/new"
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-violet-600 px-3 text-sm font-medium text-white transition-colors hover:bg-violet-500"
        >
          <Plus className="size-4" /> New Job Post
        </Link>
      </div>

      {/* job list card */}
      <div className="rounded-2xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225 text-left text-sm">
            <thead>
              <tr className="border-b text-[11px] tracking-widest text-muted-foreground uppercase">
                <JobTableHeader>Job Title</JobTableHeader>
                <JobTableHeader>Company &amp; Location</JobTableHeader>
                <JobTableHeader>Type</JobTableHeader>
                <JobTableHeader>Compensation</JobTableHeader>
                <JobTableHeader>Status</JobTableHeader>
                <JobTableHeader>Applicants</JobTableHeader>
                <JobTableHeader>Deadline</JobTableHeader>
                <JobTableHeader>Actions</JobTableHeader>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 && (
                <tr>
                  <JobTableCell
                    colSpan={8}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No jobs found.
                  </JobTableCell>
                </tr>
              )}
              {jobs.map((job) => {
                const status = getStatus(job.deadline)

                return (
                  <tr key={job._id} className="border-b last:border-b-0">
                    {/* job title */}
                    <JobTableCell>
                      <p className="font-medium whitespace-nowrap">
                        {job.jobTitle}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {job.category}
                      </p>
                    </JobTableCell>

                    {/* company & location */}
                    <JobTableCell>
                      <p className="font-medium">{job.companyName}</p>
                      <p className="mt-0.5 inline-flex items-center justify-center gap-0.5 text-xs text-muted-foreground">
                        <MapPinCheck size={20} />
                        {job.location}
                      </p>
                    </JobTableCell>

                    {/* type — remote hole Remote badge, na hole jobType */}
                    <JobTableCell>
                      <JobTypeBadge remote={job.remote} jobType={job.jobType} />
                    </JobTableCell>

                    {/* compensation */}
                    <JobTableCell className="whitespace-nowrap">
                      <p className="font-medium">
                        ${job.minSalary.toLocaleString()} - $
                        {job.maxSalary.toLocaleString()}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground capitalize">
                        {job.salaryFrequency.replace("-", " ")}
                      </p>
                    </JobTableCell>

                    {/* status — deadline theke dinamic */}
                    <JobTableCell>
                      <JobStatusBadge status={status} />
                    </JobTableCell>
                    {/* Temporary display until applicant counts come from the API */}
                    <JobTableCell>
                      <span className="inline-flex items-center gap-2 text-muted-foreground">
                        <BsPeople className="size-4" aria-hidden="true" />
                        <span>12 applicants</span>
                      </span>
                    </JobTableCell>

                    {/* deadline */}
                    <JobTableCell>
                      <p className="whitespace-nowrap">
                        {formatDate(job.deadline)}
                      </p>
                      <p className="mt-1 text-xs whitespace-nowrap text-muted-foreground">
                        {formatPostedAgo(job.postedDate)}
                      </p>
                    </JobTableCell>

                    {/* actions */}
                    <JobTableCell>
                      <div className="flex items-center gap-1">
                        <button className="inline-flex h-8 items-center gap-1 rounded-lg bg-violet-600/20 px-3 text-xs font-medium text-white transition-colors hover:bg-violet-500">
                          <Edit2 size={15} />
                        </button>
                        <DeleteJobDialog jobId={job._id} />
                        <button className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted">
                          <MoreVertical className="size-4" />
                        </button>
                      </div>
                    </JobTableCell>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default manageJobsPage
