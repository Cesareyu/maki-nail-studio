import { describe, expect, it } from "vitest";

import { bookingRules } from "@/data/booking-rules";

import {
  addDaysToIsoDate,
  getLocalDateTimeParts,
  getWeekdayFromIsoDate,
  isDateWithinBookingWindow,
} from "@/lib/booking-dates";

describe("isDateWithinBookingWindow", () => {
  const todayDate = "2026-09-04";
  const maximumAdvanceDays = 90;

  it("rejects a date before today", () => {
    expect(
      isDateWithinBookingWindow(
        "2026-09-03",
        todayDate,
        maximumAdvanceDays,
      ),
    ).toBe(false);
  });

  it("accepts today", () => {
    expect(
      isDateWithinBookingWindow(
        "2026-09-04",
        todayDate,
        maximumAdvanceDays,
      ),
    ).toBe(true);
  });

  it("accepts the final day of the booking window", () => {
    expect(
      isDateWithinBookingWindow(
        "2026-12-03",
        todayDate,
        maximumAdvanceDays,
      ),
    ).toBe(true);
  });

  it("rejects the day after the booking window", () => {
    expect(
      isDateWithinBookingWindow(
        "2026-12-04",
        todayDate,
        maximumAdvanceDays,
      ),
    ).toBe(false);
  });

  it("accepts a valid leap day", () => {
    expect(
      isDateWithinBookingWindow(
        "2028-02-29",
        "2028-02-28",
        1,
      ),
    ).toBe(true);
  });

  it("rejects an impossible calendar date", () => {
    expect(() =>
      isDateWithinBookingWindow(
        "2026-02-30",
        todayDate,
        maximumAdvanceDays,
      ),
    ).toThrow(
      "Invalid ISO date: 2026-02-30",
    );
  });

  it("rejects a negative maximum booking window", () => {
    expect(() =>
      isDateWithinBookingWindow(
        "2026-09-04",
        todayDate,
        -1,
      ),
    ).toThrow(
      "Maximum advance days must be a non-negative integer",
    );
  });
});

describe("getLocalDateTimeParts", () => {
  it("converts a winter UTC instant to Toronto standard time", () => {
    const result = getLocalDateTimeParts(
      new Date("2026-01-15T15:30:00Z"),
      bookingRules.timeZone,
    );

    expect(result).toEqual({
      date: "2026-01-15",
      time: "10:30",
    });
  });

  it("converts a summer UTC instant to Toronto daylight time", () => {
    const result = getLocalDateTimeParts(
      new Date("2026-07-15T14:30:00Z"),
      bookingRules.timeZone,
    );

    expect(result).toEqual({
      date: "2026-07-15",
      time: "10:30",
    });
  });

  it("handles a Toronto date that is earlier than the UTC date", () => {
    const result = getLocalDateTimeParts(
      new Date("2026-01-01T02:30:00Z"),
      bookingRules.timeZone,
    );

    expect(result).toEqual({
      date: "2025-12-31",
      time: "21:30",
    });
  });

  it("rejects an invalid instant", () => {
    expect(() =>
      getLocalDateTimeParts(
        new Date("invalid"),
        bookingRules.timeZone,
      ),
    ).toThrow("Invalid date instant");
  });
});

describe("getWeekdayFromIsoDate", () => {
  it.each([
    ["2026-09-07", "monday"],
    ["2026-09-08", "tuesday"],
    ["2026-09-12", "saturday"],
    ["2026-09-13", "sunday"],
  ] as const)(
    "returns %s as %s",
    (isoDate, expectedWeekday) => {
      expect(
        getWeekdayFromIsoDate(isoDate),
      ).toBe(expectedWeekday);
    },
  );
});

describe("addDaysToIsoDate", () => {
  it("adds days across a month boundary", () => {
    expect(addDaysToIsoDate("2026-09-04", 90)).toBe(
      "2026-12-03",
    );
  });

  it("adds days across a year boundary", () => {
    expect(addDaysToIsoDate("2026-12-31", 1)).toBe(
      "2027-01-01",
    );
  });

  it("supports subtracting days", () => {
    expect(addDaysToIsoDate("2026-01-01", -1)).toBe(
      "2025-12-31",
    );
  });

  it("rejects a non-integer number of days", () => {
    expect(() =>
      addDaysToIsoDate("2026-09-04", 1.5),
    ).toThrow("Days must be an integer");
  });
});