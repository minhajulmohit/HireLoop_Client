import {

  Building2,
  MapPin,
  Search,
  ThumbsUp,
  Users,
  BriefcasePlus,
} from "lucide-react"
import Image from "next/image"

const trendingTags = ["Product Designer", "AI Engineering", "Game Developer"]

const stats = [
  { icon: BriefcasePlus, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: ThumbsUp, value: "97%", label: "Satisfaction Rate" },
]

export function HeroSection() {
  return (
    <section className="relative flex min-h-svh flex-col items-center overflow-hidden px-4 pb-8">
      
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[45%] h-[78.6vw] mask-[linear-gradient(to_bottom,transparent,black_10%)]"
      >
        <Image
          src="/graphics/globe.png"
          alt=""
          width={1440}
          height={1882}
          priority
          className="absolute top-0 left-1/2 w-full max-w-none -translate-x-1/2 translate-y-[-39.85%]"
        />
      </div>

      {/* Top content */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center pt-14 text-center text-balance sm:pt-20">
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
          <span className="text-xl">💼</span>
          <span className="text-xs font-semibold text-orange-300">50,000+</span>
          <span className="text-[11px] tracking-widest text-white/50 uppercase">
            New jobs this month
          </span>
        </div>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role-faster.
        </p>

        {/* Search bar */}
        <div className="mt-8 flex w-full max-w-xl flex-col gap-2 rounded-2xl border border-white/10 bg-zinc-950/80 p-2 shadow-lg shadow-black/20 backdrop-blur-md sm:flex-row sm:items-center">
          <label className="flex flex-1 items-center gap-2 px-3 py-2">
            <Search className="size-4 shrink-0 text-white/40" />
            <input
              type="text"
              placeholder="Job title or company"
              className="w-full text-sm text-white outline-none placeholder:text-white/40"
            />
          </label>

          <div className="flex flex-1 items-center gap-2 px-3 py-2 sm:border-l sm:border-white/10">
            <MapPin className="size-4 shrink-0 text-white/40" />
            <input
              type="text"
              placeholder="Location or Remote"
              className="w-full text-sm text-white outline-none placeholder:text-white/40"
            />
          </div>

          <button
            type="button"
            aria-label="Search jobs"
            className="flex size-10 shrink-0 items-center justify-center self-end rounded-[8px] bg-violet-500 text-white transition-colors hover:bg-violet-400 sm:self-auto"
          >
            <Search className="size-6 font-bold" />
          </button>
        </div>

        {/* Trending tags */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-white/50">Trending:</span>
          {trendingTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom content — text + stats over the globe */}
      <div className=" relative z-10 mt-auto flex w-full max-w-5xl flex-col items-center pt-24">
        <p className="text-center text-xl font-medium text-white sm:text-2xl">
          Assisting over 15,000 job seekers
          <br />
          <span className="text-white/70">find their dream job positions.</span>
        </p>

        <div className="mt-6 grid w-full grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex h-32 flex-col items-start justify-between rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-xl sm:h-36 sm:p-5"
            >
              <stat.icon className="size-4 text-white/70" />
              <div>
                <div className="text-2xl font-semibold text-white sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-white/50">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
