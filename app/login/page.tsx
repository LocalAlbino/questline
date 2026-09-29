import { redirectIfSignedIn } from "@/lib/session";
import { LoginForm } from "./LoginForm";

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  await redirectIfSignedIn();
  const { reset } = await searchParams;

  return <LoginForm passwordReset={reset === "1"} />;
}
