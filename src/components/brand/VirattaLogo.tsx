import React from 'react';
import { useCms } from '../../context/CmsContext';

interface VirattaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  priority?: boolean;
  src?: string;
}

export const VirattaLogo: React.FC<VirattaLogoProps> = ({
  className = "",
  size = 'md',
  priority = false,
  src,
}) => {
  let logoUrl = src;
  try {
    const cms = useCms();
    logoUrl = logoUrl || cms.content?.appearance?.logo_url;
  } catch {}

  const finalSrc = logoUrl || "/viratta-official-logo.png";

  const sizeClasses = {
    sm: "h-8 sm:h-9 md:h-10",
    md: "h-9 sm:h-10 md:h-12",
    lg: "h-11 sm:h-14 md:h-16",
    xl: "h-14 sm:h-18 md:h-22",
  };

  return (
    <div className={`inline-flex items-center shrink-0 select-none ${className}`}>
      <img
        src={finalSrc}
        alt="VIRATTA MARKETING"
        className={`viratta-logo-img w-auto object-contain ${sizeClasses[size]} transition-all duration-200 drop-shadow-sm`}
        style={{ aspectRatio: '2159 / 728' }}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
};
