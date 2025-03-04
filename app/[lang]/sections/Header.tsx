"use client";
import { useParams } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import FacebookIcon from "@/app/icons/facebook";
import InstagramIcon from "@/app/icons/instagram";
import ArrowIcon from "@/app/icons/arrow";
import Logo from "../components/Logo";
import Link from "next/link";

export const Header = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.set("h1", { opacity: 0, y: "+=20px" });
      gsap.to("h1", {
        delay: 1.5,
        y: 0,
        opacity: 1,
        ease: "back.out",
      });
      gsap.set([".fade-in", ".fade-in-2"], { opacity: 0 });
      gsap.to(".fade-in", { delay: 1, duration: 1, opacity: 1 });
      gsap.set(".slide-in", { left: 0 });
      const tl = gsap.timeline();
      tl.to(".slide-in", {
        duration: 0.5,
        delay: 1,
        left: "calc(100% - 3em)",
        ease: "bounce.out",
      });
      tl.to(".fade-in-2", { duration: 1, opacity: 1 });
    },
    { scope: ref },
  );

  return (
    <header
      ref={ref}
      className="elevate z-10 flex h-svh flex-col items-center justify-between py-8"
    >
      {lang.banner && <a
        href={lang.contacts.tickets}
        title={lang.buyTickets}
        rel="external"
        className="fade-in elevate z-10 -mt-8 block w-full bg-[var(--secondary)] p-4 pb-3 text-center text-sm font-semibold md:text-xl will-change-[opacity]"
      >
        {lang.banner}
      </a>
}
      <div className="mb-auto flex w-full max-w-[1900px] justify-between px-12 pt-2 text-sm md:text-xl 2xl:px-20 2xl:py-8 2xl:text-3xl">
        <div className="fade-in font-medium leading-snug will-change-[opacity]">
          {lang.date}
          <br />
          {lang.place}
        </div>
        <div className="fade-in text-right font-medium leading-snug will-change-[opacity]">
          <nav className="">
            <div className="flex justify-end gap-4">
              <a
                href={lang.contacts.facebook}
                title="Facebook"
                rel="external"
                className="nav"
                target="_blank"
              >
                <FacebookIcon />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href={lang.contacts.instagram}
                title="Instagram"
                rel="external"
                className="nav"
                target="_blank"
              >
                <InstagramIcon />
                <span className="sr-only">Instagram</span>
              </a>
              <Link
                href={params.lang === "cz" ? "./en" : "./cz"}
                rel="alternate"
                className="nav table-cell h-[3em] w-[3em] rounded-full border border-current py-2 text-center align-middle lowercase leading-[1.6em] md:py-4 md:leading-[1.4em] 2xl:py-6 2xl:leading-[1.1em]"
              >
                {params.lang === "cz" ? "en" : "cz"}
              </Link>
            </div>
          </nav>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 top-0 flex flex-col items-center justify-center text-xl sm:bottom-0 md:text-3xl xl:text-5xl 2xl:text-8xl">
        <div className="pointer-events-auto mx-auto -mb-[2em] max-w-[1600px]">
          <Logo />
        </div>
        <div className="pt-12 text-center lg:pt-6">
          <h1 className="mx-auto inline-block max-w-min font-bold lowercase leading-none will-change-[opacity,_transform]">
            {lang.title}
          </h1>
        </div>
      </div>
      <div className="fade-in flex w-full max-w-[1900px] flex-col gap-8 px-12 text-center font-medium leading-snug md:flex-row md:items-end md:justify-between md:text-xl 2xl:px-20 2xl:py-8 2xl:text-3xl will-change-[opacity]">
        <div className="flex flex-col gap-8">
          <a href="#info" className="nav">
            <nav className="rounded-full border border-current px-4 py-2 lowercase md:px-6 md:py-4 2xl:px-12 2xl:py-6">
              Info
            </nav>
          </a>
          <a href="#program" className="nav">
            <nav className="rounded-full border border-current px-4 py-2 lowercase md:px-6 md:py-4 2xl:px-12 2xl:py-6">
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
          <nav className="cta elevate relative rounded-full border border-current px-8 py-2 lowercase md:py-4 md:pr-24 2xl:px-12 2xl:py-6 2xl:pr-28">
            <span className="fade-in-2 will-change-[opacity]">{lang.buyTickets}</span>
            <span className="slide-in absolute right-0 top-1/2 -translate-y-1/2 text-sm text-[var(--accent)] md:text-xl 2xl:text-3xl will-change-[left]">
              <ArrowIcon />
            </span>
          </nav>
        </a>
      </div>
    </header>
  );
};
