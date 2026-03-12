import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, X, Plus, Minus, Coffee, Menu as MenuIcon, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { MENU_DATA, MenuItem, CartItem, Category } from './types';
import { cn } from './lib/utils';

// Components
import { ThreeDImageRing } from './components/ThreeDImageRing';
import { ScrollTimeline, TimelineEvent } from './components/ScrollTimeline';
import ChainCarousel from './components/ChainCarousel';
import SparkleNavbar from './components/SparkleNavbar';
import TeamCarousel, { TeamMember } from './components/TeamCarousel';

type View = 'Home' | 'Menu' | 'Gallery' | 'Team' | 'History';

// ─── History Data ──────────────────────────────────────────────────────────────
const HISTORY_EVENTS: TimelineEvent[] = [
  {
    year: '2018',
    title: 'The Seed is Planted',
    description: 'Two friends, a tiny rented kitchen, and an obsession with single-origin beans. Kulture begins as a weekend pop-up in South Kolkata.',
  },
  {
    year: '2019',
    title: 'Our First Home',
    description: 'We open our doors on Ballygunge Place — a 400 sq ft café with 8 seats, exposed brick walls, and a hand-built espresso bar.',
  },
  {
    year: '2020',
    title: 'The Sober Bar is Born',
    description: 'During lockdown we reimagined the cocktail experience. Sana Ray joins the team and launches our zero-proof botanical menu — a Kolkata first.',
  },
  {
    year: '2021',
    title: 'Continental Kitchen Opens',
    description: 'Chef David brings his European training to Kulture. Our kitchen expands, and the truffle mushroom crostini becomes our signature dish overnight.',
  },
  {
    year: '2023',
    title: 'Recognition & Growth',
    description: 'Named "Best Specialty Café in Eastern India" by Condé Nast Traveller. We expand to a second floor, doubling capacity while keeping our soul intact.',
  },
  {
    year: '2026',
    title: 'Still Brewing',
    description: "Today, Kulture is a community — of farmers, roasters, artists, and regulars. Every cup tells a story. We're just getting started.",
  },
];

// ─── Team Data ─────────────────────────────────────────────────────────────────
const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Arjun Mehta',
    role: 'Head Roaster',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
    bio: 'With 12 years of experience in specialty coffee, Arjun ensures every bean at Kulture hits its flavor peak.',
  },
  {
    id: '2',
    name: 'Sana Ray',
    role: 'Lead Mixologist',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400',
    bio: 'The architect behind our Sober Bar. Sana blends botanicals and science to create zero-proof masterpieces.',
  },
  {
    id: '3',
    name: 'Chef David',
    role: 'Executive Chef',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400',
    bio: 'David brings a continental touch to our kitchen, focusing on artisanal sourdough and truffle infusions.',
  },
];

// ─── Gallery Images ────────────────────────────────────────────────────────────
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

// ─── Menu Category Colors ──────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<Category, string> = {
  'Espresso Bar': 'border-amber-gold/60',
  'Manual Brews': 'border-emerald-700/60',
  'Sober Bar': 'border-purple-500/60',
  'Continental Bites': 'border-red-700/60',
  'Desserts': 'border-pink-500/60',
};

// ─── Sub-components ────────────────────────────────────────────────────────────

const MenuPage = ({ onAddToCart }: { onAddToCart: (item: MenuItem) => void }) => {
  const categories: Category[] = ['Espresso Bar', 'Manual Brews', 'Sober Bar', 'Continental Bites', 'Desserts'];
  const [activeCategory, setActiveCategory] = useState<Category>('Espresso Bar');

  const filteredItems = MENU_DATA.filter(i => i.category === activeCategory);

  return (
    <motion.div
      key="menu"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen py-20 px-4 max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <span className="text-amber-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">What We Serve</span>
        <h2 className="font-serif text-5xl md:text-6xl font-bold italic text-crema">Our Menu</h2>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300',
              activeCategory === cat
                ? 'bg-amber-gold text-espresso border-amber-gold'
                : 'bg-white/5 text-ash border-white/10 hover:border-amber-gold/40 hover:text-crema'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={cn(
                'bg-white/[0.04] rounded-2xl border overflow-hidden hover:bg-white/[0.07] transition-colors group',
                CATEGORY_COLORS[item.category]
              )}
            >
              {item.image && (
                <div className="h-44 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-serif text-lg text-crema leading-snug">{item.name}</h3>
                  {item.isNonVeg && (
                    <span className="shrink-0 mt-1 w-4 h-4 border border-red-500 flex items-center justify-center rounded-sm">
                      <span className="w-2 h-2 rounded-full bg-red-500 block" />
                    </span>
                  )}
                </div>
                <p className="text-ash text-xs leading-relaxed mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-gold font-bold font-serif text-lg">₹{item.price}</span>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="flex items-center gap-1.5 bg-amber-gold/10 hover:bg-amber-gold text-amber-gold hover:text-espresso text-xs font-bold px-4 py-2 rounded-full border border-amber-gold/40 hover:border-amber-gold transition-all duration-200"
                  >
                    <Plus size={13} /> Add
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

const CartDrawer = ({
  cart,
  isOpen,
  onClose,
  onAdd,
  onRemove,
  onDelete,
}: {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: CartItem) => void;
  onRemove: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-zinc-950 border-l border-white/10 z-[210] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-serif text-2xl italic text-crema">Your Order</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-ash hover:text-crema transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <Coffee size={48} className="text-ash/30" />
                  <p className="text-ash italic">Your cart is empty.<br />Add something delicious.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 bg-white/[0.04] rounded-xl p-4 border border-white/5">
                    <div className="flex-1 min-w-0">
                      <p className="text-crema font-medium text-sm truncate">{item.name}</p>
                      <p className="text-amber-gold text-xs mt-0.5">₹{item.price} each</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => onRemove(item.id)} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-ash hover:text-crema hover:bg-white/20 transition-all">
                        <Minus size={12} />
                      </button>
                      <span className="text-crema font-bold w-5 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => onAdd(item)} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-ash hover:text-crema hover:bg-white/20 transition-all">
                        <Plus size={12} />
                      </button>
                      <button onClick={() => onDelete(item.id)} className="w-7 h-7 rounded-full bg-red-900/30 flex items-center justify-center text-red-400 hover:bg-red-900/60 transition-all ml-1">
                        <X size={12} />
                      </button>
                    </div>
                    <p className="text-crema font-bold text-sm shrink-0 w-16 text-right">₹{item.price * item.quantity}</p>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-ash uppercase tracking-widest text-xs">Total</span>
                  <span className="text-crema font-serif text-2xl font-bold italic">₹{total}</span>
                </div>
                <button className="w-full bg-amber-gold hover:bg-amber-gold/90 text-espresso font-bold py-3.5 rounded-full transition-all duration-200 tracking-wide">
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

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i).filter(i => i.quantity > 0)
    );
  };

  const deleteFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const navigate = (view: View) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-espresso text-ash selection:bg-amber-gold selection:text-espresso">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] glass h-20 flex items-center justify-between px-6 md:px-12">
        <h1 onClick={() => navigate('Home')} className="font-serif text-3xl font-bold italic text-amber-gold cursor-pointer hover:opacity-80 transition-opacity">
          Kulture
        </h1>

        <div className="hidden md:block">
          <SparkleNavbar
            items={navItems}
            activeIndex={navItems.indexOf(currentView)}
            onNavigate={(i) => navigate(navItems[i])}
          />
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-amber-gold hover:text-crema transition-colors" aria-label="Open cart">
            <ShoppingBag size={22} />
            {totalCartItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-amber-gold text-espresso text-[10px] font-black rounded-full flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </button>

          <button onClick={() => setIsMobileMenuOpen(prev => !prev)} className="md:hidden p-2 text-ash hover:text-crema transition-colors" aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 z-[99] bg-zinc-950/95 backdrop-blur-md border-b border-white/10 md:hidden"
          >
            <ul className="flex flex-col py-2">
              {navItems.map(view => (
                <li key={view}>
                  <button
                    onClick={() => navigate(view)}
                    className={cn(
                      'w-full text-left px-6 py-4 text-sm font-bold uppercase tracking-widest transition-colors',
                      currentView === view ? 'text-amber-gold' : 'text-ash hover:text-crema'
                    )}
                  >
                    {view}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <main className="pt-20">
        <AnimatePresence mode="wait">

          {/* HOME */}
          {currentView === 'Home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <section className="relative flex flex-col items-center justify-center min-h-[60vh] text-center px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-espresso pointer-events-none" />
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-amber-gold text-xs font-bold tracking-[0.4em] uppercase mb-6">
                  Specialty Coffee · Sober Bar · Continental Kitchen
                </motion.p>
                <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="font-serif text-5xl md:text-7xl lg:text-8xl text-crema italic font-bold leading-tight">
                  Where Art<br />Meets Coffee.
                </motion.h2>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mt-10 flex gap-4">
                  <button onClick={() => navigate('Menu')} className="bg-amber-gold hover:bg-amber-gold/90 text-espresso font-bold px-8 py-3.5 rounded-full transition-all text-sm tracking-wide">
                    Explore Menu
                  </button>
                  <button onClick={() => navigate('History')} className="bg-white/5 hover:bg-white/10 text-crema font-semibold px-8 py-3.5 rounded-full border border-white/10 transition-all text-sm">
                    Our Story
                  </button>
                </motion.div>
              </section>

              <section className="py-12 bg-black/20">
                <div className="text-center mb-8">
                  <p className="text-ash text-xs uppercase tracking-[0.3em]">Click a dish to add to cart</p>
                </div>
                <ChainCarousel
                  items={MENU_DATA.map(i => ({ id: i.id, name: i.name, details: `₹${i.price}`, icon: Coffee, logo: i.image }))}
                  onChainSelect={(id) => {
                    const item = MENU_DATA.find(m => m.id === id);
                    if (item) addToCart(item);
                  }}
                />
              </section>

              <section className="max-w-5xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Single Origin', desc: 'Beans sourced directly from farms in Coorg, Araku, and beyond.', emoji: '☕' },
                  { title: 'Zero-Proof Bar', desc: 'Sophisticated cocktails — the experience without the alcohol.', emoji: '🍹' },
                  { title: 'Artisanal Kitchen', desc: 'From sourdough to truffle — every plate made from scratch.', emoji: '🍽️' },
                ].map(card => (
                  <div key={card.title} className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 hover:border-amber-gold/30 transition-colors">
                    <div className="text-4xl mb-4">{card.emoji}</div>
                    <h3 className="font-serif text-xl text-crema italic mb-2">{card.title}</h3>
                    <p className="text-ash text-sm leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </section>
            </motion.div>
          )}

          {/* MENU */}
          {currentView === 'Menu' && <MenuPage key="menu" onAddToCart={addToCart} />}

          {/* GALLERY */}
          {currentView === 'Gallery' && (
            <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-[calc(100vh-80px)]">
              <div className="text-center pt-16 pb-8 px-4">
                <span className="text-amber-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Visual Stories</span>
                <h2 className="font-serif text-5xl md:text-6xl font-bold italic text-crema">Gallery</h2>
                <p className="text-ash mt-4 text-sm">Drag to spin the ring</p>
              </div>
              <div className="w-full" style={{ height: '70vh' }}>
                <ThreeDImageRing images={GALLERY_IMAGES} />
              </div>
            </motion.div>
          )}

          {/* TEAM */}
          {currentView === 'Team' && (
            <motion.div key="team" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
              <div className="text-center pt-16 pb-4 px-4">
                <span className="text-amber-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">The People</span>
                <h2 className="font-serif text-5xl md:text-6xl font-bold italic text-crema">Meet The Team</h2>
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

      {/* ── Footer ── */}
      <footer className="bg-black/40 py-16 text-center border-t border-white/5">
        <h1 className="font-serif text-4xl font-bold italic text-amber-gold">Kulture</h1>
        <p className="text-ash text-xs mt-2">Specialty Coffee · Sober Bar · Continental Kitchen</p>
        <div className="flex justify-center gap-8 mt-8 text-ash/50 text-xs uppercase tracking-widest">
          {navItems.map(v => (
            <button key={v} onClick={() => navigate(v)} className="hover:text-amber-gold transition-colors">{v}</button>
          ))}
        </div>
        <p className="text-ash/30 text-xs uppercase tracking-widest mt-8">© 2026 Kulture Kolkata</p>
      </footer>

      {/* ── Cart Drawer ── */}
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