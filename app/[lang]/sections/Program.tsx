"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";

type DaySchedule = {
  title: string;
  date: string;
  schedule: { time: string; title: string }[];
};

export const Program = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="text-center">
      <div className="inverted p-8 md:p-0">
        <h2 className="hidden pt-20 text-4xl font-medium uppercase md:block">
          Program
        </h2>
      </div>
      {lang.program.length > 0 ? (
        lang.program.map((d: DaySchedule, idx) => (
          <div
            key={d.title}
            className={`${idx % 2 ? "" : "inverted"} p-2 md:p-20`}
          >
            <div className="flex px-6 py-20 md:hidden">
              <h2 className="grow pt-2 text-left text-3xl font-medium uppercase">
                Program
              </h2>
              <div className="text-right">
                <h3 className="text-5xl font-semibold">{d.date}</h3>
                <small className="text-2xl">{d.title}</small>
              </div>
            </div>
            <div className="mx-auto flex max-w-5xl gap-12">
              <div className="hidden md:block">
                <h3 className="text-8xl">{d.date}</h3>
                <small className="text-4xl">{d.title}</small>
              </div>
              <dl className="grow divide-y-2 divide-current md:text-left">
                {d.schedule.map((i) => (
                  <div
                    key={i.time}
                    className="m-2 py-3 md:m-0 md:grid md:grid-cols-4 md:gap-4 md:px-0"
                  >
                    <dt className="text-xl font-bold md:text-2xl">{i.time}</dt>
                    <dd className="text-xl md:col-span-3 md:mt-0 md:text-2xl">
                      {i.title}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        ))
      ) : (
        <div className="inverted min-h-[50vh] pt-32 text-3xl">
          {lang.programLoadingText}
        </div>
      )}
    </section>
  );
};
