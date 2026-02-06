import React, { useContext } from "react";
import { FilterDays, FilterTracks } from "../contexts";
import { useParams } from "next/navigation";
import dictionaries, {
  AllDays,
  AllTracks,
  SupportedLanguages,
} from "@/app/dictionaries/all";
import { StationIcon } from "@/app/components/StationIcon";

const Dropdown = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const { selectedTracks, toggleSelectedTracks } = useContext(FilterTracks);
  const { selectedDays, toggleSelectedDays } = useContext(FilterDays);

  return (
    <div className="flex w-full flex-col justify-center">
      <div className="flex h-full items-stretch justify-center">
        <div className="dropdown relative inline-block text-left" tabIndex={0}>
          <span className="">
            <button
              className="elevate-inset focus:border-primary hover:border-primary inline-flex h-full w-full items-center justify-center gap-3 rounded-full border border-white px-4 py-2 transition duration-150 ease-in-out"
              type="button"
              aria-haspopup="true"
              aria-expanded="true"
              aria-controls="dropdown-filter"
            >
              <div className="text-lg">{lang.programTile.filter}</div>
              <div className="hidden gap-3 lg:flex">
                {AllDays.filter((d) => selectedDays.includes(d)).map((d) => (
                  <div
                    key={d}
                    className="bg-accent rounded-md px-2 py-2 text-white"
                  >
                    {
                      lang.programDays[d as keyof typeof lang.programDays]
                        .shortName
                    }
                  </div>
                ))}
                {AllTracks.filter((t) => selectedTracks.includes(t)).map(
                  (t) => (
                    <div
                      key={t}
                      className="bg-primary rounded-md px-2 py-1 text-white"
                    >
                      <StationIcon station={t} />
                    </div>
                  ),
                )}
              </div>
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
          <div className="dropdown-menu z-1000 hidden">
            <div
              className="card elevate absolute left-1/2 mt-4 flex origin-top-right -translate-x-1/2 rounded-xl outline-none"
              id="dropdown-filter"
              role="menu"
            >
              <ul className="p-2">
                <p className="p-2 text-lg">{lang.filterCategories.day}</p>
                {lang.program.map((day) => (
                  <li
                    className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-nowrap hover:text-white"
                    key={day.$ref}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSelectedDays(day.$ref);
                    }}
                  >
                    <input
                      type="checkbox"
                      id={`filter_${day.$ref}`}
                      className="peer border-accent checked:bg-accent relative h-6 w-6 shrink-0 appearance-none rounded-sm border-2"
                      checked={selectedDays.includes(day.$ref)}
                      readOnly
                    />
                    <label
                      htmlFor={`filter_${day.$ref}`}
                      className="inline-flex cursor-pointer items-center gap-2 text-base"
                    >
                      <p>
                        {
                          lang.programDays[
                            day.$ref as keyof typeof lang.programDays
                          ].name
                        }
                      </p>
                    </label>
                    <svg
                      className="absolute hidden h-6 w-6 text-white peer-checked:block"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </li>
                ))}
              </ul>
              <ul className="p-2">
                <p className="p-2 text-lg">{lang.filterCategories.track}</p>
                {AllTracks.map((track) => (
                  <li
                    className="hover:bg-primary flex cursor-pointer items-center gap-2 rounded-md px-4 py-1 text-nowrap hover:text-white"
                    key={track}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSelectedTracks(track);
                    }}
                  >
                    <input
                      type="checkbox"
                      id={`filter_${track}`}
                      className="peer border-primary checked:bg-primary relative h-6 w-6 shrink-0 appearance-none rounded-sm border-2"
                      checked={selectedTracks.includes(track)}
                      readOnly
                    />
                    <label
                      htmlFor={`filter_${track}`}
                      className="inline-flex cursor-pointer items-center gap-2 text-base"
                    >
                      <StationIcon station={track} />
                      {
                        lang.programCategory[
                          track as keyof typeof lang.programCategory
                        ]
                      }
                    </label>
                    <svg
                      className="absolute hidden h-6 w-6 text-white peer-checked:block"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
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
