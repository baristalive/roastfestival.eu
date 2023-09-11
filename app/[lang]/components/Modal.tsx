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
      <div className="text-right w-full">
        <button
          className="inline-block text-lg italic underline"
          type="button"
          onClick={() => setShowModal(true)}
        >
          {lang.learnMore}
        </button>
      </div>
      {showModal ? (
        <>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div className="relative mx-auto my-6 w-auto max-w-4xl">
              <div
                className="modal relative flex w-full flex-col rounded-sm border-0 shadow-lg outline-none focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="relative flex flex-col items-start justify-between rounded-t gap-4 px-24 pb-10">
                  <button
                    className="order-0 absolute right-4 top-0 bg-transparent text-7xl leading-none transition-opacity duration-200 hover:opacity-50"
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                  <h5 className="mt-10 text-4xl font-medium">{title}</h5>
                  <h6 className="text-3xl">{speakers.join(", ")}</h6>
                </div>
                <div className="relative flex-auto px-24 py-10">
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
