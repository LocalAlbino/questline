import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

export function LinkButton({ href, children, ...props }: PropsWithChildren<Omit<LinkProps, "className">>) {
  return (
    <Link className="bg-emerald-500 px-2 py-1 text-center text-zinc-900 hover:bg-emerald-400" href={href} {...props}>
      {children}
    </Link>
  );
}
