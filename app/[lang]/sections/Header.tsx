"use client";
import { useParams } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


import { dictionaries, SupportedLanguages } from "../../dictionaries/all";
import FacebookIcon from "../../icons/facebook";
import InstagramIcon from "../../icons/instagram";
import ArrowIcon from "../../icons/arrow";
import Logo from "../components/Logo";

export const Header = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const title = useRef(null);
  const bottom = useRef(null);

  useGSAP(
    () => {
      gsap.set(title.current, { opacity: 0, y: "+=20px" })
      gsap.to(title.current, { delay: 2.5, y: 0, opacity: 1, ease: "back.out" })
    },
    { scope: title },
  );
  useGSAP(
    () => {
      gsap.set(bottom.current, { opacity: 0 })
      gsap.to(bottom.current, { delay: 3.5, opacity: 1 })
    },
    { scope: bottom },
  );

  return (
    <section className="page1 flex h-dvh flex-col content-stretch p-8">
      <div className="flex flex-col gap-8">
        <header className="mx-auto w-full max-w-[1900px] lg:grid lg:grid-cols-[1fr_1fr]">
          <div className="hidden text-xl font-medium leading-none lg:leading-snug lg:block lg:text-3xl">
            {lang.date}
            <br />
            {lang.place}
          </div>
          <div className="text-right text-3xl font-medium leading-snug">
            <nav className="hidden pr-10 align-top lg:inline-block">
              <a
                href={lang.contacts.tickets}
                rel="external"
                title={lang.buyTickets}
              >
                {lang.tickets}
              </a>
            </nav>
            <nav className="hidden lg:inline-block ">
              <div className="flex justify-end gap-4">
                <a
                  href={lang.contacts.facebook}
                  title="Facebook"
                  rel="external"
                >
                  <FacebookIcon />
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href={lang.contacts.instagram}
                  title="Instagram"
                  rel="external"
                >
                  <InstagramIcon />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </nav>
          </div>
        </header>
        <div className="text-center text-lg font-medium lg:hidden">
          {lang.date}
          <br />
          {lang.place}
        </div>
      </div>
      <div className="grow flex justify-center items-center flex-col">
        <div className="logo mx-auto max-w-[1900px] mb-[-10%] ">
          <Logo />
        </div>
        <div className="pt-12 text-center lg:pt-6">
          <h1 ref={title} className="mx-auto font-bold max-w-min inline-block lowercase text-[5.9vw] 2xl:text-8xl leading-none">
            {lang.title}
          </h1>
        </div>
      </div>
      <div ref={bottom}>
      <div className="mx-auto py-10 text-center lg:hidden lg:py-20">
        <a
          className="rounded-full border border-current px-8 py-3 text-lg font-medium lg:text-2xl"
          href={lang.contacts.tickets}
          title={lang.buyTickets}
          rel="external"
        >
          {lang.buyTickets}
        </a>
      </div>
      <div className="text-center text-lg lg:mb-12 lg:text-4xl">
        <div className="mx-auto max-w-md">{lang.ready ? lang.programReadyText : lang.programLoadingText}</div>
      </div>
      <div className="text-center text-3xl lg:mb-12 lg:text-6xl">
        <ArrowIcon />
      </div>
      </div>
    </section>
  );
};
