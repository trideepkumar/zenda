"use client";

import { useState } from "react";
import { ArrowLeft, MapPin, Star, Clock, Bike } from "lucide-react";
import { cn } from "@/lib/utils";
import { Shop } from "./data";
import { ProductCard } from "./productcard";


interface ShopDetailProps {
  shop: Shop;
  onBack: () => void;
}

export function ShopDetail({ shop, onBack }: ShopDetailProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? shop.products
      : shop.products.filter((p) => p.category === activeCategory);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-5 transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to stores
      </button>

      {/* Shop header */}
      <div className="rounded-2xl border border-border/60 overflow-hidden mb-6">
        <div className="relative h-36 bg-muted overflow-hidden">
          <img
            src={shop.img}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <h2 className="text-white font-bold text-xl drop-shadow">{shop.name}</h2>
            {shop.badge && (
              <span
                className={cn(
                  "text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide",
                  shop.badgeVariant === "red" && "bg-rose-500 text-white",
                  shop.badgeVariant === "amber" && "bg-amber-500 text-white",
                  shop.badgeVariant === "green" && "bg-emerald-500 text-white",
                )}
              >
                {shop.badge}
              </span>
            )}
          </div>
        </div>

        <div className="px-4 py-3 bg-card flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-foreground">{shop.rating}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {10-20} min
          </span>
          <span className="flex items-center gap-1.5">
            <Bike className="h-3.5 w-3.5" />
            {shop.deliveryFee === 0
              ? "Free delivery"
              : `₹${shop.deliveryFee} delivery`}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {/* {shop.address} */}
          </span>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-hide">
        {shop.categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all",
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products grid */}
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-12">
          No products in this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} shopId={shop.id} />
          ))}
        </div>
      )}
    </div>
  );
}