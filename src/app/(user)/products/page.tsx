"use client";

import { useState, useMemo } from "react";
import { Clock, ChevronLeft, ShoppingCart, Minus, Plus } from "lucide-react";
import { ProgressLink } from "@/components/progress-link";

// ─── REFINED PRODUCT CARD (Zenda Style) ───────────────────────────────────────

function ProductCard({ item, qty, onAdd, onRemove }: any) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
      {/* Discount Badge */}
      <div className="absolute top-0 left-0 z-10 bg-[#1e5fa3] text-white font-bold px-2 py-1 rounded-br-xl text-[10px] text-center leading-tight">
        {item.discount}%<br />OFF
      </div>

      <div className="p-2 sm:p-3 flex flex-col h-full">
        <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-gray-50">
          <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>

        <div className="flex items-center gap-1 mb-1.5">
          <Clock className="h-3 w-3 text-orange-400" />
          <span className="text-[9px] font-black text-orange-400 uppercase tracking-tighter">9 MINS</span>
        </div>

        <h3 className="text-[13px] font-bold text-gray-800 leading-tight line-clamp-2">
          {item.name} <span className="font-normal text-gray-400">({item.nameLocal})</span>
        </h3>
        <p className="text-[11px] text-gray-400 mt-1">{item.qty}</p>

        <div className="flex items-center justify-between mt-auto pt-4">
          <div className="flex flex-col">
            <span className="text-[15px] font-black text-gray-900">₹{item.price}</span>
            <span className="text-[10px] text-gray-400 line-through">₹{item.oldPrice}</span>
          </div>

          {qty === 0 ? (
            <button 
              onClick={onAdd}
              className="border-2 border-[#00B344] text-[#00B344] font-black text-[11px] px-4 py-1.5 rounded-xl hover:bg-green-50"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center bg-[#00B344] rounded-xl text-white overflow-hidden">
              <button onClick={onRemove} className="px-2 py-1.5 hover:bg-green-700"><Minus className="h-3 w-3" /></button>
              <span className="px-2 font-bold text-[12px]">{qty}</span>
              <button onClick={onAdd} className="px-2 py-1.5 hover:bg-green-700"><Plus className="h-3 w-3" /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN CATEGORY VIEW ──────────────────────────────────────────────────────

export default function CategoryView({ categoryName = "Vegetables & Fruits" }) {
  const [activeSubCat, setActiveSubCat] = useState("all");
  const [cart, setCart] = useState<Record<string, number>>({});

  // Subcategories specific to "Fruits & Vegetables"
  const subCats = [
    { id: "all", name: "All", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100" },
    { id: "veg", name: "Vegetables", img: "https://images.unsplash.com/photo-1566385101042-1a000c1268c4?w=100" },
    { id: "fruit", name: "Fruits", img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=100" },
    { id: "exotic", name: "Exotics", img: "https://images.unsplash.com/photo-1527325678964-54921661f888?w=100" },
    { id: "leafy", name: "Leafy", img: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=100" },
    { id: "hydro", name: "Hydroponics", img: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=100" },
  ];

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex items-center px-4 py-3 border-b border-gray-100 gap-4">
        <ProgressLink href="/">
          <button className="h-9 w-9 rounded-full bg-gray-50 flex items-center justify-center">
            <ChevronLeft className="h-5 w-5 text-blue-600" />
          </button>
        </ProgressLink>
        <h1 className="text-lg font-black text-gray-900 flex-1">{categoryName}</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Vertical Sub-Category Sidebar (Scrolling) */}
        <aside className="w-20 border-r border-gray-50 flex flex-col overflow-y-auto scrollbar-hide py-2">
          {subCats.map((sub) => (
            <button 
              key={sub.id}
              onClick={() => setActiveSubCat(sub.id)}
              className={`flex flex-col items-center py-4 px-1 border-l-4 transition-all ${
                activeSubCat === sub.id ? "border-[#00B344] bg-green-50/50" : "border-transparent opacity-60"
              }`}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 mb-1">
                <img src={sub.img} className="w-full h-full object-cover" alt="" />
              </div>
              <span className="text-[9px] font-bold text-center leading-tight">{sub.name}</span>
            </button>
          ))}
        </aside>

        {/* Product Grid (Scrolling) */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50/30">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20">
             {/* Map your products here */}
             {[1,2,3,4,5,6,7,8].map(i => (
                <ProductCard 
                   key={i} 
                   item={{name: "Onion", nameLocal: "Savala", price: 26, oldPrice: 30, discount: 13, qty: "1 kg", img: "..."}}
                   qty={cart[i] || 0}
                   onAdd={() => setCart(p => ({...p, [i]: (p[i]||0)+1}))}
                   onRemove={() => setCart(p => ({...p, [i]: Math.max(0, p[i]-1)}))}
                />
             ))}
          </div>
        </main>
      </div>

      {/* Floating Cart (Zenda Style) */}
      {Object.values(cart).some(q => q > 0) && (
        <div className="fixed bottom-6 left-4 right-4 bg-[#00B344] text-white p-4 rounded-2xl flex items-center justify-between shadow-xl">
           <div className="flex flex-col">
              <span className="text-[10px] font-bold">4 ITEMS</span>
              <span className="text-lg font-black">₹112</span>
           </div>
           <button className="bg-white text-[#00B344] px-6 py-2 rounded-xl font-black text-sm uppercase">View Cart</button>
        </div>
      )}
    </div>
  );
}
