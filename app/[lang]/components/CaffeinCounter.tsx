"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";

export const CaffeinCounter = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const reset = () => {
    setCount(0);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--caffeine-level", String(count));

    // Shake intensity: 0 = none, 1 = light (10-19), 2 = heavy (20+)
    let shakeLevel = 0;
    if (count >= 20) shakeLevel = 2;
    else if (count >= 10) shakeLevel = 1;

    root.dataset.caffeineShake = String(shakeLevel);

    // Hue shift: starts at 20, each increment adds 10 degrees
    const hueShift = count > 20 ? (count - 20) * 10 : 0;
    root.style.setProperty("--caffeine-hue-shift", `${hueShift}deg`);
  }, [count]);

  return (
    <div className="punk-border flex flex-wrap items-center justify-center gap-4 border-4 bg-black p-4 text-white shadow-[12px_12px_0_0_var(--color-accent)] md:gap-12 lg:p-10">
      <div className="text-center md:min-w-42">
        <div className="font-display text-accent text-[12rem] leading-none">
          {count}
        </div>
        <div className="font-display text-primary text-2xl tracking-widest uppercase">
          {lang.caffeineCounter.jitterLevel}
        </div>
      </div>
      <div className="max-w-md text-center md:text-left">
        <h3 className="font-display mb-6 text-xl uppercase md:text-4xl">
          {lang.caffeineCounter.pressForEnergy}
        </h3>
        <button
          onClick={increment}
          className="font-display bg-primary active:bg-accent relative w-full p-6 text-xl font-bold tracking-tighter text-white uppercase transition-colors active:text-black md:text-4xl"
          aria-label="Add caffeine"
        >
          {count > 20
            ? lang.caffeineCounter.calmDown
            : lang.caffeineCounter.espresso}
        </button>
        {count >= 10 && (
          <button
            onClick={reset}
            className="font-display bg-secondary hover:bg-accent mt-2 w-full px-4 py-3 text-lg font-bold text-black uppercase transition-colors hover:text-white"
            aria-label="Reset caffeine"
          >
            {lang.caffeineCounter.detox}
          </button>
        )}
        <p className="mt-4 text-sm font-bold uppercase opacity-50">
          {lang.caffeineCounter.sideEffects}
        </p>
      </div>
    </div>
  );
};
