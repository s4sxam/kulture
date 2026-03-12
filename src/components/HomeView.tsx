import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Coffee } from 'lucide-react';
import ChainCarousel from './ChainCarousel';
import SlidingLogoMarquee from './SlidingLogoMarquee'; // New Import
import { MENU_DATA, MenuItem } from '../types';
import { View } from '../App';

// Stylized content for the Marquee
const PARTNER_ITEMS =[
  { id: 'p1', content: <span className="font-serif italic text-lg opacity-60 tracking-wider">Condé Nast Traveller</span> },
  { id: 'p2', content: <span className="font-sans font-bold text-xs uppercase tracking-[0.3em] opacity-40">SCA Certified Roastery</span> },
  { id: 'p3', content: <span className="font-serif italic text-lg opacity-60 tracking-wider">Kolkata Foodies Choice</span> },
  { id: 'p4', content: <span className="font-sans font-bold text-xs uppercase tracking-[0.3em] opacity-40">Direct Trade Partner</span> },
  { id: 'p5', content: <span className="font-serif italic text-lg opacity-60 tracking-wider">The Telegraph Food Guide</span> },
  { id: 'p6', content: <span className="font-sans font-bold text-xs uppercase tracking-[0.3em] opacity-40">Artisanal Bakery Assoc.</span> },
];

export const HomeView = ({ navigate, addToCart }: { navigate: (v: View) => void; addToCart: (item: MenuItem) => void }) => {
  return (
    <motion.div 
      key="home" 
      className="w-full overflow-x-hidden" 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
    >
      {/* ... Hero and Stats sections remain exactly as they were ... */}

      {/* Chain Carousel section remains same */}

      {/* Feature Cards Section: "More Than a Café" */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-24 sm:pb-32">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-amber-gold text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Why Kulture</span>
          <h3 className="font-serif text-3xl sm:text-4xl italic text-crema font-bold">More Than a Café</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-24">
          {[
            { title: 'Single Origin', desc: 'Beans sourced directly from farms in Coorg, Araku, and beyond. Roasted weekly in-house.', emoji: '☕' },
            { title: 'Zero-Proof Bar', desc: 'Sophisticated cocktails — the experience, the ritual, the taste. Without the alcohol.', emoji: '🍹' },
            { title: 'Artisanal Kitchen', desc: 'From truffle crostini to Basque burnt cheesecake — every plate made from scratch, daily.', emoji: '🍽️' },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-amber-gold/30 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl mb-4">{card.emoji}</div>
              <h3 className="font-serif text-lg sm:text-xl text-crema italic mb-2">{card.title}</h3>
              <p className="text-ash text-xs sm:text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ═══════════════ NEW MARQUEE ADDED HERE ═══════════════ */}
        <div className="pt-8 border-t border-white/5">
          <p className="text-center text-ash/30 text-[9px] uppercase tracking-[0.4em] mb-8">As Seen In &amp; Partnered With</p>
          <SlidingLogoMarquee 
            items={PARTNER_ITEMS} 
            speed={2} 
            height="60px"
            className="opacity-80"
          />
        </div>
      </section>

      {/* CTA section remains same */}
    </motion.div>
  );
};