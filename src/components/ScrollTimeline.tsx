import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { cn } from "../lib/utils";
import { Card, CardContent } from "./card";
import { Calendar } from "lucide-react";

export interface TimelineEvent {
  id?: string;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: React.ReactNode;
}

export const ScrollTimeline = ({ events }: { events: TimelineEvent[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start center", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      const newIndex = Math.floor(v * events.length);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < events.length) {
        setActiveIndex(newIndex);
      }
    });
  }, [scrollYProgress, events.length, activeIndex]);

  return (
    <div ref={scrollRef} className="relative py-24 bg-espresso">
      <div className="text-center mb-20 px-4">
        <span className="text-amber-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">O U R J O U R N E Y</span>
        <h2 className="font-serif text-4xl md:text-6xl font-bold italic text-crema">CRAFTING HISTORY</h2>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Central Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-white/5" />
        
        {/* Progress Line */}
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 w-[2px] z-10"
          style={{ 
            height: progressHeight, 
            background: 'linear-gradient(to bottom, #D4A373, #FDFBF7)',
            boxShadow: '0 0 15px rgba(212, 163, 115, 0.5)'
          }} 
        />

        <div className="relative z-20 space-y-24">
          {events.map((event, index) => (
            <div key={index} className={cn("relative flex flex-col lg:flex-row items-center", index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse")}>
              
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-30">
                <motion.div 
                  className={cn("w-4 h-4 rounded-full border-2 bg-espresso transition-colors duration-500", 
                    index <= activeIndex ? "border-amber-gold shadow-[0_0_10px_#D4A373]" : "border-white/20")}
                />
              </div>

              {/* Content Card */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={cn("w-full lg:w-[45%] mt-8 lg:mt-0", index % 2 === 0 ? "lg:text-right" : "lg:text-left")}
              >
                <Card>
                  <CardContent>
                    <div className={cn("flex items-center mb-4", index % 2 === 0 ? "lg:justify-end" : "lg:justify-start")}>
                      {event.icon || <Calendar className="w-4 h-4 text-amber-gold mr-2" />}
                      <span className="font-bold text-amber-gold tracking-tighter">{event.year}</span>
                    </div>
                    <h3 className="font-serif text-2xl text-crema mb-2">{event.title}</h3>
                    <p className="text-ash text-sm leading-relaxed">{event.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};