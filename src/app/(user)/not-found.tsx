import Link from "next/link";
import { ShoppingBag, ArrowLeft, Search, Home, Package } from "lucide-react";

const QUICK_LINKS = [
  { label: "Browse Products", href: "/products", icon: ShoppingBag },
  { label: "My Orders", href: "/orders", icon: Package },
  { label: "Go Home", href: "/", icon: Home },
];

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">

      {/* ── Background decoration ── */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="text-[20rem] font-black text-muted/30 select-none leading-none tracking-tighter">
          404
        </span>
      </div>

      {/* ── Floating bag icon ── */}
      <div className="relative mb-8 animate-bounce [animation-duration:3s]">
        <div className="h-20 w-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-xl shadow-primary/5">
          <ShoppingBag className="h-9 w-9 text-primary" strokeWidth={1.5} />
        </div>
        {/* Badge */}
        <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-destructive flex items-center justify-center shadow-md">
          <span className="text-[10px] font-bold text-destructive-foreground">!</span>
        </div>
      </div>

      {/* ── Copy ── */}
      <div className="relative text-center max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Page not found
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-10">
          Looks like this page took a detour. It may have been moved, deleted,
          or never existed. Lets get you back on track.
        </p>

        {/* ── Quick links ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {QUICK_LINKS.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:bg-muted hover:border-primary/30 hover:shadow-sm transition-all group"
            >
              <div className="h-9 w-9 rounded-lg bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>

        {/* ── Back link ── */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>
      </div>
    </div>
  );
}