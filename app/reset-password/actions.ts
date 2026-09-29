"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { APIError } from "better-auth/api";
import { resetPasswordSchema, type ResetPasswordFormState } from "./schema";
import { auth, PASSWORD_REUSED_CODE } from "@/lib/auth";

export async function submitResetPasswordForm(
  token: string,
  prevState: ResetPasswordFormState,
  formData: FormData,
): Promise<ResetPasswordFormState> {
  const validatedFields = resetPasswordSchema.safeParse({
    newPassword: formData.get("new-password"),
    confirmPassword: formData.get("confirm-password"),
  });

  if (!validatedFields.success) {
    return { errors: z.flattenError(validatedFields.error).fieldErrors };
  }

  try {
    await auth.api.resetPassword({
      body: { newPassword: validatedFields.data.newPassword, token },
    });
  } catch (err) {
    if (err instanceof APIError && err.body?.code === PASSWORD_REUSED_CODE) {
      return { errors: { newPassword: ["New password must be different from your current password"] } };
    }
    return { errors: { token: ["This reset link is invalid or has expired"] } };
  }

  redirect("/login?reset=1");
}
