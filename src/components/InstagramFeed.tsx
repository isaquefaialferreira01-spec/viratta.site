import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SITE_CONFIG } from '../config/siteConfig';
import { useCms } from '../context/CmsContext';
import { Instagram, ArrowUpRight, Play, Film } from 'lucide-react';
import { VirattaSymbol } from './brand/VirattaSymbol';
import { DEFAULT_REELS } from '../lib/cmsDefaults';
import { ReelItem } from '../types/cms';

export const InstagramFeed: React.FC = () => {
  const { content } = useCms();
  const copy = content?.copy || ({} as any);
  const instagramUrl = content?.social?.instagram?.url || SITE_CONFIG.instagramUrl;

  const kicker = copy.instagram_kicker || "Bastidores & Conteúdo";
  const headline = copy.instagram_headline || "A VIRATTA ACONTECE POR AQUI.";
  const buttonText = copy.instagram_button_text || "Seguir @viratta.marketing";

  // Active items from CMS or fallback to real default posts
  const rawList = (content?.reels && content.reels.length > 0) ? content.reels : DEFAULT_REELS;
  const activeItems: ReelItem[] = rawList
    .filter((r) => r.is_active !== false)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  // Track failed images to show graceful VIRATTA fallback placeholder
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Dynamic responsive grid: 3 items are cleanly centered; 4+ span across the full 4 columns
  const gridLayoutClass = activeItems.length === 3
    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto gap-4 sm:gap-6"
    : activeItems.length <= 2
    ? "grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-4 sm:gap-6"
    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6";

  return (
    <section 
      data-section-title="Instagram Feed"
      className="relative py-16 sm:py-24 lg:py-32 bg-[#070708] border-b border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 pb-6 border-b border-white/10"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Instagram className="w-4 h-4 text-[#FF5E14]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#FF5E14]">
                {kicker}
              </span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-black text-white tracking-tight leading-none whitespace-pre-line">
              {headline}
            </h2>
          </div>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-white hover:text-[#FF5E14] transition-colors py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 self-start sm:self-auto active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
            aria-label="Abrir perfil oficial da VIRATTA no Instagram (@viratta.marketing) em nova aba"
          >
            <span>{buttonText}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Real Instagram Content Grid */}
        <div className={gridLayoutClass}>
          {activeItems.map((item, idx) => {
            const targetUrl = item.instagram_url || item.url || instagramUrl;
            
            // Guarantee fallback to matching real post cover if cover_image was empty in cached state
            const defaultMatch = DEFAULT_REELS.find(
              (d) => d.id === item.id || (d.instagram_url && (d.instagram_url === item.instagram_url || d.instagram_url === item.url))
            );
            const coverImage = item.cover_image || item.image || defaultMatch?.cover_image || '';
            const isReel = (item.type || '').toLowerCase() === 'reel';
            const hasValidImage = Boolean(coverImage && !imageErrors[item.id]);

            return (
              <motion.a
                key={item.id || idx}
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir no Instagram: ${item.title || 'Publicação VIRATTA'} (abre em nova aba)`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-[#0E0F12] border border-white/10 hover:border-[#FF5E14]/50 transition-all duration-300 flex flex-col justify-between p-4 sm:p-5 shadow-xl active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
              >
                {/* Visual Cover Layer: Real Post Image */}
                {hasValidImage ? (
                  <>
                    <img
                      src={coverImage}
                      alt={item.title || 'Capa da publicação oficial VIRATTA'}
                      onError={() => handleImageError(item.id)}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/20 group-hover:via-black/20 transition-all pointer-events-none" />
                  </>
                ) : (
                  /* Elegant VIRATTA Branded Fallback Placeholder */
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#131418] via-[#0E0F12] to-[#070708] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
                    {/* Ambient subtle backlight glow */}
                    <div 
                      aria-hidden="true" 
                      className="absolute w-32 h-32 bg-[#FF5E14]/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" 
                    />

                    {/* Official Viratta Symbol */}
                    <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                      <VirattaSymbol className="w-12 h-12 sm:w-14 sm:h-14 opacity-80 group-hover:opacity-100" glow />
                    </div>

                    <div className="relative z-10 mt-4 text-[11px] font-mono uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">
                      @viratta.marketing
                    </div>
                    <div className="relative z-10 mt-1 text-[10px] text-neutral-400 group-hover:text-[#FF5E14] transition-colors inline-flex items-center gap-1 font-semibold">
                      <span>Ver no Instagram</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}

                {/* Top Badge: Type Indicator (Post vs Reels) — No Fictitious Metrics */}
                <div className="relative z-10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-white/90">
                  <span className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 shadow-sm">
                    {isReel ? (
                      <>
                        <Film className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FF5E14]" />
                        <span>Reels</span>
                      </>
                    ) : (
                      <>
                        <Instagram className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FF5E14]" />
                        <span>Post</span>
                      </>
                    )}
                  </span>
                  
                  {/* External icon micro-indicator on hover */}
                  <span className="w-6 h-6 rounded-md bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-[#FF5E14] transition-all">
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                {/* Center Play Icon for Reels Only (Posts DO NOT show play icon) */}
                {isReel && (
                  <div className="relative z-10 my-auto flex justify-center">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#FF5E14] group-hover:border-transparent transition-all shadow-xl">
                      <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Bottom Caption (Real title without fake numbers) */}
                <div className="relative z-10 mt-auto pt-4">
                  {item.title && (
                    <p className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 drop-shadow-md">
                      {item.title}
                    </p>
                  )}
                  <span className="block mt-1 text-[10px] sm:text-[11px] font-mono text-neutral-300 group-hover:text-[#FF5E14] transition-colors">
                    instagram.com/p/...
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
