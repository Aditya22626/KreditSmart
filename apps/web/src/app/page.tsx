export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Development Environment
        </div>

        <h1 className="text-6xl font-bold tracking-tight sm:text-8xl">
          Kredit<span className="text-emerald-400">Smart</span>
        </h1>

        <p className="mt-6 text-xl text-slate-300 sm:text-2xl">
          Borrow smarter. Stay financially informed.
        </p>

        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-slate-400">
          An intelligent platform for loan discovery,
          financial analysis, transparent comparisons,
          and informed borrowing decisions.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Discover",
              description: "Explore loan products",
            },
            {
              title: "Compare",
              description: "Understand borrowing costs",
            },
            {
              title: "Analyze",
              description: "AI-powered financial insights",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h2 className="font-semibold text-emerald-400">
                {feature.title}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-xs text-slate-500">
          KreditSmart v0.1.0 · Foundation
        </p>
      </div>
    </main>
  );
}