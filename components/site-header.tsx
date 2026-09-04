import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#eadfdc] bg-[#fffaf8]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-wide text-[#2d2523]"
        >
          Maki Nail Studio
        </Link>

        <nav
          aria-label="Main navigation"
          className="order-3 flex w-full items-center gap-6 overflow-x-auto border-t border-[#eadfdc] pt-4 text-sm md:order-none md:w-auto md:border-0 md:pt-0"
        >
          <Link
            href="/"
            className="whitespace-nowrap text-[#6f625e] hover:text-[#2d2523]"
          >
            Home
          </Link>

          <Link
            href="/services"
            className="whitespace-nowrap text-[#6f625e] hover:text-[#2d2523]"
          >
            Services
          </Link>

                  <Link
          href="/gallery"
          className="whitespace-nowrap text-[#6f625e] hover:text-[#2d2523]"
        >
          Gallery
        </Link>
        
        </nav>

        <Link
          href="/book"
          className="rounded-full bg-[#2d2523] px-5 py-3 text-sm font-medium text-white"
        >
          Book Now
        </Link>

      </div>
    </header>
  );
}