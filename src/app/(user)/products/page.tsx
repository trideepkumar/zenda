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
import { Shop, SHOPS } from "@/data/shops";
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
// "use client";

// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Heart,
//   MessageCircle,
//   ShoppingBasket,
//   Zap,
//   Star,
//   MapPin,
//   SlidersHorizontal,
//   ChevronDown,
//   Bike,
//   Leaf,
//   Flame,
//   Tag,
//   Layers,
//   Clock,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { useCartStore } from "@/store/cartStore";
// // import { useCart } from "@/hooks/use-cart"; // adjust path to your cart hook

// /* ─── Types ───────────────────────────────────────────── */
// type ItemType = "delivery" | "classified";

// /* ─── Data ────────────────────────────────────────────── */
// export const DELIVERY_ITEMS = [
//   {
//     id: "prod-1",
//     title: "Avocado Bliss Bowl",
//     category: "Café • Salads • Healthy",
//     price: 350,
//     time: "20–25",
//     rating: 4.8,
//     img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
//     tag: "Bestseller",
//   },
//   {
//     id: "prod-2",
//     title: "Butter Chicken Feast",
//     category: "Indian • Curries • Biryani",
//     price: 280,
//     time: "30–35",
//     rating: 4.6,
//     img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",
//     tag: "Popular",
//   },
//   {
//     id: "prod-3",
//     title: "Margherita Supreme",
//     category: "Italian • Pizza • Pasta",
//     price: 420,
//     time: "25–30",
//     rating: 4.9,
//     img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
//     tag: null,
//   },
//   {
//     id: "prod-4",
//     title: "Dragon Sushi Roll",
//     category: "Japanese • Sushi • Ramen",
//     price: 650,
//     time: "35–40",
//     rating: 4.7,
//     img: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=500",
//     tag: "New",
//   },
//   {
//     id: "prod-5",
//     title: "Smoky BBQ Burger",
//     category: "American • Burgers • Fries",
//     price: 390,
//     time: "15–20",
//     rating: 4.5,
//     img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
//     tag: null,
//   },
//   {
//     id: "prod-6",
//     title: "Green Goddess Wrap",
//     category: "Café • Wraps • Vegan",
//     price: 220,
//     time: "18–22",
//     rating: 4.4,
//     img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
//     tag: "Vegan",
//   },
//   {
//     id: "prod-7",
//     title: "Spicy Ramen Bowl",
//     category: "Japanese • Ramen • Noodles",
//     price: 480,
//     time: "30–35",
//     rating: 4.6,
//     img: "https://images.unsplash.com/photo-1543352634-1e9a1c0b3f2c?w=500",
//     tag: "Spicy",
//   },
//   {
//     id: "prod-8",
//     title: "Chocolate Lava Cake",
//     category: "Desserts • Cakes • Sweets",
//     price: 320,
//     time: "10–15",
//     rating: 4.9,
//     img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500",
//     tag: "Dessert",
//   },
// ];

// export const CLASSIFIED_ITEMS = [
//   {
//     id: "prod-1",
//     title: "MacBook Pro M2 – Space Gray",
//     category: "Electronics • Laptops",
//     price: 85000,
//     condition: "Like New",
//     distance: "2.5km",
//     img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500",
//     urgent: true,
//   },
//   {
//     id: "prod-2",
//     title: "Sony WH-1000XM5 Headphones",
//     category: "Electronics • Audio",
//     price: 18500,
//     condition: "Good",
//     distance: "4.1km",
//     img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500",
//     urgent: false,
//   },
//   {
//     id: "prod-3",
//     title: "Vintage Teak Bookshelf",
//     category: "Furniture • Storage",
//     price: 3200,
//     condition: "Used – Good",
//     distance: "1.8km",
//     img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
//     urgent: false,
//   },
//   {
//     id: "prod-4",
//     title: "Canon EOS R50 + 18-45mm",
//     category: "Photography • Cameras",
//     price: 54000,
//     condition: "Brand New",
//     distance: "6.3km",
//     img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
//     urgent: true,
//   },
//   {
//     id: "prod-5",
//     title: "Ergonomic Office Chair",
//     category: "Furniture • Office",
//     price: 7800,
//     condition: "Like New",
//     distance: "3.0km",
//     img: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500",
//     urgent: false,
//   },
//   {
//     id: "prod-6",
//     title: "iPad Air 5th Gen + Pencil",
//     category: "Electronics • Tablets",
//     price: 42000,
//     condition: "Good",
//     distance: "5.7km",
//     img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
//     urgent: false,
//   },
//   {
//     id: "prod-7",
//     title: "Mountain Bike – Trek Marlin 7",
//     category: "Sports & Fitness • Bicycles",
//     price: 15000,
//     condition: "Used – Fair",
//     distance: "8.2km",
//     img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500",
//     urgent: false,
//   },
//   {
//     id: "prod-8",
//     title: "Leather Jacket – Men’s Medium",
//     category: "Clothing • Jackets",
//     price: 4500,
//     condition: "Used – Good",
//     distance: "2.9km",
//     img: "https://images.unsplash.com/photo-1521334884684-d80222895322?w=500",
//     urgent: false,
//   },
// ];

// /* ─── Filter helpers ──────────────────────────────────── */
// function FilterGroup({
//   title,
//   children,
//   icon,
// }: {
//   title: string;
//   children: React.ReactNode;
//   icon?: React.ReactNode;
// }) {
//   const [open, setOpen] = useState(true);
//   return (
//     <div className="border-b border-border/50 pb-5">
//       <button
//         onClick={() => setOpen((o) => !o)}
//         className="w-full flex items-center justify-between mb-3 group"
//       >
//         <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/60 group-hover:text-foreground transition-colors">
//           {icon}
//           {title}
//         </span>
//         <ChevronDown
//           className={cn(
//             "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
//             open && "rotate-180",
//           )}
//         />
//       </button>
//       {open && <div className="space-y-2.5">{children}</div>}
//     </div>
//   );
// }

// function CheckOption({ label }: { label: string }) {
//   const [checked, setChecked] = useState(false);
//   return (
//     <label
//       className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
//       onClick={() => setChecked((c) => !c)}
//     >
//       <span
//         className={cn(
//           "w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0",
//           checked ? "bg-primary border-primary" : "border-border",
//         )}
//       >
//         {checked && <span className="w-2 h-2 bg-white rounded-sm block" />}
//       </span>
//       {label}
//     </label>
//   );
// }

// /* ─── Sidebar ─────────────────────────────────────────── */
// function Sidebar({ tab }: { tab: ItemType }) {
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [maxTime, setMaxTime] = useState(45);
//   const [maxDist, setMaxDist] = useState(10);
//   const [minRating, setMinRating] = useState(0);

//   return (
//     /* 
//       The sidebar itself scrolls independently via overflow-y-auto.
//       [&::-webkit-scrollbar]:hidden hides the scrollbar on webkit.
//       scrollbar-hide (Tailwind plugin) or the inline style below handles Firefox.
//     */
//     <div
//       className="p-5 rounded-2xl border border-border bg-card/50 space-y-5 overflow-y-auto h-full"
//       style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//     >
//       <style>{`div::-webkit-scrollbar { display: none; }`}</style>

//       <h2 className="font-bold text-base flex items-center gap-2 sticky top-0 bg-card/50 pb-2 z-10">
//         <SlidersHorizontal className="h-4 w-4 text-primary" /> Filters
//       </h2>

//       {tab === "delivery" ? (
//         <>
//           <FilterGroup title="Dietary" icon={<Leaf className="h-3 w-3" />}>
//             {["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Dairy-Free"].map(
//               (t) => (
//                 <CheckOption key={t} label={t} />
//               ),
//             )}
//           </FilterGroup>

//           <FilterGroup title="Cuisine" icon={<Flame className="h-3 w-3" />}>
//             {[
//               "Indian",
//               "Chinese",
//               "Italian",
//               "Japanese",
//               "American",
//               "Mediterranean",
//             ].map((t) => (
//               <CheckOption key={t} label={t} />
//             ))}
//           </FilterGroup>

//           <FilterGroup
//             title="Delivery Time"
//             icon={<Clock className="h-3 w-3" />}
//           >
//             <div className="space-y-2">
//               <input
//                 type="range"
//                 min={10}
//                 max={60}
//                 value={maxTime}
//                 onChange={(e) => setMaxTime(+e.target.value)}
//                 className="w-full accent-primary h-1.5 rounded-full cursor-pointer"
//               />
//               <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
//                 <span>10 min</span>
//                 <span className="text-primary font-black">≤{maxTime} min</span>
//                 <span>60 min</span>
//               </div>
//             </div>
//           </FilterGroup>

//           <FilterGroup title="Min Rating" icon={<Star className="h-3 w-3" />}>
//             <div className="flex gap-1.5 mt-1 flex-wrap">
//               {[0, 3, 3.5, 4, 4.5].map((r) => (
//                 <button
//                   key={r}
//                   onClick={() => setMinRating(r)}
//                   className={cn(
//                     "flex-1 min-w-[36px] py-1.5 rounded-lg text-[10px] font-black border transition-all",
//                     minRating === r
//                       ? "bg-primary text-primary-foreground border-primary"
//                       : "border-border text-muted-foreground hover:border-primary/50",
//                   )}
//                 >
//                   {r === 0 ? "All" : `${r}★`}
//                 </button>
//               ))}
//             </div>
//           </FilterGroup>

//           <FilterGroup title="Max Price (₹)" icon={<Tag className="h-3 w-3" />}>
//             <div className="space-y-2">
//               <input
//                 type="range"
//                 min={100}
//                 max={2000}
//                 step={50}
//                 value={maxPrice}
//                 onChange={(e) => setMaxPrice(+e.target.value)}
//                 className="w-full accent-primary h-1.5 rounded-full cursor-pointer"
//               />
//               <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
//                 <span>₹100</span>
//                 <span className="text-primary font-black">≤₹{maxPrice}</span>
//                 <span>₹2000</span>
//               </div>
//             </div>
//           </FilterGroup>

//           <FilterGroup title="Offers" icon={<Zap className="h-3 w-3" />}>
//             {[
//               "Free Delivery",
//               "50% Off First Order",
//               "Buy 1 Get 1",
//               "Flash Deal",
//             ].map((t) => (
//               <CheckOption key={t} label={t} />
//             ))}
//           </FilterGroup>
//         </>
//       ) : (
//         <>
//           <FilterGroup title="Condition" icon={<Layers className="h-3 w-3" />}>
//             {["Brand New", "Like New", "Good", "Fair", "For Parts"].map((t) => (
//               <CheckOption key={t} label={t} />
//             ))}
//           </FilterGroup>

//           <FilterGroup title="Category" icon={<Flame className="h-3 w-3" />}>
//             {[
//               "Electronics",
//               "Furniture",
//               "Vehicles",
//               "Clothing",
//               "Books",
//               "Sports & Fitness",
//             ].map((t) => (
//               <CheckOption key={t} label={t} />
//             ))}
//           </FilterGroup>

//           <FilterGroup
//             title="Price Range (₹)"
//             icon={<Tag className="h-3 w-3" />}
//           >
//             <div className="flex gap-2">
//               <input
//                 type="number"
//                 placeholder="Min"
//                 className="w-full bg-muted/60 p-2 rounded-lg text-xs border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//               />
//               <input
//                 type="number"
//                 placeholder="Max"
//                 className="w-full bg-muted/60 p-2 rounded-lg text-xs border border-border focus:outline-none focus:ring-1 focus:ring-primary"
//               />
//             </div>
//           </FilterGroup>

//           <FilterGroup title="Distance" icon={<MapPin className="h-3 w-3" />}>
//             <div className="space-y-2">
//               <input
//                 type="range"
//                 min={1}
//                 max={30}
//                 value={maxDist}
//                 onChange={(e) => setMaxDist(+e.target.value)}
//                 className="w-full accent-primary h-1.5 rounded-full cursor-pointer"
//               />
//               <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
//                 <span>1 km</span>
//                 <span className="text-primary font-black">≤{maxDist} km</span>
//                 <span>30 km</span>
//               </div>
//             </div>
//           </FilterGroup>

//           <FilterGroup title="Listing Age" icon={<Clock className="h-3 w-3" />}>
//             {["Today", "Last 3 Days", "This Week", "This Month"].map((t) => (
//               <CheckOption key={t} label={t} />
//             ))}
//           </FilterGroup>

//           <FilterGroup title="Seller" icon={<Zap className="h-3 w-3" />}>
//             {[
//               "Verified Sellers",
//               "Individual",
//               "Dealer / Shop",
//               "Top Rated",
//             ].map((t) => (
//               <CheckOption key={t} label={t} />
//             ))}
//           </FilterGroup>
//         </>
//       )}

//       <button className="w-full py-2 rounded-xl text-xs font-black text-muted-foreground hover:text-foreground border border-border hover:border-primary/40 transition-all">
//         Clear All Filters
//       </button>
//     </div>
//   );
// }

// /* ─── Delivery Card ───────────────────────────────────── */
// /* ─── Optimized Delivery Card ───────────────────────────────────── */
// function DeliveryCard({ item }: { item: (typeof DELIVERY_ITEMS)[0] }) {
//   const router = useRouter();
//   const [liked, setLiked] = useState(false);
//   const [added, setAdded] = useState(false);

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setAdded(true);
//     setTimeout(() => setAdded(false), 1500);
//   };

//   return (
//     <div
//       onClick={() => router.push(`/products/${item.id}`)}
//       className="group bg-card border border-border/60 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden transition-all active:scale-[0.98] md:hover:shadow-xl md:hover:shadow-primary/5 duration-300 cursor-pointer flex flex-col"
//     >
//       {/* Media: Aspect Square on mobile for better grid alignment */}
//       <div className="relative aspect-square md:aspect-[4/3.5] overflow-hidden bg-muted">
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setLiked((l) => !l);
//           }}
//           className="absolute top-2 right-2 md:top-3 md:right-3 z-10 p-2 bg-background/70 backdrop-blur-md rounded-full shadow-sm"
//         >
//           <Heart
//             className={cn(
//               "h-3.5 w-3.5 transition-all",
//               liked
//                 ? "fill-rose-500 text-rose-500 scale-110"
//                 : "text-muted-foreground",
//             )}
//           />
//         </button>

//         {item.tag && (
//           <div className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-[8px] md:text-[9px] font-black px-2 py-0.5 md:px-2.5 md:py-1 rounded-md md:rounded-lg uppercase tracking-wider">
//             {item.tag}
//           </div>
//         )}

//         <img
//           src={item.img}
//           className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
//           alt={item.title}
//         />

//         {/* Floating Stats Overlay */}
//         <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-1">
//           <div className="bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-white border border-white/10">
//             <Clock className="h-2.5 w-2.5" />
//             <span className="text-[9px] font-light">{item.time}m</span>
//           </div>
//           <div className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-0.5 text-amber-600 border border-white/20">
//             <Star className="h-2.5 w-2.5 fill-current" />
//             <span className="text-[9px] font-black">{item.rating}</span>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-3 md:p-5 flex flex-col flex-1 justify-between gap-2">
//         <div className="space-y-1">
//           <h4 className="font-bold text-foreground text-xs md:text-base line-clamp-1">
//             {item.title}
//           </h4>
//           <div className="flex items-center justify-between">
//             <p className="text-[9px] md:text-[11px] text-muted-foreground font-medium uppercase truncate max-w-[60%]">
//               {item.category.split("•")[0]}
//             </p>
//             <span className="font-black text-primary text-xs md:text-base">
//               ₹{item.price}
//             </span>
//           </div>
//         </div>

//         <Button
//           onClick={handleAddToCart}
//           className={cn(
//             "w-full rounded-xl h-8 md:h-10 font-bold text-[10px] md:text-xs gap-1.5 transition-all shadow-sm",
//             added ? "bg-green-500 hover:bg-green-500" : "bg-primary",
//           )}
//         >
//           <PlusIcon className="h-3 w-3" />
//           {added ? "Added" : "Add"}
//         </Button>
//       </div>
//     </div>
//   );
// }

// /* ─── Optimized Classified Card ─────────────────────────────────── */
// function ClassifiedCard({ item }: { item: (typeof CLASSIFIED_ITEMS)[0] }) {
//   const router = useRouter();
//   const [liked, setLiked] = useState(false);

//   return (
//     <div
//       onClick={() => router.push(`/products/${item.id}`)}
//       className="group bg-card border border-border/60 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden transition-all active:scale-[0.98] duration-300 cursor-pointer flex flex-col"
//     >
//       <div className="relative aspect-square md:aspect-[4/3.5] overflow-hidden bg-muted">
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setLiked((l) => !l);
//           }}
//           className="absolute top-2 right-2 z-10 p-2 bg-background/70 backdrop-blur-md rounded-full shadow-sm"
//         >
//           <Heart
//             className={cn(
//               "h-3.5 w-3.5 transition-all",
//               liked
//                 ? "fill-rose-500 text-rose-500 scale-110"
//                 : "text-muted-foreground",
//             )}
//           />
//         </button>

//         {item.urgent && (
//           <div className="absolute top-2 left-2 z-10 bg-rose-500 text-white text-[8px] font-black px-2 py-0.5 rounded-md uppercase">
//             Urgent
//           </div>
//         )}

//         <img
//           src={item.img}
//           className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
//           alt={item.title}
//         />

//         <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
//           <span className="text-[9px] font-bold text-white uppercase tracking-tighter">
//             {item.condition}
//           </span>
//         </div>
//       </div>

//       <div className="p-3 md:p-5 flex flex-col flex-1 justify-between gap-3">
//         <div className="space-y-0.5">
//           <h4 className="font-bold text-foreground text-xs md:text-base line-clamp-1">
//             {item.title}
//           </h4>
//           <span className="font-black text-primary text-xs md:text-lg block">
//             ₹{item.price.toLocaleString("en-IN")}
//           </span>
//         </div>

//         <div className="flex flex-col gap-2">
//           <div className="flex gap-1.5">
//             <Button
//               variant="outline"
//               onClick={(e) => e.stopPropagation()}
//               className="flex-1 rounded-lg md:rounded-xl h-7 md:h-9 border-border font-bold text-[9px] md:text-xs gap-1"
//             >
//               <MessageCircle className="h-3 w-3" /> Chat
//             </Button>
//             <Button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 router.push(`/products/${item.id}`);
//               }}
//               className="flex-1 rounded-lg md:rounded-xl h-7 md:h-9 font-bold text-[9px] md:text-xs bg-muted text-foreground hover:bg-primary hover:text-white border-none"
//             >
//               Details
//             </Button>
//           </div>

//           <div className="flex items-center text-[8px] md:text-[10px] text-muted-foreground font-medium uppercase tracking-tight">
//             <MapPin className="h-2.5 w-2.5 mr-1 text-primary shrink-0" />
//             {item.distance} • Kochi
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Simple Helper Icon
// function PlusIcon({ className }: { className?: string }) {
//   return (
//     <svg
//       className={className}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="4"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M5 12h14M12 5v14" />
//     </svg>
//   );
// }

// /* ─── Main Page ───────────────────────────────────────── */
// export default function HybridMarketplace() {
//   const [activeTab, setActiveTab] = useState<ItemType>("delivery");
//   const [animating, setAnimating] = useState(false);
//   const gridRef = useRef<HTMLDivElement>(null);

//   const switchTab = (tab: ItemType) => {
//     if (tab === activeTab || animating) return;
//     setAnimating(true);
//     setTimeout(() => {
//       setActiveTab(tab);
//       // Scroll the grid back to top on tab switch
//       gridRef.current?.scrollTo({ top: 0, behavior: "smooth" });
//       setAnimating(false);
//     }, 220);
//   };

//   return (
//     /*
//       LAYOUT STRATEGY
//       ───────────────
//       The parent (this component) does NOT scroll.
//       We rely on the page's normal scroll (html/body) for the product grid,
//       which means the sidebar and top-bar stay pinned via `sticky`.

//       If your layout.tsx or a parent wrapper sets `overflow:hidden`, switch
//       the grid wrapper to `overflow-y-auto` with an explicit height instead.
//     */
//     <div className="bg-background text-foreground">
//       {/* ── Full-width toggle (sticky to page top) ── */}
//       <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
//         <div className="max-w-7xl mx-auto px-4 py-3">
//           <div className="relative w-full bg-muted rounded-2xl p-1 flex">
//             {/* Animated sliding pill */}
//             <div
//               className={cn(
//                 "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-background shadow-md",
//                 "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
//                 activeTab === "delivery" ? "left-1" : "left-[calc(50%+3px)]",
//               )}
//             />
//             {(["delivery", "classified"] as ItemType[]).map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => switchTab(tab)}
//                 className={cn(
//                   "relative z-10 flex-1 py-2.5 rounded-xl text-sm font-black",
//                   "transition-colors duration-300 flex items-center justify-center gap-2",
//                   activeTab === tab
//                     ? "text-primary"
//                     : "text-muted-foreground hover:text-foreground",
//                 )}
//               >
//                 {tab === "delivery" ? (
//                   <>
//                     <Bike className="h-4 w-4" /> Delivery
//                   </>
//                 ) : (
//                   <>
//                     <Tag className="h-4 w-4" /> Classifieds
//                   </>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── Body ── */}
//       <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6 items-start">
//         {/* Sidebar — sticky below the toggle bar, scrolls on its own if tall */}
//         <aside
//           className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-[73px]"
//           style={{
//             maxHeight: "calc(100vh - 73px)",
//             overflowY: "auto",
//             scrollbarWidth: "none",
//           }}
//         >
//           <Sidebar tab={activeTab} />
//         </aside>

//         {/* Product grid — scrolls with the page naturally */}
//         <section className="flex-1 min-w-0">
//           <div
//             ref={gridRef}
//             className={cn(
//               "grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5",
//               "transition-all duration-300",
//               animating
//                 ? "opacity-0 translate-y-2"
//                 : "opacity-100 translate-y-0",
//             )}
//           >
//             {activeTab === "delivery"
//               ? DELIVERY_ITEMS.map((item) => (
//                   <DeliveryCard key={item.id} item={item} />
//                 ))
//               : CLASSIFIED_ITEMS.map((item) => (
//                   <ClassifiedCard key={item.id} item={item} />
//                 ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }
