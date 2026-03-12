import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, X, Plus, Minus, Coffee, Menu as MenuIcon, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { MENU_DATA, MenuItem, CartItem, Category } from './types';
import { cn } from './lib/utils';

import { ThreeDImageRing } from './components/ThreeDImageRing';
import { ScrollTimeline, TimelineEvent } from './components/ScrollTimeline';
import ChainCarousel from './components/ChainCarousel';
import SparkleNavbar from './components/SparkleNavbar';
import TeamCarousel, { TeamMember } from './components/TeamCarousel';

type View = 'Home' | 'Menu' | 'Gallery' | 'Team' | 'History';

// ─── Data ──────────────────────────────────────────────────────────────────────

const HISTORY_EVENTS: TimelineEvent[] = [
  { year: '2018', title: 'The Seed is Planted', description: 'Two friends, a tiny rented kitchen, and an obsession with single-origin beans. Kulture begins as a weekend pop-up in South Kolkata.' },
  { year: '2019', title: 'Our First Home', description: 'We open our doors on Ballygunge Place — a 400 sq ft café with 8 seats, exposed brick walls, and a hand-built espresso bar.' },
  { year: '2020', title: 'The Sober Bar is Born', description: 'During lockdown we reimagined the cocktail experience. Sana Ray joins the team and launches our zero-proof botanical menu — a Kolkata first.' },
  { year: '2021', title: 'Continental Kitchen Opens', description: 'Chef David brings his European training to Kulture. Our kitchen expands, and the truffle mushroom crostini becomes our signature dish overnight.' },
  { year: '2023', title: 'Recognition & Growth', description: 'Named "Best Specialty Café in Eastern India" by Condé Nast Traveller. We expand to a second floor, doubling capacity while keeping our soul intact.' },
  { year: '2026', title: 'Still Brewing', description: "Today, Kulture is a community — of farmers, roasters, artists, and regulars. Every cup tells a story. We're just getting started." },
];

const TEAM_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Arjun Mehta', role: 'Head Roaster', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400', bio: 'With 12 years of experience in specialty coffee, Arjun ensures every bean at Kulture hits its flavor peak.' },
  { id: '2', name: 'Sana Ray', role: 'Lead Mixologist', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400', bio: 'The architect behind our Sober Bar. Sana blends botanicals and science to create zero-proof masterpieces.' },
  { id: '3', name: 'Chef David', role: 'Executive Chef', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400', bio: 'David brings a continental touch to our kitchen, focusing on artisanal sourdough and truffle infusions.' },
];

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600',
  'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600',
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=600',
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600',
  'https://images.unsplash.com/photo-1516743619420-154b70a65fea?q=80&w=600',
  'https://images.unsplash.com/photo-1533422902779-aff35862e462?q=80&w=600',
  'https://images.unsplash.com/photo-1572286258217-215cf8e2e11d?q=80&w=600',
];

const CATEGORY_COLORS: Record<Category, string> = {
  'Espresso Bar':      'border-amber-gold/50',
  'Manual Brews':      'border-emerald-600/50',
  'Sober Bar':         'border-purple-500/50',
  'Continental Bites': 'border-red-600/50',
  'Desserts':          'border-pink-500/50',
};

const CATEGORY_BADGE: Record<Category, string> = {
  'Espresso Bar':      'bg-amber-gold/10 text-amber-gold',
  'Manual Brews':      'bg-emerald-900/40 text-emerald-400',
  'Sober Bar':         'bg-purple-900/40 text-purple-400',
  'Continental Bites': 'bg-red-900/40 text-red-400',
  'Desserts':          'bg-pink-900/40 text-pink-400',
};

// ─── Menu Page ─────────────────────────────────────────────────────────────────

const MenuPage = ({ onAddToCart }: { onAddToCart: (item: MenuItem) => void }) => {
  const categories: Category[] = ['Espresso Bar', 'Manual Brews', 'Sober Bar', 'Continental Bites', 'Desserts'];
  const [activeCategory, setActiveCategory] = useState<Category>('Espresso Bar');
  const tabsRef = useRef<HTMLDivElement>(null);

  const filteredItems = MENU_DATA.filter(i => i.category === activeCategory);

  useEffect(() => {
    const activeBtn = tabsRef.current?.querySelector('[data-active="true"]') as HTMLElement;
    activeBtn?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [activeCategory]);

  return (
    <motion.div
      key="menu"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen py-10 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      <div className="text-center mb-8 sm:mb-12">
        <span className="text-amber-gold text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3 block">What We Serve</span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold italic text-crema">Our Menu</h2>
      </div>

      {/* Tabs — horizontally scrollable on mobile */}
      <div
        ref={tabsRef}
        className="flex gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-center"
        style={{ scrollbarWidth: 'none' }}
      >
        {categories.map(cat => (
          <button
            key={cat}
            data-active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'shrink-0 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-300',
              activeCategory === cat
                ? 'bg-amber-gold text-espresso border-amber-gold'
                : 'bg-white/5 text-ash border-white/10 hover:border-amber-gold/40 hover:text-crema'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={cn(
                'bg-white/[0.04] rounded-2xl border overflow-hidden transition-all duration-300 group',
                'hover:bg-white/[0.07] hover:shadow-lg hover:shadow-black/30',
                CATEGORY_COLORS[item.category]
              )}
            >
              {item.image && (
                <div className="h-40 sm:h-44 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="font-serif text-base sm:text-lg text-crema leading-snug">{item.name}</h3>
                  <span className={cn('shrink-0 mt-1 w-4 h-4 border flex items-center justify-center rounded-sm', item.isNonVeg ? 'border-red-500' : 'border-green-500')}>
                    <span className={cn('w-2 h-2 rounded-full block', item.isNonVeg ? 'bg-red-500' : 'bg-green-500')} />
                  </span>
                </div>
                <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full', CATEGORY_BADGE[item.category])}>
                  {item.category}
                </span>
                <p className="text-ash text-xs leading-relaxed mt-2 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-gold font-bold font-serif text-lg sm:text-xl">₹{item.price}</span>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="flex items-center gap-1.5 bg-amber-gold/10 hover:bg-amber-gold active:scale-95 text-amber-gold hover:text-espresso text-xs font-bold px-3 sm:px-4 py-2 rounded-full border border-amber-gold/40 hover:border-amber-gold transition-all duration-200"
                  >
                    <Plus size={12} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Cart Drawer ───────────────────────────────────────────────────────────────

const CartDrawer = ({
  cart, isOpen, onClose, onAdd, onRemove, onDelete,
}: {
  cart: CartItem[]; isOpen: boolean; onClose: () => void;
  onAdd: (item: CartItem) => void; onRemove: (id: string) => void; onDelete: (id: string) => void;
}) => {
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-[200] backdrop-blur-sm"
          />
          {/* Mobile: slides up from bottom. Desktop: slides in from right */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 sm:inset-y-0 sm:left-auto sm:right-0 sm:w-full sm:max-w-md bg-zinc-950 border-t sm:border-t-0 sm:border-l border-white/10 z-[210] flex flex-col rounded-t-3xl sm:rounded-none"
            style={{ maxHeight: '92dvh', height: 'auto' }}
          >
            {/* Mobile drag handle */}
            <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 shrink-0">
              <h2 className="font-serif text-xl sm:text-2xl italic text-crema">Your Order</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-ash hover:text-crema transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-3 min-h-0">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-center gap-3">
                  <Coffee size={36} className="text-ash/20" />
                  <p className="text-ash/50 italic text-sm">Your cart is empty.<br />Add something delicious.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3 bg-white/[0.04] rounded-xl p-3 sm:p-3.5 border border-white/5">
                    <div className="flex-1 min-w-0">
                      <p className="text-crema font-medium text-sm truncate">{item.name}</p>
                      <p className="text-amber-gold text-xs mt-0.5">₹{item.price} each</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={() => onRemove(item.id)} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-ash hover:text-crema hover:bg-white/20 transition-all active:scale-90">
                        <Minus size={11} />
                      </button>
                      <span className="text-crema font-bold w-5 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => onAdd(item)} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-ash hover:text-crema hover:bg-white/20 transition-all active:scale-90">
                        <Plus size={11} />
                      </button>
                      <button onClick={() => onDelete(item.id)} className="w-7 h-7 rounded-full bg-red-950/50 flex items-center justify-center text-red-400 hover:bg-red-900/60 transition-all active:scale-90 ml-0.5">
                        <X size={11} />
                      </button>
                    </div>
                    <p className="text-crema font-bold text-sm shrink-0 w-14 text-right">₹{item.price * item.quantity}</p>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-5 sm:px-6 py-4 sm:py-5 border-t border-white/10 shrink-0 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-ash uppercase tracking-widest text-xs">Total</span>
                  <span className="text-crema font-serif text-xl sm:text-2xl font-bold italic">₹{total}</span>
                </div>
                <button className="w-full bg-amber-gold hover:bg-amber-gold/90 active:bg-amber-gold/80 text-espresso font-bold py-3.5 rounded-full transition-all duration-200 tracking-wide text-sm sm:text-base">
                  Place Order →
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [currentView, setCurrentView] = useState<View>('Home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: View[] = ['Home', 'Menu', 'Gallery', 'Team', 'History'];
  const totalCartItems = cart.reduce((sum, i) => sum + i.quantity, 0);

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

  const deleteFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));

  const navigate = (view: View) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-mobile-menu]') && !target.closest('[data-hamburger]')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-espresso text-ash selection:bg-amber-gold selection:text-espresso">

      {/* ═══════════════ NAVBAR ═══════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-[100] glass h-16 sm:h-20 flex items-center justify-between px-4 sm:px-8 md:px-12">
        <h1
          onClick={() => navigate('Home')}
          className="font-serif text-2xl sm:text-3xl font-bold italic text-amber-gold cursor-pointer hover:opacity-80 transition-opacity select-none"
        >
          Kulture
        </h1>

        <div className="hidden md:block">
          <SparkleNavbar
            items={navItems}
            activeIndex={navItems.indexOf(currentView)}
            onNavigate={(i) => navigate(navItems[i])}
          />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-amber-gold hover:text-crema transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            <AnimatePresence>
              {totalCartItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-amber-gold text-espresso text-[9px] sm:text-[10px] font-black rounded-full flex items-center justify-center"
                >
                  {totalCartItems > 9 ? '9+' : totalCartItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            data-hamburger="true"
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 text-ash hover:text-crema transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={20} /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><MenuIcon size={20} /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ═══════════════ MOBILE DROPDOWN ═══════════════ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            data-mobile-menu="true"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-16 left-0 right-0 z-[99] bg-zinc-950/98 backdrop-blur-xl border-b border-white/10 md:hidden shadow-2xl"
          >
            <ul className="flex flex-col py-1">
              {navItems.map((view, i) => (
                <motion.li
                  key={view}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045 }}
                >
                  <button
                    onClick={() => navigate(view)}
                    className={cn(
                      'w-full text-left px-6 py-4 text-sm font-bold uppercase tracking-widest transition-colors flex items-center justify-between',
                      currentView === view ? 'text-amber-gold' : 'text-ash hover:text-crema'
                    )}
                  >
                    {view}
                    {currentView === view && <span className="w-1.5 h-1.5 rounded-full bg-amber-gold" />}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════ MAIN ═══════════════ */}
      <main className="pt-16 sm:pt-20">
        <AnimatePresence mode="wait">

          {/* HOME */}
          {currentView === 'Home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>

              {/* Hero */}
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

              {/* Stats */}
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

              {/* Chain Carousel */}
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

              {/* Feature Cards */}
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

              {/* CTA */}
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
          )}

          {/* MENU */}
          {currentView === 'Menu' && <MenuPage key="menu" onAddToCart={addToCart} />}

          {/* GALLERY */}
          {currentView === 'Gallery' && (
            <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-[calc(100dvh-64px)] sm:min-h-[calc(100dvh-80px)]">
              <div className="text-center pt-12 sm:pt-16 pb-6 sm:pb-8 px-4">
                <span className="text-amber-gold text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Visual Stories</span>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold italic text-crema">Gallery</h2>
                <p className="text-ash mt-3 text-xs sm:text-sm">Drag to spin · Hover to focus</p>
              </div>
              <div className="w-full" style={{ height: 'clamp(300px, 60vh, 600px)' }}>
                <ThreeDImageRing images={GALLERY_IMAGES} />
              </div>
            </motion.div>
          )}

          {/* TEAM */}
          {currentView === 'Team' && (
            <motion.div key="team" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }}>
              <div className="text-center pt-12 sm:pt-16 pb-4 px-4">
                <span className="text-amber-gold text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3 block">The People</span>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold italic text-crema">Meet The Team</h2>
              </div>
              <TeamCarousel members={TEAM_MEMBERS} />
            </motion.div>
          )}

          {/* HISTORY */}
          {currentView === 'History' && (
            <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ScrollTimeline events={HISTORY_EVENTS} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="bg-black/50 border-t border-white/5 pt-12 sm:pt-16 pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-12 mb-10 sm:mb-12">
            <div className="max-w-xs">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold italic text-amber-gold">Kulture</h1>
              <p className="text-ash text-xs sm:text-sm mt-3 leading-relaxed">
                Specialty coffee, zero-proof cocktails, and artisanal food.<br />Brewed with intention, served with warmth.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-y-2 gap-x-8">
              <p className="text-ash/40 text-[10px] uppercase tracking-widest col-span-2 sm:col-span-1 mb-1">Navigate</p>
              {navItems.map(v => (
                <button key={v} onClick={() => navigate(v)} className={cn('text-left text-sm transition-colors hover:text-amber-gold', currentView === v ? 'text-amber-gold' : 'text-ash/70')}>
                  {v}
                </button>
              ))}
            </div>
            <div className="text-sm text-ash/70 space-y-1.5">
              <p className="text-ash/40 text-[10px] uppercase tracking-widest mb-2">Visit Us</p>
              <p>Ballygunge Place</p>
              <p>South Kolkata, WB</p>
              <p className="text-amber-gold/80 mt-1">Open 8 AM – 11 PM daily</p>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
            <p className="text-ash/30 text-[10px] uppercase tracking-widest">© 2026 Kulture Kolkata. All rights reserved.</p>
            <p className="text-ash/20 text-[10px]">Made with ☕ in Kolkata</p>
          </div>
        </div>
      </footer>

      {/* ═══════════════ CART ═══════════════ */}
      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onAdd={addToCart}
        onRemove={removeFromCart}
        onDelete={deleteFromCart}
      />
    </div>
  );
}