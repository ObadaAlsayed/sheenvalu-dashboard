import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutGrid },
  { to: "/products", label: "Products", icon: Package },
  { to: "/orders", label: "Orders", icon: ShoppingCart },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const open = () => setMobileOpen(true);
    const close = () => setMobileOpen(false);
    const toggle = () => setMobileOpen((s) => !s);
    document.addEventListener("sidebar:open", open);
    document.addEventListener("sidebar:close", close);
    document.addEventListener("sidebar:toggle", toggle);
    return () => {
      document.removeEventListener("sidebar:open", open);
      document.removeEventListener("sidebar:close", close);
      document.removeEventListener("sidebar:toggle", toggle);
    };
  }, []);

  const List = (
    <div className="px-3 pb-3">
      <nav className="mt-2 flex flex-col gap-2 text-gray-300">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            title={label}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              [
                collapsed
                  ? "mx-auto inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  : "flex w-full items-center gap-3 rounded-2xl px-3 py-2",
                isActive ? "bg-orange-500 text-white shadow-sm" : "hover:bg-white/10",
                "transition",
              ].join(" ")
            }
            end={to === "/"}
          >
            <Icon size={18} />
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      <aside
        className={`hidden md:flex md:sticky md:top-0 md:h-[100dvh] flex-col bg-[#0F172A] text-white transition-all duration-300 ${
          collapsed ? "md:w-20" : "md:w-64"
        }`}
      >
        <div className="flex items-center justify-between px-3 pt-3 pb-2">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-yellow-400 shadow">
              <span className="font-bold">A</span>
            </div>
            {!collapsed && (
              <div className="hidden flex-col leading-tight md:flex">
                <span className="font-semibold">Admin</span>
                <span className="text-xs text-gray-400">Dashboard</span>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed((v) => !v)}
            className="hidden md:grid h-8 w-8 place-items-center rounded-md hover:bg-white/10"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {List}
      </aside>

      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/50 transition-opacity ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />
      <div
        className={`md:hidden fixed left-0 top-0 z-50 h-[100dvh] w-72 bg-[#0F172A] text-white shadow-2xl transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-yellow-400">
              <span className="font-bold">A</span>
            </div>
            <div className="font-semibold">Admin</div>
          </div>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {List}
      </div>
    </>
  );
}
