import { X } from "lucide-react";
import type { ProductFormValues } from "../schema/product.schema";
import AddProductForm from "../components/AddProductForm";

export default function AddProductModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="add-product-title">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
          <div className="flex items-start justify-between px-6 pt-5">
            <div>
              <h3 id="add-product-title" className="text-lg font-semibold">Add New Product</h3>
              <p className="text-sm text-gray-500">Fill in the details to create a new product.</p>
            </div>
            <button onClick={onClose} aria-label="Close" className="h-8 w-8 grid place-items-center rounded-lg hover:bg-gray-100">
              <X size={18} />
            </button>
          </div>

          <div className="px-6 pb-6 pt-4">
            <AddProductForm onSubmit={onSubmit} />
            <div className="mt-4 flex items-center justify-end gap-3">
              <button type="button" onClick={onClose} className="rounded-xl border px-4 py-2 text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const form = (document.activeElement as HTMLElement)?.closest("[role='dialog']")?.querySelector("form") as HTMLFormElement | null;
                  form?.requestSubmit();
                }}
                className="rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 px-4 py-2 text-white shadow"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
