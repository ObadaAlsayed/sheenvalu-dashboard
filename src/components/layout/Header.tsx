import { useEffect, useRef, useState } from "react";
import { Menu, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

export default function Header() {
  const [userOpen, setUserOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    navigate("/login", { replace: true }); 
    logout();
  };
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    if (userOpen) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [userOpen]);

  const openSidebarMobile = () =>
    document.dispatchEvent(new CustomEvent("sidebar:open"));

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open menu"
            onClick={openSidebarMobile}
            className="grid h-11 w-11 place-items-center rounded-2xl border-2 border-slate-800/70 text-slate-800 shadow-sm hover:bg-slate-50 md:hidden"
          >
            <Menu size={20} />
          </button>

          <img src="/logo.png" alt="Logo" className="h-6 w-6" />

          <h1 className="text-sm font-semibold text-slate-900 md:text-base">
            Admin Dashboard
          </h1>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setUserOpen((s) => !s)}
            className="flex items-center gap-3 rounded-xl px-1.5 py-1.5 hover:bg-gray-50"
            aria-haspopup="menu"
            aria-expanded={userOpen}
          >
            <div className="grid h-9 w-9 place-items-center rounded-full bg-orange-500 text-white shadow">
              <User size={16} />
            </div>
            <div className="text-left leading-tight">
              <div className="font-semibold text-slate-900">John Admin</div>
              <div className="-mt-0.5 text-xs text-slate-500">
                admin@company.com
              </div>
            </div>
          </button>

          {userOpen && (
            <div
              className="absolute right-0 z-20 mt-2 w-44 rounded-xl bg-white p-1.5 shadow-xl ring-1 ring-black/5"
              role="menu"
            >
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm hover:bg-gray-50"
                role="menuitem"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
