import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import dictionaries, { SupportedLanguages } from "../dictionaries/all";
import ArrowIcon from "../icons/arrow";

const NavBar = ({ backToSection }: { backToSection?: string }) => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <nav className="flex items-center justify-center p-10 text-2xl bg-transparent">
      <Link
        href={`${params.lang === "cz" ? "/cz" : "/en"}${backToSection ? `#${backToSection}` : ""}`}
        className="cta nav elevate relative rounded-full px-8 py-2 md:py-4 md:pl-24 2xl:px-12 2xl:py-6 2xl:pl-24"
      >
        <span className="absolute -left-1 top-1/2 -translate-y-1/2 rotate-180 text-sm text-[var(--black)] md:text-2xl 2xl:text-3xl">
          <ArrowIcon />
        </span>
        <span className="">{lang.back}</span>
      </Link>
    </nav>
  );
};

export default NavBar;
