import { serviceBundles, services } from "@/data/services";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffaf8] text-[#2d2523]">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#9d6f65]">
          Maki Nail Studio
        </p>

        <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
          Beautiful nails, made personal.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-[#6f625e]">
          Thoughtful nail care and custom designs in a relaxed,
          one-to-one studio experience.
        </p>

        <button className="mt-10 rounded-full bg-[#2d2523] px-8 py-4 text-sm font-medium text-white">
          Book an Appointment
        </button>
      </section>
      <section className="px-6 py-28">
          <div className="mx-auto max-w-6x1">
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-[#9d6f65]">
                Our Services
              </p>
              
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                Nail care desgined around you
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg: grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="rounded-3xl border border-[#eadfdc] bg-white p-6 shawdow-sm"
                >
                  <p className="text-xs uppercase tracking -[0,2em] text-[#9d6f65]">
                    {service.category}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    {service.name}
                  </h3>

                  <p className="mt-3 leading-7 text-[#6f625e]">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-[#www4el] pt-4">
                    <span className="text-sm text-[#6f625e]">
                      {service.durationMinutes} minutes
                    </span>

                    <span className="font-semibold">
                      ${(service.priceCents / 100).toFixed(2)}
                    </span>
                  </div>
                </article>
              ))}

            </div>
          </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#9d6f65]">
              Combo Services
            </p>

            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              Complete care, better value
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {serviceBundles.map((bundle) => (
              <article
                key={bundle.id}
                className="rounded-3xl border border-[#eadfdc] bg-[#fffaf8] p-6"
              >
                <h3 className="text-xl font-semibold">{bundle.name}</h3>

                <p className="mt-3 leading-7 text-[#6f625e]">
                  {bundle.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-[#eee4e1] pt-4">
                  <span className="text-sm text-[#6f625e]">
                    {bundle.durationMinutes} minutes
                  </span>

                  <span className="font-semibold">
                    ${(bundle.priceCents / 100).toFixed(2)}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-[#6f625e]">
            Prices shown are before applicable taxes.
          </p>
        </div>
      </section>

    </main>
  );
}