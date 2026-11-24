import Link from "next/link";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
export default function NotFound() { return <main id="main-content" className="site-container grid min-h-screen place-items-center py-12 text-center"><div className="max-w-md"><Brand/><p className="mt-8 text-6xl font-semibold text-brand-light dark:text-primary">404</p><h1 className="mt-3 text-2xl font-semibold">Page not found</h1><p className="mt-3 text-muted-foreground">This page may have moved or does not exist yet.</p><Button asChild className="mt-6"><Link href="/">Back to homepage</Link></Button></div></main>; }
