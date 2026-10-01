import { LinkButton } from "./LinkButton";

export type BoardDisplayCardProps = {
  id: number;
  title: string;
};

export function BoardDisplayCard({ id, title }: BoardDisplayCardProps) {
  return (
    <div className="flex flex-col gap-4 bg-zinc-900 px-4 py-2">
      <span className="text-lg text-zinc-400">{title}</span>
      <LinkButton href={`boards/${id}`}>Go to board</LinkButton>
    </div>
  );
}
