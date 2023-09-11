import dictionaries, { SupportedLanguages } from "@/app/dictionaries/all";
import { useParams } from "next/navigation";
import React from "react";

type ModalProps = { title: string, description: string, speakers: string[]}

export const Modal = ({title, description, speakers} : ModalProps) => {
  const [showModal, setShowModal] = React.useState(false);
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  return (
    <>
      <div className="w-full text-right my-3">
        <button
          className="inline-block rounded-xl border border-current px-2 py-1 text-lg hover:opacity-80"
          type="button"
          onClick={() => setShowModal(true)}
        >
          {lang.learnMore}
        </button>
      </div>
      {showModal ? (
        <>
          <div
            className="fixed inset-0 z-50 flex animate-[slideUp_200ms] items-end overflow-y-auto overflow-x-hidden text-left outline-none focus:outline-none md:animate-[fadeIn_200ms] md:items-center md:justify-center"
            onClick={() => setShowModal(false)}
          >
            <div className="relative mx-auto w-auto max-w-4xl md:my-6">
              <div
                className="modal relative flex w-full flex-col rounded-sm border-0 shadow-lg outline-none focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="relative flex flex-col items-start justify-between gap-4 rounded-t px-8 pb-10 pt-4 md:px-24 md:pt-0">
                  <button
                    className="order-0 absolute right-4 top-0 bg-transparent text-7xl leading-none transition-opacity duration-200 hover:opacity-50"
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                  <h5 className="mt-10 text-4xl font-medium">{title}</h5>
                  <h6 className="text-3xl">{speakers.join(", ")}</h6>
                </div>
                <div className="relative flex-auto px-8 py-10 md:px-24">
                  <p className="my-4 text-xl md:text-2xl">{description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-10"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
