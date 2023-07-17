"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";

export const BuyTickets = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="text-center mx-auto py-48">
      <a
        className="rounded-full lg:py-6 py-3 lg:px-12 px-8 border border-current text-lg lg:text-2xl font-medium"
        href={lang.contacts.tickets}
      >
        {lang.buyTickets}
      </a>
    </section>
  );
};
