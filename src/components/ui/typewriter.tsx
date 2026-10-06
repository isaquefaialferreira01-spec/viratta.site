import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Types each phrase, pauses, erases and moves to the next, with a blinking caret. */
export function Typewriter({ words, className, typeMs = 70, holdMs = 1600 }: { words: string[]; className?: string; typeMs?: number; holdMs?: number }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [erasing, setErasing] = useState(false);
  useEffect(() => {
    const word = words[index % words.length];
    if (!erasing && text === word) { const t = setTimeout(() => setErasing(true), holdMs); return () => clearTimeout(t); }
    if (erasing && text === "") { setErasing(false); setIndex(i => i + 1); return; }
    const t = setTimeout(() => setText(erasing ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)), erasing ? typeMs / 2 : typeMs);
    return () => clearTimeout(t);
  }, [text, erasing, index, words, typeMs, holdMs]);
  return (
    <span className={cn("whitespace-nowrap", className)} aria-label={words.join(", ")}>
      <style>{`@keyframes caret{50%{opacity:0}}`}</style>
      <span aria-hidden>{text}</span>
      <span aria-hidden className="ml-0.5 inline-block w-[3px] translate-y-[0.1em] bg-current [height:0.95em] animate-[caret_1s_steps(1)_infinite]" />
    </span>
  );
}
