import { REQRES_LOGIN } from "../../../lib/constants";
import type { LoginPayload, LoginResponse } from "../types/auth.types";

export async function loginApi(body: LoginPayload): Promise<LoginResponse> {
  const res = await fetch(REQRES_LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json",
      "x-api-key":"reqres-free-v1"
     },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || "Login failed");
  }
  return data as LoginResponse; 
}
