import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../schema/login.schema";
import { loginApi } from "../api";
import { useAuthStore } from "../../../store/auth.store";

export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((s) => s.login);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const { token } = await loginApi(values); 
      login(token);

      const redirectTo = (location.state as any)?.from?.pathname || "/products";
      navigate(redirectTo, { replace: true });
    } catch (e: any) {
      const msg = e?.response?.data?.error || "Login failed. Check credentials.";
      form.setError("password", { message: msg });
    }
  };

  return { ...form, onSubmit };
}
