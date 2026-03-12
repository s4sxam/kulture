import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShoppingBag, X, Plus, Minus, Coffee, Droplet, Martini, 
  Utensils, Cake, MapPin, Phone, Navigation, Leaf, 
  Triangle, Menu as MenuIcon, Star, Search, Trash2
} from 'lucide-react';
import { motion, AnimatePresence, animate } from 'motion/react';

// 1. Data & Types
import { MENU_DATA, MenuItem, CartItem, Category } from './types';
import { cn } from './lib/utils';

// 2. Custom Components (Ensure these files exist in src/components/)
import { ThreeDImageRing } from './components/ThreeDImageRing';
import { ScrollTimeline, TimelineEvent } from './components/ScrollTimeline';
import ChainCarousel, { ChainItem } from './components/ChainCarousel';
import SparkleNavbar from './components/SparkleNavbar';

// --- Helper: CountUp Animation ---
const CountUp = ({ value, duration = 2, className, suffix = "" }: { value: number, duration?: number, className?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const controls = animate(0, value, {
      duration: duration,
      onUpdate: (latest) => setCount(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [value, duration]);
  return <span className={className}>{count.toLocaleString()}{suffix}</span>;
};

// --- Helper: Trusted Users Bar ---
const TrustedUsers = ({ avatars, totalUsersText = 14200 }: { avatars: string[], totalUsersText?: number }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-12 border-t border-white/5">
      <div className="flex -space-x-4">
        {avatars.map((src, i) => (
          <div key={i} className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-espresso border-2 border-amber-gold/20">
            <img src={src} alt="Guest" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center md:items-start gap-1">
        <div className="flex gap-1 text-amber-gold">
          {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}
        </div>
        <p className="text-ash text-sm">Joined by <CountUp value={totalUsersText} className="text-crema font-bold" suffix="+" /> Coffee Lovers</p>
      </div>
    </div>
  );
};

// --- Main App Component ---
type View = 'Home' | 'Gallery' | 'History';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('Home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Data Transformation ---
  const carouselItems: ChainItem[] = useMemo(() => 
    MENU_DATA.map(item => ({
      id: item.id,
      name: item.name,
      details: `₹${item.price} • ${item.category}`,
      logo: item.image,
      icon: Coffee
    })), []);

  const galleryImages = galleryImagesData; // Constant defined below
  const trustAvatars = ["https://i.pravatar.cc/150?u=1", "https://i.pravatar.cc/150?u=2", "https://i.pravatar.cc/150?u=3", "https://i.pravatar.cc/150?u=4"];

  // --- Cart Logic ---
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

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

  return (
    <div className="min-h-screen bg-espresso text-ash selection:bg-amber-gold">
      
      {/* 1. TOP NAVBAR (Sparkle Navigation) */}
      <nav className="fixed top-0 left-0 right-0 z-[100] glass h-24 flex items-center justify-between px-6 md:px-12">
        <h1 onClick={() => setCurrentView('Home')} className="font-serif text-3xl font-bold italic text-amber-gold cursor-pointer">Kulture</h1>
        
        <div className="hidden md:block">
          <SparkleNavbar 
            items={['Home', 'Gallery', 'History']} 
            activeIndex={['Home', 'Gallery', 'History'].indexOf(currentView)} 
            onNavigate={(i) => setCurrentView(['Home', 'Gallery', 'History'][i] as View)} 
          />
        </div>

        <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-amber-gold">
          <ShoppingBag size={24} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          )}
        </button>
      </nav>

      {/* 2. MAIN CONTENT (State-based Routing) */}
      <main className="pt-24">
        <AnimatePresence mode="wait">
          {currentView === 'Home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              
              {/* Dish Carousel & Search */}
              <section className="py-12 bg-black/20">
                <div className="text-center mb-4">
                    <span className="text-amber-gold text-xs font-bold tracking-[0.3em] uppercase">Quick Explore</span>
                </div>
                <ChainCarousel 
                  items={carouselItems} 
                  onChainSelect={(id) => {
                    const item = MENU_DATA.find(m => m.id === id);
                    if (item) addToCart(item);
                  }}
                />
              </section>

              {/* Standard Menu Explorer could go here... */}
              <div className="py-24 text-center">
                <h2 className="font-serif text-5xl text-crema italic">Where Art Meets Coffee.</h2>
                <p className="mt-6 text-ash max-w-xl mx-auto italic">Explore our specialty brews and continental bites above. Click a dish to add to cart.</p>
              </div>
            </motion.div>
          )}

          {currentView === 'Gallery' && (
            <motion.div key="gallery" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-screen flex items-center justify-center">
               <ThreeDImageRing images={galleryImages} />
            </motion.div>
          )}

          {currentView === 'History' && (
            <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <ScrollTimeline events={historyEvents} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. FOOTER (Location + Trust Bar) */}
      <footer id="location" className="bg-black/40 py-24 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="bg-zinc-900/50 p-8 rounded-[2rem] border border-white/5 text-left">
              <h4 className="text-crema font-bold uppercase text-sm mb-4 tracking-widest">Our Heritage Home</h4>
              <p className="text-ash mb-8">3rd Floor, Chowringhee Mansion, 30, JN Rd, Kolkata 700016</p>
              <div className="flex gap-4">
                <a href="tel:+919448040531" className="flex-grow py-4 bg-amber-gold text-espresso font-bold rounded-2xl text-center text-xs uppercase tracking-widest">Call Cafe</a>
                <a href="https://maps.app.goo.gl/ysgZW14ugurjL25s9" target="_blank" className="flex-grow py-4 border border-amber-gold text-amber-gold font-bold rounded-2xl text-center text-xs uppercase tracking-widest">Directions</a>
              </div>
            </div>
            <div className="h-64 rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.340232468305!2d88.35032047596205!3d22.55140663388726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02771234567891%3A0x1234567890abcdef!2sKulture%20-%20Specialty%20Coffee!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}></iframe>
            </div>
          </div>

          <TrustedUsers avatars={trustAvatars} totalUsersText={14200} />

          <div className="mt-12 text-center">
            <h1 className="font-serif text-3xl font-bold italic text-amber-gold mb-4">Kulture</h1>
            <p className="text-ash/40 text-xs uppercase tracking-[0.4em]">© 2026 Kulture Kolkata. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* 4. CART DRAWER (Kept same as original) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-zinc-900 z-[201] flex flex-col">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="font-serif text-2xl italic text-crema">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)}><X /></button>
              </div>
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? <p className="text-center opacity-50 italic pt-20">Your cart is empty</p> : cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="text-left">
                      <h4 className="text-crema font-bold text-sm uppercase">{item.name}</h4>
                      <p className="text-amber-gold font-bold">₹{item.price * item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-espresso px-3 py-1 rounded-full border border-white/5">
                      <button onClick={() => removeFromCart(item.id)}><Minus size={14} /></button>
                      <span className="text-crema">{item.quantity}</span>
                      <button onClick={() => addToCart(item)}><Plus size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/5 bg-espresso/50">
                   <button onClick={() => window.open(`https://wa.me/919448040531?text=${encodeURIComponent(`New Order Total: ₹${cartTotal}`)}`)} className="w-full py-4 bg-green-600 text-white font-bold rounded-xl uppercase tracking-widest">Order via WhatsApp</button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Data Constants ---
const galleryImagesData = [
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800",
  "https://images.unsplash.com/photo-1501339817302-444d383723b0?q=80&w=800",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800"
];

const historyEvents: TimelineEvent[] = [
  { year: "2021", title: "The Vision Born", description: "Kulture was conceptualized in a heritage attic." },
  { year: "2022", title: "First Pour", description: "Opened doors at Chowringhee Mansion." },
  { year: "2024", title: "Cultural Icon", description: "Recognized as Kolkata's premium specialty space." }
];