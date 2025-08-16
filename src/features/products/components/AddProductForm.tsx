import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productSchema,
  defaultProductValues,
  type ProductFormValues,
} from "../schema/product.schema";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_STATUSES,
} from "../types/product.types";

export default function AddProductForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: { ...defaultProductValues, ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Product Title *" error={errors.title?.message}>
          <input {...register("title")} placeholder="Enter product title" className="input" />
        </Field>
        <Field label="Brand *" error={errors.brand?.message}>
          <input {...register("brand")} placeholder="Enter brand name" className="input" />
        </Field>
      </div>

      <Field label="Description *" error={errors.description?.message}>
        <textarea {...register("description")} placeholder="Enter product description" rows={3} className="input" />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Category *" error={errors.category?.message}>
          <select {...register("category")} className="input">
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Availability Status">
          <select {...register("status")} className="input">
            {PRODUCT_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Price ($) *" error={errors.price?.message}>
          <input
          
          type="number" step="0.01" {...register("price", { valueAsNumber: true })} className="input" />
        </Field>
        <Field label="Stock Quantity *" error={errors.stock?.message}>
          <input type="number" {...register("stock", { valueAsNumber: true })} className="input" />
        </Field>
        <Field label="Rating (0–5)" error={errors.rating?.message}>
          <input type="number" step="any" {...register("rating", { valueAsNumber: true })} className="input" />
        </Field>
      </div>

      <Field label="Product Image URL" error={errors.image?.message}>
        <input {...register("image")} placeholder="https://example.com/image.jpg" className="input" />
      </Field>

      <div className="sr-only">
        <button type="submit">submit</button>
      </div>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 text-sm font-medium text-gray-700">{label}</div>
      {children}
      {error && <div className="mt-1 text-sm text-red-600">{error}</div>}
    </label>
  );
}
