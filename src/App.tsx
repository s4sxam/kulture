import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShoppingBag, X, Plus, Minus, Coffee, Droplet, Martini, 
  Utensils, Cake, MapPin, Phone, Navigation, Leaf, 
  Triangle, Menu as MenuIcon, Star, History, Image as ImageIcon, Home
} from 'lucide-react';
import { motion, AnimatePresence, animate } from 'motion/react';

// Types & Data
import { MENU_DATA, MenuItem, CartItem, Category } from './types';

// Custom Components
import { ThreeDImageRing } from './components/ThreeDImageRing';
import { ScrollTimeline, TimelineEvent } from './components/ScrollTimeline';
import { cn } from './lib/utils';

// --- Page Components ---

// 1. HOME PAGE Component
const HomePage = ({ addToCart }: { addToCart: (item: MenuItem) => void }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('Espresso Bar');
  
  const categories: { name: Category; icon: React.ReactNode }[] = [
    { name: 'Espresso Bar', icon: <Coffee size={20} /> },
    { name: 'Manual Brews', icon: <Droplet size={20} /> },
    { name: 'Sober Bar', icon: <Martini size={20} /> },
    { name: 'Continental Bites', icon: <Utensils size={20} /> },
    { name: 'Desserts', icon: <Cake size={20} /> },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000" alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/40 via-espresso/60 to-espresso"></div>
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h2 initial={{ y: 30 }} animate={{ y: 0 }} className="font-serif text-5xl md:text-8xl font-bold italic text-crema mb-6">Where Art Meets Coffee.</motion.h2>
          <p className="text-ash text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">Specialty coffee and zero-proof mixology in Kolkata's heritage heart.</p>
          <a href="#menu-start" className="px-10 py-4 bg-amber-gold text-espresso font-bold rounded-full uppercase tracking-widest text-sm">Explore Menu</a>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu-start" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-6xl font-bold italic text-crema">THE MENU</h2>
        </div>
        <div className="flex overflow-x-auto pb-8 mb-12 gap-4 no-scrollbar justify-start md:justify-center">
          {categories.map((cat) => (
            <button key={cat.name} onClick={() => setActiveCategory(cat.name)} className={cn("flex items-center gap-2 px-6 py-3 rounded-full transition-all", activeCategory === cat.name ? 'bg-amber-gold text-espresso font-bold' : 'bg-white/5 text-ash hover:bg-white/10')}>
              {cat.icon}<span className="text-sm uppercase tracking-wider">{cat.name}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          {MENU_DATA.filter(item => item.category === activeCategory).map((item, idx) => (
            <motion.div key={item.id} layout className="group flex flex-col sm:flex-row gap-4 sm:gap-6">
              {item.image && <div className="w-full sm:w-24 h-48 sm:h-24 shrink-0 rounded-xl overflow-hidden border border-white/10"><img src={item.image} className="w-full h-full object-cover" /></div>}
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-crema font-bold text-lg">{item.name.toUpperCase()}</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-amber-gold font-bold">₹{item.price}</span>
                    <button onClick={() => addToCart(item)} className="w-8 h-8 rounded-full border border-amber-gold/30 flex items-center justify-center text-amber-gold hover:bg-amber-gold hover:text-espresso transition-all"><Plus size={16} /></button>
                  </div>
                </div>
                <p className="text-ash italic text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

// 2. GALLERY PAGE Component
const GalleryPage = () => {
  const images = [
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800",
    "https://images.unsplash.com/photo-1501339817302-444d383723b0?q=80&w=800",
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800",
    "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=800",
    "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800",
    "https://images.unsplash.com/photo-1521017432531-fbd92d744264?q=80&w=800",
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800",
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800"
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center overflow-hidden">
      <div className="text-center mb-12">
        <span className="text-amber-gold text-xs font-bold tracking-[0.3em] uppercase block mb-4">Visual Journey</span>
        <h2 className="font-serif text-5xl md:text-7xl font-bold italic text-crema">THE GALLERY</h2>
      </div>
      <div className="h-[600px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing">
        <ThreeDImageRing images={images} imageDistance={450} width={280} />
      </div>
      <p className="text-ash italic mt-8">Drag to rotate the collection</p>
    </motion.div>
  );
};

// 3. HISTORY PAGE Component
const HistoryPage = () => {
  const events: TimelineEvent[] = [
    { year: "2021", title: "The Vision Born", description: "Kulture conceptualized in a heritage attic." },
    { year: "2022", title: "First Pour", description: "Doors opened at Chowringhee Mansion." },
    { year: "2023", title: "Sober Revolution", description: "Kolkata's first high-end mocktail menu." },
    { year: "2024", title: "Heritage Award", description: "Recognized for cultural preservation." }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-24">
       <ScrollTimeline events={events} />
    </motion.div>
  );
};

// --- Main App Logic ---

type View = 'home' | 'gallery' | 'history';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity > 1) return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      return prev.filter(i => i.id !== id);
    });
  };

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  // Handle Scroll to top on view change
  useEffect(() => { window.scrollTo(0, 0); }, [currentView]);

  return (
    <div className="min-h-screen bg-espresso text-ash selection:bg-amber-gold selection:text-espresso">
      {/* Shared Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] glass h-20 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-crema" onClick={() => setIsMobileMenuOpen(true)}><MenuIcon size={24} /></button>
          <h1 onClick={() => setCurrentView('home')} className="font-serif text-2xl md:text-3xl font-bold italic text-amber-gold tracking-tight cursor-pointer">Kulture</h1>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase text-crema/70">
          <button onClick={() => setCurrentView('home')} className={cn("hover:text-amber-gold transition-colors", currentView === 'home' && "text-amber-gold")}>Home</button>
          <button onClick={() => setCurrentView('gallery')} className={cn("hover:text-amber-gold transition-colors", currentView === 'gallery' && "text-amber-gold")}>Gallery</button>
          <button onClick={() => setCurrentView('history')} className={cn("hover:text-amber-gold transition-colors", currentView === 'history' && "text-amber-gold")}>History</button>
          <a href="#location" className="hover:text-amber-gold transition-colors">Visit</a>
        </div>

        <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-amber-gold"><ShoppingBag size={24} />
          {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="fixed inset-0 z-[110] bg-espresso p-8 flex flex-col gap-8">
            <div className="flex justify-between items-center"><h1 className="font-serif text-3xl font-bold italic text-amber-gold">Kulture</h1><button onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button></div>
            <div className="flex flex-col gap-6 text-2xl font-serif italic text-crema">
              <button className="text-left" onClick={() => { setCurrentView('home'); setIsMobileMenuOpen(false); }}>Home</button>
              <button className="text-left" onClick={() => { setCurrentView('gallery'); setIsMobileMenuOpen(false); }}>Gallery</button>
              <button className="text-left" onClick={() => { setCurrentView('history'); setIsMobileMenuOpen(false); }}>History</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content Switcher */}
      <main>
        <AnimatePresence mode="wait">
          {currentView === 'home' && <HomePage key="home" addToCart={addToCart} />}
          {currentView === 'gallery' && <GalleryPage key="gallery" />}
          {currentView === 'history' && <HistoryPage key="history" />}
        </AnimatePresence>
      </main>

      {/* Shared Footer (always visible) */}
      <footer id="location" className="bg-black/40 py-24 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="bg-zinc-900/50 p-8 rounded-[2rem] border border-white/5 text-left">
              <h4 className="text-crema font-bold uppercase text-sm mb-4">Location</h4>
              <p className="text-ash mb-8">Chowringhee Mansion, 30, JN Rd, Kolkata 700016</p>
              <div className="flex gap-4">
                <a href="tel:+919448040531" className="px-8 py-3 bg-amber-gold text-espresso font-bold rounded-xl uppercase text-xs">Call Us</a>
                <button onClick={() => setCurrentView('history')} className="px-8 py-3 border border-amber-gold text-amber-gold rounded-xl uppercase text-xs">Our Story</button>
              </div>
            </div>
            <div className="h-64 rounded-[2rem] overflow-hidden border border-white/5">
               <iframe src="https://www.google.com/maps/embed?..." width="100%" height="100%" style={{ border: 0, filter: 'invert(90%)' }}></iframe>
            </div>
          </div>
          <h1 className="font-serif text-3xl font-bold italic text-amber-gold mb-2">Kulture</h1>
          <p className="text-ash/40 text-[10px] uppercase tracking-[0.4em]">© 2026 Kulture Kolkata.</p>
        </div>
      </footer>

      {/* Cart Drawer (omitted for brevity, keep your existing Cart logic here) */}
      {/* ... Add your Cart AnimatePresence block back here ... */}
    </div>
  );
}