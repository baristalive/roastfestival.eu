"use client";
import CarIcon from "@/app/icons/car";
import MapIcon from "@/app/icons/map";
import TramIcon from "@/app/icons/tram";
import WebIcon from "@/app/icons/web";
import "maplibre-gl/dist/maplibre-gl.css";
import { useParams } from "next/navigation";
import ReactMap, { Marker, NavigationControl } from "react-map-gl/maplibre";
import { SupportedLanguages, dictionaries } from "@/app/dictionaries/all";
import Bar from "@/app/components/Bar";
import BeanIcon from "@/app/icons/beanicon";

export const Map = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="where-section watermark2 min-h-screen pb-48">
      <div className="mx-auto flex max-w-[1900px] grid-cols-[1fr_auto_1fr] flex-col px-8 lg:grid">
        <div className="flex flex-col md:pl-12">
          <h2 className="pb-8 text-3xl font-bold 2xl:text-6xl">
            {lang.location.title}
          </h2>
          <div className="max-w-screen-lg space-y-10 text-base leading-normal 2xl:text-xl">
            {lang.location.howToTitle}
          </div>
          <div className="grow">
            <Bar />
          </div>
          <div className="card elevate mx-4 mt-32 flex flex-col gap-2 rounded-t-2xl p-8 text-center text-base lg:mx-0 lg:mt-0 lg:mb-32 lg:gap-4 lg:rounded-s-2xl lg:rounded-tr-none lg:text-right 2xl:p-12 2xl:text-xl">
            <h3 className="font-bold">{lang.location.addressTitle}</h3>
            <p>Káznice Brno</p>
            <p>
              Bratislavská 249/68,
              <br />
              602 00 Brno-Střed-Zábrdovice
            </p>
            <div className="mt-3 flex justify-center gap-4 lg:justify-end">
              <a
                href={lang.contacts.kaznice_loc}
                rel="external"
                title="Káznice Brno - Google Maps"
                className="h-[3em] w-[3em] rounded-full border border-[var(--black)] fill-current p-[.65rem] 2xl:p-4"
              >
                <MapIcon />
                <span className="sr-only">Káznice Brno - Google Maps</span>
              </a>
              <a
                className="h-[3em] w-[3em] rounded-full border border-[var(--black)] fill-current p-2 2xl:p-4"
                href={lang.contacts.kaznice_web}
                title="Káznice Brno - Web"
                rel="external"
              >
                <WebIcon />
                <span className="sr-only">Káznice Brno - Web</span>
              </a>
            </div>
          </div>
        </div>
        <div className="z-10">
          <div className="card elevate relative rounded-3xl p-2 2xl:p-3">
            <div className="card elevate absolute top-3 z-50 m-3 flex w-[calc(100%_-_3rem)] items-center justify-between rounded-full text-base leading-none 2xl:text-xl">
              <h4 className="py-5 pl-4 font-semibold 2xl:py-6 2xl:pl-8">
                {lang.location.stops.kaznice}, Brno
              </h4>
              <a
                href={lang.contacts.kaznice_loc}
                rel="external"
                title="Káznice Brno - Google Maps"
                className="mr-1 h-[3em] w-[3em] rounded-full border border-[var(--black)] bg-[var(--black)] fill-current p-[.65rem] font-medium text-[var(--white)] lg:mr-2 2xl:p-4"
              >
                <MapIcon />
                <span className="sr-only">Káznice Brno - Google Maps</span>
              </a>
            </div>

            <div className="h-[30rem] rounded-3xl text-base text-black lg:aspect-[2/3] lg:h-[90vh] 2xl:text-xl">
              <ReactMap
                initialViewState={{
                  latitude: 49.1995978,
                  longitude: 16.6225864,
                  zoom: 15,
                }}
                scrollZoom={false}
                style={{
                  borderRadius: "1.5rem",
                  height: "100%",
                  width: "100%",
                }}
                mapStyle="https://api.maptiler.com/maps/c303af9a-2cbf-4c95-8aa7-00a95751e11c/style.json?key=PeGeqGWAzLQUdqICcIfc"
              >
                <Marker
                  latitude={49.1996958}
                  longitude={16.6225864}
                  anchor="bottom"
                >
                  <div className="flex items-center gap-3 px-4 py-2 lg:py-3 lg:pr-5">
                    <div className="inline-block text-[0.6rem]">
                      <BeanIcon />
                    </div>
                    {lang.location.stops.kaznice}
                  </div>
                </Marker>
                <Marker
                  latitude={49.20001678633428}
                  longitude={16.625958456324793}
                  anchor="bottom"
                >
                  <div className="flex items-center gap-1 px-4 py-2 lg:py-3 lg:pr-5">
                    <TramIcon size="2em" />
                    {lang.location.stops.tkalcovska}
                  </div>
                </Marker>
                <Marker
                  latitude={49.19832445765383}
                  longitude={16.61971675681972}
                  anchor="bottom"
                >
                  <div className="flex items-center gap-1 px-4 py-2 lg:py-3 lg:pr-5">
                    <TramIcon size="2em" />
                    {lang.location.stops.kornerova}
                  </div>
                </Marker>
                <Marker
                  latitude={49.198594269474306}
                  longitude={16.61462520981893}
                  anchor="bottom"
                >
                  <div className="flex items-center gap-1 px-4 py-2 lg:py-3 lg:pr-5">
                    <CarIcon size="2em" />
                    {lang.location.parking.lot.title}
                  </div>
                </Marker>
                <NavigationControl
                  position="bottom-right"
                  showCompass={false}
                />
              </ReactMap>
            </div>
          </div>
        </div>
        <div>
          <div className="card elevate relative z-0 mx-4 flex flex-col gap-4 rounded-b-2xl p-8 text-base lg:mx-0 lg:mt-4 lg:rounded-e-2xl lg:rounded-bl-none 2xl:mt-32 2xl:p-12 2xl:text-xl">
            <h3 className="font-bold">{lang.location.howToTitle}</h3>
            <div className="grid grid-cols-[auto,1fr] gap-2 lg:gap-4">
              <div className="">
                <TramIcon size="2em" />
              </div>
              <div>
                <p>{lang.location.stops.tkalcovska} - 4, 7, 2</p>
                <p>{lang.location.stops.kornerova} - 4, 7, 2</p>
              </div>
              <div className="">
                <CarIcon size="2em" />
              </div>
              <div>
                <p className="font-bold">{lang.location.parking.lot.title}</p>
                <p className="pb-2">{lang.location.parking.lot.description}</p>
                <p className="font-bold">{lang.location.parking.zones.title}</p>
                {lang.location.parking.zones.pricing.map((z) => (
                  <ul key={z.title}>
                    <li className="">{z.title}</li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
