import { useEffect, useRef } from "react";

import Filter from "@/app/icons/filter";

type ProgramHelpCopy = {
  close: string;
  filterText: string;
  filterTitle: string;
  title: string;
  viewText: string;
  viewTitle: string;
};

export const ProgramHelp = ({
  copy,
  onClose,
}: {
  copy: ProgramHelpCopy;
  onClose: () => void;
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="punk-border pop-shadow relative max-h-full w-full max-w-2xl animate-[pop_300ms_ease-out] overflow-y-auto bg-white p-6 md:p-8"
        role="dialog"
        aria-labelledby="program-help-title"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="bg-accent font-display absolute top-3 right-3 flex h-10 w-10 items-center justify-center text-2xl font-black text-black transition-all hover:-rotate-12 hover:bg-black hover:text-white"
          onClick={onClose}
          aria-label={copy.close}
        >
          ×
        </button>

        <h2
          id="program-help-title"
          className="font-display pr-12 text-3xl leading-none font-black text-black uppercase md:text-5xl"
        >
          {copy.title}
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="bg-secondary/30 border-4 border-black p-4">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-black text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 14"
                  className="h-5 w-6 fill-current"
                  aria-hidden="true"
                >
                  <rect x="0" y="0" width="4" height="2" rx="1" />
                  <rect x="6" y="0" width="14" height="2" rx="1" />
                  <rect x="0" y="4" width="4" height="2" rx="1" />
                  <rect x="6" y="4" width="14" height="2" rx="1" />
                  <rect x="0" y="8" width="4" height="2" rx="1" />
                  <rect x="6" y="8" width="14" height="2" rx="1" />
                  <rect x="0" y="12" width="4" height="2" rx="1" />
                  <rect x="6" y="12" width="14" height="2" rx="1" />
                </svg>
              </span>
              <h3 className="font-display text-lg font-black text-black uppercase">
                {copy.viewTitle}
              </h3>
            </div>
            <p className="text-base leading-relaxed text-black">
              {copy.viewText}
            </p>
          </div>

          <div className="bg-accent/30 border-4 border-black p-4">
            <div className="mb-3 flex items-center gap-3">
              <span className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center p-2 text-white">
                <Filter />
              </span>
              <h3 className="font-display text-lg font-black text-black uppercase">
                {copy.filterTitle}
              </h3>
            </div>
            <p className="text-base leading-relaxed text-black">
              {copy.filterText}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="font-display bg-primary mt-6 w-full px-6 py-3 text-lg font-black text-white uppercase transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-black)]"
          onClick={onClose}
        >
          {copy.close}
        </button>
      </div>
    </div>
  );
};
