import Link from "next/link"
import { Plus, Trash2, MoreVertical, Edit } from "lucide-react"

// sample data — pore real data diye replace kore dibo
const jobs = [
  {
    id: 1,
    jobTitle: "Senior UI/UX Designer",
    department: "Design",
    companyName: "Techsmith",
    location: "New Jersey, US",
    jobType: "Full-time",
    salary: "$60k - $80k",
    salaryFrequency: "per year",
    applicants: 24,
    status: "Active",
    deadline: "Dec 20, 2026",
  },
  {
    id: 2,
    jobTitle: "React Developer",
    department: "Engineering & Tech",
    companyName: "Nexlify",
    location: "Dhaka, BD",
    jobType: "Remote",
    salary: "$35k - $50k",
    salaryFrequency: "per year",
    applicants: 12,
    status: "Active",
    deadline: "Dec 10, 2026",
  },
  {
    id: 3,
    jobTitle: "Marketing Executive",
    department: "Marketing",
    companyName: "Brightwave",
    location: "London, UK",
    jobType: "Part-time",
    salary: "$20k - $30k",
    salaryFrequency: "per year",
    applicants: 8,
    status: "Expired",
    deadline: "Nov 05, 2026",
  },
  {
    id: 4,
    jobTitle: "Data Analyst",
    department: "Engineering & Tech",
    companyName: "Orbix",
    location: "Berlin, DE",
    jobType: "Full-time",
    salary: "$45k - $65k",
    salaryFrequency: "per year",
    applicants: 31,
    status: "Active",
    deadline: "Dec 28, 2026",
  },
  {
    id: 5,
    jobTitle: "Sales Support Agent",
    department: "Sales",
    companyName: "Cobalt & Co",
    location: "Austin, US",
    jobType: "Part-time",
    salary: "$15k - $20k",
    salaryFrequency: "per year",
    applicants: 5,
    status: "Expired",
    deadline: "Oct 30, 2026",
  },
  {
    id: 6,
    jobTitle: "Product Manager",
    department: "Engineering & Tech",
    companyName: "Loopware",
    location: "Toronto, CA",
    jobType: "Full-time",
    salary: "$90k - $120k",
    salaryFrequency: "per year",
    applicants: 40,
    status: "Active",
    deadline: "Jan 10, 2027",
  },
]

const manageJobsPage = () => {
  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      {/* header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-xs text-muted-foreground">
            Manage Jobs / Job Listings &amp; Postings
          </p>
          <h1 className="text-3xl font-semibold">Manage Job Posts</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review, update, and organize all of your current and past job
            listings in one central hub.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/jobs/new"
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-violet-600 px-3 text-sm font-medium text-white transition-colors hover:bg-violet-500"
        >
          <Plus className="size-4" /> New Job Post
        </Link>
      </div>

      {/* job list card */}
      <div className="rounded-2xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-237.5 text-left text-sm">
            <thead>
              <tr className="border-b text-[11px] tracking-widest text-muted-foreground uppercase">
                <th className="px-5 py-4 font-medium">Job Title &amp; Dept</th>
                <th className="px-5 py-4 font-medium">
                  Company &amp; Location
                </th>
                <th className="px-5 py-4 font-medium">Type</th>
                <th className="px-5 py-4 font-medium">Compensation</th>
                <th className="px-5 py-4 font-medium">Applicants</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Deadline</th>
                <th className="px-5 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b last:border-b-0">
                  {/* job title & dept */}
                  <td className="px-5 py-4">
                    <p className="font-medium">{job.jobTitle}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {job.department}
                    </p>
                  </td>

                  {/* company & location */}
                  <td className="px-5 py-4">
                    <p className="font-medium">{job.companyName}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {job.location}
                    </p>
                  </td>

                  {/* type */}
                  <td className="px-5 py-4">
                    <span className="inline-block rounded-md bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-600 dark:text-violet-400">
                      {job.jobType}
                    </span>
                  </td>

                  {/* compensation */}
                  <td className="px-5 py-4">
                    <p className="font-medium">{job.salary}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground capitalize">
                      {job.salaryFrequency}
                    </p>
                  </td>

                  {/* applicants */}
                  <td className="px-5 py-4">{job.applicants} applicants</td>

                  {/* status */}
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className={`size-2 rounded-full ${
                          job.status === "Active"
                            ? "bg-green-500"
                            : "bg-zinc-400 dark:bg-zinc-600"
                        }`}
                      />
                      {job.status}
                    </span>
                  </td>

                  {/* deadline */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    {job.deadline}
                  </td>

                  {/* actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="inline-flex h-8 items-center gap-1 rounded-lg bg-violet-600/20 px-3 text-xs font-medium text-white transition-colors hover:bg-violet-500">
                        Update
                        <Edit size={15} />
                      </button>
                      <button className="inline-flex size-8 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-500/10">
                        <Trash2 className="size-4" />
                      </button>
                      <button className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted">
                        <MoreVertical className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default manageJobsPage
