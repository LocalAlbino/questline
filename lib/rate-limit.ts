import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { rateLimitsTable } from "@/db/schema";

export type RateLimitRule = {
  /** Minimum seconds between two allowed requests. */
  cooldown: number;
  /** Maximum allowed requests per window. */
  max: number;
  /** Window length in seconds. */
  window: number;
};

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfter: number };

/**
 * Records a request for `key` if it's allowed under `rule`. Blocked requests aren't recorded, so
 * retrying early doesn't push back when the next request is allowed.
 */
export async function consumeRateLimit(key: string, rule: RateLimitRule): Promise<RateLimitResult> {
  const t = rateLimitsTable;
  const windowExpired = sql`${t.windowStart} <= now() - make_interval(secs => ${rule.window})`;

  // Check and increment in one statement so concurrent requests can't all pass the same check.
  const recorded = await db
    .insert(t)
    .values({ key, count: 1, windowStart: sql`now()`, lastRequestAt: sql`now()` })
    .onConflictDoUpdate({
      target: t.key,
      set: {
        count: sql`CASE WHEN ${windowExpired} THEN 1 ELSE ${t.count} + 1 END`,
        windowStart: sql`CASE WHEN ${windowExpired} THEN now() ELSE ${t.windowStart} END`,
        lastRequestAt: sql`now()`,
      },
      setWhere: sql`${t.lastRequestAt} <= now() - make_interval(secs => ${rule.cooldown})
        AND (${windowExpired} OR ${t.count} < ${rule.max})`,
    })
    .returning({ key: t.key });

  if (recorded.length > 0) return { allowed: true };
  return { allowed: false, retryAfter: Math.max(1, await getRetryAfter(key, rule)) };
}

/** Seconds until a request for `key` would be allowed under `rule`, or 0 if it would be allowed now. */
export async function getRetryAfter(key: string, rule: RateLimitRule): Promise<number> {
  const t = rateLimitsTable;
  const [row] = await db
    .select({
      cooldownLeft: sql<number>`extract(epoch from ${t.lastRequestAt} + make_interval(secs => ${rule.cooldown}) - now())`,
      windowLeft: sql<number>`extract(epoch from ${t.windowStart} + make_interval(secs => ${rule.window}) - now())`,
      count: t.count,
    })
    .from(t)
    .where(eq(t.key, key));

  if (!row) return 0;
  const cooldownLeft = Number(row.cooldownLeft);
  const windowLeft = row.count >= rule.max ? Number(row.windowLeft) : 0;
  return Math.max(0, Math.ceil(Math.max(cooldownLeft, windowLeft)));
}
