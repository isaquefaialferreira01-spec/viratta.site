import React, { useEffect, useState } from 'react';
import { VirattaSymbol } from './brand/VirattaSymbol';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion or has visited recently
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Step 1: Symbol appears immediately
    // Step 2: Keyhole unlocks around 500ms
    const unlockTimer = setTimeout(() => {
      setUnlocked(true);
    }, 500);

    // Step 3: Fade out at 1200ms
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 1150);

    // Step 4: Complete at 1500ms
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => {
      clearTimeout(unlockTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      role="status"
      aria-label="Carregando Viratta Marketing"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070708] transition-opacity duration-400 select-none ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center px-4">
        {/* Subtle orange ambient glow */}
        <div
          className={`absolute -inset-10 rounded-full bg-[#FF5E14] blur-3xl transition-opacity duration-700 pointer-events-none ${
            unlocked ? 'opacity-40 scale-125' : 'opacity-0 scale-75'
          }`}
        />

        {/* Central Official VIRATTA Symbol */}
        <div
          className={`relative transition-all duration-700 ease-out transform ${
            unlocked ? 'scale-105' : 'scale-95'
          }`}
        >
          <VirattaSymbol
            className="w-20 h-20 md:w-24 md:h-24"
            glow={unlocked}
          />

          {/* Unlocking Ring Animation */}
          {unlocked && (
            <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <span className="block w-12 h-12 rounded-full border-2 border-[#FF5E14] animate-ping opacity-75" />
            </div>
          )}
        </div>

        {/* Brand Kicker */}
        <div className="mt-8 flex flex-col items-center text-center">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-neutral-400">
            VIRATTA MARKETING
          </span>
          <span
            className={`text-[11px] tracking-[0.18em] text-[#FF5E14] mt-1 transition-opacity duration-500 font-medium ${
              unlocked ? 'opacity-100' : 'opacity-0'
            }`}
          >
            DESTRAVANDO PERCEPÇÃO
          </span>
        </div>
      </div>

      {/* Skip button for immediate access */}
      <button
        type="button"
        onClick={onComplete}
        aria-label="Pular animação inicial de carregamento"
        className="absolute bottom-6 right-6 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-xs text-neutral-400 hover:text-white transition-colors uppercase tracking-wider px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14] rounded-lg"
      >
        Pular
      </button>
    </div>
  );
};
