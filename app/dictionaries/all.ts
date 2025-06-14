import { deepmerge } from "deepmerge-ts";
import cz from "./cz.json";
import en from "./en.json";
import shared from "./shared.json";

type ProgramItem = {
  start: number;
  end: number;
  track: keyof typeof dictionaries.en.programCategory;
  day: string;
};

type RawProgramItem = {
  start: number;
  end: number;
  $ref: string;
  day: string;
  noEnd: boolean;
}
type RawProgramDay = {
  $ref: string;
  schedule: {
    track: string;
    schedule: RawProgramItem[][];
  }[]
}
export type SupportedLanguages = "cz" | "en";
export const DayIds = ["day1", "day2"] as const;
export type DayIdsType = typeof DayIds[number]

export type Presenter = {
  web?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
  twitter?: string;
  name: string;
  logo: string;
  primaryLink: "web" | "instagram" | "facebook";
  subheading?: string;
  annotation?: string | string[];
  schedule: ProgramItem[];
  cover?: string;
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

type Presenters = {[key: string]: Presenter}
type PartialPresenters = {[key: string]: Partial<Presenter>}

const preprocessShared = (data: typeof shared) => {
  const presenters = Object.fromEntries(
    Object.entries(data.presenters).map(([id, presenter]) => {
      const schedule = (data.program as RawProgramDay[]).reduce((accDay, day) => {
        const fromDay = day.schedule.reduce((accTrack, track) => {
          const fromTrack = track.schedule.reduce((accTrack, row) => {
            const fromRow = row.reduce((accRow, slot) => {
              if (slot.$ref === id) {
                accRow.push({
                  start: slot.start,
                  end: slot.end,
                  track: track.track as keyof typeof shared.programCategory,
                  day: day.$ref,
                });
              }
              return accRow;
            }, [] as ProgramItem[]);
            return [...accTrack, ...fromRow];
          }, [] as ProgramItem[]);
          return [...accTrack, ...fromTrack];
        }, [] as ProgramItem[]);
        return [...accDay, ...fromDay];
      }, [] as ProgramItem[]);
      return [id, { ...presenter, schedule }];
    }),
  ) as Presenters;

  return { ...data, presenters, program: data.program as RawProgramDay[] };
};

type Tickets = {
  title: string;
  discounted: string;
  timeLeft: string;
  soonAvailable: string;
  soldOut: string;
  lastDay: string;
  alreadyAvailable: string;
  priceList: {
    availability: {
      start?: string;
      end?: string;
    };
    subheading: string;
    heading: (string | {superscript: string})[];
    prices: {
      title: string;
      full: number;
      discounted?: number;
      highlight?: boolean;
      note?: string;
      overlay?: {
        title: string;
        full: number;
        discounted?: number;
        addon?: string;
        availability: {
          start?: string;
          end?: string;
        };
      };
    }[]
  }[]
}

const preprocessLocalized = (data: typeof cz | typeof en) => {
  return {...data, tickets: data.tickets as Tickets, presenters: data.presenters as PartialPresenters}
}

export const dictionaries = {
  cz: deepmerge(preprocessShared(shared), preprocessLocalized(cz)),
  en: deepmerge(preprocessShared(shared), preprocessLocalized(en)),
};


export default dictionaries;
