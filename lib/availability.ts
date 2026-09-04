import {
  bookingRules,
  weeklyBookingHours,
} from "@/data/booking-rules";
import type { Weekday } from "@/data/booking-rules";

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