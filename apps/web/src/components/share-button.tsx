"use client";
import { Link2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
export function ShareButton() { async function copy() { try { await navigator.clipboard.writeText(window.location.origin + "/"); toast.success("KreditSmart link copied"); } catch { toast.error("Could not copy the link. Copy it from your address bar instead."); } } return <Button variant="outline" onClick={copy}><Link2/>Copy home link</Button>; }
