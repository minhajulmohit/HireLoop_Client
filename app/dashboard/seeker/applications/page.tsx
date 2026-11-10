import { getAppliocations } from "@/lib/api/applications"
import type { ApplicationStatus } from "@/lib/types/applications"
import {
  Bell,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
} from "lucide-react"

const statusStyles: Record<ApplicationStatus, string> = {
  Applied: "bg-zinc-700/60 text-zinc-300",
  Review: "bg-amber-500/15 text-amber-400",
  Shortlisted: "bg-blue-500/15 text-blue-400",
  Interview: "bg-violet-500/15 text-violet-400",
  Rejected: "bg-red-500/15 text-red-400",
  Offered: "bg-emerald-500/15 text-emerald-400",
}

function formatApplyDate(applyDate: string | Date) {
  const date = new Date(applyDate)
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000)

  if (Number.isNaN(minutes)) {
    return new Date(applyDate).toLocaleDateString()
  }
  if (minutes < 60) {
    return `${Math.max(minutes, 1)} minutes ago`
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours} hours ago`
  }

  const days = Math.floor(hours / 24)
  if (days < 7) {
    return `${days} days ago`
  }

  return `${Math.floor(days / 7)} weeks ago`
}

export default async function ApplicationsPage() {
  const applications = await getAppliocations()
  const shortlisted = applications.filter(
    (application) => application.status === "Shortlisted"
  ).length
  const interviews = applications.filter(
    (application) => application.status === "Interview"
  ).length
  const offered = applications.filter(
    (application) => application.status === "Offered"
  ).length
  const successRate =
    applications.length === 0
      ? 0
      : Math.round((offered / applications.length) * 100)
  const stats = [
    {
      label: "Total Applied",
      value: applications.length,
      valueClass: "text-white",
    },
    { label: "Shortlisted", value: shortlisted, valueClass: "text-white" },
    { label: "Interviews", value: interviews, valueClass: "text-amber-400" },
    {
      label: "Success Rate",
      value: `${successRate}%`,
      valueClass: "text-emerald-400",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0b0b0d] px-4 pb-8 text-zinc-100 sm:px-6">
      <header className="flex h-14 items-center justify-between border-b border-zinc-800">
        <input
          aria-label="Search applications"
          placeholder="⌕  Search applications..."
          className="h-8 w-44 rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-200 outline-none placeholder:text-zinc-500 sm:w-56"
        />
        <div className="flex items-center gap-4 text-zinc-400">
          <Bell className="size-4" aria-label="Notifications" />
          <Mail className="size-4" aria-label="Messages" />
          <div className="flex size-7 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-xs font-medium text-white">
            S
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl pt-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">My Applications</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Track your job applications and interview progress in real-time.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-md border border-zinc-800 bg-zinc-900 p-1 text-sm">
              <button type="button" className="rounded px-3 py-1 text-white">
                Active
              </button>
              <button type="button" className="rounded px-3 py-1 text-zinc-400">
                Archived
              </button>
            </div>
            <button
              type="button"
              className="flex h-9 items-center gap-2 rounded-md bg-white px-3 text-sm font-medium text-zinc-900"
            >
              <Download className="size-3.5" />
              Export PDF
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-zinc-800 bg-zinc-900/70 px-4 py-3"
            >
              <p className="text-sm text-zinc-400">{stat.label}</p>
              <p className={`mt-1 text-2xl font-semibold ${stat.valueClass}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-3 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/60">
          <div className="overflow-x-auto">
            <table className="w-full min-w-175 text-left text-sm">
              <thead className="border-b border-zinc-800 text-xs text-zinc-500">
                <tr>
                  <th className="px-4 py-3 text-[15px] font-medium">
                    Job Title
                  </th>
                  <th className="px-4 py-3 text-[15px] font-medium">Company</th>
                  <th className="px-4 py-3 text-[15px] font-medium">Applied</th>
                  <th className="px-4 py-3 text-[15px] font-medium">Status</th>
                  <th className="px-4 py-3 text-right text-[15px] font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr
                    key={`${application.jobId}-${application.applyDate}`}
                    className="border-b border-zinc-800/80 last:border-0"
                  >
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-7 shrink-0 items-center justify-center rounded bg-zinc-700 text-zinc-200">
                          <BriefcaseBusiness className="size-3.5" />
                        </div>
                        <div>
                          <p className="font-medium text-zinc-200">
                            {application.jobTitle}
                          </p>
                          <p className="mt-0.5 text-xs text-zinc-500">
                            {application.jobType} •{" "}
                            {application.remote === true ? "Remote" : "On-site"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-zinc-300">
                      {application.companyName}
                    </td>
                    <td className="px-4 py-2.5 text-zinc-400">
                      {formatApplyDate(application.applyDate)}
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${statusStyles[application.status]}`}
                      >
                        {application.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-300">
                      Details
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-xs text-zinc-500">
            <span>
              Showing 1-{applications.length} of {applications.length}{" "}
              applications
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous page"
                className="flex size-7 items-center justify-center rounded border border-zinc-800"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <button
                type="button"
                className="size-7 rounded bg-white text-xs font-medium text-zinc-900"
              >
                1
              </button>
              <button
                type="button"
                className="size-7 rounded border border-zinc-800"
              >
                2
              </button>
              <button
                type="button"
                className="size-7 rounded border border-zinc-800"
              >
                3
              </button>
              <button
                type="button"
                aria-label="Next page"
                className="flex size-7 items-center justify-center rounded border border-zinc-800"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
