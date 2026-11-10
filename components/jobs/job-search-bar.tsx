"use client"

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function JobSearchBar({ defaultValue }: { defaultValue: string }) {
  const router = useRouter()
  const [value, setValue] = useState(defaultValue)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
    const search = data.searchField

    const params = new URLSearchParams()

    params.set("search", search as string)
    
    router.push(`/browse-jobs?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border bg-card p-3 sm:flex-row sm:items-center"
    >
      <div className="relative flex-1">
        <Search
          className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          name="searchField"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search by job title, keywords..."
          className="h-11 w-full rounded-xl border border-input bg-transparent pr-3 pl-9 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
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
