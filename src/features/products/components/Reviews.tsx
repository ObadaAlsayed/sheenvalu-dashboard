import { Star, StarHalf } from "lucide-react";

type Review = {
  id: number;
  name: string;
  date: string; 
  rating: number; 
  text: string;
};

export default function Reviews({ items }: { items: Review[] }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-center gap-2 border-b px-6 py-4">
        <h3 className="text-xl font-semibold">Customer Reviews</h3>
        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
          {items.length}
        </span>
      </div>

      <ul className="divide-y divide-gray-200">
        {items.map((r) => (
          <li key={r.id} className="px-6 py-5">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-orange-500 text-sm font-semibold text-white">
                {r.name
                  .split(" ")
                  .map((w) => w[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="font-semibold text-gray-900">{r.name}</div>
                  <Stars value={r.rating} />
                  <div className="text-xs text-gray-500">{r.date}</div>
                </div>

                <p className="mt-2 text-sm text-gray-700">{r.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) {
          return (
            <Star
              key={i}
              size={16}
              className="text-yellow-400"
              style={{ fill: "rgb(250 204 21)" }}
            />
          );
        }
        if (i === full && half) {
          return (
            <StarHalf
              key={i}
              size={16}
              className="text-yellow-400"
              style={{ fill: "rgb(250 204 21)" }}
            />
          );
        }
        return <Star key={i} size={16} className="text-gray-300" />;
      })}
    </div>
  );
}
