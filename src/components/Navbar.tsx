import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Menu as MenuIcon } from 'lucide-react';
import SparkleNavbar from './SparkleNavbar';
import { cn } from '../lib/utils';
import { View } from '../App';

export const Navbar = ({
  currentView, navigate, navItems, totalCartItems, setIsCartOpen, isMobileMenuOpen, setIsMobileMenuOpen
}: {
  currentView: View; navigate: (v: View) => void; navItems: View[]; totalCartItems: number;
  setIsCartOpen: (v: boolean) => void; isMobileMenuOpen: boolean; setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

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
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  return (
    <>
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
    </>
  );
};