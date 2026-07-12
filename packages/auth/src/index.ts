/**
 * Server-side cookie session auth. No JWT, no library.
 *
 * Design:
 *  - Opaque 256-bit random token in an httpOnly cookie.
 *  - Only SHA-256(token) is stored server-side (DB leak != session theft).
 *  - Sliding expiration: sessions live SESSION_TTL; renewed when less than
 *    half the TTL remains.
 *  - Passwords: scrypt (node:crypto), per-user random salt, timing-safe compare.
 *
 * This package is pure logic + a SessionStore interface; apps wire Drizzle.
 */
import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const SCRYPT_N = 16384,
  SCRYPT_R = 8,
  SCRYPT_P = 1,
  KEYLEN = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password.normalize("NFKC"), salt, KEYLEN, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  });
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  const salt = Buffer.from(saltHex, "hex");
  const expected = Buffer.from(hashHex, "hex");
  const actual = scryptSync(password.normalize("NFKC"), salt, expected.length, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  });
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
export const SESSION_COOKIE = "session";

export function generateSessionToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashSessionToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export interface SessionRecord {
  tokenHash: string;
  userId: string;
  expiresAt: Date;
}

export interface SessionStore {
  insert(rec: SessionRecord): Promise<void>;
  findByHash(tokenHash: string): Promise<SessionRecord | null>;
  updateExpiry(tokenHash: string, expiresAt: Date): Promise<void>;
  delete(tokenHash: string): Promise<void>;
}

export async function createSession(
  store: SessionStore,
  userId: string,
  now = new Date(),
): Promise<string> {
  const token = generateSessionToken();
  await store.insert({
    tokenHash: hashSessionToken(token),
    userId,
    expiresAt: new Date(now.getTime() + SESSION_TTL_MS),
  });
  return token;
}

export type ValidationResult = { valid: true; userId: string; renewed: boolean } | { valid: false };

/** Validate a raw cookie token; applies sliding renewal past half-life. */
export async function validateSessionToken(
  store: SessionStore,
  token: string | undefined | null,
  now = new Date(),
): Promise<ValidationResult> {
  if (!token) return { valid: false };
  const tokenHash = hashSessionToken(token);
  const rec = await store.findByHash(tokenHash);
  if (!rec) return { valid: false };
  if (rec.expiresAt.getTime() <= now.getTime()) {
    await store.delete(tokenHash);
    return { valid: false };
  }
  // Sliding renewal once past half-life.
  const renewed = rec.expiresAt.getTime() - now.getTime() < SESSION_TTL_MS / 2;
  if (renewed) {
    await store.updateExpiry(tokenHash, new Date(now.getTime() + SESSION_TTL_MS));
  }
  return { valid: true, userId: rec.userId, renewed };
}

export async function destroySession(store: SessionStore, token: string): Promise<void> {
  await store.delete(hashSessionToken(token));
}

/** Cookie attributes — one place so web and api can never drift. */
export function sessionCookieAttributes(secure: boolean): string {
  return [
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    `Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}`,
    ...(secure ? ["Secure"] : []),
  ].join("; ");
}
