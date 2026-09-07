"use client";

import { forwardRef } from "react";
import ExportedImage from "next-image-export-optimizer";

import InlineMarkdown from "@/app/components/InlineMarkdown";
import { BeanGrid } from "@/app/[lang]/components/BeanGrid";
import BeanIcon from "@/app/icons/beanicon";
import dictionaries, {
  Presenter,
  SupportedLanguages,
} from "@/app/dictionaries/all";
import type { PosterPatternId } from "./PrintPoster";

type DisplayScheduleItem = {
  $ref: string;
  end: string;
  start: string;
};

type PrintDisplayProps = {
  backgroundClassName: string;
  backgroundInk: string;
  dayDate: string;
  dayName: string;
  item: DisplayScheduleItem;
  langKey: SupportedLanguages;
  patternId: PosterPatternId;
  presenter: Presenter;
};

const getParagraphs = (value?: string | string[]) =>
  Array.isArray(value)
    ? value.filter((paragraph) => paragraph.trim())
    : value?.trim()
      ? [value]
      : [];

const PrintDisplay = forwardRef<HTMLDivElement, PrintDisplayProps>(
  (
    {
      backgroundClassName,
      backgroundInk,
      dayName,
      item,
      langKey,
      patternId,
      presenter,
    },
    ref,
  ) => {
    const lang = dictionaries[langKey];
    const bioParagraphs = getParagraphs(presenter.bio);
    const annotationParagraphs = getParagraphs(presenter.annotation);
    const speakerName = presenter.subheading ?? presenter.name;

    return (
      <div
        ref={ref}
        className={`print-poster print-display relative flex aspect-[16/9] w-[96rem] overflow-hidden border-4 border-black p-[3.5rem] ${backgroundClassName} ${backgroundInk}`}
        data-export-format="display"
        data-print-layout="display"
        data-talk-ref={item.$ref}
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {patternId === "beans" ? (
            <BeanGrid />
          ) : (
            <div
              className={`absolute inset-0 ${patternId === "dots" ? "bg-dots" : "bg-lines"}`}
            />
          )}
        </div>

        <div className="font-display absolute top-[3.5rem] right-[4rem] z-10 text-right font-black uppercase">
          <div className="pt-2 text-[1.15rem] leading-0.5 tracking-[0.22em] opacity-60">
            {lang.programCategory.lecture}
          </div>
          <div className="mt-2 text-4xl leading-none tracking-[-0.04em]">
            {item.start} – {item.end} / {dayName}
          </div>
        </div>

        <div className="relative z-10 grid min-h-0 flex-1 grid-cols-[0.4fr_0.6fr] gap-[4rem]">
          <section className="flex min-h-0 min-w-0 flex-col">
            <h1 className="font-display w-full grow text-7xl font-black uppercase">
              Up <span className="text-accent">next</span>
            </h1>
            <div className="flex h-[15rem] shrink-0 items-start">
              <div className="print-display-logo flex aspect-square h-[13rem] items-center justify-center overflow-hidden rounded-full border-4 border-black bg-white shadow-[8px_8px_0_0_var(--color-black)]">
                {presenter.logo ? (
                  <ExportedImage
                    alt={speakerName}
                    className="h-full w-full object-contain"
                    height={320}
                    loading="eager"
                    src={`/images/promoted/${presenter.logo}`}
                    width={320}
                  />
                ) : (
                  <span className="text-accent flex h-full w-full items-center justify-center bg-black p-8">
                    <BeanIcon />
                  </span>
                )}
              </div>
            </div>

            <div className="min-h-0">
              <h2
                className="font-display wrap-break-words text-[1.8rem] leading-none font-black tracking-[-0.05em] uppercase"
                lang={langKey === "cz" ? "cs" : "en"}
              >
                <InlineMarkdown>{speakerName}</InlineMarkdown>
              </h2>
              {bioParagraphs.length > 0 && (
                <div className="mt-4 text-[1.08rem] leading-[1.18]">
                  <div className="font-display mb-2 text-[0.9rem] font-black tracking-[0.16em] uppercase opacity-75">
                    Bio
                  </div>
                  {bioParagraphs.map((paragraph, paragraphIndex) => (
                    <p
                      className={paragraphIndex > 0 ? "mt-3" : undefined}
                      key={`${item.$ref}-bio-${paragraphIndex}`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="flex min-h-0 min-w-0 items-center pt-[4rem]">
            <article className="print-display-talk-card punk-border pop-shadow bg-accent flex max-h-full w-full rotate-[-1deg] flex-col justify-between overflow-hidden p-[3rem] text-black">
              <h1
                className="font-display wrap-break-words text-4xl leading-[0.93] font-black tracking-[-0.07em] uppercase"
                lang={langKey === "cz" ? "cs" : "en"}
              >
                <InlineMarkdown>{presenter.name}</InlineMarkdown>
              </h1>
              {annotationParagraphs.length > 0 && (
                <div className="mt-7 overflow-hidden text-[1.12rem] leading-[1.18]">
                  {annotationParagraphs.map((paragraph, paragraphIndex) => (
                    <p
                      className={paragraphIndex > 0 ? "mt-3" : undefined}
                      key={`${item.$ref}-annotation-${paragraphIndex}`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </article>
          </section>
        </div>
      </div>
    );
  },
);

PrintDisplay.displayName = "PrintDisplay";

export default PrintDisplay;
