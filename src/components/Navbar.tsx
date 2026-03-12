import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import SparkleNavbar from './SparkleNavbar';
import { HamburgerMenuOverlay } from './HamburgerMenuOverlay';
import { View } from '../App';

export const Navbar = ({
  currentView, navigate, navItems, totalCartItems, setIsCartOpen, isMobileMenuOpen, setIsMobileMenuOpen
}: {
  currentView: View; navigate: (v: View) => void; navItems: View[]; totalCartItems: number;
  setIsCartOpen: (v: boolean) => void; isMobileMenuOpen: boolean; setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  // Map the views to the format the new menu expects
  const menuItems = navItems.map(view => ({
    label: view,
    onClick: () => navigate(view),
    isActive: currentView === view
  }));

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] glass h-16 sm:h-20 flex items-center justify-between px-4 sm:px-8 md:px-12">
      <h1
        onClick={() => navigate('Home')}
        className="font-serif text-2xl sm:text-3xl font-bold italic text-amber-gold cursor-pointer hover:opacity-80 transition-opacity select-none z-[101]"
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

      <div className="flex items-center gap-1 sm:gap-2 z-[101]">
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

        {/* The New Animated Overlay Menu */}
        <div className="md:hidden">
          <HamburgerMenuOverlay 
            items={menuItems}
            isOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
};