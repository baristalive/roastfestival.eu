"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";

export const BuyTickets = ({className} : {className?: string}) => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className={`mx-auto pb-64 text-center ${className}`}>
      <a
        className="rounded-full border border-current px-8 py-3 text-lg font-medium lg:px-12 lg:py-6 lg:text-2xl hover:opacity-80"
        href={lang.contacts.tickets}
        title={lang.buyTickets}
        rel="external"
      >
        {lang.buyTickets}
      </a>
    </section>
  );
};
