"use client";

export type ScoreCardProps = {
  onRevealAll: (reveal: boolean) => void;
  revealed: number;
  total: number;
  completeLabel?: string;
  revealLabel?: string;
  hideLabel?: string;
};

export const ScoreCard = ({
  hideLabel = "Znovu!",
  onRevealAll,
  revealed,
  revealLabel = "Nemám čas, ukaž to",
  total,
}: ScoreCardProps) => {
  const isComplete = revealed === total;

  return (
    <div className="flex aspect-square w-[20em] flex-col items-center justify-center gap-4 px-6 py-4 transition-colors">
      <div className="flex items-baseline gap-1">
        <span
          className={`font-display text-evergreen text-5xl font-black tabular-nums lg:text-6xl ${
            isComplete ? "" : ""
          }`}
        >
          {revealed}
        </span>
        <span
          className={`font-display text-evergreen text-2xl font-bold lg:text-3xl ${
            isComplete ? "opacity-60" : "opacity-40"
          }`}
        >
          /
        </span>
        <span
          className={`font-display text-evergreen text-2xl font-bold tabular-nums lg:text-3xl ${
            isComplete ? "opacity-60" : "opacity-40"
          }`}
        >
          {total}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRevealAll(!isComplete);
        }}
        className={`punk-border font-display bg-accent text-secondary cursor-pointer px-4 py-2 text-sm font-bold uppercase transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 lg:text-base`}
        style={{ boxShadow: "4px 4px 0 0 var(--black)" }}
      >
        {isComplete ? hideLabel : revealLabel}
      </button>
    </div>
  );
};
