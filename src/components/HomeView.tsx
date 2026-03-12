import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Coffee } from 'lucide-react';
import ChainCarousel from './ChainCarousel';
import { MENU_DATA, MenuItem } from '../types';
import { View } from '../App';

export const HomeView = ({ navigate, addToCart }: { navigate: (v: View) => void; addToCart: (item: MenuItem) => void }) => {
  return (
    <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <section className="relative flex flex-col items-center justify-center min-h-[55vh] sm:min-h-[65vh] text-center px-4 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-espresso pointer-events-none" />
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="text-amber-gold text-[10px] sm:text-xs font-bold tracking-[0.35em] uppercase mb-4 sm:mb-6"
        >
          Specialty Coffee · Sober Bar · Continental Kitchen
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-crema italic font-bold leading-tight"
        >
          Where Art<br />Meets Coffee.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }}
          className="text-ash text-sm sm:text-base max-w-xs sm:max-w-md mt-4 sm:mt-6 leading-relaxed"
        >
          Kolkata's most loved specialty café. Artisan brews, zero-proof cocktails, and food made with soul.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-6 sm:px-0"
        >
          <button
            onClick={() => navigate('Menu')}
            className="flex items-center justify-center gap-2 bg-amber-gold hover:bg-amber-gold/90 active:bg-amber-gold/80 text-espresso font-bold px-7 sm:px-8 py-3.5 rounded-full transition-all text-sm tracking-wide"
          >
            Explore Menu <ArrowRight size={15} />
          </button>
          <button
            onClick={() => navigate('History')}
            className="bg-white/5 hover:bg-white/10 active:bg-white/15 text-crema font-semibold px-7 sm:px-8 py-3.5 rounded-full border border-white/10 transition-all text-sm"
          >
            Our Story
          </button>
        </motion.div>
      </section>

      <section className="bg-black/30 border-y border-white/5 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-2 sm:gap-4 text-center">
          {[
            { value: '8+', label: 'Years Brewing' },
            { value: '50+', label: 'Menu Items' },
            { value: '10K+', label: 'Happy Guests' },
          ].map(s => (
            <div key={s.label}>
              <p className="font-serif text-2xl sm:text-4xl font-bold italic text-amber-gold">{s.value}</p>
              <p className="text-ash text-[9px] sm:text-xs uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-black/20">
        <div className="text-center mb-6 sm:mb-10 px-4">
          <span className="text-amber-gold text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Quick Add</span>
          <h3 className="font-serif text-2xl sm:text-3xl italic text-crema">Browse &amp; Add to Cart</h3>
          <p className="text-ash/60 text-xs sm:text-sm mt-2">Click any item to add it instantly</p>
        </div>
        <ChainCarousel
          items={MENU_DATA.map(i => ({ id: i.id, name: i.name, details: `₹${i.price}`, icon: Coffee, logo: i.image }))}
          onChainSelect={(id) => {
            const item = MENU_DATA.find(m => m.id === id);
            if (item) addToCart(item);
          }}
        />
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-amber-gold text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Why Kulture</span>
          <h3 className="font-serif text-3xl sm:text-4xl italic text-crema font-bold">More Than a Café</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
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
      </section>

      <section className="mx-4 sm:mx-6 lg:mx-auto max-w-5xl mb-16 sm:mb-20 bg-amber-gold/10 border border-amber-gold/20 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center">
        <h3 className="font-serif text-2xl sm:text-4xl italic text-crema font-bold mb-3 sm:mb-4">Visit Us in Kolkata</h3>
        <p className="text-ash text-xs sm:text-sm max-w-sm mx-auto mb-6 sm:mb-8 leading-relaxed">
          Ballygunge Place, South Kolkata.<br />Open daily 8 AM – 11 PM.
        </p>
        <button
          onClick={() => navigate('Menu')}
          className="inline-flex items-center gap-2 bg-amber-gold hover:bg-amber-gold/90 text-espresso font-bold px-7 py-3 rounded-full text-sm transition-all"
        >
          Order Now <ArrowRight size={14} />
        </button>
      </section>
    </motion.div>
  );
};