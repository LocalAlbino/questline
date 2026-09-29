"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { loginSchema, type LoginFormState } from "./schema";
import { auth } from "@/lib/auth";

export async function submitLoginForm(prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const rawEmail = formData.get("email");
  const values = { email: typeof rawEmail === "string" ? rawEmail : "" };
  const validatedFields = loginSchema.safeParse({
    email: rawEmail,
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: z.flattenError(validatedFields.error).fieldErrors, values };
  }

  let emailVerified: boolean;
  try {
    const result = await auth.api.signInEmail({
      body: validatedFields.data,
      headers: await headers(),
    });
    emailVerified = result.user.emailVerified;
  } catch {
    return { errors: { catchAll: ["Incorrect email or password"] }, values };
  }

  redirect(emailVerified ? "/boards" : "/verify");
}
