import { X } from "lucide-react";
import AddProductForm from "../components/AddProductForm";
import type { ProductFormValues } from "../schema/product.schema";

export default function EditProductModal({
  open, onClose, initialValues, onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  initialValues: ProductFormValues;
  onSubmit: (values: ProductFormValues) => void;
}) {
  if (!open) return null;

  const submitInner = (btn: HTMLElement | null) => {
    const dlg = btn?.closest("[role='dialog']");
    const form = dlg?.querySelector("form") as HTMLFormElement | null;
    form?.requestSubmit();
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="edit-product-title">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
          <div className="flex items-start justify-between px-6 pt-5">
            <div>
              <h3 id="edit-product-title" className="text-lg font-semibold">Edit Product</h3>
              <p className="text-sm text-gray-500">Update the product details.</p>
            </div>
            <button onClick={onClose} className="h-8 w-8 grid place-items-center rounded-lg hover:bg-gray-100" aria-label="Close">
              <X size={18} />
            </button>
          </div>

          <div className="px-6 pb-6 pt-4">
            <AddProductForm defaultValues={initialValues} onSubmit={onSubmit} />
            <div className="mt-4 flex items-center justify-end gap-3">
              <button type="button" onClick={onClose} className="rounded-xl border px-4 py-2 text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button
                type="button"
                onClick={(e) => submitInner(e.currentTarget as HTMLElement)}
                className="rounded-xl bg-orange-500 px-4 py-2 text-white shadow"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
