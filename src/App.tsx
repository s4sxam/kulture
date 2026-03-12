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

// ─── Menu Page Component ──────────────────────────────────────────────────────
const MenuPage = ({ onAddToCart }: { onAddToCart: (item: MenuItem) => void }) => {
  const categories: Category[] = ['Espresso Bar', 'Manual Brews', 'Sober Bar', 'Continental Bites', 'Desserts'];
  const [activeCategory, setActiveCategory] = useState<Category>('Espresso Bar');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h2 className="font-serif text-4xl md:text-6xl text-crema italic mb-6">The Menu</h2>
        <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar pb-6 px-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                activeCategory === cat ? "bg-amber-gold text-espresso shadow-lg shadow-amber-gold/20" : "bg-white/5 text-ash hover:bg-white/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {MENU_DATA.filter(i => i.category === activeCategory).map(item => (
          <motion.div layout key={item.id} className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:border-amber-gold transition-colors">
            {item.image && <img src={item.image} className="w-full h-44 object-cover opacity-80" alt={item.name} />}
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-crema font-bold text-base md:text-lg leading-tight">{item.name}</h3>
                <span className="text-amber-gold font-bold text-sm ml-2">₹{item.price}</span>
              </div>
              <p className="text-ash text-[11px] leading-relaxed mb-6 line-clamp-2">{item.description}</p>
              <button 
                onClick={() => onAddToCart(item)}
                className="w-full py-3 rounded-xl bg-amber-gold text-espresso font-black text-[10px] uppercase tracking-widest transition-transform active:scale-95"
              >
                Add to Order
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── Main App Controller ──────────────────────────────────────────────────
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
    <div className="min-h-screen bg-espresso text-ash selection:bg-amber-gold w-full overflow-x-hidden">
      
      {/* ═══════════════ FIXED NAVBAR FIX ═══════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-[9999] glass h-16 md:h-20 flex items-center justify-between px-4 md:px-12 w-full">
        <h1 
          onClick={() => navigate('Home')}
          className="font-serif text-xl sm:text-2xl md:text-3xl font-bold italic text-amber-gold cursor-pointer shrink-0 select-none"
        >
          Kulture
        </h1>

        {/* Laptop: Sparkle Menu */}
        <div className="hidden lg:block">
          <SparkleNavbar
            items={navItems}
            activeIndex={navItems.indexOf(currentView)}
            onNavigate={(i) => navigate(navItems[i])}
          />
        </div>

        {/* Action Icons: Added shrink-0 and gap fixing */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="relative p-2 text-amber-gold hover:text-crema transition-colors active:scale-90"
          >
            <ShoppingBag size={20} className="md:w-6 md:h-6" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[9px] font-black w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center border border-espresso"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="lg:hidden p-2 text-ash active:scale-90"
          >
            {isMobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </nav>

      {/* ═══════════════ MOBILE MENU DROPDOWN ═══════════════ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-[9998] bg-zinc-950/95 backdrop-blur-2xl border-b border-white/10 lg:hidden p-8 shadow-2xl"
          >
            <div className="flex flex-col gap-6 text-center">
              {navItems.map(item => (
                <button 
                  key={item} 
                  onClick={() => navigate(item)}
                  className={cn("text-xl font-bold uppercase tracking-[0.3em] transition-all", currentView === item ? "text-amber-gold" : "text-ash/50")}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════ MAIN CONTENT ═══════════════ */}
      <main className="pt-16 md:pt-20 w-full">
        <AnimatePresence mode="wait">
          {currentView === 'Home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
              
              <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-16">
                <div className="max-w-4xl mx-auto">
                  <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-amber-gold text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-6">Chowringhee Mansion, Kolkata</motion.p>
                  <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="font-serif text-4xl md:text-8xl text-crema italic font-bold leading-tight mb-8">Where Art<br />Meets Coffee.</motion.h2>
                  <div className="flex flex-col sm:flex-row justify-center gap-4 px-10">
                    <button onClick={() => navigate('Menu')} className="bg-amber-gold text-espresso px-8 py-3.5 rounded-full font-black uppercase tracking-widest text-xs">Order Now</button>
                    <button onClick={() => navigate('History')} className="bg-white/5 border border-white/10 text-crema px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs">Our Story</button>
                  </div>
                </div>
              </section>

              <section className="py-12 md:py-20 bg-black/20 overflow-hidden">
                 <ChainCarousel
                  items={MENU_DATA.map(i => ({ id: i.id, name: i.name, details: `₹${i.price}`, icon: Coffee, logo: i.image }))}
                  onChainSelect={(id) => {
                    const item = MENU_DATA.find(m => m.id === id);
                    if (item) { addToCart(item); setIsCartOpen(true); }
                  }}
                />
              </section>

              <TrustedUsers avatars={['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2', 'https://i.pravatar.cc/150?u=3']} totalUsersText={14200} />
            </motion.div>
          )}

          {currentView === 'Menu' && <MenuPage key="menu" onAddToCart={addToCart} />}
          {currentView === 'Gallery' && <div key="gallery" className="py-20 h-[80vh] w-full"><ThreeDImageRing images={GALLERY_IMAGES} /></div>}
          {currentView === 'Team' && <div key="team" className="w-full"><TeamCarousel members={TEAM_MEMBERS} /></div>}
          {currentView === 'History' && <div key="history" className="w-full"><ScrollTimeline events={HISTORY_EVENTS} /></div>}
        </AnimatePresence>
      </main>

      {/* ═══════════════ RESPONSIVE FOOTER ═══════════════ */}
      <footer className="bg-zinc-950 border-t border-white/5 py-12 px-6 md:px-12 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h1 className="font-serif text-2xl text-amber-gold italic mb-4">Kulture</h1>
            <p className="text-ash text-xs leading-relaxed max-w-xs">Premium specialty coffee and sober bar experience in the heart of Kolkata.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-crema font-bold uppercase text-[10px] tracking-widest mb-4">Visit Us</h4>
            <a href="tel:+919448040531" className="flex items-center gap-3 text-xs hover:text-amber-gold transition-colors"><Phone size={14}/> +91 94480 40531</a>
            <p className="flex items-center gap-3 text-xs"><MapPin size={14}/> Chowringhee Mansion, Kolkata</p>
          </div>
          <div>
            <h4 className="text-crema font-bold uppercase text-[10px] tracking-widest mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full text-ash hover:text-amber-gold"><Instagram size={18}/></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center sm:text-left">
          <p className="text-ash/30 text-[9px] uppercase tracking-[0.4em]">© 2026 Kulture Kolkata. All Rights Reserved.</p>
        </div>
      </footer>

      {/* ═══════════════ FULL SCREEN MOBILE CART ═══════════════ */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/90 z-[10000] backdrop-blur-md" />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
              className="fixed top-0 right-0 h-full w-full md:max-w-md bg-zinc-950 z-[10001] border-l border-white/10 flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="font-serif text-xl text-crema italic">Your Order</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2"><X size={24}/></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? <p className="text-center italic opacity-30 mt-20">Cart is empty</p> : cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                    <div className="pr-4">
                      <h4 className="text-crema font-bold text-xs uppercase mb-1">{item.name}</h4>
                      <p className="text-amber-gold font-bold text-sm">₹{item.price * item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-4 bg-espresso px-3 py-1.5 rounded-full border border-white/10">
                      <button onClick={() => removeFromCart(item.id)} className="p-1"><Minus size={12}/></button>
                      <span className="text-crema font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="p-1"><Plus size={12}/></button>
                    </div>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-black/40">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-ash uppercase tracking-widest text-[10px]">Total Amount</span>
                    <span className="text-crema font-serif text-2xl italic font-bold">₹{cart.reduce((s,i) => s + i.price*i.quantity, 0)}</span>
                  </div>
                  <button onClick={() => window.open(`https://wa.me/919448040531?text=New Order: ${cart.map(i => `${i.name} (x${i.quantity})`).join(', ')}`)} className="w-full py-4 bg-amber-gold text-espresso font-black rounded-xl uppercase tracking-widest text-xs">Checkout on WhatsApp</button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}