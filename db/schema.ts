import { varchar, boolean, integer, pgTable, text, decimal } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { index, timestamp } from "drizzle-orm/cockroach-core";

export { user, session, account, verification } from "./auth-schema";

export const boardsTable = pgTable("boards", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 30 }).notNull(),
  ownerId: text("owner_id")
    .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
});

export const groupsTable = pgTable(
  "groups",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    rank: decimal().notNull(),
    title: varchar({ length: 30 }).notNull(),
    boardId: integer("board_id")
      .references(() => boardsTable.id, { onDelete: "cascade", onUpdate: "cascade" })
      .notNull(),
  },
  (table) => [index("groups_boardId_idx").on(table.boardId)],
);

export const cardsTable = pgTable(
  "cards",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    rank: decimal().notNull(),
    // Game data queried directly from IGDB using their query language.
    // This should map to the id on their platform.
    gameId: integer("game_id").notNull(),
    dueDate: timestamp("due_date"),
    isCompleted: boolean().notNull().default(false),
    groupId: integer("group_ud")
      .references(() => groupsTable.id, { onDelete: "cascade", onUpdate: "cascade" })
      .notNull(),
  },
  (table) => [index("cards_groupId_idx").on(table.groupId)],
);
