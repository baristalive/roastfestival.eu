"use client";

import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import { Section } from "@/app/components/Section";

export const Soutez = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const soutez = lang.presenters.party_soutez;
  const paragraphs = Array.isArray(soutez.annotation)
    ? soutez.annotation
    : soutez.annotation
      ? [soutez.annotation]
      : [];

  return (
    <Section
      id="soutez"
      className="relative overflow-hidden border-y-4 border-black bg-black px-6 py-16 md:py-24"
    >
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative container mx-auto">
        <div className="grid items-center gap-10 xl:grid-cols-[0.9fr_1.1fr] 2xl:gap-24">
          <div>
            <h2 className="font-display max-w-3xl text-5xl leading-[0.85] font-black tracking-tight text-white uppercase md:text-5xl lg:text-7xl 2xl:text-9xl">
              {soutez.name}
            </h2>

            <div className="mt-10 flex flex-wrap gap-4">
              {Object.entries(soutez.actionIcons ?? {}).map(([key, action]) =>
                action.href ? (
                  <a
                    key={key}
                    href={action.href}
                    target="_blank"
                    rel="external"
                    className="font-display punk-border bg-accent px-6 py-4 text-lg font-black tracking-tight text-black uppercase transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-primary)] md:px-8 md:text-xl"
                  >
                    {action.text} ↗
                  </a>
                ) : null,
              )}
            </div>
          </div>

          <div className="punk-border pop-shadow-small bg-accent rotate-1 p-6 text-black transition-transform duration-300 hover:rotate-0 md:p-10">
            <div className="space-y-4 text-base leading-relaxed font-bold md:text-lg">
              {paragraphs.length > 0 ? (
                paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))
              ) : (
                <p>{soutez.name}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
