import { AllDays, AllTracks, Day, Track } from "@/app/dictionaries/all";
import { createContext } from "react";

export const FilterTracks = createContext({selectedTracks: AllTracks, toggleSelectedTracks: (value: Track) => {}})

export const FilterDays = createContext({selectedDays: AllDays, toggleSelectedDays: (value: Day) => {}})

export type ScheduleViewType = "schedule" | "list" | "responsive" | "loading"

export const ScheduleView = createContext({view: "responsive" as ScheduleViewType, setView: () => {}})
