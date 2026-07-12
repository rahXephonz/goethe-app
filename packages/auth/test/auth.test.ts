import { describe, expect, it } from "vitest";
import {
  createSession,
  destroySession,
  generateSessionToken,
  hashPassword,
  hashSessionToken,
  SESSION_TTL_MS,
  type SessionRecord,
  type SessionStore,
  validateSessionToken,
  verifyPassword,
} from "../src/index.js";

function memoryStore(): SessionStore & { rows: Map<string, SessionRecord> } {
  const rows = new Map<string, SessionRecord>();
  return {
    rows,
    async insert(r) {
      rows.set(r.tokenHash, r);
    },
    async findByHash(h) {
      return rows.get(h) ?? null;
    },
    async updateExpiry(h, e) {
      const r = rows.get(h);
      if (r) r.expiresAt = e;
    },
    async delete(h) {
      rows.delete(h);
    },
  };
}

describe("password hashing", () => {
  it("verifies correct password, rejects wrong", () => {
    const stored = hashPassword("Straße-2026!");
    expect(verifyPassword("Straße-2026!", stored)).toBe(true);
    expect(verifyPassword("strasse-2026!", stored)).toBe(false);
  });
  it("salts: same password -> different hashes", () => {
    expect(hashPassword("x")).not.toBe(hashPassword("x"));
  });
  it("rejects malformed stored values without throwing", () => {
    expect(verifyPassword("x", "garbage")).toBe(false);
  });
});

describe("sessions", () => {
  it("raw token is never stored; only its hash", async () => {
    const store = memoryStore();
    const token = await createSession(store, "u1");
    expect(store.rows.has(token)).toBe(false);
    expect(store.rows.has(hashSessionToken(token))).toBe(true);
  });

  it("validates a fresh session without renewal", async () => {
    const store = memoryStore();
    const token = await createSession(store, "u1");
    const res = await validateSessionToken(store, token);
    expect(res).toEqual({ valid: true, userId: "u1", renewed: false });
  });

  it("expired session is invalid and deleted", async () => {
    const store = memoryStore();
    const token = await createSession(store, "u1");
    const later = new Date(Date.now() + SESSION_TTL_MS + 1000);
    const res = await validateSessionToken(store, token, later);
    expect(res.valid).toBe(false);
    expect(store.rows.size).toBe(0);
  });

  it("sliding renewal past half-life", async () => {
    const store = memoryStore();
    const token = await createSession(store, "u1");
    const pastHalf = new Date(Date.now() + SESSION_TTL_MS * 0.6);
    const res = await validateSessionToken(store, token, pastHalf);
    expect(res).toMatchObject({ valid: true, renewed: true });
    const rec = store.rows.get(hashSessionToken(token))!;
    expect(rec.expiresAt.getTime()).toBeGreaterThan(Date.now() + SESSION_TTL_MS * 0.9);
  });

  it("logout destroys the session", async () => {
    const store = memoryStore();
    const token = await createSession(store, "u1");
    await destroySession(store, token);
    expect((await validateSessionToken(store, token)).valid).toBe(false);
  });

  it("garbage tokens are invalid", async () => {
    const store = memoryStore();
    expect((await validateSessionToken(store, "not-a-token")).valid).toBe(false);
    expect((await validateSessionToken(store, undefined)).valid).toBe(false);
  });

  it("tokens are unique and 256-bit", () => {
    const a = generateSessionToken();
    const b = generateSessionToken();
    expect(a).not.toBe(b);
    expect(Buffer.from(a, "base64url").length).toBe(32);
  });
});
