"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "../lib/utils";

export type CardContent = {
  id: string | number;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  bgClass?: string;
};

type SlidingCardsProps = {
  cards: CardContent[];
  className?: string;
  onCardClick?: (index: number) => void;
};

export const SlidingCards: React.FC<SlidingCardsProps> = ({
  cards,
  className = "",
  onCardClick,
}) => {
  const cardStackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const cardStack = cardStackRef.current;
    if (!cardStack) return;
    cardsRef.current = Array.from(cardStack.querySelectorAll(".kulture-swipe-card"));

    let isSwiping = false;
    let startX = 0;
    let currentX = 0;
    let animationFrameId: number | null = null;

    const getDuration = () => 300;
    const getActiveCard = () => cardsRef.current[0];

    const updatePositions = () => {
      cardsRef.current.forEach((card, i) => {
        const offset = i + 1;
        card.style.zIndex = `${100 - offset}`;
        card.style.transform = `perspective(700px) translateZ(${-20 * offset}px) translateY(${10 * offset}px) translateX(0px) rotateY(0deg)`;
        card.style.opacity = `1`;
        card.style.pointerEvents = i === 0 ? 'auto' : 'none'; // Only top card is interactive
      });
    };

    const applySwipeStyles = (deltaX: number) => {
      const card = getActiveCard();
      if (!card) return;
      const rotate = deltaX * 0.15;
      const opacity = 1 - Math.min(Math.abs(deltaX) / 150, 1) * 0.5;
      card.style.transform = `perspective(700px) translateZ(-20px) translateY(10px) translateX(${deltaX}px) rotateY(${rotate}deg)`;
      card.style.opacity = `${opacity}`;
    };

    const handleStart = (clientX: number) => {
      if (isSwiping) return;
      isSwiping = true;
      startX = currentX = clientX;
      const card = getActiveCard();
      card && (card.style.transition = "none");
    };

    const handleMove = (clientX: number) => {
      if (!isSwiping) return;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        currentX = clientX;
        const deltaX = currentX - startX;
        applySwipeStyles(deltaX);
        if (Math.abs(deltaX) > 100) handleEnd(); // Auto swipe if dragged far enough
      });
    };

    const handleEnd = () => {
      if (!isSwiping) return;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      const deltaX = currentX - startX;
      const threshold = 60;
      const duration = getDuration();
      const card = getActiveCard();

      if (card) {
        card.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;

        if (Math.abs(deltaX) > threshold) {
          const direction = Math.sign(deltaX);
          // Throw card away
          card.style.transform = `perspective(700px) translateZ(-20px) translateY(10px) translateX(${direction * 400}px) rotateY(${direction * 30}deg)`;
          card.style.opacity = '0';

          setTimeout(() => {
            // Move to back of line invisibly
            card.style.transition = 'none';
            card.style.transform = `perspective(700px) translateZ(-100px) translateY(50px) translateX(0px)`;
          }, duration);

          setTimeout(() => {
            // Re-stack array
            cardsRef.current = [...cardsRef.current.slice(1), card];
            cardsRef.current.forEach(c => c.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`);
            updatePositions();
          }, duration + 50);
        } else {
          // Snap back
          applySwipeStyles(0);
          setTimeout(updatePositions, duration);
        }
      }

      isSwiping = false;
      startX = currentX = 0;
    };

    const handleTouchStart = (e: TouchEvent) => handleStart(e.touches[0].clientX);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

    cardStack.addEventListener("pointerdown", (e) => handleStart(e.clientX));
    cardStack.addEventListener("pointermove", (e) => handleMove(e.clientX));
    cardStack.addEventListener("pointerup", handleEnd);
    cardStack.addEventListener("pointerleave", handleEnd);

    updatePositions();
    
    return () => {
      cardStack.removeEventListener("pointerdown", (e) => handleStart(e.clientX));
      cardStack.removeEventListener("pointermove", (e) => handleMove(e.clientX));
      cardStack.removeEventListener("pointerup", handleEnd);
      cardStack.removeEventListener("pointerleave", handleEnd);
    };
  },[]);

  return (
    <section
      ref={cardStackRef}
      className={cn(
        "relative w-72 sm:w-80 h-96 grid place-content-center touch-none select-none mx-auto",