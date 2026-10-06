import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { PORTFOLIO_PROJECTS, getWhatsAppUrl } from '../config/siteConfig';
import { ArrowUpRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProjectCardProps {
  project: typeof PORTFOLIO_PROJECTS[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  isLast: boolean;
  prefersReducedMotion: boolean;
  onSelectProject: (p: typeof PORTFOLIO_PROJECTS[0]) => void;
}

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

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  total,
  progress,
  range,
  targetScale,
  isLast,
  prefersReducedMotion,
  onSelectProject,
}) => {
  // Compute depth transformation based on global stack scroll progress
  const scale = useTransform(progress, range, [1, targetScale]);
  const brightness = useTransform(progress, range, [1, 0.88]);

  const formattedIndex = String(index + 1).padStart(2, '0');
  const totalFormatted = String(total).padStart(2, '0');
  const deliverables = deliverablesByProject[project.id] || ["Estratégia", "Identidade", "Conteúdo"];

  // Top offset formula: keeps each card's upper tab visible as the stack forms
  const topOffsetDesktop = `calc(clamp(70px, 9vh, 92px) + ${index * 18}px)`;
  const topOffsetMobile = `calc(64px + ${index * 12}px)`;

  return (
    <div
      className={`w-full relative ${
        isLast
          ? 'h-auto pb-4'
          : 'h-[85vh] sm:h-[100vh] lg:h-[110vh]'
      }`}
    >
      <div
        className="w-full sticky"
        style={{
          top: prefersReducedMotion ? undefined : topOffsetDesktop,
          zIndex: (index + 1) * 10,
        }}
      >
        <motion.article
          style={{
            minHeight: 'clamp(500px, 76vh, 84vh)',
            maxHeight: '88vh',
            transformOrigin: 'top center',
            ...(prefersReducedMotion
              ? {}
              : {
                  scale: isLast ? 1 : scale,
                  filter: isLast ? undefined : useTransform(brightness, (b) => `brightness(${b})`),
                }),
          }}
          className="group relative w-full rounded-2xl sm:rounded-3xl bg-[#0E0F12] border border-white/10 hover:border-[#FF5E14]/40 transition-colors duration-300 shadow-[0_-20px_45px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between"
        >
          {/* Card Header Tab Strip: 01 / 04, Monogram Logo, Client Name, Category */}
          <header className="px-4 py-3 sm:px-8 sm:py-4.5 border-b border-white/5 flex items-center justify-between gap-3 bg-[#0A0A0C]/95 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-4">
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
                <h3 className="text-xs sm:text-base md:text-lg font-extrabold text-white tracking-tight truncate max-w-[170px] xs:max-w-[220px] sm:max-w-none">
                  {project.client}
                </h3>
              </div>
            </div>

            {/* Category / Industry Tag */}
            <div className="shrink-0">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 hidden xs:inline-block">
                {project.industry}
              </span>
            </div>
          </header>

          {/* Card Main Body: Protagonist Project Visual & Editorial Case Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 lg:gap-8 items-center overflow-hidden">
            
            {/* The Protagonist Project Visual */}
            <div className="lg:col-span-7 w-full h-[210px] xs:h-[250px] sm:h-[320px] lg:h-full relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 group-hover:border-white/20 transition-all">
              <img
                src={project.image}
                alt={`Case ${project.client}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80" />

              {/* Floating Service Badge */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10">
                  {project.service}
                </span>
              </div>
            </div>

            {/* Case Overview & Value Proposition */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full py-1">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#FF5E14] font-semibold mb-1 hidden sm:block">
                  {project.industry}
                </div>

                <h4 className="text-base sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  {project.client}
                </h4>

                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {project.description}
                </p>

                {/* Deliverables Pills */}
                <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                  {deliverables.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[10px] sm:text-[11px] font-medium text-neutral-300"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#FF5E14]" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>

                {/* Impact on Perception Quote */}
                <div className="mt-3.5 sm:mt-5 p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="flex items-start gap-2 sm:gap-2.5">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF5E14] shrink-0 mt-0.5" />
                    <p className="text-[11px] sm:text-xs text-neutral-300 font-medium leading-relaxed">
                      <span className="text-[#FFA05C] font-semibold">Impacto na Percepção:</span> {project.outcome}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 sm:mt-6 pt-3.5 sm:pt-4 border-t border-white/5 flex items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="min-h-[44px] inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-white hover:text-[#FF5E14] transition-colors py-2"
                >
                  <span>Ver Case Completo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={getWhatsAppUrl(`Olá! Vi o case do ${project.client} no site e quero um resultado semelhante para minha empresa.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-center px-3.5 sm:px-4 py-2.5 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white bg-[#FF5E14] hover:bg-[#E04E0B] shadow-sm transition-all active:scale-95"
                >
                  Quero Algo Assim
                </a>
              </div>
            </div>

          </div>
        </motion.article>
      </div>
    </div>
  );
};

export const PortfolioShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof PORTFOLIO_PROJECTS[0] | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const totalProjects = PORTFOLIO_PROJECTS.length;

  // Track scroll progress of the entire portfolio stack
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
    <section id="projetos" className="relative pt-16 sm:pt-24 pb-16 sm:pb-24 bg-[#070708] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header — Minimal, visually strong introduction */}
        <div className="mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#FF5E14] block mb-2 sm:mb-3">
              CASOS & PORTFÓLIO
            </span>
            <h2 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.02] sm:leading-[0.98] text-balance">
              MARCAS QUE COMEÇARAM <br />
              A <span className="text-[#FF5E14]">VIRAR A CHAVE.</span>
            </h2>
          </motion.div>
        </div>

        {/* Scroll-Driven Stacked Cards Container */}
        <div ref={containerRef} className="relative w-full">
          {PORTFOLIO_PROJECTS.map((project, index) => {
            // Target scale depth: older cards scale down slightly (0.95 -> 0.97 -> 0.98 -> 1)
            const targetScale = 1 - (totalProjects - 1 - index) * 0.02;
            const startRange = index / totalProjects;
            const isLast = index === totalProjects - 1;

            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                total={totalProjects}
                progress={scrollYProgress}
                range={[startRange, 1]}
                targetScale={targetScale}
                isLast={isLast}
                prefersReducedMotion={prefersReducedMotion}
                onSelectProject={setSelectedProject}
              />
            );
          })}
        </div>

      </div>

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
