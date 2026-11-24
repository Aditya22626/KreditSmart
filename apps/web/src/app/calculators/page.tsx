import type { Metadata } from "next";
import { Calculator, CalendarDays, IndianRupee, Percent } from "lucide-react";
import { PublicPage } from "@/components/layout/public-page";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export const metadata: Metadata = { title: "Financial calculators" };
const tools = [{icon:Calculator,title:"EMI calculator",description:"Estimate regular monthly loan repayments."},{icon:IndianRupee,title:"Affordability",description:"Understand a possible borrowing budget."},{icon:CalendarDays,title:"Amortization",description:"See how repayments split into principal and interest."},{icon:Percent,title:"Prepayment",description:"Explore how extra repayments may affect loan cost."}];
export default function Calculators() { return <PublicPage eyebrow="Financial tools" title="Plan before you borrow" description="The calculator interface is ready for the upcoming financial engine. Calculations and validation will be implemented and tested in Phase 9."><div className="grid gap-4 sm:grid-cols-2">{tools.map(({icon:Icon,...t})=><Card key={t.title}><CardContent className="p-6"><Icon className="size-6 text-brand-light dark:text-primary"/><h2 className="mt-4 font-semibold">{t.title}</h2><p className="mt-2 text-sm text-muted-foreground">{t.description}</p><Badge className="mt-5">Coming in Phase 9</Badge></CardContent></Card>)}</div></PublicPage>; }
