import type { PropsWithChildren } from "react";

export function FormLayout({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <main className="m-8 flex flex-col items-center gap-8">
      <h1 className="text-center text-lg">{title}</h1>
      {children}
    </main>
  );
}
