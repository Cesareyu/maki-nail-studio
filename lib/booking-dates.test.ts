import { describe, expect, it } from "vitest";

import { isDateWithinBookingWindow } from "@/lib/booking-dates";

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