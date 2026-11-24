import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
export function Card({ className, ...props }: ComponentProps<"div">) { return <div data-slot="card" className={cn("rounded-2xl border bg-card text-card-foreground shadow-sm", className)} {...props} />; }
export function CardHeader({ className, ...props }: ComponentProps<"div">) { return <div data-slot="card-header" className={cn("space-y-2 p-6 pb-3", className)} {...props} />; }
export function CardTitle({ className, ...props }: ComponentProps<"h3">) { return <h3 data-slot="card-title" className={cn("text-lg font-semibold tracking-tight", className)} {...props} />; }
export function CardDescription({ className, ...props }: ComponentProps<"p">) { return <p data-slot="card-description" className={cn("text-sm leading-relaxed text-muted-foreground", className)} {...props} />; }
export function CardContent({ className, ...props }: ComponentProps<"div">) { return <div data-slot="card-content" className={cn("p-6 pt-3", className)} {...props} />; }
