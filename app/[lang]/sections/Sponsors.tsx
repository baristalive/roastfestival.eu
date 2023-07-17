"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";
import PlusIcon from "../../icons/plus";

export const Sponsors = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="inverted py-20 text-center">
      <h2 className="uppercase font-medium text-4xl py-20 ">
        {lang.sponsors.title}
      </h2>
      <div className="text-xl flex justify-center flex-wrap items-center gap-8">
        {lang.sponsors.content?.map((s: { href: string; src: string; }) => (
          <div className="p-2" key={s.href}>
            <a href={s.href}>
              {
                // eslint-disable-next-line @next/next/no-img-element
              }<img
                src={s.src}
                alt="Sponsor logo"
                className="max-h-[16rem] max-w-[16rem]"
                style={{
                  filter: "sepia(5) saturate(100) grayscale(1) contrast(1000)  invert(0.87) sepia(15%) saturate(2736%) hue-rotate(15deg) brightness(111%) contrast(100)",
                }} />
            </a>
          </div>
        ))}
        <div className="rounded-lg px-10 py-20 opacity-50 hover:opacity-100 transition-opacity duration-200">
          <a href={lang.contacts.email}>
            <PlusIcon />
            <h4 className="mt-4">{lang.sponsors.add}</h4>
          </a>
        </div>
      </div>
    </section>
  );
};
