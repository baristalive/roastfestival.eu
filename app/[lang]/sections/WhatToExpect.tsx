"use client";

import { Fragment, useState } from "react";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import { FlipCard } from "@/app/[lang]/components/FlipCard";
import { ScoreCard } from "@/app/[lang]/components/ScoreCard";
import { MobileCardStack } from "@/app/[lang]/components/MobileCardStack";

export const WhatToExpect = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  // Flatten all items from both categories into a single array
  const allItems = lang.whatToExpect.content;

  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const handleFlip = (index: number) => {
    setFlippedCards((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleRevealAll = (reveal: boolean) => {
    setFlippedCards(reveal ? new Set(allItems.map((_, i) => i)) : new Set());
  };

  const revealedCount = flippedCards.size;
  const totalCount = allItems.length;

  return (
    <section id="what-to-expect" className="bg-lines bg-white py-16 lg:py-24">
      <div className="container mx-auto">
        <div className="mb-8 text-center lg:mb-12">
          <h2 className="font-display mb-4 text-3xl leading-[0.85] font-black text-black uppercase md:text-6xl">
            {lang.whatToExpect.title}
          </h2>
        </div>
        {/* Mobile: Swipeable Card Stack */}
        <div className="md:hidden">
          <MobileCardStack items={allItems} />
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:block">
          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {allItems.map((item, index) => (
              <Fragment key={item.title}>
                {Math.ceil(allItems.length / 2) === index && (
                  <ScoreCard
                    onRevealAll={handleRevealAll}
                    revealed={revealedCount}
                    total={totalCount}
                  />
                )}
                <FlipCard
                  title={item.title}
                  text={item.text}
                  index={index}
                  isFlipped={flippedCards.has(index)}
                  onFlip={() => handleFlip(index)}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
