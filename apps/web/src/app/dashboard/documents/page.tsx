import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { ModulePreview } from "@/components/module-preview";
export const metadata: Metadata = { title: "Loan documents" };
export default function Page() { return <ModulePreview title="Loan documents" description="Secure document upload and analysis will be enabled only after storage and access controls are implemented." icon={FileText}/>; }
