import {
  createSession,
  destroySession,
  hashPassword,
  validateSessionToken,
  verifyPassword,
} from "@goethepro/auth";
import { inviteCodes, profiles, streaks, users } from "@goethepro/db";
import { and, eq, isNull } from "drizzle-orm";
import { Effect } from "effect";
import { nanoid } from "nanoid";
import { EmailTaken, InvalidCredentials, InviteInvalid, Unauthorized } from "@/errors.js";
import { Database } from "@/services/database.js";
import { Sessions } from "@/services/session.js";
import type { LoginInput, RegisterInput } from "./auth.schema.js";

export interface AuthResult {
  readonly userId: string;
  readonly token: string;
}

/** Register a user behind the closed-beta invite gate, in one transaction. */
export const registerUser = (input: RegisterInput) =>
  Effect.gen(function* () {
    const db = yield* Database;
    const store = yield* Sessions;

    const invite = yield* Effect.promise(() =>
      db
        .select()
        .from(inviteCodes)
        .where(and(eq(inviteCodes.code, input.inviteCode), isNull(inviteCodes.usedBy)))
        .limit(1),
    );
    if (!invite[0]) return yield* new InviteInvalid({});

    const existing = yield* Effect.promise(() =>
      db.select({ id: users.id }).from(users).where(eq(users.email, input.email)).limit(1),
    );
    if (existing[0]) return yield* new EmailTaken({});

    const userId = nanoid();
    yield* Effect.promise(() =>
      db.transaction(async (tx) => {
        await tx
          .insert(users)
          .values({ id: userId, email: input.email, passwordHash: hashPassword(input.password) });
        await tx
          .update(inviteCodes)
          .set({ usedBy: userId, usedAt: new Date() })
          .where(eq(inviteCodes.code, input.inviteCode));
        await tx.insert(profiles).values({ userId });
        await tx.insert(streaks).values({ userId });
      }),
    );

    const token = yield* Effect.promise(() => createSession(store, userId));
    return { userId, token } satisfies AuthResult;
  });

/** Verify credentials with a uniform error and mint a session on success. */
export const loginUser = (input: LoginInput) =>
  Effect.gen(function* () {
    const db = yield* Database;
    const store = yield* Sessions;

    const row = (yield* Effect.promise(() =>
      db.select().from(users).where(eq(users.email, input.email)).limit(1),
    ))[0];
    // Uniform error: never reveal whether the email exists.
    if (!row || !verifyPassword(input.password, row.passwordHash)) {
      return yield* new InvalidCredentials({});
    }

    const token = yield* Effect.promise(() => createSession(store, row.id));
    return { userId: row.id, token } satisfies AuthResult;
  });

/** The authenticated user's public fields, or Unauthorized when no session. */
export const currentUser = (userId: string | null) =>
  Effect.gen(function* () {
    if (!userId) return yield* new Unauthorized({});
    const db = yield* Database;
    const row = (yield* Effect.promise(() =>
      db
        .select({ id: users.id, email: users.email })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1),
    ))[0];
    return { user: row ?? null };
  });

/** Resolve a raw cookie token to a userId (or null). Never fails. */
export const resolveUserId = (token: string | undefined) =>
  Effect.gen(function* () {
    const store = yield* Sessions;
    const result = yield* Effect.promise(() => validateSessionToken(store, token));
    return result.valid ? result.userId : null;
  });

/** Destroy the session behind a token, if any. Never fails. */
export const logout = (token: string | undefined) =>
  Effect.gen(function* () {
    if (!token) return;
    const store = yield* Sessions;
    yield* Effect.promise(() => destroySession(store, token));
  });
