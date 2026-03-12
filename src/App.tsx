import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ShoppingBag, X, Plus, Minus, Coffee, Menu as MenuIcon, ArrowRight, MapPin, Phone, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { MENU_DATA, MenuItem, CartItem, Category } from './types';
import { cn } from './lib/utils';

import { ThreeDImageRing } from './components/ThreeDImageRing';
import { ScrollTimeline, TimelineEvent } from './components/ScrollTimeline';
import ChainCarousel from './components/ChainCarousel';
import SparkleNavbar from './components/SparkleNavbar';
import TeamCarousel, { TeamMember } from './components/TeamCarousel';
import { TrustedUsers } from './components/TrustedUsers';

type View = 'Home' | 'Menu' | 'Gallery' | 'Team' | 'History';

// --- Shared Constants ---
const HISTORY_EVENTS: TimelineEvent[] = [
  { year: '2018', title: 'The Start', description: 'Started as a weekend pop-up in Kolkata.' },
  { year: '2020', title: 'Sober Bar', description: 'Launched Kolkata\'s first zero-proof menu.' },
  { year: '2023', title: 'Awarded', description: 'Named best specialty café by Condé Nast.' },
  { year: '2026', title: 'Legacy', description: 'Brewing with heart at Chowringhee Mansion.' },
];

const TEAM_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Arjun Mehta', role: 'Head Roaster', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400', bio: 'Expert in single-origin profiles.' },
  { id: '2', name: 'Sana Ray', role: 'Mixologist', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400', bio: 'Zero-proof drink architect.' },
];

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800',
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800',
  'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800',
  'https://images.unsplash.com/photo-1501339817302-444d383723b0?q=80&w=800',
];

// ─── RESPONSIVE MENU PAGE ──────────────────────────────────────────────────────
const MenuPage = ({ onAddToCart }: { onAddToCart: (item: MenuItem) => void }) => {
  const categories: Category[] = ['Espresso Bar', 'Manual Brews', 'Sober Bar', 'Continental Bites', 'Desserts'];
  const [activeCategory, setActiveCategory] = useState<Category>('Espresso Bar');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h2 className="font-serif text-4xl md:text-6xl text-crema italic mb-4">The Menu</h2>
        <div className="flex flex-wrap justify-center gap-2 overflow-x-auto no-scrollbar pb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                activeCategory === cat ? "bg-amber-gold text-espresso" : "bg-white/5 text-ash hover:bg-white/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MENU_DATA.filter(i => i.category === activeCategory).map(item => (
          <motion.div 
            layout 
            key={item.id} 
            className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:border-amber-gold/50 transition-colors"
          >
            {item.image && <img src={item.image} className="w-full h-48 object-cover opacity-80" alt={item.name} />}
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-crema font-bold text-lg">{item.name}</h3>
                <span className="text-amber-gold font-bold">₹{item.price}</span>
              </div>
              <p className="text-ash text-xs leading-relaxed mb-6 line-clamp-2">{item.description}</p>
              <button 
                onClick={() => onAddToCart(item)}
                className="w-full py-3 rounded-2xl bg-amber-gold/10 hover:bg-amber-gold text-amber-gold hover:text-espresso font-bold text-xs transition-all uppercase tracking-widest"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── RESPONSIVE APP CONTROLLER ──────────────────────────────────────────────────
export default function App() {
  const [currentView, setCurrentView] = useState<View>('Home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: View[] = ['Home', 'Menu', 'Gallery', 'Team', 'History'];
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const addToCart = (item: MenuItem | CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 } as CartItem];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i).filter(i => i.quantity > 0));
  };

  const navigate = (view: View) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-espresso text-ash selection:bg-amber-gold">
      
      {/* ═══════════════ RESPONSIVE NAVBAR ═══════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-[100] glass h-16 md:h-20 flex items-center justify-between px-4 md:px-12">
        <h1 
          onClick={() => navigate('Home')}
          className="font-serif text-2xl md:text-3xl font-bold italic text-amber-gold cursor-pointer"
        >
          Kulture
        </h1>

        {/* Laptop: Sparkle Menu | Mobile: Hidden */}
        <div className="hidden lg:block">
          <SparkleNavbar
            items={navItems}
            activeIndex={navItems.indexOf(currentView)}
            onNavigate={(i) => navigate(navItems[i])}
          />
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-amber-gold hover:text-crema">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-gold text-espresso text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          
          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-ash">
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </nav>

      {/* ═══════════════ MOBILE MENU DROPDOWN ═══════════════ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-[90] bg-zinc-950 border-b border-white/10 lg:hidden p-6"
          >
            <div className="flex flex-col gap-4">
              {navItems.map(item => (
                <button 
                  key={item} 
                  onClick={() => navigate(item)}
                  className={cn("text-left text-lg font-bold uppercase tracking-widest", currentView === item ? "text-amber-gold" : "text-ash")}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════ MAIN CONTENT ═══════════════ */}
      <main className="pt-16 md:pt-20">
        <AnimatePresence mode="wait">
          {currentView === 'Home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              
              {/* Responsive Hero */}
              <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20">
                <div className="max-w-4xl mx-auto">
                  <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-amber-gold text-xs font-bold tracking-[0.4em] uppercase mb-6">Chowringhee Mansion, Kolkata</motion.p>
                  <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="font-serif text-5xl md:text-8xl text-crema italic font-bold leading-tight mb-8">Where Art<br className="md:hidden" /> Meets Coffee.</motion.h2>
                  <div className="flex flex-col md:flex-row justify-center gap-4">
                    <button onClick={() => navigate('Menu')} className="bg-amber-gold text-espresso px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">Explore Menu</button>
                    <button onClick={() => navigate('History')} className="bg-white/5 border border-white/10 text-crema px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors">Our Story</button>
                  </div>
                </div>
              </section>

              {/* Responsive Search Carousel (Hidden slightly on tiny mobile, fixed for desktop) */}
              <section className="py-20 bg-black/20">
                 <ChainCarousel
                  items={MENU_DATA.map(i => ({ id: i.id, name: i.name, details: `₹${i.price}`, icon: Coffee, logo: i.image }))}
                  onChainSelect={(id) => {
                    const item = MENU_DATA.find(m => m.id === id);
                    if (item) { addToCart(item); setIsCartOpen(true); }
                  }}
                />
              </section>

              {/* Trust Section */}
              <TrustedUsers avatars={['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2', 'https://i.pravatar.cc/150?u=3']} totalUsersText={14200} />
            </motion.div>
          )}

          {currentView === 'Menu' && <MenuPage key="menu" onAddToCart={addToCart} />}
          
          {currentView === 'Gallery' && (
            <div key="gallery" className="py-20 h-[80vh]">
              <ThreeDImageRing images={GALLERY_IMAGES} />
            </div>
          )}

          {currentView === 'Team' && <TeamCarousel key="team" members={TEAM_MEMBERS} />}

          {currentView === 'History' && <ScrollTimeline key="history" events={HISTORY_EVENTS} />}
        </AnimatePresence>
      </main>

      {/* ═══════════════ RESPONSIVE FOOTER ═══════════════ */}
      <footer className="bg-zinc-950 border-t border-white/5 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h1 className="font-serif text-3xl text-amber-gold italic mb-4">Kulture</h1>
            <p className="text-ash text-sm leading-relaxed max-w-xs">Ultra-premium specialty coffee and sober bar experience in the heart of Kolkata's heritage area.</p>
          </div>
          <div>
            <h4 className="text-crema font-bold uppercase text-xs tracking-widest mb-6">Contact</h4>
            <div className="space-y-4">
              <a href="tel:+919448040531" className="flex items-center gap-3 text-ash hover:text-amber-gold transition-colors"><Phone size={16}/> +91 94480 40531</a>
              <p className="flex items-center gap-3 text-ash"><MapPin size={16}/> Park Street area, Kolkata, 700016</p>
            </div>
          </div>
          <div>
            <h4 className="text-crema font-bold uppercase text-xs tracking-widest mb-6">Hours</h4>
            <p className="text-ash text-sm">Mon - Sun: 8:30 AM - 10:30 PM</p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full text-ash hover:text-amber-gold"><Instagram size={20}/></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center md:text-left">
          <p className="text-ash/40 text-[10px] uppercase tracking-[0.5em]">© 2026 Kulture Kolkata. All Rights Reserved.</p>
        </div>
      </footer>

      {/* ═══════════════ RESPONSIVE CART ═══════════════ */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/80 z-[200] backdrop-blur-sm" />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
              className="fixed top-0 right-0 h-full w-full md:max-w-md bg-zinc-950 z-[210] border-l border-white/10 flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="font-serif text-2xl text-crema italic">Your Order</h2>
                <button onClick={() => setIsCartOpen(false)}><X size={24}/></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? <p className="text-center italic opacity-30 mt-20">Cart is empty</p> : cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                    <div>
                      <h4 className="text-crema font-bold text-sm uppercase">{item.name}</h4>
                      <p className="text-amber-gold font-bold">₹{item.price * item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-espresso px-3 py-1 rounded-full">
                      <button onClick={() => removeFromCart(item.id)}><Minus size={14}/></button>
                      <span className="text-crema font-bold">{item.quantity}</span>
                      <button onClick={() => addToCart(item)}><Plus size={14}/></button>
                    </div>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-black/20">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-ash uppercase tracking-widest text-xs">Total</span>
                    <span className="text-crema font-serif text-3xl italic font-bold">₹{cart.reduce((s,i) => s + i.price*i.quantity, 0)}</span>
                  </div>
                  <button onClick={() => window.open(`https://wa.me/919448040531?text=New Order Total: ₹${cart.reduce((s,i) => s + i.price*i.quantity, 0)}`)} className="w-full py-4 bg-amber-gold text-espresso font-black rounded-2xl uppercase tracking-[0.2em] text-sm">Order via WhatsApp</button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}