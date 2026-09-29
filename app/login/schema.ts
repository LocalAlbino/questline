import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormState = {
  errors: Partial<Record<keyof z.infer<typeof loginSchema> | "catchAll", string[]>>;
  values: { email: string };
} | null;
