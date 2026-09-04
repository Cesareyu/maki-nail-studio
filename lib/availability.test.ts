import { describe, expect, it } from "vitest";

import {
  doTimeIntervalsOverlap,
  filterAvailableStartTimes,
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

describe("doTimeIntervalsOverlap", () => {
  it("detects partially overlapping intervals", () => {
    expect(
      doTimeIntervalsOverlap(
        {
          startMinutes: 600,
          endMinutes: 660,
        },
        {
          startMinutes: 630,
          endMinutes: 690,
        },
      ),
    ).toBe(true);
  });

  it("detects when one interval contains another", () => {
    expect(
      doTimeIntervalsOverlap(
        {
          startMinutes: 600,
          endMinutes: 720,
        },
        {
          startMinutes: 630,
          endMinutes: 660,
        },
      ),
    ).toBe(true);
  });

  it("allows intervals that only touch at the boundary", () => {
    expect(
      doTimeIntervalsOverlap(
        {
          startMinutes: 600,
          endMinutes: 660,
        },
        {
          startMinutes: 660,
          endMinutes: 720,
        },
      ),
    ).toBe(false);
  });

  it("returns false for separated intervals", () => {
    expect(
      doTimeIntervalsOverlap(
        {
          startMinutes: 600,
          endMinutes: 660,
        },
        {
          startMinutes: 720,
          endMinutes: 780,
        },
      ),
    ).toBe(false);
  });

  it("rejects an interval with no duration", () => {
    expect(() =>
      doTimeIntervalsOverlap(
        {
          startMinutes: 600,
          endMinutes: 600,
        },
        {
          startMinutes: 660,
          endMinutes: 720,
        },
      ),
    ).toThrow(
      "Time interval start must be before end",
    );
  });
});

describe("filterAvailableStartTimes", () => {
  it("removes start times that conflict with an existing appointment and buffer", () => {
    const candidateStartTimes = [
      "09:45",
      "10:00",
      "10:15",
      "10:30",
      "10:45",
      "11:00",
      "11:15",
      "11:30",
      "11:45",
      "12:00",
      "12:15",
    ];

    const unavailableIntervals = [
      {
        startMinutes: 660,
        endMinutes: 720,
      },
    ];

    const availableStartTimes =
      filterAvailableStartTimes(
        candidateStartTimes,
        60,
        unavailableIntervals,
        10,
      );

    expect(availableStartTimes).toEqual([
      "09:45",
      "12:15",
    ]);
  });

  it("keeps every candidate when there are no unavailable intervals", () => {
    const candidateStartTimes = [
      "10:00",
      "10:15",
      "10:30",
    ];

    expect(
      filterAvailableStartTimes(
        candidateStartTimes,
        60,
        [],
        10,
      ),
    ).toEqual(candidateStartTimes);
  });

  it("allows appointments to touch when the buffer is zero", () => {
    expect(
      filterAvailableStartTimes(
        ["10:00"],
        60,
        [
          {
            startMinutes: 660,
            endMinutes: 720,
          },
        ],
        0,
      ),
    ).toEqual(["10:00"]);
  });

  it("rejects a zero-minute booking duration", () => {
    expect(() =>
      filterAvailableStartTimes(
        ["10:00"],
        0,
        [],
        10,
      ),
    ).toThrow(
      "Booking duration must be a positive integer",
    );
  });
});