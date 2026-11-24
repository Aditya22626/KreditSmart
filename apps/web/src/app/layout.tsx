import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";
export const metadata: Metadata = { title: { default: "KreditSmart — Borrow smarter", template: "%s | KreditSmart" }, description: "Explore loans and understand borrowing costs with KreditSmart, an informational financial platform for India.", applicationName: "KreditSmart", icons: { icon: "/brand-icon.svg" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-IN" suppressHydrationWarning><body><Providers><a href="#main-content" className="sr-only z-50 rounded-md bg-background px-4 py-3 text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>{children}</Providers></body></html>;
}
