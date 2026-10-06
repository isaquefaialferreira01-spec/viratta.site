import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { PORTFOLIO_PROJECTS, getWhatsAppUrl } from '../config/siteConfig';
import { ArrowUpRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

const clientMonograms: Record<string, string> = {
  "atelier-gastronomico": "CB",
  "clinica-lumine": "CL",
  "iron-performance": "IB",
  "officina-motors": "OS",
};

const deliverablesByProject: Record<string, string[]> = {
  "atelier-gastronomico": ["Filmmaker Gastronômico", "Redefinição de Identidade", "Narrativa de Cardápio"],
  "clinica-lumine": ["Captação Cinematográfica", "Posicionamento de Autoridade", "Social Media Premium"],
  "iron-performance": ["Rebranding & Comunidade", "Filmmaker High-Contrast", "Direção de Arte"],
  "officina-motors": ["Direção de Fotografia", "Identidade Técnica", "Vídeos de Processo"],
};

interface CardLayerProps {
  project: typeof PORTFOLIO_PROJECTS[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
  onSelectProject: (p: typeof PORTFOLIO_PROJECTS[0]) => void;
}

const CardLayer: React.FC<CardLayerProps> = ({
  project,
  index,
  total,
  progress,
  onSelectProject,
}) => {
  const formattedIndex = String(index + 1).padStart(2, '0');
  const totalFormatted = String(total).padStart(2, '0');
  const deliverables = deliverablesByProject[project.id] || ["Estratégia", "Identidade", "Conteúdo"];

  // Total transitions = total - 1 (Card 0 is in place; Cards 1, 2, 3 rise one by one)
  const numTransitions = Math.max(1, total - 1);
  const usableProgress = 0.90; // Final 10% of scroll allows comfortable viewing of the completed stack

  // Start and end progress values for this card's upward arrival:
  const cardStart = index === 0 ? 0 : ((index - 1) / numTransitions) * usableProgress + 0.02;
  const cardEnd = index === 0 ? 0 : (index / numTransitions) * usableProgress;

  // Physical upward entry translation from below viewport (100vh) up to 0vh:
  const yEnter = useTransform(
    progress,
    index === 0 ? [0, 1] : [cardStart, cardEnd],
    index === 0 ? ['0vh', '0vh'] : ['100vh', '0vh']
  );

  // Scale depth: each time a subsequent card arrives, this card recedes slightly (0.98, 0.96, 0.94)
  const scaleKeyframes: number[] = [0];
  const scaleValues: number[] = [1];
  const brightnessValues: number[] = [1];

  for (let j = index + 1; j < total; j++) {
    const nextStart = ((j - 1) / numTransitions) * usableProgress + 0.02;
    const nextEnd = (j / numTransitions) * usableProgress;
    scaleKeyframes.push(nextStart, nextEnd);
    const depthStep = j - index;
    const currentScale = Math.max(0.92, 1 - depthStep * 0.02);
    const currentBrightness = Math.max(0.85, 1 - depthStep * 0.04);
    scaleValues.push(scaleValues[scaleValues.length - 1], currentScale);
    brightnessValues.push(brightnessValues[brightnessValues.length - 1], currentBrightness);
  }

  // Final point
  scaleKeyframes.push(1);
  scaleValues.push(scaleValues[scaleValues.length - 1]);
  brightnessValues.push(brightnessValues[brightnessValues.length - 1]);

  const scale = useTransform(progress, scaleKeyframes, scaleValues);
  const brightness = useTransform(progress, scaleKeyframes, brightnessValues);

  return (
    <motion.div
      style={{
        y: yEnter,
        scale,
        filter: useTransform(brightness, (b) => `brightness(${b})`),
        transformOrigin: 'top center',
        zIndex: (index + 1) * 10,
        ['--card-index' as string]: index,
      }}
      className="portfolio-stacked-card absolute inset-x-0 w-full max-w-full"
    >
      {/* Physical Portfolio Card Sheet */}
      <article
        className="portfolio-card-sheet group relative w-full max-w-full rounded-2xl sm:rounded-3xl bg-[#0E0F12] border border-white/10 hover:border-[#FF5E14]/40 transition-colors duration-300 shadow-[0_-20px_45px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col justify-between"
        style={{
          height: 'clamp(430px, calc(100dvh - 200px), 620px)',
        }}
      >
        {/* Card Header Tab Strip: 01 / 04, Monogram Logo, Client Name, Category */}
        <header className="px-3.5 py-2.5 sm:px-7 sm:py-3.5 border-b border-white/5 flex items-center justify-between gap-2.5 bg-[#0A0A0C]/95 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Editorial Project Number */}
            <span className="font-mono text-xs sm:text-sm font-bold text-[#FF5E14] tracking-wider tabular-nums">
              {formattedIndex} / {totalFormatted}
            </span>

            <span className="w-px h-3.5 bg-white/10 hidden sm:inline" />

            {/* Client Logo Monogram Badge */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-[10px] sm:text-xs font-bold flex items-center justify-center shrink-0">
                {clientMonograms[project.id] || "V"}
              </span>
              <h3 className="text-xs sm:text-base md:text-lg font-extrabold text-white tracking-tight truncate max-w-[160px] xs:max-w-[220px] sm:max-w-none">
                {project.client}
              </h3>
            </div>
          </div>

          {/* Category / Industry Tag */}
          <div className="shrink-0">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-white/[0.03] border border-white/5 hidden xs:inline-block">
              {project.industry}
            </span>
          </div>
        </header>

        {/* Card Main Body: Protagonist Project Visual & Editorial Case Info */}
        <div className="portfolio-card-body grid grid-cols-1 lg:grid-cols-12 flex-1 p-3.5 sm:p-5 lg:p-7 gap-3.5 sm:gap-5 lg:gap-7 items-center overflow-hidden">
          
          {/* The Protagonist Project Visual */}
          <div className="portfolio-card-image lg:col-span-7 w-full h-[175px] xs:h-[200px] sm:h-[250px] lg:h-full relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 group-hover:border-white/20 transition-all shrink-0">
            <img
              src={project.image}
              alt={`Case ${project.client}`}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80" />

            {/* Floating Service Badge */}
            <div className="absolute bottom-2.5 left-2.5 sm:bottom-3.5 sm:left-3.5 z-10">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white px-2 sm:px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10">
                {project.service}
              </span>
            </div>
          </div>

          {/* Case Overview & Value Proposition */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full py-0.5 overflow-hidden">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#FF5E14] font-semibold mb-0.5 hidden sm:block">
                {project.industry}
              </div>

              <h4 className="text-base sm:text-xl lg:text-2xl font-extrabold text-white tracking-tight leading-snug truncate">
                {project.client}
              </h4>

              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed line-clamp-2 sm:line-clamp-3">
                {project.description}
              </p>

              {/* Deliverables Pills */}
              <div className="mt-2.5 sm:mt-3 flex flex-wrap gap-1.5 hidden xs:flex">
                {deliverables.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-[10px] sm:text-[11px] font-medium text-neutral-300"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#FF5E14]" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>

              {/* Impact on Perception Quote */}
              <div className="mt-2.5 sm:mt-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF5E14] shrink-0 mt-0.5" />
                  <p className="text-[10px] sm:text-xs text-neutral-300 font-medium leading-relaxed line-clamp-2">
                    <span className="text-[#FFA05C] font-semibold">Impacto:</span> {project.outcome}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-white/5 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onSelectProject(project)}
                className="min-h-[40px] inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-white hover:text-[#FF5E14] transition-colors py-1.5"
              >
                <span>Ver Case</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={getWhatsAppUrl(`Olá! Vi o case do ${project.client} no site e quero um resultado semelhante para minha empresa.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[40px] inline-flex items-center justify-center px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white bg-[#FF5E14] hover:bg-[#E04E0B] shadow-sm transition-all active:scale-95"
              >
                Quero Algo Assim
              </a>
            </div>
          </div>

        </div>
      </article>
    </motion.div>
  );
};

export const PortfolioShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof PORTFOLIO_PROJECTS[0] | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const totalProjects = PORTFOLIO_PROJECTS.length;

  // Track scroll progress across the exact scroll distance of the outer container
  // start start = when top of container meets top of viewport
  // end end = when bottom of container meets bottom of viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <section id="projetos" className="relative bg-[#070708] border-b border-white/5">
      {/* Mobile-specific media query for stacked cards below 430px */}
      <style>{`
        .portfolio-stacked-card {
          --card-step: 18px;
          top: calc(var(--card-index) * var(--card-step));
        }
        @media (max-width: 640px) {
          .portfolio-stacked-card {
            --card-step: 12px;
          }
        }
        @media (max-width: 430px) {
          .portfolio-stacked-card {
            --card-step: 8px !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .portfolio-card-sheet {
            height: clamp(390px, calc(100dvh - 165px), 540px) !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .portfolio-card-body {
            padding: 0.75rem !important;
            gap: 0.625rem !important;
          }
          .portfolio-card-image {
            height: 155px !important;
          }
        }
        @media (max-width: 360px) {
          .portfolio-stacked-card {
            --card-step: 6px !important;
          }
          .portfolio-card-sheet {
            height: clamp(370px, calc(100dvh - 150px), 500px) !important;
          }
          .portfolio-card-image {
            height: 135px !important;
          }
        }
      `}</style>

      {/* If prefers reduced motion, render simple static vertical cards */}
      {prefersReducedMotion ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="mb-12">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#FF5E14] block mb-2">
              CASOS & PORTFÓLIO
            </span>
            <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-none">
              MARCAS QUE COMEÇARAM A <span className="text-[#FF5E14]">VIRAR A CHAVE.</span>
            </h2>
          </div>
          <div className="space-y-10">
            {PORTFOLIO_PROJECTS.map((project) => (
              <article
                key={project.id}
                className="rounded-2xl bg-[#0E0F12] border border-white/10 p-6 flex flex-col md:flex-row gap-6"
              >
                <img
                  src={project.image}
                  alt={project.client}
                  className="w-full md:w-1/2 aspect-[16/10] object-cover rounded-xl"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-[#FF5E14] uppercase">{project.industry}</span>
                    <h3 className="text-2xl font-bold text-white mt-1">{project.client}</h3>
                    <p className="text-sm text-neutral-300 mt-2">{project.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="mt-4 self-start text-xs uppercase font-bold text-[#FF5E14]"
                  >
                    Ver Case Completo
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        /* Scroll-Driven Sticky Stacking Experience */
        /* Outer section height calculated dynamically based on card count using 'calc' */
        <div
          ref={containerRef}
          className="relative w-full"
          style={{
            height: `calc((${totalProjects} - 1) * 100vh + 100vh)`,
          }}
        >
          {/* Sticky Inner Container: Manages the viewport pinning without any clipping overflow classes */}
          <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between pt-14 sm:pt-18 pb-3 sm:pb-6">
            
            {/* Header: Minimal, visually strong introduction */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full shrink-0 mb-1.5 sm:mb-4">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#FF5E14] block mb-0.5 sm:mb-1">
                CASOS & PORTFÓLIO
              </span>
              <h2 className="text-xl xs:text-2xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.02] sm:leading-[0.98] text-balance">
                MARCAS QUE COMEÇARAM A <span className="text-[#FF5E14]">VIRAR A CHAVE.</span>
              </h2>
            </div>

            {/* Stacking Cards Stage — Clean container without overflow clipping */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 relative flex items-start justify-center">
              <div
                className="relative w-full"
                style={{
                  height: 'clamp(440px, calc(100dvh - 190px), 640px)',
                }}
              >
                {PORTFOLIO_PROJECTS.map((project, index) => (
                  <CardLayer
                    key={project.id}
                    project={project}
                    index={index}
                    total={totalProjects}
                    progress={scrollYProgress}
                    onSelectProject={setSelectedProject}
                  />
                ))}
              </div>
            </div>

            {/* Subtle scroll progress hint at bottom */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full shrink-0 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-500 pt-1.5 border-t border-white/5">
              <span>Navegação orientada por rolagem</span>
              <span>
                Role para empilhar casos ({totalProjects} projetos)
              </span>
            </div>

          </div>
        </div>
      )}

      {/* Case Lightbox Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0E0F12] border border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl">
            {/* Close Button with 44px min touch target */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Fechar janela"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase font-mono tracking-widest text-[#FF5E14] font-semibold">
              {selectedProject.industry}
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white mt-1 mb-4 pr-10">
              {selectedProject.client}
            </h3>

            <div className="aspect-[16/9] w-full rounded-xl sm:rounded-2xl overflow-hidden mb-6 border border-white/10">
              <img
                src={selectedProject.image}
                alt={selectedProject.client}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 my-4 sm:my-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">Desafio & Escopo</h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                  {selectedProject.description}
                </p>
                <div className="mt-3 text-xs text-neutral-400">
                  <span className="font-semibold text-white">Serviços executados:</span> {selectedProject.service}
                </div>
              </div>
              <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#FF5E14] mb-1.5">Resultado Percebido</h4>
                <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                  {selectedProject.outcome}
                </p>
              </div>
            </div>

            <div className="pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <span className="text-xs text-neutral-400 text-center sm:text-left">Pronto para elevar o posicionamento da sua empresa?</span>
              <a
                href={getWhatsAppUrl(`Olá! Quero conversar sobre um projeto semelhante ao ${selectedProject.client}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#FF5E14] hover:bg-[#E04E0B] transition-all shadow-lg active:scale-95"
              >
                <span>Falar com a Viratta Agora</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
