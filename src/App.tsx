import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  X, 
  Plus, 
  Minus, 
  Coffee, 
  Droplet, 
  Martini, 
  Utensils, 
  Cake, 
  MapPin, 
  Phone, 
  Navigation,
  Leaf,
  Triangle,
  Menu as MenuIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_DATA, MenuItem, CartItem, Category } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('Espresso Bar');
  const[cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cart Logic
  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return[...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const clearCart = () => setCart([]);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const handleWhatsAppCheckout = () => {
    const phone = "919448040531";
    const orderSummary = cart.map(item => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`).join('\n');
    const message = `*New Order from Kulture*\n\n${orderSummary}\n\n*Total: ₹${cartTotal}*\n\nThank you!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const categories: { name: Category; icon: React.ReactNode }[] =[
    { name: 'Espresso Bar', icon: <Coffee size={20} /> },
    { name: 'Manual Brews', icon: <Droplet size={20} /> },
    { name: 'Sober Bar', icon: <Martini size={20} /> },
    { name: 'Continental Bites', icon: <Utensils size={20} /> },
    { name: 'Desserts', icon: <Cake size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-espresso selection:bg-amber-gold selection:text-espresso">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass h-20 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden text-crema"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <MenuIcon size={24} />
          </button>
          <h1 className="font-serif text-2xl md:text-3xl font-bold italic text-amber-gold tracking-tight">Kulture</h1>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase text-crema/70">
          <a href="#home" className="hover:text-amber-gold transition-colors">Home</a>
          <a href="#menu" className="hover:text-amber-gold transition-colors">Menu</a>
          <a href="#vibe" className="hover:text-amber-gold transition-colors">Vibe</a>
          <a href="#location" className="hover:text-amber-gold transition-colors">Location</a>
        </div>

        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 text-amber-gold hover:scale-110 transition-transform"
        >
          <ShoppingBag size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
              {cartCount}
            </span>
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-[60] bg-espresso p-8 flex flex-col gap-8"
          >
            <div className="flex justify-between items-center">
              <h1 className="font-serif text-3xl font-bold italic text-amber-gold">Kulture</h1>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-crema"><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-6 text-2xl font-serif italic text-crema">
              <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
              <a href="#menu" onClick={() => setIsMobileMenuOpen(false)}>Menu</a>
              <a href="#vibe" onClick={() => setIsMobileMenuOpen(false)}>Vibe</a>
              <a href="#location" onClick={() => setIsMobileMenuOpen(false)}>Location</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000" 
            alt="Kulture Interior" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/40 via-espresso/60 to-espresso"></div>
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-8xl font-bold italic text-crema mb-6"
          >
            Where Art Meets Coffee.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-ash text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
          >
            Specialty coffee, continental cuisine, and zero-proof mixology in the heart of Kolkata's heritage.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a 
              href="#menu" 
              className="px-10 py-4 bg-amber-gold text-espresso font-bold rounded-full hover:bg-crema transition-colors uppercase tracking-widest text-sm"
            >
              Explore Menu
            </a>
            <a 
              href="tel:+919448040531" 
              className="px-10 py-4 border border-amber-gold text-amber-gold font-bold rounded-full hover:bg-amber-gold hover:text-espresso transition-all uppercase tracking-widest text-sm"
            >
              Call Cafe
            </a>
          </motion.div>
        </div>
      </section>

      {/* Menu Explorer */}
      <section id="menu" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">O U R C R A F T</span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold italic text-crema inline-block relative">
            THE MENU EXPLORER
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-amber-gold"></div>
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-12 gap-4 no-scrollbar justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat.name 
                ? 'bg-amber-gold text-espresso font-bold shadow-lg shadow-amber-gold/20' 
                : 'bg-white/5 text-ash hover:bg-white/10'
              }`}
            >
              {cat.icon}
              <span className="text-sm uppercase tracking-wider">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          <AnimatePresence mode="wait">
            {MENU_DATA.filter(item => item.category === activeCategory).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group flex flex-col sm:flex-row gap-4 sm:gap-6"
              >
                {/* Render Image if available */}
                {item.image && (
                  <div className="w-full sm:w-24 h-48 sm:h-24 shrink-0 rounded-xl overflow-hidden border border-white/10">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-end justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-crema font-bold text-lg tracking-tight group-hover:text-amber-gold transition-colors">
                        {item.name.toUpperCase()}
                      </h3>
                      {item.isNonVeg ? (
                        <Triangle size={12} className="text-red-500 fill-red-500 rotate-180" />
                      ) : (
                        <Leaf size={14} className="text-green-500 fill-green-500" />
                      )}
                    </div>
                    <div className="menu-item-dotted"></div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-amber-gold font-bold text-lg">₹{item.price}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="w-8 h-8 rounded-full border border-amber-gold/30 flex items-center justify-center text-amber-gold hover:bg-amber-gold hover:text-espresso transition-all"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-ash italic text-sm leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-zinc-900 z-[101] flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="font-serif text-2xl italic text-crema">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-ash hover:text-crema"><X size={24} /></button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-ash opacity-50 space-y-4">
                    <ShoppingBag size={48} />
                    <p className="font-serif italic text-lg">Your cart is empty</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center gap-4">
                      
                      {/* Render Image in Cart if available */}
                      {item.image && (
                        <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden border border-white/10">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="flex-grow">
                        <h4 className="text-crema font-bold text-sm uppercase">{item.name}</h4>
                        <p className="text-amber-gold text-sm font-bold mt-1">₹{item.price * item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-espresso rounded-full px-3 py-1 border border-white/5 shrink-0">
                        <button onClick={() => removeFromCart(item.id)} className="text-ash hover:text-amber-gold"><Minus size={14} /></button>
                        <span className="text-crema font-bold text-sm w-4 text-center">{item.quantity}</span>
                        <button onClick={() => addToCart(item)} className="text-ash hover:text-amber-gold"><Plus size={14} /></button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 bg-espresso/50 border-t border-white/5 space-y-4">
                  <div className="flex justify-between items-center text-crema font-bold text-xl">
                    <span>Total</span>
                    <span className="text-amber-gold">₹{cartTotal}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={clearCart}
                      className="py-4 border border-white/10 text-ash rounded-xl hover:bg-white/5 transition-colors text-sm font-bold uppercase tracking-widest"
                    >
                      Clear
                    </button>
                    <button 
                      onClick={handleWhatsAppCheckout}
                      className="py-4 bg-green-600 text-white rounded-xl hover:bg-green-500 transition-colors text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer / Location */}
      <footer id="location" className="bg-black/40 py-24 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-gold text-xs font-bold tracking-[0.5em] uppercase mb-4 block">V I S I T K U L T U R E</span>
            <h2 className="font-serif text-4xl md:text-6xl font-bold italic text-crema">CHOWRINGHEE MANSION</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-zinc-900/50 p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl">
              <div className="flex gap-6 items-start mb-10">
                <div className="w-12 h-12 rounded-2xl bg-amber-gold/10 flex items-center justify-center text-amber-gold shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-crema font-bold uppercase tracking-widest text-sm mb-2">Our Address</h4>
                  <p className="text-ash leading-relaxed">
                    3rd Floor, Gate no. 1, Chowringhee Mansion, 30, Jawaharlal Nehru Rd, Park Street area, Kolkata, West Bengal 700016
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-10">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-ash text-sm font-medium uppercase tracking-widest">
                  HOURS: Mon-Thu 8:30 AM-10 PM | Fri-Sun 8:30 AM-10:30 PM
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://maps.app.goo.gl/ysgZW14ugurjL25s9" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow flex items-center justify-center gap-3 px-8 py-4 bg-amber-gold text-espresso font-bold rounded-2xl hover:bg-crema transition-all uppercase tracking-widest text-sm"
                >
                  <Navigation size={18} />
                  Get Directions
                </a>
                <a 
                  href="tel:+919448040531" 
                  className="flex-grow flex items-center justify-center gap-3 px-8 py-4 border border-amber-gold text-amber-gold font-bold rounded-2xl hover:bg-amber-gold hover:text-espresso transition-all uppercase tracking-widest text-sm"
                >
                  <Phone size={18} />
                  Call Cafe
                </a>
              </div>
            </div>

            <div className="h-[400px] rounded-[2rem] overflow-hidden border border-white/5">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.340232468305!2d88.35032047596205!3d22.55140663388726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02771234567891%3A0x1234567890abcdef!2sKulture%20-%20Specialty%20Coffee%20%7C%20Kitchen%20%7C%20Sober%20Bar!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="mt-24 text-center border-t border-white/5 pt-12">
            <h1 className="font-serif text-3xl font-bold italic text-amber-gold mb-4">Kulture</h1>
            <p className="text-ash/40 text-xs uppercase tracking-[0.4em]">© 2026 Kulture Kolkata. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}