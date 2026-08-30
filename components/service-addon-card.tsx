import type { ServiceAddon } from "@/data/services";

type ServiceAddonCardProps = {
  addon: ServiceAddon;
};

export function ServiceAddonCard({
  addon,
}: ServiceAddonCardProps) {
  const priceLabel =
    addon.priceCents === null
      ? "Quote required"
      : `$${(addon.priceCents / 100).toFixed(2)}${
          addon.pricingType === "starting_at" ? "+" : ""
        }`;

  const durationLabel =
    addon.durationMinutes === null
      ? "Time confirmed after review"
      : addon.requiresReview
        ? `Approx. ${addon.durationMinutes} minutes`
        : `${addon.durationMinutes} minutes`;

  return (
    <article className="flex h-full flex-col rounded-3xl border border-[#eadfdc] bg-white p-6">
      <h3 className="text-xl font-semibold">
        {addon.name}
      </h3>

      <p className="mb-6 mt-3 leading-7 text-[#6f625e]">
        {addon.description}
      </p>

      {addon.requiresReview && (
        <p className="mb-6 w-fit rounded-full bg-[#f4e7e3] px-3 py-1 text-sm font-medium text-[#8b574d]">
          Design review required
        </p>
      )}

      <div className="mt-auto flex items-center justify-between border-t border-[#eee4e1] pt-4">
        <span className="text-sm text-[#6f625e]">
          {durationLabel}
        </span>

        <span className="font-semibold">
          {priceLabel}
        </span>
      </div>
    </article>
  );
}