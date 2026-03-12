import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Types & Data
import { MenuItem, CartItem } from './types';
import { HISTORY_EVENTS, TEAM_MEMBERS, GALLERY_IMAGES } from './data/content';

// Sections
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { MenuPage } from './components/MenuPage';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

// Base Components
import { ThreeDImageRing } from './components/ThreeDImageRing';
import { ScrollTimeline } from './components/ScrollTimeline';
import TeamCarousel from './components/TeamCarousel';

export type View = 'Home' | 'Menu' | 'Gallery' | 'Team' | 'History';

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

  return (
    <div className="min-h-screen bg-espresso text-ash selection:bg-amber-gold selection:text-espresso">
      
      <Navbar 
        currentView={currentView} navigate={navigate} navItems={navItems} 
        totalCartItems={totalCartItems} setIsCartOpen={setIsCartOpen}
        isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="pt-16 sm:pt-20">
        <AnimatePresence mode="wait">

          {currentView === 'Home' && <HomeView key="home" navigate={navigate} addToCart={addToCart} />}

          {currentView === 'Menu' && <MenuPage key="menu" onAddToCart={addToCart} />}

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

          {currentView === 'Team' && (
            <motion.div key="team" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }}>
              <div className="text-center pt-12 sm:pt-16 pb-4 px-4">
                <span className="text-amber-gold text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3 block">The People</span>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold italic text-crema">Meet The Team</h2>
              </div>
              <TeamCarousel members={TEAM_MEMBERS} />
            </motion.div>
          )}

          {currentView === 'History' && (
            <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ScrollTimeline events={HISTORY_EVENTS} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <Footer navItems={navItems} currentView={currentView} navigate={navigate} />

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