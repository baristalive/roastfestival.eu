import React, { useContext } from "react";
import { FilterDays, FilterTracks } from "../contexts";
import { useParams } from "next/navigation";
import dictionaries, { SupportedLanguages } from "@/app/dictionaries/all";
import { AllTracks } from "../consts";
import { StationIcon } from "../../components/StationIcon";

const Dropdown = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const activeTracks = useContext(FilterTracks);
  const activeDays = useContext(FilterDays);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex h-full items-stretch justify-center">
        <div className="dropdown relative inline-block text-left">
          <span className="">
            <button
              className="focus:shadow-outline-blue elevate-inset inline-flex h-full w-full items-center justify-center gap-3 rounded-full border border-[var(--white)] px-4 py-2 transition duration-150 ease-in-out hover:border-[var(--primary)] focus:border-[var(--primary)] focus:outline-none active:bg-gray-50 active:text-gray-800"
              type="button"
              aria-haspopup="true"
              aria-expanded="true"
              aria-controls="headlessui-menu-items-117"
            >
              <div className="text-lg">Filter</div>
              {activeDays.map((d) => (
                <div
                  key={d}
                  className="rounded-md bg-[var(--accent)] px-2 py-2 text-[var(--white)]"
                >
                  {lang.programDays[d as keyof typeof lang.programDays].shortName}
                </div>
              ))}
              {activeTracks.map((t) => (
                <div
                  key={t}
                  className="rounded-md bg-[var(--primary)] px-2 py-1 text-[var(--white)]"
                >
                  <StationIcon station={t} />
                </div>
              ))}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </span>
          <div className="dropdown-menu z-[1000] hidden">
            <div
              className="divide-red border-red absolute right-0 mt-4 w-56 origin-top-right divide-y-2 card elevate rounded-xl outline-none"
              aria-labelledby="headlessui-menu-button-1"
              id="headlessui-menu-items-117"
              role="menu"
            >
              <ul className="p-2">
                <p className="p-2 text-lg">Day</p>
                {lang.program.map((day, idx) => (
                  <li className="p-2 hover:font-bold cursor-pointer" key={day.$ref}>
                    <div className="z-10 ml-8 flex items-center gap-2 text-base">
                      <div className="w-[4em] rounded-full border border-[var(--black)] px-2 py-1 text-center">
                        {
                          lang.programDays[
                            day.$ref as keyof typeof lang.programDays
                          ].date
                        }
                      </div>
                      <p>
                        {
                          lang.programDays[
                            day.$ref as keyof typeof lang.programDays
                          ].name
                        }
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <ul className="p-2">
                <p className="p-2 text-lg">Track</p>
                {AllTracks.map((track, idx) => (
                  <li className="p-2 hover:font-bold cursor-pointer" key={track}>
                    <div className="z-10 ml-8 flex items-center gap-2 text-base">
                      <StationIcon station={track} />
                      {
                        lang.programCategory[
                          track as keyof typeof lang.programCategory
                        ]
                      }
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
