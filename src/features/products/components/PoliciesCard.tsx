import { Shield } from "lucide-react";

export default function PoliciesCard({
  warranty,
  shipping,
  returns,
}: {
  warranty: string;
  shipping: string;
  returns: string;
}) {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-center gap-2 px-5 py-3">
        <Shield size={16} className="text-gray-600" />
        <h3 className="text-sm font-semibold">Policies</h3>
      </div>

      <ul className="space-y-3 px-5 py-3 text-sm text-gray-700">
        <li>
          <span className="font-medium">Warranty</span>
          <br />
          {warranty || "-"}
        </li>
        <li>
          <span className="font-medium">Shipping</span>
          <br />
          {shipping || "-"}
        </li>
        <li>
          <span className="font-medium">Returns</span>
          <br />
          {returns || "-"}
        </li>
      </ul>
    </div>
  );
}
