"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { APIError } from "better-auth/api";
import { signupSchema, type SignupFormState } from "./schema";
import { auth, USER_EXISTS_CODE } from "@/lib/auth";

export async function submitSignupForm(prevState: SignupFormState, formData: FormData): Promise<SignupFormState> {
  const rawEmail = formData.get("email");
  const values = { email: typeof rawEmail === "string" ? rawEmail : "" };
  const validatedFields = signupSchema.safeParse({
    email: rawEmail,
    password: formData.get("password"),
    confirmPassword: formData.get("confirm-password"),
  });

  if (!validatedFields.success) {
    return { errors: z.flattenError(validatedFields.error).fieldErrors, values };
  }

  const { email, password } = validatedFields.data;
  try {
    await auth.api.signUpEmail({
      body: { name: email, email, password, callbackURL: "/verify" },
      headers: await headers(),
    });
  } catch (err) {
    const message =
      err instanceof APIError && err.body?.code === USER_EXISTS_CODE
        ? "This email address is already in use"
        : "Failed to create account";
    return { errors: { catchAll: [message] }, values };
  }

  redirect("/verify");
}
