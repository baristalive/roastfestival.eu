"use client";

import { Fragment, useState } from "react";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import { FlipCard } from "@/app/[lang]/components/FlipCard";
import { ScoreCard } from "@/app/[lang]/components/ScoreCard";

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
    <section id="what-to-expect" className="bg-ivory bg-lines py-16 lg:py-24">
      <div className="container mx-auto">
        <div className="mb-8 text-center lg:mb-12">
          <h2 className="font-display text-evergreen mb-6 text-6xl leading-[0.85] font-black uppercase">
            {lang.whatToExpect.title}
          </h2>
        </div>
        <div className="mx-auto mb-12 flex items-center"></div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-6 lg:gap-8">
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
    </section>
  );
};
