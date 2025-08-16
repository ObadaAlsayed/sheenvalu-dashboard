import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProductsListPage from "./features/products/pages/ProductsListPage";
import ProductDetailPage from "./features/products/pages/ProductDetailPage";

function NotFound() {
  return <div className="p-8 text-center">404 — Page not found</div>;
}

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <ProductsListPage /> },
      { path: "products", element: <ProductsListPage /> },
      { path: "products/:id", element: <ProductDetailPage /> }

    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
