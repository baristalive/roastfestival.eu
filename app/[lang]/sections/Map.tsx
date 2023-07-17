"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";

export const Map = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="inverted h-screen py-20 text-center">
      <h2 className="uppercase font-medium text-4xl pt-20 pb-36">
        {lang.location.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 place-content-center">
        <div></div>
        <div className="space-y-20 lg:text-2xl font-medium text-xl">
          {
            // eslint-disable-next-line @next/next/no-img-element
          }<img
            className="mx-auto block"
            src="/kaznice.png"
            alt="Logo Káznice"
          />
          <p>
            Bratislavská 249/68,
            <br />
            602 00 Brno-Střed Zábrdovice
          </p>
          <div className="bg-[#fff800] rounded-full w-10 h-10 inline-block m-2" />
          <div className="bg-[#fff800] rounded-full w-10 h-10 inline-block m-2" />
          <div className="bg-[#fff800] rounded-full w-10 h-10 inline-block m-2" />
        </div>
      </div>
    </section>
  );
};
