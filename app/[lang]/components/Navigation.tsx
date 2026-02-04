"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const SCROLL_STORAGE_KEY = "lang-switch-scroll";

import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import BeanIcon from "@/app/icons/beanicon";

export const Navigation = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Restore scroll position after language switch
  useEffect(() => {
    const savedScroll = sessionStorage.getItem(SCROLL_STORAGE_KEY);
    if (savedScroll) {
      sessionStorage.removeItem(SCROLL_STORAGE_KEY);
      const scrollY = parseInt(savedScroll, 10);
      window.scrollTo(0, scrollY);
      window.dispatchEvent(new Event("scroll"));
    }
  }, []);

  const handleLanguageSwitch = () => {
    sessionStorage.setItem(SCROLL_STORAGE_KEY, window.scrollY.toString());
  };

  const languageSwitcherClasses = `translate-z-1 border-4 border-black  text-sm font-bold tracking-widest uppercase transition-all hover:-rotate-2 ${
    isScrolled
      ? "border-secondary text-secondary hover:bg-secondary hover:text-black"
      : "hover:bg-accent"
  }`;

  return (
    <nav
      className={`fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-all duration-300 ${
        isScrolled
          ? "bg-primary/80 shadow-lg backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <Link
        href={params.lang === "cz" ? "./en" : "./cz"}
        rel="alternate"
        onClick={handleLanguageSwitch}
        className={`order-1 px-3 py-2 md:hidden ${languageSwitcherClasses}`}
      >
        {params.lang === "cz" ? "EN" : "CZ"}
      </Link>

      <div className="group order-2 md:order-1">
        <Link
          href={`/${params.lang}`}
          className={`block h-12 w-12 text-center transition-transform duration-300 group-hover:rotate-12 ${isScrolled ? "text-accent" : ""}`}
        >
          <BeanIcon />
        </Link>
      </div>

      <div className="hidden items-center gap-8 text-sm font-bold tracking-widest uppercase md:order-2 md:flex">
        <a
          href="#about"
          className={`transition-colors ${isScrolled ? "text-secondary hover:text-accent" : "hover:text-secondary"}`}
        >
          The Vibe
        </a>
        <a
          href="#lineup"
          className={`transition-colors ${isScrolled ? "text-secondary hover:text-accent" : "hover:text-secondary"}`}
        >
          Lineup
        </a>
        <a
          href="#tickets"
          className={`transition-colors ${isScrolled ? "text-secondary hover:text-accent" : "hover:text-secondary"}`}
        >
          Tickets
        </a>
        <Link
          href={params.lang === "cz" ? "./en" : "./cz"}
          rel="alternate"
          onClick={handleLanguageSwitch}
          className={`px-3 py-1 ${languageSwitcherClasses}`}
        >
          {params.lang === "cz" ? "EN" : "CZ"}
        </Link>
      </div>
      <a
        href={lang.contacts.tickets}
        className="group relative order-3 inline-block"
      >
        <div
          className={`absolute inset-0 translate-x-1 translate-y-1 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 ${
            isScrolled ? "bg-accent" : "bg-black"
          }`}
        ></div>
        <div
          className={`relative border-4 px-6 py-2 font-bold tracking-tighter uppercase transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 ${
            isScrolled
              ? "border-accent text-accent bg-black"
              : "bg-accent border-black text-black"
          }`}
        >
          {lang.buyTickets || "Book Now"}
        </div>
      </a>
    </nav>
  );
};
