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
    <footer className="flex min-h-[50vh] flex-col justify-end py-10">
      <nav className="text-center font-medium lowercase">
        <div className="pb-12 text-3xl">{lang.contact}</div>
        <div className="flex justify-center gap-4 pb-40">
          <a href={lang.contacts.facebook} title="Facebook" rel="external">
            <FacebookIcon />
            <span className="sr-only">Facebook</span>
          </a>
          <a href={lang.contacts.instagram} title="Instagram" rel="external">
            <InstagramIcon />
            <span className="sr-only">Instagram</span>
          </a>
          <a href={lang.contacts.email} title="E-Mail" rel="author">
            <AtIcon />
            <span className="sr-only">E-Mail</span>
          </a>
        </div>
      </nav>
      <div className="mx-auto w-full max-w-[1900px] md:px-12">
        <ul className="space-y-4 text-center md:text-right text-lg">
          <li className="font-regular text-sm">
            Artwork by sugeng riyanto,
            <br /> Muhammad Nur Auliady Pamungkas,
            <br /> and Cuputo
            <br /> from{" "}
            <a
              href="https://thenounproject.com/"
              rel="external"
              target="_blank"
            >
              Noun Project
            </a>{" "}
            (CC BY 3.0)
          </li>
          <li className="font-regular">
            &copy; {`${new Date().getFullYear()}`}{" "}
            <a
              href="https://baristalive.cz"
              rel="author"
              title="Barista Live, z. s."
            >
              Barista Live, z. s.
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
