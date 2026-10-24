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
        <label htmlFor="business-needs-textarea" className="sr-only">
          {placeholder}
        </label>
        <textarea
          id="business-needs-textarea"
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
          aria-label={placeholder}
          className="block w-full resize-none bg-transparent px-2.5 py-1.5 text-[15px] sm:text-base text-white outline-none placeholder:text-neutral-400 font-normal leading-relaxed"
        />
        <div className="mt-2.5 flex items-center justify-between gap-2">
          <button
            type="button"
            className="grid min-h-[44px] min-w-[44px] place-items-center rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
            aria-label="Anexar arquivo de referência"
          >
            <Paperclip className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="mx-auto text-xs text-neutral-400 hidden xs:inline" aria-hidden="true">
            Enter envia · Shift+Enter quebra linha
          </span>
          {busy ? (
            <button
              type="button"
              onClick={onStop}
              className="grid min-h-[44px] min-w-[44px] place-items-center rounded-full bg-white text-black hover:bg-neutral-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
              aria-label="Parar análise"
            >
              <Square className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={send}
              disabled={!text.trim()}
              className="grid min-h-[44px] min-w-[44px] place-items-center rounded-full bg-[#FF5E14] text-white hover:bg-[#E04E0B] transition-all disabled:opacity-30 disabled:hover:bg-[#FF5E14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Enviar mensagem para diagnóstico"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
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
              className="rounded-full border border-white/20 bg-black px-4 py-2.5 min-h-[44px] inline-flex items-center justify-center text-xs sm:text-sm font-medium text-white hover:border-[#FF5E14] hover:text-[#FF5E14] hover:bg-neutral-950 transition-all active:scale-95 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
