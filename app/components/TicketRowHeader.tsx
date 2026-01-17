"use client";
import React from "react";
import {
  Availability,
  AvailabilityRange,
  availabilityRemainingToLocale,
  toDate,
  toLocaleDateString,
} from "@/app/utils/ticket";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";

export const TicketRowHeader = ({
  availability,
  dateRange,
  heading,
  subheading,
}: {
  subheading?: string;
  heading?: (string | { superscript: string })[];
  availability: Availability;
  dateRange: AvailabilityRange;
}) => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  const chipTexts = {
    [Availability.AvailableNow]: lang.tickets.timeLeft,
    [Availability.SoldOut]: lang.tickets.soldOut,
    [Availability.Soon]: lang.tickets.soonAvailable,
  };

  return (
    <div className="flex flex-col items-center gap-2 pt-4 md:flex-row lg:mr-20 lg:flex-col lg:items-start 2xl:pt-8">
      {subheading ? (
        <h4 className="hidden text-xl font-bold lg:block 2xl:text-2xl">
          {subheading}
        </h4>
      ) : (
        <div className="hidden h-7 lg:block 2xl:h-8" />
      )}
      <h3 className="inline text-3xl font-bold break-words 2xl:text-6xl">
        {heading?.map((el, idx) =>
          typeof el === "object" && el?.superscript ? (
            <span className="align-super text-lg 2xl:text-4xl" key={idx}>
              {el.superscript}
            </span>
          ) : (
            (el as string)
          ),
        )}
      </h3>
      {heading && availability !== Availability.Available && (
        <div className="rounded-full bg-[var(--black)] px-2 text-sm text-[var(--white)] lg:px-4 lg:py-1 lg:text-base">
          {chipTexts[availability]}
          <span className="ml-1">
            {availability === Availability.AvailableNow
              ? dateRange.end !== undefined &&
                toDate(dateRange.end, "start") < new Date()
                ? lang.tickets.lastDay
                : availabilityRemainingToLocale(
                    dateRange.end || lang.dateStart,
                    params.lang as SupportedLanguages,
                  )
              : availability === Availability.Soon
                ? toLocaleDateString(
                    dateRange.start!,
                    params.lang as SupportedLanguages,
                  )
                : ""}
          </span>
        </div>
      )}
    </div>
  );
};
