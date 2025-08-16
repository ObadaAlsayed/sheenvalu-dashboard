import { useQuery } from "@tanstack/react-query";
import { listProducts, searchProducts } from "../api";

export function useProductsQuery(q: string, page: number, limit: number) {
  const skip = (page - 1) * limit;

  return useQuery({
    queryKey: ["products", q, page, limit],
    queryFn: () =>
      q?.trim()
        ? searchProducts(q.trim(), { limit, skip }) 
        : listProducts({ limit, skip }),            
    select: (res) => ({
      items: res.products,
      total: res.total,
    }),
  });
}
