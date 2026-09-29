import Link, { type LinkProps } from "next/link";
import { PropsWithChildren } from "react";

export function LinkButton({ href, children, ...props }: PropsWithChildren<LinkProps>) {
  return (
    <Link className="bg-emerald-500 px-2 py-1 text-zinc-900 hover:bg-emerald-400" href={href} {...props}>
      {children}
    </Link>
  );
}
