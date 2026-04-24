"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart } from "lucide-react";

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Home', 'Accessories', 'Beauty', 'Sports'];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  // Filters state
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([500]);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    api.products.getAll().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    addItem(product);
    toast.success(`Added ${product.name} to cart`);
  };

  const filteredProducts = useMemo(() => {
    let result = products;
    if (category !== "All") {
      result = result.filter(p => p.category === category);
    }
    result = result.filter(p => p.price <= priceRange[0]);

    if (sortBy === "price-low") {
      result = result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = result.sort((a, b) => b.price - a.price);
    }
    
    return result;
  }, [products, category, priceRange, sortBy]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Filters Sidebar */}
      <div className="w-full md:w-64 space-y-6 flex-shrink-0">
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="space-y-1">
            {CATEGORIES.map(cat => (
              <Button
                key={cat}
                variant={category === cat ? "secondary" : "ghost"}
                className="w-full justify-start font-normal"
                onClick={() => setCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3">Max Price: ${priceRange[0]}</h3>
          <Slider
            defaultValue={[500]}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {category === "All" ? "All Products" : category}
          </h1>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <h3 className="text-lg font-semibold">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your filters.</p>
            <Button variant="outline" className="mt-4" onClick={() => {
              setCategory("All");
              setPriceRange([500]);
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card className="h-full flex flex-col group overflow-hidden border transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4 flex flex-col flex-1">
                    <p className="text-xs text-primary mb-1 font-medium">{product.category}</p>
                    <h4 className="font-semibold line-clamp-2">{product.name}</h4>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div className="font-bold text-lg">${product.price.toFixed(2)}</div>
                      <Button 
                        size="sm" 
                        className="rounded-full h-8 w-8 p-0"
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span className="sr-only">Add</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
