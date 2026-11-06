"use client"

import { toast } from "@/components/ui/toast"
import { authClient } from "@/lib/auth-client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"

const inputClasses =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-violet-500 focus:ring-3 focus:ring-violet-500/30"

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const { data, error } = await authClient.signUp.email({
      name: name as string,
      email: email as string,
      password: password as string,
    })

    if (data) {
      toast.add({ title: "Account created successfully!", type: "success" })
      router.push("/signin")
    }
    if (error) {
      toast.add({
        title: error.message ?? "Something went wrong. Please try again.",
        type: "error",
      })
    }
  }

  function handleGoogleSignUp() {
    console.log("Google sign up clicked")
  }

  return (
    <div className="flex min-h-[calc(100svh-96px)] items-center justify-center bg-zinc-950 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/70 p-8 shadow-lg shadow-black/20 backdrop-blur-xl">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/brand/logo.png"
            alt="HireLoop"
            width={84}
            height={24}
            className="h-8 w-auto"
          />
        </div>

        <h1 className="mt-6 text-center text-2xl font-semibold text-white">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs font-medium text-white/60">
              Full name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClasses}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium text-white/60"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-medium text-white/60"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClasses}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 h-10 w-full rounded-lg border border-transparent bg-violet-500 text-sm font-medium text-white transition-colors hover:bg-violet-400"
          >
            Get Started
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/40">or continue with</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-white/50">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-violet-400 hover:text-violet-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
