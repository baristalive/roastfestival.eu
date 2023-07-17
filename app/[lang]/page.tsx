"use client";

import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../dictionaries/all";
import Link from "next/link";
import FacebookIcon from "../icons/facebook";
import InstagramIcon from "../icons/instagram";
import AtIcon from "../icons/at";
import ArrowIcon from "../icons/arrow";
import PlusIcon from "../icons/plus";

const Page1 = () => {
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

const About = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="inverted pt-20 text-center">
      <h2 className="uppercase font-medium text-4xl py-20 ">
        {lang.about.title}
      </h2>
      <div className="space-y-10 mx-auto px-6 lg:px-0 lg:text-4xl text-xl max-w-screen-lg">
        {lang.about.text.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </section>
  );
};

const Filler = () => (
  <section className="inverted">
    <div className="filler max-w-screen-lg mx-auto"></div>
  </section>
);

const Program = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="text-center">
      <div className="inverted p-8 md:p-0">
        <h2 className="hidden md:block uppercase font-medium text-4xl pt-20">
          Program
        </h2>
      </div>
      {lang.program.map((d, idx) => (
        <div
          key={d.title}
          className={`${idx % 2 ? "" : "inverted"} p-2 md:p-20`}
        >
          <div className="md:hidden py-20 px-6 flex">
            <h2 className="grow uppercase font-medium pt-2 text-left text-3xl">
              Program
            </h2>
            <div className="text-right">
              <h3 className="text-5xl font-semibold">{d.date}</h3>
              <small className="text-2xl">{d.title}</small>
            </div>
          </div>
          <div className="max-w-5xl flex mx-auto gap-12">
            <div className="hidden md:block">
              <h3 className="text-8xl">{d.date}</h3>
              <small className="text-4xl">{d.title}</small>
            </div>
            <dl className="grow divide-y-2 divide-current md:text-left">
              {d.schedule.map((i) => (
                <div
                  key={i.time}
                  className="m-2 md:m-0 md:grid md:grid-cols-4 md:gap-4 py-3 md:px-0"
                >
                  <dt className="text-xl md:text-2xl font-bold">{i.time}</dt>
                  <dd className="text-xl md:text-2xl md:col-span-3 md:mt-0">
                    {i.title}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      ))}
    </section>
  );
};

const BuyTickets = () => {
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

const Sponsors = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="inverted py-20 text-center">
      <h2 className="uppercase font-medium text-4xl py-20 ">
        {lang.sponsors.title}
      </h2>
      <div className="text-xl flex justify-center flex-wrap items-center gap-8">
        {lang.sponsors.content?.map((s: {href: string, src: string}) => (
          <div className="p-2" key={s.href}>
            <a href={s.href}>
              {
              // eslint-disable-next-line @next/next/no-img-element
              }<img
                src={s.src}
                alt="Sponsor logo"
                className="max-h-[16rem] max-w-[16rem]"
                style={{
                  filter:
                    "sepia(5) saturate(100) grayscale(1) contrast(1000)  invert(0.87) sepia(15%) saturate(2736%) hue-rotate(15deg) brightness(111%) contrast(100)",
                }}
              />
            </a>
          </div>
        ))}
        <div className="rounded-lg px-10 py-20 opacity-50 hover:opacity-100 transition-opacity duration-200">
          <a href={lang.contacts.email}>
            <PlusIcon />
            <h4 className="mt-4">{lang.sponsors.add}</h4>
          </a>
        </div>
      </div>
    </section>
  );
};

const Organizers = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="inverted py-20 text-center">
      <h2 className="uppercase font-medium text-4xl py-20 ">
        {lang.organizers.title}
      </h2>
      <div className="space-y-10 mx-auto px-6 lg:px-0 lg:text-4xl text-xl max-w-screen-lg">
        {lang.organizers.text.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <footer className="inverted h-[50vh] p-10 flex flex-col justify-end">
      <nav className="text-center font-medium text-xl">
        <div>{lang.contact}</div>
        <div className="flex justify-center gap-4 mt-2 pb-40">
          <a className="inverted" href={lang.contacts.facebook}>
            <FacebookIcon />
          </a>
          <a className="inverted" href={lang.contacts.instagram}>
            <InstagramIcon />
          </a>
          <a className="h-[34px] w-[34px]" href={lang.contacts.email}>
            <AtIcon />
          </a>
        </div>
      </nav>
      <div className="max-w-4xl w-full mx-auto">
        <ul className="space-y-2 text-lg text-right">
          <li className="font-regular">
            &copy; {`${new Date().getFullYear()}`} Barista Live, z. s.
          </li>
        </ul>
      </div>
    </footer>
  );
};

const Map = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="inverted h-screen py-20 text-center">
      <h2 className="uppercase font-medium text-4xl py-20 ">
        {lang.location.title}
      </h2>
    </section>
  );
};

export default function Home({
  params,
}: {
  params: { lang: SupportedLanguages };
}) {
  return (
    <div className="overlay">
      <div className="lang inverted uppercase">
        <Link href={params.lang === "cz" ? "./en" : "./cz"}>
          {params.lang === "cz" ? "Switch to English" : "Přepnout do češtiny"}
        </Link>
      </div>
      <Page1 />
      <About />
      <Filler />
      <Sponsors />
      <Program />
      <BuyTickets />
      <Map />
      <Organizers />
      <Footer />
    </div>
  );
}
