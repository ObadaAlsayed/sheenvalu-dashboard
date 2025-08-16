import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api";
import type { Product } from "../types/product.types";

export function useProduct(id?: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id as number),
    enabled: !!id,
    select: (p: Product) => ({
      ...p,
      imageList: p.images ?? (p.thumbnail ? [p.thumbnail] : []),
      status: (p as any).availabilityStatus ?? (p.stock <= 20 ? "Low Stock" : "In Stock"),
    }),
  });
}
