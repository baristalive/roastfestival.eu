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

const preprocess = (data: typeof shared) => {
  const presenters = Object.fromEntries(Object.entries(data.presenters).map(([id, presenter]) => {
    const schedule = data.program.reduce((accDay, day) => {
      const fromDay = day.schedule.reduce((accTrack, track) => {
        const fromTrack = track.schedule.reduce((accTrack, slot) => {
          if (slot.$ref === id) {
            accTrack.push({
              start: slot.start,
              end: slot.end,
              track: track.track as keyof typeof shared.programCategory,
              day: day.$ref
            })
          }
          return accTrack
        }, [] as ProgramItem[])
        return [...accTrack, ...fromTrack]
      }, [] as ProgramItem[])
      return [...accDay, ...fromDay]
    }, [] as ProgramItem[])
    return [id, {...presenter, schedule}]
  }))

  return {...data, presenters}
}

export const dictionaries = {
  cz: deepmerge(preprocess(shared), cz),
  en: deepmerge(preprocess(shared), en),
};

export type SupportedLanguages = "cz" | "en";

export type Presenter = {
  web?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  name: string;
  logo: string;
  primaryLink: "web" | "instagram" | "facebook";
  subheading?: string;
  annotation?: string | string[];
  schedule: ProgramItem[];
  cover?: string;
  country?: "cz" | "sk" | "at" | "pl";
  modalProps?: {
    showName?: boolean,
    className?: string,
    showSubheading?: boolean,
  }
};

export default dictionaries;
