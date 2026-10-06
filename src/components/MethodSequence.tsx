import React, { useState } from 'react';
import { motion } from 'motion/react';
import { METHOD_STEPS } from '../config/siteConfig';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

export const MethodSequence: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <section id="metodo" className="relative py-16 sm:py-28 lg:py-36 bg-[#070708] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-6 mb-10 sm:mb-16 pb-6 border-b border-white/10">
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#FF5E14]">
              O Método
            </span>
            <h2 className="mt-1.5 sm:mt-2 text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
              O PROCESSO VIRATTA.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md font-light leading-relaxed">
            Do primeiro diagnóstico à comunicação ativa. Sem etapas perdidas, sem reuniões sem fim.
          </p>
        </div>

        {/* Step Selector Ribbon / Progress Indicator (Touch-friendly 44px+ on mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-8 sm:mb-12">
          {METHOD_STEPS.map((item, idx) => {
            const isActive = idx === currentStep;
            const isCompleted = idx < currentStep;
            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setCurrentStep(idx)}
                className={`p-3.5 sm:p-4 rounded-xl text-left transition-all duration-300 border relative min-h-[52px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14] active:scale-[0.98] ${
                  isActive
                    ? 'bg-[#0E0F12] border-[#FF5E14] shadow-[0_0_20px_rgba(255,94,20,0.2)]'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold tabular-nums ${isActive ? 'text-[#FF5E14]' : 'text-neutral-500'}`}>
                    {item.step}
                  </span>
                  {isCompleted ? (
                    <CheckCircle className="w-3.5 h-3.5 text-[#FF5E14]" />
                  ) : (
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#FF5E14]' : 'bg-neutral-700'}`} />
                  )}
                </div>
                <div className={`mt-2 sm:mt-3 text-xs sm:text-sm font-bold tracking-wider uppercase truncate ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Featured Detail Canvas */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl sm:rounded-3xl bg-[#0E0F12] border border-white/10 p-6 sm:p-12 lg:p-16 overflow-hidden shadow-2xl"
        >
          {/* Subtle Ambient Background Highlight */}
          <div 
            aria-hidden="true"
            className="absolute top-0 right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[#FF5E14]/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" 
          />

          <div className="relative z-10 max-w-3xl">
            <span className="font-mono text-[11px] sm:text-sm font-bold tracking-widest text-[#FF5E14] uppercase">
              Etapa {METHOD_STEPS[currentStep].step} de 06
            </span>

            <h3 className="mt-2 sm:mt-4 text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              {METHOD_STEPS[currentStep].title}
            </h3>

            {/* Crucial Single-Sentence Rule */}
            <p className="mt-4 sm:mt-6 text-lg sm:text-2xl md:text-3xl text-neutral-200 font-light leading-snug">
              “{METHOD_STEPS[currentStep].phrase}”
            </p>

            <p className="mt-3 sm:mt-4 text-xs sm:text-base text-neutral-400 leading-relaxed font-light">
              {METHOD_STEPS[currentStep].detail}
            </p>

            {/* Stepper Controls with 44px+ min touch targets */}
            <div className="mt-8 sm:mt-10 flex items-center gap-3 sm:gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev > 0 ? prev - 1 : METHOD_STEPS.length - 1))}
                className="min-h-[44px] inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-neutral-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => (prev < METHOD_STEPS.length - 1 ? prev + 1 : 0))}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#FF5E14] hover:bg-[#E04E0B] shadow-md transition-all active:scale-95"
              >
                <span>{currentStep === METHOD_STEPS.length - 1 ? 'Reiniciar Método' : 'Próxima Etapa'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
