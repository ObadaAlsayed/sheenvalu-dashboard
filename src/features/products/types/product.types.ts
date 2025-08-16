export type ProductStatus = "In Stock" | "Low Stock" | "Out of Stock";

export type Product = {
  images: any;
  thumbnail: any;
  id: number;
  title: string;
  brand: string;
  description: string;
  category: string;
  price: number;        
  stock: number;        
  rating: number;       
  image?: string;       
  status: ProductStatus;
};

export type CreateProductPayload = Omit<Product, "id">;
export type UpdateProductPayload = Partial<Omit<Product, "id">>;

export type ProductsListResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export const PRODUCT_STATUSES: ProductStatus[] = [
  "In Stock",
  "Low Stock",
  "Out of Stock",
];

export const PRODUCT_CATEGORIES = [
  "Beauty",
  "Fragrances",
  "Skincare",
  "Makeup",
  "Hair",
  "Other",
] as const;


export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
export function normalizeCategory(cat: string): ProductCategory {
  const c = (cat || "").trim().toLowerCase();
  switch (c) {
    case "beauty": return "Beauty";
    case "fragrances":
    case "fragrance": return "Fragrances";
    case "skincare":
    case "skin care": return "Skincare";
    case "makeup": return "Makeup";
    case "hair": return "Hair";
    default: return "Other";
  }
}