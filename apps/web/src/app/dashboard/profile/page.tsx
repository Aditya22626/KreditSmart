import type { Metadata } from "next";
import { UserRound } from "lucide-react";
import { ModulePreview } from "@/components/module-preview";
export const metadata: Metadata = { title: "Financial profile" };
export default function Page() { return <ModulePreview title="Financial profile" description="Your private financial profile will be available after sign-in and database integration. Do not enter financial data yet." icon={UserRound}/>; }
