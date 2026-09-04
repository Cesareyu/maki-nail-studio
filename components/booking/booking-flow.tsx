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

  const [activeStep, setActiveStep] = useState<
    "services" | "date-time"
    >("services");

  const canContinue = guests.every(
    (guest) => guest.selectedServiceIds.length > 0,
    );

    if (activeStep === "date-time") {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-sm uppercase tracking-[0.2em] text-[#8b574d]">
        Book an appointment
      </p>

      <h1 className="mt-3 text-4xl font-semibold text-[#2d2523]">
        Choose a date and time
      </h1>

      <p className="mt-3 text-[#6f6561]">
        Your service selections have been saved.
      </p>

      <button
        type="button"
        onClick={() => setActiveStep("services")}
        className="mt-8 rounded-full border border-[#2d2523] px-6 py-3 font-semibold text-[#2d2523]"
      >
        Back to services
      </button>
    </section>
  );
}
return (
  <>
    <ServiceSelection
      services={services}
      bundles={bundles}
      guests={guests}
      setGuests={setGuests}
    />

    <div className="mx-auto mt-8 max-w-6xl px-6 pb-16">
      <button
        type="button"
        disabled={!canContinue}
        onClick={() => setActiveStep("date-time")}
        className="w-full rounded-full bg-[#2d2523] px-6 py-4 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continue to date &amp; time
      </button>
    </div>
  </>
);
}