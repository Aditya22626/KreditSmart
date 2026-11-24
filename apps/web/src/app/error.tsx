"use client";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <main id="main-content" className="site-container grid min-h-[70vh] place-items-center py-12 text-center"><div className="max-w-md"><AlertCircle className="mx-auto size-10 text-destructive"/><h1 className="mt-5 text-3xl font-semibold">Something went wrong</h1><p className="mt-3 text-muted-foreground">The page could not be loaded. Please try again or return to the homepage.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><Button onClick={reset}><RefreshCw/> Try again</Button><Button variant="outline" asChild><Link href="/">Go home</Link></Button></div></div></main>; }
