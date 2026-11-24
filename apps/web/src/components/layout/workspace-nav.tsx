"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { workspaceLinks } from "@/config/navigation";
import { cn } from "@/lib/utils";
export function WorkspaceNav() { const path = usePathname(); return <nav aria-label="Workspace navigation" className="flex flex-wrap gap-1 lg:flex-col">{workspaceLinks.map(({href,label,icon:Icon})=>{ const active = href === "/dashboard" ? path === href : path === href || path.startsWith(`${href}/`); return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={cn("flex min-h-11 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground", active && "bg-secondary text-secondary-foreground font-semibold")}><Icon className="size-4 shrink-0" aria-hidden="true" />{label}</Link>; })}</nav>; }
