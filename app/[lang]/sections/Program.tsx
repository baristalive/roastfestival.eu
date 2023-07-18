"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";

export const Program = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="text-center">
      <div className="inverted p-8 md:p-0">
        <h2 className="hidden md:block uppercase font-medium text-4xl pt-20">
          Program
        </h2>
      </div>
      {lang.program.length > 0 ? lang.program.map((d, idx) => (
        <div
          key={d.title}
          className={`${idx % 2 ? "" : "inverted"} p-2 md:p-20`}
        >
          <div className="md:hidden py-20 px-6 flex">
            <h2 className="grow uppercase font-medium pt-2 text-left text-3xl">
              Program
            </h2>
            <div className="text-right">
              <h3 className="text-5xl font-semibold">{d.date}</h3>
              <small className="text-2xl">{d.title}</small>
            </div>
          </div>
          <div className="max-w-5xl flex mx-auto gap-12">
            <div className="hidden md:block">
              <h3 className="text-8xl">{d.date}</h3>
              <small className="text-4xl">{d.title}</small>
            </div>
            <dl className="grow divide-y-2 divide-current md:text-left">
              {d.schedule.map((i) => (
                <div
                  key={i.time}
                  className="m-2 md:m-0 md:grid md:grid-cols-4 md:gap-4 py-3 md:px-0"
                >
                  <dt className="text-xl md:text-2xl font-bold">{i.time}</dt>
                  <dd className="text-xl md:text-2xl md:col-span-3 md:mt-0">
                    {i.title}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )) : <div className="text-3xl pt-32 min-h-[50vh] inverted">
        {lang.programLoadingText}
        </div>}
    </section>
  );
};
