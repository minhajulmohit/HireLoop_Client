"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { SlidersHorizontal } from "lucide-react"

import { JOB_CATEGORIES, JOB_TYPES } from "@/lib/constants/job-categories"

type JobFiltersProps = {
  jobType: string
  remoteOnly: boolean
  category: string
  typeCounts: Record<string, number>
  remoteCount: number
}

export function JobFilters({
  jobType,
  remoteOnly,
  category,
  typeCounts,
  remoteCount,
}: JobFiltersProps) {
  const router = useRouter()

  // current URL er params update kore abar /browse-jobs-e push kore
  // server side theke notun list animate aase
  const updateParams = (update: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(window.location.search)
    update(params)
    params.delete("page")
    const query = params.toString()
    router.push(query ? `/browse-jobs?${query}` : "/browse-jobs")
  }

  // initially kono type select nai — tokhon shob job dekhay
  // ekta somoy sudhu ekta type select kora jay
  const selectType = (value: string) => {
    updateParams((params) => {
      if (value) {
        params.set("jobType", value)
      } else {
        params.delete("jobType")
      }
    })
  }

  // remote alada vabe select kora jay
  const toggleRemote = () => {
    updateParams((params) => {
      if (params.get("remote") === "true") {
        params.delete("remote")
      } else {
        params.set("remote", "true")
      }
    })
  }

  const selectCategory = (value: string) => {
    updateParams((params) => {
      params.set("category", value)
    })
  }

  return (
    <aside className="w-full shrink-0 rounded-2xl border bg-card p-5 lg:w-64">
      <div className="flex items-center justify-between gap-2">
        <h2 className="inline-flex items-center gap-2 font-semibold">
          <SlidersHorizontal className="size-4 text-muted-foreground" aria-hidden="true" />
          Filters
        </h2>
        {/* reset — sob filter shor, shob job abar dekhay */}
        <Link
          href="/browse-jobs"
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Reset
        </Link>
      </div>

      {/* Job Type — radio, initially none selected = shob job, ekta somoy 1 ta */}
      <section className="mt-6">
        <h3 className="text-sm font-medium">Job Type</h3>
        <div className="mt-3 space-y-2.5">
          {JOB_TYPES.map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              <input
                type="radio"
                name="jobType"
                checked={jobType === type}
                onChange={() => selectType(type)}
                className="size-4 accent-violet-600"
              />
              <span>{type}</span>
              <span className="text-xs text-muted-foreground">
                ({typeCounts[type] ?? 0})
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Remote — alada checkbox */}
      <section className="mt-6 border-t pt-4">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground/80 transition-colors hover:text-foreground">
          <input
            type="checkbox"
            checked={remoteOnly}
            onChange={toggleRemote}
            className="size-4 accent-violet-600"
          />
          <span>Remote</span>
          <span className="text-xs text-muted-foreground">({remoteCount})</span>
        </label>
      </section>

      {/* Category — radio option, initially none selected = shob job */}
      <section className="mt-6 border-t pt-4">
        <h3 className="text-sm font-medium">Category</h3>
        <div className="mt-3 space-y-2.5">
          {JOB_CATEGORIES.map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              <input
                type="radio"
                name="category"
                checked={category === item}
                onChange={() => selectCategory(item)}
                className="size-4 accent-violet-600"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </section>
    </aside>
  )
}
