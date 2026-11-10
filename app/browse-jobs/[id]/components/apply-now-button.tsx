"use client"

import { useSession } from "@/lib/auth-client"
import { JobFormData } from "@/lib/types/jobs"
import { useRouter } from "next/navigation"

// server component e onClick dite pare na, tai button ta client e rakha holo
export function ApplyNowButton({
  job,
}: {
  job: JobFormData & { _id: string }
}) {
  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user

  const handleAplyNow = () => {
    if (!user) {
      router.push(`/signin?redirectTo=/browse-jobs/${job._id}`)
    }
  }

  return (
    <button
      onClick={handleAplyNow}
      type="button"
      className="inline-flex h-10 items-center rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
    >
      Apply Now
    </button>
  )
}
