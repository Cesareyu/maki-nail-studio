const MILLISECONDS_PER_DAY =
  24 * 60 * 60 * 1000;

export function isoDateToDayNumber(
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

export type LocalDateTimeParts = {
  date: string;
  time: string;
};

export function getLocalDateTimeParts(
  instant: Date,
  timeZone: string,
): LocalDateTimeParts {
  if (Number.isNaN(instant.getTime())) {
    throw new Error("Invalid date instant");
  }

  const formatter = new Intl.DateTimeFormat(
    "en-CA",
    {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    },
  );

  const parts = formatter.formatToParts(
    instant,
  );

  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)
      ?.value;

  const year = getPart("year");
  const month = getPart("month");
  const day = getPart("day");
  const hour = getPart("hour");
  const minute = getPart("minute");

  if (
    !year ||
    !month ||
    !day ||
    !hour ||
    !minute
  ) {
    throw new Error(
      "Unable to format local date and time",
    );
  }

  return {
    date: `${year}-${month}-${day}`,
    time: `${hour}:${minute}`,
  };
}

