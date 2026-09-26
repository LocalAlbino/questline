import { drizzle } from "drizzle-orm/neon-http";
import { relations } from "./relations";

if (!process.env.DATABASE_URL) {
  throw new Error("environment variable DATABASE_URL is not configured");
}

export const db = drizzle(process.env.DATABASE_URL, { relations });
