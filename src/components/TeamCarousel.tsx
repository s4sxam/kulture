"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, TargetAndTransition} from 'motion/react';
import { cn } from '../lib/utils';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export interface TeamCarouselProps {
  members: TeamMember[];
  title?: string;
  titleColor?: string;
  cardWidth?: number;
  cardHeight?: number;
  animationDuration?: number;
  sideCardScale?: number;
  sideCardOpacity?: number;
  infoTextColor?: string;
}

export const TeamCarousel: React.FC<TeamCarouselProps> = ({
  members,
  title = "THE CRAFTSMEN",
  titleColor = "#D4A373", // Amber Gold
  cardWidth = 280,
  cardHeight = 380,
  animationDuration = 800,
  sideCardScale = 0.9,
  sideCardOpacity = 0.6,
  infoTextColor = "#FDFBF7", // Crema
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalMembers = members.length;

  const paginate = useCallback((newDirection: number) => {
    if (totalMembers === 0) return;
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + totalMembers) % totalMembers);
  }, [totalMembers]);

  const getVariantStyles = (position: string): TargetAndTransition => {
    const transition = {
      duration: animationDuration / 1000,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    };

    switch (position) {
      case 'center':
        return { zIndex: 10, opacity: 1, scale: 1.1, x: 0, filter: 'grayscale(0%)', transition };
      case 'right-1':
        return { zIndex: 5, opacity: sideCardOpacity, scale: sideCardScale, x: cardWidth * 0.8, filter: 'grayscale(100%)', transition };
      case 'left-1':
        return { zIndex: 5, opacity: sideCardOpacity, scale: sideCardScale, x: -cardWidth * 0.8, filter: 'grayscale(100%)', transition };
      default:
        return { zIndex: 0, opacity: 0, scale: 0.8, x: direction > 0 ? cardWidth * 1.5 : -cardWidth * 1.5, transition };
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative py-20 overflow-hidden">
      {/* Background Large Title */}
      <h2 className="font-serif text-7xl md:text-9xl font-black uppercase tracking-tighter absolute top-20 opacity-5 pointer-events-none whitespace-nowrap text-crema">
        {title}
      </h2>

      <div className="w-full max-w-6xl relative h-[500px] flex items-center justify-center">
        {/* Navigation */}
        <button onClick={() => paginate(-1)} className="absolute left-4 z-50 p-3 bg-white/5 rounded-full text-amber-gold hover:bg-white/10 transition-all"><ChevronLeft size={32}/></button>
        <button onClick={() => paginate(1)} className="absolute right-4 z-50 p-3 bg-white/5 rounded-full text-amber-gold hover:bg-white/10 transition-all"><ChevronRight size={32}/></button>

        {/* Cards */}
        <div className="relative w-full h-full flex justify-center items-center">
          <AnimatePresence initial={false}>
            {members.map((member, index) => {
              const diff = (index - currentIndex + totalMembers) % totalMembers;
              let pos = 'hidden';
              if (diff === 0) pos = 'center';
              else if (diff === 1) pos = 'right-1';
              else if (diff === totalMembers - 1) pos = 'left-1';

              if (pos === 'hidden') return null;

              return (
                <motion.div
                  key={member.id}
                  className="absolute bg-zinc-900 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
                  style={{ width: cardWidth, height: cardHeight }}
                  initial={getVariantStyles('hidden')}
                  animate={getVariantStyles(pos)}
                  exit={getVariantStyles('hidden')}
                >
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-xl font-bold text-crema">{member.name}</h3>
                    <p className="text-amber-gold text-sm uppercase tracking-widest">{member.role}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Info Display */}
      <motion.div 
        key={members[currentIndex].id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg px-6 mt-12"
      >
        <p className="text-ash italic leading-relaxed">"{members[currentIndex].bio}"</p>
      </motion.div>
    </div>
  );
};

export default TeamCarousel;