"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, MapPin, ChevronDown, Search, ShoppingCart, User, Menu } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";

export function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => { logout(); router.push("/login"); };

  return (
    // CHANGED: bg-white -> bg-background, border-b -> border-border
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background transition-colors">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        <div className="flex h-16 md:h-20 items-center justify-between gap-4 md:gap-8">
          
          <div className="flex items-center gap-4 md:gap-8">
            {/* CHANGED: text-[#5C2D91] -> text-primary (uses your OKLCH purple) */}
            <Link href="/" className="text-3xl md:text-4xl font-black text-primary tracking-tighter">
              zenda
            </Link>

            <div className="hidden sm:flex flex-col items-start cursor-pointer group">
              {/* CHANGED: text-gray-500 -> text-muted-foreground */}
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-none">Select Location</span>
              <div className="flex items-center gap-1">
                {/* CHANGED: text-gray-800 -> text-foreground */}
                <span className="text-xs md:text-sm font-bold text-foreground line-clamp-1 max-w-[120px]">Select Location</span>
                <ChevronDown className="h-3 w-3 md:h-4 md:w-4 text-primary" />
              </div>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="relative hidden md:flex flex-1 items-center max-w-2xl">
            <div className="absolute left-4">
              {/* CHANGED: text-gray-400 -> text-muted-foreground */}
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            {/* CHANGED: border-gray-200 bg-gray-50/50 -> border-input bg-muted/50 */}
            <input
              type="text"
              placeholder='Search for "cheese slices"'
              className="h-12 w-full rounded-xl border border-input bg-muted/50 pl-12 pr-4 text-base text-foreground outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground"
            />
          </div>

          {/* Right Actions */}
          {/* CHANGED: text-gray-700 -> text-foreground/80 hover:text-primary */}
          <div className="flex items-center gap-5 md:gap-8">
            {user ? (
               <button onClick={handleLogout} className="flex flex-col items-center text-foreground/80 hover:text-primary transition-colors">
                  <User className="h-5 w-5 md:h-6 md:w-6" />
                  <span className="hidden md:block text-xs font-bold mt-0.5">Profile</span>
               </button>
            ) : (
              <Link href="/login" className="flex flex-col items-center text-foreground/80 hover:text-primary transition-colors">
                <User className="h-5 w-5 md:h-6 md:w-6" />
                <span className="hidden md:block text-xs font-bold mt-0.5">Login</span>
              </Link>
            )}

            <Link href="/cart" className="flex flex-col items-center text-foreground/80 hover:text-primary transition-colors">
              <div className="relative">
                <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
                <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-md bg-[#ff3269] text-[9px] md:text-[10px] font-bold text-white">
                  3
                </span>
              </div>
              <span className="hidden md:block text-xs font-bold mt-0.5">Cart</span>
            </Link>

            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Search Row */}
        <div className="pb-3 md:hidden">
          <div className="relative flex items-center">
            <div className="absolute left-3">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            {/* CHANGED: bg-gray-50 border-gray-100 -> bg-muted border-input */}
            <input
              type="text"
              placeholder='Search for "cheese slices"'
              className="h-10 w-full rounded-lg border border-input bg-muted pl-10 pr-4 text-sm text-foreground outline-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
}