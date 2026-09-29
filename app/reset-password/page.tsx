import { redirectIfSignedIn } from "@/lib/session";
import { AuthLayout } from "@/ui/components/AuthLayout";
import { LinkButton } from "@/ui/components/LinkButton";
import { ResetPasswordForm } from "./ResetPasswordForm";

export default async function ResetPasswordPage({ searchParams }: PageProps<"/reset-password">) {
  // Better Auth sends expired or invalid links here with ?error=INVALID_TOKEN instead of a token.
  const { token, error } = await searchParams;

  if (typeof token !== "string" || token === "" || error) {
    await redirectIfSignedIn();

    return (
      <AuthLayout title="Reset password">
        <div className="flex flex-col gap-4">
          <span className="text-zinc-600">This reset link is invalid or has expired.</span>
          <LinkButton href="/forgot-password">Request a new link</LinkButton>
        </div>
      </AuthLayout>
    );
  }

  return <ResetPasswordForm token={token} />;
}
