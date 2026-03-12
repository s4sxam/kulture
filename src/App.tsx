import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Heart, Sparkles, MessageSquare } from 'lucide-react';

// Data & Components
import { MenuItem, CartItem } from './types';
import { HISTORY_EVENTS, TEAM_MEMBERS, GALLERY_IMAGES } from './data/content';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { MenuPage } from './components/MenuPage';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ThreeDImageRing } from './components/ThreeDImageRing';
import { ScrollTimeline } from './components/ScrollTimeline';
import TeamCarousel from './components/TeamCarousel';
import { ImageTrailEffect } from './components/ImageTrailEffect';
import SlidingCards from './components/SlidingCards';

export type View = 'Home' | 'Menu' | 'Gallery' | 'Team' | 'History';

const KULTURE_TALK = [
  { id: 1, text: "How's your brew today? V60 clarity or Flat White velvet?", icon: <Coffee size={32} /> },
  { id: 2, text: "Sweet or Savory? Basque Cheesecake or Truffle Crostini?", icon: <Sparkles size={32} /> },
  { id: 3, text: "Mocktail or Coffee? Or a bit of both for the vibe?", icon: <Heart size={32} /> },
  { id: 4, text: "Tag us in your visual stories. We love seeing Kulture through your lens.", icon: <MessageSquare size={32} /> },
];

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
            <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen pb-24">
              <div className="text-center pt-12 sm:pt-16 pb-6 sm:pb-8 px-4">
                <span className="text-amber-gold text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Visual Stories</span>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold italic text-crema">Gallery</h2>
              </div>
              
              {/* Section 1: 3D Image Ring */}
              <div className="w-full mb-20" style={{ height: '500px' }}>
                <ThreeDImageRing images={GALLERY_IMAGES} />
              </div>

              {/* Section 2: Image Trail Effect */}
              <div className="max-w-5xl mx-auto px-4 mb-24">
                <div className="text-center mb-8">
                  <h3 className="font-serif text-2xl sm:text-3xl italic text-crema">Interactive Canvas</h3>
                  <p className="text-ash/60 text-xs mt-2">Swipe across to reveal the moments</p>
                </div>
                <ImageTrailEffect 
                  imageSources={GALLERY_IMAGES} 
                  containerClassName="bg-white/[0.02] border border-white/5" 
                />
              </div>

              {/* Section 3: Sliding Conversation Cards */}
              <div className="max-w-md mx-auto px-4">
                <div className="text-center mb-10">
                  <span className="text-amber-gold text-[10px] font-bold tracking-[0.3em] uppercase mb-2 block">Kulture Talk</span>
                  <h3 className="font-serif text-2xl italic text-crema">Let's Connect</h3>
                </div>
                <SlidingCards cards={KULTURE_TALK} />
              </div>
            </motion.div>
          )}

          {currentView === 'Team' && (
            <motion.div key="team" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
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
        cart={cart} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}
        onAdd={addToCart} onRemove={removeFromCart} onDelete={deleteFromCart}
      />
    </div>
  );
}