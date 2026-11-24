"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { publicLinks } from "@/config/navigation";
import { cn } from "@/lib/utils";
export function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="relative z-20 border-b bg-background">
    <div className="site-container flex min-h-18 items-center justify-between gap-4 py-3">
      <Brand />
      <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
        {publicLinks.map(l => <Link key={l.href} href={l.href} aria-current={path === l.href ? "page" : undefined} className={cn("text-sm font-medium text-muted-foreground hover:text-foreground", path === l.href && "text-foreground underline underline-offset-8")}>{l.label}</Link>)}
      </nav>
      <div className="hidden items-center gap-3 lg:flex"><ThemeToggle /><Button asChild><Link href="/dashboard">Open dashboard <ArrowUpRight /></Link></Button></div>
      <button type="button" className="grid size-11 place-items-center rounded-lg border lg:hidden" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="site-container space-y-2 border-t py-4 lg:hidden" onKeyDown={e => { if (e.key === "Escape") setOpen(false); }}>
      {publicLinks.map(l => <Link key={l.href} href={l.href} onClick={() => setOpen(false)} aria-current={path === l.href ? "page" : undefined} className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted">{l.label}</Link>)}
      <Button asChild className="w-full"><Link href="/dashboard" onClick={() => setOpen(false)}>Open dashboard <ArrowUpRight /></Link></Button><ThemeToggle />
    </nav>}
  </header>;
}
