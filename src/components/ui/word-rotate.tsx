import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Swaps words in place with a vertical slide and blur, keeping the line steady. */
export function WordRotate({ words, className, intervalMs = 2200 }: { words: string[]; className?: string; intervalMs?: number }) {
  const [index, setIndex] = useState(0);
  useEffect(() => { const t = setInterval(() => setIndex(i => (i + 1) % words.length), intervalMs); return () => clearInterval(t); }, [words.length, intervalMs]);
  return (
    <span className={cn("relative inline-grid overflow-hidden align-bottom", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
