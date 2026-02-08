"use client";
import CarIcon from "@/app/icons/car";
import MapIcon from "@/app/icons/map";
import TramIcon from "@/app/icons/tram";
import WebIcon from "@/app/icons/web";
import "maplibre-gl/dist/maplibre-gl.css";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ReactMap, { Marker, NavigationControl } from "react-map-gl/maplibre";
import { SupportedLanguages, dictionaries } from "@/app/dictionaries/all";
import BeanIcon from "@/app/icons/beanicon";
import { Section } from "@/app/components/Section";

const BASE_LAT = 49.1995978;
const BASE_LNG = 16.6225864;
const MOBILE_LAT_OFFSET = 0.0015; // ~150 meters north on mobile

export const Map = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const mapCenter = {
    latitude: isMobile ? BASE_LAT + MOBILE_LAT_OFFSET : BASE_LAT,
    longitude: BASE_LNG,
  };

  return (
    <Section id="location" className="relative">
      {/* Full-bleed Map */}
      <div className="h-screen lg:h-225">
        <ReactMap
          key={isMobile ? "mobile" : "desktop"}
          initialViewState={{
            latitude: mapCenter.latitude,
            longitude: mapCenter.longitude,
            zoom: 15,
          }}
          scrollZoom={false}
          style={{
            height: "100%",
            width: "100%",
          }}
          mapStyle="https://api.maptiler.com/maps/019c202e-e943-71a2-9307-527f7fee6b56/style.json?key=PeGeqGWAzLQUdqICcIfc"
        >
          <Marker latitude={49.1996958} longitude={16.6225864} anchor="bottom">
            <div
              className="map-marker-punk bg-primary flex flex-col items-center gap-2 px-4 py-2 text-white"
              style={
                {
                  "--background": "var(--color-primary)",
                } as React.CSSProperties
              }
            >
              <span className="font-display w-min text-center font-bold">
                {lang.location.stops.kaznice}
              </span>
              <div className="h-12 w-12">
                <BeanIcon />
              </div>
            </div>
          </Marker>
          <Marker
            latitude={49.20001678633428}
            longitude={16.625958456324793}
            anchor="bottom"
          >
            <div className="map-marker-punk flex flex-col items-center gap-2 bg-white px-4 py-2">
              <span className="font-display w-min text-center font-bold">
                {lang.location.stops.tkalcovska}
              </span>
              <TramIcon size="2em" />
            </div>
          </Marker>
          <Marker
            latitude={49.19832445765383}
            longitude={16.61971675681972}
            anchor="bottom"
          >
            <div className="map-marker-punk flex flex-col items-center gap-2 bg-white px-4 py-2">
              <span className="font-display w-min text-center font-bold">
                {lang.location.stops.kornerova}
              </span>
              <TramIcon size="2em" />
            </div>
          </Marker>
          <Marker
            latitude={49.198594269474306}
            longitude={16.61462520981893}
            anchor="bottom"
          >
            <div className="map-marker-punk flex flex-col items-center gap-2 bg-white px-4 py-2">
              <span className="font-display w-min text-center font-bold">
                {lang.location.parking.lot.title}
              </span>
              <CarIcon size="2em" />
            </div>
          </Marker>
          <NavigationControl position="bottom-right" showCompass={false} />
        </ReactMap>
      </div>

      {/* Floating Panels */}
      <div className="pointer-events-none absolute inset-0 flex flex-col gap-8 p-4 md:justify-between lg:p-6">
        {/* Top floating panel - Venue Info */}
        <div className="pointer-events-auto md:self-start">
          <div className="bg-primary punk-border pop-shadow p-4 text-black shadow-lg lg:p-6">
            <div className="mb-3 flex items-center justify-between gap-6">
              <h2 className="font-display text-2xl leading-none font-black uppercase lg:text-3xl">
                {lang.location.stops.kaznice}
              </h2>
              <div className="flex gap-2">
                <a
                  href={lang.contacts.kaznice_loc}
                  rel="external"
                  title="Káznice Brno - Google Maps"
                  className="hover:bg-primary flex h-10 w-10 items-center justify-center border-2 border-black bg-black fill-current text-white transition-colors"
                >
                  <MapIcon />
                  <span className="sr-only">Káznice Brno - Google Maps</span>
                </a>
                <a
                  href={lang.contacts.kaznice_web}
                  rel="external"
                  title="Káznice Brno - Web"
                  className="hover:bg-primary flex h-10 w-10 items-center justify-center border-2 border-black bg-black fill-current text-white transition-colors"
                >
                  <WebIcon />
                  <span className="sr-only">Káznice Brno - Web</span>
                </a>
              </div>
            </div>
            <p className="text-base">Bratislavská 249/68, 602 00 Brno</p>
          </div>
        </div>

        {/* Bottom floating panel - Transport */}
        <div className="pointer-events-auto self-start">
          <div className="bg-secondary punk-border pop-shadow p-4 text-black shadow-lg lg:p-6">
            <h3 className="font-display mb-4 text-lg font-black uppercase lg:text-xl">
              {lang.location.howToTitle}
            </h3>
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
              {/* Tram */}
              <div className="flex items-start gap-3">
                <div className="text-secondary flex h-8 w-8 shrink-0 items-center justify-center bg-black">
                  <TramIcon size="2em" />
                </div>
                <div className="text-base">
                  <p className="font-bold">MHD</p>
                  <p>{lang.location.stops.tkalcovska} — 4, 7, 2</p>
                  <p>{lang.location.stops.kornerova} — 4, 7, 2</p>
                </div>
              </div>
              {/* Parking */}
              <div className="flex items-start gap-3">
                <div className="text-secondary flex h-8 w-8 shrink-0 items-center justify-center bg-black">
                  <CarIcon size="2em" />
                </div>
                <div className="text-base">
                  <p className="font-bold">{lang.location.parking.lot.title}</p>
                  <p>{lang.location.parking.lot.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
