import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingBag, X, Plus, Minus, Coffee, Menu as MenuIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { MENU_DATA, MenuItem, CartItem } from './types';
import { cn } from './lib/utils';

// Components
import { ThreeDImageRing } from './components/ThreeDImageRing';
import { ScrollTimeline } from './components/ScrollTimeline';
import ChainCarousel from './components/ChainCarousel';
import SparkleNavbar from './components/SparkleNavbar';
import TeamCarousel, { TeamMember } from './components/TeamCarousel';

type View = 'Home' | 'Gallery' | 'Team' | 'History';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('Home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- Mock Team Data ---
  const teamMembers: TeamMember[] = [
    { id: '1', name: 'Arjun Mehta', role: 'Head Roaster', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400', bio: 'With 12 years of experience in specialty coffee, Arjun ensures every bean at Kulture hits its flavor peak.' },
    { id: '2', name: 'Sana Ray', role: 'Lead Mixologist', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400', bio: 'The architect behind our Sober Bar. Sana blends botanicals and science to create zero-proof masterpieces.' },
    { id: '3', name: 'Chef David', role: 'Executive Chef', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400', bio: 'David brings a continental touch to our kitchen, focusing on artisanal sourdough and truffle infusions.' },
  ];

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const navItems = ['Home', 'Gallery', 'Team', 'History'];

  return (
    <div className="min-h-screen bg-espresso text-ash selection:bg-amber-gold">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] glass h-24 flex items-center justify-between px-6 md:px-12">
        <h1 onClick={() => setCurrentView('Home')} className="font-serif text-3xl font-bold italic text-amber-gold cursor-pointer">Kulture</h1>
        <div className="hidden md:block">
          <SparkleNavbar 
            items={navItems} 
            activeIndex={navItems.indexOf(currentView)} 
            onNavigate={(i) => setCurrentView(navItems[i] as View)} 
          />
        </div>
        <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-amber-gold"><ShoppingBag size={24} /></button>
      </nav>

      <main className="pt-24">
        <AnimatePresence mode="wait">
          {currentView === 'Home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <section className="py-12 bg-black/20">
                <ChainCarousel 
                   items={MENU_DATA.map(i => ({ id: i.id, name: i.name, details: `₹${i.price}`, icon: Coffee, logo: i.image }))} 
                   onChainSelect={(id) => {
                     const item = MENU_DATA.find(m => m.id === id);
                     if (item) addToCart(item);
                   }}
                />
              </section>
              <div className="text-center py-24">
                <h2 className="font-serif text-6xl text-crema italic">Where Art Meets Coffee.</h2>
              </div>
            </motion.div>
          )}

          {currentView === 'Gallery' && (
            <motion.div key="gallery" className="pt-10">
              <ThreeDImageRing images={MENU_DATA.map(i => i.image!).filter(Boolean)} />
            </motion.div>
          )}

          {currentView === 'Team' && (
            <motion.div key="team" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
               <TeamCarousel members={teamMembers} />
            </motion.div>
          )}

          {currentView === 'History' && (
            <motion.div key="history">
               <ScrollTimeline events={[]} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-black/40 py-12 text-center border-t border-white/5">
        <h1 className="font-serif text-3xl font-bold italic text-amber-gold">Kulture</h1>
        <p className="text-ash/40 text-xs uppercase tracking-widest mt-4">© 2026 Kulture Kolkata</p>
      </footer>
    </div>
  );
}