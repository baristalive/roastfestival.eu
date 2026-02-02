"use client";

import { useState } from "react";

export const CaffeinCounter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(0, prev - 1));

  return (
    <div className="animate-pop punk-border pop-shadow bg-accent flex items-center justify-baseline gap-6 px-6 py-1">
      <p className="text-ivory font-display text-sm text-nowrap uppercase">
        Add coffein!
      </p>
      <button
        onClick={decrement}
        className="punk-border bg-ivory text-evergreen hover:bg-secondary flex h-8 w-8 items-center justify-center text-3xl font-black transition-all hover:translate-x-0.5 hover:translate-y-0.5"
        aria-label="Remove caffeine"
      >
        −
      </button>
      <div className="text-ivory font-display text-2xl">{count}</div>
      <button
        onClick={increment}
        className="punk-border bg-ivory text-evergreen hover:bg-secondary flex h-8 w-8 items-center justify-center text-3xl font-black transition-all hover:translate-x-0.5 hover:translate-y-0.5"
        aria-label="Add caffeine"
      >
        +
      </button>
    </div>
  );
};
