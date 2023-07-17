"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";

export const Map = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="inverted h-screen py-20 text-center">
      <h2 className="uppercase font-medium text-4xl py-20 ">
        {lang.location.title}
      </h2>
    </section>
  );
};
