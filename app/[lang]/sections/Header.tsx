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
      gsap.to(".fade-in", { duration: 1, opacity: 1 });
      gsap.set(".slide-in", { left: 0 });
      const tl = gsap.timeline();
      tl.to(".slide-in", {
        duration: 1,
        left: "calc(100% - 80px)",
        ease: "bounce.out",
      });
      tl.to(".fade-in-2", { duration: 1, opacity: 1 });
    },
    { scope: header },
  );

  return (
    <section
      ref={header}
      className="page1 flex h-svh flex-col content-stretch items-center p-8"
    >
      <div className="flex w-full max-w-[1900px] justify-between p-12 pt-2 ">
        <div className="fade-in text-3xl font-medium leading-snug ">
          {lang.date}
          <br />
          {lang.place}
        </div>
        <div className="fade-in text-right text-3xl font-medium leading-snug">
          <nav className="">
            <div className="flex justify-end gap-4">
              <a href={lang.contacts.facebook} title="Facebook" rel="external">
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
      </div>
      <div className="flex grow flex-col items-center justify-center">
        <div className="logo mx-auto mb-[-10%] max-w-[1600px] ">
          <Logo />
        </div>
        <div className="pt-12 text-center lg:pt-6">
          <h1 className="mx-auto inline-block max-w-min text-[5.9vw] font-bold lowercase leading-none 2xl:text-8xl">
            {lang.title}
          </h1>
        </div>
      </div>
      <div className="fade-in flex w-full max-w-[1900px] flex-col gap-8 p-12 text-center text-3xl font-medium md:flex-row md:items-end md:justify-between ">
        <div className="flex flex-col gap-8 leading-snug">
          <a href="#info" className="nav">
            <nav className="rounded-full border border-current px-12 py-6 lowercase">
              Info
            </nav>
          </a>
          <a href="#program"  className="nav">
            <nav className="rounded-full border border-current px-12 py-6 lowercase">
              Program
            </nav>
          </a>
        </div>

        <a href={lang.contacts.tickets} title={lang.buyTickets} rel="external"  className="nav">
          <nav className="inverted relative rounded-full border border-current py-6 pl-12 pr-24 lowercase">
            <span className="fade-in-2">{lang.buyTickets}</span>
            <span className="slide-in absolute bottom-0 right-0">
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
    </section>
  );
};
