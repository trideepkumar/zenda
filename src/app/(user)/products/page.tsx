"use client";

import { useEffect, useState, useMemo, useCallback, memo } from "react";
import Link from "next/link";
import { Plus, X, Filter, ArrowUpDown, Heart, ShoppingBasket, Star, Badge } from "lucide-react";
import { api } from "@/lib/api";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Electronics", "Clothing", "Home", "Accessories", "Beauty", "Bikes", "Cars"];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
] as const;

const DEFAULT_FILTERS = {
  category: "All",
  sortBy: "featured",
  searchQuery: "",
  priceRange: [0, 5000] as [number, number],
  onlyInStock: false,
};

type Filters = typeof DEFAULT_FILTERS;

// ─── FilterSection ────────────────────────────────────────────────────────────

interface FilterSectionProps {
  filters: Filters;
  onFilterChange: (patch: Partial<Filters>) => void;
  onReset: () => void;
}

const FilterSection = memo(function FilterSection({ filters, onFilterChange, onReset }: FilterSectionProps) {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xs font-bold uppercase text-muted-foreground mb-3 flex items-center gap-2">
          <ArrowUpDown className="h-3 w-3" /> Sort
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onFilterChange({ sortBy: opt.value })}
              className={cn(
                "px-3 py-2 rounded-lg text-xs text-left transition-colors border",
                filters.sortBy === opt.value
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-background border-border text-muted-foreground hover:border-primary/50"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xs font-bold uppercase text-muted-foreground mb-3">Categories</h3>
        <div className="flex flex-wrap lg:flex-col gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange({ category: cat })}
              className={cn(
                "px-3 py-1.5 rounded-full lg:rounded-lg text-xs transition-all border",
                filters.category === cat
                  ? "bg-secondary border-secondary text-secondary-foreground font-medium"
                  : "bg-transparent border-border text-muted-foreground hover:bg-muted"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <button
        onClick={onReset}
        className="w-full py-2 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
});

// ─── ProductCard ──────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: Product;
  onAddToCart: (e: React.MouseEvent, product: Product) => void;
}

const ProductCard = memo(function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [wished, setWished] = useState(false);

  const oldPrice = (product as any).oldPrice ?? null;
  const discount = oldPrice
    ? Math.round(((oldPrice - product.price) / oldPrice) * 100)
    : null;

  const rating = 4.8; 
  const reviewCount = "120+";

  return (
<div className="group relative flex flex-col bg-card rounded-xl md:rounded-2xl border border-primary/5 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">      
      {/* ── Image Section ── */}
      <div className="relative bg-muted/30 overflow-hidden">
        {/* Floating top row - Responsive padding */}
        <div className="absolute top-2 left-2 right-2 md:top-3 md:left-3 md:right-3 flex items-center justify-end z-10">

          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWished(w => !w); }}
            className="h-7 w-7 md:h-9 md:w-9 rounded-full bg-background/80 backdrop-blur-md border border-primary/5 shadow-sm flex items-center justify-center transition-all active:scale-90"
          >
            <Heart className={cn("h-3.5 w-3.5 md:h-4 md:w-4 transition-colors", wished ? "fill-rose-500 text-rose-500" : "text-muted-foreground")} />
          </button>
        </div>

        <Link href={`/products/${product.id}`} className="block aspect-square md:aspect-[4/3.8]">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </Link>
      </div>

      {/* ── Content Section ── */}
      <div className="p-3 md:p-5 flex flex-col gap-2 md:gap-3">
        <div>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-bold text-sm md:text-base text-foreground leading-tight line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-[10px] md:text-xs text-muted-foreground font-medium">
              {rating} <span className="hidden xs:inline">({reviewCount})</span>
            </span>
          </div>
        </div>

        {/* Price - Themed Emerald for Discounts */}
        <div className="flex items-baseline gap-2 flex-wrap min-h-[24px]">
          <span className="text-base md:text-lg font-black text-primary">
            ${product.price.toLocaleString()}
          </span>
          {oldPrice && (
            <span className="text-[11px] md:text-sm text-muted-foreground line-through opacity-60">
              ${oldPrice.toLocaleString()}
            </span>
          )}
          {discount && (
            <span className="text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* ── CTA Buttons Optimized for Mobile ── */}
        <div className="flex gap-1.5 md:gap-2 mt-1">
          {/* Mobile: Icon only / Laptop: Text */}
          <Button
            asChild
            variant="secondary"
            className="flex-1 md:flex-none rounded-xl md:rounded-2xl h-9 md:h-11 px-0 md:px-4 bg-primary/5 hover:bg-primary/10 text-primary border-none"
          >
            <Link href={`/products/${product.id}`}>
              <span className="hidden md:inline text-xs font-bold">Details</span>
              <Plus className="md:hidden h-4 w-4" />
            </Link>
          </Button>

          <Button
            onClick={(e) => onAddToCart(e, product)}
            className="flex-[2.5] md:flex-1 rounded-xl md:rounded-2xl h-9 md:h-11 bg-primary text-primary-foreground text-[11px] md:text-xs font-bold shadow-md shadow-primary/20 hover:opacity-90 active:scale-95 transition-all gap-1.5"
          >
            <ShoppingBasket className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="inline">Add<span className="hidden xs:inline"> to Cart</span></span>
          </Button>
        </div>
      </div>
    </div>
  );
});
// ─── Skeletons ────────────────────────────────────────────────────────────────

const SKELETON_COUNT = 8;
const SkeletonGrid = memo(function SkeletonGrid() {
  return (
    <>
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <div key={i} className="rounded-3xl border overflow-hidden bg-card">
          <Skeleton className="aspect-[4/3.6] w-full" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-5 w-1/3" />
            <div className="flex gap-2">
              <Skeleton className="h-9 flex-1 rounded-2xl" />
              <Skeleton className="h-9 flex-[1.4] rounded-2xl" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
});

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { addItem } = useCartStore();

  useEffect(() => {
    let cancelled = false;
    api.products
      .getAll()
      .then((data) => { if (!cancelled) setProducts(data); })
      .catch(() => toast.error("Failed to load products"))
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const handleFilterChange = useCallback((patch: Partial<Filters>) => {
    setFilters((f) => ({ ...f, ...patch }));
  }, []);

  const handleReset = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent, product: Product) => {
      e.preventDefault();
      e.stopPropagation();
      addItem(product);
      toast.success(`Added ${product.name}`);
    },
    [addItem]
  );

  const openMobileFilters = useCallback(() => setShowMobileFilters(true), []);
  const closeMobileFilters = useCallback(() => setShowMobileFilters(false), []);

  const filteredProducts = useMemo(() => {
    const q = filters.searchQuery.toLowerCase();
    const [minP, maxP] = filters.priceRange;
    return products
      .filter(
        (p) =>
          (filters.category === "All" || p.category === filters.category) &&
          p.name.toLowerCase().includes(q) &&
          p.price >= minP &&
          p.price <= maxP
      )
      .sort((a, b) => {
        if (filters.sortBy === "price-low") return a.price - b.price;
        if (filters.sortBy === "price-high") return b.price - a.price;
        return 0;
      });
  }, [products, filters]);

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 p-6 overflow-y-auto rounded-lg border shrink-0">
        <h2 className="text-lg font-bold mb-6">Filters</h2>
        <FilterSection filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto min-w-0">
        <div className="px-3 md:px-6 py-1 md:py-1">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 md:gap-6">
            {loading ? <SkeletonGrid /> : filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
      </main>

      {/* Mobile FAB */}
      <button
        onClick={openMobileFilters}
        aria-label="Open filters"
        className={cn(
          "lg:hidden fixed bottom-6 right-6 z-40",
          "flex items-center gap-2 px-4 py-3",
          "bg-primary text-primary-foreground",
          "rounded-full shadow-lg shadow-primary/30",
          "text-sm font-medium transition-transform active:scale-95"
        )}
      >
        <Filter className="h-4 w-4" />
        Filters
      </button>

      {/* Mobile Bottom Sheet */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={closeMobileFilters} aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-[2rem] p-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-6" />
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filter &amp; Sort</h2>
              <Button variant="ghost" size="icon" onClick={closeMobileFilters}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <FilterSection filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />
            <Button className="w-full mt-6 rounded-xl py-6" onClick={closeMobileFilters}>
              Show {filteredProducts.length} Results
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}