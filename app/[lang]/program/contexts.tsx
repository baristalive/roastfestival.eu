import { createContext } from "react";
import { AllDays, AllTracks } from "./consts";

export const FilterTracks = createContext(AllTracks)

export const FilterDays = createContext(AllDays)
