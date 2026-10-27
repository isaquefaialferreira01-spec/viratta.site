import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface FanCard {
  image: string;
  title: string;
  caption?: string;
}

interface CardFanGalleryProps {
  items: FanCard[];
  className?: string;
}

/**
 * High-end Card Fan Gallery with 3 interactive states:
 * State 1: Closed Fan (stacked, subtle bundle)
 * State 2: Open Fan (fanned out on hover or gallery click)
 * State 3: Active Card (elevated, straightened, scaled 1.2x+, top z-index, dimmed siblings)
 */
export function CardFanGallery({ items, className }: CardFanGalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Keyboard navigation: ESC to close active card
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setActive(null);
      setIsOpenMobile(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Click outside to close active card & collapse fan
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActive(null);
        setIsOpenMobile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleCardClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (active === index) {
      // Re-click active card toggles it off
      setActive(null);
    } else {
      setActive(index);
      setIsOpenMobile(true);
    }
  };

  const handleContainerClick = () => {
    // If a card is active, clicking container resets it
    if (active !== null) {
      setActive(null);
    } else {
      // Toggle open state on mobile/desktop click on container
      setIsOpenMobile((prev) => !prev);
    }
  };

  const mid = (items.length - 1) / 2;
  const isFanOpen = isHovered || isOpenMobile || active !== null;

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative mx-auto w-full select-none max-w-5xl",
        "h-[450px] xs:h-[490px] sm:h-[530px] md:h-[560px]",
        "flex items-end justify-center",
        className
      )}
    >
      {items.map((card, i) => {
        const offset = i - mid; // e.g. -1.5, -0.5, 0.5, 1.5
        const isActive = active === i;
        const hasActive = active !== null;

        // Position & transform calculations
        let rotate = 0;
        let translateX = 0;
        let translateY = 0;
        let scale = 1;
        let opacity = 1;
        let zIndex = 20 + i;

        if (hasActive) {
          if (isActive) {
            // STATE 3: ACTIVE CARD (Selected)
            rotate = 0;
            translateX = 0;
            translateY = isMobile ? -28 : -46;
            scale = isMobile ? 1.08 : 1.24;
            opacity = 1;
            zIndex = 50;
          } else {
            // STATE 3: NON-ACTIVE SIBLINGS
            const pushDir = i < (active as number) ? -1 : 1;
            const spreadStep = isMobile ? 60 : 130;
            const pushExtra = isMobile ? 16 : 38;
            translateX = offset * spreadStep + pushDir * pushExtra;
            rotate = offset * (isMobile ? 5 : 7) + pushDir * 2;
            translateY = isMobile ? 12 : 20;
            scale = isMobile ? 0.94 : 0.92;
            opacity = 0.58;
            zIndex = 10 + i;
          }
        } else if (isFanOpen) {
          // STATE 2: OPEN FAN (Hovered or Clicked open)
          const spreadStep = isMobile ? 54 : 115;
          translateX = offset * spreadStep;
          rotate = offset * (isMobile ? 6 : 7.8);
          translateY = Math.abs(offset) * (isMobile ? 5 : 8);
          scale = 1.02;
          opacity = 1;
          zIndex = 20 + i;
        } else {
          // STATE 1: CLOSED FAN (Default stacked bundle)
          const spreadStep = isMobile ? 18 : 26;
          translateX = offset * spreadStep;
          rotate = offset * (isMobile ? 3.8 : 4.6);
          translateY = Math.abs(offset) * 2;
          scale = 1;
          opacity = 1;
          zIndex = 20 + i;
        }

        return (
          <button
            key={card.title}
            type="button"
            onClick={(e) => handleCardClick(i, e)}
            aria-pressed={isActive}
            aria-label={`${card.title}: ${card.caption || ""}`}
            className={cn(
              "absolute bottom-4 left-1/2 overflow-hidden rounded-2xl text-left",
              "origin-bottom transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]",
              // Responsive card sizes: ~25-30% larger on desktop
              "w-[230px] xs:w-[255px] sm:w-[285px] md:w-[305px]",
              "h-[340px] xs:h-[375px] sm:h-[415px] md:h-[435px]",
              isActive
                ? "border-2 border-[#FF5E14] shadow-[0_24px_55px_rgba(0,0,0,0.92),0_0_35px_rgba(255,94,20,0.3)] ring-1 ring-[#FF5E14]/60 cursor-pointer"
                : "border border-white/15 bg-zinc-950/90 shadow-[0_16px_36px_rgba(0,0,0,0.7)] hover:border-white/35 cursor-pointer"
            )}
            style={{
              zIndex,
              opacity,
              transform: `translateX(calc(-50% + ${translateX}px)) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
              willChange: "transform, opacity",
            }}
          >
            {/* Background Image with crisp cover */}
            <img
              src={card.image}
              alt={card.title}
              className={cn(
                "h-full w-full object-cover transition-transform duration-700 ease-out",
                isActive ? "scale-105" : "scale-100"
              )}
            />

            {/* Gradient Overlays for High Contrast Readability */}
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-300",
                isActive
                  ? "bg-gradient-to-t from-black via-black/55 to-black/20"
                  : "bg-gradient-to-t from-black/90 via-black/45 to-transparent"
              )}
            />

            {/* Orange Top Accent Line when Active */}
            {isActive && (
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF5E14] via-[#ff7836] to-[#FF5E14] shadow-[0_0_12px_#FF5E14]" />
            )}

            {/* Close Pill Button when Active */}
            {isActive && (
              <div
                className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 border border-white/20 text-white/90 text-[10px] font-mono uppercase tracking-wider backdrop-blur-md shadow-md hover:bg-black hover:border-[#FF5E14]/80 transition-colors"
                title="Fechar destaque"
              >
                <span>Fechar</span>
                <span className="text-xs font-bold text-[#FF5E14]">✕</span>
              </div>
            )}

            {/* Content & Typography */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white z-10 flex flex-col justify-end">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-[#FF5E14] uppercase mb-1">
                {card.title.split("—")[0]?.trim()}
              </span>
              <h3 className="text-base sm:text-lg font-black tracking-tight leading-snug text-white">
                {card.title.includes("—")
                  ? card.title.split("—")[1]?.trim()
                  : card.title}
              </h3>
              {card.caption && (
                <p
                  className={cn(
                    "text-neutral-300 font-light leading-relaxed transition-all duration-300",
                    isActive
                      ? "mt-2 text-xs sm:text-sm text-neutral-100 max-h-24 opacity-100"
                      : "mt-1.5 text-[11px] sm:text-xs text-neutral-300 line-clamp-2"
                  )}
                >
                  {card.caption}
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
