"use client";

import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import dynamic from "next/dynamic";
import { Section } from "@/app/components/Section";

const PresenterLogo = dynamic(() => import("../components/PresenterLogo"), {
  ssr: false,
});

const sponsorLayout: Record<
  string,
  {
    flex: string;
    mobileWidth: string;
    gridColumn?: string;
  }
> = {
  sponsor_brita: {
    flex: "0.85 1 0%",
    mobileWidth: "w-[76%]",
  },
  sponsor_ignac: {
    flex: "1.15 1 0%",
    mobileWidth: "w-[90%]",
  },
  sponsor_kavaspojuje: {
    flex: "1.25 1 0%",
    gridColumn: "1 / -1",
    mobileWidth: "w-full",
  },
  sponsor_kopro: {
    flex: "0.45 1 0%",
    mobileWidth: "w-[58%]",
  },
  sponsor_okafi: {
    flex: "0.95 1 0%",
    mobileWidth: "w-[92%]",
  },
};

const defaultSponsorLayout: (typeof sponsorLayout)[string] = {
  flex: "1 1 0%",
  mobileWidth: "w-full",
};

export const Sponsors = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  return (
    <Section className="bg-primary bg-lines" id="promoted">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-2 items-center gap-x-2 gap-y-8 px-4 py-10 text-xl sm:gap-x-6 sm:gap-y-10 md:flex md:flex-nowrap md:gap-4 md:px-6 md:py-10 lg:gap-8 lg:px-10 lg:py-12">
        {lang.promoted.sponsors.items.map((p) => {
          const layout = sponsorLayout[p] ?? defaultSponsorLayout;

          return (
            <PresenterLogo
              name={p}
              key={p}
              aProps={{
                className: "flex w-full justify-center",
                rel: "external",
                target: "_blank",
              }}
              divProps={{
                className: "flex min-w-0 items-center justify-center p-2",
                style: {
                  flex: layout.flex,
                  gridColumn: layout.gridColumn,
                },
              }}
              imgProps={{
                className: `h-auto max-h-[12rem] max-w-full ${layout.mobileWidth} lg:w-full`,
                height: 288,
                width: 320,
              }}
            />
          );
        })}
      </div>
    </Section>
  );
};

export default Sponsors;
