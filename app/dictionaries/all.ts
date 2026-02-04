import { deepmerge } from "deepmerge-ts";
import cz from "./cz.json";
import en from "./en.json";
import shared from "./shared.json";

type ProgramItem = {
  start: string;
  end: string;
  track: keyof typeof dictionaries.en.programCategory;
  day: string;
};

type RawProgramItem = {
  start: string;
  end: string;
  $ref: string;
  day: string;
  noEnd: boolean;
};
export enum Track {
  Espresso = "espresso",
  Filter = "brew",
  Workshop = "workshop",
  Lecture = "lecture",
  Party = "party",
  Honor = "espresso_milk",
}

export enum Day {
  Saturday = "day1",
  Sunday = "day2",
}

export const AllDays = [Day.Saturday, Day.Sunday];
export const AllTracks = [
  Track.Honor,
  Track.Espresso,
  Track.Filter,
  Track.Lecture,
  Track.Workshop,
  Track.Party,
];

export type RawProgramDay = {
  $ref: Day;
  schedule: {
    track: Track;
    schedule: RawProgramItem[][];
  }[];
};
export type SupportedLanguages = "cz" | "en";

export type Presenter = {
  web?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
  twitter?: string;
  name: string;
  logo: string;
  bio?: string;
  primaryLink: "web" | "instagram" | "facebook";
  subheading?: string;
  annotation?: string | string[];
  schedule: ProgramItem[];
  cover?: string;
  lang?: "en";
  country?: "cz" | "sk" | "at" | "pl";
  modalProps?: {
    showName?: boolean;
    className?: string;
    showSubheading?: boolean;
  };
  actionIcons?: {
    [key: string]: {
      href?: string;
      text: string;
    };
  };
};

type Presenters = { [key: string]: Presenter };
type PartialPresenters = { [key: string]: Partial<Presenter> };

const preprocessShared = (data: typeof shared) => {
  const presenters = Object.fromEntries(
    Object.entries(data.presenters).map(([id, presenter]) => {
      const schedule = (data.program as RawProgramDay[]).reduce(
        (accDay, day) => {
          const fromDay = day.schedule.reduce((accTrack, track) => {
            const fromTrack = track.schedule.reduce((accTrack, row) => {
              const fromRow = row.reduce((accRow, slot) => {
                if (slot.$ref === id) {
                  accRow.push({
                    day: day.$ref,
                    end: slot.end,
                    start: slot.start,
                    track: track.track as keyof typeof shared.programCategory,
                  });
                }
                return accRow;
              }, [] as ProgramItem[]);
              return [...accTrack, ...fromRow];
            }, [] as ProgramItem[]);
            return [...accTrack, ...fromTrack];
          }, [] as ProgramItem[]);
          return [...accDay, ...fromDay];
        },
        [] as ProgramItem[],
      );
      return [id, { ...presenter, schedule }];
    }),
  ) as Presenters;

  return { ...data, presenters, program: data.program as RawProgramDay[] };
};

type Tickets = {
  title: string;
  subtitle: string;
  nowOnSale: string;
  priceIncreases: string;
  discounted: string;
  timeLeft: string;
  soonAvailable: string;
  comingSoon: string;
  soldOut: string;
  missedOut: string;
  lastDay: string;
  alreadyAvailable: string;
  priceList: {
    availability: {
      start?: string;
      end?: string;
    };
    heading: string;
    price: number;
    tiers: string[];
  }[];
};

const preprocessLocalized = (data: typeof cz | typeof en) => {
  return {
    ...data,
    presenters: data.presenters as PartialPresenters,
    tickets: data.tickets as Tickets,
  };
};

export const dictionaries = {
  cz: deepmerge(preprocessShared(shared), preprocessLocalized(cz)),
  en: deepmerge(preprocessShared(shared), preprocessLocalized(en)),
};

export default dictionaries;
