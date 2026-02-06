export enum Availability {
  AvailableNow,
  SoldOut,
  Soon,
  Available,
}

type DateType = "start" | "end";

export type AvailabilityRange = {
  start?: string;
  end?: string;
};

export const toDate = (date: string, type: DateType) => {
  const d = new Date(date);
  if (type === "start") {
    d.setHours(0, 0, 0);
  } else d.setHours(23, 59, 59);
  return d;
};

export const getAvailability = (availability: AvailabilityRange = {}) => {
  const today = new Date();

  // Only `start` is defined
  if (availability.start !== undefined && availability.end === undefined) {
    const start = toDate(availability.start, "start");
    if (start < today) return Availability.AvailableNow;
    return Availability.Soon;
  }

  // Only `end` is defined
  if (availability.start === undefined && availability.end !== undefined) {
    const end = toDate(availability.end, "end");
    if (today <= end) return Availability.AvailableNow;
    return Availability.SoldOut;
  }

  // Both `start` and `end` are defined
  if (availability.start !== undefined && availability.end !== undefined) {
    const start = toDate(availability.start, "start");
    const end = toDate(availability.end, "end");
    if (start < today) {
      if (today <= end) return Availability.AvailableNow;
      return Availability.SoldOut;
    }
    return Availability.Soon;
  }

  // Neither is defined
  return Availability.Available;
};

export const toLocaleDateString = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}`;
};
