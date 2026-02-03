"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";

type HeadingPart = string | { superscript: string };

const renderHeading = (heading: HeadingPart[]): string => {
  return heading
    .map((part) => (typeof part === "string" ? part : part.superscript))
    .join(" ");
};

export const Tickets = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  const ticketTiers = lang.tickets.priceList.slice(0, 3);

  return (
    <section id="tickets" className="bg-primary text-ivory px-6 py-32">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-display text-ivory mb-4 text-3xl leading-[0.85] font-black uppercase md:text-6xl">
            {lang.tickets.title}
          </h2>
          <p className="text-secondary text-2xl tracking-wider uppercase">
            {params.lang === "cz"
              ? "Limitka! Víc nebude!"
              : "Limited Availability"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {ticketTiers.map((tier, idx) => {
            const isFeatured = idx === 1;
            const price = tier.prices[0];

            const headingText = renderHeading(tier.heading);

            return (
              <div
                key={headingText}
                className={`relative flex flex-col ${
                  isFeatured
                    ? "bg-accent text-evergreen shadow-[20px_20px_0px_0px_var(--color-primary)] md:-translate-y-8"
                    : "bg-secondary text-evergreen group"
                }`}
              >
                <div className="bg-evergreen flex h-12 w-full items-center justify-between px-4">
                  <span className="font-display text-ivory font-black tracking-tighter uppercase">
                    {headingText}
                  </span>
                  {isFeatured && (
                    <span className="bg-secondary text-evergreen px-2 py-0.5 text-xs font-bold uppercase">
                      {params.lang === "cz" ? "Náš oblíbený" : "Our favorite"}
                    </span>
                  )}
                  {!isFeatured && (
                    <div className="flex gap-1">
                      <div
                        className={`h-3 w-3 rounded-full ${idx === 0 ? "bg-secondary" : "bg-primary animate-pulse"}`}
                      ></div>
                      {idx === 0 && (
                        <div className="bg-accent h-3 w-3 rounded-full"></div>
                      )}
                    </div>
                  )}
                </div>
                <div className="border-evergreen flex grow flex-col border-x-4 border-b-4 p-8">
                  <span className="font-display mb-4 text-5xl font-black">
                    {price?.full} Kč
                  </span>
                  <ul className="mb-12 grow space-y-3 text-sm font-bold tracking-tight uppercase">
                    {tier.prices.map((p) => (
                      <li key={p.title} className="flex items-center gap-2">
                        <span
                          className={`${isFeatured ? "text-evergreen" : ""}`}
                        >
                          {idx === 2 ? "O" : "✓"}
                        </span>
                        {p.title}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={lang.contacts.tickets}
                    target="_blank"
                    rel="external"
                    className={`font-display bg-evergreen text-ivory w-full py-4 text-center text-xl font-black uppercase transition-colors ${
                      isFeatured
                        ? "hover:bg-primary"
                        : idx === 0
                          ? "group-hover:bg-accent"
                          : "group-hover:bg-primary"
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
