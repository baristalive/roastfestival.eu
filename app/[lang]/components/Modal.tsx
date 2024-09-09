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
import { getTimeString } from "@/app/utils/time";
import Flag from "@/app/icons/cz";

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
  country,
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
        className="fixed inset-0 z-20 flex animate-[fadeIn_200ms] items-end overflow-y-auto overflow-x-hidden bg-transparent text-left outline-none focus:outline-none md:items-center md:justify-center"
        onClick={() => setShowModal(false)}
      >
        <button
          className="leading-1 absolute right-2 top-2 z-30 h-[40px] w-[40px] rounded-full bg-[var(--black)] p-0 text-2xl font-bold leading-4 text-white"
          onClick={() => setShowModal(false)}
        >
          ×
        </button>
        <div className="h-full w-full bg-transparent p-1 focus:outline-none lg:h-auto lg:w-auto lg:min-w-[500px] lg:max-w-[80%] xl:max-w-[60%]">
          <div
            className="flex flex-col items-start justify-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {logo && (
              <div
                className="-mb-20 flex w-full flex-col items-center justify-center"
                onClick={() => setShowModal(false)}
              >
                <div className="relative z-20">
                  <div
                    className={`elevate flex h-60 w-60 items-center justify-center overflow-hidden rounded-full bg-white ${modalProps?.className !== undefined ? modalProps?.className : "p-4"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <ExportedImage
                      src={`/images/promoted/${logo}`}
                      alt={name}
                      width={240}
                      height={240}
                    />
                    {country && (
                      <div className="elevate absolute bottom-0 right-0 overflow-hidden rounded-full border-0">
                        <Flag country={country} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div
              className={`card elevate z-10 w-full rounded-3xl border-0 p-3 ${logo ? "pt-20" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {modalProps?.showName === false ? null : (
                <h5 className="mx-2 mt-10 text-center text-3xl font-bold md:pt-0 lg:mx-20 2xl:text-6xl">
                  {name}
                </h5>
              )}
              {subheading && modalProps?.showSubheading !== false && (
                <div className="mx-auto my-6 text-center font-normal">
                  <h6 className="text-base">{subheading}</h6>
                </div>
              )}
              <div className="mx-auto my-2 flex items-center justify-center gap-10 px-10">
                {schedule.map((item, idx) => {
                  const day =
                    lang.programDays[item.day as keyof typeof lang.programDays]
                      .name;
                  return (
                    <div
                      className="flex flex-col items-center justify-center text-center"
                      key={idx}
                    >
                      <div>
                        <StationIcon station={item.track} />
                      </div>
                      <h6 className="text-base font-bold xl:text-xl">
                        {
                          lang.programCategory[
                            item.track as keyof typeof lang.programCategory
                          ]
                        }
                      </h6>
                      <h6 className="text-base xl:text-xl">
                        {day}: {getTimeString(item.start)} -{" "}
                        {getTimeString(item.end)}
                      </h6>
                    </div>
                  );
                })}
              </div>
              <div className="flex-grow p-2 font-normal xl:p-10">
                {Array.isArray(annotation) ? (
                  annotation.map((p) => (
                    <p className="mb-4 text-base xl:text-lg" key={p}>
                      {p}
                    </p>
                  ))
                ) : (
                  <p className="text-base xl:text-lg">{annotation}</p>
                )}
              </div>
              <div className="flex w-full items-center justify-center gap-4 pt-2">
                {socialLinks}
              </div>
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
