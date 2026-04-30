"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useProgress } from "@/lib/progress-context";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { start, done } = useProgress();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the very first mount — page is already loaded
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    done();
  }, [pathname, searchParams]);

  return null;
}