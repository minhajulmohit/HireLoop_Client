import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

type JobPaginationProps = {
  page: number
  totalPages: number
  search: { [key: string]: string | string[] | undefined }
}

const PER_PAGE = 6

export { PER_PAGE }

// current filters rekhay page change kore link banay
function buildHref(search: JobPaginationProps["search"], targetPage: number) {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(search)) {
    if (key === "page" || value === undefined) continue
    params.set(key, Array.isArray(value) ? value[0] : value)
  }
  params.set("page", String(targetPage))

  return `/browse-jobs?${params.toString()}`
}

const navLinkClass =
  "inline-flex size-9 items-center justify-center rounded-lg border text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"

export function JobPagination({ page, totalPages, search }: JobPaginationProps) {
  if (totalPages <= 1) return null

  const start = Math.max(1, page - 2)
  const end = Math.min(totalPages, start + 4)
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-2"
      aria-label="Job pages"
    >
      {page > 1 && (
        <Link href={buildHref(search, page - 1)} className={navLinkClass} aria-label="Previous page">
          <ChevronLeft className="size-4" aria-hidden="true" />
        </Link>
      )}

      {pages.map((item) => (
        <Link
          key={item}
          href={buildHref(search, item)}
          className={cn(
            navLinkClass,
            item === page && "border-transparent bg-violet-600 text-white hover:bg-violet-500 hover:text-white"
          )}
          aria-current={item === page ? "page" : undefined}
        >
          {item}
        </Link>
      ))}

      {page < totalPages && (
        <Link href={buildHref(search, page + 1)} className={navLinkClass} aria-label="Next page">
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </nav>
  )
}
