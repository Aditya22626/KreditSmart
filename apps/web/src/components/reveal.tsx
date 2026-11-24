"use client";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} animate={reduced ? {} : { y: [5, 0] }} transition={{ duration: 0.35, ease: "easeOut" }}>{children}</motion.div>;
}
