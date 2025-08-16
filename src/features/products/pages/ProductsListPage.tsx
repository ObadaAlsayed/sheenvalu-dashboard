import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductFilters from "../components/ProductFilters";
import ProductTable from "../components/ProductTable";
import { useProductsQuery } from "../hooks/useProductsQuery";
import AddProductModal from "../modals/AddProductModal";
import {
  toCreatePayload,
  toUpdatePayload,
  type ProductFormValues,
} from "../schema/product.schema";
import {
  useCreateProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "../hooks/useProductMutations";
import EditProductModal from "../modals/EditProductModal";
import DeleteProductModal from "../modals/DeleteProductModal";
import PaginationBar from "../components/PaginationBar";
import { normalizeCategory } from "../types/product.types";
import { useToast } from "../../../components/layout/toast/ToastProvider";

function Spinner({
  size = 24,
  thickness = 3,
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

export default function ProductsListPage() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [openAdd, setOpenAdd] = useState(false);
  const { mutateAsync: createAsync, isPending: creating } = useCreateProduct();
  const [selected, setSelected] = useState<any | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [limit, setLimit] = useState(10);
  const updateMut = useUpdateProduct(selected?.id || 0);
  const updating = updateMut.isPending;
  const toast = useToast();

  const { data, isLoading, isError, refetch } = useProductsQuery(
    q,
    page,
    limit
  );
  const { mutateAsync: deleteAsync, isPending: deleting } = useDeleteProduct();

  const navigate = useNavigate();

  const items = data?.items ?? [];
  const total = data?.total ?? 0;

  return (
    <section className="space-y-4">
      <ProductFilters
        total={total}
        view="list"
        onQueryChange={(val) => {
          if (val !== q) {
            setPage(1);
            setQ(val);
          } else {
            setQ(val);
          }
        }}
        onAdd={() => setOpenAdd(true)}
        onOpenFilters={() => console.log("open filters")}
      />

      {!isLoading && !isError && items.length > 0 && (
        <>
          <ProductTable
            rows={(items ?? []).map((p) => ({
              id: p.id,
              title: p.title,
              subtitle: p.description,
              brand: p.brand,
              category: p.category,
              price: p.price,
              rating: p.rating,
              stock: p.stock,
              status: p.stock <= 20 ? "Low Stock" : "In Stock",
              imageUrl: p.thumbnail || p.images?.[0] || "",
            }))}
            onView={(id) => navigate(`/products/${id}`)}
            onEdit={(id) => {
              const p = items.find((x) => x.id === id);
              if (!p) return;
              const initial: ProductFormValues = {
                title: p.title,
                brand: p.brand,
                description: p.description,
                category: normalizeCategory(p.category),
                price: p.price,
                stock: p.stock,
                rating: p.rating,
                status: p.stock <= 20 ? "Low Stock" : "In Stock",
                image: p.thumbnail || p.images?.[0] || "",
              };
              setSelected({ id: p.id, initial });
              setOpenEdit(true);
            }}
            onDelete={(id) => {
              const p = items.find((x) => x.id === id);
              if (!p) return;
              setSelected({ id: p.id, title: p.title, brand: p.brand });
              setOpenDelete(true);
            }}
          />

          <PaginationBar
            total={total}
            page={page}
            limit={limit}
            onPageChange={(p) => setPage(p)}
            onLimitChange={(l) => {
              setLimit(l);
              setPage(1);
            }}
          />
        </>
      )}

      <AddProductModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSubmit={async (values: ProductFormValues) => {
          try {
            await toast.promise(createAsync(toCreatePayload(values)), {
              loading: "Adding product…",
              success: "Product added successfully",
              error: "Failed to add product",
            });
            setOpenAdd(false);
            refetch();
          } catch (e) {
          }
        }}
      />

      <DeleteProductModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        productName={selected?.title || ""}
        productBrand={selected?.brand || ""}
        loading={deleting}
        onConfirm={async () => {
          if (!selected) return;
          try {
            await toast.promise(deleteAsync(selected.id), {
              loading: "Deleting product…",
              success: "Product deleted",
              error: "Failed to delete product",
            });
            setOpenDelete(false);
            refetch();
          } catch {}
        }}
      />

      {selected && (
        <EditProductModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          initialValues={selected.initial}
          onSubmit={async (values) => {
            try {
              await toast.promise(
                updateMut.mutateAsync(toUpdatePayload(values)),
                {
                  loading: "Saving changes…",
                  success: "Product updated",
                  error: "Failed to update product",
                }
              );
              setOpenEdit(false);
              refetch();
            } catch {}
          }}
        />
      )}

      {isLoading && (
        <div className="grid place-items-center rounded-2xl bg-white p-10 ring-1 ring-black/5">
          <Spinner size={32} thickness={4} />
          <span className="sr-only">Loading products…</span>
        </div>
      )}

      {isError && (
        <div className="rounded-2xl bg-white p-6 text-center ring-1 ring-red-200 text-red-600">
          Failed to load products.
          <button onClick={() => refetch()} className="ml-2 underline">
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && items.length === 0 && (
        <div className="grid place-items-center rounded-2xl bg-white p-10 ring-1 ring-black/5">
          No products found.
        </div>
      )}

     
    </section>
  );
}
