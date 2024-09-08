import dictionaries, {
  Presenter,
  SupportedLanguages,
} from "@/app/dictionaries/all";
import FacebookIcon from "@/app/icons/facebook";
import InstagramIcon from "@/app/icons/instagram";
import { useParams } from "next/navigation";
import React, { PropsWithChildren, useEffect } from "react";
import { StationIcon } from "./StationIcon";
import ExportedImage from "next-image-export-optimizer";
import WebIcon from "@/app/icons/web";
import YoutubeIcon from "@/app/icons/youtube";

const getTimeString = (time: number) => {
  const hours = Math.floor(time);
  const minutes = Math.floor(60 * (time % 1))
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const Modal = ({
  name,
  annotation,
  subheading,
  facebook,
  instagram,
  youtube,
  web,
  logo,
  schedule,
  modalProps,
  children,
}: PropsWithChildren<Presenter>) => {
  const [showModal, setShowModal] = React.useState(false);
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const socialLinks = (
    <>
      {web && (
        <a
          href={web}
          title="Web"
          target="_blank"
          rel="external"
          className="nav h-[3em] w-[3em] rounded-full bg-[var(--secondary)] p-1 pt-2 text-[var(--white)]"
        >
          <WebIcon />
          <span className="sr-only">Instagram</span>
        </a>
      )}
      {instagram && (
        <a
          href={instagram}
          title="Instagram"
          target="_blank"
          rel="external"
          className="nav"
        >
          <InstagramIcon />
          <span className="sr-only">Instagram</span>
        </a>
      )}
      {facebook && (
        <a
          href={facebook}
          title="Facebook"
          target="_blank"
          rel="external"
          className="nav"
        >
          <FacebookIcon />
          <span className="sr-only">Facebook</span>
        </a>
      )}
      {youtube && (
        <a
          href={youtube}
          title="YouTube"
          target="_blank"
          rel="external"
          className="nav"
        >
          <YoutubeIcon />
          <span className="sr-only">YouTube</span>
        </a>
      )}
    </>
  );

  const modal = (
    <>
      <div className="fixed inset-0 z-10 bg-[color-mix(in_srgb,_var(--primary)_45%,_transparent)]"></div>
      <div
        className="fixed inset-0 z-20 flex animate-[slideUp_200ms] items-end overflow-y-auto overflow-x-hidden bg-transparent text-left outline-none focus:outline-none md:animate-[fadeIn_200ms] md:items-center md:justify-center"
        onClick={() => setShowModal(false)}
      >
        <button
          className="leading-1 absolute right-4 top-4 h-[40px] w-[40px] rounded-full bg-[var(--black)] p-0 pb-1 text-2xl font-bold leading-4 text-white"
          onClick={() => setShowModal(false)}
        >
          ×
        </button>
        <div className="w-full bg-transparent p-2 focus:outline-none lg:min-w-[500px] lg:max-w-[60%]">
          <div
            className="card elevate z-10 col-start-2 flex flex-col items-start justify-center rounded-3xl border-0 px-3 pb-10 pt-3 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              className={`relative flex w-full flex-col items-center justify-center ${logo ? "pt-20" : ""}`}
            >
              {logo && (
                <div
                  className={`elevate absolute ${modalProps?.showName === false ? "bottom-6" : "bottom-20"} flex h-60 w-60 items-center justify-center overflow-hidden rounded-full bg-white ${modalProps?.className !== undefined ? modalProps?.className : "p-4"}`}
                >
                  <ExportedImage
                    src={`/images/promoted/${logo}`}
                    alt={name}
                    width={240}
                    height={240}
                  />
                </div>
              )}
              {modalProps?.showName === false ? null : (
                <h5 className="mx-20 mt-10 text-center text-4xl font-medium">
                  {name}
                </h5>
              )}
            </div>
            {subheading && modalProps?.showSubheading !== false && (
              <div className="mx-auto py-4 font-normal">
                <h6 className="text-lg">{subheading}</h6>
              </div>
            )}
            <div className="mx-auto mt-10 flex items-center justify-center gap-10 px-10">
              {schedule.map((item, idx) => {
                const day =
                  lang.programDays[item.day as keyof typeof lang.programDays]
                    .name;
                return (
                  <div
                    className="flex flex-col items-center justify-center"
                    key={idx}
                  >
                    <div>
                      <StationIcon station={item.track} />
                    </div>
                    <h6 className="text-xl font-bold">
                      {
                        lang.programCategory[
                          item.track as keyof typeof lang.programCategory
                        ]
                      }
                    </h6>
                    <h6 className="text-xl">
                      {day}: {getTimeString(item.start)} -{" "}
                      {getTimeString(item.end)}
                    </h6>
                    <h6 className="text-xl"></h6>
                  </div>
                );
              })}
            </div>
            <div className="flex-grow p-10 font-normal">
              {Array.isArray(annotation) ? (
                annotation.map((p) => (
                  <p className="text-lg mb-4" key={p}>
                    {p}
                  </p>
                ))
              ) : (
                <p className="text-lg">{annotation}</p>
              )}
            </div>
            <div className="flex w-full items-center justify-center gap-4">
              {socialLinks}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="cursor-pointer" onClick={() => setShowModal(true)}>
        {children}
      </div>
      {showModal ? modal : null}
    </>
  );
};

export default Modal;
