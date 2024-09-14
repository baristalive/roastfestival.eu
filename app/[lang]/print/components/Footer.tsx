import dictionaries, { SupportedLanguages } from "@/app/dictionaries/all";
import Link from "next/link";
import { useParams } from "next/navigation";

const Footer = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  return (
    <div className="flex text-base">
      <div>
        <span className="font-bold">&copy; ROAST! Festival 2024</span>,{" "}
        {lang.programDisclaimer}
      </div>
      <div className="grow" />
      <Link href="https://www.roastfestival.eu" className="font-bold">
        www.roastfestival.eu
      </Link>
    </div>
  );
};
export default Footer;
