import React from 'react';
import { useCms } from '../context/CmsContext';

interface InfiniteMarqueeProps {
  variant?: 'orange' | 'dark';
  reverse?: boolean;
}

const SERVICES_WORDS = [
  "ESTRATÉGIA",
  "IDENTIDADE",
  "CONTEÚDO",
  "SOCIAL MEDIA",
  "FILMMAKER",
  "DESIGN",
  "POSICIONAMENTO",
  "CRIATIVIDADE",
];

const MANTRA_WORDS = [
  "SEJA VISTO",
  "SEJA LEMBRADO",
  "COMUNIQUE VALOR",
  "VIRE A CHAVE",
];

export const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  variant = 'orange',
  reverse = false,
}) => {
  const { content } = useCms();
  const isOrange = variant === 'orange';

  let words = isOrange ? SERVICES_WORDS : MANTRA_WORDS;

  if (isOrange && content?.marquee_items?.length) {
    const active = content.marquee_items.filter((i) => i.is_active).map((i) => i.text);
    if (active.length > 0) words = active;
  } else if (!isOrange && content?.marquee_mantra_items?.length) {
    const active = content.marquee_mantra_items.filter((i) => i.is_active).map((i) => i.text);
    if (active.length > 0) words = active;
  }

  // Render a single repeated unit
  const renderItemUnit = (keyPrefix: string, isAriaHidden = false) => (
    <div key={keyPrefix} aria-hidden={isAriaHidden} className="flex items-center shrink-0">
      {words.map((word, idx) => (
        <React.Fragment key={`${keyPrefix}-${idx}`}>
          <span
            className={`font-black uppercase tracking-tight sm:tracking-wider whitespace-nowrap select-none px-4 sm:px-8 transition-colors ${
              isOrange
                ? 'text-[#070708] text-lg sm:text-2xl md:text-3xl lg:text-4xl'
                : 'text-white text-base sm:text-xl md:text-2xl lg:text-3xl hover:text-[#FF5E14]'
            }`}
          >
            {word}
          </span>
          <span
            className={`text-xs sm:text-sm md:text-base select-none shrink-0 ${
              isOrange ? 'text-[#070708]/80' : 'text-[#FF5E14]'
            }`}
            aria-hidden="true"
          >
            ◆
          </span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <aside
      aria-label={isOrange ? "Frentes criativas Viratta" : "Pilares de posicionamento"}
      className={`relative w-full overflow-hidden select-none py-3.5 sm:py-5 transition-colors z-20 ${
        isOrange
          ? 'bg-[#FF5E14] text-[#070708] shadow-[0_10px_35px_rgba(255,94,20,0.25)]'
          : 'bg-[#0A0A0C] border-y border-white/10 text-white'
      }`}
    >
      <div
        className={`${
          reverse ? 'marquee-track-reverse' : 'marquee-track-smooth'
        } flex items-center cursor-default`}
      >
        {/* First occurrence is accessible; subsequent duplicate loops are aria-hidden */}
        {renderItemUnit('set-1', false)}
        {renderItemUnit('set-2', true)}
        {renderItemUnit('set-3', true)}
        {renderItemUnit('set-4', true)}
      </div>
    </aside>
  );
};
