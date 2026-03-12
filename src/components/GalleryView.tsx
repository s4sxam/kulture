"use client";

import React from 'react';
import { motion } from 'motion/react';
import { ThreeDImageRing } from './ThreeDImageRing';
import SlidingCards, { CardContent } from './SlidingCards';
import { ImageTrailEffect } from './ImageTrailEffect';

// Branding updated for Jonaki
const JONAKI_QUESTIONS: CardContent[] = [
  { 
    id: 1, 
    title: "The Perfect Brew?", 
    description: "Do you prefer the clarity of a V60 Pourover or the velvety texture of a Flat White?" 
  },
  { 
    id: 2, 
    title: "Sober Bar Curious?", 
    description: "Have you tried our Zero-Proof G&T? All the botanicals, none of the alcohol." 
  },
  { 
    id: 3, 
    title: "Your Vibe?", 
    description: "Do you visit Jonaki for the quiet creative corner or the lively weekend spirit?" 
  },
  { 
    id: 4, 
    title: "First Bite?", 
    description: "Our Truffle Mushroom Crostini is a Krishnanagar favorite. Have you tried it yet?" 
  }
];

interface GalleryViewProps {
  images: string[];
}

export const GalleryView: React.FC<GalleryViewProps> = ({ images }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="min-h-screen pb-24"
    >
      {/* Page Header */}
      <div className="text-center pt-12 sm:pt-16 pb-6 sm:pb-8 px-4">
        <span className="text-amber-gold text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3 block">
          Visual Stories
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold italic text-crema">
          Gallery
        </h2>
        <p className="text-ash mt-3 text-xs sm:text-sm italic">
          Capturing the glow of Jonaki in Krishnanagar
        </p>
      </div>
      
      {/* 1. The 3D Image Ring */}
      <div className="w-full mb-20" style={{ height: 'clamp(300px, 60vh, 550px)' }}>
        <ThreeDImageRing images={images} />
      </div>

      {/* 2. Interactive Questions (Sliding Cards) */}
      <section className="max-w-4xl mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-12 border-y border-white/5">
        <div className="lg:w-1/2 text-center lg:text-left">
          <span className="text-amber-gold text-[10px] font-bold tracking-widest uppercase mb-4 block">
            Community
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-crema italic font-bold mb-4">
            We'd love to know...
          </h3>
          <p className="text-ash text-sm sm:text-base leading-relaxed">
            Jonaki is built on the stories and tastes of our guests. Swipe through these cards and share your thoughts next time you visit us in Krishnanagar.
          </p>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <SlidingCards cards={JONAKI_QUESTIONS} />
        </div>
      </section>

      {/* 3. Interactive Image Trail */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-20">
        <div className="text-center mb-10">
          <h3 className="font-serif text-2xl sm:text-3xl italic text-crema mb-2">
            Interactive Canvas
          </h3>
          <p className="text-ash/60 text-xs sm:text-sm">
            Move your cursor across the canvas to reveal the art of Jonaki
          </p>
        </div>
        <ImageTrailEffect 
          imageSources={images} 
          containerClassName="bg-white/[0.02] border border-white/5 h-[400px] sm:h-[500px]" 
          useFadeEffect={true}
        />
      </div>
    </motion.div>
  );
};

export default GalleryView;