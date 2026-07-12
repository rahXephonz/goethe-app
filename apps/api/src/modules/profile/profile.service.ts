import { profiles } from "@goethepro/db";
import { eq } from "drizzle-orm";
import { Effect } from "effect";
import { Unauthorized } from "@/errors.js";
import { Database } from "@/services/database.js";

/** The authenticated user's profile row (funnel answers land here later). */
export const getProfile = (userId: string | null) =>
  Effect.gen(function* () {
    if (!userId) return yield* new Unauthorized({});
    const db = yield* Database;
    const row = (yield* Effect.promise(() =>
      db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1),
    ))[0];
    return { profile: row ?? null };
  });
