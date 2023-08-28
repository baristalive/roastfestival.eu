"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";

export const Info = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="inverted mx-auto flex flex-col py-48">
      {lang.info.map((s, idx) => (
        <div
          className="info-item mx-auto flex max-w-screen-lg gap-8 px-6 py-20"
          key={s.title}
        >
          <div
            className={`info-item-count-before hidden text-[20em] ${
              idx % 2 ? "" : "lg:block"
            }`}
          />
          <div className={idx % 2 ? "text-right" : "text-left"}>
            <h2 className="py-12 text-4xl font-medium uppercase">
              <span
                className={`info-item-count-before font-bold text-[2em] mr-6 lg:hidden ${
                  idx % 2 ? "hidden" : "inline"
                }`}
              >
              </span>
              {s.title}
              <span
                className={`info-item-count-after font-bold text-[2em] ml-6 lg:hidden ${
                  idx % 2 ? "inline" : "hidden"
                }`}
              />
            </h2>
            <p className="text-lg lg:text-2xl">{s.text}</p>
          </div>
          <div
            className={`info-item-count-after hidden text-[20em] ${
              idx % 2 ? "lg:block" : ""
            }`}
          />
        </div>
      ))}
    </section>
  );
};
