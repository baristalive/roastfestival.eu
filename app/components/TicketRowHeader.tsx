"use client";
import React from "react";
import {
  Availability,
  AvailabilityRange,
  availabilityRemainingToLocale,
  availabilityToClassName,
  toLocaleDateString,
} from "@/app/utils/ticket";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";

export const TicketRowHeader = ({
  subheading,
  heading,
  availability,
  dateRange,
}: {
  subheading?: string;
  heading: (string | { superscript: string })[];
  availability: Availability;
  dateRange: AvailabilityRange;
}) => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  const chipTexts = {
    [Availability.AvailableNow]: lang.tickets.timeLeft,
    [Availability.Soon]: lang.tickets.soonAvailable,
    [Availability.SoldOut]: lang.tickets.soldOut
  }

  return (
    <div className="flex lg:flex-col flex-col md:flex-row items-center lg:items-start gap-2 pt-4 lg:mr-20 2xl:pt-8">
      {subheading && (
        <h4 className="text-xl hidden lg:block font-bold 2xl:text-2xl">{subheading}</h4>
      )}
      <h3 className="text-3xl font-bold 2xl:text-6xl">
        {heading.map((el, idx) =>
          typeof el === "object" && el?.superscript ? (
            <span className="align-super text-lg 2xl:text-4xl" key={idx}>
              {el.superscript}
            </span>
          ) : (
            (el as string)
          ),
        )}
      </h3>
      {/* {subheading && (
        <h4 className="text-xl lg:hidden font-bold 2xl:text-2xl">{subheading}</h4>
      )} */}
      {availability !== Availability.Available && (
        <div className="rounded-full bg-[var(--black)] lg:px-4 px-2 lg:py-1 lg:text-base text-sm text-[var(--white)]">
          {chipTexts[availability]}
          <span className="ml-1">
            {availability === Availability.AvailableNow
              ? availabilityRemainingToLocale(
                  dateRange.end!,
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
