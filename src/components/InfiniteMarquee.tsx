import React from 'react';

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
  const words = variant === 'orange' ? SERVICES_WORDS : MANTRA_WORDS;
  const isOrange = variant === 'orange';

  // Render a single repeated unit
  const renderItemUnit = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex items-center shrink-0">
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
        {/* Quadrupled sequence for seamless mathematical loop across any screen size */}
        {renderItemUnit('set-1')}
        {renderItemUnit('set-2')}
        {renderItemUnit('set-3')}
        {renderItemUnit('set-4')}
      </div>
    </aside>
  );
};
