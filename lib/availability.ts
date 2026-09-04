import {
  bookingRules,
  weeklyBookingHours,
} from "@/data/booking-rules";

import type {
  BookingStartWindow,
  Weekday,
} from "@/data/booking-rules";

import {
  getLocalDateTimeParts,
  getWeekdayFromIsoDate,
  isoDateToDayNumber,
  isDateWithinBookingWindow,
} from "@/lib/booking-dates";

export function timeStringToMinutes(
  time: string,
): number {
  const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
  const match = time.match(timePattern);

  if (!match) {
    throw new Error(
      `Invalid time format: ${time}`,
    );
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  return hours * 60 + minutes;
}

function minutesToTimeString(
  totalMinutes: number,
): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(
    minutes,
  ).padStart(2, "0")}`;
}

export function generateCandidateStartTimes(
  firstStartTime: string,
  lastStartTime: string,
  intervalMinutes: number,
): string[] {
  if (
    !Number.isInteger(intervalMinutes) ||
    intervalMinutes <= 0
  ) {
    throw new Error(
      "Interval must be a positive integer",
    );
  }

  const firstStartMinutes =
    timeStringToMinutes(firstStartTime);

  const lastStartMinutes =
    timeStringToMinutes(lastStartTime);

  if (firstStartMinutes > lastStartMinutes) {
    throw new Error(
      "First start time must not be after last start time",
    );
  }

  const candidateStartTimes: string[] = [];

  for (
    let currentMinutes = firstStartMinutes;
    currentMinutes <= lastStartMinutes;
    currentMinutes += intervalMinutes
  ) {
    candidateStartTimes.push(
      minutesToTimeString(currentMinutes),
    );
  }

  return candidateStartTimes;
}

export function getDefaultStartTimesForWeekday(
  weekday: Weekday,
): string[] {
  const bookingHours =
    weeklyBookingHours[weekday];

  if (!bookingHours.isNormallyOpen) {
    return [];
  }

  if (
    bookingHours.firstStartTime === null ||
    bookingHours.lastStartTime === null
  ) {
    throw new Error(
      `Open day is missing booking hours: ${weekday}`,
    );
  }

  return generateCandidateStartTimes(
    bookingHours.firstStartTime,
    bookingHours.lastStartTime,
    bookingRules.slotIntervalMinutes,
  );
}

export type TimeInterval = {
  startMinutes: number;
  endMinutes: number;
};

export function doTimeIntervalsOverlap(
  first: TimeInterval,
  second: TimeInterval,
): boolean {
  if (
    first.startMinutes >= first.endMinutes ||
    second.startMinutes >= second.endMinutes
  ) {
    throw new Error(
      "Time interval start must be before end",
    );
  }

  return (
    first.startMinutes < second.endMinutes &&
    second.startMinutes < first.endMinutes
  );
}

export function filterAvailableStartTimes(
  candidateStartTimes: string[],
  bookingDurationMinutes: number,
  unavailableIntervals: TimeInterval[],
  bufferMinutes: number,
): string[] {
  if (
    !Number.isInteger(bookingDurationMinutes) ||
    bookingDurationMinutes <= 0
  ) {
    throw new Error(
      "Booking duration must be a positive integer",
    );
  }

  if (
    !Number.isInteger(bufferMinutes) ||
    bufferMinutes < 0
  ) {
    throw new Error(
      "Buffer must be a non-negative integer",
    );
  }

  return candidateStartTimes.filter(
    (candidateStartTime) => {
      const candidateStartMinutes =
        timeStringToMinutes(
          candidateStartTime,
        );

      const candidateInterval: TimeInterval = {
        startMinutes: candidateStartMinutes,
        endMinutes:
          candidateStartMinutes +
          bookingDurationMinutes +
          bufferMinutes,
      };

      const conflictsWithUnavailableTime =
        unavailableIntervals.some(
          (unavailableInterval) => {
            const unavailableIntervalWithBuffer: TimeInterval =
              {
                startMinutes:
                  unavailableInterval.startMinutes,
                endMinutes:
                  unavailableInterval.endMinutes +
                  bufferMinutes,
              };

            return doTimeIntervalsOverlap(
              candidateInterval,
              unavailableIntervalWithBuffer,
            );
          },
        );

      return !conflictsWithUnavailableTime;
    },
  );
}

export function getStartTimesWithManualOpenings(
  weekday: Weekday,
  manualOpenings: BookingStartWindow[],
): string[] {
  const defaultStartTimes =
    getDefaultStartTimesForWeekday(weekday);

  const manuallyOpenedStartTimes =
    manualOpenings.flatMap((opening) =>
      generateCandidateStartTimes(
        opening.firstStartTime,
        opening.lastStartTime,
        bookingRules.slotIntervalMinutes,
      ),
    );

  return [
    ...new Set([
      ...defaultStartTimes,
      ...manuallyOpenedStartTimes,
    ]),
  ].sort(
    (first, second) =>
      timeStringToMinutes(first) -
      timeStringToMinutes(second),
  );
}

export function filterStartTimesByLeadTime(
  selectedDate: string,
  candidateStartTimes: string[],
  currentInstant: Date,
  timeZone: string,
  minimumLeadTimeMinutes: number,
): string[] {
  if (
    !Number.isInteger(minimumLeadTimeMinutes) ||
    minimumLeadTimeMinutes < 0
  ) {
    throw new Error(
      "Minimum lead time must be a non-negative integer",
    );
  }

  const localNow = getLocalDateTimeParts(
    currentInstant,
    timeZone,
  );

  const currentLocalMinuteNumber =
    isoDateToDayNumber(localNow.date) *
      24 *
      60 +
    timeStringToMinutes(localNow.time);

  const selectedDayMinuteNumber =
    isoDateToDayNumber(selectedDate) *
    24 *
    60;

  return candidateStartTimes.filter(
    (startTime) => {
      const appointmentMinuteNumber =
        selectedDayMinuteNumber +
        timeStringToMinutes(startTime);

      const minutesUntilAppointment =
        appointmentMinuteNumber -
        currentLocalMinuteNumber;

      return (
        minutesUntilAppointment >=
        minimumLeadTimeMinutes
      );
    },
  );
}

export type CalculateAvailableStartTimesInput = {
  selectedDate: string;
  bookingDurationMinutes: number;
  currentInstant: Date;
  manualOpenings: BookingStartWindow[];
  unavailableIntervals: TimeInterval[];
};

export function calculateAvailableStartTimes({
  selectedDate,
  bookingDurationMinutes,
  currentInstant,
  manualOpenings,
  unavailableIntervals,
}: CalculateAvailableStartTimesInput): string[] {
  const localNow = getLocalDateTimeParts(
    currentInstant,
    bookingRules.timeZone,
  );

  const isWithinBookingWindow =
    isDateWithinBookingWindow(
      selectedDate,
      localNow.date,
      bookingRules.maximumAdvanceDays,
    );

  if (!isWithinBookingWindow) {
    return [];
  }

  const weekday =
    getWeekdayFromIsoDate(selectedDate);

  const candidateStartTimes =
    getStartTimesWithManualOpenings(
      weekday,
      manualOpenings,
    );

  const startTimesAfterLeadTime =
    filterStartTimesByLeadTime(
      selectedDate,
      candidateStartTimes,
      currentInstant,
      bookingRules.timeZone,
      bookingRules.minimumLeadTimeMinutes,
    );

  return filterAvailableStartTimes(
    startTimesAfterLeadTime,
    bookingDurationMinutes,
    unavailableIntervals,
    bookingRules.bufferMinutes,
  );
}