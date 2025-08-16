import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  total: number; 
  page: number; 
  limit: number; 
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

export default function PaginationBar({
  total,
  page,
  limit,
  onPageChange,
  onLimitChange,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(total, page * limit);

  const goFirst = () => onPageChange(1);
  const goPrev = () => onPageChange(Math.max(1, page - 1));
  const goNext = () => onPageChange(Math.min(totalPages, page + 1));
  const goLast = () => onPageChange(totalPages);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-4">
      <div className="text-sm text-gray-600">
        {start}–{end} of {total}
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <span>Rows per page:</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="rounded-xl border px-3 py-1.5 bg-white"
        >
          {[10, 20, 30, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goFirst}
            disabled={page === 1}
            className="rounded-xl  px-3 py-1.5 text-sm disabled:opacity-50"
          >
            First
          </button>
          <button
            onClick={goPrev}
            disabled={page === 1}
            className="rounded-xl  px-2 py-1.5 disabled:opacity-50"
            aria-label="Previous"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="rounded-xl bg-orange-500 px-3 py-1.5 text-white text-sm">
            {page}
          </span>
          <button
            onClick={goNext}
            disabled={page >= totalPages}
            className="rounded-xl px-2 py-1.5 disabled:opacity-50"
            aria-label="Next"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={goLast}
            disabled={page >= totalPages}
            className="rounded-xl px-3 py-1.5 text-sm disabled:opacity-50"
          >
            Last
          </button>
        </div>
    </div>
  );
}
