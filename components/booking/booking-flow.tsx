"use client";

import { BookingStepHeader } from "@/components/booking/booking-step-header";
import { calculateAvailableStartTimes } from "@/lib/availability";
import { calculateGuestBookingSummary } from "@/lib/booking-summary";
import { CustomerDetailsForm } from "@/components/booking/customer-details-form";
import { useState } from "react";
import { DateTimeSelection } from "@/components/booking/date-time-selection";
import { ServiceSelection } from "@/components/booking/service-selection";
import type { Service, ServiceBundle } from "@/data/services";
import type { BookingGuestDraft } from "@/types/booking";

import { bookingRules } from "@/data/booking-rules";
import {
  addDaysToIsoDate,
  getLocalDateTimeParts,
} from "@/lib/booking-dates";

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
    "services" | "date-time" | "details"
    >("services");
  const [selectedDate, setSelectedDate] = useState<string | null>(
    null,
    );
    const [selectedStartTime, setSelectedStartTime] =
    useState<string | null>(null);

    const [email, setEmail] = useState("");
    const [notes, setNotes] = useState("");

  const canContinue = guests.every(
    (guest) => guest.selectedServiceIds.length > 0,
    );
    const bookingDurationMinutes = guests.reduce(
    (totalMinutes, guest) => {
    const summary = calculateGuestBookingSummary(
      guest.selectedServiceIds,
      services,
      bundles,
    );

    return totalMinutes + summary.finalDurationMinutes;
  },
  0,
);

  const todayInBookingTimeZone = getLocalDateTimeParts(
    new Date(),
    bookingRules.timeZone,
    ).date;

  const latestBookingDate = addDaysToIsoDate(
    todayInBookingTimeZone,
    bookingRules.maximumAdvanceDays,
    );
    const availableStartTimes = selectedDate
  ? calculateAvailableStartTimes({
      selectedDate,
      bookingDurationMinutes,
      currentInstant: new Date(),
      manualOpenings: [],
      unavailableIntervals: [],
    })
  : [];
  function handleDateChange(date: string) {
  setSelectedDate(date);
  setSelectedStartTime(null);
}

if (activeStep === "details") {
  return (
    <>
      <BookingStepHeader
        currentStep={3}
        title="Your details"
        description="Enter the contact information for your booking."
      />

      <CustomerDetailsForm
        guests={guests}
        setGuests={setGuests}
        email={email}
        notes={notes}
        onEmailChange={setEmail}
        onNotesChange={setNotes}
        onBack={() => setActiveStep("date-time")}
      />

        <button
          type="button"
          onClick={() => setActiveStep("date-time")}
          className="mt-8 rounded-full border border-[#2d2523] px-6 py-3 font-semibold text-[#2d2523]"
        >
          Back to date &amp; time
        </button>
      </section>
    </>
  );
}

if (activeStep === "date-time") {
  return (
    <>
      <BookingStepHeader
        currentStep={2}
        title="Choose a date and time"
        description="Select an available appointment time for your group."
      />

      <DateTimeSelection
        selectedDate={selectedDate}
        selectedStartTime={selectedStartTime}
        minimumDate={todayInBookingTimeZone}
        maximumDate={latestBookingDate}
        availableStartTimes={availableStartTimes}
        canContinue={
          selectedDate !== null &&
          selectedStartTime !== null
        }
        onDateChange={handleDateChange}
        onTimeChange={setSelectedStartTime}
        onBack={() => setActiveStep("services")}
        onContinue={() => setActiveStep("details")}
      />
    </>
  );
}

return (
  <>
    <BookingStepHeader
      currentStep={1}
      title="Choose your services"
      description="Select services for each guest. Eligible combination pricing will be applied automatically."
    />

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