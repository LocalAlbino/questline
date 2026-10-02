import { BoardDisplayCard } from "./BoardDisplayCard";

export type BoardsListProps = {
  boards: {
    id: number;
    title: string;
  }[];
};

export function BoardsList({ boards }: BoardsListProps) {
  // No pagination on the list here; everyone is limited to a couple boards max
  // since we don't have much space on Neon's free tier.
  if (boards.length <= 0) {
    return <span className="text-center text-zinc-600">No boards yet. Create one below.</span>;
  }

  return (
    <div className="flex flex-col gap-4">
      {boards.map((b) => (
        <BoardDisplayCard key={b.id} title={b.title} id={b.id} />
      ))}
    </div>
  );
}
