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
    <footer className="inverted flex min-h-[50vh] flex-col justify-end p-10">
      <nav className="text-center text-xl font-medium">
        <div>{lang.contact}</div>
        <div className="mt-2 flex justify-center gap-4 pb-40">
          <a
            className="inverted"
            href={lang.contacts.facebook}
            title="Facebook"
            rel="external"
          >
            <FacebookIcon />
            <span className="sr-only">Facebook</span>
          </a>
          <a
            className="inverted"
            href={lang.contacts.instagram}
            title="Instagram"
            rel="external"
          >
            <InstagramIcon />
            <span className="sr-only">Instagram</span>
          </a>
          <a
            className="h-[34px] w-[34px]"
            href={lang.contacts.email}
            title="E-Mail"
            rel="author"
          >
            <AtIcon />
            <span className="sr-only">E-Mail</span>
          </a>
        </div>
      </nav>
      <div className="mx-auto w-full max-w-4xl">
        <ul className="space-y-2 text-right text-lg">
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
