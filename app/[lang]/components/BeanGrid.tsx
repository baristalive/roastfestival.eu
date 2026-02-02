"use client";
import { useState, useCallback } from "react";
import BeanIcon from "@/app/icons/beanicon";

export const BeanGrid = () => {
  const [hoveredBeans, setHoveredBeans] = useState<Set<number>>(new Set());

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredBeans((prev) => new Set(prev).add(index));
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    setHoveredBeans((prev) => {
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  }, []);

  // Create a grid of beans - adjust count based on desired density
  const beanCount = 500;

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-wrap gap-8 overflow-hidden p-8">
      {Array.from({ length: beanCount }).map((_, i) => (
        <div
          key={i}
          className="pointer-events-auto flex items-center justify-center"
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={() => handleMouseLeave(i)}
        >
          <div
            className={`text-evergreen h-12 w-12 transition-opacity ${
              hoveredBeans.has(i)
                ? "opacity-0 duration-100"
                : "opacity-10 delay-1000 duration-300"
            }`}
            style={{
              transform: `rotate(${(i * 37) % 360}deg)`,
            }}
          >
            <BeanIcon />
          </div>
        </div>
      ))}
    </div>
  );
};
