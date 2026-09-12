import type {
  Dispatch,
  SetStateAction,
} from "react";

import type { BookingGuestDraft } from "@/types/booking";

type CustomerDetailsFormProps = {
  guests: BookingGuestDraft[];
  setGuests: Dispatch<
    SetStateAction<BookingGuestDraft[]>
  >;
  email: string;
  notes: string;
  onEmailChange: (email: string) => void;
  onNotesChange: (notes: string) => void;
  onBack: () => void;
};

export function CustomerDetailsForm({
  guests,
  setGuests,
  email,
  notes,
  onEmailChange,
  onNotesChange,
  onBack,
}: CustomerDetailsFormProps) {
  function updateGuest(
    guestId: string,
    changes: Partial<
      Pick<BookingGuestDraft, "name" | "phone">
    >,
  ) {
    setGuests((currentGuests) =>
      currentGuests.map((guest) =>
        guest.id === guestId
          ? { ...guest, ...changes }
          : guest,
      ),
    );
  }

  return (
    <section className="pb-16">
      <div className="space-y-6">
        {guests.map((guest, index) => (
          <div
            key={guest.id}
            className="rounded-3xl border border-[#eadfdc] bg-white p-6"
          >
            <h2 className="text-xl font-semibold text-[#2d2523]">
              Guest {index + 1}
              {index === 0 && " — Primary contact"}
            </h2>

            <label
              htmlFor={`${guest.id}-name`}
              className="mt-5 block text-sm font-medium text-[#2d2523]"
            >
              Full name
            </label>

            <input
              id={`${guest.id}-name`}
              type="text"
              required
              value={guest.name}
              onChange={(event) =>
                updateGuest(guest.id, {
                  name: event.target.value,
                })
              }
              className="mt-2 w-full rounded-2xl border border-[#d8cbc7] px-4 py-3 text-[#2d2523]"
            />

        <label
            htmlFor={`${guest.id}-phone`}
            className="mt-5 block text-sm font-medium text-[#2d2523]"
            >
              Phone number
        </label>

            <input
            id={`${guest.id}-phone`}
            type="tel"
            required
            value={guest.phone}
            onChange={(event) =>
                updateGuest(guest.id, {
                phone: event.target.value,
                })
            }
            className="mt-2 w-full rounded-2xl border border-[#d8cbc7] px-4 py-3 text-[#2d2523]"
            />
                    </div>
))}

        <div className="rounded-3xl border border-[#eadfdc] bg-white p-6">
          <label
            htmlFor="booking-email"
            className="block text-sm font-medium text-[#2d2523]"
          >
            Email address
          </label>

          <input
            id="booking-email"
            type="email"
            required
            value={email}
            onChange={(event) =>
              onEmailChange(event.target.value)
            }
            className="mt-2 w-full rounded-2xl border border-[#d8cbc7] px-4 py-3 text-[#2d2523]"
          />

          <label
            htmlFor="booking-notes"
            className="mt-5 block text-sm font-medium text-[#2d2523]"
          >
            Appointment notes
            <span className="ml-2 font-normal text-[#8f817c]">
              Optional
            </span>
          </label>

          <textarea
            id="booking-notes"
            rows={4}
            value={notes}
            onChange={(event) =>
              onNotesChange(event.target.value)
            }
            placeholder="Tell us anything we should know before your appointment."
            className="mt-2 w-full resize-y rounded-2xl border border-[#d8cbc7] px-4 py-3 text-[#2d2523]"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mt-8 rounded-full border border-[#2d2523] px-6 py-3 font-semibold text-[#2d2523]"
      >
        Back to date &amp; time
      </button>
    </section>
  );
}