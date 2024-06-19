"use client";
import Bar from "@/app/components/Bar";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import React from "react";
import { TicketCard } from "@/app/components/TicketCard";
import { TicketRowHeader } from "@/app/components/TicketRowHeader";
import { getAvailability, AvailabilityRange } from "@/app/utils/ticket";

export const Tickets = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);
  const { contextSafe } = useGSAP({ scope: ref });

  return (
    <section id="tickets" ref={ref} className="previous-year-section pb-48">
      <div className="mx-auto grid max-w-[1900px] gap-12 px-8 pt-32 lg:grid-cols-[1fr,2fr] 2xl:gap-32">
        <div className="md:p-12">
          <h2 className="w-3/4 text-3xl font-bold 2xl:text-6xl">
            {lang.tickets.title}
          </h2>
          <Bar mountRef={ref} contextSafe={contextSafe} />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 items-start justify-center gap-8">
          {lang.tickets.priceList.map((row, rowIdx) => {
            const availability = getAvailability(row.availability as AvailabilityRange)
            return (
              <React.Fragment key={rowIdx}>
                <div className="lg:col-span-1 col-span-2 sm:col-span-3 justify-center items-center flex lg:block">
                  <TicketRowHeader
                    heading={row.heading}
                    subheading={row.subheading}
                    availability={availability}
                    dateRange={row.availability || {}} />
                </div>
                {row.prices.map((price, idx) => (
                  <div key={idx} className={`sm:col-span-1 ${idx === 0 ? "col-span-2": ""}`} >
                    <TicketCard title={price.title} price={price} availability={availability} href={lang.contacts.tickets}/>
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
