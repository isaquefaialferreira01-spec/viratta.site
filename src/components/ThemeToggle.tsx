import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Sparkles } from 'lucide-react';

interface ThemeToggleProps {
  variant?: 'button' | 'segment';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'button',
  className = '',
}) => {
  const { theme, isDark, toggleTheme, setTheme } = useTheme();

  if (variant === 'segment') {
    return (
      <div 
        className={`inline-flex items-center p-1 rounded-xl bg-white/5 border border-white/10 dark:bg-white/5 dark:border-white/10 [html.light_&]:bg-black/5 [html.light_&]:border-black/10 ${className}`}
        role="group"
        aria-label="Seletor de tema"
      >
        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
            isDark
              ? 'bg-[#FF5E14] text-white shadow-sm'
              : 'text-neutral-400 hover:text-white [html.light_&]:text-neutral-600 [html.light_&]:hover:text-black'
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
          <span>Escuro</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
            !isDark
              ? 'bg-black text-white shadow-sm [html.light_&]:bg-[#070708] [html.light_&]:text-white'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span>Alto Contraste</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? 'Alternar para versão de alto contraste com fundo branco'
          : 'Alternar para modo escuro oficial'
      }
      title={
        isDark
          ? 'Versão de alto contraste (fundo branco)'
          : 'Modo escuro (oficial)'
      }
      className={`min-w-[40px] min-h-[40px] sm:min-w-[42px] sm:min-h-[42px] flex items-center justify-center rounded-xl transition-all duration-200 active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14] ${
        isDark
          ? 'bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white border border-white/10 hover:border-white/20'
          : 'bg-black/[0.06] hover:bg-black/[0.1] text-neutral-800 hover:text-black border border-black/10 hover:border-black/20 shadow-sm'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-neutral-800 group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
};
