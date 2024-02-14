"use client";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";
import { useRef,CSSProperties, Fragment } from "react";
import Modal from "../components/Modal";
import { StationIcon } from "../components/StationIcon";
import LinkIcon from "@/app/icons/link";

const hours = [...Array(8)].map((_, idx) => `1${idx + 1}`);

const sanitize = (str: string) =>
  str.replace(/[^a-z0-9]/gi, "-").toLocaleLowerCase();


export const Program = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      // //Comment me out to see issue
      // const smoother = ScrollSmoother.create({
      //  wrapper: "#smooth-wrapper",
      //  content: "#smooth-content",
      //  smooth: 2,
      //  normalizeScroll: true, 
      //  ignoreMobileResize: true, 
      //  effects: true,
      //  preventDefault: true
      // });
    },
    { scope: ref },
  );
  return (
    <section className="p-12 text-center" id="program">
      <div className="container-fluid">
        {lang.program.map((day) => (
          <div key={day.title} className="horiz-gallery-wrapper p-10">
            <div className="card elevate relative h-auto w-10/12 rounded-2xl p-8">
              <div className="grid grid-cols-[repeat(21,_minmax(0,_1fr))] p-8 py-10">
                <div className="col-span-2 col-start-4">10:00</div>
                {hours.map((h) => (
                  <div className="col-span-2" key={h}>
                    {h}:00
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 z-0 grid grid-cols-[repeat(21,_minmax(0,_1fr))] divide-x-2 divide-dashed divide-gray-300 p-16 pt-40">
                <div className="col-span-2 col-start-3"></div>
                {hours.map((h) => (
                  <div className="col-span-2" key={h}></div>
                ))}
                <div />
              </div>
              {day.schedule.map((t) => (
                <div
                  key={t.track}
                  className="program-track relative z-10 mt-2 grid grid-cols-[repeat(21,_minmax(0,_1fr))] grid-rows-[repeat(4,min(0,1fr))] gap-x-2 rounded-2xl px-8 text-xl"
                >
                  <div className="col-span-4 row-span-3 flex flex-col items-center justify-center lowercase 2xl:px-12">
                    <StationIcon station={t.track} />
                    <h3>{lang.programCategory[t.track]}</h3>
                  </div>
                  {t.schedule.map((s) => (
                    <div
                      key={s.title}
                      className="program-slot elevate my-2 rounded-2xl px-8 py-2 text-left text-xl font-bold md:py-4 overflow-hidden"
                      style={{
                        gridColumnStart: `${(s.start - 10) * 2 + 5}`,
                        gridColumnEnd: `${(s.end - 10) * 2 + 5}`,
                      }}
                    >
                      {s.title}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
