export type ServiceCategory = 
| "manicure"
| "pedicure"
| "gel"

export type Service = {
    id: string;
    name: string;
    description: string;
    category: ServiceCategory;
    durationMinutes: number; 
    priceCents: number; 
    requiresReview: boolean; 
    acceptsImageUpload: boolean;
    isActive: boolean;
};

export type ServiceBundle = {
    id: string;
    name: string;
    description: string;
    serviceIds: string[];
    durationMinutes: number;
    priceCents: number;
    isActive: boolean;
};

export const services: Service[] = [
    {
        id:"spa-manicure",
        name: "Spa Manicure",
        description: "Classic manicure with regular nail polish.",
        category: "manicure",
        durationMinutes: 30,
        priceCents: 2500,
        requiresReview: false,
        acceptsImageUpload: false,
        isActive: true,
    },
    {
        id:"spa-pedicure",
        name: "Spa Pedicure",
        description: "Classic pedicure with regular nail polish.",
        category: "pedicure",
        durationMinutes: 30,
        priceCents: 40000,
        requiresReview: false,
        acceptsImageUpload: false,
        isActive: true,
    },
    {
    id: "shellac-manicure",
    name: "Shellac Manicure",
    description: "Manicure finished with long-lasting shellac polish.",
    category: "manicure",
    durationMinutes: 60,
    priceCents: 4500,
    requiresReview: false,
    acceptsImageUpload: false,
    isActive: true,
  },
  {
    id: "shellac-pedicure",
    name: "Shellac Pedicure",
    description: "Pedicure finished with long-lasting shellac polish.",
    category: "pedicure",
    durationMinutes: 60,
    priceCents: 5500,
    requiresReview: false,
    acceptsImageUpload: false,
    isActive: true,
  },
{
    id: "gel-overlay-refill",
    name: "Gel Overlay / Refill",
    description: "Structured gel overlay or refill on natural nails.",
    category: "gel",
    durationMinutes: 60,
    priceCents: 6000,
    requiresReview: false,
    acceptsImageUpload: false,
    isActive: true,
  },
  {
    id: "gel-extension",
    name: "Gel Extension",
    description: "Gel nail extensions with structured gel application.",
    category: "gel",
    durationMinutes: 90,
    priceCents: 7500,
    requiresReview: false,
    acceptsImageUpload: false,
    isActive: true,
  },
];


export const serviceBundles: ServiceBundle[] = [
    {id:"regular-mani-pedi",
        name: "Spa Manicure & Pedicure Combo",
        description: "Classic manicure and pedicure with regular nail polish,",
        serviceIds: ["spa-manicure", "spa-pedicure"],
        durationMinutes: 60, 
        priceCents: 5500, 
        isActive: true,
    },
    {
        id:"shellac-mani-pedi",
        name: "Shellac Manicure & Pedicure Combo",
        description: "Shellac manicure and pedicure combination service.",
        serviceIds: ["shellac-manicure", "shellac-pedicure"],
        durationMinutes: 90,
        priceCents: 9000,
        isActive: true,
    },
    {
        id: "shellac-mani-regular-pedi",
        name: "Shellac Manicure & Spa Pedicure Combo",
        description: " Shellac manicure with a classic regular-polish pedicure.",
        serviceIds: ["shellac-manicure", "spa-pedicure"],
        durationMinutes: 90,
        priceCents: 7500,
        isActive: true,
    },
    {
        id: "regular-mani-shellac-pedi",
        name: "Spa Manicure & Shellac Pedicure Combo",
        description: "Classic regular-polish manicure with a shellac pedicure.",
        serviceIds: ["spa-manicure", "shellac-pedicure"],
        durationMinutes: 90,
        priceCents: 7500,
        isActive: true,
    }
];
export type AddonPricingType = 
| "fixed"
| "starting_at"
| "quote";

export type ServiceAddon = {
    id: string;
    name: string;
    description: string;
    eligibleServiceIds: string[];
    pricingType: AddonPricingType;
    priceCents: number | null;
    durationMinutes: number | null;
    requiresReview: boolean;
    requiresImageUpload: boolean;
    isActive: boolean;
};


export const serviceAddons: ServiceAddon[] = [
  {
    id: "french",
    name: "French",
    description: "French tip design applied consistently across the full set.",
    eligibleServiceIds: [
      "shellac-manicure",
      "shellac-pedicure",
      "gel-overlay-refill",
      "gel-extension",
    ],
    pricingType: "fixed",
    priceCents: 1500,
    durationMinutes: 15,
    requiresReview: false,
    requiresImageUpload: false,
    isActive: true,
  },
  {
    id: "cat-eye",
    name: "Cat-eye",
    description: "Cat-eye magnetic polish applied consistently across the full set.",
    eligibleServiceIds: [
      "shellac-manicure",
      "shellac-pedicure",
      "gel-overlay-refill",
      "gel-extension",
    ],
    pricingType: "fixed",
    priceCents: 1000,
    durationMinutes: 10,
    requiresReview: false,
    requiresImageUpload: false,
    isActive: true,
  },
  {
    id: "mixed-custom-design",
    name: "Mixed / Custom Design",
    description: "Custom nail art reviewed and quoted from reference images.",
    eligibleServiceIds: [
      "shellac-manicure",
      "shellac-pedicure",
      "gel-overlay-refill",
      "gel-extension",
    ],
    pricingType: "starting_at",
    priceCents: 1000,
    durationMinutes: 30,
    requiresReview: true,
    requiresImageUpload: true,
    isActive: true,
  },
];
