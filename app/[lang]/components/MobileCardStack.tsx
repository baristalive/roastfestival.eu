"use client";

import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import BeanIcon from "@/app/icons/beanicon";
import { PATTERNS } from "@/app/utils/consts";
import TouchIcon from "@/app/icons/touch";
import ArrowIcon from "@/app/icons/arrow";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";

type CardItem = {
  title: string;
  text: string;
};

type MobileCardStackProps = {
  items: CardItem[];
};

export const MobileCardStack = ({ items }: MobileCardStackProps) => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [skipTransition, setSkipTransition] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleFlip = () => {
    setFlippedCards((prev) => {
      const next = new Set(prev);
      if (next.has(currentIndex)) {
        next.delete(currentIndex);
      } else {
        next.add(currentIndex);
      }
      return next;
    });
  };

  const goToCard = (index: number) => {
    if (isAnimating || index < 0 || index >= items.length) return;
    setCurrentIndex(index);
  };

  const swipeToCard = (index: number, direction: "left" | "right") => {
    if (isAnimating || index < 0 || index >= items.length) return;
    setIsAnimating(true);

    // Animate card off-screen in swipe direction
    const exitOffset = direction === "left" ? -400 : 400;
    setSwipeOffset(exitOffset);

    // After exit animation, switch card and reset without transition
    setTimeout(() => {
      setSkipTransition(true);
      setSwipeOffset(0);
      setCurrentIndex(index);

      // Re-enable transitions after the reset is painted
      requestAnimationFrame(() => {
        setSkipTransition(false);
        setIsAnimating(false);
      });
    }, 250);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isAnimating) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current);

    // Only track horizontal swipes
    if (deltaY < Math.abs(deltaX)) {
      setSwipeOffset(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (isAnimating) return;
    const threshold = 80;

    if (swipeOffset > threshold && currentIndex > 0) {
      swipeToCard(currentIndex - 1, "right");
    } else if (swipeOffset < -threshold && currentIndex < items.length - 1) {
      swipeToCard(currentIndex + 1, "left");
    } else {
      // Snap back if threshold not met
      setSwipeOffset(0);
    }
  };

  const isFlipped = flippedCards.has(currentIndex);
  const currentItem = items[currentIndex];
  const patternClass = PATTERNS[currentIndex % PATTERNS.length];

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Card Stack Container */}
      <div
        className="relative aspect-square w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background cards for stack effect */}
        {currentIndex < items.length - 2 && (
          <div
            className={`punk-border absolute inset-0 ${PATTERNS[(currentIndex + 2) % PATTERNS.length]}`}
            style={{
              opacity: 0.5,
              transform: "translateX(8px) translateY(8px) scale(0.92)",
            }}
          />
        )}
        {currentIndex < items.length - 1 && (
          <div
            className={`punk-border absolute inset-0 ${PATTERNS[(currentIndex + 1) % PATTERNS.length]}`}
            style={{
              opacity: 0.7,
              transform: "translateX(4px) translateY(4px) scale(0.96)",
            }}
          />
        )}

        {/* Current Card */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={handleFlip}
          style={{
            perspective: "1000px",
            transform: `translateX(${isAnimating ? swipeOffset : swipeOffset * 0.5}px)`,
            transition: skipTransition
              ? "none"
              : isAnimating || swipeOffset === 0
                ? "transform 0.25s ease-out"
                : "none",
          }}
        >
          <div
            key={currentIndex}
            className={`flip-card-inner relative h-full w-full transition-transform duration-500 ${isFlipped ? "flipped" : ""}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Card Back (initially visible) */}
            <div
              className={`punk-border pop-shadow absolute inset-0 flex items-center justify-center p-4 ${patternClass}`}
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="flex flex-col items-center gap-8 text-center opacity-60">
                <div className="h-32 w-32">
                  <BeanIcon />
                </div>
                <div className="h-16 w-16 -rotate-20">
                  <TouchIcon />
                </div>
              </div>
            </div>

            {/* Card Front (revealed on flip) */}
            <div
              className={`punk-border pop-shadow absolute inset-0 flex flex-col justify-start overflow-y-auto p-5 ${patternClass}`}
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <h3 className="font-display mb-3 text-2xl leading-tight font-bold">
                {currentItem.title}
              </h3>
              <p className="text-xl leading-snug opacity-80">
                {currentItem.text}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-2">
        {items.map((item, index) => (
          <div
            key={item.title}
            className={`h-3 w-3 rounded-full border-2 border-black transition-all ${
              index === currentIndex
                ? "scale-110 bg-black"
                : flippedCards.has(index)
                  ? "bg-primary"
                  : "bg-transparent"
            }`}
          />
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => goToCard(currentIndex - 1)}
          disabled={currentIndex === 0}
          aria-label={lang.mobileCardStack.previousCard}
          className="punk-border font-display aspect-square h-32 rotate-180 cursor-pointer rounded-full text-lg font-bold text-black uppercase transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowIcon />
        </button>
        <span className="font-display text-lg font-bold text-black tabular-nums">
          {currentIndex + 1} / {items.length}
        </span>
        <button
          onClick={() => goToCard(currentIndex + 1)}
          disabled={currentIndex === items.length - 1}
          aria-label={lang.mobileCardStack.nextCard}
          className="punk-border font-display aspect-square h-32 cursor-pointer rounded-full text-lg font-bold text-black uppercase transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowIcon />
        </button>
      </div>

      {/* Flip hint */}
      <p className="font-body text-sm text-black opacity-60">
        {isFlipped
          ? lang.mobileCardStack.tapToHide
          : lang.mobileCardStack.tapToReveal}
      </p>
    </div>
  );
};
