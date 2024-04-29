import { deepmerge } from "deepmerge-ts";
import cz from "./cz.json";
import en from "./en.json";
import shared from "./shared.json";
import czExhibitorsContent from "@/app/dictionaries/colab/exhibitors/content_cz.md";
import czExhibitorsCard from "@/app/dictionaries/colab/exhibitors/card_cz.md";
import czSponsorsContent from "@/app/dictionaries/colab/sponsors/content_cz.md";
import enExhibitorsContent from "@/app/dictionaries/colab/exhibitors/content_en.md";
import enExhibitorsCard from "@/app/dictionaries/colab/exhibitors/card_en.md";
import enSponsorsContent from "@/app/dictionaries/colab/sponsors/content_en.md";

cz.exhibitors.content = czExhibitorsContent
cz.exhibitors.card = czExhibitorsCard
cz.sponsors.content = czSponsorsContent
en.exhibitors.content = enExhibitorsContent
en.exhibitors.card = enExhibitorsCard
en.sponsors.content = enSponsorsContent

export const dictionaries = {
  cz: deepmerge(shared, cz),
  en: deepmerge(shared, en),
};

export type SupportedLanguages = "cz" | "en";

export default dictionaries;
