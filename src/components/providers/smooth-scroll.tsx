"use client";

import { useEffect, type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    let rafId: number;
    let lenis: any;

    const init = async () => {
      const Lenis = (await import("lenis")).default;

      lenis = new Lenis({
        // No fixed duration — scroll speed is now purely velocity-driven
        lerp: 0.1,           // lower = more lag (smoother); higher = snappier
        smoothWheel: true,
        wheelMultiplier: 1.0, // 1.0 = natural 1:1 feel, increase for faster scroll
        touchMultiplier: 1.5, // slightly faster on touch
        infinite: false,
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
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}

// "use client";

// import { useEffect, type ReactNode } from "react";

// export function SmoothScroll({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   useEffect(() => {
//     let rafId: number;
//     let lenis: any;

//     const init = async () => {
//       const Lenis = (await import("lenis")).default;

//       lenis = new Lenis({
//         duration: 1.2,
//         easing: (t: number) => 1 - Math.pow(1 - t, 4),
//         smoothWheel: true,
//         wheelMultiplier: 0.8,
//       });

//       const raf = (time: number) => {
//         lenis.raf(time);
//         rafId = requestAnimationFrame(raf);
//       };

//       rafId = requestAnimationFrame(raf);
//     };

//     init();

//     return () => {
//       cancelAnimationFrame(rafId);

//       if (lenis) {
//         lenis.destroy();
//       }
//     };
//   }, []);

//   return <>{children}</>;
// }