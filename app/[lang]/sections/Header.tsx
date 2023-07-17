"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";
import FacebookIcon from "../../icons/facebook";
import InstagramIcon from "../../icons/instagram";
import ArrowIcon from "../../icons/arrow";

export const Header = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="h-screen flex flex-col p-8 content-stretch page1">
      <div className="logo" />
      <div className="flex flex-col gap-8">
        <header className="mx-auto lg:grid lg:grid-cols-[1fr_minmax(0,_50vw)_1fr] w-full max-w-[1900px]">
          <div className="hidden lg:block font-medium text-xl lg:text-3xl leading-none">
            {lang.date}
            <br />
            {lang.place}
          </div>
          <div className="text-center pt-12 lg:pt-6">
            <h1 className="uppercase max-w-lg mx-auto font-medium text-3xl lg:text-4xl">
              {lang.title}
            </h1>
          </div>
          <div className="text-right font-medium text-3xl leading-none">
            <nav className="hidden lg:inline-block pr-10 align-top">
              <a href={lang.contacts.tickets}>{lang.tickets}</a>
            </nav>
            <nav className="hidden lg:inline-block ">
              <div className="flex justify-end gap-4">
                <a href={lang.contacts.facebook}>
                  <FacebookIcon />
                </a>
                <a href={lang.contacts.instagram}>
                  <InstagramIcon />
                </a>
              </div>
            </nav>
          </div>
        </header>
        <div className="lg:hidden font-medium text-lg text-center">
          {lang.date}
          <br />
          {lang.place}
        </div>
      </div>
      <div className="grow logo-inline" />
      <div className="lg:hidden text-center mx-auto lg:py-20 py-10">
        <a
          className="rounded-full py-3 px-8 border border-current text-lg lg:text-2xl font-medium"
          href={lang.contacts.tickets}
        >
          {lang.buyTickets}
        </a>
      </div>
      <div className="text-lg lg:text-4xl text-center lg:mb-12">
        <div className="max-w-md mx-auto">{lang.programLoadingText}</div>
      </div>
      <div className="lg:text-6xl text-3xl text-center lg:mb-12">
        <ArrowIcon />
      </div>
    </section>
  );
};
