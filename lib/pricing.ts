import type { Service, ServiceBundle } from "@/data/services";

export function calculateBundleSavings(
  bundle: ServiceBundle,
  allServices: Service[],
): number {
  const regularPriceCents = bundle.serviceIds.reduce(
    (total, serviceId) => {
      const service = allServices.find(
        (candidate) => candidate.id === serviceId,
      );

      if (!service) {
        throw new Error(`Service not found: ${serviceId}`);
      }

      return total + service.priceCents;
    },
    0,
  );

  return Math.max(regularPriceCents - bundle.priceCents, 0);
}

export function findMatchingBundle(
  selectedServiceIds: string[],
  bundles: ServiceBundle[],
): ServiceBundle | null {
  const normalizedSelection = [...selectedServiceIds]
    .sort()
    .join("|");

  const matchingBundle = bundles.find((bundle) => {
    const normalizedBundle = [...bundle.serviceIds]
      .sort()
      .join("|");

    return normalizedBundle === normalizedSelection;
  });

  return matchingBundle ?? null;
}