import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Coffee } from 'lucide-react';
import ChainCarousel from './ChainCarousel';
import SlidingLogoMarquee from './SlidingLogoMarquee';
import { MENU_DATA, MenuItem } from '../types';
import { View } from '../App';

const PARTNER_ITEMS = [
  { id: 'p1', content: <span className="font-serif italic text-lg opacity-60">Condé Nast Traveller</span> },
  { id: 'p2', content: <span className="font-sans font-bold text-[10px] uppercase tracking-widest opacity-40">SCA Certified</span> },
  { id: 'p3', content: <span className="font-serif italic text-lg opacity-60">Krishnanagar Foodies</span> },
  { id: 'p4', content: <span className="font-sans font-bold text-[10px] uppercase tracking-widest opacity-40">Direct Trade</span> },
];

export const HomeView = ({ navigate, addToCart }: { navigate: (v: View) => void; addToCart: (item: MenuItem) => void }) => {
  return (
    <motion.div key="home" className="w-full overflow-x-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[55vh] sm:min-h-[65vh] text-center px-4 py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-espresso pointer-events-none" />
        <motion.p className="text-amber-gold text-[10px] font-bold tracking-[0.35em] uppercase mb-4">Specialty Coffee · Krishnanagar</motion.p>
        <motion.h2 className="font-serif text-4xl sm:text-7xl lg:text-8xl text-crema italic font-bold leading-tight mb-6">Where Light<br />Meets Coffee.</motion.h2>
        <p className="text-ash text-sm sm:text-base max-w-md mx-auto mb-10">Krishnanagar's signature artisan café. Artisan brews, zero-proof cocktails, and food made with soul.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={() => navigate('Menu')} className="bg-amber-gold text-espresso font-bold px-8 py-3.5 rounded-full">Explore Menu</button>
          <button onClick={() => navigate('History')} className="bg-white/5 text-crema font-semibold px-8 py-3.5 rounded-full border border-white/10">Our Story</button>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-black/30 border-y border-white/5 py-8">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          {[{ value: '8+', label: 'Years Glowing' }, { value: '50+', label: 'Menu Items' }, { value: '10K+', label: 'Happy Guests' }].map(s => (
            <div key={s.label}>
              <p className="font-serif text-2xl sm:text-4xl font-bold italic text-amber-gold">{s.value}</p>
              <p className="text-ash text-[9px] uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chain Carousel */}
      <section className="py-16 bg-black/20">
        <div className="text-center mb-10 px-4">
          <span className="text-amber-gold text-xs font-bold tracking-widest uppercase block mb-2">Quick Add</span>
          <h3 className="font-serif text-3xl italic text-crema">Add to Cart</h3>
        </div>
        <ChainCarousel items={MENU_DATA.map(i => ({ id: i.id, name: i.name, details: `₹${i.price}`, icon: Coffee, logo: i.image }))} onChainSelect={(id) => {
          const item = MENU_DATA.find(m => m.id === id);
          if (item) addToCart(item);
        }} />
      </section>

      {/* Feature Cards */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <h3 className="font-serif text-4xl italic text-crema text-center mb-14">More Than a Café</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {[{ title: 'Single Origin', desc: 'Beans sourced directly from farms. Roasted weekly in-house.', emoji: '☕' }, { title: 'Zero-Proof Bar', desc: 'Sophisticated cocktails without the alcohol.', emoji: '🍹' }, { title: 'Artisanal Kitchen', desc: 'Everything made from scratch, daily.', emoji: '🍽️' }].map((card, i) => (
            <motion.div key={i} className="bg-white/[0.04] border border-white/10 rounded-2xl p-8">
              <div className="text-4xl mb-4">{card.emoji}</div>
              <h3 className="font-serif text-xl text-crema italic mb-2">{card.title}</h3>
              <p className="text-ash text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="pt-10 border-t border-white/5">
          <SlidingLogoMarquee items={PARTNER_ITEMS} speed={1.5} height="60px" />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-4 sm:mx-auto max-w-5xl mb-20 bg-amber-gold/10 border border-amber-gold/20 rounded-3xl p-12 text-center">
        <h3 className="font-serif text-4xl italic text-crema font-bold mb-4">Visit Us in Krishnanagar</h3>
        <p className="text-ash text-sm mb-8">Nadia, West Bengal. Open daily 8 AM – 11 PM.</p>
        <button onClick={() => navigate('Menu')} className="bg-amber-gold text-espresso font-bold px-8 py-3 rounded-full flex items-center gap-2 mx-auto">Order Now <ArrowRight size={14}/></button>
      </section>
    </motion.div>
  );
};