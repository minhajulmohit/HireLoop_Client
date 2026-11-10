"use client"

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function JobSearchBar({ defaultValue }: { defaultValue: string }) {
  const router = useRouter()
  const [value, setValue] = useState(defaultValue)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const params = new URLSearchParams(window.location.search)
    const keyword = value.trim()

    if (keyword) {
      params.set("search", keyword)
    } else {
      params.delete("search")
    }
    params.delete("page")

    const query = params.toString()
    router.push(query ? `/browse-jobs?${query}` : "/browse-jobs")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border bg-card p-3 sm:flex-row sm:items-center"
    >
      <div className="relative flex-1">
        <Search
          className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search by job title, keywords..."
          className="h-11 w-full rounded-xl border border-input bg-transparent pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
        />
      </div>

      <button
        type="submit"
        className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
      >
        Search Jobs
      </button>
    </form>
  )
}
