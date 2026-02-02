"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";

type HeadingPart = string | { superscript: string };

const renderHeading = (heading: HeadingPart[]): string => {
  return heading
    .map((part) => (typeof part === "string" ? part : part.superscript))
    .join("");
};

export const Tickets = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  const ticketTiers = lang.tickets.priceList.slice(0, 3);

  return (
    <section id="tickets" className="bg-midnight text-cream px-6 py-24">
      <div className="container mx-auto">
        <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div>
            <h2 className="font-display text-[10vw] leading-none font-black tracking-tighter uppercase md:text-[8vw]">
              {lang.tickets.title.split(" ")[0]} <br />
              <span className="text-teal">
                {lang.tickets.title.split(" ").slice(1).join(" ") || "Dose."}
              </span>
            </h2>
          </div>
          <div className="text-right">
            <p className="font-display text-orange text-2xl font-bold uppercase">
              {params.lang === "cz"
                ? "Omezená dostupnost"
                : "Limited Availability"}
            </p>
            <p className="text-sm tracking-widest uppercase opacity-60">
              {lang.tickets.priceList[0]?.subheading || ""}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {ticketTiers.map((tier, idx) => {
            const isFeatured = idx === 1;
            const price = tier.prices[0];

            const headingText = renderHeading(tier.heading);

            return (
              <div
                key={headingText}
                className={`relative flex flex-col p-1 ${
                  isFeatured
                    ? "bg-orange text-midnight shadow-[20px_20px_0px_0px_rgba(4,167,119,1)] md:-translate-y-8"
                    : "bg-cream text-midnight group"
                }`}
              >
                <div className="bg-midnight flex h-12 w-full items-center justify-between px-4">
                  <span className="font-display text-cream font-black tracking-tighter uppercase">
                    {String(idx + 1).padStart(2, "0")}. {headingText}
                  </span>
                  {isFeatured && (
                    <span className="bg-teal text-midnight px-2 py-0.5 text-xs font-bold uppercase">
                      {params.lang === "cz" ? "Nejlepší hodnota" : "Best Value"}
                    </span>
                  )}
                  {!isFeatured && (
                    <div className="flex gap-1">
                      <div
                        className={`h-3 w-3 rounded-full ${idx === 0 ? "bg-teal" : "bg-burgundy animate-pulse"}`}
                      ></div>
                      {idx === 0 && (
                        <div className="bg-orange h-3 w-3 rounded-full"></div>
                      )}
                    </div>
                  )}
                </div>
                <div className="border-midnight flex flex-grow flex-col border-x-4 border-b-4 p-8">
                  <span className="font-display mb-4 text-5xl font-black">
                    {price?.full} Kč
                  </span>
                  <ul className="mb-12 flex-grow space-y-3 text-sm font-bold tracking-tight uppercase">
                    {tier.prices.map((p) => (
                      <li key={p.title} className="flex items-center gap-2">
                        <span
                          className={`${isFeatured ? "text-midnight" : idx === 2 ? "text-burgundy" : "text-teal"}`}
                        >
                          {idx === 2 ? "⚡" : "✓"}
                        </span>
                        {p.title}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={lang.contacts.tickets}
                    target="_blank"
                    rel="external"
                    className={`font-display bg-midnight text-cream w-full py-4 text-center text-xl font-black uppercase transition-colors ${
                      isFeatured
                        ? "hover:bg-burgundy"
                        : idx === 0
                          ? "group-hover:bg-teal"
                          : "group-hover:bg-burgundy"
                    }`}
                  >
                    {lang.buyTickets}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
