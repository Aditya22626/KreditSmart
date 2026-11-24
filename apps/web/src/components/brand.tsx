import Link from "next/link";
import { cn } from "@/lib/utils";
export function Brand({ inverse = false }: { inverse?: boolean }) {
  return <Link href="/" aria-label="KreditSmart home" className={cn("inline-flex w-fit items-center gap-2.5 font-bold tracking-tight", inverse ? "text-white" : "text-foreground")}>
    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand text-gold ring-1 ring-white/15" aria-hidden="true"><svg viewBox="0 0 32 32" className="size-7" fill="none"><path d="M7 24V8h4v7l8-7h5l-9 8 10 8h-6l-8-7v7H7Z" fill="currentColor"/><path d="m21 5 5 0 0 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg></span>
    <span className="text-xl">Kredit<span className={inverse ? "text-gold" : "text-brand-light dark:text-primary"}>Smart</span></span>
  </Link>;
}
