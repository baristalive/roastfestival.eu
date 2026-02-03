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
      className={`container mx-auto flex items-center px-6 ${centered ? "justify-center" : "mb-8 justify-between"}`}
    >
      <Link
        href={`/${params.lang}${backToSection ? `#${backToSection}` : ""}`}
        rel="prev"
        className="bg-ivory text-evergreen punk-border pop-shadow-small font-display inline-flex translate-z-1 items-center gap-3 px-6 py-3 text-sm font-bold tracking-wider uppercase transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
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
          className="border-ivory text-ivory font-display hover:bg-ivory hover:text-evergreen translate-z-1 border-4 px-4 py-2 text-sm font-bold tracking-wider uppercase transition-all hover:-rotate-2"
        >
          {params.lang === "cz" ? "EN" : "CZ"}
        </Link>
      )}
    </nav>
  );
};
