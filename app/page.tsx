export default function Page() {
  return (
    <div className="min-h-svh bg-background">
      <main className="flex min-h-svh items-start justify-center p-6 pt-8">
        <div className="max-w-md flex-col gap-4 text-sm leading-loose">
          <h1 className="font-medium text-foreground">Homepage</h1>
          <p className="text-muted-foreground">
            Navbar preview — toggle the theme with the sun/moon button (or press
            &quot;d&quot;) and scroll to see the sticky glass effect.
          </p>
        </div>
      </main>
    </div>
  )
}
