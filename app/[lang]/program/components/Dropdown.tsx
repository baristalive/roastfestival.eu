import React, { useContext } from "react";
import { FilterDays, FilterTracks } from "../contexts";
import { useParams } from "next/navigation";
import dictionaries, {
  AllDays,
  AllTracks,
  Day,
  SupportedLanguages,
  Track,
} from "@/app/dictionaries/all";
import { StationIcon } from "../../components/StationIcon";

enum FilterKind {
  track,
  day,
}

const Dropdown = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const { selectedTracks, setSelectedTracks } = useContext(FilterTracks);
  const { selectedDays, setSelectedDays } = useContext(FilterDays);

  const changeState = <T,>(item: T, state: T[], setState: (v: T[]) => void) => {
    if (state.includes(item)) {
      setState(state.filter((i) => i !== item));
    } else {
      setState([...state, item]);
    }
  };

  const handleFilterClick = (type: FilterKind, item: string) => {
    if (type === FilterKind.day) {
      changeState(item as Day, selectedDays, setSelectedDays);
    } else {
      changeState(item as Track, selectedTracks, setSelectedTracks);
    }
  };

  return (
    <div className="flex w-full flex-col justify-center">
      <div className="flex h-full items-stretch justify-center">
        <div className="dropdown relative inline-block text-left" tabIndex={0}>
          <span className="">
            <button
              className="elevate-inset inline-flex h-full w-full items-center justify-center gap-3 rounded-full border border-[var(--white)] px-4 py-2 transition duration-150 ease-in-out hover:border-[var(--primary)] focus:border-[var(--primary)]"
              type="button"
              aria-haspopup="true"
              aria-expanded="true"
              aria-controls="dropdown-filter"
            >
              <div className="text-lg">Filter</div>
              <div className="lg:flex gap-3 hidden">
              {AllDays.filter((d) => selectedDays.includes(d)).map((d) => (
                <div
                  key={d}
                  className="rounded-md bg-[var(--accent)] px-2 py-2 text-[var(--white)]"
                >
                  {
                    lang.programDays[d as keyof typeof lang.programDays]
                      .shortName
                  }
                </div>
              ))}
              {AllTracks.filter((t) => selectedTracks.includes(t)).map((t) => (
                <div
                  key={t}
                  className="rounded-md bg-[var(--primary)] px-2 py-1 text-[var(--white)]"
                >
                  <StationIcon station={t} />
                </div>
              ))}
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
          <div className="dropdown-menu z-[1000] hidden">
            <div
              className="card elevate absolute left-1/2 mt-4 flex origin-top-right -translate-x-1/2 rounded-xl outline-none"
              id="dropdown-filter"
              role="menu"
            >
              <ul className="p-2">
                <p className="p-2 text-lg">{lang.filterCategories.day}</p>
                {lang.program.map((day, idx) => (
                  <li
                    className="flex cursor-pointer items-center gap-2 text-nowrap rounded-md px-4 py-2 hover:bg-[var(--accent)] hover:text-[var(--white)]"
                    key={day.$ref}
                    onClick={(e) => {
                      e.preventDefault();
                      handleFilterClick(FilterKind.day, day.$ref);
                    }}
                  >
                    <input
                      type="checkbox"
                      id={`filter_${day.$ref}`}
                      className="peer relative h-6 w-6 shrink-0 appearance-none rounded-sm border-2 border-[var(--accent)] checked:bg-[var(--accent)]"
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
                      className="absolute hidden h-6 w-6 text-[var(--white)] peer-checked:block"
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
                {AllTracks.map((track, idx) => (
                  <li
                    className="flex cursor-pointer items-center gap-2 text-nowrap rounded-md px-4 py-1 hover:bg-[var(--primary)] hover:text-[var(--white)]"
                    key={track}
                    onClick={(e) => {
                      e.preventDefault();
                      handleFilterClick(FilterKind.track, track);
                    }}
                  >
                    <input
                      type="checkbox"
                      id={`filter_${track}`}
                      className="peer relative h-6 w-6 shrink-0 appearance-none rounded-sm border-2 border-[var(--primary)] checked:bg-[var(--primary)]"
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
                      className="absolute hidden h-6 w-6 text-[var(--white)] peer-checked:block"
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
