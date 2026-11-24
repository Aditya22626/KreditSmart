import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/landing/hero";
import { Features, TrustSection, FinalCta } from "@/components/landing/features";
export default function Home() { return <><SiteHeader /><main id="main-content"><Hero /><Features /><TrustSection /><FinalCta /></main><SiteFooter /></>; }
