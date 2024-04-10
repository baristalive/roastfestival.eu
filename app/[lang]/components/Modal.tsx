import dictionaries, { SupportedLanguages } from "@/app/dictionaries/all";
import FacebookIcon from "@/app/icons/facebook";
import InstagramIcon from "@/app/icons/instagram";
import { useParams } from "next/navigation";
import React from "react";
import { StationIcon } from "./StationIcon";

export type ProgramItem = {
  start: number;
  end: number;
  track: keyof typeof dictionaries.en.programCategory;
  day: string;
};

type ModalProps = {
  title: string;
  description: string;
  speakers?: string[];
  children: React.ReactNode;
  schedule: ProgramItem[];
};

const getTimeString = (time: number) => {
  const hours = Math.floor(time);
  const minutes = Math.floor(60 * (time % 1))
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const Modal = ({
  title,
  description,
  speakers,
  schedule,
  children,
}: ModalProps) => {
  const [showModal, setShowModal] = React.useState(false);
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <>
      <div className="cursor-pointer" onClick={() => setShowModal(true)}>
        {children}
      </div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 bg-[color-mix(in_srgb,_var(--primary)_65%,_transparent)]"></div>
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
            <div className="grid h-full w-fit grid-cols-3 bg-transparent p-8 focus:outline-none">
              <div></div>
              <div
                className="card elevate z-10 flex h-full flex-col items-start justify-center rounded-3xl border-0 px-3 pb-10 pt-3 shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className='mb-[-7.5rem] h-[300px] w-full rounded-[1.5rem] bg-[url("/kolona.jpg")] bg-cover bg-center' />
                <div className="flex w-full flex-col items-center justify-center">
                  <div className="elevate h-60 w-60 overflow-hidden rounded-full bg-white">
                    <div className='h-full w-full bg-[url("/promoted/coffee_culture.jpg")] bg-cover bg-center bg-no-repeat'></div>
                  </div>
                  <h5 className="mx-20 my-10 text-center text-4xl font-medium">
                    {title}
                  </h5>
                </div>
                {speakers && (
                  <div className="px-20 py-4 font-normal">
                    <h6 className="text-xl">{speakers.join(", ")}</h6>
                  </div>
                )}
                <div className="flex-grow px-20 py-10 font-normal">
                  <p className="text-xl">{description}</p>
                </div>
                <div className="flex w-full items-center justify-center gap-4">
                  <a
                    href={lang.contacts.facebook}
                    title="Facebook"
                    rel="external"
                  >
                    <FacebookIcon />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a
                    href={lang.contacts.instagram}
                    title="Instagram"
                    rel="external"
                  >
                    <InstagramIcon />
                    <span className="sr-only">Instagram</span>
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start pt-20">
                <div className="card elevate flex flex-col gap-8 rounded-e-2xl p-12 font-normal">
                  {schedule.map((item, idx) => (
                    <div
                      className="flex flex-col items-center justify-center text-center"
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
                        {getTimeString(item.start)} - {getTimeString(item.end)}
                      </h6>
                      <h6 className="text-xl">{item.day}</h6>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
