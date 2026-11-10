import Image from "next/image"
import { notFound } from "next/navigation"
import {
  BadgeCheck,
  Banknote,
  Bookmark,
  Brain,
  Building2,
  Clock,
  Globe,
  Heart,
  Infinity as InfinityIcon,
  Laptop,
  PenTool,
  PiggyBank,
  Users,
} from "lucide-react"

import { getJobById } from "@/lib/api/jobs"
import type { JobListing } from "@/lib/types/jobs"
import { getCompanyLogo } from "../components/company-logo"
import { ApplyNowButton } from "./components/apply-now-button"

// deadline gate gele job ta Expired
function isExpired(job: JobListing) {
  return new Date(job.deadline) < new Date()
}

// salary ke chotto card e make "$90K - $110K" style e dekhay
function formatSalary(amount: number) {
  if (amount >= 1000) {
    return `$${Math.round(amount / 1000)}K`
  }
  return `$${amount.toLocaleString()}`
}

// multiline string ke bullet list e vag kore
function toList(text: string) {
  return text
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)
}

// uporar 4 ta chotto info card
function getJobStats(job: JobListing) {
  return [
    {
      icon: Banknote,
      label: "Salary Range",
      value: `${formatSalary(job.minSalary)} - ${formatSalary(job.maxSalary)}`,
    },
    {
      icon: Globe,
      label: "Location",
      value: job.remote
        ? `Remote · ${job.location}`
        : `On-site · ${job.location}`,
    },
    {
      icon: Clock,
      label: "Job Type",
      value: job.jobType,
    },
    {
      icon: Users,
      // TODO: experience field ashle eikhane job theke asbe
      label: "Experience",
      value: "5+ Years",
    },
  ]
}

// dummy data — pore real data add korbi ekhane
const REQUIREMENT_TAGS = [
  { icon: Users, label: "1+ yrs Experience" },
  { icon: Brain, label: "System Thinking" },
  { icon: PenTool, label: "UX/UI Design" },
  { icon: PenTool, label: "Basic Figma" },
]

const BENEFITS = [
  { icon: Heart, label: "Full Health & Dental" },
  { icon: PiggyBank, label: "Competitive 401K" },
  { icon: Laptop, label: "Latest Hardware Stipend" },
  { icon: InfinityIcon, label: "Unlimited PTO" },
]

const COMPANY_OVERVIEW = {
  size: "220 - 500 Employees",
  industry: "SaaS / Artificial Intelligence",
  website: "Visit Website",
}

const jobDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const job = await getJobById(id)

  // thik id na paoa gele 404 dekhay
  if (!job || !job._id || !job.jobTitle) {
    notFound()
  }

  const expired = isExpired(job)
  const logo = getCompanyLogo(job.companyName)
  const jobStats = getJobStats(job)

  return (
    <div className="min-h-svh pb-16">
      <main className="mx-auto max-w-6xl px-4 pt-6 md:px-6">
        {/* header card — logo, title, verified, bookmark + apply */}
        <header className="rounded-2xl border bg-card p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-4">
            {logo ? (
              <Image
                src={logo}
                alt={`${job.companyName} logo`}
                width={56}
                height={56}
                className="size-14 shrink-0 rounded-xl bg-white object-contain p-1.5"
              />
            ) : (
              <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-xl font-semibold text-violet-600 dark:text-violet-400">
                {job.companyName.charAt(0)}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-semibold">{job.jobTitle}</h1>
              <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>{job.companyName}</span>
                {/*
                  Verified employer — dummy badge, verify feature ashle change korbi
                */}
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <BadgeCheck className="size-3.5" aria-hidden="true" />
                  Verified employer
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Save job"
                className="flex size-10 items-center justify-center rounded-xl border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Bookmark className="size-4" aria-hidden="true" />
              </button>

              {expired ? (
                <span className="rounded-md bg-red-500/10 px-2.5 py-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                  Expired
                </span>
              ) : (
                <ApplyNowButton job={job} />
              )}
            </div>
          </div>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* left column */}
          <div className="min-w-0 space-y-6 lg:col-span-2">
            {/* 4 ta info card */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {jobStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border bg-card p-4"
                >
                  <p className="flex items-center gap-1.5 text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
                    <stat.icon className="size-3.5" aria-hidden="true" />
                    {stat.label}
                  </p>
                  <p className="mt-2 truncate text-sm font-medium">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* job description */}
            <section className="rounded-2xl border bg-card p-6">
              <h2 className="font-semibold">Job Description</h2>
              {/* dummy description — pore real data ashle replace korbi */}
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                At CloudScale AI, we are engineering the next generation of
                infrastructure for automation and agentic AI. We are looking for
                a Senior Product Designer to design intuitive, scalable, and
                accessible experiences that bring clarity and delight to complex
                AI workflows. You will work closely with leadership, product,
                and engineering to define the vision for our core platform and
                shape how users interact with intelligent systems.
              </p>
            </section>

            {/* responsibilities */}
            <section className="rounded-2xl border bg-card p-6">
              <h2 className="font-semibold">Responsibilities</h2>
              <ul className="mt-3 space-y-2.5">
                {toList(job.responsibilities).map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-foreground/70"
                  >
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground/60"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* requirements — upore pill tags, niche bullet list */}
            <section className="rounded-2xl border bg-card p-6">
              <h2 className="font-semibold">Requirements</h2>

              {/* dummy skill tags — real data ashle change korbi */}
              <div className="mt-3 flex flex-wrap gap-2">
                {REQUIREMENT_TAGS.map((tag) => (
                  <span
                    key={tag.label}
                    className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs text-foreground/80"
                  >
                    <tag.icon
                      className="size-3.5 text-muted-foreground"
                      aria-hidden="true"
                    />
                    {tag.label}
                  </span>
                ))}
              </div>

              <ul className="mt-4 space-y-2.5">
                {toList(job.requirements).map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-foreground/70"
                  >
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground/60"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* benefits — dummy 2 column grid */}
            <section className="rounded-2xl border bg-card p-6">
              <h2 className="font-semibold">Benefits</h2>
              <div className="mt-3 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {BENEFITS.map((benefit) => (
                  <p
                    key={benefit.label}
                    className="flex items-center gap-2.5 text-sm text-foreground/80"
                  >
                    <span
                      className="flex size-7 shrink-0 items-center justify-center rounded-full border text-muted-foreground"
                      aria-hidden="true"
                    >
                      <benefit.icon className="size-3.5" />
                    </span>
                    {benefit.label}
                  </p>
                ))}
              </div>
            </section>
          </div>

          {/* right column — company overview */}
          <aside className="space-y-6">
            <section className="rounded-2xl border bg-card p-6">
              <h2 className="font-semibold">Company Overview</h2>

              {/* placeholder image — company r ashol image ashle ei jaygay boshbe */}
              <div className="mt-4 grid aspect-video w-full place-items-center overflow-hidden rounded-xl border bg-linear-to-br from-zinc-800 to-zinc-900 text-muted-foreground">
                <Building2 className="size-10" aria-hidden="true" />
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
                    Size
                  </p>
                  <p className="mt-1 text-sm">{COMPANY_OVERVIEW.size}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
                    Industry
                  </p>
                  <p className="mt-1 text-sm">{COMPANY_OVERVIEW.industry}</p>
                </div>
              </div>

              <button
                type="button"
                className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl border text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              >
                {COMPANY_OVERVIEW.website}
              </button>
            </section>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default jobDetailsPage
