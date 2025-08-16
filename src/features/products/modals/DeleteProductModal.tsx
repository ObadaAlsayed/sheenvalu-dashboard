import { X, AlertTriangle, Loader2 } from "lucide-react";

type DeleteProductModalProps = {
  open: boolean;
  onClose: () => void;
  productName: string;
  productBrand: string;
  loading?: boolean;
  onConfirm: () => void;
};

export default function DeleteProductModal({
  open,
  onClose,
  productName,
  productBrand,
  loading = false,
  onConfirm,
}: DeleteProductModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-title"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
          <div className="flex items-start justify-between px-6 pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-500 mt-1 shrink-0" size={22} />
              <div>
                <h3 id="delete-title" className="text-lg font-semibold">
                  Delete Product
                </h3>
                <p className="text-sm text-gray-500">
                  This action cannot be undone. The product will be permanently
                  removed from your inventory.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="grid h-8 w-8 place-items-center rounded-lg text-gray-500 hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-6 py-4">
            <div className="flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertTriangle className="mt-0.5 shrink-0" size={18} />
              <p>
                Are you sure you want to delete{" "}
                <span className="font-semibold">{productName}</span> by{" "}
                <span className="font-semibold">{productBrand}</span>?
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 px-6 pb-5">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600 disabled:opacity-60"
            >
              {loading && <Loader2 className="animate-spin" size={16} />}
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
