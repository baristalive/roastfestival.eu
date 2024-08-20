"use client";
import Bar from "@/app/components/Bar";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { TicketCard } from "@/app/components/TicketCard";
import { TicketRowHeader } from "@/app/components/TicketRowHeader";
import { getAvailability, AvailabilityRange } from "@/app/utils/ticket";

export const Tickets = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);

  const { contextSafe } = useGSAP()

  return (
    <section id="tickets" ref={ref} className="ticket-section watermark">
      <div className="mx-auto grid max-w-[1900px] px-8 lg:grid-cols-[1fr,2fr]">
        <div className="md:pl-12">
          <h2 className="text-3xl font-bold 2xl:text-6xl">
            {lang.tickets.title}
          </h2>
          <Bar mountRef={ref} contextSafe={contextSafe} />
        </div>
      </div>
      <div className="flex items-center justify-center lg:py-24">
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
                {row.prices.map((price, idx) => (
                  <div
                    key={idx}
                    className={`sm:col-span-1 ${idx === 0 ? "col-span-2" : ""}`}
                  >
                    <TicketCard
                      title={price.title}
                      price={price}
                      availability={availability}
                      href={lang.contacts.tickets}
                    />
                  </div>
                ))}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};


