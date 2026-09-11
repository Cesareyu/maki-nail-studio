"use client";

type DateTimeSelectionProps = {
  selectedDate: string | null;
  selectedStartTime: string | null;
  minimumDate: string;
  maximumDate: string;
  availableStartTimes: string[];
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onBack: () => void;
};

export function DateTimeSelection({
  selectedDate,
  selectedStartTime,
  minimumDate,
  maximumDate,
  availableStartTimes,
  onDateChange,
  onTimeChange,
  onBack,
}: DateTimeSelectionProps) {

  return (
    <section className="pb-16">

      <div className="mt-10 rounded-3xl border border-[#eadfdc] bg-white p-6">
        <label
          htmlFor="booking-date"
          className="block font-semibold text-[#2d2523]"
        >
          Appointment date
        </label>

        <input
          id="booking-date"
          type="date"
          value={selectedDate ?? ""}
          min={minimumDate}
          max={maximumDate}
          onChange={(event) => onDateChange(event.target.value)}
          className="mt-3 w-full rounded-2xl border border-[#d8cbc7] px-4 py-3 text-[#2d2523]"
        />
      </div>

      {selectedDate && (
    <div className="mt-8 rounded-3xl border border-[#eadfdc] bg-white p-6">
        <h2 className="text-xl font-semibold text-[#2d2523]">
         Available start times
        </h2>

    {availableStartTimes.length > 0 ? (
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {availableStartTimes.map((startTime) => {
          const isSelected = selectedStartTime === startTime;

          return (
            <button
              key={startTime}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onTimeChange(startTime)}
              className={`rounded-2xl border px-4 py-3 font-semibold transition ${
                isSelected
                  ? "border-[#2d2523] bg-[#2d2523] text-white"
                  : "border-[#d8cbc7] bg-white text-[#2d2523] hover:border-[#8b574d]"
              }`}
            >
              {startTime}
            </button>
          );
        })}
      </div>
    ) : (
      <p className="mt-4 text-[#6f6561]">
        No appointment times are available for this date.
      </p>
    )}
  </div>
)}

      <button
        type="button"
        onClick={onBack}
        className="mt-8 rounded-full border border-[#2d2523] px-6 py-3 font-semibold text-[#2d2523]"
      >
        Back to services
      </button>
    </section>
  );
}