"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { SupportedLanguages, dictionaries } from "@/app/dictionaries/all";
import ArrowIcon from "@/app/icons/arrow";

type SubpageNavProps = {
  backToSection?: string;
  centered?: boolean;
  selfHref?: string;
};

export const SubpageNav = ({
  backToSection,
  centered,
  selfHref,
}: SubpageNavProps) => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  return (
    <nav
      className={`container mx-auto flex items-center px-6 ${centered ? "justify-center" : "mb-8 justify-between gap-6"}`}
    >
      <Link
        href={`/${params.lang}${backToSection ? `#${backToSection}` : ""}`}
        rel="prev"
        className="punk-border pop-shadow font-display inline-flex translate-z-1 items-center gap-3 bg-white px-2 text-sm font-bold tracking-wider text-black uppercase transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none md:px-6 md:py-1"
      >
        <span className="rotate-180">
          <ArrowIcon />
        </span>
        {lang.back}
      </Link>

      {/* Language Switcher */}
      {!centered && (
        <Link
          href={params.lang === "cz" ? `/en/${selfHref}` : `/cz/${selfHref}`}
          rel="alternate"
          className="font-display translate-z-1 border-4 border-white px-4 py-2 text-sm font-bold tracking-wider text-white uppercase transition-all hover:-rotate-2 hover:bg-white hover:text-black"
        >
          {params.lang === "cz" ? "EN" : "CZ"}
        </Link>
      )}
    </nav>
  );
};
