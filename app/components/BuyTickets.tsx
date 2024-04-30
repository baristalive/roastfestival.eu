"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import ArrowIcon from "../icons/arrow";

export const BuyTickets = ({ className }: { className?: string }) => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <div className="mx-auto flex flex-col items-center gap-24 py-24">
      <div className="flex flex-col items-center gap-8">
        <a
          className="elevate flex divide-x-2 divide-dashed divide-[var(--white)] rounded-2xl bg-[var(--black)] p-4 text-[var(--white)]"
          href=""
          rel="external"
          target="_blank"
        >
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-4 text-center">
            <span className="text-6xl font-bold">1st crack</span>
            zbývá 60 dní
          </div>
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-4 text-center">
            <span className="text-6xl font-bold">So + Ne</span>
            <span className="text-4xl font-bold">400 Kč</span>
            Snížené vstupné: 300 Kč
          </div>
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-4 text-center">
            <span className="text-6xl font-bold">So</span>
            <span className="text-4xl font-bold">300 Kč</span>
            Snížené vstupné: 250 Kč
          </div>
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-4 text-center">
            <span className="text-6xl font-bold">Ne</span>
            <span className="text-4xl font-bold">250 Kč</span>
            Snížené vstupné: 250 Kč
          </div>
        </a>
        <a
          className="card elevate flex scale-90 divide-x-2 divide-dashed divide-[var(--black)] rounded-2xl p-4"
          href=""
          rel="external"
          target="_blank"
        >
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-4 text-center">
            <span className="text-6xl font-bold">2nd crack</span>
            od 1.7.2024
          </div>
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-4 text-center">
            <span className="text-6xl font-bold">So + Ne</span>
            <span className="text-4xl font-bold">400 Kč</span>
            Snížené vstupné: 300 Kč
          </div>
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-4 text-center">
            <span className="text-6xl font-bold">So</span>
            <span className="text-4xl font-bold">300 Kč</span>
            Snížené vstupné: 250 Kč
          </div>
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-4 text-center">
            <span className="text-6xl font-bold">Ne</span>
            <span className="text-4xl font-bold">250 Kč</span>
            Snížené vstupné: 250 Kč
          </div>
        </a>
        <a
          className="card elevate flex scale-90 divide-x-2 divide-dashed divide-[var(--black)] rounded-2xl p-4"
          href=""
          rel="external"
          target="_blank"
        >
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-4 text-center">
            <span className="text-6xl font-bold">Na místě</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-4 text-center">
            <span className="text-6xl font-bold">So + Ne</span>
            <span className="text-4xl font-bold">400 Kč</span>
            Snížené vstupné: 300 Kč
          </div>
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-4 text-center">
            <span className="text-6xl font-bold">So</span>
            <span className="text-4xl font-bold">300 Kč</span>
            Snížené vstupné: 250 Kč
          </div>
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-4 text-center">
            <span className="text-6xl font-bold">Ne</span>
            <span className="text-4xl font-bold">250 Kč</span>
            Snížené vstupné: 250 Kč
          </div>
        </a>
      </div>
      <a
        href={lang.contacts.tickets}
        title={lang.buyTickets}
        rel="external"
        className="nav"
      >
        <nav className="cta elevate relative rounded-full px-8 py-2 lowercase md:py-4 md:pr-24 md:text-xl 2xl:px-12 2xl:py-6 2xl:pr-24 2xl:text-3xl">
          <span className="">{lang.buyTickets}</span>
          <span className="absolute right-0 top-1/2 -translate-y-1/2 text-sm text-[var(--black)] md:text-xl 2xl:text-3xl">
            <ArrowIcon />
          </span>
        </nav>
      </a>
    </div>
  );
};
