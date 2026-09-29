import Link from "next/link";

type LinkPromptProps = {
  prompt: string;
  href: string;
  linkText: string;
};

export function LinkPrompt({ prompt, href, linkText }: LinkPromptProps) {
  return (
    <div className="flex flex-col items-center gap-1 text-center text-sm lg:flex-row lg:justify-center lg:gap-2">
      <span className="text-zinc-600">{prompt}</span>
      <Link className="text-emerald-500 underline" href={href}>
        {linkText}
      </Link>
    </div>
  );
}
