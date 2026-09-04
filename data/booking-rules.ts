export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type DailyBookingHours = {
  isNormallyOpen: boolean;
  firstStartTime: string | null;
  lastStartTime: string | null;
};

export type WeeklyBookingHours = Record<
  Weekday,
  DailyBookingHours
>;

export type BookingStartWindow = {
  firstStartTime: string;
  lastStartTime: string;
};

export const bookingRules = {
  timeZone: "America/Toronto",
  slotIntervalMinutes: 15,
  minimumLeadTimeMinutes: 120,
  maximumAdvanceDays: 90,
  bufferMinutes: 10,
} as const;

export const weeklyBookingHours: WeeklyBookingHours = {
  monday: {
    isNormallyOpen: false,
    firstStartTime: null,
    lastStartTime: null,
  },

  tuesday: {
    isNormallyOpen: true,
    firstStartTime: "10:00",
    lastStartTime: "18:00",
  },

  wednesday: {
    isNormallyOpen: true,
    firstStartTime: "10:00",
    lastStartTime: "18:00",
  },

  thursday: {
    isNormallyOpen: true,
    firstStartTime: "10:00",
    lastStartTime: "18:00",
  },

  friday: {
    isNormallyOpen: true,
    firstStartTime: "10:00",
    lastStartTime: "18:00",
  },

  saturday: {
    isNormallyOpen: false,
    firstStartTime: null,
    lastStartTime: null,
  },

  sunday: {
    isNormallyOpen: true,
    firstStartTime: "10:00",
    lastStartTime: "18:00",
  },
};