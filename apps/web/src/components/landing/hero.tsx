import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ShieldCheck, IndianRupee, Scale, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function Hero() {
  return <section className="site-container pt-6 sm:pt-9">
    <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-36 size-[420px] rounded-full border border-white/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-20 size-[300px] rounded-full border border-white/10" />
      <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6"><span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-mint"><span className="size-2 rounded-full bg-gold" /> Financial clarity, built for India</span>
          <h1 className="max-w-2xl text-4xl font-semibold leading-[1.09] tracking-[-0.05em] sm:text-5xl lg:text-6xl">Borrow smarter.<br/><span className="text-gold">Move forward.</span></h1>
          <p className="max-w-xl text-base leading-7 text-mint/90 sm:text-lg">Understand your options before you borrow. Discover loans, compare the real cost, and prepare for your next financial decision.</p>
          <div className="flex flex-wrap gap-3"><Button asChild variant="accent" size="lg" className="focus-visible:outline-gold"><Link href="/loans">Explore loans <ArrowRight /></Link></Button><Button asChild variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 focus-visible:outline-gold"><Link href="/calculators">Plan your borrowing</Link></Button></div>
          <p className="flex items-center gap-2 text-xs text-mint/90"><ShieldCheck className="size-4 shrink-0" aria-hidden="true" /> No loan applications or credit checks in this preview.</p>
        </div>
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-3 sm:p-4">
            <div className="rounded-xl bg-[#f8faf8] p-5 text-[#18241e] sm:p-6">
              <div className="flex items-start justify-between gap-2"><div><p className="text-xs font-semibold uppercase tracking-widest text-[#5f7066]">Illustrative example</p><h2 className="mt-2 text-xl font-semibold tracking-tight">A clearer loan picture</h2></div><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-mint text-brand"><IndianRupee className="size-5" /></span></div>
              <div className="mt-5 rounded-xl bg-brand p-4 text-white"><p className="text-xs text-mint">Example loan amount</p><p className="mt-1 text-3xl font-semibold tracking-tight">₹5,00,000</p><div className="mt-4 flex items-center gap-2 text-xs text-mint"><CalendarDays className="size-4" /> 36 months <span className="text-gold">•</span> 12% p.a.</div></div>
              <div className="mt-5 flex items-center justify-between gap-2"><div><p className="text-xs text-[#5f7066]">Estimated monthly EMI</p><p className="mt-1 text-2xl font-semibold tabular-nums">₹16,607</p></div><span className="rounded-full bg-[#f8e8c5] px-2.5 py-1 text-[11px] font-semibold text-gold-ink">Example only</span></div>
              <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-mint" aria-label="Illustrative share: 84 percent principal and 16 percent interest" role="img"><span className="w-[84%] bg-brand-light"/><span className="flex-1 bg-gold"/></div>
              <div className="mt-2 flex justify-between gap-2 text-[11px] text-[#5f7066]"><span>Principal</span><span>Interest</span></div>
              <div className="mt-5 flex items-center gap-2 border-t border-[#dce5de] pt-4 text-xs text-[#5f7066]"><Check className="size-4 shrink-0 text-brand-light" /> Illustrative fixed rate; fees excluded.</div>
            </div>
            <div className="flex items-center justify-between gap-2 px-2 pb-1 pt-3 text-xs text-mint"><span className="flex items-center gap-2"><Scale className="size-4" /> Know the cost, not just the rate.</span><ArrowUpRight className="size-4" /></div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>;
}
