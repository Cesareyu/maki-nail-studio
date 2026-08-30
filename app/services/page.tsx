import { ServiceAddonCard } from "@/components/service-addon-card";
import Link from "next/link";
import { ServiceBundleCard } from "@/components/service-bundle-card";
import { ServiceCard } from "@/components/service-card";
import {
  serviceAddons,
  serviceBundles,
  services,
} from "@/data/services";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#fffaf8] px-6 py-12 text-[#2d2523]">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm font-medium text-[#8b574d] hover:underline"
        >
          ← Back to home
        </Link>

        <header className="mx-auto max-w-3xl py-16 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#9d6f65]">
            Maki Nail Studio
          </p>

          <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
            Services & Pricing
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#6f625e]">
            Explore our nail care services, combination
            packages, and appointment options.
          </p>
        </header>

        <section>
          <h2 className="mb-8 text-3xl font-semibold">
            Individual Services
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}
          </div>
        </section>

        <section className="py-20">
          <h2 className="mb-8 text-3xl font-semibold">
            Combo Services
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {serviceBundles.map((bundle) => (
              <ServiceBundleCard
                key={bundle.id}
                bundle={bundle}
                services={services}
              />
            ))}
          </div>
        </section>

        <section className="pb-20">
          <h2 className="mb-3 text-3xl font-semibold">
            Design Add-ons
          </h2>

          <p className="mb-8 max-w-2xl leading-7 text-[#6f625e]">
            Add a finishing style or submit inspiration
            photos for a custom design review.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {serviceAddons.map((addon) => (
              <ServiceAddonCard
                key={addon.id}
                addon={addon}
              />
            ))}
          </div>
        </section>
        
        <p className="pb-8 text-center text-sm text-[#6f625e]">
          Prices shown are before applicable taxes.
        </p>
      </div>
    </main>
  );
}