"use client";

import { useEffect, type ReactNode } from "react";

export function SmoothScroll({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    let rafId: number;
    let lenis: any;

    const init = async () => {
      const Lenis = (await import("lenis")).default;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        wheelMultiplier: 0.8,
      });

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    };

    init();

    return () => {
      cancelAnimationFrame(rafId);

      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}