import type {
  Service,
  ServiceBundle,
} from "@/data/services";
import { findMatchingBundle } from "@/lib/pricing";

export type GuestBookingSummary = {
  selectedServices: Service[];
  subtotalCents: number;
  subtotalDurationMinutes: number;
  matchingBundle: ServiceBundle | null;
  finalPriceCents: number;
  finalDurationMinutes: number;
  savingsCents: number;
};

export function calculateGuestBookingSummary(
  selectedServiceIds: string[],
  allServices: Service[],
  bundles: ServiceBundle[],
): GuestBookingSummary {
  const uniqueServiceIds = new Set(
    selectedServiceIds,
  );

  if (
    uniqueServiceIds.size !==
    selectedServiceIds.length
  ) {
    throw new Error(
      "Selected service IDs must be unique",
    );
  }

  const selectedServices =
    selectedServiceIds.map((serviceId) => {
      const service = allServices.find(
        (candidate) =>
          candidate.id === serviceId,
      );

      if (!service) {
        throw new Error(
          `Service not found: ${serviceId}`,
        );
      }

      return service;
    });

  const subtotalCents =
    selectedServices.reduce(
      (total, service) =>
        total + service.priceCents,
      0,
    );

  const subtotalDurationMinutes =
    selectedServices.reduce(
      (total, service) =>
        total + service.durationMinutes,
      0,
    );

  const matchingBundle = findMatchingBundle(
    selectedServiceIds,
    bundles,
  );

  const finalPriceCents =
    matchingBundle?.priceCents ??
    subtotalCents;

  const finalDurationMinutes =
    matchingBundle?.durationMinutes ??
    subtotalDurationMinutes;

  return {
    selectedServices,
    subtotalCents,
    subtotalDurationMinutes,
    matchingBundle,
    finalPriceCents,
    finalDurationMinutes,
    savingsCents:
      subtotalCents - finalPriceCents,
  };
}