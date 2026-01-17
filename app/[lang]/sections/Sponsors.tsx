"use client";

import Bar from "@/app/components/Bar";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import { useState } from "react";
import PresenterLogo from "../components/PresenterLogo";

export const Sponsors = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  const [sponsors] = useState(
    () =>
      lang.promoted.sponsors.items?.toSorted(() => Math.random() - 0.5) || [],
  );
  return (
    <section className="pb-48" id="promoted">
      <div className="mx-auto grid max-w-475 items-center gap-12 p-8 lg:grid-cols-[1fr,1fr] 2xl:gap-32">
        <div className="md:p-12">
          <h2 className="pt-24 pb-8 text-3xl font-bold md:pt-0 2xl:pt-20 2xl:text-6xl">
            {lang.promoted.sponsors.title}
          </h2>
          <Bar />
        </div>
      </div>
      <div className="mx-auto my-10 flex max-w-screen-2xl flex-wrap items-center justify-center gap-2 gap-y-4 text-xl md:gap-20">
        {sponsors.map((p) => (
          <PresenterLogo
            name={p}
            key={p}
            imgProps={{
              className: "max-h-[18rem] max-w-[20rem]",
              height: 288,
              width: 320,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Sponsors;
