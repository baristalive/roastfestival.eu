"use client";

import Bar from "@/app/components/Bar";
import { useParams } from "next/navigation";
import {
  dictionaries,
  Presenter,
  SupportedLanguages,
} from "@/app/dictionaries/all";
import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import PresenterLogo from "../components/PresenterLogo";

export const PromotedRoasters = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);

  const { contextSafe } = useGSAP();

  const [promoted, setPromoted] = useState({
    honored: [] as string[],
    regular: [] as string[],
    others: [] as string[],
  });

  useEffect(() => {
    setPromoted({
      honored:
        lang.promoted.roasters.honored?.sort(() => Math.random() - 0.5) || [],
      regular:
        lang.promoted.roasters.regular?.sort(() => Math.random() - 0.5) || [],
      others: lang.promoted.others.items?.sort(() => Math.random() - 0.5) || [],
    });
  }, [
    lang.promoted.roasters.honored,
    lang.promoted.roasters.regular,
    lang.promoted.others,
  ]);

  return (
    <section
      className="watermark2 promoted-roasters-section"
      id="promoted"
      ref={ref}
    >
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
      <h2 className="p-8 text-center text-3xl md:px-20 ">
        {lang.promoted.roasters.honoredTitle}
      </h2>
      <div className="mx-auto my-10 flex max-w-screen-2xl flex-wrap items-center justify-center gap-2 gap-y-4 text-xl md:gap-20">
        {promoted.honored.map((p) => (
          <PresenterLogo name={p} key={p} />
        ))}
      </div>
      <h2 className="px-8 pb-2 pt-16 text-center text-3xl md:px-20 md:pb-24">
        {lang.promoted.roasters.regularTitle}
      </h2>
      <div className="mx-auto my-10 grid max-w-screen-2xl grid-cols-2 flex-wrap items-center justify-center gap-2 gap-y-4 text-center text-xl sm:flex md:gap-20">
        {promoted.regular.map((p) => (
          <PresenterLogo
            name={p}
            key={p}
            imgProps={{
              className: "mx-auto h-auto max-h-[10rem] w-full max-w-[10rem]",
              width: 160,
              height: 160,
            }}
          />
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
        {promoted.others.map((p) => (
          <PresenterLogo
            name={p}
            key={p}
            showName={true}
            imgProps={{
              className: "h-auto max-h-[10rem] max-w-[10rem]",
              width: 160,
              height: 160,
            }}
            aProps={{
              className: "flex h-full flex-col items-center justify-between gap-4",
              target: "_blank", rel: "external"
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default PromotedRoasters;
