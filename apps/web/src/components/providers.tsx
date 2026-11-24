"use client";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
function Notifications() {
  const { resolvedTheme } = useTheme();
  return <Toaster theme={resolvedTheme === "dark" ? "dark" : "light"} position="bottom-right" closeButton />;
}
export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange><>{children}<Notifications /></></ThemeProvider>;
}
