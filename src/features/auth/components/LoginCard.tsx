import PasswordInput from "./PasswordInput";
import { useLogin } from "../hooks/useLogin";

export default function LoginCard() {
  const { register, handleSubmit, formState, onSubmit } = useLogin();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <input placeholder="admin@company.com" {...register("email")}
          className="w-full rounded-xl border border-gray-200 px-3 py-2.5 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"/>
        {formState.errors.email && (
          <p className="text-xs text-red-500">{formState.errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Password</label>
        <PasswordInput placeholder="••••••••" {...register("password")} />
        {formState.errors.password && (
          <p className="text-xs text-red-500">{formState.errors.password.message}</p>
        )}
      </div>

      <p className="text-xs text-gray-500">
        Demo: <code>admin@company.com</code> / <code>admin123</code>
      </p>

      <button className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 py-3 text-white shadow-lg">
        Sign In
      </button>
    </form>
  );
}
