// src/components/CartDrawer.tsx
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

  const handleWhatsAppOrder = () => {
    const phoneNumber = "919339577835"; // Your Krishnanagar Number
    const orderItems = cart.map(item => `• ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}`).join('\n');
    const message = encodeURIComponent(
      `*New Order from Jonaki*\n\n${orderItems}\n\n*Total: ₹${total}*\n\n_Please confirm availability and prep time._`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/70 z-[200] backdrop-blur-sm" />
          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 sm:inset-y-0 sm:left-auto sm:right-0 sm:w-full sm:max-w-md bg-zinc-950 border-t sm:border-t-0 sm:border-l border-white/10 z-[210] flex flex-col rounded-t-3xl sm:rounded-none"
            style={{ maxHeight: '92dvh', height: 'auto' }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="font-serif text-xl sm:text-2xl italic text-crema">Your Order</h2>
              <button onClick={onClose} className="p-2 text-ash hover:text-crema"><X size={18} /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-10 text-ash/50 italic text-sm">Cart is empty.</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3 bg-white/[0.04] rounded-xl p-3.5 border border-white/5">
                    <div className="flex-1 min-w-0">
                      <p className="text-crema font-medium text-sm truncate">{item.name}</p>
                      <p className="text-amber-gold text-xs">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => onRemove(item.id)} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-ash"><Minus size={11} /></button>
                      <span className="text-crema font-bold w-5 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => onAdd(item)} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-ash"><Plus size={11} /></button>
                    </div>
                    <p className="text-crema font-bold text-sm">₹{item.price * item.quantity}</p>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-6 border-t border-white/10 space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-ash uppercase tracking-widest text-xs">Total</span>
                  <span className="text-crema font-serif text-2xl font-bold italic">₹{total}</span>
                </div>
                <button 
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-amber-gold hover:bg-amber-gold/90 text-espresso font-bold py-4 rounded-full transition-all tracking-wide"
                >
                  Send Order via WhatsApp →
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};