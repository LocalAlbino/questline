import { redirectIfSignedIn } from "@/lib/session";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export default async function ForgotPasswordPage() {
  await redirectIfSignedIn();
  return <ForgotPasswordForm />;
}
