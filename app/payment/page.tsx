import Link from "next/link"

export default function PaymentPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#080809] text-white">
      <div className="mx-auto w-full max-w-5xl flex-1 px-5 py-5 sm:px-8 sm:py-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-white/60">
            <Link
              href="/"
              aria-label="Go back"
              className="transition-colors hover:text-white"
            >
              ←
            </Link>
            <span
              aria-label="Secure checkout"
              className="flex h-5 w-5 items-center justify-center rounded-sm bg-white/10 text-[11px] text-white/80"
            > 
              🔒
            </span>
          </div>
          <span className="rounded-sm bg-white/10 px-2 py-1 text-[9px] font-semibold tracking-wider text-white/70">
            SANDBOX
          </span>
        </header>

        <div className="mx-auto mt-8 grid max-w-4xl gap-10 md:mt-12 md:grid-cols-2 md:gap-12">
          <section aria-label="Order summary" className="md:pt-1">
            <h1 className="text-[10px] font-medium tracking-[0.12em] text-white/55">
              CHOOSE A CURRENCY
            </h1>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                aria-pressed="true"
                className="flex h-11 items-center gap-2 rounded-md border border-white/60 bg-white/3 px-3 text-left text-xs font-medium"
              >
                <span aria-hidden="true">🇧🇩</span>
                <span>BDT 2,553.33</span>
              </button>
              <button
                type="button"
                aria-pressed="false"
                className="flex h-11 items-center gap-2 rounded-md border border-white/10 px-3 text-left text-xs text-white/70 transition-colors hover:border-white/30"
              >
                <span aria-hidden="true">🇺🇸</span>
                <span>$20.00</span>
              </button>
            </div>

            <p className="mt-2 text-[9px] text-white/35">
              1 USD = 127.6667 BDT
            </p>

            <div className="mt-8 flex items-start justify-between gap-4 border-t border-white/10 pt-5">
              <div>
                <h2 className="text-sm font-medium">HireLoop Pro Plan</h2>
                <p className="mt-1 text-[10px] text-white/45">
                  Access to all features
                </p>
              </div>
              <p className="whitespace-nowrap text-xs font-medium">
                BDT 2,553.33
              </p>
            </div>
          </section>

          <section aria-label="Payment details">
            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#00d084] text-xs font-semibold text-[#06251b] transition-colors hover:bg-[#00bd77]"
            >
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#06251b] text-[9px] text-[#00d084]">
                ↗
              </span>
              Link
              <span className="rounded bg-[#1a1f71] px-1.5 py-0.5 text-[8px] font-bold text-white">
                VISA
              </span>
              <span>4242</span>
            </button>

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-[9px] text-white/40">OR</span>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <form className="space-y-4">
              <div>
                <h2 className="mb-2 text-xs font-medium">Contact information</h2>
                <label
                  htmlFor="email"
                  className="mb-1 block text-[10px] text-white/55"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="h-10 w-full rounded-md border border-white/10 bg-white/[0.07] px-3 text-xs text-white outline-none placeholder:text-white/35 focus:border-white/30"
                />
              </div>

              <div>
                <h2 className="mb-2 text-xs font-medium">Payment method</h2>
                <div className="overflow-hidden rounded-md border border-white/10">
                  <div className="flex h-9 items-center gap-2 bg-white/[0.07] px-3 text-[10px] text-white/75">
                    <span
                      aria-hidden="true"
                      className="flex h-3.5 w-5 items-center justify-center rounded-sm border border-white/40 text-[8px]"
                    >
                      ▭
                    </span>
                    Card
                  </div>

                  <div className="space-y-2 border-t border-white/10 p-2">
                    <div>
                      <label
                        htmlFor="card-number"
                        className="mb-1 block text-[9px] font-medium tracking-wide text-white/55"
                      >
                        CARD INFORMATION
                      </label>
                      <input
                        id="card-number"
                        type="text"
                        inputMode="numeric"
                        placeholder="1234 1234 1234 1234"
                        className="h-9 w-full rounded-t-md border border-white/10 bg-white/6 px-2.5 text-xs text-white outline-none placeholder:text-white/35 focus:border-white/30"
                      />
                      <div className="grid grid-cols-2">
                        <input
                          type="text"
                          placeholder="MM / YY"
                          aria-label="Expiration date"
                          className="h-9 rounded-bl-md border border-t-0 border-white/10 bg-white/6 px-2.5 text-xs text-white outline-none placeholder:text-white/35 focus:border-white/30"
                        />
                        <input
                          type="text"
                          placeholder="CVC"
                          aria-label="Security code"
                          className="h-9 rounded-br-md border border-t-0 border-l-0 border-white/10 bg-white/6 px-2.5 text-xs text-white outline-none placeholder:text-white/35 focus:border-white/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="cardholder"
                        className="mb-1 block text-[9px] font-medium tracking-wide text-white/55"
                      >
                        CARDHOLDER NAME
                      </label>
                      <input
                        id="cardholder"
                        type="text"
                        placeholder="Full name on card"
                        className="h-9 w-full rounded-md border border-white/10 bg-white/6 px-2.5 text-xs text-white outline-none placeholder:text-white/35 focus:border-white/30"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="country"
                        className="mb-1 block text-[9px] font-medium tracking-wide text-white/55"
                      >
                        COUNTRY OR REGION
                      </label>
                      <select
                        id="country"
                        defaultValue="Bangladesh"
                        className="h-9 w-full rounded-md border border-white/10 bg-[#171719] px-2.5 text-xs text-white outline-none focus:border-white/30"
                      >
                        <option>Bangladesh</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-2.5 rounded-md border border-white/10 p-3">
                <input
                  type="checkbox"
                  className="mt-0.5 h-3.5 w-3.5 accent-[#0875e1]"
                />
                <span>
                  <span className="block text-[10px] font-medium">
                    Save my information for faster checkout
                  </span>
                  <span className="mt-1 block text-[9px] text-white/45">
                    My details will be saved with Link for future payments.
                  </span>
                </span>
              </label>

              <button
                type="button"
                className="h-11 w-full rounded-md bg-[#0875e1] text-xs font-semibold text-white transition-colors hover:bg-[#1683ee]"
              >
                Pay
              </button>
            </form>
          </section>
        </div>
      </div>

      <footer className="border-t border-white/10 py-5 text-center text-[9px] text-white/40">
        <p>Powered by Stripe</p>
        <div className="mt-3 flex justify-center gap-5">
          <a href="#" className="transition-colors hover:text-white/70">
            Terms
          </a>
          <a href="#" className="transition-colors hover:text-white/70">
            Privacy
          </a>
        </div>
      </footer>
    </main>
  )
}
