"use client";
import { SupportedLanguages, dictionaries } from "@/app/dictionaries/all";
import { useParams } from "next/navigation";
import ArrowIcon from "@/app/icons/arrow";
import { SubpageNav } from "@/app/components/SubpageNav";

import enSponsorsContent from "@/app/dictionaries/colab/sponsors/content_en.mdx";
import czSponsorsContent from "@/app/dictionaries/colab/sponsors/content_cz.mdx";

export const Info = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const Content = params.lang === "cz" ? czSponsorsContent : enSponsorsContent;

  return (
    <>
      {/* Hero Section */}
      <section id="info" className="bg-lines bg-black pt-8 pb-16 lg:pb-24">
        <SubpageNav backToSection="colab" selfHref="sponsors" />

        <div className="container mx-auto px-6">
          {/* Title */}
          <div className="mb-12 lg:mb-16">
            <h1 className="font-display mb-6 text-3xl leading-[0.85] font-black text-white uppercase md:text-6xl lg:text-7xl">
              {lang.colab.sponsors.title}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-white/80 lg:text-2xl">
              {lang.colab.sponsors.text}
            </p>
          </div>

          {/* CTA Card */}
          <a
            href={lang.sponsors.signUpLink}
            rel="external"
            target="_blank"
            title={lang.sponsors.cta}
            className="bg-accent punk-border pop-shadow group flex items-center justify-center px-8 py-2 text-black transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none lg:px-10"
          >
            <span className="font-display text-center text-2xl font-black tracking-wider uppercase lg:text-3xl">
              {lang.sponsors.cta}
            </span>
            <div className="aspect-square h-24">
              <ArrowIcon />
            </div>
          </a>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-dots bg-white py-16 lg:py-24">
        <div className="container mx-auto px-6 text-black">
          <Content />
        </div>
      </section>

      {/* Bottom Navigation */}
      <section className="bg-primary py-12 lg:py-16">
        <SubpageNav backToSection="colab" centered />
      </section>
    </>
  );
};
