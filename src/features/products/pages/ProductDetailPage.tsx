import { Link, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import ProductImageGallery from "../components/ProductImageGallery";
import ProductMeta from "../components/ProductMeta";
import PoliciesCard from "../components/PoliciesCard";
import Reviews from "../components/Reviews";
import { Package, Star, StarHalf } from "lucide-react";

function Spinner({
  size = 32,
  thickness = 4,
  className = "",
}: {
  size?: number;
  thickness?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-current border-t-transparent text-orange-500 ${className}`}
      style={{ width: size, height: size, borderWidth: thickness }}
      aria-label="Loading"
      role="status"
    />
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const numId = Number(id);
  const { data: product, isLoading, isError, refetch } = useProduct(numId);

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-4">
        <div className="grid place-items-center rounded-2xl bg-white p-10 ring-1 ring-black/5">
          <Spinner />
          <span className="sr-only">Loading product…</span>
        </div>
      </section>
    );
  }

  if (isError || !product) {
    return (
      <div className="rounded-2xl bg-white p-6 ring-1 ring-red-200 text-red-600">
        Failed to load product.
        <button onClick={() => refetch()} className="ml-2 underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl space-y-4 px-4">
      <div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm hover:bg-gray-50"
        >
          ← Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <ProductImageGallery images={product.imageList} />

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-2xl font-semibold">{product.title}</h2>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
                {product.status}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span>{product.brand}</span>
              <span>•</span>
              <span>{product.category}</span>
              {(product as any).sku && (
                <>
                  <span>•</span>
                  <span>SKU: {(product as any).sku}</span>
                </>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <div className="text-xl font-bold text-orange-600">
                ${product.price.toFixed(2)}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Stars value={product.rating ?? 0} />
                  <span className="text-gray-600">
                    {product.rating?.toFixed?.(2) ?? "0.00"} (
                    {(product as any).reviews?.length ?? 0} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-1 text-gray-600">
                  <Package size={16} className="text-gray-500" />
                  <span>{product.stock}</span>
                  <span>in stock</span>
                </div>
              </div>
            </div>

            <div className="my-4 border-t border-gray-200" />
            <h3 className="mb-2 text-sm font-semibold">Description</h3>
            <p className="text-sm leading-6 text-gray-700">
              {product.description}
            </p>
          </div>

          <Reviews
            items={((product as any).reviews ?? []).map(
              (r: any, i: number) => ({
                id: i + 1,
                name: r.reviewerName ?? "User",
                date: new Date(r.date).toDateString(),
                rating: r.rating ?? 0,
                text: r.comment ?? "",
              })
            )}
          />
        </div>

        <div className="space-y-4">
          <ProductMeta
            rows={[
              { label: "Weight", value: `${(product as any).weight ?? "-"}g` },
              { label: "Stock", value: `${product.stock} units` },
              { label: "Category", value: product.category },
            ]}
          />
          <PoliciesCard
            warranty={(product as any).warrantyInformation}
            shipping={(product as any).shippingInformation}
            returns={(product as any).returnPolicy}
          />
        </div>
      </div>
    </section>
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
