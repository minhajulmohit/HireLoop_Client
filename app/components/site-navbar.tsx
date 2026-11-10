"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useTheme } from "next-themes"
import { Menu, Moon, Sun, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { signOut, useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export function SiteNavbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  const navLinks = [
    { label: "Browse Jobs", href: "/browse-jobs" },
    { label: "Company", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Dashboard", href: `/dashboard/${session?.user?.role}` },
  ]

  const handleSignOut = async () => {
    const { error } = await signOut()

    if (error) {
      toast.add({
        title: error.message ?? "Could not sign out. Please try again.",
        type: "error",
      })
      return
    }

    setOpen(false)
    router.replace("/")
  }

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="mx-auto max-w-7xl">
        <nav className="flex h-16 items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white/70 px-4 shadow-lg shadow-black/5 backdrop-blur-xl md:px-6 dark:border-white/10 dark:bg-zinc-950/70 dark:shadow-black/20">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label="HireLoop home"
          >
            <Image
              src="/brand/logo.png"
              alt="HireLoop"
              width={126}
              height={36}
              priority
              className="h-7 w-auto md:h-9"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden min-w-0 items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground dark:text-white/70 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            <span
              aria-hidden="true"
              className="h-5 w-px bg-foreground/15 dark:bg-white/15"
            />

            {session?.user ? (
              <>
                <span>Welcome {session?.user.name}! </span>
                <Button
                  size="lg"
                  onClick={handleSignOut}
                  className="mt-1 h-10 border-transparent bg-violet-500 text-white hover:bg-violet-600 dark:bg-violet-500 dark:hover:bg-violet-400"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-violet-600 transition-colors hover:bg-violet-500/10 hover:text-violet-500 dark:text-violet-400 dark:hover:bg-white/10 dark:hover:text-violet-300"
                >
                  Sign In
                </Link>

                <Button
                  size="lg"
                  render={<Link href="/signup" />}
                  onClick={() => setOpen(false)}
                  className="mt-1 h-10 border-transparent bg-violet-500 text-white hover:bg-violet-600 dark:bg-violet-500 dark:hover:bg-violet-400"
                >
                  Get Started
                </Button>
              </>
            )}

            {/* Theme toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex size-10 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="mt-2 animate-in overflow-hidden rounded-2xl border border-black/10 bg-white/70 shadow-lg shadow-black/5 backdrop-blur-xl duration-200 fade-in slide-in-from-top-2 md:hidden dark:border-white/10 dark:bg-zinc-950/70 dark:shadow-black/20">
            <div className="flex flex-col gap-1 p-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-2 h-px bg-foreground/10 dark:bg-white/10" />

              {session?.user ? (
                <>
                  <span>Welcome {session?.user.name}</span>
                  <Button
                    size="lg"
                    onClick={handleSignOut}
                    className="mt-1 h-10 border-transparent bg-violet-500 text-white hover:bg-violet-600 dark:bg-violet-500 dark:hover:bg-violet-400"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-violet-600 transition-colors hover:bg-violet-500/10 hover:text-violet-500 dark:text-violet-400 dark:hover:bg-white/10 dark:hover:text-violet-300"
                  >
                    Sign In
                  </Link>

                  <Button
                    size="lg"
                    render={<Link href="/signup" />}
                    onClick={() => setOpen(false)}
                    className="mt-1 h-10 border-transparent bg-violet-500 text-white hover:bg-violet-600 dark:bg-violet-500 dark:hover:bg-violet-400"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex size-10 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
    >
      {/* Server render both icons; CSS decides, avoiding hydration mismatch
          (same pattern next-themes recommends). */}
      <Sun className="size-5 dark:hidden" />
      <Moon className="hidden size-5 dark:block" />
    </button>
  )
}
