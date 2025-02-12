"use client";

import Bar from "@/app/components/Bar";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import React, { useEffect, useState } from "react";
import PresenterLogo from "../components/PresenterLogo";

export const Sponsors = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  const [sponsors, setSponsors] = useState([] as string[]);

  useEffect(() => {
    setSponsors(
      lang.promoted.sponsors.items?.sort(() => Math.random() - 0.5) || [],
    );
  }, [lang.promoted.sponsors.items]);
  return (
    <section className="watermark5 pb-48" id="promoted">
      <div className="mx-auto grid max-w-[1900px] items-center gap-12 p-8 lg:grid-cols-[1fr,1fr] 2xl:gap-32">
        <div className="md:p-12">
          <h2 className="pb-8 pt-24 text-3xl font-bold md:pt-0 2xl:pt-20 2xl:text-6xl">
            {lang.promoted.sponsors.title}
          </h2>
          <Bar  />
        </div>
      </div>
      <div className="mx-auto my-10 flex max-w-screen-2xl flex-wrap items-center justify-center gap-2 gap-y-4 text-xl md:gap-20">
        {sponsors.map((p) => (
          <PresenterLogo
            name={p}
            key={p}
            imgProps={{
              className: "max-h-[18rem] max-w-[20rem]",
              width: 320,
              height: 288,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Sponsors;
