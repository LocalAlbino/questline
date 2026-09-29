"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, EMAIL_RATE_LIMIT, getRateLimitedRetryAfter } from "@/lib/auth";
import { getSession } from "@/lib/session";

/** `retryAfter` is how many seconds until another email can be requested. */
export type VerifyFormState = { success: boolean; error?: string; retryAfter?: number } | null;

export async function submitVerifyForm(): Promise<VerifyFormState> {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.user.emailVerified) redirect("/boards");

  try {
    await auth.api.sendVerificationEmail({
      body: { email: session.user.email, callbackURL: "/verify" },
    });
  } catch (error) {
    const retryAfter = getRateLimitedRetryAfter(error);
    if (retryAfter !== null) {
      return { success: false, error: "Too many emails requested. Please wait before trying again.", retryAfter };
    }
    console.error("Verification email failed:", error);
    return { success: false, error: "Failed to send verification email. Please try again." };
  }

  return { success: true, retryAfter: EMAIL_RATE_LIMIT.cooldown };
}

export async function signOutFromVerify() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/login");
}
