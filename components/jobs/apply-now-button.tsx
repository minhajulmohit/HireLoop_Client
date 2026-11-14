"use client"

import { toast } from "@/components/ui/toast"
import { applyToJob } from "@/lib/actions/applications"
import { getApplicationsCount } from "@/lib/api/applications"
import { getUserPremiumById } from "@/lib/api/users"
import { useSession } from "@/lib/auth-client"
import type { JobApplicationData } from "@/lib/types/applications"
import { JobFormData } from "@/lib/types/jobs"
import { useRouter } from "next/navigation"
import { title } from "process"

// server component e onClick dite pare na, tai button ta client e rakha holo
export function ApplyNowButton({
  job,
}: {
  job: JobFormData & { _id: string }
}) {
  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user

  const handleApplyNow = async () => {
    if (!user) {
      router.push(`/signin?redirectTo=/browse-jobs/${job._id}`)
      return
    } else if (user.role === "seeker") {
      const premiumResult = await getUserPremiumById(user.id)

      const countResult = await getApplicationsCount(`applicantId=${user.id}`)

      if (!premiumResult.premium && countResult.count >= 5) {
        router.push(`/payment`)
        toast.add({
          title: "Application limit reached",
          type: "information",
        })

        return
      } else {
        const application: JobApplicationData = {
          jobId: job._id,
          jobTitle: job.jobTitle,
          companyName: job.companyName,
          applicantId: user.id,
          email: user.email,
          remote: job.remote,
          jobType: job.jobType,
          status: "Applied",
          applyDate: new Date(),
        }
        const result = await applyToJob(application)

        if (result.insertedId) {
          toast.add({
            title: "Applied to the job successfully!",
            type: "success",
          })
          router.push("/browse-jobs")
        }
      }
    } else {
      console.log("user is not seeker")
    }
  }

  return (
    <button
      onClick={handleApplyNow}
      type="button"
      className="inline-flex h-10 items-center rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
    >
      Apply Now
    </button>
  )
}
