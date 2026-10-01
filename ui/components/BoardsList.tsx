import { BoardDisplayCard } from "./BoardDisplayCard";

export type BoardsListProps = {
  boards: {
    id: number;
    title: string;
  }[];
};

export function BoardsList({ boards }: BoardsListProps) {
  return (
    <div className="flex flex-col gap-4">
      {boards.map((b) => (
        <BoardDisplayCard key={b.id} title={b.title} id={b.id} />
      ))}
    </div>
  );
}
