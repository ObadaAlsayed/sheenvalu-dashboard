export const REQRES_LOGIN = "https://reqres.in/api/login";
export const API_BASE_URL = "https://dummyjson.com/";
export const API = {
  PRODUCTS: {
    ROOT: "/products",
    ADD: "/products/add",
    UPDATE: (id: number | string) => `/products/${id}`,
    DETAIL: (id: number | string) => `/products/${id}`
  },
};
