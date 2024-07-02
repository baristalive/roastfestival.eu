"use client";
import React from "react";
import { Availability, availabilityToClassName } from "@/app/utils/ticket";

export const TicketCard = ({
  title,
  price,
  availability,
  href,
}: {
  title?: string;
  price: { full: number; discounted?: number };
  availability: Availability;
  href?: string;
}) => {
  if (availability === Availability.AvailableNow) {
    return (
      <a href={href} target="_blank" rel="external" className="h-full">
        <div className="flex flex-col rounded-2xl text-center nav">
          <div className="card elevate flex flex-col items-start justify-center gap-2 rounded-t-2xl px-4 2xl:px-8 pt-4 2xl:pt-8 pb-2 2xl:pb-0">
            {title && (
              <span className="text-xl font-bold 2xl:text-2xl">{title}</span>
            )}
            <span className="text-3xl font-bold 2xl:text-6xl">
              {price.full} Kč
            </span>
            <span className="h-6 text-base font-normal 2xl:h-7 2xl:text-lg">
              {price.discounted && `Snížená: ${price.discounted} Kč`}
            </span>
          </div>
          <div className="ticket-sep" />
          <div className="card elevate 2xl:h-16 h-10 rounded-b-2xl">
            <div className="beans h-full w-full rounded-b-xl"></div>
          </div>
        </div>
      </a>
    );
  }

  const availabilityCls = availabilityToClassName(availability);
  return (
    <div className="flex flex-col text-center">
      <div className="flex flex-col items-start justify-center gap-2 px-4 2xl:px-8 pt-4 2xl:pt-8">
        {title && (
          <span className={`text-xl font-bold 2xl:text-2xl ${availabilityCls}`}>
            {title}
          </span>
        )}
        <span className={`text-3xl font-bold 2xl:text-6xl ${availabilityCls}`}>
          {price.full} Kč
        </span>
        {price.discounted && (
          <span
            className={`text-base font-normal 2xl:text-lg ${availabilityCls}`}
          >
            Snížená: {price.discounted} Kč
          </span>
        )}
      </div>
    </div>
  );
};
