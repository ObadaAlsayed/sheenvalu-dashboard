import { useEffect, useRef, useState } from "react";
import { Grid as GridIcon, List, Filter, Search, Plus } from "lucide-react";

type Props = {
  total?: number;
  view?: "list" | "grid";
  onViewChange?: (v: "list" | "grid") => void;
  onAdd?: () => void;
  onOpenFilters?: () => void;
  onQueryChange?: (q: string) => void;
  debounceMs?: number;
};

export default function ProductFilters({
  total = 6,
  view = "list",
  onViewChange,
  onAdd,
  onOpenFilters,
  onQueryChange,
  debounceMs = 400,
}: Props) {
  const [q, setQ] = useState("");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!onQueryChange) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      onQueryChange(q.trim());
    }, debounceMs);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [q, debounceMs, onQueryChange]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (timerRef.current) window.clearTimeout(timerRef.current);
    onQueryChange?.(q.trim());
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Products</h2>
          <p className="text-gray-500">Manage your product inventory ({total} products)</p>
        </div>

        <div className="flex items-center gap-2">
        <div className="inline-flex border border-gray-200 rounded-2xl overflow-hidden">
  <button
    type="button"
    onClick={() => onViewChange?.("grid")}
    aria-pressed={view === "grid"}
    className={`h-10 w-10 grid place-items-center transition 
      ${view === "grid"
        ? "bg-white text-gray-900"
        : "bg-gray-100 text-gray-600 hover:text-gray-800"}`}
    title="Grid"
  >
    <GridIcon size={18} />
  </button>

  <button
    type="button"
    onClick={() => onViewChange?.("list")}
    aria-pressed={view === "list"}
    className={`h-10 w-10 grid place-items-center transition 
      ${view === "list"
        ? "bg-orange-500 text-white"
        : "bg-gray-100 text-gray-600 hover:text-gray-800"}`}
    title="List"
  >
    <List size={18} />
  </button>
</div>

          <button
            type="button"
            onClick={() => onAdd?.()}
            className="rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 text-sm inline-flex items-center gap-2 shadow"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products by title or brand..."
            className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 py-2.5 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            aria-label="Search products"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </form>

      <div>
        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex bg-white items-center border border-gray-200 gap-2 rounded-md px-3 py-2 text-sm text-black-900 hover:bg-gray-50"
        >
          <Filter size={16} />
          Filters
        </button>
      </div>
    </div>
  );
}
