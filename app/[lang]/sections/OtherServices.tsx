"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";
import Image from "next/image";
import InstagramIcon from "@/app/icons/instagram";

export const OtherServices = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className=" inverted mx-auto py-48 text-center">
      <h2 className="py-20 text-4xl font-medium uppercase">
        {lang.gastro.title}
      </h2>
      <div className="mx-auto max-w-screen-lg space-y-10 px-6 pb-24 text-xl lg:px-0 lg:text-4xl">
        {lang.gastro.text}
      </div>
      <div className="mx-auto flex max-w-screen-2xl flex-col flex-wrap justify-center lg:flex-row">
        {lang.gastro.content.map((g) => (
          <div key={g.title} className="basis-1/4 space-y-10 p-10">
            <h4 className="text-xl font-medium md:text-2xl">
              {g.title}
              {g.alt && ` - ${g.alt}`}
            </h4>
            <p>{g.text}</p>
            {g.href && (
              <a
                href={g.href}
                target="_blank"
                className="block"
                rel="external"
                title={g.alt}
              >
                {g.src && g.alt ? (
                  <>
                    <Image
                      src={g.src}
                      alt={g.alt}
                      className="mx-auto max-h-[16rem] max-w-[16rem]"
                      width={180}
                      height={180}
                      unoptimized
                      loader={({src}) => src}
                    />
                    <span className="sr-only">{g.alt}</span>
                  </>
                ) : (
                  <div className="flex justify-center">
                    <InstagramIcon />
                  </div>
                )}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
