"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";

export const Info = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  return (
    <section id="about" className="bg-dots bg-mint-cream relative px-6 py-32">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Feature Card 1 - Main */}
          <div className="animate-pop punk-border pop-shadow bg-primary -rotate-1 transform p-10 transition-transform duration-300 hover:rotate-0 md:col-span-7">
            <h2 className="font-display text-onyx mb-6 text-6xl leading-[0.85] font-black uppercase md:text-8xl">
              {lang.about.title.split(" ").slice(0, 2).join(" ")} <br />
              <span className="text-accent">
                {lang.about.title.split(" ").slice(2).join(" ") || "ROAST!"}
              </span>
            </h2>
            <p className="text-onyx max-w-lg text-xl font-bold md:text-2xl">
              {lang.about.text[0]}
            </p>
          </div>

          {/* Stat Card */}
          <div className="animate-pop punk-border pop-shadow bg-accent flex rotate-2 flex-col items-center justify-center p-10 text-center transition-transform duration-300 hover:rotate-0 md:col-span-5">
            <span className="font-display text-onyx text-[120px] leading-none font-black">
              30+
            </span>
            <span className="font-display text-3xl font-bold tracking-tighter uppercase">
              {params.lang === "cz" ? "Pražíren" : "Roasters"}
            </span>
          </div>

          {/* Info Cards from dictionary */}
          {lang.info.map((item, idx) => (
            <div
              key={item.title}
              className={`animate-pop punk-border pop-shadow group bg-secondary text-evergreen flex flex-col justify-between p-8 ${idx === 0 ? "md:col-span-4" : "md:col-span-8"}`}
            >
              <div className="relative z-10">
                <div
                  className={`mb-4 h-4 w-16 ${idx === 0 ? "bg-accent" : "bg-evergreen"}`}
                ></div>
                <h3 className="font-display text-4xl font-black uppercase">
                  {item.title}
                </h3>
                <p className="mt-8 text-lg font-light opacity-80">
                  {item.text}
                </p>
              </div>
              {idx === 1 && (
                <a
                  href={`/${params.lang}/program`}
                  className="font-display bg-primary text-mint-cream hover:bg-accent mt-8 inline-block px-8 py-3 text-xl font-black uppercase transition-colors"
                >
                  {lang.learnMore || "Explore"}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
