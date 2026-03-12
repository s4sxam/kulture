import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Coffee } from 'lucide-react';
import { CartItem } from '../types';

export const CartDrawer = ({
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
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 sm:inset-y-0 sm:left-auto sm:right-0 sm:w-full sm:max-w-md bg-zinc-950 border-t sm:border-t-0 sm:border-l border-white/10 z-[210] flex flex-col rounded-t-3xl sm:rounded-none"
            style={{ maxHeight: '92dvh', height: 'auto' }}
          >
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