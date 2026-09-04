export type BookingGuestDraft = {
  id: string;
  name: string;
  phone: string;
  selectedServiceIds: string[];
  technicianId: string | null;
};

export type BookingDraft = {
  guests: BookingGuestDraft[];
  selectedDate: string | null;
  selectedStartTime: string | null;
};