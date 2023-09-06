"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";
import PlusIcon from "../../icons/plus";
import Image from "next/image";

export const Sponsors = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="inverted py-20 text-center">
      <h2 className="py-20 text-4xl font-medium uppercase">
        {lang.sponsors.title}
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-8 text-xl">
        {lang.sponsors.content?.map(
          (s: { href: string; src: string; alt: string }) => (
            <div className="p-2" key={s.href}>
              <a href={s.href} title={s.alt}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  className="max-h-[16rem] max-w-[16rem] "
                  // style={{
                  //   filter:
                  //     "sepia(5) saturate(100) grayscale(1) contrast(1000)  invert(0.87) sepia(15%) saturate(2736%) hue-rotate(15deg) brightness(111%) contrast(100)",
                  // }}
                />
                <span className="sr-only">{s.alt}</span>
              </a>
            </div>
          ),
        )}
        <div className="rounded-lg px-10 py-20 opacity-50 transition-opacity duration-200 hover:opacity-100">
          <a href={lang.contacts.email} title={lang.sponsors.add}>
            <PlusIcon />
            <h4 className="mt-4">{lang.sponsors.add}</h4>
          </a>
        </div>
      </div>
    </section>
  );
};
