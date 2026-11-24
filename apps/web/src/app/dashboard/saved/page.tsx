import type { Metadata } from "next";
import { Bookmark } from "lucide-react";
import { ModulePreview } from "@/components/module-preview";
export const metadata: Metadata = { title: "Saved loans" };
export default function Page() { return <ModulePreview title="Saved loans" description="Saved products will be available after authentication and the lender catalogue are connected." icon={Bookmark}/>; }
