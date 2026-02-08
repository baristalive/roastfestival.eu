"use client";

import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import dynamic from "next/dynamic";
import { shuffle } from "@/app/utils/array";
import { Section } from "@/app/components/Section";

const PresenterLogo = dynamic(() => import("../components/PresenterLogo"), {
  ssr: false,
});

export const Sponsors = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  return (
    <Section className="pb-48" id="promoted">
      <div className="mx-auto grid max-w-475 items-center gap-12 p-8 lg:grid-cols-[1fr,1fr] 2xl:gap-32">
        <div className="md:p-12">
          <h2 className="pt-24 pb-8 text-3xl font-bold md:pt-0 2xl:pt-20 2xl:text-6xl">
            {lang.promoted.sponsors.title}
          </h2>
        </div>
      </div>
      <div className="mx-auto my-10 flex max-w-screen-2xl flex-wrap items-center justify-center gap-2 gap-y-4 text-xl md:gap-20">
        {shuffle(lang.promoted.sponsors.items).map((p) => (
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
    </Section>
  );
};

export default Sponsors;
