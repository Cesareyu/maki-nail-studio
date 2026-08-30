export type GalleryCategory =
  | "manicure"
  | "pedicure"
  | "gel"
  | "custom-design";

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  category: GalleryCategory;
  serviceId: string | null;
  isFeatured: boolean;
  isPublished: boolean;
};

export const galleryItems: GalleryItem[] = [];
