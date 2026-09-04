import { describe, expect, it } from "vitest";

import {
  serviceBundles,
  services,
} from "@/data/services";
import { calculateGuestBookingSummary } from "@/lib/booking-summary";

describe("calculateGuestBookingSummary", () => {
  it("calculates a single service without a combo", () => {
    const summary =
      calculateGuestBookingSummary(
        ["gel-extension"],
        services,
        serviceBundles,
      );

    expect(summary.finalPriceCents).toBe(
      7500,
    );
    expect(
      summary.finalDurationMinutes,
    ).toBe(90);
    expect(summary.matchingBundle).toBeNull();
    expect(summary.savingsCents).toBe(0);
  });

  it("applies a matching combo price and duration", () => {
    const summary =
      calculateGuestBookingSummary(
        [
          "spa-manicure",
          "spa-pedicure",
        ],
        services,
        serviceBundles,
      );

    expect(summary.subtotalCents).toBe(6500);
    expect(summary.finalPriceCents).toBe(
      5500,
    );
    expect(
      summary.finalDurationMinutes,
    ).toBe(60);
    expect(summary.savingsCents).toBe(
      1000,
    );
    expect(summary.matchingBundle?.id).toBe(
      "regular-mani-pedi",
    );
  });

  it("returns zero totals for no selected services", () => {
    const summary =
      calculateGuestBookingSummary(
        [],
        services,
        serviceBundles,
      );

    expect(summary.selectedServices).toEqual(
      [],
    );
    expect(summary.finalPriceCents).toBe(0);
    expect(
      summary.finalDurationMinutes,
    ).toBe(0);
  });

  it("rejects an unknown service ID", () => {
    expect(() =>
      calculateGuestBookingSummary(
        ["unknown-service"],
        services,
        serviceBundles,
      ),
    ).toThrow(
      "Service not found: unknown-service",
    );
  });

  it("rejects duplicate service IDs", () => {
    expect(() =>
      calculateGuestBookingSummary(
        [
          "spa-manicure",
          "spa-manicure",
        ],
        services,
        serviceBundles,
      ),
    ).toThrow(
      "Selected service IDs must be unique",
    );
  });
});