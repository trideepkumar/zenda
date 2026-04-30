"use client";

import { useProgress } from "@/lib/progress-context";

export function TopProgressLoader() {
  const { progress, visible } = useProgress();

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: "3px",
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 300ms ease",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
          transition:
            progress === 100
              ? "width 200ms ease-out"   // snap to end fast
              : "width 100ms linear",    // trickle smoothly
          boxShadow: "0 0 10px rgba(168, 85, 247, 0.7)",
          borderRadius: "0 2px 2px 0",
        }}
      />
      {/* Glint shimmer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100px",
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
          animation: visible ? "shimmer 1s ease-in-out infinite" : "none",
        }}
      />
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(100px); opacity: 0; }
          50%  { opacity: 1; }
          100% { transform: translateX(-200px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}