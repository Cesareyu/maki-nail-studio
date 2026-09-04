"use client";

import { useState } from "react";

import { calculateGuestBookingSummary } from "@/lib/booking-summary";

import type { BookingGuestDraft } from "@/types/booking";

import type {
  Service,
  ServiceBundle,
} from "@/data/services";

type ServiceSelectionProps = {
  services: Service[];
  bundles: ServiceBundle[];
};

function getServiceSelectionGroup(
  service: Service,
) {
  if (service.category === "pedicure") {
    return "pedicure";
  }

  return "hand-service";
}

export function ServiceSelection({
  services,
  bundles,
}: ServiceSelectionProps) {
  const [guests, setGuests] = useState<
    BookingGuestDraft[]
  >([
    {
      id: "guest-1",
      name: "",
      phone: "",
      selectedServiceIds: [],
      technicianId: null,
    },
  ]);

  const [activeGuestId, setActiveGuestId] =
    useState("guest-1");

  const activeGuest =
    guests.find(
      (guest) => guest.id === activeGuestId,
    ) ?? guests[0];

  const activeGuestIndex = guests.findIndex(
    (guest) => guest.id === activeGuestId,
  );

  const selectedServiceIds =
    activeGuest?.selectedServiceIds ?? [];

const activeGuestSummary =
  calculateGuestBookingSummary(
    selectedServiceIds,
    services,
    bundles,
  );

const activeGuestServices =
  activeGuestSummary.selectedServices;

const activeGuestBundle =
  activeGuestSummary.matchingBundle;

const activeGuestFinalPriceCents =
  activeGuestSummary.finalPriceCents;

const activeGuestFinalDurationMinutes =
  activeGuestSummary.finalDurationMinutes;

const activeGuestSavingsCents =
  activeGuestSummary.savingsCents;
  
const guestBookingSummaries = guests
  .map((guest, index) => {
    const summary =
      calculateGuestBookingSummary(
        guest.selectedServiceIds,
        services,
        bundles,
      );

    return {
      guestId: guest.id,
      guestNumber: index + 1,
      serviceCount:
        summary.selectedServices.length,
      finalPriceCents:
        summary.finalPriceCents,
      finalDurationMinutes:
        summary.finalDurationMinutes,
    };
  })
  .filter(
    (summary) => summary.serviceCount > 0,
  );

  const bookingTotalPriceCents = 
  guestBookingSummaries.reduce(
    (total, guest) =>
      total + guest.finalPriceCents,
    0,
  );

  const bookingTotalDurationMinutes =
  guestBookingSummaries.reduce(
    (total, guest) =>
      total + guest.finalDurationMinutes,
    0,
  );
  

  function addGuest() {
    const newGuestId = crypto.randomUUID();

    const newGuest: BookingGuestDraft = {
      id: newGuestId,
      name: "",
      phone: "",
      selectedServiceIds: [],
      technicianId: null,
    };

    setGuests((currentGuests) => [
      ...currentGuests,
      newGuest,
    ]);

    setActiveGuestId(newGuestId);
  }

  function removeGuest() {
    if (guests.length === 1) {
      return;
    }

    const guestBeingRemoved =
      guests[guests.length - 1];

    const remainingGuests = guests.slice(0, -1);

    setGuests(remainingGuests);

    if (
      guestBeingRemoved?.id === activeGuestId
    ) {
      const previousGuest =
        remainingGuests[
          remainingGuests.length - 1
        ];

      if (previousGuest) {
        setActiveGuestId(previousGuest.id);
      }
    }
  }

  function toggleService(serviceId: string) {
    const selectedService = services.find(
      (service) => service.id === serviceId,
    );

    if (!selectedService) {
      return;
    }

    const selectedServiceGroup =
      getServiceSelectionGroup(selectedService);

    setGuests((currentGuests) =>
      currentGuests.map((guest) => {
        if (guest.id !== activeGuestId) {
          return guest;
        }

        const isAlreadySelected =
          guest.selectedServiceIds.includes(
            serviceId,
          );

        if (isAlreadySelected) {
          return {
            ...guest,
            selectedServiceIds:
              guest.selectedServiceIds.filter(
                (selectedId) =>
                  selectedId !== serviceId,
              ),
          };
        }

        const serviceIdsWithoutConflict =
          guest.selectedServiceIds.filter(
            (selectedId) => {
              const previousService =
                services.find(
                  (service) =>
                    service.id === selectedId,
                );

              if (!previousService) {
                return false;
              }

              const previousServiceGroup =
                getServiceSelectionGroup(
                  previousService,
                );

              return (
                previousServiceGroup !==
                selectedServiceGroup
              );
            },
          );

        return {
          ...guest,
          selectedServiceIds: [
            ...serviceIdsWithoutConflict,
            serviceId,
          ],
        };
      }),
    );
  }

  return (
    <div>
      <section className="mb-8 rounded-3xl border border-[#eadfdc] bg-white p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[#2d2523]">
              How many people are receiving
              services?
            </p>

            <p className="mt-1 text-sm text-[#6f625e]">
              Each guest can choose their own
              services.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={removeGuest}
              disabled={guests.length === 1}
              aria-label="Remove one guest"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#eadfdc] text-xl text-[#2d2523] transition hover:border-[#b8574d] disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>

            <span className="min-w-20 text-center font-semibold text-[#2d2523]">
              {guests.length}{" "}
              {guests.length === 1
                ? "person"
                : "people"}
            </span>

            <button
              type="button"
              onClick={addGuest}
              aria-label="Add one guest"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d2523] text-xl text-white transition hover:bg-[#4a3c38]"
            >
              +
            </button>
          </div>
        </div>
      </section>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {guests.map((guest, index) => {
          const isActive =
            guest.id === activeGuestId;

          return (
            <button
              key={guest.id}
              type="button"
              onClick={() =>
                setActiveGuestId(guest.id)
              }
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-5 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-[#2d2523] bg-[#2d2523] text-white"
                  : "border-[#eadfdc] bg-white text-[#6f625e] hover:border-[#b8574d]"
              }`}
            >
              <span>
                {index === 0
                  ? "Guest 1 — You"
                  : `Guest ${index + 1}`}
              </span>

              {guest.selectedServiceIds.length >
                0 && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#f4e7e3] text-[#8b574d]"
                  }`}
                >
                  {
                    guest.selectedServiceIds
                      .length
                  }
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p className="mb-4 text-sm text-[#6f625e]">
        Select services for{" "}
        <span className="font-semibold text-[#2d2523]">
          Guest{" "}
          {activeGuestIndex >= 0
            ? activeGuestIndex + 1
            : 1}
        </span>
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => {
          const isSelected =
            selectedServiceIds.includes(
              service.id,
            );

          return (
            <button
              key={service.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() =>
                toggleService(service.id)
              }
              className={`rounded-3xl border p-5 text-left transition ${
                isSelected
                  ? "border-[#8b574d] bg-[#f4e7e3]"
                  : "border-[#eadfdc] bg-white hover:border-[#c99f95]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-[#2d2523]">
                    {service.name}
                  </h2>

                  <p className="mt-2 text-sm text-[#6f625e]">
                    {service.durationMinutes}{" "}
                    minutes
                  </p>
                </div>

                <span className="font-semibold text-[#2d2523]">
                  $
                  {(
                    service.priceCents / 100
                  ).toFixed(2)}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {activeGuestServices.length > 0 && (
        <section className="mt-8 rounded-3xl border border-[#eadfdc] bg-white p-5">
          <h2 className="text-lg font-semibold text-[#2d2523]">
            Guest summary
          </h2>

          <div className="mt-4 space-y-3">
            {activeGuestServices.map(
              (service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <span className="text-[#6f625e]">
                    {service.name}
                  </span>

                  <span className="font-medium text-[#2d2523]">
                    $
                    {(
                      service.priceCents / 100
                    ).toFixed(2)}
                  </span>
                </div>
              ),
            )}
          </div>

          {activeGuestBundle && (
            <div className="mt-5 rounded-2xl bg-[#f4e7e3] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#2d2523]">
                    Combo applied
                  </p>

                  <p className="mt-1 text-sm text-[#6f625e]">
                    {activeGuestBundle.name}
                  </p>
                </div>

                <span className="whitespace-nowrap text-sm font-semibold text-[#8b574d]">
                  Save $
                  {(
                    activeGuestSavingsCents /
                    100
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          <div className="mt-5 flex items-center justify-between border-t border-[#eadfdc] pt-4">
            <span className="text-sm text-[#6f625e]">
              {activeGuestFinalDurationMinutes}{" "}
              minutes
            </span>

            <span className="font-semibold text-[#2d2523]">
              $
              {(
                activeGuestFinalPriceCents / 100
              ).toFixed(2)}
            </span>
          </div>
        </section>
      )}

     {guests.length > 1 &&
  guestBookingSummaries.length > 0 && (
    <section className="mt-8 rounded-3xl bg-[#2d2523] p-5 text-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">
            Group booking summary
          </h2>

          <p className="mt-1 text-sm text-white/70">
            Taylor will serve each guest in order.
          </p>
        </div>

        <span className="whitespace-nowrap text-sm text-white/70">
          {guestBookingSummaries.length} of{" "}
          {guests.length} guests selected
        </span>
      </div>

      <div className="mt-5 space-y-3 border-t border-white/20 pt-5">
        {guestBookingSummaries.map(
          (summary) => (
            <div
              key={summary.guestId}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <div>
                <p className="font-medium">
                  Guest {summary.guestNumber}
                </p>

                <p className="mt-1 text-white/60">
                  {summary.serviceCount}{" "}
                  {summary.serviceCount === 1
                    ? "service"
                    : "services"}
                  {" · "}
                  {
                    summary.finalDurationMinutes
                  }{" "}
                  minutes
                </p>
              </div>

              <span className="font-semibold">
                $
                {(
                  summary.finalPriceCents /
                  100
                ).toFixed(2)}
              </span>
            </div>
          ),
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-5">
        <div>
          <p className="font-semibold">
            Estimated total
          </p>

          <p className="mt-1 text-sm text-white/60">
            {bookingTotalDurationMinutes} minutes
          </p>
        </div>

        <span className="text-xl font-semibold">
          $
          {(
            bookingTotalPriceCents / 100
          ).toFixed(2)}
        </span>
      </div>
    </section>
  )}
    </div>
  );
}