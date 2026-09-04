const MILLISECONDS_PER_DAY =
  24 * 60 * 60 * 1000;

function isoDateToDayNumber(
  isoDate: string,
): number {
  const datePattern =
    /^(\d{4})-(\d{2})-(\d{2})$/;

  const match = isoDate.match(datePattern);

  if (!match) {
    throw new Error(
      `Invalid ISO date: ${isoDate}`,
    );
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const timestamp = Date.UTC(
    year,
    month - 1,
    day,
  );

  const parsedDate = new Date(timestamp);

  const isValidCalendarDate =
    parsedDate.getUTCFullYear() === year &&
    parsedDate.getUTCMonth() === month - 1 &&
    parsedDate.getUTCDate() === day;

  if (!isValidCalendarDate) {
    throw new Error(
      `Invalid ISO date: ${isoDate}`,
    );
  }

  return Math.floor(
    timestamp / MILLISECONDS_PER_DAY,
  );
}

export function isDateWithinBookingWindow(
  selectedDate: string,
  todayDate: string,
  maximumAdvanceDays: number,
): boolean {
  if (
    !Number.isInteger(maximumAdvanceDays) ||
    maximumAdvanceDays < 0
  ) {
    throw new Error(
      "Maximum advance days must be a non-negative integer",
    );
  }

  const selectedDayNumber =
    isoDateToDayNumber(selectedDate);

  const todayDayNumber =
    isoDateToDayNumber(todayDate);

  const daysFromToday =
    selectedDayNumber - todayDayNumber;

  return (
    daysFromToday >= 0 &&
    daysFromToday <= maximumAdvanceDays
  );
}