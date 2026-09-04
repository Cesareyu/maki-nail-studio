import { BookingFlow } from "@/components/booking/booking-flow";
import {
  serviceBundles,
  services,
} from "@/data/services";

export default function BookPage() {
  const activeServices = services.filter(
    (service) => service.isActive,
  );

  const activeBundles = serviceBundles.filter(
    (bundle) => bundle.isActive,
  );

  return (
    <main className="min-h-screen bg-[#fffafa] px-5 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-[#b8574d]">
            Book an appointment
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#2d2523] md:text-5xl">
            Choose your services
          </h1>

          <p className="mt-4 max-w-3xl text-[#6f625e]">
            Select services for each guest.
            Eligible combination pricing will be
            applied automatically.
          </p>
        </header>

        <div className="mb-10 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 font-medium text-[#2d2523]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2d2523] text-white">
              1
            </span>
            Services
          </div>

          <span className="text-[#b7a9a5]">
            Date &amp; Time
          </span>

          <span className="text-[#b7a9a5]">
            Details
          </span>
        </div>

        <BookingFlow
          services={activeServices}
          bundles={activeBundles}
        />
      </div>
    </main>
  );
}