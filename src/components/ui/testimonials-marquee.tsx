import { cn } from "@/lib/utils";

export interface Testimonial { name: string; role: string; text: string; avatar?: string }

function Row({ items, reverse }: { items: Testimonial[]; reverse?: boolean }) {
  const list = (hidden = false) => (
    <div aria-hidden={hidden} className={cn("flex shrink-0 gap-4 pr-4 motion-safe:animate-[quote-slide_45s_linear_infinite] group-hover:[animation-play-state:paused]", reverse && "[animation-direction:reverse]")}>
      {items.map(t => (
        <figure key={t.name} className="w-72 sm:w-80 shrink-0 rounded-2xl border border-white/10 bg-[#0E0F12] p-5 shadow-sm">
          <blockquote className="text-sm leading-relaxed text-neutral-300">“{t.text}”</blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            {t.avatar ? <img src={t.avatar} alt="" className="h-9 w-9 rounded-full object-cover" /> : <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1A1B20] text-xs font-semibold text-[#FF5E14] border border-[#FF5E14]/30">{t.name.split(" ").map(p => p[0]).slice(0, 2).join("")}</span>}
            <div><div className="text-sm font-semibold text-white">{t.name}</div><div className="text-xs text-neutral-400">{t.role}</div></div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
  return <div className="group flex overflow-hidden">{list()}{list(true)}</div>;
}

/** Two rows of testimonials sliding in opposite directions, with faded edges. */
export function TestimonialsMarquee({ items, className }: { items: Testimonial[]; className?: string }) {
  const half = Math.ceil(items.length / 2);
  return (
    <div className={cn("grid gap-4 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]", className)}>
      <style>{`@keyframes quote-slide{to{transform:translateX(-100%)}}`}</style>
      <Row items={items.slice(0, half)} />
      <Row items={items.slice(half)} reverse />
    </div>
  );
}
