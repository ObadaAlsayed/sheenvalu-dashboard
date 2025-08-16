import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password is too short"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
