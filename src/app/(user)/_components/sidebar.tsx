"use client";

import { useState } from "react";
import {
  SlidersHorizontal,
  ChevronDown,
  Leaf,
  Flame,
  Clock,
  Star,
  Tag,
  Zap,
  Layers,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ItemType = "delivery" | "classified";

function FilterGroup({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-border/50 pb-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between mb-3 group"
      >
        <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/60 group-hover:text-foreground transition-colors">
          {icon}
          {title}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      {open && <div className="space-y-2.5">{children}</div>}
    </div>
  );
}

function CheckOption({ label }: { label: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <label
      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
      onClick={() => setChecked((c) => !c)}
    >
      <span
        className={cn(
          "w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0",
          checked ? "bg-primary border-primary" : "border-border",
        )}
      >
        {checked && <span className="w-2 h-2 bg-white rounded-sm block" />}
      </span>
      {label}
    </label>
  );
}

export function Sidebar({ tab }: { tab: ItemType }) {
  const [maxPrice, setMaxPrice] = useState(1000);
  const [maxTime, setMaxTime] = useState(45);
  const [maxDist, setMaxDist] = useState(10);
  const [minRating, setMinRating] = useState(0);

  return (
    <div
      className="p-5 rounded-2xl border border-border bg-card/50 space-y-5 overflow-y-auto h-full"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <h2 className="font-bold text-base flex items-center gap-2 sticky top-0 bg-card/50 pb-2 z-10">
        <SlidersHorizontal className="h-4 w-4 text-primary" /> Filters
      </h2>

      {tab === "delivery" ? (
        <>
          <FilterGroup title="Store Type" icon={<Leaf className="h-3 w-3" />}>
            {["Supermarket", "Organic", "Dairy & Eggs", "Meat & Fish", "Bakery"].map(
              (t) => <CheckOption key={t} label={t} />,
            )}
          </FilterGroup>

          <FilterGroup title="Dietary" icon={<Leaf className="h-3 w-3" />}>
            {["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Dairy-Free"].map(
              (t) => <CheckOption key={t} label={t} />,
            )}
          </FilterGroup>

          <FilterGroup title="Delivery Time" icon={<Clock className="h-3 w-3" />}>
            <div className="space-y-2">
              <input
                type="range" min={10} max={60} value={maxTime}
                onChange={(e) => setMaxTime(+e.target.value)}
                className="w-full accent-primary h-1.5 rounded-full cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                <span>10 min</span>
                <span className="text-primary font-black">≤{maxTime} min</span>
                <span>60 min</span>
              </div>
            </div>
          </FilterGroup>

          <FilterGroup title="Min Rating" icon={<Star className="h-3 w-3" />}>
            <div className="flex gap-1.5 mt-1 flex-wrap">
              {[0, 3, 3.5, 4, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={cn(
                    "flex-1 min-w-[36px] py-1.5 rounded-lg text-[10px] font-black border transition-all",
                    minRating === r
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary/50",
                  )}
                >
                  {r === 0 ? "All" : `${r}★`}
                </button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Max Price (₹)" icon={<Tag className="h-3 w-3" />}>
            <div className="space-y-2">
              <input
                type="range" min={100} max={2000} step={50} value={maxPrice}
                onChange={(e) => setMaxPrice(+e.target.value)}
                className="w-full accent-primary h-1.5 rounded-full cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                <span>₹100</span>
                <span className="text-primary font-black">≤₹{maxPrice}</span>
                <span>₹2000</span>
              </div>
            </div>
          </FilterGroup>

          <FilterGroup title="Offers" icon={<Zap className="h-3 w-3" />}>
            {["Free Delivery", "50% Off First Order", "Buy 1 Get 1", "Flash Deal"].map(
              (t) => <CheckOption key={t} label={t} />,
            )}
          </FilterGroup>
        </>
      ) : (
        <>
          <FilterGroup title="Condition" icon={<Layers className="h-3 w-3" />}>
            {["Brand New", "Like New", "Good", "Fair", "For Parts"].map(
              (t) => <CheckOption key={t} label={t} />,
            )}
          </FilterGroup>

          <FilterGroup title="Category" icon={<Flame className="h-3 w-3" />}>
            {["Electronics", "Furniture", "Vehicles", "Clothing", "Books", "Sports & Fitness"].map(
              (t) => <CheckOption key={t} label={t} />,
            )}
          </FilterGroup>

          <FilterGroup title="Price Range (₹)" icon={<Tag className="h-3 w-3" />}>
            <div className="flex gap-2">
              <input type="number" placeholder="Min"
                className="w-full bg-muted/60 p-2 rounded-lg text-xs border border-border focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input type="number" placeholder="Max"
                className="w-full bg-muted/60 p-2 rounded-lg text-xs border border-border focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </FilterGroup>

          <FilterGroup title="Distance" icon={<MapPin className="h-3 w-3" />}>
            <div className="space-y-2">
              <input
                type="range" min={1} max={30} value={maxDist}
                onChange={(e) => setMaxDist(+e.target.value)}
                className="w-full accent-primary h-1.5 rounded-full cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                <span>1 km</span>
                <span className="text-primary font-black">≤{maxDist} km</span>
                <span>30 km</span>
              </div>
            </div>
          </FilterGroup>

          <FilterGroup title="Listing Age" icon={<Clock className="h-3 w-3" />}>
            {["Today", "Last 3 Days", "This Week", "This Month"].map(
              (t) => <CheckOption key={t} label={t} />,
            )}
          </FilterGroup>

          <FilterGroup title="Seller" icon={<Zap className="h-3 w-3" />}>
            {["Verified Sellers", "Individual", "Dealer / Shop", "Top Rated"].map(
              (t) => <CheckOption key={t} label={t} />,
            )}
          </FilterGroup>
        </>
      )}

      <button className="w-full py-2 rounded-xl text-xs font-black text-muted-foreground hover:text-foreground border border-border hover:border-primary/40 transition-all">
        Clear All Filters
      </button>
    </div>
  );
}