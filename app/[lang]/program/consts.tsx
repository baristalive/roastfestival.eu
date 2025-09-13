export enum Track {
  Espresso = "espresso",
  Filter = "brew",
  Workshop = "workshop",
  Lecture = "lecture",
  Party = "party",
  Honor = "espresso_milk",
}

export enum Days {
  Saturday = "day1",
  Sunday = "day2",
}


export const AllDays = [Days.Saturday, Days.Sunday]
export const AllTracks = [Track.Honor, Track.Espresso, Track.Filter, Track.Lecture, Track.Workshop, Track.Party]
