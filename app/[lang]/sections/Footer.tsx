"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";
import FacebookIcon from "../../icons/facebook";
import InstagramIcon from "../../icons/instagram";
import AtIcon from "../../icons/at";
import Logo from "../components/Logo";

export const Footer = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  return (
    <footer className="border-midnight bg-teal border-t-8 px-6 py-20">
      <div className="container mx-auto text-center">
        <div className="mb-12">
          <div className="animate-float mx-auto h-24 w-24">
            <Logo />
          </div>
        </div>
        <h2 className="font-display text-midnight mb-8 text-[8vw] font-black tracking-tighter uppercase">
          {params.lang === "cz" ? "Nebuď " : "Don't Be a "}
          <span className="text-burgundy">
            {params.lang === "cz" ? "De-Caf." : "De-Caf."}
          </span>
        </h2>

        <div className="font-display mb-16 flex flex-wrap justify-center gap-12 text-2xl font-bold uppercase">
          <div className="flex flex-col">
            <span className="mb-2 text-xs tracking-[0.5em] opacity-60">
              {params.lang === "cz" ? "Sleduj chaos" : "Follow The Chaos"}
            </span>
            <div className="flex justify-center gap-4">
              <a
                href={lang.contacts.instagram}
                className="text-midnight hover:text-cream transition-colors"
                target="_blank"
                rel="external"
              >
                <InstagramIcon />
              </a>
              <a
                href={lang.contacts.facebook}
                className="text-midnight hover:text-cream transition-colors"
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
            <span>{lang.place}</span>
          </div>
          <div className="flex flex-col">
            <span className="mb-2 text-xs tracking-[0.5em] opacity-60">
              {lang.contact}
            </span>
            <a
              href={lang.contacts.email}
              className="text-midnight hover:text-cream transition-colors"
            >
              <AtIcon />
            </a>
          </div>
        </div>

        <div className="border-midnight flex flex-col items-center justify-between gap-4 border-t-4 pt-8 md:flex-row">
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
