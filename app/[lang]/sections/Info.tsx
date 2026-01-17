"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import Bar from "@/app/components/Bar";

export const Info = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  const info = [
    lang.info.slice(0, Math.ceil(lang.info.length / 2)),
    lang.info.slice(Math.ceil(lang.info.length / 2)),
  ];

  return (
    <section
      id="info"
      className="info-section watermark2 flex flex-col items-center justify-between gap-8 pb-48"
    >
      <div className="grid max-w-[1900px] items-center gap-12 p-8 lg:grid-cols-[1fr,2fr] 2xl:gap-32">
        <div className="md:p-12">
          <h2 className="pb-8 pt-24 text-3xl font-bold md:pt-0 2xl:pt-20 2xl:text-6xl">
            {lang.about.title}
          </h2>
          <div className="mx-auto max-w-screen-lg space-y-10 text-base leading-normal 2xl:text-xl">
            {lang.about.text.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Bar />
        </div>
        <div className="cards flex flex-col gap-8 md:grid md:grid-cols-2">
          {info.map((col, idx) => (
            <div
              key={`col_${idx}`}
              className={`flex flex-col gap-8 ${idx ? "md:pt-[var(--vertical-offset)]" : ""}`}
            >
              {col.map((s) => (
                <div
                  className="card elevate h-auto rounded-2xl p-8 2xl:p-12"
                  key={s.title}
                >
                  <h3 className="pb-4 text-xl font-bold 2xl:pb-12 2xl:text-3xl">
                    {s.title}
                  </h3>
                  <p className="text-base 2xl:text-xl">{s.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
