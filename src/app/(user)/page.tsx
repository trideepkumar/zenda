

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Plus, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";


// ─── FOOD CATEGORIES ──────────────────────────────────────────────────────────
const FOOD_CATEGORIES = [
  {
    name: "Fruits & Vegetables",
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
    name: "Breakfast & Sauces",
    img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Packaged Food",
    img: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Café & Beverages",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Cold Drinks & Juices",
    img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Snacks & Munchies",
    img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Sweets & Desserts",
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=200&auto=format&fit=crop",
  },
];

// ─── NON-FOOD CATEGORIES ──────────────────────────────────────────────────────
const OTHER_CATEGORIES = [
  {
    name: "Mobiles & Electronics",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=200&auto=format&fit=crop",
    count: "1,200+ products",
  },
  {
    name: "Fashion",
    img: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=200&auto=format&fit=crop",
    count: "3,500+ products",
  },
  {
    name: "Appliances",
    img: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=200&auto=format&fit=crop",
    count: "480+ products",
  },
  {
    name: "Bikes",
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=200&auto=format&fit=crop",
    count: "200+ listings",
  },
  {
    name: "Cars",
    img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=200&auto=format&fit=crop",
    count: "320+ listings",
  },
  {
    name: "Real Estate",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=200&auto=format&fit=crop",
    count: "900+ listings",
  },
  {
    name: "Pets",
    img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=200&auto=format&fit=crop",
    count: "640+ products",
  },
  {
    name: "Jobs",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=200&auto=format&fit=crop",
    count: "5,000+ openings",
  },
  {
    name: "Services",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=200&auto=format&fit=crop",
    count: "1,100+ providers",
  },
];

// ─── BANNERS ──────────────────────────────────────────────────────────────────
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
    sub: "Get freshners in minutes",
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

// ─── SECTION DIVIDER ──────────────────────────────────────────────────────────
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-border" />
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
      className="group flex flex-col items-center gap-2 w-[72px] flex-shrink-0"
    >
      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-border bg-muted transition-all group-hover:border-primary group-hover:shadow-md">
        <img
          src={img}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <span className="text-[10px] font-medium text-center text-muted-foreground leading-tight whitespace-normal line-clamp-2 group-hover:text-primary transition-colors">
        {name}
      </span>
    </Link>
  );
}

// ─── NON-FOOD BROWSE CARD ─────────────────────────────────────────────────────
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
      <div className="rounded-2xl overflow-hidden border border-border bg-card transition-all hover:shadow-lg hover:border-primary/40">
        <div className="h-24 overflow-hidden">
          <img
            src={img}
            alt={name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-3">
          <p className="text-sm font-semibold text-foreground leading-tight line-clamp-1">
            {name}
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{count}</p>
        </div>
      </div>
    </Link>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
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
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="space-y-10 pb-16">

      {/* ── 1. CATEGORIES ─────────────────────────────────────────────────── */}
      <section className="pt-4 space-y-5">
        {/* Food & Groceries */}
        <div>
          <SectionDivider label="Food & Groceries" />
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max gap-4 px-0.5 pb-2">
              {FOOD_CATEGORIES.map((cat) => (
                <CategoryPill
                  key={cat.name}
                  name={cat.name}
                  img={cat.img}
                  href={`/products?cat=${encodeURIComponent(cat.name.toLowerCase())}`}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </div>

        {/* Other Categories — horizontal scroll on mobile */}
        <div>
          <SectionDivider label="Other categories" />
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max gap-4 px-0.5 pb-2">
              {OTHER_CATEGORIES.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/products?cat=${encodeURIComponent(cat.name.toLowerCase())}`}
                  className="group flex flex-col items-center gap-2 w-[72px] flex-shrink-0"
                >
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-border bg-muted transition-all group-hover:border-primary group-hover:shadow-md">
                    <img
                      src={cat.img}
                      alt={cat.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <span className="text-[10px] font-medium text-center text-muted-foreground leading-tight whitespace-normal line-clamp-2 group-hover:text-primary transition-colors">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </div>
      </section>

      {/* ── 2. HERO BANNER ────────────────────────────────────────────────── */}
      <section>
        <div className="relative h-[160px] sm:h-[200px] md:h-[240px] lg:h-[280px] overflow-hidden rounded-2xl md:rounded-3xl border border-border/50 shadow-sm">
          {BANNERS.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentBanner ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={banner.img}
                alt={banner.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent flex flex-col justify-center px-6 sm:px-10 md:px-16 text-white gap-0.5 sm:gap-1">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/70 font-semibold">
                  {banner.tag}
                </span>
                <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tight leading-none">
                  {banner.title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base font-medium text-white/80">
                  {banner.sub}
                </p>
                <Button
                  size="sm"
                  className="mt-2 sm:mt-3 w-fit rounded-full bg-white text-black hover:bg-white/90 font-bold px-4 sm:px-6 text-[10px] sm:text-xs border-none shadow-md"
                >
                  Order now
                  <ArrowRight className="ml-1 sm:ml-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </Button>
              </div>
            </div>
          ))}

          {/* Dot indicators */}
          <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 flex gap-1.5 items-center">
            {BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentBanner(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentBanner
                    ? "w-5 sm:w-6 bg-white"
                    : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. TRENDING PRODUCTS ──────────────────────────────────────────── */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black tracking-tight text-foreground">
              Trending now
            </h3>
            <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-wider border border-primary/20">
              Fresh picks
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary font-semibold hover:bg-primary/5 p-0 h-auto text-sm"
          >
            See all <ChevronRight className="h-4 w-4 ml-0.5" />
          </Button>
        </div>

        {/* 2 cols mobile → 3 tablet → 4 desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="border-none shadow-none bg-transparent">
                  <Skeleton className="aspect-square w-full rounded-2xl" />
                  <div className="space-y-2 mt-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </Card>
              ))
            : trending.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <Link href={`/products/${product.id}`}>
                    {/* Image area */}
                    <div className="relative overflow-hidden bg-muted/30">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="aspect-square w-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-105 p-4"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[9px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-md uppercase tracking-widest border border-primary/20">
                          10 mins
                        </span>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h4 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug min-h-[2.5rem]">
                        {product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        500 g
                      </p>

                      <div className="mt-4 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-base font-black text-foreground">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="block text-[10px] text-muted-foreground line-through">
                            ${(product.price * 1.25).toFixed(2)}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold h-9 px-4 rounded-xl text-[10px] uppercase tracking-wide transition-all active:scale-95 flex-shrink-0"
                          onClick={(e) => handleAddToCart(e, product)}
                        >
                          Add <Plus className="ml-1 h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
        </div>
      </section>

      {/* ── 4. EXPLORE OTHER CATEGORIES (GRID) ───────────────────────────── */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black tracking-tight text-foreground">
            Explore more
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary font-semibold hover:bg-primary/5 p-0 h-auto text-sm"
          >
            See all <ChevronRight className="h-4 w-4 ml-0.5" />
          </Button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
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