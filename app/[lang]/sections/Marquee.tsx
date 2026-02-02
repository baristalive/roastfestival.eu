"use client";

const marqueeItems = [
  { color: "text-secondary", text: "No Filter Needed" },
  { color: "text-accent", text: "★" },
  { color: "text-secondary", text: "Strictly Specialty" },
  { color: "text-accent", text: "★" },
  { color: "text-primary", text: "Punk Brewing" },
  { color: "text-accent", text: "★" },
  { color: "text-secondary", text: "Fancy chow" },
  { color: "text-accent", text: "★" },
];

export const Marquee = () => {
  // Repeat items enough times to always fill the viewport
  const repeatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  const items = repeatedItems.map((item, idx) => (
    <span
      key={idx}
      className={`font-display mx-8 text-3xl font-black uppercase ${item.color}`}
    >
      {item.text}
    </span>
  ));

  return (
    <div className="marquee-container inverted py-4">
      <div className="animate-marquee flex w-max">
        <div className="flex shrink-0">{items}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {items}
        </div>
      </div>
    </div>
  );
};
