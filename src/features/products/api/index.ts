import { API } from "../../../lib/constants";
import http from "../../../lib/http";
import type {
  CreateProductPayload,
  Product,
  ProductsListResponse,
  UpdateProductPayload,
} from "../types/product.types";
export async function listProducts(opts?: { limit?: number; skip?: number }) {
  const { limit = 10, skip = 0 } = opts || {};
  const { data } = await http.get<ProductsListResponse>(API.PRODUCTS.ROOT, {
    params: { limit, skip },
  });
  return data;
}

export async function createProduct(
  payload: CreateProductPayload
): Promise<Product> {
  const { data } = await http.post<Product>(API.PRODUCTS.ADD, payload);
  return data;
}

export async function updateProduct(
  id: number,
  payload: UpdateProductPayload
): Promise<Product> {
  const { data } = await http.put<Product>(API.PRODUCTS.UPDATE(id), payload);
  return data;
}

export async function getProduct(id: number | string): Promise<Product> {
  const { data } = await http.get<Product>(API.PRODUCTS.DETAIL(id));
  return data;
}

export async function deleteProduct(id: number | string) {
  const { data } = await http.delete(`/products/${id}`);
  return data;
}
export async function searchProducts(q: string, opts?: { limit?: number; skip?: number }) {
  const { limit = 10, skip = 0 } = opts || {};
  const { data } = await http.get<ProductsListResponse>(`${API.PRODUCTS.ROOT}/search`, {
    params: { q, limit, skip },
  });
  return data;
}