import type {
  Service,
  ServiceBundle,
} from "@/data/services";
import { calculateBundleSavings } from "@/lib/pricing";

type ServiceBundleCardProps = {
  bundle: ServiceBundle;
  services: Service[];
};

export function ServiceBundleCard({
  bundle,
  services,
}: ServiceBundleCardProps) {
  const savingsCents = calculateBundleSavings(
    bundle,
    services,
  );

  return (
    <article className="flex h-full flex-col rounded-3xl border border-[#eadfdc] bg-[#fffaf8] p-6">
      <h3 className="text-xl font-semibold">
        {bundle.name}
      </h3>

      <p className="mt-3 leading-7 text-[#6f625e] md:min-h-[3.5rem]">
        {bundle.description}
      </p>

      <p className="mb-6 mt-4 inline-flex w-fit rounded-full bg-[#f4e7e3] px-3 py-1 text-sm font-medium text-[#8b574d]">
        Save ${(savingsCents / 100).toFixed(2)}
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-[#eee4e1] pt-4">
        <span className="text-sm text-[#6f625e]">
          {bundle.durationMinutes} minutes
        </span>

        <span className="font-semibold">
          ${(bundle.priceCents / 100).toFixed(2)}
        </span>
      </div>
    </article>
  );
}