"use client";
import React, { createRef, ReactNode, useRef } from "react";
import { cn } from "../lib/utils";

export interface MouseTrailProps {
  imageSources: string[];
  content?: ReactNode;
  containerClassName?: string;
  imageClassName?: string;
  triggerDistance?: number;
  maxTrailImages?: number;
  useFadeEffect?: boolean;
}

export const ImageTrailEffect = ({
  imageSources,
  content,
  containerClassName,
  maxTrailImages = 5,
  // Kulture Styling: Rounded corners, white border, soft shadow
  imageClassName = "w-40 h-56 sm:w-48 sm:h-64 rounded-2xl border border-white/10 shadow-2xl",
  triggerDistance = 20,
  useFadeEffect = true,
}: MouseTrailProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef(
    imageSources.map(() => createRef<HTMLImageElement>())
  );
  const zIndexCounterRef = useRef(1);

  let imageIndex = 0;
  let lastPosition = { x: 0, y: 0 };

  const activateImage = (img: HTMLImageElement, x: number, y: number) => {
    const containerBounds = wrapperRef.current?.getBoundingClientRect();
    if (!containerBounds) return;

    const relativeX = x - containerBounds.left;
    const relativeY = y - containerBounds.top;

    img.style.left = `${relativeX}px`;
    img.style.top = `${relativeY}px`;

    if (zIndexCounterRef.current > 40) {
      zIndexCounterRef.current = 1;
    }

    img.style.zIndex = String(zIndexCounterRef.current++);
    img.dataset.status = "active";

    if (useFadeEffect) {
      setTimeout(() => {
        img.dataset.status = "inactive";
      }, 1500); // Images fade out after 1.5s
    }

    lastPosition = { x, y };
  };

  const calculateDistance = (x: number, y: number) => {
    return Math.hypot(x - lastPosition.x, y - lastPosition.y);
  };

  const deactivateImage = (img: HTMLImageElement) => {
    img.dataset.status = "inactive";
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    if (calculateDistance(clientX, clientY) > window.innerWidth / triggerDistance) {
      const leadImage = imageRefs.current[imageIndex % imageRefs.current.length]?.current;
      const tailImage = imageRefs.current[(imageIndex - maxTrailImages) % imageRefs.current.length]?.current;

      if (leadImage) activateImage(leadImage, clientX, clientY);
      if (tailImage && !useFadeEffect) deactivateImage(tailImage);

      imageIndex++;
    }
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      ref={wrapperRef}
      className={cn(
        "grid place-content-center h-[400px] sm:h-[500px] w-full relative overflow-hidden rounded-3xl cursor-crosshair",
        containerClassName
      )}
    >
      {imageSources.map((src, i) => (
        <img
          key={i}
          ref={imageRefs.current[i]}
          src={src}
          alt={`trail-${i}`}
          data-status="inactive"
          className={cn(
            "object-cover absolute -translate-y-[50%] -translate-x-[50%] pointer-events-none", // pointer-events-none is crucial here
            "scale-50 opacity-0 transition-all duration-500 ease-out",
            "data-[status='active']:scale-100 data-[status='active']:opacity-100",
            imageClassName
          )}
        />
      ))}
      {content}
    </section>
  );
};