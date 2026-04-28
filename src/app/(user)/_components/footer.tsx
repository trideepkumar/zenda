import Link from "next/link";
import {
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
//   Instagram,
//   Twitter,
//   Facebook,
  ArrowUpRight,
} from "lucide-react";

const SHOP_LINKS = [
  { label: "New Arrivals", href: "/products?sort=newest" },
  { label: "Electronics", href: "/products?category=Electronics" },
  { label: "Clothing", href: "/products?category=Clothing" },
  { label: "Home & Living", href: "/products?category=Home" },
  { label: "Accessories", href: "/products?category=Accessories" },
];

const ACCOUNT_LINKS = [
  { label: "My Orders", href: "/orders" },
  { label: "Cart", href: "/cart" },
  { label: "Checkout", href: "/checkout" },
  { label: "Profile", href: "/profile" },
];

const SUPPORT_LINKS = [
  { label: "Help Center", href: "/support" },
  { label: "Returns & Refunds", href: "/returns" },
  { label: "Shipping Info", href: "/shipping" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

// const SOCIALS = [
//   { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
//   { icon: Twitter, label: "Twitter / X", href: "https://twitter.com" },
//   { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
// ];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      {/* ── Top strip ── */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pt-12 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand column */}
        <div className="flex flex-col gap-5">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <ShoppingBag className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">Zenda</span>
          </Link>

          <p className="text-xs text-muted-foreground leading-relaxed max-w-[220px]">
            Curated products delivered fast. Quality you can trust, prices you&apos;ll love.
          </p>

          {/* Contact */}
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:hello@zenda.com"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors group/link"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                zendamanufactures@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+18005550100"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" />
                +91 90 1234 5678
              </a>
            </li>
            <li className="flex items-start gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span>India</span>
            </li>
          </ul>

          {/* Socials */}
          {/* <div className="flex items-center gap-3 pt-1">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 hover:bg-muted transition-all"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div> */}
        </div>

        {/* Shop links */}
        <FooterLinkGroup title="Shop" links={SHOP_LINKS} />

        {/* Account links */}
        <FooterLinkGroup title="Account" links={ACCOUNT_LINKS} />

        {/* Support links */}
        <FooterLinkGroup title="Support" links={SUPPORT_LINKS} />
      </div>

    

      {/* ── Bottom bar ── */}
      <div className="border-t border-border/40 bg-muted/50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-muted-foreground">
          <p>© {new Date().getFullYear()} Zenda, Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-foreground transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Helper ──────────────────────────────────────────────────────────────────

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/70">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors hover:translate-x-0.5 inline-block"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}