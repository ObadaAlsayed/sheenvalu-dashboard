import { z } from "zod";
import { PRODUCT_CATEGORIES, PRODUCT_STATUSES, type CreateProductPayload, type UpdateProductPayload } from "../types/product.types";

export const productSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  brand: z.string().min(2, "Brand must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),

  category: z.enum(PRODUCT_CATEGORIES),
  status: z.enum(PRODUCT_STATUSES),

  price: z.number().min(0, { message: "Price must be positive" }),
  stock: z.number().min(0, { message: "Stock must be positive" }),
  rating: z
    .number()
    .min(0, { message: "Rating must be between 0 and 5" })
    .max(5, { message: "Rating must be between 0 and 5" }),

  image: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export const defaultProductValues: ProductFormValues = {
  title: "",
  brand: "",
  description: "",
  category: PRODUCT_CATEGORIES[0],
  status: "In Stock",
  price: 0,
  stock: 0,
  rating: 0,
  image: "",
};

export const toCreatePayload = (
  values: ProductFormValues
): CreateProductPayload => ({
  ...values,
  image: values.image || undefined,
  images: undefined,
  thumbnail: undefined
});

export const toUpdatePayload = (v: ProductFormValues): UpdateProductPayload => ({
  title: v.title,
  brand: v.brand,
  description: v.description,
  category: v.category,
  price: v.price,
  stock: v.stock,
  rating: v.rating,
  status: v.status,
  image: v.image || undefined,
});