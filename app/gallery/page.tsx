export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#fffaf8] px-6 py-16 text-[#2d2523]">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#9d6f65]">
            Our Work
          </p>

          <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
            Nail Art Gallery
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#6f625e]">
            Explore recent manicures, gel extensions,
            and custom nail designs.
          </p>
        </header>

        <section className="mx-auto mt-16 max-w-2xl rounded-3xl border border-dashed border-[#d9c5c0] bg-white px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-[#9d6f65]">
            Portfolio Coming Soon
          </p>

          <h2 className="mt-4 text-2xl font-semibold">
            New work is being prepared
          </h2>

          <p className="mx-auto mt-4 max-w-lg leading-7 text-[#6f625e]">
            Maki Nail Studio&apos;s latest work will be
            added here shortly.
          </p>
        </section>
      </div>
    </main>
  );
}