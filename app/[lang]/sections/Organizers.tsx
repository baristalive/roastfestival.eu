"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";

export const Organizers = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="inverted py-20 text-center">
      <h2 className="uppercase font-medium text-4xl py-20 ">
        {lang.organizers.title}
      </h2>
      <div className="space-y-10 mx-auto px-6 lg:px-0 lg:text-4xl text-xl max-w-screen-lg">
        {lang.organizers.text.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </section>
  );
};
