import React, { useEffect, useState } from "react";
import { animate } from "motion/react";

interface CountUpProps {
  value: number;
  duration?: number;
  separator?: string;
  className?: string;
  suffix?: string;
  colorScheme?: string;
}

export const CountUp: React.FC<CountUpProps> = ({ 
  value, 
  duration = 2, 
  className, 
  suffix = "" 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: duration,
      onUpdate: (latest) => setCount(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [value, duration]);

  return <span className={className}>{count.toLocaleString()}{suffix}</span>;
};