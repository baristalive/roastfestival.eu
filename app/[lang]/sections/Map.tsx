"use client";
import CarIcon from "@/app/icons/car";
import LocationIcon from "@/app/icons/location";
import MapIcon from "@/app/icons/map.svg";
import TramIcon from "@/app/icons/tram";
import WebIcon from "@/app/icons/web";
import "maplibre-gl/dist/maplibre-gl.css";
import { useParams } from "next/navigation";
import { useRef } from "react";
import ReactMap, { Marker, NavigationControl } from "react-map-gl/maplibre";
import { SupportedLanguages, dictionaries } from "@/app/dictionaries/all";
import Bar from "@/app/components/Bar";
import { useGSAP } from "@gsap/react";

export const Map = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);
  const { contextSafe } = useGSAP({ scope: ref });
  return (
    <section ref={ref} className="where-section watermark2 min-h-screen p-8">
      <div className="mx-auto grid max-w-[1900px] grid-cols-[1fr,auto,1fr] md:p-12">
        <div className="flex flex-col">
          <h2 className="pb-8 text-6xl font-bold">{lang.location.title}</h2>
          <div className="max-w-screen-lg space-y-10 text-lg leading-normal lg:text-xl">
            {lang.location.howToTitle}
          </div>
          <div className="grow">
            <Bar mountRef={ref} contextSafe={contextSafe} />
          </div>
          <div className="card elevate mb-32 flex flex-col gap-4 rounded-s-2xl p-12 text-right">
            <h3 className="text-2xl font-bold">{lang.location.addressTitle}</h3>
            <p className="text-2xl">Káznice Brno</p>
            <p className="text-2xl">
              Bratislavská 249/68,
              <br />
              602 00 Brno-Střed-Zábrdovice
            </p>
            <div className="mt-3 flex justify-end gap-4">
              <a
                href={lang.contacts.kaznice_loc}
                rel="external"
                title="Káznice Brno - Google Maps"
                className="h-16 w-16 rounded-full border border-[var(--black)] fill-current p-4"
              >
                <MapIcon />
                <span className="sr-only">Káznice Brno - Google Maps</span>
              </a>
              <a
                className="p-auto h-16 w-16 rounded-full border border-[var(--black)] fill-current pt-[.8rem] text-center"
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
          <div className="card elevate relative rounded-3xl p-3">
            <div className="card elevate absolute top-3 z-50 m-3 flex w-[calc(100%_-_3rem)] items-center justify-between rounded-full text-2xl leading-none">
              <h4 className="py-6 pl-8 font-semibold">
                {lang.location.stops.kaznice}, Brno
              </h4>
              <a
                href={lang.contacts.kaznice_loc}
                rel="external"
                title="Káznice Brno - Google Maps"
                className="mr-1 h-16 w-16 rounded-full bg-[var(--black)] fill-current p-4 text-[var(--white)]"
              >
                <MapIcon />
                <span className="sr-only">Káznice Brno - Google Maps</span>
              </a>
            </div>

            <div className="h-[60rem] w-[40rem] rounded-3xl text-xl font-medium text-black">
              <ReactMap
                initialViewState={{
                  longitude: 16.6225864,
                  latitude: 49.1995978,
                  zoom: 15,
                }}
                scrollZoom={false}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "1.5rem",
                }}
                mapStyle="https://api.maptiler.com/maps/0a4d14d5-c66a-44c7-b95c-7acd8b5831d2/style.json?key=rHR8mWmLUwZBlvh6y60f"
              >
                <Marker
                  latitude={49.1992978}
                  longitude={16.6232864}
                  anchor="bottom"
                >
                  <div className="px-6 py-4">{lang.location.stops.kaznice}</div>
                </Marker>
                <Marker
                  latitude={49.20001678633428}
                  longitude={16.626028456324793}
                  anchor="bottom"
                >
                  <div className="px-6 py-4">
                    {lang.location.stops.tkalcovska}
                  </div>
                </Marker>
                <Marker
                  latitude={49.19821445765383}
                  longitude={16.61971675681972}
                  anchor="bottom"
                >
                  <div className="px-6 py-4">
                    {lang.location.stops.kornerova}
                  </div>
                </Marker>
                <Marker
                  latitude={49.198594269474306}
                  longitude={16.61462520981893}
                  anchor="bottom"
                >
                  <div className="px-6 py-4">
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
          <div className="card elevate relative z-0 mt-32 flex flex-col gap-4 rounded-e-2xl p-12  text-2xl">
            <h3 className="font-bold">{lang.location.howToTitle}</h3>
            <div className="grid grid-cols-[auto,1fr] gap-4">
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
