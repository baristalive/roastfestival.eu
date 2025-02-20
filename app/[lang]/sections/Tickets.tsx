"use client";
import Bar from "@/app/components/Bar";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import React from "react";
import { TicketCard } from "@/app/components/TicketCard";
import { TicketRowHeader } from "@/app/components/TicketRowHeader";
import { getAvailability, AvailabilityRange, Availability } from "@/app/utils/ticket";

const TICKETS_PER_ROW = 3
export const Tickets = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  return (
    <section id="tickets"  className="ticket-section watermark5">
      <div className="mx-auto grid max-w-[1900px] px-8 lg:grid-cols-[1fr,2fr]">
        <div className="md:pl-12">
          <h2 className="text-3xl pt-24 font-bold md:pt-0 2xl:pt-20 2xl:text-6xl">
            {lang.tickets.title}
          </h2>
          <Bar />
        </div>
      </div>
      <div className="lg:flex items-center justify-center lg:py-24 px-8 max-w-[1900px] mx-auto">
        <div className="grid grid-cols-2 items-start justify-center gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {lang.tickets.priceList.map((row, rowIdx) => {
            const availability = getAvailability(
              row.availability as AvailabilityRange,
            );
            return (
              <React.Fragment key={rowIdx}>
                <div className="col-span-2 flex items-center lg:justify-center sm:col-span-3 lg:col-span-1 lg:block">
                  <TicketRowHeader
                    heading={row.heading}
                    subheading={row.subheading}
                    availability={availability}
                    dateRange={row.availability || {}}
                  />
                </div>
                {row.prices.map((price, idx) => {
                  const showOverlay = price.overlay && getAvailability(price.overlay.availability) === Availability.AvailableNow
                  return (
                    <div
                      key={idx}
                      className={`sm:col-span-1 ${idx === 0 ? "col-span-2" : ""} grid h-full`}
                    >
                      <div className=" col-start-1 row-start-1">
                        <TicketCard
                          title={price.title}
                          price={price}
                          availability={showOverlay ? Availability.Soon : availability}
                          href={lang.contacts.tickets}
                          dateRange={row.availability || {}} />
                      </div>
                      {showOverlay && price.overlay &&
                        <div className="col-start-1 row-start-1 z-10">
                          <TicketCard
                            title={price.overlay.title}
                            price={price.overlay}
                            availability={getAvailability(price.overlay.availability)}
                            href={lang.contacts.tickets}
                            highlight={true}
                            dateRange={price.overlay.availability || {}} />
                        </div>}
                    </div>
                  );
                })}
                {Array(TICKETS_PER_ROW - row.prices.length).fill(0).map((_, idx) => <div key={idx}></div>)}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};


