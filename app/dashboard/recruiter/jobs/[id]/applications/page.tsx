import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, BriefcaseBusiness } from "lucide-react"

import { JobApplicantsTable } from "@/components/jobs/job-applicants-table"
import { Button } from "@/components/ui/button"
import { getApplications } from "@/lib/api/applications"
import { getJobById } from "@/lib/api/jobs"
import { getSession } from "@/lib/core/server"

export default async function RecruiterJobApplicationsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [{ id }, session] = await Promise.all([params, getSession()])
  const job = await getJobById(id)

  if (!job || !session?.user?.id || job.recruiterId !== session.user.id) {
    notFound()
  }

  const applications = await getApplications(
    new URLSearchParams({ jobId: id }).toString()
  )

  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <Link
          href={`/dashboard/recruiter/jobs/${id}`}
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to job
        </Link>
        <p className="mb-1 text-xs text-muted-foreground">
          Manage Jobs / Applicants
        </p>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Job applicants</h1>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <BriefcaseBusiness className="size-4" />
              {job.jobTitle} · {job.companyName}
            </p>
          </div>
          <Button
            render={<Link href={`/dashboard/recruiter/jobs/${id}`} />}
            variant="outline"
          >
            View job
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl">
        <JobApplicantsTable applications={applications} />
      </main>
    </div>
  )
}