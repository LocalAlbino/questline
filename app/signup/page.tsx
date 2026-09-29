import { redirectIfSignedIn } from "@/lib/session";
import { SignupForm } from "./SignupForm";

export default async function SignupPage() {
  await redirectIfSignedIn();
  return <SignupForm />;
}
