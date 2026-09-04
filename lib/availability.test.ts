import { describe, expect, it } from "vitest";

import {
  generateCandidateStartTimes,
  getDefaultStartTimesForWeekday,
  timeStringToMinutes,
} from "@/lib/availability";

describe("timeStringToMinutes", () => {
  it("converts midnight to zero minutes", () => {
    expect(timeStringToMinutes("00:00")).toBe(0);
  });

  it("converts a daytime value to minutes after midnight", () => {
    expect(timeStringToMinutes("10:15")).toBe(615);
  });

  it("converts the last booking start time", () => {
    expect(timeStringToMinutes("18:00")).toBe(1080);
  });

  it("accepts the latest valid time of day", () => {
    expect(timeStringToMinutes("23:59")).toBe(1439);
  });

  it.each([
    "9:00",
    "24:00",
    "10:60",
    "hello",
    "",
  ])(
    "rejects invalid time value %s",
    (invalidTime) => {
      expect(() =>
        timeStringToMinutes(invalidTime),
      ).toThrow(
        `Invalid time format: ${invalidTime}`,
      );
    },
  );
});

describe("generateCandidateStartTimes", () => {
  it("generates 15-minute start times from 10:00 through 18:00", () => {
    const startTimes =
      generateCandidateStartTimes(
        "10:00",
        "18:00",
        15,
      );

    expect(startTimes).toHaveLength(33);
    expect(startTimes[0]).toBe("10:00");
    expect(startTimes.at(-1)).toBe("18:00");
  });

  it("generates times at the requested interval", () => {
    const startTimes =
      generateCandidateStartTimes(
        "10:00",
        "11:00",
        15,
      );

    expect(startTimes).toEqual([
      "10:00",
      "10:15",
      "10:30",
      "10:45",
      "11:00",
    ]);
  });

  it("rejects a start range in reverse order", () => {
    expect(() =>
      generateCandidateStartTimes(
        "18:00",
        "10:00",
        15,
      ),
    ).toThrow(
      "First start time must not be after last start time",
    );
  });
});

describe("getDefaultStartTimesForWeekday", () => {
  it.each([
    "monday",
    "saturday",
  ] as const)(
    "returns no default slots on %s",
    (weekday) => {
      expect(
        getDefaultStartTimesForWeekday(
          weekday,
        ),
      ).toEqual([]);
    },
  );

  it("generates the normal Tuesday schedule", () => {
    const startTimes =
      getDefaultStartTimesForWeekday(
        "tuesday",
      );

    expect(startTimes).toHaveLength(33);
    expect(startTimes[0]).toBe("10:00");
    expect(startTimes.at(-1)).toBe("18:00");
  });

  it("generates the normal Sunday schedule", () => {
    const startTimes =
      getDefaultStartTimesForWeekday(
        "sunday",
      );

    expect(startTimes).toContain("10:00");
    expect(startTimes).toContain("18:00");
  });
});