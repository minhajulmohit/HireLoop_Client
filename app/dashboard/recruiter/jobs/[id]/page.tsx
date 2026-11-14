import { notFound } from "next/navigation"

import { JobEditor } from "@/components/jobs/job-editor"
import { getJobById } from "@/lib/api/jobs"
import { getSession } from "@/lib/core/server"

export default async function RecruiterJobPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [{ id }, session] = await Promise.all([params, getSession()])
  const job = await getJobById(id)

  if (!job || !session?.user?.id || job.recruiterId !== session.user.id) {
    notFound()
  }

  return <JobEditor job={job} />
}