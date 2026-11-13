import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowRight, Check, ShieldCheck } from "lucide-react"

import { stripe } from "../../../lib/stripe"
import { paymentSuccessVerify } from "@/lib/actions/payments"

export default async function paymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)")

  const { status, payment_status, amount_total, currency } =
    await stripe.checkout.sessions.retrieve(session_id)

  if (status === "open") {
    return redirect("/")
  }

  if (status === "complete" && payment_status === "paid") {
    await paymentSuccessVerify(session_id)

    const formattedAmount =
      amount_total !== null
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency ?? "USD",
          }).format(amount_total / 100)
        : null

    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090b] px-4 py-10 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[10%] h-24 w-56 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl"
        />

        <section
          id="success"
          className="relative w-full max-w-md rounded-xl border border-white/8 bg-[#141417] px-6 py-7 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:px-8"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/10">
            <Check aria-hidden="true" className="h-6 w-6" strokeWidth={2.5} />
          </div>

          <p className="mx-auto mt-5 w-fit rounded-full border border-blue-400/20 bg-blue-400/8 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-blue-300">
            Upgrade successful
          </p>
          <h1 className="mt-3 text-lg font-medium tracking-tight">
            Welcome to HireLoop Pro
          </h1>
          <p className="mx-auto mt-3 max-w-xs text-xs leading-5 text-white/55">
            Your payment
            {formattedAmount && (
              <>
                {" "}of{" "}
                <span className="font-medium text-white">
                  {formattedAmount}
                </span>
              </>
            )}{" "}
            was received perfectly. All advanced premium recruiting modules are
            now unlocked on your account.{" "}
            <span className="text-emerald-400">
              You may need to re-authenticate to see the effect.
            </span>
          </p>

          <div className="mt-5 flex min-w-0 items-center gap-2 rounded-md border border-white/8 bg-[#0e0e11] px-3 py-2.5 text-left">
            <ShieldCheck
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 text-white/45"
            />
            <span className="shrink-0 text-[10px] text-white/55">
              Session ID Verified
            </span>
            <span className="min-w-0 flex-1 truncate rounded bg-white/6 px-1.5 py-1 text-right font-mono text-[9px] text-white/45">
              {session_id}
            </span>
          </div>

          <Link
            href="/dashboard/seeker"
            className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-white text-xs font-semibold text-[#111113] transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Go to Workspace Dashboard
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </section>
      </main>
    )
  }
}
