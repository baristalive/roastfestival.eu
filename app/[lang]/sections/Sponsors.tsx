"use client";

import Bar from "@/app/components/Bar";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
("@/app/dictionaries/all");
import Image from "next/image";

export const Sponsors = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);

  const { contextSafe } = useGSAP();

  return (
    <section className="watermark pb-48" id="promoted" ref={ref}>
      <div className="mx-auto grid max-w-[1900px] items-center gap-12 p-8 lg:grid-cols-[1fr,1fr] 2xl:gap-32">
        <div className="md:p-12">
          <h2 className="pb-8 pt-24 text-3xl font-bold md:pt-0 2xl:pt-20 2xl:text-6xl">
            {lang.promoted.sponsors.title}
          </h2>
          <Bar mountRef={ref} contextSafe={contextSafe} />
        </div>
      </div>
      <div className="mx-auto my-10 flex max-w-screen-2xl flex-wrap items-center justify-center gap-2 gap-y-4 text-xl md:gap-20">
        {lang.promoted.sponsors.items
          ?.sort(() => Math.random() - 0.5)
          .map((s: { href: string; src: string; alt: string }) => (
            <div className="p-2" key={s.href}>
              <a href={s.href} target="_blank" rel="external" title={s.alt}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  className="max-h-[20rem] max-w-[20rem]"
                  width={320}
                  height={320}
                  unoptimized
                  loader={({ src }) => src}
                />
                <span className="sr-only">{s.alt}</span>
              </a>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Sponsors;
