import dictionaries, { SupportedLanguages } from "@/app/dictionaries/all";
import BeanIcon from "@/app/icons/beanicon";
import { useParams } from "next/navigation";

const Header = ({
  category,
}: {
  category: keyof typeof dictionaries.en.programCategory;
}) => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const day = lang.program.filter((d) => d.$ref === params.day)[0];

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-4 rounded-full border-2 border-[var(--black)] p-1">
        <h2 className="pl-6 pr-8 text-4xl font-bold text-[var(--black)]">
          {lang.programTile.title}
        </h2>
        <div className="rounded-full bg-[var(--primary)] px-12 py-2 text-center text-[var(--white)]">
          <h3 className="text-3xl font-bold">
            {lang.programDays[day.$ref as keyof typeof lang.programDays].name}
          </h3>
          <span className="text-xl">
            {lang.programDays[day.$ref as keyof typeof lang.programDays].date}
          </span>
        </div>
        <h2 className="pl-6 pr-8 text-4xl font-bold text-[var(--black)]">
          {lang.programCategory[category]}
        </h2>
      </div>
      <div className="grow" />
      <div className="relative self-start">
        <div className="absolute -right-20 -top-20 text-6xl opacity-50">
          <BeanIcon />
        </div>
      </div>
    </div>
  );
};
export default Header;
