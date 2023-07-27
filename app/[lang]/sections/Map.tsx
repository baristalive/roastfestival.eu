"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";

import ReactMap, {Marker, NavigationControl} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import TramIcon from "@/app/icons/tram";
import CarIcon from "@/app/icons/car";
import LocationIcon from "@/app/icons/location";
import WebIcon from "@/app/icons/web";
export const Map = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <section className="inverted py-20 text-center">
      <h2 className="uppercase font-medium text-4xl pt-20 pb-36">
        {lang.location.title}
      </h2>
      <div className="px-20 text-black uppercase text-lg font-medium">
        <ReactMap
          initialViewState={{
            longitude: 16.6225864,
            latitude: 49.1995978,
            zoom: 15,
          }}
          scrollZoom={false}
          style={{ width: "100%", height: " calc(70vh)", borderRadius: "40px" }}
          mapStyle="https://api.maptiler.com/maps/677f7646-e8c2-42a9-bb44-6ff05d7e79f0/style.json?key=rHR8mWmLUwZBlvh6y60f"
        >
          <Marker latitude={49.1992978} longitude={16.6232864} anchor="bottom">
            <span className="inverted-vars">
              <LocationIcon />
            </span>{" "}
            {lang.location.stops.kaznice}
          </Marker>
          <Marker latitude={49.1993253} longitude={16.6265775} anchor="bottom">
            <TramIcon /> {lang.location.stops.tkalcovska}
          </Marker>
          <Marker latitude={49.1979506} longitude={16.6198039} anchor="bottom">
            <TramIcon /> {lang.location.stops.kornerova}
          </Marker>
          <Marker latitude={49.1982094} longitude={16.6159275} anchor="bottom">
            <CarIcon /> {lang.location.parking.lot.title}
          </Marker>
          <NavigationControl position="bottom-right" showCompass={false} />
        </ReactMap>
      </div>
      <div className="hidden text-left max-w-7xl pt-20 mx-auto lg:grid grid-cols-2">
        <h2 className="uppercase font-medium text-4xl">
          {lang.location.addressTitle}
        </h2>
        <h2 className="uppercase font-medium text-4xl">
          {lang.location.howToTitle}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 place-content-center text-left max-w-7xl pt-20 mx-auto">
        <div className="space-y-10">
          <h2 className="uppercase font-medium text-4xl pb-20 lg:hidden">
            {lang.location.addressTitle}
          </h2>
          <p className="uppercase font-medium text-4xl">Káznice Brno</p>
          <p className="font-medium text-4xl">
            Bratislavská 249/68,
            <br />
            602 00 Brno-Střed-Zábrdovice
          </p>
          <div className="flex gap-4 mt-2">
            <a className="h-[34px] w-[34px]" href={lang.contacts.kaznice_loc}>
              <LocationIcon />
            </a>
            <a className="h-[34px] w-[34px]" href={lang.contacts.kaznice_web}>
              <WebIcon />
            </a>
          </div>
        </div>
        <div className="space-y-10">
          <h2 className="uppercase font-medium text-4xl pb-20 lg:hidden">
            {lang.location.howToTitle}
          </h2>
          <div className="grid grid-cols-[3.5em_1fr_2fr] gap-x-3">
            <div className="row-span-2 mt-[-8px]">
              <TramIcon size="3.5em" />
            </div>
            <div className="row-span-2 text-4xl">MHD</div>
            <div className="text-4xl">
              {lang.location.stops.tkalcovska} - 4, 7, 2
            </div>
            <div className="text-4xl mt-10 mb-20">
              {lang.location.stops.kornerova} - 4, 7, 2
            </div>
            <div className="row-span-2  mt-[-8px]">
              <CarIcon size="3.5em" />
            </div>
            <div className="row-span-2 text-4xl">Autem</div>
            <div className="space-y-2">
              <h5 className="text-4xl">{lang.location.parking.lot.title}</h5>
              <ul>
                <li className="text-2xl">
                  {lang.location.parking.lot.priceWhen}
                </li>
                <li className="text-2xl">
                  {lang.location.parking.lot.priceAmount}
                </li>
              </ul>
            </div>
            <div className="space-y-2 mt-10">
              <h5 className="text-4xl">
                {lang.location.parking.zones.title}
              </h5>
              {lang.location.parking.zones.pricing.map(z => (
                <ul key={z.title}>
                  <li className="text-2xl">{z.title}</li>
                  <li className="text-2xl">{z.price}</li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
