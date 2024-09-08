
export const getTimeString = (time: number) => {
  const hours = Math.floor(time);
  const minutes = Math.floor(60 * (time % 1))
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}`;
};
