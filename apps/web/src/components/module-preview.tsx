import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
export function ModulePreview({ title, description, icon: Icon }: { title: string; description: string; icon: LucideIcon }) { return <section><p className="eyebrow">Workspace preview</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h1><Card className="mt-6"><CardContent className="flex flex-col items-center p-8 text-center sm:p-14"><span className="grid size-14 place-items-center rounded-xl bg-secondary text-secondary-foreground"><Icon className="size-7"/></span><h2 className="mt-5 text-lg font-semibold">Coming in a future phase</h2><p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p><Button variant="outline" asChild className="mt-6"><Link href="/dashboard"><ArrowLeft/> Back to overview</Link></Button></CardContent></Card></section>; }
