import {
  Availability,
  AvailabilityRange,
  getAvailability,
  toLocaleDateString,
} from "@/app/utils/ticket";

type TicketTier = {
  availability?: AvailabilityRange;
  heading: string;
  tiers: string[];
  price: number;
};

type TicketCardProps = {
  tier: TicketTier;
  ticketsHref: string;
  labels: {
    buyTickets: string;
    comingSoon: string;
    missedOut: string;
    priceIncreases: string;
    soldOut: string;
    soonAvailable: string;
  };
};

export const TicketCard = ({ labels, ticketsHref, tier }: TicketCardProps) => {
  const availability = getAvailability(tier.availability);
  const isSoldOut = availability === Availability.SoldOut;
  const isAvailableNow = availability === Availability.AvailableNow;
  const isUpcoming =
    availability === Availability.Soon ||
    availability === Availability.Available;
  const isFeatured = isAvailableNow;

  const cardClassName = `relative flex-col ${
    isFeatured
      ? "flex bg-accent text-black pop-shadow transition-transform hover:-translate-x-2 hover:-translate-y-12 md:-translate-y-8"
      : "hidden lg:flex bg-secondary group text-black"
  } ${isSoldOut ? "opacity-50" : ""}`;

  const cardContent = (
    <>
      <div className="flex h-12 w-full items-center justify-between bg-black px-4">
        <span className="font-display font-black tracking-tighter text-white uppercase">
          {tier.heading}
        </span>
        {isFeatured && tier.availability?.end && (
          <span className="bg-secondary px-4 py-2 text-xs font-bold text-black uppercase">
            {labels.priceIncreases} {toLocaleDateString(tier.availability.end)}
          </span>
        )}
        {isSoldOut && (
          <span className="bg-accent px-4 py-2 text-xs font-bold text-black uppercase">
            {labels.soldOut}
          </span>
        )}
      </div>
      <div className="flex grow flex-col border-x-4 border-b-4 border-black p-8">
        <span className="font-display mb-4 text-5xl font-black">
          {isUpcoming ? "???" : `${tier.price} Kč`}
        </span>
        <ul className="mb-12 grow space-y-3 text-sm font-bold tracking-tight uppercase">
          {tier.tiers.map((p) => (
            <li key={p} className="flex items-center gap-2">
              <span className={`${isFeatured ? "text-black" : ""}`}>
                {isUpcoming ? "?" : isSoldOut ? "✗" : "✓"}
              </span>
              {p}
            </li>
          ))}
        </ul>
        {isSoldOut ? (
          <span className="font-display w-full cursor-not-allowed bg-black/50 py-4 text-center text-xl font-black text-white/70 uppercase">
            {labels.missedOut}
          </span>
        ) : isUpcoming ? (
          <span className="font-display w-full bg-black py-4 text-center text-lg font-black text-white uppercase">
            {tier.availability?.start
              ? `${labels.soonAvailable} ${toLocaleDateString(tier.availability.start)}`
              : labels.comingSoon}
          </span>
        ) : (
          <span className="font-display w-full bg-black py-4 text-center text-xl font-black text-white uppercase">
            {labels.buyTickets}
          </span>
        )}
      </div>
    </>
  );

  if (isFeatured) {
    return (
      <a
        className={cardClassName}
        href={ticketsHref}
        rel="external"
        target="_blank"
      >
        {cardContent}
      </a>
    );
  }

  return <div className={cardClassName}>{cardContent}</div>;
};
