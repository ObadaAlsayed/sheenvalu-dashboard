import { Eye, Edit, Trash2, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ProductRow = {
  id: number;
  title: string;
  subtitle?: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  status?: "Low Stock" | "In Stock";
  imageUrl?: string;
};

export default function ProductTable({
  rows,
  onView,
  onEdit,
  onDelete,
}: {
  rows: ProductRow[];
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const placeholder =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='100%' height='100%' fill='#f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-size='10'>no img</text></svg>`
    );

  function StatusBadge({ status }: { status?: "Low Stock" | "In Stock" }) {
    const base =
      "inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold";
    const cls =
      status === "Low Stock"
        ? "bg-blue-100 text-blue-700"
        : "bg-orange-500 text-white";
    return <span className={`${base} ${cls}`}>{status}</span>;
  }

  const navigate = useNavigate();

  return (
    <div className="relative rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="overflow-x-auto scroll-smooth">
        <table className="w-full min-w-[900px] text-sm md:min-w-0">
          <thead className="bg-gray-50 text-gray-600">
            <tr className="text-left">
              <th className="whitespace-nowrap px-3 py-2 sm:px-4 sm:py-3">
                Image
              </th>
              <th className="whitespace-nowrap px-3 py-2 sm:px-4 sm:py-3">
                Product
              </th>
              <th className="whitespace-nowrap px-3 py-2 sm:px-4 sm:py-3 hidden md:table-cell">
                Brand
              </th>
              <th className="whitespace-nowrap px-3 py-2 sm:px-4 sm:py-3 hidden md:table-cell">
                Category
              </th>
              <th className="whitespace-nowrap px-3 py-2 sm:px-4 sm:py-3">
                Price
              </th>
              <th className="whitespace-nowrap px-3 py-2 sm:px-4 sm:py-3 hidden md:table-cell">
                Rating
              </th>
              <th className="whitespace-nowrap px-3 py-2 sm:px-4 sm:py-3">
                Stock
              </th>
              <th className="whitespace-nowrap px-3 py-2 sm:px-4 sm:py-3">
                Status
              </th>
              <th className="whitespace-nowrap px-3 py-2 sm:px-4 sm:py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-t border-gray-100 hover:bg-gray-50/60"
              >
                <td className="px-3 py-2 sm:px-4 sm:py-3">
                  <img
                    src={r.imageUrl || placeholder}
                    onError={(e) => (e.currentTarget.src = placeholder)}
                    alt={r.title}
                    className="h-9 w-9 rounded-lg bg-gray-100 object-cover sm:h-10 sm:w-10"
                  />
                </td>

                <td className="px-3 py-2 sm:px-4 sm:py-3">
                  <div className="font-medium text-gray-900">{r.title}</div>
                  <div className="line-clamp-1 text-xs text-gray-500">
                    {r.subtitle}
                  </div>
                </td>

                <td className="hidden px-3 py-2 text-gray-700 md:table-cell sm:px-4 sm:py-3">
                  {r.brand}
                </td>

                <td className="hidden px-3 py-2 sm:px-4 sm:py-3 md:table-cell">
                  <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700">
                    {r.category}
                  </span>
                </td>

                <td className="px-3 py-2 font-semibold text-orange-600 sm:px-4 sm:py-3">
                  ${r.price.toFixed(2)}
                </td>

                <td className="hidden px-3 py-2 sm:px-4 sm:py-3 md:table-cell">
                  <Stars value={r.rating} />
                </td>

                <td className="px-3 py-2 sm:px-4 sm:py-3">
                  <span className="inline-flex items-center gap-1.5 text-gray-700">
                    <Package size={14} className="text-gray-400" />
                    <span className="font-medium">{r.stock}</span>
                  </span>
                </td>

                <td className="px-3 py-2 sm:px-4 sm:py-3">
                  <StatusBadge status={r.status} />
                </td>

                <td className="px-3 py-2 sm:px-4 sm:py-3">
                  <div className="flex items-center justify-end gap-3 text-gray-500">
                    <button
                      title="View"
                      className="hover:text-gray-700"
                      onClick={() => {
                        onView?.(r.id);
                        navigate(`/products/${r.id}`);
                      }}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      title="Edit"
                      className="hover:text-gray-700"
                      onClick={() => onEdit?.(r.id)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      title="Delete"
                      className="hover:text-red-600"
                      onClick={() => onDelete(r.id)}
                    >
                      <Trash2 className="text-red-500" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-white to-transparent md:hidden" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-white to-transparent md:hidden" />
    </div>
  );
}

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5 text-yellow-500">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) return <span key={i}>★</span>;
        if (i === full && half) return <span key={i}>☆</span>;
        return (
          <span key={i} className="text-gray-300">
            ★
          </span>
        );
      })}
      <span className="ml-1 text-xs text-gray-500">{value.toFixed(1)}</span>
    </div>
  );
}
