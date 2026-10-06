import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Counts up to `value` when it scrolls into view, with an ease-out finish. */
export function NumberTicker({ value, className, durationMs = 1800, prefix = "", suffix = "", decimals = 0 }: { value: number; className?: string; durationMs?: number; prefix?: string; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const el = ref.current!;
    let frame = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / durationMs);
        setShown(value * (1 - Math.pow(1 - p, 4)));
        if (p < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); };
  }, [value, durationMs]);
  return <span ref={ref} className={cn("tabular-nums", className)}>{prefix}{shown.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
}
