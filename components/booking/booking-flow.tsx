"use client";

import { useState } from "react";

import { ServiceSelection } from "@/components/booking/service-selection";
import type { Service, ServiceBundle } from "@/data/services";
import type { BookingGuestDraft } from "@/types/booking";

type BookingFlowProps = {
  services: Service[];
  bundles: ServiceBundle[];
};

export function BookingFlow({
  services,
  bundles,
}: BookingFlowProps) {
  const [guests, setGuests] = useState<BookingGuestDraft[]>([
    {
      id: "guest-1",
      name: "",
      phone: "",
      selectedServiceIds: [],
      technicianId: null,
    },
  ]);

  return (
    <ServiceSelection
      services={services}
      bundles={bundles}
      guests={guests}
      setGuests={setGuests}
    />
  );
}