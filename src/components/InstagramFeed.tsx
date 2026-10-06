import React from 'react';
import { motion } from 'motion/react';
import { SITE_CONFIG } from '../config/siteConfig';
import { Instagram, ArrowUpRight, Play, Film } from 'lucide-react';

const REELS_PREVIEWS = [
  {
    title: "Como gravar vídeos com celular sem parecer caseiro",
    views: "14.2k",
    type: "Reels",
    image: "/src/assets/images/viratta_audiovisual_studio_1791218069074.jpg",
  },
  {
    title: "Antes e Depois: A identidade de um bistrô local",
    views: "28.6k",
    type: "Reels",
    image: "/src/assets/images/portfolio_gastronomy_1791218028786.jpg",
  },
  {
    title: "Por que seu cliente pede desconto e como resolver",
    views: "19.8k",
    type: "Reels",
    image: "/src/assets/images/portfolio_clinic_1791218038116.jpg",
  },
  {
    title: "Bastidores de captação cinematográfica na oficina",
    views: "22.4k",
    type: "Reels",
    image: "/src/assets/images/portfolio_automotive_1791218057376.jpg",
  },
];

export const InstagramFeed: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-[#070708] border-b border-white/5 overflow-hidden">
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
                Bastidores & Conteúdo
              </span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-black text-white tracking-tight leading-none">
              A VIRATTA <br />
              <span className="text-neutral-400">ACONTECE POR AQUI.</span>
            </h2>
          </div>

          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-white hover:text-[#FF5E14] transition-colors py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 self-start sm:self-auto active:scale-95"
          >
            <span>Seguir {SITE_CONFIG.instagramHandle}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Reels Previews Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {REELS_PREVIEWS.map((reel, idx) => (
            <motion.a
              key={idx}
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden bg-[#0E0F12] border border-white/10 hover:border-[#FF5E14]/50 transition-all duration-300 flex flex-col justify-between p-3 sm:p-4 shadow-lg active:scale-[0.98]"
            >
              {/* Cover Image */}
              <img
                src={reel.image}
                alt={reel.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 group-hover:via-black/20 transition-all" />

              {/* Top Tag & Views */}
              <div className="relative z-10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-white/90">
                <span className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md">
                  <Film className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FF5E14]" />
                  <span>{reel.type}</span>
                </span>
                <span className="text-white/70">{reel.views}</span>
              </div>

              {/* Center Play Icon */}
              <div className="relative z-10 my-auto flex justify-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#FF5E14] group-hover:border-transparent transition-all">
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="relative z-10">
                <p className="text-[11px] sm:text-xs md:text-sm font-semibold text-white leading-snug line-clamp-2">
                  {reel.title}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};
