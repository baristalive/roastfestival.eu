import { deepmerge } from "deepmerge-ts";
import cz from "./cz.json";
import en from "./en.json";
import shared from "./shared.json";
import czContent from "@/app/dictionaries/colab/exhibitors/content_cz.md";
import czCard from "@/app/dictionaries/colab/exhibitors/card_cz.md";

cz.exhibitors.content = czContent
cz.exhibitors.card = czCard

export const dictionaries = {
  cz: deepmerge(shared, cz),
  en: deepmerge(shared, en),
};

export type SupportedLanguages = "cz" | "en";

export default dictionaries;
