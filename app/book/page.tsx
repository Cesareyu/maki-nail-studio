import { ServiceSelection } from "@/components/booking/service-selection";
import { services } from "@/data/services";

export default function BookPage() {
  const activeServices = services.filter(
    (service) => service.isActive,
  );

  return (
    <main className="min-h-screen bg-[#fffaf8] px-6 py-16 text-[#2d2523]">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-[#9d6f65]">
            Book an Appointment
          </p>

          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
            Choose your services
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-[#6f625e]">
            Select one or more services. Eligible combination
            pricing will be applied automatically.
          </p>
        </header>

        <div className="mb-8 flex items-center gap-3 text-sm">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2d2523] text-white">
            1
          </span>

          <span className="font-medium">
            Services
          </span>

          <span className="text-[#a99a96]">
            Date & Time
          </span>

          <span className="text-[#a99a96]">
            Details
          </span>
        </div>

        <ServiceSelection services={activeServices} />
      </div>
    </main>
  );
}