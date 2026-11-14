"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"

import type {
  ApplicationStatus,
  JobApplicationData,
} from "@/lib/types/applications"

const APPLICATION_STATUSES: ApplicationStatus[] = [
  "Applied",
  "Review",
  "Shortlisted",
  "Interview",
  "Rejected",
  "Offered",
]

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  Applied: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-300",
  Review: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  Shortlisted: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  Interview: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  Rejected: "bg-red-500/10 text-red-700 dark:text-red-300",
  Offered: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
}

function getApplicationKey(application: JobApplicationData) {
  return `${application.applicantId}-${String(application.applyDate)}`
}

function formatApplyDate(value: string | Date) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return "Date unavailable"

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function JobApplicantsTable({
  applications,
}: {
  applications: JobApplicationData[]
}) {
  const [search, setSearch] = useState("")
  const [statusByApplication, setStatusByApplication] = useState<
    Record<string, ApplicationStatus>
  >({})

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase()

    return applications.filter((application) => {
      return (
        !query ||
        application.email.toLowerCase().includes(query) ||
        application.applicantId.toLowerCase().includes(query)
      )
    })
  }, [applications, search])

  function changeStatus(key: string, status: ApplicationStatus) {
    setStatusByApplication((current) => ({ ...current, [key]: status }))
  }

  function handleStatusChange(key: string, value: string) {
    const status = APPLICATION_STATUSES.find((option) => option === value)
    if (status) changeStatus(key, status)
  }

  if (applications.length === 0) {
    return (
      <div className="rounded-2xl border bg-card px-6 py-12 text-center">
        <p className="font-medium">No applicants yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Applicants for this job will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold">Applicants</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {filteredApplications.length} of {applications.length} applicants
          </p>
        </div>
        <label className="relative block w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by email or applicant ID"
            aria-label="Search applicants"
            className="h-10 w-full rounded-lg border border-input bg-background pr-3 pl-9 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-180 text-left text-sm">
          <thead>
            <tr className="border-b text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">Applicant</th>
              <th className="px-4 py-3 font-medium">Applied on</th>
              <th className="px-4 py-3 font-medium">Job type</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Change status</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((application) => {
              const key = getApplicationKey(application)
              const status =
                statusByApplication[key] ?? application.status ?? "Applied"

              return (
                <tr
                  key={key}
                  className="border-b last:border-b-0 hover:bg-muted/30"
                >
                  <td className="px-4 py-4">
                    <p className="font-medium">{application.email}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      ID: {application.applicantId}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                    {formatApplyDate(application.applyDate)}
                  </td>
                  <td className="px-4 py-4">{application.jobType}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={status}
                      onChange={(event) =>
                        handleStatusChange(key, event.target.value)
                      }
                      aria-label={`Change status for ${application.email}`}
                      className="h-9 min-w-32 rounded-lg border border-input bg-background px-2 text-sm"
                    >
                      {APPLICATION_STATUSES.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              )
            })}
            {filteredApplications.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  No applicants match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="border-t bg-muted/20 px-4 py-3 text-xs text-muted-foreground">
        Status changes are temporary and will reset when you leave or refresh
        this page. Saving them requires a status-update API.
      </p>
    </div>
  )
}
