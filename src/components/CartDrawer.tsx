import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus } from 'lucide-react';
import { CartItem } from '../types';

export const CartDrawer = ({ cart, isOpen, onClose, onAdd, onRemove, onDelete }: any) => {
  const total = cart.reduce((sum: any, i: any) => sum + i.price * i.quantity, 0);

  const handleWhatsAppOrder = () => {
    const phoneNumber = "919339577835";
    const orderItems = cart.map((item: any) => `• ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}`).join('\n');
    const message = encodeURIComponent(`*New Order from Jonaki*\n\n${orderItems}\n\n*Total: ₹${total}*`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  useEffect(() => { document.body.style.overflow = isOpen ? 'hidden' : ''; }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/70 z-[200] backdrop-blur-sm" />
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed bottom-0 right-0 sm:inset-y-0 sm:w-full sm:max-w-md bg-zinc-950 z-[210] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="font-serif text-2xl italic text-crema">Your Order</h2>
              <button onClick={onClose} className="p-2 text-ash hover:text-crema"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {cart.map((item: any) => (
                <div key={item.id} className="flex items-center gap-3 bg-white/[0.04] rounded-xl p-3 border border-white/5">
                  <div className="flex-1"><p className="text-crema text-sm">{item.name}</p><p className="text-amber-gold text-xs">₹{item.price}</p></div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => onRemove(item.id)} className="w-7 h-7 bg-white/10 rounded-full text-ash">-</button>
                    <span className="text-crema text-sm">{item.quantity}</span>
                    <button onClick={() => onAdd(item)} className="w-7 h-7 bg-white/10 rounded-full text-ash">+</button>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10">
                <div className="flex justify-between mb-4"><span className="text-ash uppercase text-xs">Total</span><span className="text-crema font-serif text-2xl font-bold">₹{total}</span></div>
                <button onClick={handleWhatsAppOrder} className="w-full bg-amber-gold text-espresso font-bold py-4 rounded-full">Send Order via WhatsApp</button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};