import dictionaries, { SupportedLanguages } from "@/app/dictionaries/all";
import { useParams } from "next/navigation";
import React from "react";

type ModalProps = { title: string; description: string; speakers?: string[], children: React.ReactNode };

export const Modal = ({ title, description, speakers, children }: ModalProps) => {
  const [showModal, setShowModal] = React.useState(false);
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <>
      <div
        className="cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        {children}
      </div>
      {showModal ? (
        <>
        <div className="fixed inset-0 z-10 bg-[color-mix(in_srgb,_var(--primary)_65%,_transparent)]"></div>
          <div
            className="fixed inset-0 z-20 flex animate-[slideUp_200ms] items-end overflow-y-auto overflow-x-hidden text-left outline-none focus:outline-none md:animate-[fadeIn_200ms] md:items-center md:justify-center"
            onClick={() => setShowModal(false)}
          >
            <button
              className="absolute right-4 top-4 text-3xl rounded-full w-[40px] h-[40px] bg-[var(--black)] leading-1"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <div className="m-auto md:my-6 px-20">
              <div
                className="modal flex h-[64rem] w-[52rem] flex-col rounded-3xl border-0 shadow-lg outline-none focus:outline-none elevate"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="flex flex-col items-start justify-between gap-4 px-3 pb-10 pt-3">
                  <div className='bg-[url("/kolona.jpg")] bg-cover bg-center w-full h-[300px] rounded-[1.5rem] mb-[-120px]' />
                  <div className="flex flex-col w-full justify-center items-center">
                    <div className='rounded-full h-60 w-60 bg-white elevate p-8'>
                      <div className='bg-[url("/promoted/ig.png")] bg-contain bg-center bg-no-repeat h-full w-full'></div>
                    </div>
                    <h5 className="mt-10 text-4xl font-medium">{title}</h5>
                  </div>
                  {speakers && <h6 className="text-3xl">{speakers.join(", ")}</h6>}
                  <div className="flex-auto px-20 py-10 font-normal">
                    <p className="md:text-xl">{description}</p>
                  </div>
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
