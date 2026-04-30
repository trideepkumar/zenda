"use client";

import { useState } from "react";
import { Star, Clock, Bike } from "lucide-react";
import { cn } from "@/lib/utils";
import { Shop, ShopCategory, SHOP_FILTER_TABS } from "./data";

interface ShopGridProps {
  shops: Shop[];
  onSelectShop: (shop: Shop) => void;
}

export function ShopGrid({ shops, onSelectShop }: ShopGridProps) {
  const [activeFilter, setActiveFilter] = useState<ShopCategory | "all">("all");

  const filtered =
    activeFilter === "all"
      ? shops
      : shops.filter((s) => s.type === activeFilter);

  return (
    <div>
      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-hide">
        {SHOP_FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={cn(
              "flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all",
              activeFilter === tab.value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Section label */}
      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
        {filtered.length} stores near you
      </p>

      {/* Shop cards - 2 cols on mobile, 3 on xl */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {filtered.map((shop) => (
          <ShopCard key={shop.id} shop={shop} onClick={() => onSelectShop(shop)} />
        ))}
      </div>
    </div>
  );
}

function ShopCard({ shop, onClick }: { shop: Shop; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group bg-card border border-border/60 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:border-border hover:shadow-md hover:shadow-black/5 active:scale-[0.99]"
    >
      {/* Hero image - shorter on mobile */}
      <div className="relative h-28 sm:h-40 bg-muted overflow-hidden">
        <img
          src={shop.img}
          alt={shop.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {shop.badge && (
          <div
            className={cn(
              "absolute top-2 left-2 text-[8px] sm:text-[9px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg uppercase tracking-wide",
              shop.badgeVariant === "red" && "bg-rose-500 text-white",
              shop.badgeVariant === "amber" && "bg-amber-500 text-white",
              shop.badgeVariant === "green" && "bg-emerald-500 text-white",
            )}
          >
            {shop.badge}
          </div>
        )}

        {/* Delivery time pill */}
        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-black/50 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg flex items-center gap-1 border border-white/10">
          <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          {shop.time}m
        </div>
      </div>

      {/* Info - compact on mobile */}
      <div className="p-2.5 sm:p-4">
        <h3 className="font-bold text-xs sm:text-sm text-foreground mb-0.5 line-clamp-1">
          {shop.name}
        </h3>
        <p className="text-[10px] sm:text-[11px] text-muted-foreground mb-2 line-clamp-1">
          {shop.address}
        </p>

        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-muted-foreground">
            <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-amber-400 text-amber-400 shrink-0" />
            <span className="font-semibold text-foreground">{shop.rating}</span>
          </div>
          <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold">
            <Bike className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground shrink-0" />
            {shop.deliveryFee === 0 ? (
              <span className="text-emerald-600 dark:text-emerald-400">Free</span>
            ) : (
              <span className="text-muted-foreground">Rs.{shop.deliveryFee}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { Star, Clock, Bike } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Shop, ShopCategory, SHOP_FILTER_TABS } from "./data";

// interface ShopGridProps {
//   shops: Shop[];
//   onSelectShop: (shop: Shop) => void;
// }

// export function ShopGrid({ shops, onSelectShop }: ShopGridProps) {
//   const [activeFilter, setActiveFilter] = useState<ShopCategory | "all">("all");

//   const filtered =
//     activeFilter === "all"
//       ? shops
//       : shops.filter((s) => s.type === activeFilter);

//   return (
//     <div>
//       {/* Filter chips */}
//       <div className="flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-hide">
//         {SHOP_FILTER_TABS.map((tab) => (
//           <button
//             key={tab.value}
//             onClick={() => setActiveFilter(tab.value)}
//             className={cn(
//               "flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all",
//               activeFilter === tab.value
//                 ? "bg-primary text-primary-foreground border-primary"
//                 : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
//             )}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Section label */}
//       <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
//         {filtered.length} stores near you
//       </p>

//       {/* Shop cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//         {filtered.map((shop) => (
//           <ShopCard key={shop.id} shop={shop} onClick={() => onSelectShop(shop)} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function ShopCard({ shop, onClick }: { shop: Shop; onClick: () => void }) {
//   return (
//     <div
//       onClick={onClick}
//       className="group bg-card border border-border/60 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:border-border hover:shadow-md hover:shadow-black/5 active:scale-[0.99]"
//     >
//       {/* Hero image */}
//       <div className="relative h-40 bg-muted overflow-hidden">
//         <img
//           src={shop.img}
//           alt={shop.name}
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

//         {shop.badge && (
//           <div
//             className={cn(
//               "absolute top-3 left-3 text-[9px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide",
//               shop.badgeVariant === "red" && "bg-rose-500 text-white",
//               shop.badgeVariant === "amber" && "bg-amber-500 text-white",
//               shop.badgeVariant === "green" && "bg-emerald-500 text-white",
//             )}
//           >
//             {shop.badge}
//           </div>
//         )}

//         {/* Delivery time pill on image */}
//         <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-white/10">
//           <Clock className="h-3 w-3" />
//           {shop.time} min
//         </div>
//       </div>

//       {/* Info */}
//       <div className="p-4">
//         <h3 className="font-bold text-sm text-foreground mb-1">{shop.name}</h3>
//         <p className="text-[11px] text-muted-foreground mb-3 line-clamp-1">
//           {shop.address}
//         </p>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
//             <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
//             <span className="font-semibold text-foreground">{shop.rating}</span>
//             <span className="text-border">·</span>
//             <span>{shop.products.length} items</span>
//           </div>

//           <div className="flex items-center gap-1 text-[11px] font-semibold">
//             <Bike className="h-3 w-3 text-muted-foreground" />
//             {shop.deliveryFee === 0 ? (
//               <span className="text-emerald-600 dark:text-emerald-400">Free</span>
//             ) : (
//               <span className="text-muted-foreground">₹{shop.deliveryFee}</span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }