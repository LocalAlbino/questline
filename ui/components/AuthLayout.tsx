import type { PropsWithChildren } from "react";

export function AuthLayout({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <main className="m-8 flex flex-col gap-8 lg:mx-96">
      <h1 className="text-center text-lg">{title}</h1>
      {children}
    </main>
  );
}
