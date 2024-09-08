import { deepmerge } from "deepmerge-ts";
import cz from "./cz.json";
import en from "./en.json";
import shared from "./shared.json";

export const dictionaries = {
  cz: deepmerge(shared, cz),
  en: deepmerge(shared, en),
};

export type SupportedLanguages = "cz" | "en";

export type Presenter = {
  web?: string;
  instagram?: string;
  facebook?: string;
  name: string;
  logo: string;
  primaryLink: "web" | "instagram" | "facebook";
};

export default dictionaries;
