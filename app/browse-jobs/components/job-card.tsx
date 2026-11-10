import Image from "next/image"
import Link from "next/link"
import { Bookmark, Briefcase, DollarSign, MapPin } from "lucide-react"

import type { JobListing } from "@/lib/types/jobs"
import { getCompanyLogo } from "./company-logo"

// deadline gate gele job ta Expired — recruiter jobs page er moto
function isExpired(job: JobListing) {
  return new Date(job.deadline) < new Date()
}

export function JobCard({ job }: { job: JobListing }) {
  const expired = isExpired(job)
  const logo = getCompanyLogo(job.companyName)

  return (
    <article className="flex gap-4 rounded-2xl border bg-card p-5">
      {/* company logo / fallback letter */}
      {logo ? (
        <Image
          src={logo}
          alt={`${job.companyName} logo`}
          width={48}
          height={48}
          className="size-12 shrink-0 rounded-lg bg-white object-contain p-1"
        />
      ) : (
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-lg font-semibold text-violet-600 dark:text-violet-400">
          {job.companyName.charAt(0)}
        </div>
      )}

      {/* main info */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-lg font-semibold">{job.jobTitle}</h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-sm text-muted-foreground">
          <span>{job.companyName}</span>
          <span aria-hidden="true">&bull;</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" aria-hidden="true" />
            {job.location}
            {job.remote && " (Remote)"}
          </span>
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-600 dark:text-violet-400">
            <DollarSign className="size-3.5" aria-hidden="true" />(
            {job.minSalary.toLocaleString()} - {job.maxSalary.toLocaleString()})
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <Briefcase className="size-3.5" aria-hidden="true" />
            {job.jobType}
          </span>
        </div>
      </div>

      {/* actions — bookmark upore, button niche */}
      <div className="flex shrink-0 flex-col items-end justify-between gap-2">
        <button
          type="button"
          aria-label="Save job"
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Bookmark className="size-4" aria-hidden="true" />
        </button>

        {expired ? (
          <>
            {/* deadline pass kore fele — Expired badge pashe, button Show Details */}
            <span className="rounded-md bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-600 dark:text-red-400">
              Expired
            </span>
            <Link
              href={`/browse-jobs/${job._id}`}
              className="inline-flex h-8 items-center rounded-lg border border-border px-3.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
            >
              Show Details
            </Link>
          </>
        ) : (
          // active job — Easy Apply button, details page e nite jay
          <>
            <span className="rounded-md bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600 dark:text-green-400">
              Deadline {job.deadline}
            </span>
            <Link
              href={`/browse-jobs/${job._id}`}
              className="inline-flex h-8 items-center rounded-lg bg-violet-600 px-3.5 text-sm font-medium text-white transition-colors hover:bg-violet-500"
            >
              Easy Apply
            </Link>
          </>
        )}
      </div>
    </article>
  )
}
