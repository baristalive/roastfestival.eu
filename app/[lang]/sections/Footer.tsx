"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";
import FacebookIcon from "../../icons/facebook";
import InstagramIcon from "../../icons/instagram";
import AtIcon from "../../icons/at";

export const Footer = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  return (
    <footer className="border-accent text-primary border-t-8 bg-black px-6 py-20">
      <div className="container mx-auto text-center">
        <h2 className="font-display text-accent mb-8 text-3xl font-black tracking-tighter uppercase md:text-6xl">
          {params.lang === "cz" ? "Nebuď De‑Caf." : "Don't Be a De‑Caf."}
        </h2>

        <div className="font-display mb-16 flex flex-wrap justify-center gap-12 text-2xl font-bold uppercase">
          <div className="flex flex-col">
            <span className="mb-2 text-xs tracking-[0.5em] opacity-60">
              {params.lang === "cz" ? "Sleduj chaos" : "Follow The Chaos"}
            </span>
            <div className="flex items-center justify-center gap-4">
              <a
                href={lang.contacts.instagram}
                className="text-accent hover:text-cream h-10 w-10 transition-colors"
                target="_blank"
                rel="external"
              >
                <InstagramIcon />
              </a>
              <a
                href={lang.contacts.facebook}
                className="text-accent hover:text-cream h-10 w-10 transition-colors"
                target="_blank"
                rel="external"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="mb-2 text-xs tracking-[0.5em] opacity-60">
              {params.lang === "cz" ? "Místo" : "Location"}
            </span>
            <span className="text-md">{lang.place}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-2 text-xs tracking-[0.5em] opacity-60">
              {lang.contact}
            </span>
            <a
              href={lang.contacts.email}
              className="text-accent hover:text-cream inline-block h-10 w-10 transition-colors"
            >
              <AtIcon />
            </a>
          </div>
        </div>

        <div className="border-accent flex flex-col items-center justify-between gap-4 border-t-4 pt-8 md:flex-row">
          <p className="text-sm font-bold uppercase">
            © {new Date().getFullYear()} ROAST! Festival — All Rights Roasted.
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase">
            <a
              href="https://baristalive.cz"
              rel="author"
              title="Barista Live, z. s."
              className="hover:underline"
            >
              Barista Live, z. s.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
