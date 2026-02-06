"use client";

import BeanIcon from "@/app/icons/beanicon";
import { Fragment } from "react";

const marqueeItems = [
  { color: "text-secondary", text: "No Filter Needed" },
  { color: "text-secondary", text: "Strictly Specialty" },
  { color: "text-primary", text: "Punk Brewing" },
  { color: "text-secondary", text: "Fancy chow" },
];

export const Marquee = () => {
  // Repeat items enough times to always fill the viewport
  const repeatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  const items = repeatedItems.map((item, idx) => (
    <Fragment key={idx}>
      <span
        className={`font-display mx-8 text-3xl font-black uppercase ${item.color}`}
      >
        {item.text}
      </span>
      <span
        className={`font-display text-accent mx-8 h-10 w-10 text-3xl font-black uppercase`}
      >
        <BeanIcon />
      </span>
    </Fragment>
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
