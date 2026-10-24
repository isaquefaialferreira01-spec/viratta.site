import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Button with a conic gradient spinning around its border. */
export function GradientBorderButton({ className, children, colors = "#f97316,#eab308,#22c55e,#06b6d4,#f97316", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { colors?: string }) {
  return (
    <button {...props} className={cn("group relative inline-flex overflow-hidden rounded-full p-[1.5px] font-semibold", className)}>
      <style>{`@keyframes gbb-spin{to{transform:rotate(360deg)}}`}</style>
      <span aria-hidden className="absolute inset-[-100%] [animation:gbb-spin_3s_linear_infinite]" style={{ background: `conic-gradient(from 0deg, ${colors})` }} />
      <span className="relative rounded-full bg-zinc-950 px-6 py-3 text-white transition-colors group-hover:bg-zinc-900">{children}</span>
    </button>
  );
}
