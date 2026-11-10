"use client"

import { useRouter } from "next/navigation"

const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "oldest", label: "Oldest" },
  { value: "salary", label: "Highest Salary" },
]

export function SortSelect({ value }: { value: string }) {
  const router = useRouter()

  return (
    <label className="flex items-center gap-2 text-sm text-muted-foreground">
      Sort by:
      <select
        value={value}
        onChange={(event) => {
          const params = new URLSearchParams(window.location.search)
          params.set("sort", event.target.value)
          params.delete("page")
          const query = params.toString()
          router.push(query ? `/browse-jobs?${query}` : "/browse-jobs")
        }}
        className="h-9 rounded-lg border border-input bg-card px-2 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-card"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value} className="bg-card text-foreground">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
