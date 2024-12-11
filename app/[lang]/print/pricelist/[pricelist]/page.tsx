"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import React from "react";
import "./print.css";
import LogoSvg from "@/app/../public/logo.svg";

const mapCategoryToList = (
  category: keyof typeof dictionaries.en.print.categories,
): (keyof typeof dictionaries.en.print.categories)[] => {
  switch (category) {
    case "merch":
      return ["merch", "rental"];
    case "tickets":
      return ["tickets", "rental"];
    default:
      return [category];
  }
};

const Tickets = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  const tickets = lang.tickets.priceList.filter(
    (o) => o.availability === undefined,
  )[0]?.prices || [];

  return (
    <div className="flex w-full justify-center gap-4 items-stretch">
      {tickets.map((price, idx) => (
        <div key={idx} className="flex w-full flex-col rounded-2xl text-center">
          <div
            className={`${idx === 0 ? "card-highlight" : "card"} flex flex-col items-start justify-center gap-2 rounded-t-2xl px-4 pb-0 pt-8`}
          >
            <span className="text-left text-2xl font-bold">{price.title}</span>
            <span className="text-4xl font-bold">{price.full} Kč</span>
            <span className="h-8 text-lg font-normal">
              {price.discounted &&
                `${lang.tickets.discounted}: ${price.discounted} Kč`}
            </span>
          </div>
          <div className={idx === 0 ? "ticket-sep-highlight" : "ticket-sep"} />
          <div
            className={`${idx === 0 ? "card-highlight" : "card"} h-16 rounded-b-2xl`}
          >
            <div className="beans h-full w-full rounded-b-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Pricelist = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const category = params.pricelist as keyof typeof lang.print.categories;

  const categories = mapCategoryToList(category);

  return (
    <header className="flex h-screen flex-col items-center justify-start">
      <div className="z-20 -mb-8 text-5xl">
        <LogoSvg />
      </div>
      {categories.map((c) => (
        <React.Fragment key={c}>
          <h1 className="z-20 py-16 text-6xl font-bold text-[var(--background)]">
            {lang.print.categories[c]}
          </h1>
          <div className="mx-auto flex w-full flex-col items-stretch gap-8 px-20">
          {c === "tickets" ? (
            <Tickets />
          ) : (
                <div className="card z-20 flex w-full flex-col divide-y-2 divide-current rounded-2xl px-10">
                {lang.print.priceList[
                  c as keyof typeof lang.print.priceList
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between py-10 text-center  "
                  >
                    <span className="text-left text-4xl font-bold">
                      {item.title}
                    </span>
                    <span className="text-4xl font-bold">{item.price} Kč</span>
                  </div>
                ))}
              </div>
          )}
          </div>
        </React.Fragment>
      ))}
    </header>
  );
};

export default Pricelist;
