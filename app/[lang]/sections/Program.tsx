"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import { Section } from "@/app/components/Section";

export const Program = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  return (
    <Section className="bg-dots bg-white px-6 py-24 lg:py-32" id="lineup">
      <div className="container mx-auto text-center">
        <h2 className="font-display mb-6 text-5xl leading-[0.85] font-black text-black uppercase md:text-8xl lg:text-9xl">
          {lang.programTile.title}
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg text-black/60 md:text-xl">
          {lang.programTile.content}
        </p>
        <Link
          href={`/${params.lang}/program`}
          className="group relative inline-block"
        >
          <div className="bg-accent absolute inset-0 translate-x-2 translate-y-2 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          <div className="punk-border font-display bg-primary relative px-12 py-5 text-xl font-black tracking-tighter text-white uppercase transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 md:text-2xl">
            {lang.programTile.title} →
          </div>
        </Link>
      </div>
    </Section>
  );
};
