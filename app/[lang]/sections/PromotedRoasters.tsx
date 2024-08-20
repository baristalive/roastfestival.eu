"use client";

import Bar from "@/app/components/Bar";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
("@/app/dictionaries/all");
import Image from "next/image";

export const PromotedRoasters = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);

  const { contextSafe } = useGSAP();

  return (
    <section className="watermark5 pb-48 promoted-roasters-section" id="promoted" ref={ref}>
      <div className="mx-auto grid max-w-[1900px] items-center gap-12 p-8 lg:grid-cols-[1fr,1fr] 2xl:gap-32">
        <div className="md:p-12">
          <h2 className="pb-8 pt-24 text-3xl font-bold md:pt-0 2xl:pt-20 2xl:text-6xl">
            {lang.promoted.roasters.title}
          </h2>
          <div className="space-y-10 text-base leading-normal 2xl:text-xl">
            {lang.promoted.roasters.text.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Bar mountRef={ref} contextSafe={contextSafe} />
        </div>
      </div>
      <h2 className="p-8 text-center text-3xl md:px-20 ">{lang.promoted.roasters.honoredTitle}</h2>
      <div className="mx-auto my-10 flex max-w-screen-2xl flex-wrap items-center justify-center gap-2 gap-y-4 text-xl md:gap-20">
        {lang.promoted.roasters.honored
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
      <h2 className="px-8 pb-2 pt-16 text-center text-3xl md:px-20">{lang.promoted.roasters.regularTitle}</h2>
      <div className="mx-auto my-10 flex max-w-screen-2xl flex-wrap items-center justify-center gap-2 gap-y-4 text-xl md:gap-20">
        {lang.promoted.roasters.regular
          ?.sort(() => Math.random() - 0.5)
          .map((s: { href: string; src: string; alt: string }) => (
            <div className="p-2" key={s.href}>
              <a href={s.href} target="_blank" rel="external" title={s.alt}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  className="max-h-[16rem] max-w-[16rem]"
                  width={160}
                  height={160}
                  unoptimized
                  loader={({ src }) => src}
                />
                <span className="sr-only">{s.alt}</span>
              </a>
            </div>
          ))}
        <div className="p-2 text-base 2xl:text-xl">a další...</div>
      </div>
      <div className="mx-auto grid max-w-[1900px] items-center gap-12 p-8 lg:grid-cols-[1fr,1fr] 2xl:gap-32">
        <div className="md:p-12">
          <h2 className="pb-8 pt-24 text-3xl font-bold md:pt-0 2xl:pt-20 2xl:text-6xl">
            {lang.promoted.others.title}
          </h2>
          <div className="space-y-10 text-base leading-normal 2xl:text-xl">
            {lang.promoted.others.text.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Bar mountRef={ref} contextSafe={contextSafe} />
        </div>
      </div>
      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-stretch justify-center gap-2 text-xl md:gap-20">
        {lang.promoted.others.items
          ?.sort(() => Math.random() - 0.5)
          .map((s: { href: string; src: string; alt: string }) => (
            <div className="p-2" key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="external"
                title={s.alt}
                className="flex h-full flex-col items-center justify-between gap-4"
              >
                <div className="flex h-[200px] items-center justify-center">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={160}
                    height={160}
                    unoptimized
                    loader={({ src }) => src}
                  />
                </div>
                <span className="sr-only">{s.alt}</span>
                <div className="justify-self-end text-center text-2xl font-bold">
                  {s.alt}
                </div>
              </a>
            </div>
          ))}
      </div>
    </section>
  );
};

export default PromotedRoasters;
