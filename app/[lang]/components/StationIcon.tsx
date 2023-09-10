"use client";
import PortafilterIcon from "@/app/icons/stations/portafilter";
import FiltersIcon from "@/app/icons/stations/filters";
import LectureIcon from "@/app/icons/stations/lecture";
import WorkshopIcon from "@/app/icons/stations/workshop";
import CupIcon from "@/app/icons/stations/cup";

export const StationIcon = ({ station }: { station?: string; }) => {
  switch (station) {
    case "espresso":
      return <PortafilterIcon />;
    case "espresso_milk":
      return <CupIcon />;
    case "brew":
      return <FiltersIcon />;
    case "lecture":
      return <LectureIcon />;
    case "workshop":
      return <WorkshopIcon />;
    default:
      return null;
  }
};
