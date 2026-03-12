import React from "react";
import { Star } from "lucide-react";
import { cn } from "../lib/utils";
import { CountUp } from "./count-up";

interface TrustedUsersProps {
  avatars: string[];
  rating?: number;
  totalUsersText?: number;
  caption?: string;
  className?: string;
  starColorClass?: string;
  ringColors?: string[];
}

export const TrustedUsers: React.FC<TrustedUsersProps> = ({
  avatars,
  rating = 5,
  totalUsersText = 4800,
  caption = "Loved by",
  className = "",
  starColorClass = "text-amber-gold",
  ringColors = [],
}) => {
  return (
    <div className={cn(`flex items-center justify-center gap-6 bg-transparent text-crema py-12 px-4`, className)}>
      <div className="flex -space-x-4">
        {avatars.map((src, i) => (
          <div
            key={i}
            className={`w-12 h-12 rounded-full overflow-hidden ring-2 ring-espresso border-2 border-transparent ${
              ringColors[i] || "ring-amber-gold/30"
            }`}
          >
            <img
              src={src}
              alt={`Guest ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start gap-1">
        <div className={`flex gap-1 ${starColorClass}`}>
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} fill="currentColor" className="w-3 h-3 md:w-4 md:h-4" aria-hidden="true" />
          ))}
        </div>
        <div className="text-ash text-xs md:text-sm font-medium flex items-center flex-wrap">
          {caption}
          <CountUp
            value={totalUsersText}
            duration={3}
            className="ml-1 text-crema font-bold"
            suffix="+"
          />
          <span className="ml-1">Coffee Lovers</span>
        </div>
      </div>
    </div>
  );
};