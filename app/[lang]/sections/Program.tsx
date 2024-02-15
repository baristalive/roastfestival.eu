"use client";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";
import { useRef, CSSProperties, Fragment } from "react";
import Modal from "../components/Modal";
import { StationIcon } from "../components/StationIcon";
import LinkIcon from "@/app/icons/link";
import { Draggable } from "gsap/all";
import ArrowIcon from "@/app/icons/arrow";

const hours = [...Array(8)].map((_, idx) => `1${idx + 1}`);

const sanitize = (str: string) =>
  str.replace(/[^a-z0-9]/gi, "-").toLocaleLowerCase();

export const Program = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, Draggable);
      const sections = gsap.utils.toArray(".horizontal-scroll-container > div");
      gsap.matchMedia().add("(hover: hover) and (min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".program",
            pin: true,
            scrub: 1,
            end: "+=3000",
            snap: 1 / (sections.length - 1),
          },
        });
        tl.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
        });
        tl.to(ref.current, { duration: 0.5 }, ">");
      });
      gsap.matchMedia().add("(hover: none) and (min-width: 1024px)", () => {
        Draggable.create(".horizontal-scroll-container", {
          type: "x",
          bounds: ref.current,
          inertia: true,
        });
      });
    },
    { scope: ref },
  );
  return (
    <section ref={ref} className="min-h-screen py-12" id="program">
      <div className="program watermark2 ">
        <h2 className="pb-8 pl-8 pt-24 text-6xl font-bold md:pl-20 md:pt-56 lg:pt-20">
          Program
        </h2>
        <div className="horizontal-scroll-wraper min-h-screen">
          <div className="horizontal-scroll-container">
            {lang.program.map((day, idx) => (
              <div key={day.title} id={`day_${idx + 1}`} className="flex p-10">
                <div className="flex flex-shrink-0 flex-col px-10">
                  <h3 className="pb-6 text-6xl font-bold">{day.title}</h3>
                  <h4 className="text-3xl font-bold">{day.date}</h4>
                  <div
                    className={`${idx ? "" : "hidden"} -mt-32 flex grow items-center text-sm md:text-2xl 2xl:text-3xl`}
                  >
                    <a href={`#day_${idx + 1}`}>
                      <ArrowIcon />
                    </a>
                  </div>
                </div>
                <div className="card elevate relative rounded-2xl pb-4">
                  <div className="grid grid-cols-[repeat(21,_minmax(0,_1fr))] p-8 pt-10 text-center">
                    <div className="col-span-2 col-start-4">10:00</div>
                    {hours.map((h) => (
                      <div className="col-span-2" key={h}>
                        {h}:00
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-0 z-0 grid grid-cols-[repeat(21,_minmax(0,_1fr))] divide-x-2 divide-dashed divide-gray-300 p-8 pt-20">
                    <div className="col-span-2 col-start-3"></div>
                    {hours.map((h) => (
                      <div className="col-span-2" key={h}></div>
                    ))}
                    <div />
                  </div>
                  {day.schedule.map((t) => (
                    <div
                      key={t.track}
                      className="program-track relative z-10 mx-8 grid grid-cols-[repeat(21,_minmax(0,_1fr))] gap-x-2 rounded-2xl text-xl"
                    >
                      <div
                        className="col-span-4 row-start-1 flex flex-col items-center justify-center py-2 text-center lowercase 2xl:px-10"
                        style={{ gridRowEnd: t.rows + 1 }}
                      >
                        <StationIcon station={t.track} />
                        <h3>
                          {
                            lang.programCategory[
                              t.track as keyof typeof lang.programCategory
                            ]
                          }
                        </h3>
                      </div>
                      {t.schedule.map((s, idx) => (
                        <div
                          key={`${day.title}_${s.title}_${idx}`}
                          style={{
                            gridColumnStart: `${(s.start - 10) * 2 + 5}`,
                            gridColumnEnd: `${(s.end - 10) * 2 + 5}`,
                          }}
                        >
                          <div className="program-slot elevate my-2 overflow-hidden rounded-2xl px-4 py-1 text-left text-lg font-bold md:py-2">
                            {s.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
