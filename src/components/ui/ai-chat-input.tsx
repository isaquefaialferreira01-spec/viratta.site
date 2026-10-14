import { useEffect, useRef, useState } from "react";
import { ArrowUp, Paperclip, Square } from "lucide-react";
import { cn } from "@/lib/utils";

/** Chat box in the style of modern AI apps: auto-growing text, suggestions, attach and send/stop states. */
export function AiChatInput({
  onSend,
  suggestions = [],
  busy = false,
  onStop,
  placeholder = "Pergunte qualquer coisa",
  className,
}: {
  onSend: (text: string) => void;
  suggestions?: string[];
  busy?: boolean;
  onStop?: () => void;
  placeholder?: string;
  className?: string;
}) {
  const [text, setText] = useState("");
  const area = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = area.current!;
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [text]);

  function send() {
    const t = text.trim();
    if (!t || busy) return;
    onSend(t);
    setText("");
  }

  return (
    <div className={cn("w-full max-w-2xl", className)}>
      {/* Main Input Bar - Black background with white text */}
      <div className="rounded-3xl border border-white/15 bg-black p-3.5 shadow-2xl transition-all focus-within:border-[#FF5E14]/70 focus-within:ring-1 focus-within:ring-[#FF5E14]/40">
        <textarea
          ref={area}
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder={placeholder}
          className="block w-full resize-none bg-transparent px-2.5 py-1.5 text-[15px] sm:text-base text-white outline-none placeholder:text-neutral-400 font-normal leading-relaxed"
        />
        <div className="mt-2.5 flex items-center gap-2">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Anexar arquivo"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <span className="ml-auto text-xs text-neutral-400 hidden xs:inline">
            Enter envia · Shift+Enter quebra linha
          </span>
          {busy ? (
            <button
              type="button"
              onClick={onStop}
              className="grid h-9 w-9 place-items-center rounded-full bg-white text-black hover:bg-neutral-200 transition-colors"
              aria-label="Parar"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
            </button>
          ) : (
            <button
              type="button"
              onClick={send}
              disabled={!text.trim()}
              className="grid h-9 w-9 place-items-center rounded-full bg-[#FF5E14] text-white hover:bg-[#E04E0B] transition-all disabled:opacity-30 disabled:hover:bg-[#FF5E14]"
              aria-label="Enviar"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Suggestion Abas / Tabs - Black background with white text */}
      {suggestions.length > 0 && (
        <div className="mt-3.5 flex flex-wrap justify-center gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setText(s)}
              className="rounded-full border border-white/20 bg-black px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white hover:border-[#FF5E14] hover:text-[#FF5E14] hover:bg-neutral-950 transition-all active:scale-95 shadow-sm cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
