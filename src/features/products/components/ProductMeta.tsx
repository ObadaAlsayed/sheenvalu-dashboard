type Row = { label: string; value: string | number };

export default function ProductMeta({ rows }: { rows: Row[] }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className=" px-5 py-3">
        <h3 className="text-sm font-semibold">Product Information</h3>
      </div>
      <div className="px-5 py-3">
        <dl className="space-y-2">
          {rows.map((r, i) => (
            <div key={i} className="flex justify-between text-sm">
              <dt className="text-gray-500">{r.label}</dt>
              <dd className="font-medium text-gray-900">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
