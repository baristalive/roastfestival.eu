"use client";

import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../dictionaries/all";
import Link from "next/link";
import FacebookIcon from "../icons/facebook";
import InstagramIcon from "../icons/instagram";
import AtIcon from "../icons/at";
import ArrowIcon from "../icons/arrow";

const Page1 = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="h-screen flex flex-col p-8 content-stretch page1">
      <div className="grow flex md:flex-row flex-col md:justify-center gap-20">
        <header className="flex flex-row gap-8 w-full max-w-[1900px]">
          <div className="hidden md:block basis-1/6 font-medium text-2xl">
            {lang.date}
            <br />
            {lang.place}
          </div>
          <div className="grow text-center pt-20 md:pt-6">
            <h1 className="uppercase max-w-lg mx-auto font-medium text-3xl">
              {lang.title}
            </h1>
          </div>
          <nav className="hidden md:block basis-1/12 text-right font-medium text-2xl">
            <a href="#">{lang.tickets}</a>
          </nav>
          <nav className="hidden md:block text-right font-medium text-2xl">
            <div>{lang.contact}</div>
            <div className="flex justify-end gap-4 mt-4">
              <a href="#">
                <FacebookIcon />
              </a>
              <a href="#">
                <InstagramIcon />
              </a>
            </div>
          </nav>
        </header>
        <div className="md:hidden block font-medium text-2xl text-center">
          {lang.date}
          <br />
          {lang.place}
        </div>
      </div>

      <div className="md:hidden block text-center mx-auto py-20">
        <a
          className="rounded-full py-6 px-12 border  border-current text-2xl font-bold"
          href="#"
        >
          {lang.buyTickets}
        </a>
      </div>
      <div className="text-2xl text-center mb-12">
        <div className="max-w-md mx-auto">{lang.programLoadingText}</div>
      </div>
      <div className="text-6xl text-center">
        <ArrowIcon />
      </div>
    </section>
  );
};

const About = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="inverted py-20 text-center">
      <h2 className="uppercase font-medium text-3xl py-20 ">
        {lang.about.title}
      </h2>
      <div className="space-y-10 mx-auto px-6 md:px-0 text-2xl max-w-3xl">
        {lang.about.text.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </section>
  );
};

const Filler = () => <section className="inverted filler" />;

const Program = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="text-center">
      <div className="inverted p-8 md:p-20">
        <h2 className="hidden md:block uppercase font-medium text-3xl py-20">
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
              <small className="text-3xl">{d.title}</small>
            </div>
            <dl className="grow divide-y divide-current md:text-left">
              {d.schedule.map((i) => (
                <div
                  key={i.time}
                  className="m-2 md:m-0 md:grid md:grid-cols-3 md:gap-4 py-3 md:px-0"
                >
                  <dt className="text-xl font-bold">{i.time}</dt>
                  <dd className="text-xl md:col-span-2 md:mt-0">{i.title}</dd>
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
    <section className="text-center mx-auto py-20">
      <a
        className="rounded-full py-6 px-12 border  border-current text-2xl font-bold"
        href="#"
      >
        {lang.buyTickets}
      </a>
    </section>
  );
};

const Footer = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <footer className="inverted p-10">
      <nav className="text-center mx-auto font-medium text-2xl">
        <div>{lang.contact}</div>
        <div className="flex justify-center gap-4 mt-2 pb-40">
          <a className="inverted" href="#">
            <FacebookIcon />
          </a>
          <a className="inverted" href="#">
            <InstagramIcon />
          </a>
          <a className="h-[34px] w-[34px]" href="mailto:info@baristalive.cz">
            <AtIcon />
          </a>
        </div>
      </nav>
      <ul className="space-y-2 text-lg  max-w-4xl mx-auto text-right">
        <li className="font-semibold">
          &copy; {`${new Date().getFullYear()}`} Barista Live, z. s.
        </li>
      </ul>
    </footer>
  );
};

const Map = () => <section className="inverted h-screen" />;

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
      <Program />
      <BuyTickets />
      <Map />
      <Footer />
    </div>
  );
}
