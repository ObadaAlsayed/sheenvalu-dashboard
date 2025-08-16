import { useLogin } from "../hooks/useLogin";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react"; 

export default function LoginPage() {
  const { register, handleSubmit, formState, onSubmit } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-50 grid place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5">
        <div className="flex flex-col items-center text-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-14 w-14 rounded-2xl shadow-lg mb-4"
          />
          <h1 className="text-2xl font-semibold text-gray-900">Welcome Back</h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to access your admin dashboard
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
          noValidate
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="eve.holt@reqres.in"
              {...register("email")}
              className="input"
            />
            {formState.errors.email && (
              <p className="text-sm text-red-600">
                {formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="cityslicka"
                {...register("password")}
                className="input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff size={18} strokeWidth={1.5} />
                ) : (
                  <Eye size={18} strokeWidth={1.5} />
                )}
              </button>
            </div>
            {formState.errors.password && (
              <p className="text-sm text-red-600">
                {formState.errors.password.message}
              </p>
            )}
          </div>

          <p className="text-xs text-gray-500">
            Demo (Reqres):{" "}
            <code className="font-mono">eve.holt@reqres.in</code> /{" "}
            <code className="font-mono">cityslicka</code>
          </p>

          <button
            disabled={formState.isSubmitting}
            aria-busy={formState.isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 py-3 text-white shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {formState.isSubmitting ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
