"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  MapPin,
  Plus,
  X,
  Crosshair,
  Menu,
  LayoutGrid,
  Heart,
  LogOut,
  Settings,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { ThemeToggle } from "../theme-toggle";
import { useState, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Tab = "detect" | "manual";

const LOCATION_DATA: Record<string, Record<string, string[]>> = {
  India: {
    Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kannur"],
    Karnataka: ["Bengaluru", "Mysuru", "Mangaluru", "Hubli"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    Delhi: ["New Delhi", "Dwarka", "Rohini", "Noida"],
  },
  "United States": {
    California: ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
    Texas: ["Houston", "Austin", "Dallas", "San Antonio"],
    "New York": ["New York City", "Buffalo", "Albany"],
  },
  "United Kingdom": {
    England: ["London", "Manchester", "Birmingham", "Leeds"],
    Scotland: ["Edinburgh", "Glasgow", "Aberdeen"],
    Wales: ["Cardiff", "Swansea"],
  },
};

// ─────────────────────────────────────────────
// Reverse geocode helper
// ─────────────────────────────────────────────

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
    { headers: { "Accept-Language": "en" } }
  );
  if (!res.ok) throw new Error("Geocode failed");
  const { address } = await res.json();
  return (
    address.suburb ??
    address.city_district ??
    address.town ??
    address.village ??
    address.city ??
    address.county ??
    address.state ??
    "Unknown area"
  );
}

// ─────────────────────────────────────────────
// Location Modal
// ─────────────────────────────────────────────

function LocationModal({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (label: string) => void;
}) {
  const [tab, setTab] = useState<Tab>("detect");
  const [detectStatus, setDetectStatus] = useState("Uses GPS to detect your area");
  const [detecting, setDetecting] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const states = country ? Object.keys(LOCATION_DATA[country] ?? {}) : [];
  const cities = country && state ? (LOCATION_DATA[country]?.[state] ?? []) : [];

  // Lock body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleDetect = useCallback(() => {
    if (!navigator.geolocation) {
      setDetectStatus("Not supported on this device");
      return;
    }
    setDetecting(true);
    setDetectStatus("Detecting…");
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const area = await reverseGeocode(coords.latitude, coords.longitude);
          setDetectStatus(`Found: ${area}`);
          setTimeout(() => {
            onSelect(area);
            onClose();
          }, 500);
        } catch {
          setDetectStatus("Couldn't fetch — try manual");
        } finally {
          setDetecting(false);
        }
      },
      (err) => {
        setDetectStatus(
          err.code === err.PERMISSION_DENIED ? "Permission denied" : "Detection failed"
        );
        setDetecting(false);
      },
      { timeout: 8000, maximumAge: 5 * 60 * 1000 }
    );
  }, [onClose, onSelect]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-start sm:justify-start p-0 sm:p-4 sm:pt-[72px]"
      onMouseDown={onClose}
    >
      <div
        className={cn(
          "bg-background w-full sm:w-80 overflow-hidden",
          "rounded-t-2xl sm:rounded-2xl",
          "border border-border shadow-xl",
          "animate-in slide-in-from-bottom-4 sm:fade-in-0 duration-200"
        )}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Drag handle — mobile only */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-3 sm:pt-4 pb-0">
          <span className="text-sm font-bold text-foreground">Choose your location</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border px-4 mt-3">
          {(["detect", "manual"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "pb-2.5 px-4 text-sm font-semibold capitalize border-b-2 -mb-px transition-colors",
                tab === t
                  ? "border-[#7F77DD] text-[#7F77DD]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "detect" ? "Detect" : "Manual"}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col gap-3 pb-8 sm:pb-5">
          {tab === "detect" && (
            <button
              onClick={handleDetect}
              disabled={detecting}
              className="flex items-center gap-3 w-full p-3.5 border border-border rounded-xl hover:border-[#7F77DD] hover:bg-muted/40 transition-all text-left disabled:opacity-60"
            >
              <div className="h-10 w-10 rounded-full bg-[#EEEDFE] flex items-center justify-center shrink-0">
                <Crosshair
                  className={cn(
                    "h-4 w-4 text-[#7F77DD]",
                    detecting && "animate-spin"
                  )}
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Use my current location
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{detectStatus}</p>
              </div>
            </button>
          )}

          {tab === "manual" && (
            <>
              {[
                {
                  value: country,
                  onChange: (v: string) => {
                    setCountry(v);
                    setState("");
                    setCity("");
                  },
                  disabled: false,
                  placeholder: "Select country",
                  options: Object.keys(LOCATION_DATA),
                },
                {
                  value: state,
                  onChange: (v: string) => {
                    setState(v);
                    setCity("");
                  },
                  disabled: !country,
                  placeholder: "Select state",
                  options: states,
                },
                {
                  value: city,
                  onChange: (v: string) => setCity(v),
                  disabled: !state,
                  placeholder: "Select city / place",
                  options: cities,
                },
              ].map(({ value, onChange, disabled, placeholder, options }) => (
                <select
                  key={placeholder}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  disabled={disabled}
                  className="w-full h-11 rounded-xl border border-input bg-muted/50 px-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-[#7F77DD] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <option value="">{placeholder}</option>
                  {options.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              ))}

              <button
                onClick={() => {
                  if (city) {
                    onSelect(`${city}, ${state}`);
                    onClose();
                  }
                }}
                disabled={!city}
                className="w-full h-11 rounded-xl bg-[#7F77DD] hover:bg-[#534AB7] active:scale-[0.98] text-white text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed mt-1"
              >
                Apply location
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Bioluminescent Sell Button (desktop)
// ─────────────────────────────────────────────

function SellButton({
  onClick,
  compact = false,
}: {
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label="Start selling"
      className={cn(
        "relative flex items-center gap-1.5 overflow-hidden rounded-full",
        "font-bold tracking-tight transition-all",
        "text-white",
        "sell-bio-purple",
        compact ? "text-xs px-4 py-2" : "text-sm px-5 py-2.5"
      )}
      style={{
        background: "linear-gradient(135deg,#5046C8 0%,#9B94F0 50%,#3B2FA8 100%)",
      }}
    >
      {/* Radial top highlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 0%,rgba(159,148,255,0.6),transparent)",
        }}
      />
      <Plus
        className={cn(
          compact ? "h-3.5 w-3.5" : "h-4 w-4",
          "relative z-10 stroke-[3px]"
        )}
      />
      <span className="relative z-10">Sell</span>
    </button>
  );
}
// ─────────────────────────────────────────────
// Mobile Drawer
// ─────────────────────────────────────────────

function MobileDrawer({
  open,
  onClose,
  onSell,
  onLocation,
  locationLabel,
  user,
  onLogout,
}: {
  open: boolean;
  onClose: () => void;
  onSell: () => void;
  onLocation: () => void;
  locationLabel: string | null;
  user: unknown;
  onLogout: () => void;
}) {
  const router = useRouter();

  // Lock body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

 if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40 sm:hidden"
        onClick={onClose}
        aria-hidden
      />

      {/* Side Sheet — slides in from LEFT */}
      <div
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 sm:hidden",
          "w-[300px]",                          // ← fixed width, not full-width
          "bg-background border-r border-border shadow-2xl",
          "animate-in slide-in-from-left-4 duration-250",
          "flex flex-col"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-5 pb-3 border-b border-border shrink-0">
          <span className="text-2xl font-black text-[#7F77DD] tracking-tighter leading-none">
            zenda
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-1">

          {/* ── Sell CTA ── */}
          <button
            onClick={() => { onSell(); onClose(); }}
            className="relative flex items-center justify-center gap-2.5 w-full h-12 rounded-2xl overflow-hidden font-bold text-[15px] text-white sell-bio-purple mb-2 active:scale-[0.98] transition-transform"
            style={{
              background: "linear-gradient(135deg,#5046C8 0%,#9B94F0 50%,#3B2FA8 100%)",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 55% at 50% 0%,rgba(159,148,255,0.55),transparent)",
              }}
            />
            <Plus className="relative z-10 h-4 w-4 stroke-[3px]" />
            <span className="relative z-10 tracking-tight">Start selling on zenda</span>
          </button>

          {/* ── Location ── */}
          <button
            onClick={() => { onLocation(); onClose(); }}
            className="flex items-center gap-3 w-full px-3 py-3.5 rounded-xl hover:bg-muted/60 transition-colors text-left"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEEDFE]">
              <MapPin className="h-4 w-4 text-[#7F77DD]" />
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                Location
              </span>
              <span className="text-sm font-semibold text-foreground">
                {locationLabel ?? "Select location"}
              </span>
            </div>
            <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
          </button>

          <div className="h-px bg-border my-1" />

          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-3 pt-1 pb-0.5">
            Browse
          </p>
          <DrawerLink icon={<LayoutGrid />} label="All categories" onClick={() => { router.push("/categories"); onClose(); }} />
          <DrawerLink icon={<ShoppingCart />} label="My cart" badge={3} onClick={() => { router.push("/cart"); onClose(); }} />
          <DrawerLink icon={<Heart />} label="Saved items" onClick={() => { router.push("/saved"); onClose(); }} />

          <div className="h-px bg-border my-1" />

          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-3 pt-1 pb-0.5">
            Account
          </p>
          {user ? (
            <>
              <DrawerLink icon={<User />} label="Profile" onClick={() => { router.push("/profile"); onClose(); }} />
              <DrawerLink icon={<Settings />} label="Settings" onClick={() => { router.push("/settings"); onClose(); }} />
              <DrawerLink icon={<LogOut />} label="Log out" destructive onClick={() => { onLogout(); onClose(); }} />
            </>
          ) : (
            <DrawerLink icon={<User />} label="Login / Sign up" onClick={() => { router.push("/login"); onClose(); }} />
          )}
        </div>
      </div>
    </>
  );
}

function DrawerLink({
  icon,
  label,
  badge,
  destructive = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  badge?: number;
  destructive?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-colors text-left",
        destructive
          ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
          : "text-foreground hover:bg-muted/60"
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full",
          destructive ? "bg-red-50 dark:bg-red-950/40" : "bg-muted"
        )}
      >
        <span className={destructive ? "text-red-500" : "text-muted-foreground"}>
          {icon}
        </span>
      </span>
      <span className="text-sm font-semibold">{label}</span>
      {badge != null && (
        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-md bg-[#ff3269] px-1 text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────

export function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const [locationModal, setLocationModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [locationLabel, setLocationLabel] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Close drawer on desktop resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setDrawerOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* ════════════════════════════════════
          HEADER
      ════════════════════════════════════ */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 md:px-8">

          {/* ── Row 1: Logo · Location · Search · Actions ── */}
          <div className="flex h-14 md:h-[68px] items-center gap-2.5 md:gap-4">

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className={cn(
                "sm:hidden flex flex-col justify-center items-center gap-[5px]",
                "h-10 w-10 rounded-xl border border-border bg-transparent",
                "hover:bg-muted/60 transition-colors shrink-0"
              )}
            >
              <span className="block h-[1.5px] w-[18px] rounded-full bg-foreground" />
              <span className="block h-[1.5px] w-[14px] rounded-full bg-foreground" />
              <span className="block h-[1.5px] w-[18px] rounded-full bg-foreground" />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="text-2xl md:text-[28px] font-black text-[#7F77DD] tracking-tighter shrink-0 leading-none"
            >
              zenda
            </Link>

            {/* Location pill — matches search input height (h-10 / 40px) */}
            <button
              onClick={() => setLocationModal(true)}
              className={cn(
                "hidden sm:flex items-center gap-1.5",
                "h-10 px-3.5 rounded-full",
                "border border-border bg-muted/50",
                "hover:border-[#7F77DD] hover:bg-[#EEEDFE]/60",
                "transition-all shrink-0 group"
              )}
            >
              <MapPin className="h-3.5 w-3.5 text-[#7F77DD] shrink-0" />
              <span className="text-sm font-semibold text-foreground group-hover:text-[#7F77DD] transition-colors max-w-[130px] truncate">
                {locationLabel ?? "Select location"}
              </span>
              <ChevronDown className="h-3 w-3 text-[#7F77DD] shrink-0" />
            </button>

            {/* Desktop search — fills remaining space */}
            <div className="relative hidden md:flex flex-1 items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder='Search for "cheese slices"'
                className={cn(
                  "h-10 w-full rounded-full",
                  "border border-border bg-muted/50",
                  "pl-10 pr-4 text-sm text-foreground",
                  "outline-none focus:ring-2 focus:ring-[#7F77DD]/30 focus:border-[#7F77DD]",
                  "placeholder:text-muted-foreground transition-all"
                )}
              />
            </div>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-2 ml-auto sm:ml-0">

              {/* Sell — desktop only */}
              <div className="hidden sm:block">
                <SellButton onClick={() => router.push("/seller")} compact />
              </div>

              {/* Cart */}
              <Link
                href="/cart"
                aria-label="Cart"
                className={cn(
                  "relative flex items-center justify-center",
                  "h-10 w-10 rounded-full",
                  "text-foreground/70 hover:text-[#7F77DD]",
                  "hover:bg-[#EEEDFE]/60 transition-all"
                )}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-md bg-[#ff3269] text-[9px] font-bold text-white leading-none">
                  3
                </span>
              </Link>

              {/* Profile — desktop */}
              {user ? (
                <button
                  onClick={handleLogout}
                  aria-label="Log out"
                  className={cn(
                    "hidden sm:flex items-center justify-center",
                    "h-10 w-10 rounded-full",
                    "text-foreground/70 hover:text-[#7F77DD]",
                    "hover:bg-[#EEEDFE]/60 transition-all"
                  )}
                >
                  <User className="h-5 w-5" />
                </button>
              ) : (
                <Link
                  href="/login"
                  className={cn(
                    "hidden sm:flex items-center gap-1.5",
                    "h-10 px-3.5 rounded-full",
                    "border border-border",
                    "text-sm font-semibold text-foreground/70",
                    "hover:text-[#7F77DD] hover:border-[#7F77DD] hover:bg-[#EEEDFE]/60",
                    "transition-all"
                  )}
                >
                  <User className="h-4 w-4" />
                  Login
                </Link>
              )}

              <ThemeToggle />
            </div>
          </div>

          {/* ── Row 2: Mobile search + location ── */}
          <div className="md:hidden pb-2.5 flex items-center gap-2">

            {/* Mobile location pill — same height as search (h-10) */}
            <button
              onClick={() => setLocationModal(true)}
              className={cn(
                "flex items-center gap-1 shrink-0",
                "h-10 px-3 rounded-full",
                "border border-border bg-muted/50",
                "hover:border-[#7F77DD] transition-all"
              )}
            >
              <MapPin className="h-3.5 w-3.5 text-[#7F77DD] shrink-0" />
              <span className="text-xs font-semibold text-foreground max-w-[80px] truncate">
                {locationLabel ?? "Location"}
              </span>
              <ChevronDown className="h-3 w-3 text-[#7F77DD] shrink-0" />
            </button>

            {/* Mobile search */}
            <div className="relative flex flex-1 items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search products..."
                className={cn(
                  "h-10 w-full rounded-full",
                  "border border-border bg-muted/50",
                  "pl-10 pr-4 text-sm text-foreground",
                  "outline-none focus:ring-2 focus:ring-[#7F77DD]/30 focus:border-[#7F77DD]",
                  "placeholder:text-muted-foreground transition-all"
                )}
              />
            </div>
          </div>

        </div>
      </header>

      {/* ════════════════════════════════════
          LOCATION MODAL
      ════════════════════════════════════ */}
      {locationModal && (
        <LocationModal
          onClose={() => setLocationModal(false)}
          onSelect={(label) => setLocationLabel(label)}
        />
      )}

      {/* ════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════ */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSell={() => router.push("/seller")}
        onLocation={() => setLocationModal(true)}
        locationLabel={locationLabel}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
}
