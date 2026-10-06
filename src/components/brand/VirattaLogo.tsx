import React from 'react';

interface VirattaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  priority?: boolean;
}

export const VirattaLogo: React.FC<VirattaLogoProps> = ({
  className = "",
  size = 'md',
  priority = false,
}) => {
  const sizeClasses = {
    sm: "h-8 sm:h-9 md:h-10",
    md: "h-9 sm:h-10 md:h-12",
    lg: "h-11 sm:h-14 md:h-16",
    xl: "h-14 sm:h-18 md:h-22",
  };

  return (
    <div className={`inline-flex items-center shrink-0 select-none ${className}`}>
      <img
        src="/viratta-official-logo.png"
        alt="VIRATTA MARKETING"
        className={`w-auto object-contain ${sizeClasses[size]} transition-all duration-200 drop-shadow-sm`}
        style={{ aspectRatio: '2159 / 728' }}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
};
