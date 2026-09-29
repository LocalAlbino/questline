import { z } from "zod";
import { passwordSchema } from "@/lib/validation";

export const signupSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormState = {
  errors: Partial<Record<keyof z.infer<typeof signupSchema> | "catchAll", string[]>>;
  values: { email: string };
} | null;
