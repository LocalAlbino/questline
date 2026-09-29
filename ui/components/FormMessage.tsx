import { cn } from "cn";
import type { PropsWithChildren } from "react";

export function FormMessage({ variant, children }: PropsWithChildren<{ variant: "error" | "success" }>) {
  return (
    <span className={cn("text-center text-sm", variant === "error" ? "text-red-400" : "text-emerald-500")}>
      {children}
    </span>
  );
}
