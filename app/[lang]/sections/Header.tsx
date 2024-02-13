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
import Link from "next/link";

export const Header = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const header = useRef(null);

  useGSAP(
    () => {
      gsap.set("h1", { opacity: 0, y: "+=20px" });
      gsap.to("h1", {
        delay: 2.5,
        y: 0,
        opacity: 1,
        ease: "back.out",
      });
      gsap.set([".fade-in", ".fade-in-2"], { opacity: 0 });
      gsap.to(".fade-in", { delay: 1, duration: 1, opacity: 1 });
      gsap.set(".slide-in", { left: 0 });
      const tl = gsap.timeline();
      tl.to(".slide-in", {
        duration: 1,
        delay: 1,
        left: "calc(100% - 3em)",
        ease: "bounce.out",
      });
      tl.to(".fade-in-2", { duration: 1, opacity: 1 });
    },
    { scope: header },
  );

  return (
    <header
      ref={header}
      className="flex h-svh flex-col justify-between items-center p-8 z-10"
    >
      <div className="flex w-full max-w-[1900px] justify-between pt-2 md:p-12 2xl:text-3xl">
        <div className="fade-in font-medium leading-snug ">
          {lang.date}
          <br />
          {lang.place}
        </div>
        <div className="fade-in text-right font-medium leading-snug">
          <nav className="">
            <div className="flex justify-end gap-4">
              <a
                href={lang.contacts.facebook}
                title="Facebook"
                rel="external"
                className="nav"
              >
                <FacebookIcon />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href={lang.contacts.instagram}
                title="Instagram"
                rel="external"
                className="nav"
              >
                <InstagramIcon />
                <span className="sr-only">Instagram</span>
              </a>
              <Link
                href={params.lang === "cz" ? "./en" : "./cz"}
                rel="alternate"
                className="rounded-full nav border border-current w-[3em] leading-[1.1em] table-cell align-middle text-center lowercase 2xl:py-6"
              >
                {params.lang === "cz" ? "en" : "cz"}
              </Link>
            </div>
          </nav>
        </div>
      </div>
      <div className="flex absolute pointer-events-none top-0 bottom-1/4 sm:bottom-0 flex-col items-center justify-center text-2xl md:text-5xl xl:text-6xl 2xl:text-8xl">
        <div className="logo mx-auto -mb-[2em] max-w-[1600px] pointer-events-auto">
          <Logo />
        </div>
        <div className="pt-12 text-center lg:pt-6">
          <h1 className="mx-auto inline-block max-w-min font-bold lowercase leading-none">
            {lang.title}
          </h1>
        </div>
      </div>
      <div className="fade-in flex w-full max-w-[1900px] flex-col gap-8 text-center font-medium md:flex-row md:items-end md:justify-between md:p-12 md:text-3xl leading-snug">
        <div className="flex flex-col gap-8">
          <a href="#info" className="nav">
            <nav className="rounded-full border border-current px-8 2xl:px-12 py-2 lowercase md:py-4 2xl:py-6">
              Info
            </nav>
          </a>
          <a href="#program" className="nav">
            <nav className="rounded-full border border-current px-8 2xl:px-12 py-2 lowercase md:py-4 2xl:py-6">
              Program
            </nav>
          </a>
        </div>

        <a
          href={lang.contacts.tickets}
          title={lang.buyTickets}
          rel="external"
          className="nav"
        >
          <nav className="cta relative rounded-full border border-current px-8 2xl:px-12 py-2 lowercase md:py-4 2xl:py-6 md:pr-24 2xl:pr-24">
            <span className="fade-in-2">{lang.buyTickets}</span>
            <span className="slide-in right-0 absolute top-1/2 -translate-y-1/2">
              <ArrowIcon />
            </span>
          </nav>
        </a>
        {/* <div className="text-center text-lg lg:mb-12 lg:text-4xl">
        <div className="mx-auto max-w-md">{lang.ready ? lang.programReadyText : lang.programLoadingText}</div>
      </div>
      <div className="text-center text-3xl lg:mb-12 lg:text-6xl">
        <ArrowIcon />
      </div> */}
      </div>
    </header>
  );
};
