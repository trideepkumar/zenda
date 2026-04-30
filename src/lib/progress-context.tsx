"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";

interface ProgressContextValue {
  start: () => void;
  done: () => void;
  progress: number;
  visible: boolean;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const start = useCallback(() => {
     console.log("▶ progress start");
    clear();
    setProgress(0);
    setVisible(true);

    // Trickle up to ~85% — never completes on its own
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 85) {
          clearInterval(intervalRef.current!);
          return p;
        }
        // Slows down as it approaches 85
        const increment = (85 - p) * 0.08;
        return p + Math.max(increment, 0.5);
      });
    }, 100);
  }, []);

  const done = useCallback(() => {
    clear();
    setProgress(100);

    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 400); // fade-out delay
  }, []);

  return (
    <ProgressContext.Provider value={{ start, done, progress, visible }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}