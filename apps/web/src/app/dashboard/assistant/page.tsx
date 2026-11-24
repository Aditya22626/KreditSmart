import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { ModulePreview } from "@/components/module-preview";
export const metadata: Metadata = { title: "KreditSmart AI" };
export default function Page() { return <ModulePreview title="KreditSmart AI" description="The AI assistant will be connected to the Azure-backed AI service in a later phase. No AI requests are made here." icon={Sparkles}/>; }
