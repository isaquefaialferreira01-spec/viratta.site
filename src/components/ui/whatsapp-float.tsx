import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Floating WhatsApp button with a greeting bubble that shows up after a few seconds. */
export function WhatsappFloat({ phone, message = "Olá! Vim pelo site.", greeting = "Oi! Posso te ajudar?", delayMs = 4000, className }: { phone: string; message?: string; greeting?: string; delayMs?: number; className?: string }) {
  const [bubble, setBubble] = useState(false);
  useEffect(() => { const t = setTimeout(() => setBubble(true), delayMs); return () => clearTimeout(t); }, [delayMs]);
  const digits = phone.replace(/\D/g, "");
  const href = `https://wa.me/${digits.length <= 11 ? `55${digits}` : digits}?text=${encodeURIComponent(message)}`;
  return (
    <div className={cn("fixed bottom-5 right-5 z-50 flex items-end gap-3", className)}>
      {bubble && (
        <div className="relative mb-2 max-w-[220px] rounded-2xl rounded-br-sm bg-white px-4 py-3 text-sm text-zinc-800 shadow-xl animate-in fade-in slide-in-from-bottom-2">
          {greeting}
          <button type="button" onClick={() => setBubble(false)} aria-label="Fechar" className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-zinc-200 text-zinc-600"><X className="h-3 w-3" /></button>
        </div>
      )}
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Conversar no WhatsApp" className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105">
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <MessageCircle className="relative h-7 w-7" />
      </a>
    </div>
  );
}
