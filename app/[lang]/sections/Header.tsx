"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import { BeanGrid } from "@/app/[lang]/components/BeanGrid";
import ArrowIcon from "@/app/icons/arrow";

export const Header = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate offset from center, normalized to -1 to 1
      const normalizedX = (e.clientX - centerX) / centerX;
      const normalizedY = (e.clientY - centerY) / centerY;

      // Move opposite to cursor, with a max offset of 20px
      setMouseOffset({
        x: -normalizedX * 10,
        y: -normalizedY * 10,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10 grid grid-cols-2 md:grid-cols-8">
        <div className="bg-accent bg-lines hidden md:block"></div>
        <div className="bg-primary bg-dots md:col-span-4"></div>
        <div className="bg-secondary md:col-span-3"></div>
      </div>

      {/* Interactive Bean Grid - positioned over the right stripe */}
      <div className="absolute top-0 right-0 bottom-0 w-1/2 md:w-[37.5%]">
        <BeanGrid />
      </div>

      <div className="pointer-events-none relative container mx-auto flex grow flex-col items-center justify-center px-6 text-center">
        <div className="punk-border pop-shadow normal mb-8 translate-z-1 rotate-2 px-6 py-2">
          <span className="font-display text-mahagony text-xl font-black tracking-tighter uppercase md:text-2xl">
            {lang.date}
          </span>
        </div>

        <h1 className="font-display text-onyx relative mb-6 text-[15vw] leading-[0.8] font-black tracking-tight select-none">
          <span className="text-stroke-outline relative z-10 block">
            Roast!
          </span>
          <span
            className="text-stroke absolute top-1 left-1 -z-10 transition-transform duration-150 ease-out lg:top-4 lg:left-4"
            style={{
              transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
            }}
          >
            Roast!
          </span>
        </h1>

        <div className="font-display max-w-2xl text-2xl font-bold tracking-tight text-black uppercase md:text-4xl">
          {lang.tagline.top}
        </div>
        <div className="font-display normal mt-4 mb-12 max-w-2xl translate-z-1 -rotate-2 px-4 py-2 text-2xl font-bold tracking-tight text-black uppercase md:text-4xl">
          {lang.tagline.bottom}
        </div>

        <div className="hidden md:flex">
          <a href="#tickets" className="group pointer-events-auto inline-block">
            <div className="punk-border pop-shadow font-display bg-accent px-10 py-5 text-2xl font-black tracking-tighter text-black uppercase transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
              {lang.buyTickets || "Get Tickets"}
            </div>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="animate-bounce pb-8">
        <div className="rotate-90 text-4xl font-bold text-black">
          <ArrowIcon />
        </div>
      </div>
    </header>
  );
};
