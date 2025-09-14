import { AllDays, AllTracks, Day, Track } from "@/app/dictionaries/all";
import { createContext } from "react";

export const FilterTracks = createContext({selectedTracks: AllTracks, setSelectedTracks: (value: Track[]) => {}})

export const FilterDays = createContext({selectedDays: AllDays, setSelectedDays: (value: Day[]) => {}})

export type ScheduleViewType = "schedule" | "list" | "responsive"

export const ScheduleView = createContext({view: "responsive" as ScheduleViewType, setView: (value: ScheduleViewType) => {}})
