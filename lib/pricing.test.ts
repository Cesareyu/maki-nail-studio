import { describe, expect, it } from "vitest";

import { serviceBundles, services } from "@/data/services";
import {
  calculateBundleSavings,
  findMatchingBundle,
} from "@/lib/pricing";

describe("calculateBundleSavings", () => {
  it("calculates the regular manicure and pedicure savings", () => {
    const bundle = serviceBundles.find(
      (candidate) => candidate.id === "regular-mani-pedi",
    );

    expect(bundle).toBeDefined();

    if (!bundle) {
      throw new Error("Test bundle not found");
    }

    const savingsCents = calculateBundleSavings(bundle, services);

    expect(savingsCents).toBe(1000);
  });
});

describe("findMatchingBundle", () => {
  it("matches a combo regardless of selection order", () => {
    const selectedServiceIds = [
      "spa-pedicure",
      "spa-manicure",
    ];

    const bundle = findMatchingBundle(
      selectedServiceIds,
      serviceBundles,
    );

    expect(bundle?.id).toBe("regular-mani-pedi");
  });

  it("returns null when no combo matches", () => {
    const bundle = findMatchingBundle(
      ["gel-extension"],
      serviceBundles,
    );

    expect(bundle).toBeNull();
  });
});