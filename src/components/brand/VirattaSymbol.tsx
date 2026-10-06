import React from 'react';

interface VirattaSymbolProps {
  className?: string;
  size?: number | string;
  glow?: boolean;
}

export const VirattaSymbol: React.FC<VirattaSymbolProps> = ({
  className = "w-8 h-8",
  size,
  glow = false,
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={style}
    >
      {glow && (
        <div className="absolute inset-0 bg-[#FF5E14] opacity-35 blur-xl rounded-full pointer-events-none" />
      )}
      <img
        src="/viratta-official-symbol.png"
        alt="Símbolo Oficial VIRATTA"
        className="w-full h-full object-contain relative z-10 transition-transform duration-300"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};
