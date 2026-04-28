"use client";

import { Navbar } from "@/components/shared/Navbar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function NavbarWrapper() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
   <header className="fixed top-0 left-0 w-full z-50 bg-background border-b">
  <Navbar />

  <div
    className={`absolute bottom-0 left-0 h-[2px] bg-violet-500 transition-all duration-500 ease-out ${
      loading ? "w-full opacity-100" : "w-0 opacity-0"
    }`}
  />
</header>
  );
}