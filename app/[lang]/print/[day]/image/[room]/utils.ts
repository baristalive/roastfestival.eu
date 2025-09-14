import dictionaries from "@/app/dictionaries/all";

export type RoomCategory = "kaple" | "stolarna";
export const getRoomCategory = (room: RoomCategory): (keyof typeof dictionaries.en.programCategory) => {
  switch (room) {
    case "kaple":
      return "lecture"
    case "stolarna":
      return "workshop"
    default:
      return room
  }
}
