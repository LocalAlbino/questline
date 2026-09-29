"use server";

import { z } from "zod";
import { forgotPasswordSchema, type ForgotPasswordFormState } from "./schema";
import { auth, EMAIL_RATE_LIMIT, getRateLimitedRetryAfter } from "@/lib/auth";

export async function submitForgotPasswordForm(
  prevState: ForgotPasswordFormState,
  formData: FormData,
): Promise<ForgotPasswordFormState> {
  const validatedFields = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return { success: false, errors: z.flattenError(validatedFields.error).fieldErrors };
  }

  try {
    await auth.api.requestPasswordReset({
      body: { email: validatedFields.data.email, redirectTo: "/reset-password" },
    });
  } catch (error) {
    // The limit applies whether or not an account exists, so reporting it doesn't reveal anything.
    const retryAfter = getRateLimitedRetryAfter(error);
    if (retryAfter !== null) {
      return {
        success: false,
        errors: { email: ["Too many reset links requested for this email. Please wait before trying again."] },
        retryAfter,
      };
    }
    // Still report success so the response doesn't reveal whether an account exists.
    console.error("Password reset request failed:", error);
  }

  return { success: true, retryAfter: EMAIL_RATE_LIMIT.cooldown };
}
