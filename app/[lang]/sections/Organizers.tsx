"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";

export const Organizers = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="inverted py-20 text-center">
      <h2 className="py-20 text-4xl font-medium uppercase ">
        {lang.organizers.title}
      </h2>
      <div className="mx-auto max-w-screen-lg space-y-10 px-6 text-xl lg:px-0 lg:text-4xl">
        {lang.organizers.text.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </section>
  );
};
