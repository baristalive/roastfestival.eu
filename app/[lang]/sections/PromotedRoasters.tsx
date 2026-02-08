"use client";

import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import dynamic from "next/dynamic";
import { shuffle } from "@/app/utils/array";
import { Section } from "@/app/components/Section";

const PresenterLogo = dynamic(() => import("../components/PresenterLogo"), {
  ssr: false,
});

export const PromotedRoasters = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  return (
    <Section id="promoted">
      <div className="mx-auto grid max-w-475 items-center gap-12 p-8 lg:grid-cols-[1fr,1fr] 2xl:gap-32">
        <div className="md:p-12">
          <h2 className="pt-24 pb-8 text-3xl font-bold md:pt-0 2xl:pt-20 2xl:text-6xl">
            {lang.promoted.roasters.title}
          </h2>
          <div className="space-y-10 text-base leading-normal 2xl:text-xl">
            {lang.promoted.roasters.text.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
      {lang.promoted.roasters.honored.length > 0 && (
        <>
          <h2 className="p-8 text-center text-3xl md:px-20">
            {lang.promoted.roasters.honoredTitle}
          </h2>
          <div className="mx-auto my-10 flex max-w-screen-2xl flex-wrap items-center justify-center gap-2 gap-y-4 text-xl md:gap-20">
            {shuffle(lang.promoted.roasters.honored).map((p) => (
              <PresenterLogo name={p} key={p} />
            ))}
          </div>
          <h2 className="px-8 pt-16 pb-2 text-center text-3xl md:px-20 md:pb-24">
            {lang.promoted.roasters.regularTitle}
          </h2>
        </>
      )}
      <div className="py-10">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-2 flex-wrap items-center justify-center gap-2 gap-y-4 text-center text-xl sm:flex md:gap-20">
          {shuffle(lang.promoted.roasters.regular).map((p) => (
            <PresenterLogo
              name={p}
              key={p}
              imgProps={{
                className: "mx-auto h-auto max-h-[10rem] w-full max-w-[10rem]",
                height: 160,
                width: 160,
              }}
            />
          ))}
          <div className="p-2 text-base 2xl:text-xl">a další...</div>
        </div>
      </div>
      {lang.promoted.others.items.length > 0 && (
        <>
          <div className="mx-auto grid max-w-475 items-center gap-12 p-8 lg:grid-cols-[1fr,1fr] 2xl:gap-32">
            <div className="md:p-12">
              <h2 className="pt-24 pb-8 text-3xl font-bold md:pt-0 2xl:pt-20 2xl:text-6xl">
                {lang.promoted.others.title}
              </h2>
              <div className="space-y-10 text-base leading-normal 2xl:text-xl">
                {lang.promoted.others.text.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="mx-auto flex max-w-screen-2xl flex-wrap items-stretch justify-center gap-2 text-xl md:gap-20">
            {shuffle(lang.promoted.others.items).map((p) => (
              <PresenterLogo
                name={p}
                key={p}
                showName={true}
                imgProps={{
                  className: "h-auto max-h-[10rem] max-w-[10rem]",
                  height: 160,
                  width: 160,
                }}
                aProps={{
                  className:
                    "flex h-full flex-col items-center justify-between gap-4",
                  rel: "external",
                  target: "_blank",
                }}
              />
            ))}
          </div>
        </>
      )}
    </Section>
  );
};

export default PromotedRoasters;
