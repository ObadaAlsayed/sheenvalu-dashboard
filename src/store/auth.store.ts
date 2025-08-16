import { create } from "zustand";

const COOKIE_NAME = "token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; 

function setCookie(name: string, value: string, maxAgeSec?: number) {
  let c = `${name}=${encodeURIComponent(value)}; Path=/; SameSite=Lax`;
  if (typeof maxAgeSec === "number") c += `; Max-Age=${maxAgeSec}`;
  if (typeof window !== "undefined" && location.protocol === "https:") c += "; Secure";
  document.cookie = c;
}

function getCookie(name: string): string | null {
  const m = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + "=([^;]*)")
  );
  return m ? decodeURIComponent(m[1]) : null;
}

function deleteCookie(name: string) {
  let c = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
  if (typeof window !== "undefined" && location.protocol === "https:") c += "; Secure";
  document.cookie = c;
}

type AuthState = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: getCookie(COOKIE_NAME),
  login: (token) => {
    try { localStorage.removeItem("token"); } catch {}
    setCookie(COOKIE_NAME, token, COOKIE_MAX_AGE);
    set({ token });
  },
  logout: () => {
    deleteCookie(COOKIE_NAME);
    try { localStorage.removeItem("token"); } catch {}
    set({ token: null });
  },
}));
