"use client";
import { useParams } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import Bar from "@/app/components/Bar";

export const Info = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);

  const info = [
    lang.info.slice(0, Math.ceil(lang.info.length / 2)),
    lang.info.slice(Math.ceil(lang.info.length / 2)),
  ];

  const { contextSafe } = useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.set(".cards", { y: "+=30rem" });
        gsap.to(".cards", {
          y: "-=30rem",
          scrollTrigger: {
            trigger: ref.current,
            scrub: 2,
            start: "top bottom",
            end: "bottom top",
          },
        });
      });
    },
    { scope: ref },
  );
  return (
    <section
      ref={ref}
      id="info"
      className="info-section watermark  flex flex-col items-center justify-between"
    >
      <div className="grid max-w-[1900px] items-center gap-32 p-8 lg:grid-cols-[1fr,2fr]">
        <div className="md:p-12">
          <h2 className="w-3/4 pb-8 pt-24 text-6xl font-bold md:pt-56 lg:pt-20">
            {lang.about.title}
          </h2>
          <div className="mx-auto max-w-screen-lg space-y-10 text-lg leading-normal lg:text-xl">
            {lang.about.text.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Bar mountRef={ref} contextSafe={contextSafe} />
        </div>
        <div className="cards flex flex-col gap-8 md:grid md:grid-cols-2">
          {info.map((col, idx) => (
            <div
              key={`col_${idx}`}
              className={`flex flex-col gap-8 ${idx ? "md:pt-[var(--vertical-offset)]" : ""}`}
            >
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
      </div>
    </section>
  );
};
