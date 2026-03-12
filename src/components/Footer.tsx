import React from 'react';
import { cn } from '../lib/utils';
import { View } from '../App';

export const Footer = ({ navItems, currentView, navigate }: { navItems: View[], currentView: View, navigate: (v: View) => void }) => {
  return (
    <footer className="bg-black/50 border-t border-white/5 pt-12 sm:pt-16 pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-12 mb-10 sm:mb-12">
          <div className="max-w-xs">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold italic text-amber-gold">Jonaki</h1>
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
            <p>Visit Us</p>
            <p>Krishnanagar WB</p>
            <p className="text-amber-gold/80 mt-1">Open 8 AM – 11 PM daily</p>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <p className="text-ash/30 text-[10px] uppercase tracking-widest">© 2026 Kulture Kolkata. All rights reserved.</p>
          <p className="text-ash/20 text-[10px]">Made by Tanay</p>
        </div>
      </div>
    </footer>
  );
};