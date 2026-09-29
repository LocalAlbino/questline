import { z } from "zod";
import { passwordSchema } from "@/lib/validation";

export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormState = {
  errors: Partial<Record<keyof z.infer<typeof resetPasswordSchema> | "token", string[]>>;
} | null;
