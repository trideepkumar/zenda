"use client";

import Link from "next/link";
import { 
  ShoppingBag, ArrowLeft, Search, 
  Home, Package, Ghost 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const QUICK_LINKS = [
  { label: "Browse Shop", href: "/products", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Track Order", href: "/orders", icon: Package, color: "text-orange-500", bg: "bg-orange-500/10" },
  { label: "Go Home", href: "/", icon: Home, color: "text-emerald-500", bg: "bg-emerald-500/10" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-background">
      
      {/* ── Background 404 (Standard Tailwind Opacity) ── */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-0 select-none">
        <span className="text-[18rem] md:text-[28rem] font-black text-muted/[0.07] leading-none tracking-tighter italic animate-in fade-in zoom-in duration-1000">
          404
        </span>
      </div>

      <div className="relative z-10 w-full max-w-xl flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* ── Floating Ghost Icon ── */}
        <div className="relative mb-10 group">
          <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm border border-primary/20 flex items-center justify-center shadow-2xl shadow-primary/10 animate-bounce [animation-duration:4s]">
            <Ghost className="h-12 w-12 text-primary" strokeWidth={1.5} />
          </div>
          <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-lg border-4 border-background animate-in zoom-in duration-500 delay-300 fill-mode-both">
            <span className="text-xs font-bold text-primary-foreground">?</span>
          </div>
        </div>

        {/* ── Typography ── */}
        <div className="text-center mb-8 space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            Lost in the Clouds?
          </h1>
          <p className="text-muted-foreground text-base max-w-sm mx-auto">
            The page you're looking for has drifted away. 
            But your shopping journey doesn't have to end here.
          </p>
        </div>

        {/* ── Search Input (Shadcn UI) ── */}
        <div className="w-full max-w-sm relative mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search products..." 
            className="pl-10 h-12 rounded-2xl bg-muted/30 border-muted-foreground/10 focus-visible:ring-primary/20"
          />
        </div>

        {/* ── Quick Links Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-10">
          {QUICK_LINKS.map(({ label, href, icon: Icon, color, bg }, index) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-3 p-5 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/50 hover:shadow-md transition-all group active:scale-95 animate-in fade-in slide-in-from-bottom-4 duration-700",
                index === 0 ? "delay-200" : index === 1 ? "delay-300" : "delay-500"
              )}
            >
              <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center transition-colors", bg)}>
                <Icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", color)} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
                {label}
              </span>
            </Link>
          ))}
        </div>

        {/* ── Back to Dashboard ── */}
        <Button variant="link"
        //  asChild 
         className="group text-muted-foreground hover:text-primary transition-colors">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      {/* ── Visual Flare ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
}