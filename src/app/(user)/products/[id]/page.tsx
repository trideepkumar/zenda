"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { ChevronRight, Home, Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

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
    
    Promise.all([
      api.products.getById(id),
      api.products.getAll()
    ]).then(([prod, allProducts]) => {
      if (prod) {
        setProduct(prod);
        setRelated(allProducts.filter(p => p.category === prod.category && p.id !== prod.id).slice(0, 4));
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-8">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Button render={<Link href="/products" />}>Back to Products</Button>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.imageUrl];

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  return (
    <div className="space-y-10 pb-10">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary"><Home className="h-4 w-4" /></Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/products" className="hover:text-primary">Products</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-foreground font-medium truncate">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-xl overflow-hidden border bg-muted">
            <img src={images[selectedImage]} alt={product.name} className="object-cover w-full h-full" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all shrink-0 ${selectedImage === idx ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
                >
                  <img src={img} alt={`Gallery ${idx}`} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <p className="text-primary font-medium tracking-wider text-sm uppercase">{product.category}</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">{product.name}</h1>
          <div className="text-3xl font-bold mt-4">${product.price.toFixed(2)}</div>
          
          <Separator className="my-6" />
          
          <div className="prose prose-sm dark:prose-invert">
            <p>{product.description}</p>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity</span>
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={quantity >= product.stock}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">{product.stock} available</span>
            </div>
            
            <Button size="lg" className="w-full sm:w-auto mt-4 gap-2" onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="pt-10">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map(rel => (
              <Link key={rel.id} href={`/products/${rel.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-square rounded-xl overflow-hidden bg-muted border mb-3">
                    <img src={rel.imageUrl} alt={rel.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h4 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">{rel.name}</h4>
                  <p className="font-bold">${rel.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
