"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  MessageCircle,
  MapPin,
  Tag,
  Bike,
  Star,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sidebar } from "../_components/sidebar";
import { ShopGrid } from "../_components/shopgrid";
import { ShopDetail } from "../_components/shopdetail";
import { Shop, SHOPS } from "../_components/data";

// import { Sidebar } from "./_components/Sidebar";
// import { ShopGrid } from "./_components/ShopGrid";
// import { ShopDetail } from "./_components/ShopDetail";
// import { SHOPS, Shop } from "./_components/data";
// import { CLASSIFIED_ITEMS } from "./_components/data"; // see note below

/* ─── Types ───────────────────────────────────────────── */
type ItemType = "delivery" | "classified";

/* ─── Classified items (keep your original data here) ─── */
const CLASSIFIED_DATA = [
  {
    id: "prod-1",
    title: "MacBook Pro M2 – Space Gray",
    category: "Electronics • Laptops",
    price: 85000,
    condition: "Like New",
    distance: "2.5km",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500",
    urgent: true,
  },
  {
    id: "prod-2",
    title: "Sony WH-1000XM5 Headphones",
    category: "Electronics • Audio",
    price: 18500,
    condition: "Good",
    distance: "4.1km",
    img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500",
    urgent: false,
  },
  {
    id: "prod-3",
    title: "Vintage Teak Bookshelf",
    category: "Furniture • Storage",
    price: 3200,
    condition: "Used – Good",
    distance: "1.8km",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
    urgent: false,
  },
  {
    id: "prod-4",
    title: "Canon EOS R50 + 18-45mm",
    category: "Photography • Cameras",
    price: 54000,
    condition: "Brand New",
    distance: "6.3km",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    urgent: true,
  },
  {
    id: "prod-5",
    title: "Ergonomic Office Chair",
    category: "Furniture • Office",
    price: 7800,
    condition: "Like New",
    distance: "3.0km",
    img: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500",
    urgent: false,
  },
  {
    id: "prod-6",
    title: "iPad Air 5th Gen + Pencil",
    category: "Electronics • Tablets",
    price: 42000,
    condition: "Good",
    distance: "5.7km",
    img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    urgent: false,
  },
  {
    id: "prod-7",
    title: "Mountain Bike – Trek Marlin 7",
    category: "Sports & Fitness • Bicycles",
    price: 15000,
    condition: "Used – Fair",
    distance: "8.2km",
    img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500",
    urgent: false,
  },
  {
    id: "prod-8",
    title: "Leather Jacket – Men's Medium",
    category: "Clothing • Jackets",
    price: 4500,
    condition: "Used – Good",
    distance: "2.9km",
    img: "https://images.unsplash.com/photo-1521334884684-d80222895322?w=500",
    urgent: false,
  },
];

/* ─── Classified Card (unchanged from original) ────────── */
function ClassifiedCard({ item }: { item: (typeof CLASSIFIED_DATA)[0] }) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  return (
    <div
      onClick={() => router.push(`/products/${item.id}`)}
      className="group bg-card border border-border/60 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden transition-all active:scale-[0.98] duration-300 cursor-pointer flex flex-col"
    >
      <div className="relative aspect-square md:aspect-[4/3.5] overflow-hidden bg-muted">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked((l) => !l);
          }}
          className="absolute top-2 right-2 z-10 p-2 bg-background/70 backdrop-blur-md rounded-full shadow-sm"
        >
          <Heart
            className={cn(
              "h-3.5 w-3.5 transition-all",
              liked ? "fill-rose-500 text-rose-500 scale-110" : "text-muted-foreground",
            )}
          />
        </button>

        {item.urgent && (
          <div className="absolute top-2 left-2 z-10 bg-rose-500 text-white text-[8px] font-black px-2 py-0.5 rounded-md uppercase">
            Urgent
          </div>
        )}

        <img
          src={item.img}
          className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
          alt={item.title}
        />

        <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
          <span className="text-[9px] font-bold text-white uppercase tracking-tighter">
            {item.condition}
          </span>
        </div>
      </div>

      <div className="p-3 md:p-5 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-0.5">
          <h4 className="font-bold text-foreground text-xs md:text-base line-clamp-1">
            {item.title}
          </h4>
          <span className="font-black text-primary text-xs md:text-lg block">
            ₹{item.price.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5">
            <Button
              variant="outline"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 rounded-lg md:rounded-xl h-7 md:h-9 border-border font-bold text-[9px] md:text-xs gap-1"
            >
              <MessageCircle className="h-3 w-3" /> Chat
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/products/${item.id}`);
              }}
              className="flex-1 rounded-lg md:rounded-xl h-7 md:h-9 font-bold text-[9px] md:text-xs bg-muted text-foreground hover:bg-primary hover:text-white border-none"
            >
              Details
            </Button>
          </div>

          <div className="flex items-center text-[8px] md:text-[10px] text-muted-foreground font-medium uppercase tracking-tight">
            <MapPin className="h-2.5 w-2.5 mr-1 text-primary shrink-0" />
            {item.distance} • Kochi
          </div>
        </div>
      </div>
    </div>
  );
}

  export default function HybridMarketplace() {
  const [activeTab, setActiveTab] = useState<ItemType>("delivery");
  const [animating, setAnimating] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const switchTab = (tab: ItemType) => {
    if (tab === activeTab || animating) return;
    setAnimating(true);
    setSelectedShop(null); // reset shop view on tab switch
    setTimeout(() => {
      setActiveTab(tab);
      gridRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      setAnimating(false);
    }, 220);
  };

  return (
    <div className="bg-background text-foreground">
      {/* ── Toggle bar ── */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="relative w-full bg-muted rounded-2xl p-1 flex">
            <div
              className={cn(
                "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-background shadow-md",
                "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                activeTab === "delivery" ? "left-1" : "left-[calc(50%+3px)]",
              )}
            />
            {(["delivery", "classified"] as ItemType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => switchTab(tab)}
                className={cn(
                  "relative z-10 flex-1 py-2.5 rounded-xl text-sm font-black",
                  "transition-colors duration-300 flex items-center justify-center gap-2",
                  activeTab === tab
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab === "delivery" ? (
                  <>
                    <Bike className="h-4 w-4" /> Delivery
                  </>
                ) : (
                  <>
                    <Tag className="h-4 w-4" /> Classifieds
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6 items-start">
        {/* Sidebar */}
        <aside
          className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-[73px]"
          style={{ maxHeight: "calc(100vh - 73px)", overflowY: "auto", scrollbarWidth: "none" }}
        >
          <Sidebar tab={activeTab} />
        </aside>

        {/* Main content */}
        <section className="flex-1 min-w-0">
          <div
            ref={gridRef}
            className={cn(
              "transition-all duration-300",
              animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
            )}
          >
            {activeTab === "delivery" ? (
              selectedShop ? (
                /* ── Shop product view ── */
                <ShopDetail
                  shop={selectedShop}
                  onBack={() => setSelectedShop(null)}
                />
              ) : (
                /* ── Shop listing view ── */
                <ShopGrid shops={SHOPS} onSelectShop={setSelectedShop} />
              )
            ) : (
              /* ── Classifieds grid (unchanged) ── */
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
                {CLASSIFIED_DATA.map((item) => (
                  <ClassifiedCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
