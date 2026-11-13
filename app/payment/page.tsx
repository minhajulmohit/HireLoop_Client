import Link from "next/link"

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>
}) {
  const { canceled } = await searchParams

  return (
    <main className="flex min-h-screen flex-col bg-[#080809] text-white">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
        <Link
          href="/"
          aria-label="Go back"
          className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
        >
          <span aria-hidden="true">←</span>
          <span>HireLoop</span>
        </Link>
        <span className="flex items-center gap-1.5 text-xs text-white/50">
          <span aria-hidden="true">🔒</span>
          Secure checkout
        </span>
      </header>

      <div className="flex flex-1 items-center justify-center px-5 py-10">
        <section className="w-full max-w-md rounded-xl border border-white/10 bg-white/3 p-6 shadow-2xl shadow-black/20 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
            Checkout
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Complete your payment
          </h1>
          <p className="mt-2 text-sm text-white/55">
            Review your plan and continue to secure checkout.
          </p>

          {canceled && (
            <p
              role="status"
              className="mt-5 rounded-md border border-amber-400/20 bg-amber-400/10 px-3 py-2.5 text-sm text-amber-200"
            >
              Payment was canceled. You can try again whenever you&apos;re
              ready.
            </p>
          )}

          <div className="mt-7 rounded-lg border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-medium">HireLoop Pro Plan</h2>
                <p className="mt-1 text-xs text-white/50">
                  Access to all Pro features
                </p>
              </div>
              <p className="whitespace-nowrap text-sm font-semibold">
                $20.00
                <span className="ml-1 text-xs font-normal text-white/45">
                  USD
                </span>
              </p>
            </div>
            <div className="mt-4 border-t border-white/10 pt-3 text-xs text-white/50">
              One-time payment
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-lg border border-white/10 px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#635bff]/15 text-lg font-bold text-[#a8a2ff]">
              S
            </span>
            <div>
              <p className="text-sm font-medium">Pay securely with Stripe</p>
              <p className="mt-1 text-xs text-white/45">
                Your payment details are entered on Stripe.
              </p>
            </div>
          </div>

          <form action="/api/checkout_sessions" method="POST" className="mt-6">
            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center rounded-md bg-[#635bff] text-sm font-semibold text-white transition-colors hover:bg-[#756eff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a8a2ff]"
            >
              Continue to payment
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </button>
          </form>

          <p className="mt-4 text-center text-xs leading-5 text-white/40">
            You&apos;ll be redirected to Stripe&apos;s secure checkout to
            complete your payment.
          </p>
        </section>
      </div>

      <footer className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        Powered by Stripe
      </footer>
    </main>
  )
}
