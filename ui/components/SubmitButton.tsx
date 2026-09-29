import type { PropsWithChildren } from "react";

export function SubmitButton({
  pending,
  disabled,
  children,
}: PropsWithChildren<{ pending: boolean; disabled?: boolean }>) {
  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="bg-emerald-500 px-2 py-1 text-zinc-900 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-emerald-500"
    >
      {children}
    </button>
  );
}
