import React from "react";
import { cn } from "../lib/utils";

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden", className)}>
    {children}
  </div>
);

export const CardContent = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("p-6", className)}>{children}</div>
);