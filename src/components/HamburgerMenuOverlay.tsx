"use client";
import React, { useEffect } from "react";
import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";

export interface MenuItem {
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

export interface HamburgerMenuOverlayProps {
  items: MenuItem[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const HamburgerMenuOverlay: React.FC<HamburgerMenuOverlayProps> = ({
  items =[],
  isOpen,
  onToggle,
  onClose,
}) => {
  const zIndex = 98; // Keeps it just under the navbar wrapper but above everything else

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <div className="relative">
      <style>
        {`
          .hamburger-overlay-${zIndex} {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100dvh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(12, 8, 4, 0.98); /* espresso with opacity */
            z-index: ${zIndex};
            /* Originates the circle animation from the top right button position */
            clip-path: circle(0px at calc(100% - 30px) 40px);
            transition: clip-path 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            backdrop-filter: blur(16px);
          }
          
          .hamburger-overlay-${zIndex}.open {
            clip-path: circle(150% at calc(100% - 30px) 40px);
          }
          
          .hamburger-button-${zIndex} {
            position: relative;
            z-index: 101; /* Above the overlay */
            background: transparent;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
          }
          
          .menu-items-${zIndex} {
            text-align: center;
            padding: 0;
            margin: 0;
          }
          
          .menu-item-${zIndex} {
            position: relative;
            list-style: none;
            padding: 1.25rem 0;
            cursor: pointer;
            transform: translateY(30px);
            opacity: 0;
            transition: all 0.4s ease;
            font-family: var(--font-serif);
            font-weight: 700;
            font-style: italic;
            color: #A39F98; /* ash */
          }
          
          .menu-item-${zIndex}.visible {
            transform: translateY(0);
            opacity: 1;
          }
          
          .menu-item-${zIndex}:hover, .menu-item-${zIndex}.active {
            color: #D4A373; /* amber-gold */
          }
          
          .menu-item-${zIndex} span {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-size: 2rem;
            letter-spacing: 0.05em;
          }
        `}
      </style>

      {/* Navigation Overlay */}
      <div
        className={cn(`hamburger-overlay-${zIndex}`, isOpen && "open")}
        aria-hidden={!isOpen}
      >
        <ul className={`menu-items-${zIndex} flex flex-col`}>
          {items.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                `menu-item-${zIndex}`,
                isOpen && "visible",
                item.isActive && "active"
              )}
              style={{
                transitionDelay: isOpen ? `${index * 0.1}s` : "0s",
              }}
              onClick={() => {
                item.onClick();
                onClose();
              }}
            >
              <span>
                {item.label}
                {item.isActive && <span className="w-2 h-2 rounded-full bg-amber-gold" />}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hamburger Button */}
      <button
        data-hamburger="true"
        className={`hamburger-button-${zIndex} text-ash hover:text-crema`}
        onClick={onToggle}
        aria-label="Toggle menu"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Menu
            className={cn("absolute transition-all duration-300", isOpen ? "opacity-0 rotate-45 scale-0" : "opacity-100 rotate-0 scale-100")}
            size={22}
          />
          <X
            className={cn("absolute transition-all duration-300", isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-45 scale-0")}
            size={22}
          />
        </div>
      </button>
    </div>
  );
};

export default HamburgerMenuOverlay;