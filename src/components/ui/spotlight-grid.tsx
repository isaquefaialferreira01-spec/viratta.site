import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Fine grid lines revealed by a soft light that follows the cursor. */
export function SpotlightGrid({ children, className }: { children?: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  function move(e: React.PointerEvent) {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
  }
  return (
    <div ref={ref} onPointerMove={move} className={cn("group relative isolate flex min-h-[520px] w-full items-center justify-center overflow-hidden bg-zinc-950 text-white [--x:50%] [--y:40%]", className)}>
      <div aria-hidden className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(#ffffff14_1px,transparent_1px),linear-gradient(90deg,#ffffff14_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 [background-image:linear-gradient(#ffffff40_1px,transparent_1px),linear-gradient(90deg,#ffffff40_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(260px_circle_at_var(--x)_var(--y),black,transparent)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(500px_circle_at_var(--x)_var(--y),rgba(99,102,241,0.18),transparent_60%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}
