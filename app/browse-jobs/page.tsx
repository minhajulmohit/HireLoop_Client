import { getJobs } from "@/lib/api/jobs"
import { JOB_TYPES } from "@/lib/constants/job-categories"

import { JobCard } from "./components/job-card"
import { JobFilters } from "./components/job-filters"
import { JobPagination, PER_PAGE } from "./components/job-pagination"
import { JobSearchBar } from "./components/job-search-bar"
import { SortSelect } from "./components/sort-select"

const browseJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const search = await searchParams
  const urlSearch = new URLSearchParams(search as Record<string, string>)
  const query = urlSearch.toString()

 
  const jobs = await getJobs(query)

  // --- filters read kora ---
  const getParam = (key: string) => {
    const value = search[key]
    const first = Array.isArray(value) ? value[0] : value
    return first ?? ""
  }

  const keyword = getParam("search")
  // job type radio — initially empty, tokhon shob job dekhay, ekta somoy 1 tai
  const jobType = getParam("jobType")
  const remoteOnly = getParam("remote") === "true"
  const category = getParam("category")
  const sort = getParam("sort") || "recent"

  // --- filter apply kora ---
  const filteredJobs = jobs
    .filter((job) => {
      if (keyword && !`${job.jobTitle} ${job.companyName} ${job.location} ${job.category}`.toLowerCase().includes(keyword.toLowerCase())) {
        return false
      }
      if (jobType && job.jobType !== jobType) {
        return false
      }
      if (remoteOnly && !job.remote) {
        return false
      }
      if (category && job.category !== category) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      if (sort === "salary") {
        return b.maxSalary - a.maxSalary
      }
      if (sort === "oldest") {
        return a.postedDate.localeCompare(b.postedDate)
      }
      // default — most recent
      return b.postedDate.localeCompare(a.postedDate)
    })

  // --- pagination ---
  const totalPages = Math.ceil(filteredJobs.length / PER_PAGE) || 1
  const page = Math.min(Math.max(1, Number(getParam("page")) || 1), totalPages)
  const visibleJobs = filteredJobs.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  // --- filter e dekhanor jonno counts (sob job thekehisheb) ---
  const typeCounts = Object.fromEntries(
    JOB_TYPES.map((type) => [
      type,
      jobs.filter((job) => job.jobType === type).length,
    ])
  )
  const remoteCount = jobs.filter((job) => job.remote).length

  return (
    <div className="min-h-svh pb-16">
      <main className="mx-auto max-w-7xl px-4 pt-6 md:px-6">
        {/* search bar */}
        <JobSearchBar defaultValue={keyword} />

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* filter sidebar */}
          <JobFilters
            jobType={jobType}
            remoteOnly={remoteOnly}
            category={category}
            typeCounts={typeCounts}
            remoteCount={remoteCount}
          />

          {/* job list */}
          <section className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-lg font-semibold">
                Found {filteredJobs.length}{" "}
                <span className="text-muted-foreground">
                  professional job{filteredJobs.length === 1 ? "" : "s"}
                </span>
              </h1>
              <SortSelect value={sort} />
            </div>

            <div className="mt-4 space-y-4">
              {visibleJobs.length === 0 ? (
                <div className="rounded-2xl border bg-card p-12 text-center">
                  <p className="font-medium">No jobs found</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try adjusting the filters or clearing the search keyword.
                  </p>
                </div>
              ) : (
                visibleJobs.map((job) => <JobCard key={job._id} job={job} />)
              )}
            </div>

            <JobPagination page={page} totalPages={totalPages} search={search} />
          </section>
        </div>
      </main>
    </div>
  )
}

export default browseJobsPage
