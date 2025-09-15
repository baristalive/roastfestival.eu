"use client";
import React from "react";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import {
  Availability,
  AvailabilityRange,
  availabilityRemainingToLocale,
  availabilityToClassName,
} from "@/app/utils/ticket";

export const TicketCard = ({
  availability,
  dateRange,
  highlight = false,
  href,
  price,
  title,
}: {
  title: string;
  price: {
    full: number;
    discounted?: number;
    highlight?: boolean;
    addon?: string;
  };
  availability: Availability;
  href?: string;
  highlight?: boolean;
  dateRange: AvailabilityRange;
}) => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  if (availability === Availability.AvailableNow) {
    return (
      <a
        href={href}
        target="_blank"
        rel="external"
        className={`mx-auto block h-full ${highlight ? "-ml-2 -rotate-6 sm:pl-8" : ""}`}
      >
        <div className="nav flex flex-col rounded-2xl text-center">
          <div
            className={`${highlight ? "card-highlight" : "card"} elevate flex flex-col items-start justify-center gap-2 rounded-t-2xl px-4 pb-2 pt-4 2xl:px-8 2xl:pb-0 2xl:pt-8`}
          >
            <span className="text-left text-xl font-bold 2xl:text-2xl">
              {title}
            </span>
            <span className="text-3xl font-bold 2xl:text-6xl">
              {price.full} Kč
            </span>
            <span className="h-6 text-base font-normal 2xl:h-9 2xl:text-lg">
              {price.discounted &&
                `${lang.tickets.discounted}: ${price.discounted} Kč`}
            </span>
            {highlight && (
              <div className="card rounded-full px-2 text-sm lg:px-4 lg:pb-1 lg:pt-[.3rem] lg:text-base">
                {lang.tickets.alreadyAvailable}: {lang.tickets.timeLeft}{" "}
                {availabilityRemainingToLocale(
                  dateRange.end || lang.dateStart,
                  params.lang as SupportedLanguages,
                )}
              </div>
            )}
          </div>
          <div className={highlight ? "ticket-sep-highlight" : "ticket-sep"} />
          <div
            className={`${highlight ? "card-highlight" : "card"} elevate h-10 rounded-b-2xl 2xl:h-16`}
          >
            <div className="beans relative h-full w-full rounded-b-xl">
              {price.addon && (
                <div
                  className={`elevate absolute -bottom-4 -right-4 flex h-24 w-24 flex-col justify-center rounded-full p-4 font-semibold ${highlight ? "card" : "bg-[var(--accent)] text-[var(--white)]"}`}
                >
                  {price.addon}
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
    );
  }

  const availabilityCls = availabilityToClassName(availability);
  return (
    <div className="flex flex-col text-center">
      <div className="flex flex-col items-start justify-center gap-2 px-4 pt-4 2xl:px-8 2xl:pt-8">
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
            {lang.tickets.discounted}: {price.discounted} Kč
          </span>
        )}
      </div>
    </div>
  );
};
