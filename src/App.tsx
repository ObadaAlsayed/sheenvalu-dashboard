import ToastProvider from "./components/layout/toast/ToastProvider";
import QueryProvider from "./providers/QueryProvider";
import AppRoutes from "./routers";

export default function App() {
  return (
    <QueryProvider>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </QueryProvider>
  );
}
