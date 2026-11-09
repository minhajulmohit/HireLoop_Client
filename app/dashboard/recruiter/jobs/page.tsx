import Link from "next/link"
import { Plus, MoreVertical, Edit2, MapPinCheck } from "lucide-react"

import { DeleteJobDialog } from "@/app/components/deletejobdialog"
import { getJobs } from "@/lib/api/jobs"
import type { JobFormData } from "@/lib/actions/jobs"

export type TJobs = JobFormData & { _id: string }
// deadline gate gele job ta Expired — status ekhane theke automatic ashe
function getStatus(deadline: string) {
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
  const jobs: TJobs[] = await getJobs()

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
                <th className="px-5 py-4 font-medium">Job Title</th>
                <th className="px-5 py-4 font-medium">
                  Company &amp; Location
                </th>
                <th className="px-5 py-4 font-medium">Category</th>
                <th className="px-5 py-4 font-medium">Type</th>
                <th className="px-5 py-4 font-medium">Compensation</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Deadline</th>
                <th className="px-5 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-8 text-center text-muted-foreground"
                  >
                    No jobs found.
                  </td>
                </tr>
              )}
              {jobs.map((job) => {
                const status = getStatus(job.deadline)

                return (
                  <tr key={job._id} className="border-b last:border-b-0">
                    {/* job title */}
                    <td className="px-5 py-4 font-medium">{job.jobTitle}</td>

                    {/* company & location */}
                    <td className="px-5 py-4">
                      <p className="font-medium">{job.companyName}</p>
                      <p className="mt-0.5 inline-flex items-center justify-center gap-0.5 text-xs text-muted-foreground">
                        <MapPinCheck size={20} />
                        {job.location}
                      </p>
                    </td>

                    {/* category */}
                    <td className="px-5 py-4 text-muted-foreground">
                      {job.category}
                    </td>

                    {/* type — remote hole Remote badge, na hole jobType */}
                    <td className="px-5 py-4">
                      <span className="inline-block rounded-md bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-600 dark:text-violet-400">
                        {job.remote ? "Remote" : job.jobType}
                      </span>
                    </td>

                    {/* compensation */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="font-medium">
                        ${job.minSalary.toLocaleString()} - $
                        {job.maxSalary.toLocaleString()}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground capitalize">
                        {job.salaryFrequency.replace("-", " ")}
                      </p>
                    </td>

                    {/* status — deadline theke dinamic */}
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className={`size-2 rounded-full ${
                            status === "Active"
                              ? "bg-green-500"
                              : "bg-zinc-400 dark:bg-zinc-600"
                          }`}
                        />
                        {status}
                      </span>
                    </td>

                    {/* deadline */}
                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap">
                        {formatDate(job.deadline)}
                      </p>
                      <p className="mt-1 text-xs whitespace-nowrap text-muted-foreground">
                        {formatPostedAgo(job.postedDate)}
                      </p>
                    </td>

                    {/* actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button className="inline-flex h-8 items-center gap-1 rounded-lg bg-violet-600/20 px-3 text-xs font-medium text-white transition-colors hover:bg-violet-500">
                          Update
                          <Edit2 size={15} />
                        </button>
                        <DeleteJobDialog jobId={job._id} />
                        <button className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted">
                          <MoreVertical className="size-4" />
                        </button>
                      </div>
                    </td>
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
