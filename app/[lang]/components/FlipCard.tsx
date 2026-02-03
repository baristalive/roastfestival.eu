"use client";

import BeanIcon from "@/app/icons/beanicon";

export type FlipCardProps = {
  index: number;
  isFlipped: boolean;
  onFlip: () => void;
  text: string;
  title: string;
};

export const FlipCard = ({
  index,
  isFlipped,
  onFlip,
  text,
  title,
}: FlipCardProps) => {
  const patterns = [
    "bg-primary text-white",
    "bg-secondary text-black",
    "bg-primary text-white",
    "bg-accent text-primary",
  ];
  const patternClass = patterns[index % patterns.length];

  return (
    <div
      className="flip-card relative aspect-square w-[20em] cursor-pointer"
      onClick={onFlip}
      style={{ perspective: "1000px" }}
    >
      <div
        className={`flip-card-inner relative h-full w-full transition-transform duration-500 ${isFlipped ? "flipped" : ""}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card Back (initially visible) */}
        <div
          className={`punk-border pop-shadow absolute inset-0 flex items-center justify-center p-4 ${patternClass}`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="h-16 w-16 opacity-60 lg:h-32 lg:w-32">
              <BeanIcon />
            </div>
            <span className="font-display text-3xl font-bold lg:text-4xl">
              ?
            </span>
          </div>
        </div>

        {/* Card Front (revealed on flip) */}
        <div
          className={`punk-border pop-shadow absolute inset-0 flex flex-col justify-start overflow-y-auto p-4 lg:p-5 ${patternClass}`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h3 className="font-display mb-2 text-base leading-tight font-bold lg:text-lg">
            {title}
          </h3>
          <p className="text-base leading-snug opacity-80 lg:text-lg">{text}</p>
        </div>
      </div>
    </div>
  );
};
