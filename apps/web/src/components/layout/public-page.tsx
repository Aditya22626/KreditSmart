import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
export function PublicPage({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) { return <><SiteHeader /><main id="main-content" className="site-container min-h-[65vh] py-10 sm:py-16"><p className="eyebrow">{eyebrow}</p><h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1><p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{description}</p><div className="mt-8">{children}</div></main><SiteFooter /></>; }
