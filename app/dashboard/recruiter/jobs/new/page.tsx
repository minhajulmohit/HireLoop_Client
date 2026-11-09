"use client"

import { FormEvent, useState } from "react"
import { ArrowRight, CalendarDays, Building2, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldLabel,
} from "@/components/ui/field"
import { createJob } from "@/lib/actions/jobs"
import type { JobFormData } from "@/lib/actions/jobs"
import { toast } from "@/components/ui/toast"

const inputClassName =
  "h-10 rounded-lg border border-input bg-background px-3 text-sm dark:bg-input/30"
const selectClassName =
  "h-10 w-full rounded-lg border border-input bg-background text-foreground px-3 text-sm outline-none [&>option]:bg-background [&>option]:text-foreground dark:bg-input/30 dark:text-foreground dark:[color-scheme:dark]"

export default function AddJobsPage() {
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const raw = new FormData(event.currentTarget)
    const now = new Date()
    const postedDate = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-")

    const jobData: JobFormData = {
      jobTitle: raw.get("jobTitle") as string,
      companyName: raw.get("companyName") as string,
      category: raw.get("category") as string,
      jobType: raw.get("jobType") as string,
      postedDate,
      remote: raw.get("remote") === "yes",
      location: raw.get("location") as string,
      deadline: raw.get("deadline") as string,
      minSalary: Number(raw.get("minSalary")),
      maxSalary: Number(raw.get("maxSalary")),
      salaryFrequency: raw.get("salaryFrequency") as string,
      responsibilities: raw.get("responsibilities") as string,
      requirements: raw.get("requirements") as string,
    }

    const result = await createJob(jobData)

    if (result?.message) {
      toast.add({ title: result.message, type: "success" })
      setSubmitted(true)
      form.reset()
    } else {
      toast.add({
        title: "Something went wrong while posting the job. Please try again.",
        type: "error",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 md:p-6 lg:p-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-xs text-muted-foreground">
            Manage Jobs / Create New Exam
          </p>
          <h1 className="text-3xl font-semibold">Post a New Job</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in the position specifications to attract qualified talent.
          </p>
        </div>
      </div>

      {submitted && (
        <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
          Job posted successfully.
        </div>
      )}

      <FieldSet className="mb-8 rounded-xl border bg-card">
        <FieldLegend className="w-full border-b px-5 py-4 text-sm">
          <span className="mr-2 text-violet-500">1.</span> Basic Information
        </FieldLegend>
        <FieldGroup className="grid gap-5 p-5 md:grid-cols-2">
          <Field className="md:col-span-2">
            <FieldLabel>Job Title</FieldLabel>
            <Input
              name="jobTitle"
              placeholder="Enter a job title"
              className={inputClassName}
              required
            />
          </Field>

          <Field>
            <FieldLabel>Company Name</FieldLabel>
            <div className="relative">
              <Building2 className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="companyName"
                placeholder="Enter your company name"
                className={`${inputClassName} pl-9`}
                required
              />
            </div>
          </Field>

          <Field>
            <FieldLabel>Job Category</FieldLabel>
            <select name="category" className={selectClassName} required>
              <option value="" disabled>
                Select category
              </option>
              <option>Engineering &amp; Tech</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Sales</option>
            </select>
          </Field>

          <Field className="md:col-span-2">
            <FieldLabel>Job Type</FieldLabel>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {["Full-time", "Part-time", "Contract", "Internship"].map(
                (type) => (
                  <label
                    key={type}
                    className="flex h-10 cursor-pointer items-center justify-center rounded-lg border text-sm has-checked:border-violet-500 has-checked:bg-violet-500/10"
                  >
                    <input
                      className="sr-only"
                      type="radio"
                      name="jobType"
                      value={type}
                      defaultChecked={type === "Full-time"}
                    />
                    {type}
                  </label>
                )
              )}
            </div>
          </Field>
        </FieldGroup>
      </FieldSet>

      <FieldSet className="mb-8 rounded-xl border bg-card">
        <FieldLegend className="w-full border-b px-5 py-4 text-sm">
          <span className="mr-2 text-violet-500">2.</span> Location,
          Compensation &amp; Timeline
        </FieldLegend>
        <FieldGroup className="grid gap-5 p-5 md:grid-cols-2">
          <Field>
            <FieldLabel>Work Location</FieldLabel>
            <label className="flex items-center gap-2 rounded-lg border p-3 text-sm">
              <input type="checkbox" name="remote" value="yes" />
              Remote work allowed
            </label>
          </Field>

          <Field>
            <FieldLabel>Job Location (Location)</FieldLabel>
            <div className="relative">
              <MapPin className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="location"
                placeholder="Enter job location"
                className={`${inputClassName} pl-9`}
              />
            </div>
          </Field>

          <Field>
            <FieldLabel>Application Deadline (deadline)</FieldLabel>
            <div className="relative">
              <CalendarDays className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="deadline"
                type="date"
                className={`${inputClassName} pl-9`}
              />
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel>Min Salary / Rate</FieldLabel>
              <Input
                name="minSalary"
                type="number"
                placeholder="$$"
                className={inputClassName}
              />
            </Field>
            <Field>
              <FieldLabel>Max Salary / Rate</FieldLabel>
              <Input
                name="maxSalary"
                type="number"
                placeholder="$$"
                className={inputClassName}
              />
            </Field>
          </div>

          <Field className="md:col-span-2">
            <FieldLabel>Salary Frequency</FieldLabel>
            <select name="salaryFrequency" className={selectClassName} required>
              <option value="" disabled>
                Select frequency
              </option>
              <option value="per-hour">Per Hour</option>
              <option value="per-day">Per Day</option>
              <option value="per-month">Per Month</option>
              <option value="per-year">Per Year</option>
            </select>
          </Field>
        </FieldGroup>
      </FieldSet>

      <FieldSet className="mb-8 rounded-xl border bg-card">
        <FieldLegend className="w-full border-b px-5 py-4 text-sm">
          <span className="mr-2 text-violet-500">3.</span> Responsibilities
          &amp; Requirements
        </FieldLegend>
        <FieldGroup className="grid gap-5 p-5">
          <Field>
            <FieldLabel>Key Responsibilities</FieldLabel>
            <Textarea
              name="responsibilities"
              placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences."
              rows={4}
            />
          </Field>

          <Field>
            <FieldLabel>Qualifications &amp; Requirements</FieldLabel>
            <Textarea
              name="requirements"
              placeholder="5+ years of experience with React, TypeScript, and modern state architectures."
              rows={5}
            />
          </Field>
        </FieldGroup>
      </FieldSet>
      <div className="mb-8 flex flex-col items-start justify-end gap-4 sm:flex-row sm:items-center">
        {" "}
        <Button
          type="submit"
          className="bg-violet-600 text-white hover:bg-violet-500"
        >
          Publish Job <ArrowRight className="ml-1" />
        </Button>
      </div>
    </form>
  )
}
