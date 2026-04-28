import Link from "next/link";
import { ShoppingBag, Mail, Phone, MapPin } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/products?sort=newest" },
      { label: "Electronics", href: "/products?category=Electronics" },
      { label: "Clothing", href: "/products?category=Clothing" },
      { label: "Home & Living", href: "/products?category=Home" },
      { label: "Accessories", href: "/products?category=Accessories" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Orders", href: "/orders" },
      { label: "Cart", href: "/cart" },
      { label: "Checkout", href: "/checkout" },
      { label: "Profile", href: "/profile" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/support" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
] as const;

const CONTACT_ITEMS = [
  { icon: Mail, label: "zendamanufactures@gmail.com", href: "mailto:zendamanufactures@gmail.com" },
  { icon: Phone, label: "+91 90 1234 5678", href: "tel:+919012345678" },
  { icon: MapPin, label: "India", href: null },
] as const;

const BOTTOM_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Sitemap", href: "/sitemap" },
] as const;

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pt-12 pb-10">
        {/* Responsive Grid: 1 col on tiny, 2 col on small, 4 col on large */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10">
          
          {/* Brand column - Centered on mobile, left-aligned on tablet+ */}
          <div className="flex flex-col items-center sm:items-start gap-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <ShoppingBag className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">Zenda</span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-[250px] text-center sm:text-left">
              Curated products delivered fast. Quality you can trust, prices you&apos;ll love.
            </p>

            <ul className="flex flex-col gap-3 w-full items-center sm:items-start">
              {CONTACT_ITEMS.map(({ icon: Icon, label, href }) => (
                <li key={label} className="w-full max-w-[250px]">
                  {href ? (
                    <a
                      href={href}
                      className="flex items-center justify-center sm:justify-start gap-3 py-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{label}</span>
                    </a>
                  ) : (
                    <span className="flex items-center justify-center sm:justify-start gap-3 py-1 text-sm text-muted-foreground">
                      <Icon className="h-4 w-4 shrink-0" />
                      {label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map(({ title, links }) => (
            <FooterLinkGroup key={title} title={title} links={links} />
          ))}
        </div>
      </div>

      {/* Bottom bar - Stacked on mobile */}
      <div className="border-t border-border/40 bg-muted/50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
          <p className="order-2 sm:order-1">© {new Date().getFullYear()} Zenda, Inc. All rights reserved.</p>
          <nav className="flex items-center gap-6 order-1 sm:order-2">
            {BOTTOM_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} className="hover:text-foreground transition-colors py-2 sm:py-0">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div className="flex flex-col items-center sm:items-start gap-5">
      <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/80 border-b border-transparent sm:border-none pb-1">
        {title}
      </h4>
      <ul className="flex flex-col items-center sm:items-start space-y-1 w-full">
        {links.map(({ label, href }) => (
          <li key={label} className="w-full text-center sm:text-left">
            <Link
              href={href}
              className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 inline-block py-2 sm:py-1.5 transition-all"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}