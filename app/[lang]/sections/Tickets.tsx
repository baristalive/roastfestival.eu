"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import { TicketCard } from "../components/TicketCard";
import { Availability, getAvailability } from "@/app/utils/ticket";
import { Section } from "@/app/components/Section";

export const Tickets = () => {
  const params = useParams();
  const langCode = params.lang as SupportedLanguages;
  const lang = dictionaries[langCode];

  const ticketTiers = lang.tickets.priceList.slice(0, 3);
  const anyFeatured = ticketTiers.some(
    (t) => getAvailability(t.availability) === Availability.AvailableNow,
  );

  return (
    <Section id="tickets" className="bg-primary px-6 py-32 text-white">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-display mb-4 text-3xl leading-[0.85] font-black text-white uppercase md:text-6xl">
            {lang.tickets.title}
          </h2>
          <p className="text-accent text-2xl tracking-wider uppercase">
            {lang.tickets.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {ticketTiers.map((tier, idx) => (
            <TicketCard
              key={idx}
              tier={tier}
              shouldFeatureRegardless={!anyFeatured && idx === 0}
              ticketsHref={lang.contacts.tickets}
              labels={{
                buyTickets: lang.buyTickets,
                comingSoon: lang.tickets.comingSoon,
                missedOut: lang.tickets.missedOut,
                priceIncreases: lang.tickets.priceIncreases,
                soldOut: lang.tickets.soldOut,
                soonAvailable: lang.tickets.soonAvailable,
              }}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};
