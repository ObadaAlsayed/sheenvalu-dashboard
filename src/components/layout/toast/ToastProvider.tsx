import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, AlertTriangle, Info, Loader2, X } from "lucide-react";

type ToastKind = "success" | "error" | "info" | "loading";
type Toast = {
  id: string;
  kind: ToastKind;
  title: string;
  description?: string;
  duration?: number; 
};
type ToastContextValue = {
  show: (t: Omit<Toast, "id"> & { id?: string }) => string;
  dismiss: (id?: string) => void;       
  update: (id: string, t: Partial<Omit<Toast, "id">>) => void;
  success: (title: string, opts?: Partial<Toast>) => string;
  error: (title: string, opts?: Partial<Toast>) => string;
  info: (title: string, opts?: Partial<Toast>) => string;
  loading: (title: string, opts?: Partial<Toast>) => string;
  promise: <T>(p: Promise<T>, msgs: { loading: string; success: string; error: string }, opts?: Partial<Toast>) => Promise<T>;
};
const ToastCtx = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Record<string, number>>({});

  useEffect(() => () => {
    Object.values(timers.current).forEach((t) => window.clearTimeout(t));
  }, []);

  const dismiss = (id?: string) => {
    if (!id) {
      Object.values(timers.current).forEach((t) => window.clearTimeout(t));
      timers.current = {};
      setToasts([]);
      return;
    }
    window.clearTimeout(timers.current[id]);
    delete timers.current[id];
    setToasts((arr) => arr.filter((t) => t.id !== id));
  };

  const armTimer = (t: Toast) => {
    if (t.kind === "loading") return;
    const dur = t.duration ?? 2500;
    if (dur <= 0) return;
    window.clearTimeout(timers.current[t.id]);
    timers.current[t.id] = window.setTimeout(() => dismiss(t.id), dur);
  };

  const show = (t: Omit<Toast, "id"> & { id?: string }) => {
    const id = t.id ?? Math.random().toString(36).slice(2);
    const toast: Toast = { id, duration: 2500, ...t };
    setToasts((arr) => {
      const next = [...arr, toast];
      return next.slice(-6);
    });
    armTimer(toast);
    return id;
  };

  const update = (id: string, patch: Partial<Omit<Toast, "id">>) => {
    setToasts((arr) => {
      const next = arr.map((t) => (t.id === id ? { ...t, ...patch } : t));
      const current = next.find((t) => t.id === id);
      if (current) armTimer(current);
      return next;
    });
  };

  const success = (title: string, opts: Partial<Toast> = {}) =>
    show({ kind: "success", title, ...opts });
  const error = (title: string, opts: Partial<Toast> = {}) =>
    show({ kind: "error", title, duration: 3500, ...opts });
  const info = (title: string, opts: Partial<Toast> = {}) =>
    show({ kind: "info", title, ...opts });
  const loading = (title: string, opts: Partial<Toast> = {}) =>
    show({ kind: "loading", title, duration: 0, ...opts });

  const promise = async <T,>(
    p: Promise<T>,
    msgs: { loading: string; success: string; error: string },
    opts: Partial<Toast> = {}
  ) => {
    const id = loading(msgs.loading, opts);
    try {
      const res = await p;
      update(id, { kind: "success", title: msgs.success, duration: opts.duration ?? 2000 });
      return res;
    } catch (e) {
      update(id, { kind: "error", title: msgs.error, duration: opts.duration ?? 3500 });
      throw e;
    }
  };

  const value = useMemo<ToastContextValue>(
    () => ({ show, dismiss, update, success, error, info, loading, promise }),
    []
  );

  return (
    <ToastCtx.Provider value={value}>
      {children}
      {createPortal(
        <div className="pointer-events-none fixed inset-0 z-[1000] flex items-end justify-end p-4 sm:p-6">
          <div className="pointer-events-auto flex w-full max-w-sm flex-col gap-2">
            {toasts.map((t) => (
              <ToastCard key={t.id} toast={t} onClose={() => dismiss(t.id)} />
            ))}
          </div>
        </div>,
        document.body
      )}
    </ToastCtx.Provider>
  );
}

function ToastCard({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const { kind, title, description } = toast;
  const Icon =
    kind === "success" ? CheckCircle2 : kind === "error" ? AlertTriangle : kind === "info" ? Info : Loader2;
  const iconCls =
    kind === "success"
      ? "text-green-600"
      : kind === "error"
      ? "text-red-600"
      : kind === "info"
      ? "text-blue-600"
      : "text-orange-500";
  const spin = kind === "loading";

  return (
    <div className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-bottom-4">
      <div className={["mt-0.5", iconCls].join(" ")}>
        <Icon size={18} className={spin ? "animate-spin" : ""} />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-medium text-gray-900">{title}</div>
        {description && <div className="mt-0.5 text-xs text-gray-600">{description}</div>}
      </div>
      <button
        onClick={onClose}
        className="ml-auto inline-flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
        aria-label="Close"
      >
        <X size={14} />
      </button>
    </div>
  );
}
