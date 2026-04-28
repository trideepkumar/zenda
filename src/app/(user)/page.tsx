"use client";

import { memo, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Plus,
  ArrowRight,
  Heart,
  ShoppingBasket,
  Star,
  Flame,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const FOOD_CATEGORIES = [
  {
    name: "Fruits & Veggies",
    img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Dairy & Eggs",
    img: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Atta, Rice & Dals",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Meat & Fish",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Breakfast",
    img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Packaged Food",
    img: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Beverages",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Cold Drinks",
    img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Snacks",
    img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Sweets",
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=200&auto=format&fit=crop",
  },
];

const OTHER_CATEGORIES = [
  {
    name: "Electronics",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=200&auto=format&fit=crop",
    count: "1,200+",
  },
  {
    name: "Fashion",
    img: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=200&auto=format&fit=crop",
    count: "3,500+",
  },
  {
    name: "Appliances",
    img: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=200&auto=format&fit=crop",
    count: "480+",
  },
  {
    name: "Bikes",
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=200&auto=format&fit=crop",
    count: "200+",
  },
  {
    name: "Cars",
    img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=200&auto=format&fit=crop",
    count: "320+",
  },
  {
    name: "Real Estate",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=200&auto=format&fit=crop",
    count: "900+",
  },
  {
    name: "Pets",
    img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=200&auto=format&fit=crop",
    count: "640+",
  },
  {
    name: "Jobs",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=200&auto=format&fit=crop",
    count: "5,000+",
  },
  {
    name: "Services",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=200&auto=format&fit=crop",
    count: "1,100+",
  },
];

const BANNERS = [
  {
    id: 1,
    tag: "Limited offer",
    title: "Free Delivery",
    sub: "On your first 3 orders",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    tag: "New arrivals",
    title: "Paan Corner",
    sub: "Get fresheners in minutes",
    img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    tag: "Hot deals",
    title: "Summer Drinks",
    sub: "Up to 50% off",
    img: "https://images.unsplash.com/photo-1513558161293-cdaf76582af1?q=80&w=1200&auto=format&fit=crop",
  },
];

// ─── PRODUCT CARD (memoised, matches design language) ─────────────────────────

interface ProductCardProps {
  product: Product;
  onAddToCart: (e: React.MouseEvent, product: Product) => void;
}

const ProductCard = memo(function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const [wished, setWished] = useState(false);
  const oldPrice = (product as any).oldPrice ?? null;
  const discount = oldPrice
    ? Math.round(((oldPrice - product.price) / oldPrice) * 100)
    : null;

  return (
    <div className="group relative flex flex-col bg-card rounded-3xl border border-border/50 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1.5">
      
      {/* Image Container */}
      <div className="relative aspect-[4/4] overflow-hidden bg-muted/20">
        {/* Badges Row */}
        <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-start pointer-events-none">
          {discount ? (
            <span className="pointer-events-auto bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg shadow-emerald-500/20">
              -{discount}%
            </span>
          ) : <div />}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setWished((w) => !w);
            }}
            aria-label="Add to wishlist"
            className="pointer-events-auto h-10 w-10 rounded-full bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl flex items-center justify-center transition-all active:scale-75 hover:bg-white"
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-all duration-300",
                wished ? "fill-rose-500 text-rose-500 scale-110" : "text-slate-400"
              )}
            />
          </button>
        </div>

        <Link href={`/products/${product.id}`} className="block h-full w-full">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-110"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Content Area */}
      <div className="p-4 md:p-5 flex flex-col flex-1">
        {/* Category/Rating Row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-bold text-amber-700">4.8</span>
          </div>
          <span className="text-[11px] text-muted-foreground font-medium">120+ Reviews</span>
        </div>

        {/* Title */}
        <Link href={`/products/${product.id}`} className="mb-3">
          <h3 className="font-semibold text-sm md:text-base text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors h-10">
            {product.name}
          </h3>
        </Link>

        {/* Pricing */}
        <div className="flex items-end gap-2 mb-4">
          <span className="text-xl font-bold text-foreground">
            ${product.price.toLocaleString()}
          </span>
          {oldPrice && (
            <span className="text-sm text-muted-foreground line-through decoration-rose-500/30 mb-0.5">
              ${oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <Button
            onClick={(e) => onAddToCart(e, product)}
            className="flex-1 h-11 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-lg shadow-primary/25 active:scale-[0.97] transition-all gap-2"
          >
            <ShoppingBasket className="h-4 w-4" />
            <span>Add to Cart</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-11 w-11 p-0 flex-shrink-0 rounded-2xl border-primary/20 text-primary hover:bg-primary/5 hidden sm:flex"
            // asChild
          >
            <Link href={`/products/${product.id}`}>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
});

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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h3 className="text-lg md:text-xl font-black tracking-tight text-foreground">
          {label}
        </h3>
        {badge && (
          <span className="hidden xs:inline text-[9px] md:text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider border border-primary/15">
            {badge}
          </span>
        )}
      </div>
      {href && (
        <Button
          variant="ghost"
          size="sm"
          // asChild
          className="text-primary font-semibold hover:bg-primary/5 p-0 h-auto text-xs md:text-sm"
        >
          <Link href={href}>
            See all <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
          </Link>
        </Button>
      )}
    </div>
  );
}

// ─── CATEGORY PILL ────────────────────────────────────────────────────────────

function CategoryPill({
  name,
  img,
  href,
}: {
  name: string;
  img: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-1.5 w-[68px] md:w-[80px] flex-shrink-0"
    >
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden border-2 border-border bg-muted transition-all duration-200 group-hover:border-primary group-hover:shadow-md group-hover:shadow-primary/10 group-hover:-translate-y-0.5">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <span className="text-[10px] md:text-[11px] font-medium text-center text-muted-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors w-full">
        {name}
      </span>
    </Link>
  );
}

// ─── BROWSE CARD ──────────────────────────────────────────────────────────────

function BrowseCard({
  name,
  img,
  count,
  href,
}: {
  name: string;
  img: string;
  count: string;
  href: string;
}) {
  return (
    <Link href={href} className="group block">
      <div className="rounded-2xl overflow-hidden border border-border bg-card transition-all duration-200 hover:shadow-lg hover:shadow-primary/8 hover:border-primary/30 hover:-translate-y-0.5">
        <div className="h-20 md:h-24 overflow-hidden">
          <img
            src={img}
            alt={name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-2.5 md:p-3">
          <p className="text-xs md:text-sm font-semibold text-foreground line-clamp-1">
            {name}
          </p>
          <p className="text-[9px] md:text-[10px] text-muted-foreground mt-0.5">
            {count} items
          </p>
        </div>
      </div>
    </Link>
  );
}

// ─── SKELETON CARD ────────────────────────────────────────────────────────────

function ProductSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-border overflow-hidden">
      <Skeleton className="aspect-[4/3.5] w-full rounded-none" />
      <div className="p-3 md:p-4 space-y-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-9 w-full rounded-xl" />
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────

export default function UserDashboard() {
  const [trending, setTrending] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentBanner, setCurrentBanner] = useState(0);
  const { addItem } = useCartStore();

  useEffect(() => {
    api.products.getAll().then((products) => {
      setTrending(products.filter((p) => p.trending).slice(0, 8));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentBanner((p) => (p + 1) % BANNERS.length),
      4000,
    );
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    // <div className="space-y-8 md:space-y-12 pb-20">
    <div className="space-y-8 md:space-y-12 pb-20 scroll-smooth antialiased">
      {/* ── 2. FOOD CATEGORIES ──────────────────────────────────────────── */}
      <section className="space-y-3">
        <div className="mb-1 text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Food & Groceries
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-x-3 gap-y-4 md:gap-x-4 md:gap-y-5">
          {FOOD_CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat.name}
              name={cat.name}
              img={cat.img}
              href={`/products?cat=${encodeURIComponent(cat.name.toLowerCase())}`}
            />
          ))}
        </div>
      </section>

      {/* ── 3. OTHER CATEGORIES ─────────────────────────────────────────── */}
     <section className="space-y-3">
  <div className="mb-1 text-center  ">
    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
      Other Categories
    </span>
  </div>

  <div className="flex flex-wrap justify-center gap-x-3 gap-y-4 md:gap-x-4 md:gap-y-5">
    {OTHER_CATEGORIES.map((cat) => (
      <CategoryPill
        key={cat.name}
        name={cat.name}
        img={cat.img}
        href={`/products?cat=${encodeURIComponent(cat.name.toLowerCase())}`}
      />
    ))}
  </div>
</section>
      {/* ── 1. HERO BANNER ──────────────────────────────────────────────── */}
      <section>
        <div className="relative h-[150px] sm:h-[200px] md:h-[260px] lg:h-[300px] overflow-hidden rounded-2xl md:rounded-3xl border border-border/40 shadow-md">
          {BANNERS.map((banner, index) => (
            <div
              key={banner.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                index === currentBanner
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none",
              )}
            >
              <img
                src={banner.img}
                alt={banner.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent flex flex-col justify-center px-5 sm:px-10 md:px-14 text-white gap-1">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/65 font-semibold">
                  {banner.tag}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tight leading-none">
                  {banner.title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base font-medium text-white/75 mt-0.5">
                  {banner.sub}
                </p>
                <Button
                  size="sm"
                  className="mt-3 w-fit rounded-full bg-white text-black hover:bg-white/90 font-bold px-4 sm:px-6 text-[10px] sm:text-xs border-none shadow-lg"
                >
                  Order now <ArrowRight className="ml-1.5 h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}

          {/* Dot indicators */}
          <div className="absolute bottom-3 right-4 flex gap-1.5 items-center">
            {BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentBanner(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  i === currentBanner
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/40 hover:bg-white/60",
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. TRENDING PRODUCTS ────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeader
          label="Trending Now"
          badge="Fresh Picks"
          href="/products?sort=trending"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
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

      {/* ── 5. EXPLORE MORE (Browse Cards) ──────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeader label="Explore More" href="/products" />

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 md:gap-3 lg:gap-4">
          {OTHER_CATEGORIES.map((cat) => (
            <BrowseCard
              key={cat.name}
              name={cat.name}
              img={cat.img}
              count={cat.count}
              href={`/products?cat=${encodeURIComponent(cat.name.toLowerCase())}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
