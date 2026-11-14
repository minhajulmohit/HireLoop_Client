"use client"

import { Dialog } from "@base-ui/react/dialog"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Clock3,
  MapPin,
  Pencil,
  Users,
  X,
} from "lucide-react"

import { DeleteJobDialog } from "@/components/jobs/deletejobdialog"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { JOB_CATEGORIES, JOB_TYPES } from "@/lib/constants/job-categories"
import { updateJob } from "@/lib/actions/jobs"
import type { JobFormData, JobListing } from "@/lib/types/jobs"

const inputClassName =
  "h-10 rounded-lg border border-input bg-background px-3 text-sm dark:bg-input/30"
const selectClassName =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none dark:bg-input/30"

function formatDate(value: string) {
  const [year, month, day] = value.split("T")[0].split("-").map(Number)

  if (!year || !month || !day) return value

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatSalary(job: JobListing) {
  const frequency = job.salaryFrequency.replace("-", " ")
  return `$${job.minSalary.toLocaleString()} – $${job.maxSalary.toLocaleString()} ${frequency}`
}

function DetailCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Building2
  label: string
  value: string
  href?: string
}) {
  const content = (
    <>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="size-4 text-violet-500" aria-hidden="true" />
        {label}
      </div>
      <p className="mt-2 font-medium">{value}</p>
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className="block rounded-xl border bg-card p-4 transition-colors hover:border-violet-500/50 hover:bg-violet-500/5"
      >
        {content}
      </Link>
    )
  }

  return (
    <div className="rounded-xl border bg-card p-4">
      {content}
    </div>
  )
}

function DetailSection({
  title,
  text,
}: {
  title: string
  text: string
}) {
  return (
    <section className="rounded-2xl border bg-card p-5 md:p-6">
      <h2 className="font-semibold">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-foreground/75">
        {text.trim() ? (
          <p className="whitespace-pre-wrap">{text}</p>
        ) : (
          <p className="text-muted-foreground">No information provided.</p>
        )}
      </div>
    </section>
  )
}

export function JobEditor({ job }: { job: JobListing }) {
  const router = useRouter()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = new FormData(event.currentTarget)

    const jobData: JobFormData = {
      jobTitle: String(values.get("jobTitle") ?? ""),
      companyName: String(values.get("companyName") ?? ""),
      category: String(values.get("category") ?? ""),
      jobType: String(values.get("jobType") ?? ""),
      postedDate: job.postedDate,
      remote: values.get("remote") === "yes",
      location: String(values.get("location") ?? ""),
      deadline: String(values.get("deadline") ?? ""),
      minSalary: Number(values.get("minSalary")),
      maxSalary: Number(values.get("maxSalary")),
      salaryFrequency: String(values.get("salaryFrequency") ?? ""),
      responsibilities: String(values.get("responsibilities") ?? ""),
      requirements: String(values.get("requirements") ?? ""),
      description: String(values.get("description") ?? ""),
      applicantCount: job.applicantCount,
      recruiterId: job.recruiterId,
      companyId: job.companyId,
    }

    setIsSaving(true)

    try {
      await updateJob(job._id, jobData)
      toast.add({
        title: "Job updated",
        description: "Your changes have been saved.",
        type: "success",
      })
      setIsEditOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Failed to update job", error)
      toast.add({
        title: "Couldn't update job",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <Link
          href="/dashboard/recruiter/jobs"
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to jobs
        </Link>
        <p className="mb-1 text-xs text-muted-foreground">
          Manage Jobs / Job Details
        </p>
        <h1 className="text-3xl font-semibold">{job.jobTitle}</h1>
        <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="size-4" />
          {job.companyName}
        </p>
      </header>

      <main className="mx-auto max-w-5xl space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <DetailCard icon={Building2} label="Category" value={job.category} />
          <DetailCard icon={Clock3} label="Job type" value={job.jobType} />
          <DetailCard
            icon={MapPin}
            label="Work location"
            value={`${job.remote ? "Remote" : "On-site"} · ${job.location}`}
          />
          <DetailCard
            icon={Users}
            label="Applicants"
            value={String(job.applicantCount)}
            href={`/dashboard/recruiter/jobs/${job._id}/applications`}
          />
          <DetailCard
            icon={CalendarDays}
            label="Posted"
            value={formatDate(job.postedDate)}
          />
          <DetailCard
            icon={CalendarDays}
            label="Application deadline"
            value={formatDate(job.deadline)}
          />
        </div>

        <div className="rounded-2xl border bg-violet-500/5 p-5 md:p-6">
          <p className="text-xs font-medium text-muted-foreground">
            Compensation
          </p>
          <p className="mt-1 text-xl font-semibold text-violet-700 dark:text-violet-300">
            {formatSalary(job)}
          </p>
        </div>

        <DetailSection title="Job description" text={job.description} />
        <DetailSection title="Responsibilities" text={job.responsibilities} />
        <DetailSection title="Requirements" text={job.requirements} />

        <div className="sticky bottom-4 z-10 flex flex-col gap-3 rounded-xl border bg-card/95 p-3 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              onClick={() => setIsEditOpen(true)}
              className="bg-violet-600 text-white hover:bg-violet-500"
            >
              <Pencil className="size-4" />
              Update job
            </Button>
            <Button
              render={
                <Link
                  href={`/dashboard/recruiter/jobs/${job._id}/applications`}
                />
              }
              type="button"
              variant="outline"
            >
              See applicants
            </Button>
          </div>
          <DeleteJobDialog
            jobId={job._id}
            redirectTo="/dashboard/recruiter/jobs"
            showLabel
          />
        </div>
      </main>

      <Dialog.Root open={isEditOpen} onOpenChange={setIsEditOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-open:animate-in data-open:fade-in-0" />
          <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 flex max-h-[90vh] w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border bg-background shadow-xl">
            <div className="flex items-start justify-between border-b p-5">
              <div>
                <Dialog.Title className="text-lg font-semibold">
                  Update job
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-muted-foreground">
                  Edit the job details and save your changes.
                </Dialog.Description>
              </div>
              <Dialog.Close
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Close update form"
                  />
                }
              >
                <X className="size-4" />
              </Dialog.Close>
            </div>
            <JobEditForm
              job={job}
              isSaving={isSaving}
              onSubmit={handleSubmit}
              onCancel={() => setIsEditOpen(false)}
            />
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

function JobEditForm({
  job,
  isSaving,
  onSubmit,
  onCancel,
}: {
  job: JobListing
  isSaving: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onCancel: () => void
}) {
  return (
    <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 space-y-5 overflow-y-auto p-5">
        <FieldSet className="rounded-xl border bg-card">
          <FieldLegend className="w-full border-b px-5 py-4 text-sm">
            <span className="mr-2 text-violet-500">1.</span> Job information
          </FieldLegend>
          <FieldGroup className="grid gap-5 p-5 md:grid-cols-2">
            <Field className="md:col-span-2">
              <FieldLabel>Job title</FieldLabel>
              <Input
                name="jobTitle"
                defaultValue={job.jobTitle}
                className={inputClassName}
                required
              />
            </Field>
            <Field>
              <FieldLabel>Company name</FieldLabel>
              <Input
                name="companyName"
                defaultValue={job.companyName}
                className={inputClassName}
                required
              />
            </Field>
            <Field>
              <FieldLabel>Category</FieldLabel>
              <select
                name="category"
                defaultValue={job.category}
                className={selectClassName}
                required
              >
                {JOB_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </Field>
            <Field className="md:col-span-2">
              <FieldLabel>Job type</FieldLabel>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                {JOB_TYPES.map((type) => (
                  <label
                    key={type}
                    className="flex h-10 cursor-pointer items-center justify-center rounded-lg border text-sm has-checked:border-violet-500 has-checked:bg-violet-500/10"
                  >
                    <input
                      className="sr-only"
                      type="radio"
                      name="jobType"
                      value={type}
                      defaultChecked={job.jobType === type}
                      required
                    />
                    {type}
                  </label>
                ))}
              </div>
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSet className="rounded-xl border bg-card">
          <FieldLegend className="w-full border-b px-5 py-4 text-sm">
            <span className="mr-2 text-violet-500">2.</span> Location and
            compensation
          </FieldLegend>
          <FieldGroup className="grid gap-5 p-5 md:grid-cols-2">
            <Field>
              <FieldLabel>Work arrangement</FieldLabel>
              <label className="flex h-10 items-center gap-2 rounded-lg border px-3 text-sm">
                <input
                  type="checkbox"
                  name="remote"
                  value="yes"
                  defaultChecked={job.remote}
                />
                Remote work allowed
              </label>
            </Field>
            <Field>
              <FieldLabel>Location</FieldLabel>
              <div className="relative">
                <MapPin className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  name="location"
                  defaultValue={job.location}
                  className={`${inputClassName} pl-9`}
                  required
                />
              </div>
            </Field>
            <Field>
              <FieldLabel>Application deadline</FieldLabel>
              <div className="relative">
                <CalendarDays className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  name="deadline"
                  type="date"
                  defaultValue={job.deadline.split("T")[0]}
                  className={`${inputClassName} pl-9`}
                  required
                />
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel>Minimum salary</FieldLabel>
                <Input
                  name="minSalary"
                  type="number"
                  min="0"
                  defaultValue={job.minSalary}
                  className={inputClassName}
                  required
                />
              </Field>
              <Field>
                <FieldLabel>Maximum salary</FieldLabel>
                <Input
                  name="maxSalary"
                  type="number"
                  min="0"
                  defaultValue={job.maxSalary}
                  className={inputClassName}
                  required
                />
              </Field>
            </div>
            <Field className="md:col-span-2">
              <FieldLabel>Salary frequency</FieldLabel>
              <select
                name="salaryFrequency"
                defaultValue={job.salaryFrequency}
                className={selectClassName}
                required
              >
                <option value="per-hour">Per hour</option>
                <option value="per-day">Per day</option>
                <option value="per-month">Per month</option>
                <option value="per-year">Per year</option>
              </select>
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSet className="rounded-xl border bg-card">
          <FieldLegend className="w-full border-b px-5 py-4 text-sm">
            <span className="mr-2 text-violet-500">3.</span> Role details
          </FieldLegend>
          <FieldGroup className="grid gap-5 p-5">
            <Field>
              <FieldLabel>Job description</FieldLabel>
              <Textarea
                name="description"
                defaultValue={job.description}
                rows={5}
              />
            </Field>
            <Field>
              <FieldLabel>Responsibilities</FieldLabel>
              <Textarea
                name="responsibilities"
                defaultValue={job.responsibilities}
                rows={4}
              />
            </Field>
            <Field>
              <FieldLabel>Requirements</FieldLabel>
              <Textarea
                name="requirements"
                defaultValue={job.requirements}
                rows={4}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>

      <div className="flex justify-end gap-2 border-t bg-background p-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSaving}
          className="bg-violet-600 text-white hover:bg-violet-500"
        >
          {isSaving ? "Updating..." : "Save changes"}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </form>
  )
}
