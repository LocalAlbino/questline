import { redirect } from "next/navigation";
import { getEmailRetryAfter } from "@/lib/auth";
import { getSession } from "@/lib/session";
import { VerifyForm } from "./VerifyForm";

export default async function VerifyPage({ searchParams }: PageProps<"/verify">) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.user.emailVerified) redirect("/boards");

  // Better Auth sends failed verification links back here with ?error=<code>.
  const { error } = await searchParams;
  // Picks up an active cooldown so refreshing the page doesn't reset the resend button.
  const retryAfter = await getEmailRetryAfter("/send-verification-email", session.user.email);

  return <VerifyForm email={session.user.email} linkInvalid={Boolean(error)} retryAfter={retryAfter} />;
}
