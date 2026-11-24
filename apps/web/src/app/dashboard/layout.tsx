import type { ReactNode } from "react";
import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { WorkspaceNav } from "@/components/layout/workspace-nav";
import { Badge } from "@/components/ui/badge";
export default function DashboardLayout({ children }: { children: ReactNode }) { return <div className="min-h-screen lg:grid lg:grid-cols-[250px_minmax(0,1fr)]"><aside className="border-b bg-card p-4 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r lg:p-5"><Brand/><p className="eyebrow mb-3 mt-7">Workspace</p><WorkspaceNav/><div className="mt-6 hidden rounded-xl bg-brand p-4 text-white lg:block"><p className="text-xs font-semibold text-gold">KREDITSMART PREVIEW</p><p className="mt-2 text-sm leading-relaxed text-mint">Your financial decisions. Your pace.</p></div></aside><div className="min-w-0"><header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b bg-card px-5 py-3 sm:px-8"><Badge>Guest preview</Badge><ThemeToggle/></header><main id="main-content" className="mx-auto max-w-6xl p-5 sm:p-8">{children}</main></div></div>; }
