"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import React from "react";
import "./print.css";
import LogoSvg from "@/app/../public/logo.svg";

const TICKETS_PER_ROW = 3;
export const Tickets = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  const tickets = lang.tickets.priceList.filter(
    (o) => o.availability === undefined,
  )[0].prices;

  return (
    <header className="flex flex-col h-screen items-center justify-center">
      <div className="z-20 text-6xl -mb-20 -mt-20"><LogoSvg /></div>
      <h1 className="z-20 text-[var(--background)] font-bold text-6xl pb-20">{lang.tickets.titleOnTheSpot}</h1>
      <div className="z-20 grid w-10/12 grid-cols-3 items-center justify-center gap-8">
        {tickets.map((price, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-2xl text-center"
          >
            <div
              className={`${idx === 0 ? "card-highlight": "card"} flex flex-col items-start justify-center gap-2 rounded-t-2xl px-8 pb-0 pt-8`}
            >
              <span className="text-left text-2xl font-bold">
                {price.title}
              </span>
              <span className="text-4xl font-bold">{price.full} Kč</span>
              <span className="h-8 text-lg font-normal">
                {price.discounted &&
                  `${lang.tickets.discounted}: ${price.discounted} Kč`}
              </span>
            </div>
            <div className={idx === 0 ? "ticket-sep-highlight": "ticket-sep"} />
            <div className={`${idx === 0 ? "card-highlight": "card"} elevate h-16 rounded-b-2xl`}>
              <div className="beans h-full w-full rounded-b-xl"></div>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Tickets;
