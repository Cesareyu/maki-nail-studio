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
    </main>
  );
}