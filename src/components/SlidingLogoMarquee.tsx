"use client";

import React, { useRef, useState, useMemo } from "react";
import { cn } from "../lib/utils"; 
import { Pause, Play } from "lucide-react";

export interface SlidingLogoMarqueeItem {
  id: string;
  content: React.ReactNode;
  href?: string;
}

export interface SlidingLogoMarqueeProps {
  items: SlidingLogoMarqueeItem[];
  speed?: number;
  pauseOnHover?: boolean;
  enableBlur?: boolean;
  blurIntensity?: number;
  height?: string;
  width?: string;
  gap?: string;
  scale?: number;
  direction?: "horizontal" | "vertical";
  autoPlay?: boolean;
  backgroundColor?: string;
  showGridBackground?: boolean;
  className?: string;
  onItemClick?: (item: SlidingLogoMarqueeItem) => void;
  enableSpillEffect?: boolean;
  animationSteps?: number;
  showControls?: boolean;
}

export function SlidingLogoMarquee({
  items,
  speed = 1,
  pauseOnHover = true,
  enableBlur = true,
  blurIntensity = 1,
  height = "100px",
  width = "100%",
  gap = "2rem",
  scale = 1,
  direction = "horizontal",
  autoPlay = true,
  backgroundColor = 'transparent',
  showGridBackground = false,
  className,
  onItemClick,
  enableSpillEffect = false,
  animationSteps = 8,
  showControls = true,
}: SlidingLogoMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const duplicatedItems = useMemo(() => [...items, ...items], [items]);

  const handleItemClick = (item: SlidingLogoMarqueeItem) => {
    if (item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
    onItemClick?.(item);
  };

  const togglePlayState = () => {
    setIsPlaying(!isPlaying);
  };

  const blurDivs = Array.from({ length: animationSteps }, (_, index) => (
    <div key={index} style={{ "--index": index } as React.CSSProperties} className="absolute inset-0 z-[var(--index)]" />
  ));

  const itemRenderer = (item: SlidingLogoMarqueeItem, index: number, isDuplicate: boolean) => (
    <li
      key={`${item.id}-${index}-${isDuplicate ? 'dup' : 'orig'}`}
      className={cn(
        "sliding-marquee-item text-crema",
        "grid place-items-center cursor-pointer transition-all duration-300",
        "hover:scale-105 hover:text-amber-gold focus:outline-none",
      )}
      onClick={() => handleItemClick(item)}
      role="button"
      tabIndex={0}
    >
      <div className="h-full flex items-center justify-center">{item.content}</div>
    </li>
  );

  return (
    <>
      <style>
        {`
        .sliding-marquee-container {
          --speed: ${speed};
          --gap: ${gap};
          --blur: ${blurIntensity};
          --blurs: ${animationSteps};
          --duration: calc(200s / var(--speed)); 
        }

        @keyframes marquee-horizontal {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); } 
        }
        
        @keyframes marquee-vertical {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }

        .sliding-marquee-list {
          display: flex;
          flex-shrink: 0; 
          min-width: 200%;
          gap: var(--gap);
          height: 100%;
          align-items: center;
          list-style-type: none;
          padding-inline: 0;
          margin: 0;
          pointer-events: auto;
          animation: marquee-horizontal var(--duration) linear infinite paused;
          transform: translateZ(0);
          will-change: transform;
        }

        .sliding-marquee-resizable[data-direction="vertical"] .sliding-marquee-list {
            flex-direction: column;
            min-width: unset;
            min-height: 200%;
            width: 100%;
            animation: marquee-vertical var(--duration) linear infinite paused;
        }

        .sliding-marquee-item {
          min-width: clamp(120px, 20vw, 280px); 
          height: 100%;
        }
        
        [data-play-state="running"] .sliding-marquee-list {
          animation-play-state: running !important;
        }
        [data-play-state="paused"] .sliding-marquee-list {
          animation-play-state: paused !important;
        }

        .sliding-marquee-resizable {
          overflow: hidden;
          scale: var(--scale);
          width: 100%;
          height: ${height};
          position: relative;
        }

        .sliding-marquee-inner {
          height: 100%;
          width: 100%;
          position: relative;
          mask: linear-gradient(90deg, transparent, black 20% 80%, transparent);
          display: flex; 
          pointer-events: none;
        }

        .sliding-marquee-blur { position: absolute; top: 0; bottom: 0; width: 20%; z-index: 2; pointer-events: none; }
        .sliding-marquee-blur--right { right: 0; }
        .sliding-marquee-blur--left { left: 0; rotate: 180deg; }
        .sliding-marquee-blur div {
            mask: linear-gradient(90deg,
                transparent calc(var(--index) * calc((100 / var(--blurs)) * 1%)),
                black calc((var(--index) + 1) * calc((100 / var(--blurs)) * 1%)),
                black calc((var(--index) + 2) * calc((100 / var(--blurs)) * 1%)),
                transparent calc((var(--index) + 3) * calc((100 / var(--blurs)) * 1%)));
            backdrop-filter: blur(calc((var(--index, 0) * var(--blur, 0)) * 1px));
        }
        `}
      </style>

      <div
        ref={containerRef}
        className={cn("sliding-marquee-container relative", className)}
        style={{ width, background: backgroundColor }}
        onMouseEnter={() => pauseOnHover && setIsPlaying(false)}
        onMouseLeave={() => pauseOnHover && setIsPlaying(true)}
      >
        <div
          className="sliding-marquee-resizable"
          data-direction={direction}
          data-blurring={enableBlur}
          data-play-state={isPlaying ? "running" : "paused"}
          data-spill={enableSpillEffect}
        >
          <div className="sliding-marquee-inner">
            {enableBlur && (
              <div className="sliding-marquee-blur sliding-marquee-blur--left">
                {blurDivs}
              </div>
            )}

            <ul className="sliding-marquee-list" aria-hidden={false}>
              {items.map((item, index) => itemRenderer(item, index, false))}
              {items.map((item, index) => itemRenderer(item, index, true))}
            </ul>

            {enableBlur && (
              <div className="sliding-marquee-blur sliding-marquee-blur--right">
                {blurDivs}
              </div>
            )}
          </div>
        </div>

        {showControls && (
          <button
            onClick={togglePlayState}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-10 p-2 bg-white/5 text-ash rounded-full hover:bg-white/10 hover:text-amber-gold transition-all"
            aria-label={isPlaying ? "Pause animation" : "Play animation"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
        )}
      </div>
    </>
  );
}

export default SlidingLogoMarquee;