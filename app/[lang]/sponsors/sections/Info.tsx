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
      <section id="info" className="bg-evergreen bg-lines pt-8 pb-16 lg:pb-24">
        <SubpageNav backToSection="colab" selfHref="sponsors" />

        <div className="container mx-auto px-6">
          {/* Title */}
          <div className="mb-12 lg:mb-16">
            <h1 className="font-display text-ivory mb-6 text-3xl leading-[0.85] font-black uppercase md:text-6xl lg:text-7xl">
              {lang.colab.sponsors.title}
            </h1>
            <p className="text-ivory/80 max-w-3xl text-lg leading-relaxed lg:text-2xl">
              {lang.colab.sponsors.text}
            </p>
          </div>

          {/* CTA Card */}
          <a
            href={lang.sponsors.signUpLink}
            rel="external"
            target="_blank"
            title={lang.sponsors.cta}
            className="bg-accent text-ivory punk-border pop-shadow group inline-flex flex-col items-center justify-center gap-6 p-8 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none lg:p-10"
          >
            <div className="text-6xl transition-transform group-hover:translate-x-2 lg:text-7xl">
              <ArrowIcon />
            </div>
            <span className="font-display text-center text-2xl font-black tracking-wider uppercase lg:text-3xl">
              {lang.sponsors.cta}
            </span>
          </a>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-ivory bg-dots py-16 lg:py-24">
        <div className="text-evergreen container mx-auto px-6">
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
