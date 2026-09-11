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
      <BookingFlow
        services={activeServices}
        bundles={activeBundles}
      />
    </div>
  </main>
);
}