import Link from "next/link";
import { Brand } from "@/components/brand";
import { publicLinks } from "@/config/navigation";
export function SiteFooter() {
  return <footer className="border-t bg-card"><div className="site-container py-10">
    <div className="flex flex-col justify-between gap-8 md:flex-row"><div className="max-w-sm space-y-3"><Brand /><p className="text-sm leading-relaxed text-muted-foreground">Clearer borrowing decisions, built for India. KreditSmart is an informational platform, not a lender or credit bureau.</p></div><nav aria-label="Footer navigation" className="flex flex-wrap content-start gap-x-6 gap-y-3 text-sm font-medium">{publicLinks.map(l => <Link key={l.href} href={l.href} className="hover:underline">{l.label}</Link>)}<Link href="/dashboard" className="hover:underline">Dashboard</Link></nav></div>
    <div className="mt-8 flex flex-wrap justify-between gap-2 border-t pt-5 text-xs text-muted-foreground"><span>© 2026 KreditSmart.</span><span>Development preview · No loan applications or financial data collected.</span></div>
  </div></footer>;
}
