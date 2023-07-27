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
          <a className="inverted" href={lang.contacts.facebook}>
            <FacebookIcon />
          </a>
          <a className="inverted" href={lang.contacts.instagram}>
            <InstagramIcon />
          </a>
          <a className="h-[34px] w-[34px]" href={lang.contacts.email}>
            <AtIcon />
          </a>
        </div>
      </nav>
      <div className="mx-auto w-full max-w-4xl">
        <ul className="space-y-2 text-right text-lg">
          <li className="font-regular">
            &copy; {`${new Date().getFullYear()}`} Barista Live, z. s.
          </li>
        </ul>
      </div>
    </footer>
  );
};
