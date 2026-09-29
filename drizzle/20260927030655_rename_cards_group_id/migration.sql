ALTER TABLE "cards" RENAME COLUMN "group_ud" TO "group_id";--> statement-breakpoint
CREATE INDEX "cards_groupId_idx" ON "cards" ("group_id");--> statement-breakpoint
CREATE INDEX "groups_boardId_idx" ON "groups" ("board_id");