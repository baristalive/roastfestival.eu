"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

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

  return (
    <nav
      className={`fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-all duration-300 ${
        isScrolled
          ? "bg-evergreen text-ivory shadow-lg backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="group">
        <Link
          href={`/${params.lang}`}
          className="block h-12 w-12 text-center transition-transform duration-300 group-hover:rotate-12"
        >
          <BeanIcon />
        </Link>
      </div>

      <div className="hidden items-center gap-8 text-sm font-bold tracking-widest uppercase md:flex">
        <a
          href="#about"
          className={`transition-colors ${isScrolled ? "text-cream hover:text-orange" : "hover:text-burgundy"}`}
        >
          The Vibe
        </a>
        <a
          href="#lineup"
          className={`transition-colors ${isScrolled ? "text-cream hover:text-orange" : "hover:text-teal"}`}
        >
          Lineup
        </a>
        <a
          href="#tickets"
          className={`transition-colors ${isScrolled ? "text-cream hover:text-orange" : "hover:text-orange"}`}
        >
          Tickets
        </a>

        <Link
          href={params.lang === "cz" ? "./en" : "./cz"}
          rel="alternate"
          className={`border-evergreen translate-z-1 border-4 px-3 py-1 transition-all hover:-rotate-2 ${
            isScrolled
              ? "border-secondary text-secondary hover:bg-secondary hover:text-evergreen"
              : "hover:bg-accent hover:text-ivory"
          }`}
        >
          {params.lang === "cz" ? "EN" : "CZ"}
        </Link>
      </div>

      <a href={lang.contacts.tickets} className="group relative inline-block">
        <div
          className={`absolute inset-0 translate-x-1 translate-y-1 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 ${
            isScrolled ? "bg-accent" : "bg-evergreen"
          }`}
        ></div>
        <div
          className={`text-ivory relative border-4 px-6 py-2 font-bold tracking-tighter uppercase transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 ${
            isScrolled
              ? "border-accent bg-evergreen"
              : "border-evergreen bg-accent"
          }`}
        >
          {lang.buyTickets || "Book Now"}
        </div>
      </a>
    </nav>
  );
};
