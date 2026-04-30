"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Product } from "./data";

interface ProductCardProps {
  product: Product;
  shopId: string;
}

export function ProductCard({ product, shopId }: ProductCardProps) {
  const [qty, setQty] = useState(0);

  const add = () => setQty(1);
  const inc = () => setQty((q) => q + 1);
  const dec = () => setQty((q) => Math.max(0, q - 1));

  return (
    <div className="bg-card border border-border/60 rounded-2xl overflow-hidden flex flex-col group transition-all duration-200 hover:border-border hover:shadow-sm">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.offer && (
          <div className="absolute top-2 left-2 bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
            {product.offer}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-3 flex flex-col flex-1 justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-foreground line-clamp-2 leading-snug">
            {product.name}
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{product.unit}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-foreground">₹{product.price}</span>

          {qty === 0 ? (
            <button
              onClick={add}
              className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-lg font-light leading-none transition-all hover:bg-primary/90 active:scale-95"
            >
              +
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={dec}
                className="w-6 h-6 rounded-md border border-border flex items-center justify-center text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-all"
              >
                −
              </button>
              <span className="text-xs font-bold text-primary min-w-[14px] text-center">
                {qty}
              </span>
              <button
                onClick={inc}
                className="w-6 h-6 rounded-md border border-border flex items-center justify-center text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-all"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}