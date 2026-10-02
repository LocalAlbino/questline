import { db } from "@/db";
import { boardsTable, MAX_BOARDS_PER_USER } from "@/db/schema";
import { requireVerifiedSession } from "@/lib/session";
import { FormLayout } from "@/ui/components/FormLayout";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function CreateBoardsPage() {
  const session = await requireVerifiedSession();
  if ((await db.$count(boardsTable, eq(boardsTable.ownerId, session?.user.id))) >= MAX_BOARDS_PER_USER) {
    redirect("/boards");
  }

  // TODO: returned component
}
