import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

export type ForgotPasswordFormState = {
  success: boolean;
  errors?: Partial<Record<keyof z.infer<typeof forgotPasswordSchema>, string[]>>;
  /** Seconds until another reset link can be requested. */
  retryAfter?: number;
} | null;
