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
      mm.add("(min-width: 768px)", () => {
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
      mm.add("(max-width: 768px)", () => {
        gsap.utils.toArray(".card").map((c, idx, arr) => {
          const isLast = idx === arr.length - 1;
          gsap
            .timeline({
              scrollTrigger: {
                trigger: c as Element,
                pin: true,
                start: isLast ? "top top" : "top 50em",
                end: isLast ? "top top" : "bottom top",
                scrub: true,
              },
            })
            .to(c as Element, {
              ease: "none",
              ...(isLast ? {} : { display: "none", scale: 0.8, opacity: 0 }),
            });
        });
      });
    },
    { scope: ref },
  );
  return (
    <section
      ref={ref}
      id="info"
      className="info-section watermark flex min-h-screen flex-col items-center justify-between gap-8 pb-4"
    >
      <div className="grid max-w-[1900px] items-center gap-12 p-8 lg:grid-cols-[1fr,2fr] 2xl:gap-32">
        <div className="md:p-12">
          <h2 className="w-3/4 pb-8 pt-24 text-3xl font-bold md:pt-0 2xl:pt-20 2xl:text-6xl">
            {lang.about.title}
          </h2>
          <div className="mx-auto max-w-screen-lg space-y-10 text-base leading-normal 2xl:text-xl">
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
      {/* <BuyTickets /> */}
    </section>
  );
};
