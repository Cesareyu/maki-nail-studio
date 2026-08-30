import type { Service } from "@/data/services";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({
  service,
}: ServiceCardProps) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-[#eadfdc] bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-[#9d6f65]">
        {service.category}
      </p>

      <h3 className="mt-3 text-xl font-semibold">
        {service.name}
      </h3>

      <p className="mb-6 mt-3 leading-7 text-[#6f625e]">
        {service.description}
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-[#eee4e1] pt-4">
        <span className="text-sm text-[#6f625e]">
          {service.durationMinutes} minutes
        </span>

        <span className="font-semibold">
          ${(service.priceCents / 100).toFixed(2)}
        </span>
      </div>
    </article>
  );
}
