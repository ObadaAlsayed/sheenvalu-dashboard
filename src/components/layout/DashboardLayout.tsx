import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Header />
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
