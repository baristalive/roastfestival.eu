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
    <footer className="inverted h-[50vh] p-10 flex flex-col justify-end">
      <nav className="text-center font-medium text-xl">
        <div>{lang.contact}</div>
        <div className="flex justify-center gap-4 mt-2 pb-40">
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
      <div className="max-w-4xl w-full mx-auto">
        <ul className="space-y-2 text-lg text-right">
          <li className="font-regular">
            &copy; {`${new Date().getFullYear()}`} Barista Live, z. s.
          </li>
        </ul>
      </div>
    </footer>
  );
};
