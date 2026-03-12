import React, { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

interface SparkleNavbarProps {
  items: string[];
  color?: string;
  onNavigate: (index: number) => void;
  activeIndex: number;
}

const SparkleNavbar: React.FC<SparkleNavbarProps> = ({
  items,
  color = "#D4A373", // Amber Gold
  onNavigate,
  activeIndex
}) => {
  const navRef = useRef<HTMLDivElement>(null);
  const activeElementRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const getOffsetLeft = (element: HTMLButtonElement) => {
    if (!navRef.current || !activeElementRef.current) return 0;
    const elementRect = element.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    return elementRect.left - navRect.left + (elementRect.width - activeElementRef.current.offsetWidth) / 2;
  };

  useLayoutEffect(() => {
    const activeButton = buttonRefs.current[activeIndex];
    if (activeButton && activeElementRef.current) {
      gsap.to(activeElementRef.current, {
        x: getOffsetLeft(activeButton),
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [activeIndex]);

  return (
    <nav className="relative py-2" ref={navRef}>
      <ul className="flex gap-8 md:gap-12">
        {items.map((item, index) => (
          <li key={item}>
            <button
              ref={(el) => (buttonRefs.current[index] = el)}
              onClick={() => onNavigate(index)}
              className={`text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                index === activeIndex ? "text-crema" : "text-ash hover:text-amber-gold"
              }`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
      {/* Sparkle/Glow line */}
      <div 
        ref={activeElementRef}
        className="absolute bottom-[-10px] h-[2px] w-8 bg-amber-gold opacity-0"
        style={{ 
          boxShadow: `0 0 15px ${color}, 0 0 5px white`,
          filter: 'blur(0.5px)'
        }} 
      />
    </nav>
  );
};

export default SparkleNavbar;