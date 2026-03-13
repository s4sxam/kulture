import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { MENU_DATA, MenuItem, Category } from '../types';
import { cn } from '../lib/utils';
import { CATEGORY_COLORS, CATEGORY_BADGE } from '../data/content';
import { ScrollList } from './ScrollList';

export const MenuPage = ({ onAddToCart }: { onAddToCart: (item: MenuItem) => void }) => {
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
        >
          <ScrollList
            data={filteredItems as unknown[]}
            itemHeight={140}
            renderItem={(rawItem) => {
              const item = rawItem as MenuItem;
              return (
                <div
                  className={cn(
                    'h-full bg-white/[0.04] rounded-2xl border overflow-hidden transition-all duration-300 group flex',
                    'hover:bg-white/[0.07] hover:shadow-lg hover:shadow-black/30',
                    CATEGORY_COLORS[item.category]
                  )}
                >
                  {item.image && (
                    <div className="w-32 sm:w-40 shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-serif text-base sm:text-lg text-crema leading-snug">{item.name}</h3>
                        <span className={cn('shrink-0 mt-1 w-4 h-4 border flex items-center justify-center rounded-sm', item.isNonVeg ? 'border-red-500' : 'border-green-500')}>
                          <span className={cn('w-2 h-2 rounded-full block', item.isNonVeg ? 'bg-red-500' : 'bg-green-500')} />
                        </span>
                      </div>
                      <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full', CATEGORY_BADGE[item.category])}>
                        {item.category}
                      </span>
                      <p className="text-ash text-xs leading-relaxed mt-2 line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
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
              );
            }}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};