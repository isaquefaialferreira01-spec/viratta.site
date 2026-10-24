import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Text filled with a slowly flowing gradient. Use it on one or two words, not whole paragraphs. */
export function GradientText({ children, className, colors = ["#22d3ee", "#a78bfa", "#f472b6", "#22d3ee"] }: { children: ReactNode; className?: string; colors?: string[] }) {
  return (
    <span className={cn("inline-block bg-clip-text text-transparent [background-size:300%_100%] motion-safe:animate-[gradient-flow_6s_ease-in-out_infinite]", className)} style={{ backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})` }}>
      <style>{`@keyframes gradient-flow{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}`}</style>
      {children}
    </span>
  );
}
