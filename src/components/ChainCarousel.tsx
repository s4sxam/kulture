import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useInView } from 'motion/react';
import { Search, Coffee, DeleteIcon, LucideIcon } from 'lucide-react';

export interface ChainItem {
    id: string | number;
    name: string;
    icon: LucideIcon;
    details?: string;
    logo?: string;
}

type AnimatedChainItem = ChainItem & {
    distanceFromCenter: number;
    originalIndex: number;
};

const CarouselItemCard: React.FC<{ chain: AnimatedChainItem; side: 'left' | 'right' }> = ({ chain, side }) => {
    const { distanceFromCenter, name, details, logo, icon: FallbackIcon } = chain;
    const distance = Math.abs(distanceFromCenter);
    const opacity = 1 - distance / 4;
    const scale = 1 - distance * 0.1;
    const yOffset = distanceFromCenter * 90;
    const xOffset = side === 'left' ? -distance * 50 : distance * 50;

    return (
        <motion.div
            className={`absolute flex items-center gap-4 text-crema px-6 py-3 ${side === 'left' ? 'flex-row-reverse' : 'flex-row'}`}
            animate={{ opacity, scale, y: yOffset, x: xOffset }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
            <div className="rounded-full border border-white/20 p-2 bg-espresso">
                {logo ? (
                    <img src={logo} alt={name} className="size-8 rounded-full object-cover" />
                ) : (
                    <FallbackIcon className="size-8 text-amber-gold" />
                )}
            </div>
            <div className={`flex flex-col mx-4 ${side === 'left' ? 'text-right' : 'text-left'}`}>
                <span className="text-md lg:text-lg font-semibold text-crema whitespace-nowrap">{name}</span>
                <span className="text-xs lg:text-sm text-ash">{details}</span>
            </div>
        </motion.div>
    );
};

const ChainCarousel: React.FC<{ items: ChainItem[]; onChainSelect?: (id: any) => void }> = ({ items, onChainSelect }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const rightSectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(rightSectionRef, { margin: '-100px' });
    const totalItems = items.length;

    useEffect(() => {
        if (isPaused || totalItems === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalItems);
        }, 2000);
        return () => clearInterval(interval);
    }, [isPaused, totalItems]);

    const getVisibleItems = useCallback((): AnimatedChainItem[] => {
        const visibleItems = [];
        const half = 4;
        for (let i = -half; i <= half; i++) {
            let index = (currentIndex + i + totalItems) % totalItems;
            visibleItems.push({ ...items[index], originalIndex: index, distanceFromCenter: i });
        }
        return visibleItems;
    }, [currentIndex, items, totalItems]);

    const filteredItems = useMemo(() => 
        items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [items, searchTerm]);

    const currentItem = items[currentIndex];

    return (
        <div className="space-y-20 py-12">
            <div className='flex flex-col xl:flex-row max-w-7xl mx-auto px-4 gap-12 justify-center items-center'>
                
                {/* Left Carousel */}
                <motion.div className="relative w-full max-w-md h-[400px] hidden xl:flex -left-14" initial={{ x: -100, opacity: 0 }} animate={isInView ? { x: 0, opacity: 1 } : {}}>
                    {getVisibleItems().map((chain) => <CarouselItemCard key={`l-${chain.id}`} chain={chain} side="left" />)}
                </motion.div>

                {/* Search & Selection */}
                <div className="flex flex-col text-center gap-4 max-w-md">
                    {currentItem && (
                        <div className="flex flex-col items-center mt-4">
                            <div className='p-3 bg-white/5 rounded-full border border-amber-gold/30'>
                                {currentItem.logo ? <img src={currentItem.logo} className="size-16 rounded-full object-cover" /> : <currentItem.icon className="size-10 text-amber-gold" />}
                            </div>
                            <h3 className="text-2xl font-bold text-crema mt-4">{currentItem.name}</h3>
                            <p className="text-amber-gold font-serif italic">{currentItem.details}</p>
                        </div>
                    )}

                    <div className="mt-6 relative">
                        <div className="flex items-center relative">
                            <input
                                type="text"
                                value={searchTerm}
                                placeholder="Search for a dish..."
                                onChange={(e) => { setSearchTerm(e.target.value); setShowDropdown(true); setIsPaused(true); }}
                                onFocus={() => setIsPaused(true)}
                                className="w-full bg-white/5 border border-white/10 text-crema px-12 py-3 rounded-full outline-none focus:border-amber-gold transition-colors"
                            />
                            <Search className="absolute left-4 text-ash w-5 h-5" />
                            {searchTerm && <button onClick={() => { setSearchTerm(''); setIsPaused(false); }} className="absolute right-4"><DeleteIcon className="text-ash w-5 h-5" /></button>}
                        </div>

                        {showDropdown && searchTerm && (
                            <div className="absolute left-0 right-0 mt-2 bg-zinc-900 border border-white/10 rounded-xl z-50 max-h-60 overflow-y-auto shadow-2xl">
                                {filteredItems.map((item) => (
                                    <div key={item.id} onMouseDown={() => { setCurrentIndex(items.indexOf(item)); setSearchTerm(item.name); setShowDropdown(false); onChainSelect?.(item.id); }} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer">
                                        <span className="text-crema">{item.name}</span>
                                        <span className="ml-auto text-amber-gold text-xs">{item.details}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Carousel */}
                <motion.div ref={rightSectionRef} className="relative w-full max-w-md h-[400px] flex items-center justify-center -right-14" initial={{ x: 100, opacity: 0 }} animate={isInView ? { x: 0, opacity: 1 } : {}}>
                    {getVisibleItems().map((chain) => <CarouselItemCard key={`r-${chain.id}`} chain={chain} side="right" />)}
                </motion.div>
            </div>
        </div>
    );
};

export default ChainCarousel;