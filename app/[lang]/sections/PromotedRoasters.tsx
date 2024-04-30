"use client";

import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import Image from "next/image";

export const PromotedRoasters = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="inverted py-20 text-center">
      <h2 className="py-20 text-4xl font-medium uppercase">
        {lang.promotedRoasters.title}
      </h2>
      <div className="mx-auto max-w-screen-lg space-y-10 px-6 pb-24 text-xl lg:px-0 lg:text-4xl">
        {lang.promotedRoasters.text.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-center gap-2 text-xl md:gap-20">
        {lang.promotedRoasters.content
          ?.sort(() => Math.random() - 0.5)
          .map((s: { href: string; src: string; alt: string }) => (
            <div className="p-2" key={s.href}>
              <a href={s.href} target="_blank" rel="external" title={s.alt}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  className="max-h-[16rem] max-w-[16rem]"
                  width={180}
                  height={180}
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

export default PromotedRoasters;
