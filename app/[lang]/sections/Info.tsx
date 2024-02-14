"use client";
import { useParams } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";

gsap.registerPlugin(ScrollTrigger);

export const Info = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);

  const info = [
    lang.info.slice(0, Math.ceil(lang.info.length / 2)),
    lang.info.slice(Math.ceil(lang.info.length / 2)),
  ];

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.set(".card", { y: "+=6rem"})
        gsap.to(".card",{
          y: '-=12rem',
          scrollTrigger: {
            trigger: ref.current,
            scrub: 2,
            start: "top bottom",
            end: "bottom top"
          }
        })
      })
      gsap.to(".bar",{
        width: "10rem",
        scrollTrigger: {
          trigger: "h2",
          scrub: 2,
          start: "bottom 70%",
          end: "bottom 20%"
        }
      })
    },
    { scope: ref },
  );
  return (
    <section ref={ref} id="info" className="info min-h-screen elevate grid lg:grid-cols-[1fr,2fr] gap-32 p-8 items-center watermark">
      <div className="md:p-12">
        <h2 className="w-3/4 pb-8 pt-24 md:pt-56 lg:pt-20 text-6xl font-bold">
          {lang.about.title}
        </h2>
        <div className="mx-auto max-w-screen-lg space-y-10 text-lg lg:text-xl leading-normal">
          {lang.about.text.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="hidden md:block bar w-3 h-3 mt-48 rounded-full bg-[var(--accent)]"/>
      </div>
      <div className="md:grid md:grid-cols-2 flex flex-col gap-8">
        {info.map((col, idx) => (
          <div key={`col_${idx}`} className={`flex flex-col gap-8 ${idx ? "md:pt-[var(--vertical-offset)]" : ""}`}>
            {col.map((s) => (
              <div
                className="card elevate h-auto rounded-2xl p-12"
                key={s.title}
              >
                <h3 className="pb-12 text-3xl font-bold">{s.title}</h3>
                <p className="text-lg lg:text-xl">{s.text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
