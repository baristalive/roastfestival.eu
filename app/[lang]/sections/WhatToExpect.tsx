"use client";
import Bar from "@/app/components/Bar";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import BeanIcon from "@/app/icons/beanicon";

export const WhatToExpect = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  return (
    <section
      id="what-to-expect"
      className="what-to-expect-section watermark3 pt-12 sm:pt-0 lg:pb-24"
    >
      <div className="mx-auto grid max-w-[1900px] px-8 lg:grid-cols-[1fr,1fr]">
        <div className="md:pl-12">
          <h2 className="pt-24 text-3xl font-bold md:pt-0 2xl:pt-20 2xl:text-6xl">
            {lang.whatToExpect.title}
          </h2>
          <Bar />
        </div>
      </div>
      <div className="mx-auto grid max-w-[1900px] gap-4 px-8 py-12 md:px-12 lg:grid-cols-[1fr,1fr] lg:gap-16">
        {lang.whatToExpect.content.map((col, idx) => (
          <div className="py-4 lg:px-8 lg:py-12" key={idx}>
            <h2 className="pb-4 text-2xl font-bold lg:pb-16 lg:text-3xl">
              {col.title}
            </h2>
            <ul className="flex flex-col gap-4 lg:gap-16 lg:text-xl">
              {col.items.map((item, idx) => (
                <li className="flex gap-12" key={idx}>
                  <div className="hidden w-16 lg:block">
                    <BeanIcon />
                  </div>
                  <div>
                    <div className="pb-4 font-bold lg:text-2xl">
                      {item.title}
                    </div>
                    {item.text}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
