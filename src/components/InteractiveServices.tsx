import React, { useState } from 'react';
import { motion } from 'motion/react';
import { VIRATTA_SERVICES, getWhatsAppUrl } from '../config/siteConfig';
import { ArrowUpRight, CheckCircle2, ChevronDown } from 'lucide-react';

export const InteractiveServices: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState(VIRATTA_SERVICES[0].id);

  const activeService = VIRATTA_SERVICES.find((s) => s.id === activeServiceId) || VIRATTA_SERVICES[0];

  // Specific visual assets associated with each service
  const serviceImages: Record<string, string> = {
    "01": "/src/assets/images/portfolio_gastronomy_1791218028786.jpg",
    "02": "/src/assets/images/portfolio_gym_1791218046940.jpg",
    "03": "/src/assets/images/viratta_audiovisual_studio_1791218069074.jpg",
    "04": "/src/assets/images/portfolio_automotive_1791218057376.jpg",
    "05": "/src/assets/images/portfolio_clinic_1791218038116.jpg",
    "06": "/src/assets/images/viratta_audiovisual_studio_1791218069074.jpg",
  };

  return (
    <section id="servicos" className="relative py-16 sm:py-28 lg:py-36 bg-[#070708] overflow-hidden">
      {/* Background ambient gradient */}
      <div 
        aria-hidden="true"
        className="absolute top-1/2 left-0 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-[#FF5E14]/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-16 lg:mb-20"
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#FF5E14]">
            Capacidades Viratta
          </span>
          <h2 className="mt-2 sm:mt-3 text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-3xl leading-[1.08] sm:leading-[1.05] text-balance">
            O QUE FAZEMOS <br />
            PARA SUA MARCA <br />
            <span className="text-[#FF5E14]">SER PERCEBIDA.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-neutral-400 max-w-xl font-light leading-relaxed">
            Sem pacotes genéricos. Soluções conectadas para empresas que se recusam a continuar invisíveis.
          </p>
        </motion.div>

        {/* Interactive Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Interactive Editorial Service List */}
          <div className="lg:col-span-7 flex flex-col space-y-2.5 sm:space-y-3">
            {VIRATTA_SERVICES.map((service) => {
              const isActive = service.id === activeServiceId;
              return (
                <div key={service.id} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setActiveServiceId(service.id)}
                    onMouseEnter={() => setActiveServiceId(service.id)}
                    className={`w-full text-left p-4 sm:p-6 lg:p-7 rounded-2xl transition-all duration-300 flex items-center justify-between group border relative min-h-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14] ${
                      isActive
                        ? 'bg-[#0E0F12] border-[#FF5E14]/50 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
                        : 'bg-transparent border-white/5 hover:border-white/15 hover:bg-white/[0.02]'
                    }`}
                    aria-pressed={isActive}
                  >
                    {/* Left Orange Indicator Strip */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl bg-[#FF5E14] transition-all duration-300 ${
                        isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-50'
                      }`}
                    />

                    <div className="flex items-start gap-3 sm:gap-6 pl-2">
                      <span className="font-mono text-xs sm:text-base font-bold text-[#FF5E14] tabular-nums mt-0.5 sm:mt-1">
                        {service.id}
                      </span>
                      <div>
                        <h3
                          className={`text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight transition-colors duration-200 ${
                            isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'
                          }`}
                        >
                          {service.name}
                        </h3>
                        <p
                          className={`text-xs sm:text-sm mt-1 sm:mt-1.5 transition-colors duration-200 line-clamp-1 sm:line-clamp-none ${
                            isActive ? 'text-neutral-300 font-medium' : 'text-neutral-500 font-light'
                          }`}
                        >
                          “{service.short}”
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <ArrowUpRight
                        className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                          isActive
                            ? 'text-[#FF5E14] translate-x-0.5 -translate-y-0.5'
                            : 'text-neutral-600 group-hover:text-neutral-400'
                        }`}
                      />
                    </div>
                  </button>

                  {/* Mobile-Friendly Accordion Dropdown Preview for Small Screens */}
                  {isActive && (
                    <div className="lg:hidden mt-2 p-4 rounded-2xl bg-[#0E0F12] border border-[#FF5E14]/30 shadow-lg animate-fadeIn">
                      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 border border-white/10">
                        <img
                          src={serviceImages[service.id]}
                          alt={service.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-mono text-neutral-300">
                          {service.tag}
                        </div>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed font-light mb-3">
                        {service.description}
                      </p>
                      <div className="space-y-1.5 mb-4">
                        {service.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-neutral-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5E14] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <a
                        href={getWhatsAppUrl(`Olá! Gostaria de consultar sobre o serviço de ${service.name}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#FF5E14] active:bg-[#E04E0B]"
                      >
                        <span>Consultar {service.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Media & Concrete Value Panel (Desktop / Tablet Large) */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-3xl bg-[#0E0F12] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              {/* Media Preview Showcase */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 mb-6 group">
                <img
                  src={serviceImages[activeService.id]}
                  alt={activeService.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-200 px-3 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10">
                    {activeService.tag}
                  </span>
                </div>
              </div>

              {/* Service Detailed Synopsis */}
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#FF5E14] font-semibold">
                  Serviço {activeService.id}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 mb-3">
                  {activeService.name}
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed font-light mb-6">
                  {activeService.description}
                </p>

                {/* Scope Points */}
                <div className="space-y-2 mb-8 border-t border-white/5 pt-4">
                  {activeService.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Action Button */}
              <a
                href={getWhatsAppUrl(`Olá! Gostaria de falar sobre o serviço de ${activeService.name} para minha empresa.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-[#FF5E14] border border-white/10 hover:border-transparent transition-all duration-200 active:scale-95"
              >
                <span>Consultar Este Serviço</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
