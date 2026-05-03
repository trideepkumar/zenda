"use client";

import { memo, useEffect, useState, useRef, useCallback } from "react";
import {
  ChevronRight,
  ArrowRight,
  ChevronLeft,
  Zap,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { ProgressLink } from "@/components/progress-link";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const FOOD_CATEGORIES = [
  {
    name: "Paan Corner",
    img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=300&auto=format&fit=crop",
    color: "#FFF0F3",
    accent: "#FF6B6B",
  },
  {
    name: "Dairy, Bread & Eggs",
    img: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=300&auto=format&fit=crop",
    color: "#FFF8E7",
    accent: "#F59E0B",
  },
  {
    name: "Fruits & Vegetables",
    img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=300&auto=format&fit=crop",
    color: "#F0FDF4",
    accent: "#22C55E",
  },
  {
    name: "Cold Drinks & Juices",
    img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=300&auto=format&fit=crop",
    color: "#EFF6FF",
    accent: "#3B82F6",
  },
  {
    name: "Snacks & Munchies",
    img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=300&auto=format&fit=crop",
    color: "#FFF7ED",
    accent: "#F97316",
  },
  {
    name: "Breakfast & Instant Food",
    img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=300&auto=format&fit=crop",
    color: "#FDF4FF",
    accent: "#A855F7",
  },
  {
    name: "Sweet Tooth",
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=300&auto=format&fit=crop",
    color: "#FFF0F3",
    accent: "#EC4899",
  },
  {
    name: "Bakery & Biscuits",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=300&auto=format&fit=crop",
    color: "#FEFCE8",
    accent: "#CA8A04",
  },
  {
    name: "Tea, Coffee & Milk",
    img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=300&auto=format&fit=crop",
    color: "#FFF8E7",
    accent: "#92400E",
  },
  {
    name: "Atta, Rice & Dal",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=300&auto=format&fit=crop",
    color: "#F7FEE7",
    accent: "#65A30D",
  },
];

const GROCERY_CATEGORIES = [
  {
    name: "Masala, Oil & More",
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=300&auto=format&fit=crop",
    color: "#FFF7ED",
    accent: "#EA580C",
  },
  {
    name: "Sauces & Spreads",
    img: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?q=80&w=300&auto=format&fit=crop",
    color: "#F0FDF4",
    accent: "#16A34A",
  },
  {
    name: "Chicken, Meat & Fish",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=300&auto=format&fit=crop",
    color: "#FFF0F3",
    accent: "#DC2626",
  },
  {
    name: "Organic & Healthy",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300&auto=format&fit=crop",
    color: "#F0FDF4",
    accent: "#15803D",
  },
  {
    name: "Baby Care",
    img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=300&auto=format&fit=crop",
    color: "#EFF6FF",
    accent: "#2563EB",
  },
  {
    name: "Pharma & Wellness",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop",
    color: "#FDF4FF",
    accent: "#9333EA",
  },
  {
    name: "Cleaning Essentials",
    img: "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=300&auto=format&fit=crop",
    color: "#ECFEFF",
    accent: "#0891B2",
  },
  {
    name: "Home & Office",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=300&auto=format&fit=crop",
    color: "#F8FAFC",
    accent: "#475569",
  },
  {
    name: "Personal Care",
    img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=300&auto=format&fit=crop",
    color: "#FFF0F3",
    accent: "#BE185D",
  },
  {
    name: "Pet Care",
    img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=300&auto=format&fit=crop",
    color: "#FFFBEB",
    accent: "#D97706",
  },
];

const EXPLORE_GROCERY = [
  {
    name: "Fresh Vegetables",
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop",
    count: "120+ items",
    badge: "Fresh Daily",
    badgeColor: "#22C55E",
  },
  {
    name: "Exotic Fruits",
    img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=400&auto=format&fit=crop",
    count: "80+ items",
    badge: "Seasonal",
    badgeColor: "#F97316",
  },
  {
    name: "Organic Range",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop",
    count: "200+ items",
    badge: "Certified",
    badgeColor: "#16A34A",
  },
  {
    name: "Dairy Essentials",
    img: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=400&auto=format&fit=crop",
    count: "60+ items",
    badge: "Farm Fresh",
    badgeColor: "#F59E0B",
  },
  {
    name: "Breakfast Picks",
    img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=400&auto=format&fit=crop",
    count: "95+ items",
    badge: "Popular",
    badgeColor: "#A855F7",
  },
  {
    name: "Spices & Masalas",
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=400&auto=format&fit=crop",
    count: "150+ items",
    badge: "Aromatic",
    badgeColor: "#DC2626",
  },
];

const BANNERS = [
  {
    id: 1,
    title: "Stock up on daily essentials",
    sub: "Get farm-fresh goodness & a range of exotic fruits, vegetables, eggs & more",
    cta: "Shop Now",
    bg: "#2E7D32",
    img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Snacks delivered in minutes",
    sub: "Chips, biscuits, namkeen & more — straight to your door in 19 mins",
    cta: "Order Now",
    bg: "#1565C0",
    img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Beat the heat this summer",
    sub: "Cold drinks, juices, lassi & refreshing beverages — up to 50% off",
    cta: "Grab the Deal",
    bg: "#E65100",
    img: "https://images.unsplash.com/photo-1513558161293-cdaf76582af1?q=80&w=900&auto=format&fit=crop",
  },
];

// ─── BLINKIT CATEGORY TILE ───────────────────────────────────────────────────

function CategoryTile({
  name,
  img,
  href,
}: {
  name: string;
  img: string;
  color?: string;
  accent?: string;
  href: string;
}) {
  return (
    <ProgressLink
      href={href}
      className="group flex flex-col items-center gap-2 flex-shrink-0"
      style={{ width: "100px" }}
    >
      {/* Fixed 100×100 image tile — no background, no padding */}
      <div className="w-[100px] h-[100px] rounded-2xl overflow-hidden border border-slate-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:border-slate-200">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <span className="text-[10px] sm:text-[11px] font-semibold text-center text-slate-600 leading-tight line-clamp-2 w-[100px] px-0.5">
        {name}
      </span>
    </ProgressLink>
  );
}

// ─── SECTION LABEL STRIP ─────────────────────────────────────────────────────

function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4 text-center">
      <div className="flex items-center gap-2  text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
        {/* {icon} */}
        {label}
      </div>
      {/* <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" /> */}
    </div>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────

function SectionHeader({
  label,
  badge,
  href,
}: {
  label: string;
  badge?: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2.5">
        <h3 className="text-lg md:text-xl font-black tracking-tight text-slate-900">
          {label}
        </h3>
        {badge && (
          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
            {badge}
          </span>
        )}
      </div>
      {href && (
        <ProgressLink
          href={href}
          className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          See all <ChevronRight className="h-3.5 w-3.5" />
        </ProgressLink>
      )}
    </div>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: Product;
  onAddToCart: (e: React.MouseEvent, product: Product) => void;
}

const ProductCard = memo(function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const oldPrice = (product as any).oldPrice ?? null;
  const discount = oldPrice
    ? Math.round(((oldPrice - product.price) / oldPrice) * 100)
    : null;
  const weight = (product as any).weight || "500 g";

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/70 hover:border-slate-300">

      {/* Image area — 4:3 keeps it compact but not square */}
      <ProgressLink href={`/products/${product.id}`} className="relative block overflow-hidden bg-slate-50" style={{ aspectRatio: "4/3" }}>
        {discount && (
          <div className="absolute top-0 left-0 z-10 bg-[#0C6FEF] text-white text-[9px] font-extrabold leading-tight px-1.5 py-0.5 rounded-br-md rounded-tl-2xl text-center min-w-[32px]">
            {discount}%<br />OFF
          </div>
        )}
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </ProgressLink>

      {/* Content — tight padding, everything compact */}
      <div className="flex flex-col px-2.5 pt-1.5 pb-2.5 gap-0.5">
        {/* Delivery */}
        <div className="flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
            <circle cx="12" cy="12" r="9" stroke="#F59E0B" strokeWidth="2"/>
            <path d="M12 7v5l3 3" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="text-[9px] font-bold text-[#F59E0B] uppercase tracking-wide">19 MINS</span>
        </div>

        {/* Name */}
        <ProgressLink href={`/products/${product.id}`}>
          <h3 className="line-clamp-2 text-[12px] font-bold leading-[1.3] text-slate-800 transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </ProgressLink>

        {/* Weight */}
        <span className="text-[10px] text-slate-400 font-medium">{weight}</span>

        {/* Price + ADD */}
        <div className="flex items-center justify-between gap-1 mt-1.5">
          <div className="flex flex-col leading-none">
            <span className="text-[13px] font-black text-slate-900">₹{product.price}</span>
            {oldPrice && (
              <span className="text-[10px] text-slate-400 line-through mt-0.5">₹{oldPrice}</span>
            )}
          </div>
          <button
            onClick={(e) => onAddToCart(e, product)}
            className="flex-shrink-0 rounded-lg border-2 border-primary bg-white px-3 py-1.5 text-[12px] font-extrabold text-primary transition-all hover:bg-primary hover:text-white active:scale-95 min-w-[60px] text-center"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
});

// ─── PRODUCT SKELETON ─────────────────────────────────────────────────────────

function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <Skeleton className="w-full" style={{ aspectRatio: "4/3" }} />
      <div className="px-2.5 pt-1.5 pb-2.5 space-y-1.5">
        <Skeleton className="h-2.5 w-14" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-2/3" />
        <Skeleton className="h-2.5 w-10" />
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-8 w-[60px] rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// ─── EXPLORE GROCERY CARD ─────────────────────────────────────────────────────

function ExploreGroceryCard({
  name,
  img,
  count,
  badge,
  badgeColor,
  href,
}: {
  name: string;
  img: string;
  count: string;
  badge: string;
  badgeColor: string;
  href: string;
}) {
  return (
    <ProgressLink href={href} className="group block">
      <div className="relative rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-36 md:h-44 overflow-hidden bg-slate-100">
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Badge */}
          <div
            className="absolute top-3 left-3 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
            style={{ backgroundColor: badgeColor }}
          >
            {badge}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-800 leading-tight">{name}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{count}</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
            <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </ProgressLink>
  );
}

// ─── HERO CAROUSEL ────────────────────────────────────────────────────────────

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((index: number) => {
    setCurrent((index + BANNERS.length) % BANNERS.length);
  }, []);

  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  useEffect(() => {
    timerRef.current = setInterval(next, 4500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  const banner = BANNERS[current];

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ height: "160px" }}>
      {BANNERS.map((b, i) => (
        <div
          key={b.id}
          className="absolute inset-0 flex transition-opacity duration-500"
          style={{
            opacity: i === current ? 1 : 0,
            pointerEvents: i === current ? "auto" : "none",
            backgroundColor: b.bg,
          }}
        >
          {/* Left: text content */}
          <div className="relative z-10 flex flex-col justify-center px-6 md:px-10 w-1/2 flex-shrink-0">
            <h2 className="text-white font-black text-lg md:text-2xl leading-tight tracking-tight max-w-xs">
              {b.title}
            </h2>
            <p className="text-white/75 text-[11px] md:text-xs mt-1.5 leading-snug max-w-[260px] hidden sm:block">
              {b.sub}
            </p>
            <button className="mt-3 w-fit bg-white text-slate-800 text-[11px] md:text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors active:scale-95">
              {b.cta}
            </button>
          </div>

          {/* Right: product image with left fade */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2">
            {/* Fade gradient overlapping left */}
            <div
              className="absolute inset-y-0 left-0 w-24 z-10"
              style={{ background: `linear-gradient(to right, ${b.bg}, transparent)` }}
            />
            <img
              src={b.img}
              alt={b.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      ))}

      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-7 w-7 rounded-full bg-black/20 backdrop-blur flex items-center justify-center text-white hover:bg-black/30 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-7 w-7 rounded-full bg-black/20 backdrop-blur flex items-center justify-center text-white hover:bg-black/30 transition-colors"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === current ? "20px" : "6px",
              backgroundColor: i === current ? "white" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/10 z-20">
        <div
          key={current}
          className="h-full bg-white/60"
          style={{ animation: "carousel-progress 4.5s linear forwards" }}
        />
      </div>

      <style>{`
        @keyframes carousel-progress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────

export default function UserDashboard() {
  const [trending, setTrending] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    api.products.getAll().then((products) => {
      setTrending(products.filter((p) => p.trending).slice(0, 8));
      setLoading(false);
    });
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="space-y-10 md:space-y-14 pb-24 antialiased">

      {/* ── 1. FOOD CATEGORIES ──────────────────────────────────────────── */}
      <section>
        <SectionLabel
          icon={<Zap className="h-3 w-3" />}
          label="Food & Groceries"
        />
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-5 md:gap-x-4">
          {FOOD_CATEGORIES.map((cat) => (
            <CategoryTile
              key={cat.name}
              name={cat.name}
              img={cat.img}
              color={cat.color}
              accent={cat.accent}
              href={`/products?cat=${encodeURIComponent(cat.name.toLowerCase())}`}
            />
          ))}
        </div>
      </section>

      {/* ── 2. GROCERY / ESSENTIALS CATEGORIES ──────────────────────────── */}
      <section>
        <SectionLabel
          icon={<Sparkles className="h-3 w-3" />}
          label="Household & Essentials"
        />
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-5 md:gap-x-4">
          {GROCERY_CATEGORIES.map((cat) => (
            <CategoryTile
              key={cat.name}
              name={cat.name}
              img={cat.img}
              color={cat.color}
              accent={cat.accent}
              href={`/products?cat=${encodeURIComponent(cat.name.toLowerCase())}`}
            />
          ))}
        </div>
      </section>

      {/* ── 3. HERO CAROUSEL ────────────────────────────────────────────── */}
      <section>
        <HeroCarousel />
      </section>

      {/* ── 4. TRENDING PRODUCTS ────────────────────────────────────────── */}
      <section>
        <SectionHeader
          label="Trending Now"
          badge="Fresh Picks"
          href="/products?sort=trending"
        />
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-rose-500" />
          <p className="text-xs text-slate-500">Products flying off the shelves today</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : trending.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
        </div>
      </section>

      {/* ── 5. EXPLORE GROCERIES ─────────────────────────────────────────── */}
      <section>
        <SectionHeader label="Explore Groceries" href="/products?cat=groceries" />

        {/* Big visual cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4">
          {EXPLORE_GROCERY.map((item) => (
            <ExploreGroceryCard
              key={item.name}
              name={item.name}
              img={item.img}
              count={item.count}
              badge={item.badge}
              badgeColor={item.badgeColor}
              href={`/products?cat=${encodeURIComponent(item.name.toLowerCase())}`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-4 flex justify-center">
          <ProgressLink
            href="/products?cat=groceries"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary border border-primary/20 bg-primary/5 px-6 py-3 rounded-full hover:bg-primary/10 transition-colors"
          >
            View all groceries
            <ArrowRight className="h-4 w-4" />
          </ProgressLink>
        </div>
      </section>

    </div>
  );
}