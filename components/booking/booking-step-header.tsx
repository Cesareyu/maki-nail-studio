type BookingStepHeaderProps = {
  currentStep: 1 | 2 | 3;
  title: string;
  description: string;
};

const steps = [
  { number: 1, label: "Services" },
  { number: 2, label: "Date & Time" },
  { number: 3, label: "Details" },
] as const;

export function BookingStepHeader({
  currentStep,
  title,
  description,
}: BookingStepHeaderProps) {
  return (
    <>
      <header className="mb-12">
        <p className="text-sm uppercase tracking-[0.3em] text-[#b8574d]">
          Book an appointment
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#2d2523] md:text-5xl">
          {title}
        </h1>

        <p className="mt-4 max-w-3xl text-[#6f625e]">
          {description}
        </p>
      </header>

      <nav
        aria-label="Booking progress"
        className="mb-10 flex flex-wrap items-center gap-4 text-sm"
      >
        {steps.map((step) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;

          return (
            <div
              key={step.number}
              className={`flex items-center gap-2 ${
                isActive || isCompleted
                  ? "font-medium text-[#2d2523]"
                  : "text-[#b7a9a5]"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  isActive || isCompleted
                    ? "bg-[#2d2523] text-white"
                    : "border border-[#d8cbc7] bg-white"
                }`}
              >
                {step.number}
              </span>

              {step.label}
            </div>
          );
        })}
      </nav>
    </>
  );
}