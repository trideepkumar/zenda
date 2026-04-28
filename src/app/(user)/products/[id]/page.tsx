"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight, Home, Minus, Plus,
  ShoppingCart, Info, AlertTriangle,
  Share2, Star, Tag,
} from "lucide-react";
import { toast } from "sonner";

import { api } from "@/lib/api";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { addItem } = useCartStore();

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);

    Promise.all([api.products.getById(id), api.products.getAll()])
      .then(([prod, all]) => {
        if (cancelled) return;
        if (prod) {
          setProduct(prod);
          setRelated(all.filter(p => p.category === prod.category && p.id !== prod.id).slice(0, 4));
        }
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [id]);

  const images = useMemo(() => {
    if (!product) return [];
    return product.images?.length ? product.images : [product.imageUrl];
  }, [product]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addItem(product, quantity);
    toast.success(`Added ${quantity} × ${product.name} to bag`);
  }, [product, quantity, addItem]);

  if (loading) return <ProductSkeleton />;

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <Button asChild><Link href="/products">Back to Shop</Link></Button>
      </div>
    );
  }

  const isLowStock = product.stock > 0 && product.stock < 5;
  const isOutOfStock = product.stock === 0;

  return (
    // min-h-screen content container with restricted vertical space
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-6">
      
      {/* ── Breadcrumbs (Reduced Margin) ── */}
      <nav className="flex items-center text-[11px] text-muted-foreground gap-1">
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1 shrink-0">
          <Home className="h-3 w-3" /> Home
        </Link>
        <ChevronRight className="h-3 w-3 shrink-0" />
        <span className="text-foreground font-medium truncate max-w-[150px]">{product.name}</span>
      </nav>

      {/* ── Main Section: Restricted to 75% of viewport height ── */}
      <div className="grid lg:grid-cols-[70px_1fr_380px] gap-6 items-stretch max-h-[calc(100vh-160px)]">

        {/* ── Col 1: Thumbnails ── */}
        <div className="hidden lg:flex flex-col gap-2 overflow-y-auto pr-1 no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={cn(
                "w-[70px] h-[70px] rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-muted",
                selectedImage === idx ? "border-primary" : "border-transparent"
              )}
            >
              <img src={img} alt="" className="object-cover w-full h-full" />
            </button>
          ))}
        </div>

        {/* ── Col 2: Main Image (Auto-scales to fill height) ── */}
        <div className="relative rounded-xl overflow-hidden border bg-muted flex-1 min-h-0">
          <img
            src={images[selectedImage]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <button
            onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-md border flex items-center justify-center hover:bg-background shadow-sm"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* ── Col 3: Details Panel (Compact & Scrollable if needed) ── */}
        <div className="flex flex-col gap-4 rounded-xl border bg-card p-5 shadow-sm overflow-y-auto no-scrollbar">
          <div className="space-y-2">
            <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary border-none text-[9px] h-5">
              {product.category}
            </Badge>
            <h1 className="text-xl font-bold tracking-tight text-foreground leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("h-3 w-3", i < 4 ? "fill-amber-400 text-amber-400" : "fill-muted text-muted")} />
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">4.8 (128)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-foreground">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>

          <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/10 p-3 flex items-center gap-2">
            <Tag className="h-4 w-4 text-emerald-600" />
            <p className="text-[10px] font-medium text-emerald-700 leading-tight">Special Pricing Active. Discount applied at checkout.</p>
          </div>

          <div className="flex-1 min-h-0">
             <p className="text-[12px] text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator />

          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">Quantity</span>
              <div className="flex items-center border rounded-lg overflow-hidden h-8 bg-muted/20">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 flex items-center justify-center hover:bg-muted"><Minus className="h-3 w-3"/></button>
                <span className="w-8 text-center text-xs font-bold">{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="w-8 flex items-center justify-center hover:bg-muted"><Plus className="h-3 w-3"/></button>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full rounded-lg h-11 text-sm font-bold gap-2 shadow-lg shadow-primary/10 transition-all active:scale-95"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              <ShoppingCart className="h-4 w-4" />
              {isOutOfStock ? "Sold Out" : "Add to Bag"}
            </Button>
            
            <p className="text-center text-[10px] text-muted-foreground">
              Total: <span className="text-foreground font-bold">${(product.price * quantity).toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductSkeleton() {
    return <div className="max-w-7xl mx-auto px-6 py-10"><Skeleton className="h-[500px] w-full rounded-xl" /></div>;
}