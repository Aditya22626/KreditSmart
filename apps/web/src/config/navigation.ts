import { LayoutDashboard, Landmark, Calculator, Bookmark, Sparkles, UserRound, FileText } from "lucide-react";
export const publicLinks = [{ href: "/loans", label: "Explore loans" }, { href: "/calculators", label: "Calculators" }, { href: "/learn", label: "Learn" }] as const;
export const workspaceLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/loans", label: "Loan marketplace", icon: Landmark },
  { href: "/calculators", label: "Calculators", icon: Calculator },
  { href: "/dashboard/saved", label: "Saved loans", icon: Bookmark },
  { href: "/dashboard/documents", label: "Documents", icon: FileText },
  { href: "/dashboard/assistant", label: "KreditSmart AI", icon: Sparkles },
  { href: "/dashboard/profile", label: "Financial profile", icon: UserRound },
] as const;
