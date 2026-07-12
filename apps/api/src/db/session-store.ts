import type { SessionRecord, SessionStore } from "@goethepro/auth";
import { type Db, sessions } from "@goethepro/db";
import { eq } from "drizzle-orm";

/** Drizzle implementation of the auth package's SessionStore interface. */
export function drizzleSessionStore(db: Db): SessionStore {
  return {
    async insert(rec: SessionRecord) {
      await db.insert(sessions).values(rec);
    },
    async findByHash(tokenHash: string) {
      const rows = await db
        .select()
        .from(sessions)
        .where(eq(sessions.tokenHash, tokenHash))
        .limit(1);
      const r = rows[0];
      return r ? { tokenHash: r.tokenHash, userId: r.userId, expiresAt: r.expiresAt } : null;
    },
    async updateExpiry(tokenHash: string, expiresAt: Date) {
      await db.update(sessions).set({ expiresAt }).where(eq(sessions.tokenHash, tokenHash));
    },
    async delete(tokenHash: string) {
      await db.delete(sessions).where(eq(sessions.tokenHash, tokenHash));
    },
  };
}
