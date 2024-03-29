"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";
import { CSSProperties, Fragment } from "react";
import Modal from "../components/Modal";
import { StationIcon } from "../components/StationIcon";
import LinkIcon from "@/app/icons/link";

type StationSchedule = {
  category?: string;
  schedule: (
    | { time: string; title: string }
    | {
        time: string;
        title: string;
        description: string;
        speakers: string[];
        href?: string;
      }
  )[];
};
type DaySchedule = {
  title: string;
  date: string;
  schedule: StationSchedule[];
};

const sanitize = (str: string) =>
  str.replace(/[^a-z0-9]/gi, "-").toLocaleLowerCase();

export const Program = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="text-center" id="program">
      <div className="inverted p-8 md:p-0">
        <h2 className="hidden pt-20 text-4xl font-medium uppercase md:block">
          Program
          <a href="#program" className="hidden-link ml-4 inline-block">
            <LinkIcon />
          </a>
        </h2>
      </div>
      {lang.ready && lang.program.length > 0 ? (
        <>
          {lang.program.map((d: DaySchedule, idx_d) => (
            <div
              key={d.title}
              className={`${idx_d % 2 ? "" : "inverted"} px-2 pb-10 md:p-20`}
              id={`program-${sanitize(d.title)}`}
            >
              <div className="flex px-6 pt-20 md:hidden">
                <h2 className="grow pt-2 text-left text-3xl font-medium uppercase">
                  Program
                </h2>
                <div className="text-right">
                  <h3 className="text-5xl font-semibold">{d.date}</h3>
                  <small className="text-2xl">
                    {d.title}
                    <a
                      href={`#program-${sanitize(d.title)}`}
                      className="hidden-link ml-4 inline-block"
                    >
                      <LinkIcon />
                    </a>
                  </small>
                </div>
              </div>
              <div className="mx-auto flex max-w-6xl gap-12">
                <div className="hidden md:block">
                  <h3 className="text-8xl">{d.date}</h3>
                  <small className="text-4xl">
                    {d.title}
                    <a
                      href={`#program-${sanitize(d.title)}`}
                      className="hidden-link ml-4 inline-block"
                    >
                      <LinkIcon />
                    </a>
                  </small>
                </div>
                <dl className="grow divide-y-2 divide-current md:text-left">
                  {d.schedule.map((s, idx_s) => (
                    <div
                      key={idx_s}
                      style={
                        {
                          "--rows": `repeat(${s.schedule.length}, auto)`,
                        } as CSSProperties
                      }
                      className="m-2 grid-rows-[--rows] space-y-2 py-3 md:m-0 md:grid md:grid-cols-4 md:px-0"
                    >
                      <div className="row-span-full flex flex-col justify-center py-5 md:py-0">
                        <div
                          className={`text-cente mx-auto ${
                            idx_d % 2 ? "" : "inverted-vars"
                          }`}
                        >
                          <StationIcon station={s.category} />
                        </div>
                        <h4 className="text-center text-xl md:text-2xl">
                          {(s.category &&
                            s.category in lang.programCategory &&
                            lang.programCategory[
                              s.category as keyof typeof lang.programCategory
                            ]) ||
                            ""}
                        </h4>
                      </div>
                      {s.schedule.map((i) => (
                        <Fragment key={`${i.title}-${i.time}`}>
                          <dt
                            className="text-xl font-bold md:text-2xl"
                            id={`program-${sanitize(d.title)}-${sanitize(
                              i.time,
                            )}-${sanitize(i.title)}`}
                          >
                            {i.time}
                          </dt>
                          <dd className="text-xl md:col-span-2 md:mt-0 md:text-2xl">
                            {i.title}
                            <a
                              href={`#program-${sanitize(d.title)}-${sanitize(
                                i.time,
                              )}-${sanitize(i.title)}`}
                              className="hidden-link ml-4 inline-block"
                            >
                              <LinkIcon />
                            </a>
                            <div className="text-lg">
                              {"speakers" in i && i.speakers.join(", ")}
                            </div>
                            <div className="my-3 flex w-full justify-end gap-3">
                              {"description" in i && (
                                <Modal
                                  title={i.title}
                                  description={i.description}
                                  speakers={i.speakers}
                                />
                              )}
                              {"href" in i && (
                                <a
                                  className={`${
                                    idx_d % 2 ? "" : "inverted-vars"
                                  } inverted inline-block rounded-xl border border-current px-2 py-1 text-lg hover:opacity-80`}
                                  href={i.href}
                                  target="_blank"
                                  rel="external"
                                >
                                  {lang.signUp}
                                </a>
                              )}
                            </div>
                          </dd>
                        </Fragment>
                      ))}
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ))}
          <div className="pb-24 pt-5 text-2xl">
            {lang.programSubjectToChange}
          </div>
        </>
      ) : (
        <div className="inverted min-h-[50vh] pt-32 text-3xl">
          {lang.programLoadingText}
        </div>
      )}
    </section>
  );
};
