import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"
import type { JobStatus } from "@/lib/types/jobs"

type JobTableCellProps = ComponentProps<"td">
type JobTableHeaderProps = ComponentProps<"th">

export function JobTableCell({ className, ...props }: JobTableCellProps) {
  return <td className={cn("px-5 py-4", className)} {...props} />
}

export function JobTableHeader({ className, ...props }: JobTableHeaderProps) {
  return <th className={cn("px-5 py-4 font-medium", className)} {...props} />
}

export function JobTypeBadge({
  remote,
  jobType,
}: {
  remote: boolean
  jobType: string
}) {
  return (
    <span className="inline-flex flex-col whitespace-nowrap rounded-md bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-600 dark:text-violet-400">
      <span>{remote ? "Remote" : "On-site"}</span>
      <span>{jobType}</span>
    </span>
  )
}

export function JobStatusBadge({ status }: { status: JobStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`size-2 rounded-full ${
          status === "Active" ? "bg-green-500" : "bg-zinc-400 dark:bg-zinc-600"
        }`}
      />
      {status}
    </span>
  )
}
