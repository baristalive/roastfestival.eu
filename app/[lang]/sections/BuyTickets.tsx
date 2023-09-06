"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";

export const BuyTickets = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="inverted mx-auto py-48 text-center">
      <a
        className="rounded-full border border-current px-8 py-3 text-lg font-medium lg:px-12 lg:py-6 lg:text-2xl"
        href={lang.contacts.tickets}
        title={lang.buyTickets}
      >
        {lang.buyTickets}
      </a>
    </section>
  );
};
