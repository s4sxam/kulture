"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "../lib/utils";

export type CardContent = {
  id: string | number;
  title: string;
  description: string;
  bgClass?: string;
};

type SlidingCardsProps = {
  cards: CardContent[];
  className?: string;
  onCardClick?: (index: number) => void;
};

const SlidingCards: React.FC<SlidingCardsProps> = ({
  cards,
  className = "",
  onCardClick,
}) => {
  const cardStackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const cardStack = cardStackRef.current;
    if (!cardStack) return;
    cardsRef.current = Array.from(cardStack.querySelectorAll(".card"));

    let isSwiping = false;
    let startX = 0;
    let currentX = 0;
    let animationFrameId: number | null = null;

    const getDuration = () => 300;
    const getActiveCard = () => cardsRef.current[0];

    const updatePositions = () => {
      cardsRef.current.forEach((card, i) => {
        const offset = i;
        card.style.zIndex = `${100 - offset}`;
        card.style.transform = `perspective(1000px) translateZ(${-30 * offset}px) translateY(${10 * offset}px)`;
        card.style.opacity = `${1 - offset * 0.2}`;
      });
    };

    const applySwipeStyles = (deltaX: number) => {
      const card = getActiveCard();
      if (!card) return;
      const rotate = deltaX * 0.1;
      const opacity = 1 - Math.min(Math.abs(deltaX) / 200, 1) * 0.5;
      card.style.transform = `perspective(1000px) translateX(${deltaX}px) rotateZ(${rotate}deg)`;
      card.style.opacity = `${opacity}`;
    };

    const handleStart = (clientX: number) => {
      isSwiping = true;
      startX = currentX = clientX;
      const card = getActiveCard();
      if (card) {
        card.style.transition = "none";
      }
    };

    const handleMove = (clientX: number) => {
      if (!isSwiping) return;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        currentX = clientX;
        const deltaX = currentX - startX;
        applySwipeStyles(deltaX);
      });
    };

    const handleEnd = () => {
      if (!isSwiping) return;
      const deltaX = currentX - startX;
      const threshold = 100;
      const card = getActiveCard();

      if (card) {
        card.style.transition = `all ${getDuration()}ms ease`;
        if (Math.abs(deltaX) > threshold) {
          const direction = Math.sign(deltaX);
          card.style.transform = `translateX(${direction * 500}px) rotate(${direction * 45}deg)`;
          card.style.opacity = "0";
          setTimeout(() => {
            cardsRef.current = [...cardsRef.current.slice(1), card];
            updatePositions();
          }, getDuration());
        } else {
          updatePositions();
        }
      }
      isSwiping = false;
    };

    cardStack.addEventListener("pointerdown", (e) => handleStart(e.clientX));
    window.addEventListener("pointermove", (e) => handleMove(e.clientX));
    window.addEventListener("pointerup", handleEnd);

    updatePositions();

    return () => {
      window.removeEventListener("pointermove", (e) => handleMove(e.clientX));
      window.removeEventListener("pointerup", handleEnd);
    };
  }, []);

  return (
    <section
      ref={cardStackRef}
      className={cn(
        "relative w-72 h-96 mx-auto touch-none select-none",
        className
      )}
    >
      {cards.map(({ id, title, description, bgClass = "bg-zinc-900" }, index) => (
        <article
          key={id}
          onClick={() => onCardClick?.(index)}
          className={cn(
            "card absolute inset-0 p-8 flex flex-col items-center justify-center text-center rounded-[2rem] border border-white/10 shadow-2xl cursor-grab active:cursor-grabbing",
            bgClass
          )}
        >
          <div className="w-12 h-1 rounded-full bg-amber-gold/30 mb-6" />
          <h4 className="font-serif text-xl text-crema italic font-bold mb-3">
            {title}
          </h4>
          <p className="text-ash text-sm leading-relaxed">
            {description}
          </p>
          <div className="mt-8 text-[10px] uppercase tracking-[0.2em] text-amber-gold/50 font-bold">
            Swipe to explore
          </div>
        </article>
      ))}
    </section>
  );
};

export default SlidingCards;