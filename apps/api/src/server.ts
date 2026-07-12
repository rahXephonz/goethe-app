import {
  createSession,
  destroySession,
  hashPassword,
  SESSION_COOKIE,
  SESSION_TTL_MS,
  validateSessionToken,
  verifyPassword,
} from "@goethepro/auth";
import { createDb, inviteCodes, profiles, streaks, users } from "@goethepro/db";
import { serve } from "@hono/node-server";
import { and, eq, isNull } from "drizzle-orm";
import { type Context, Hono } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { nanoid } from "nanoid";
import { z } from "zod";
import { drizzleSessionStore } from "./session-store.js";

const db = createDb();
const store = drizzleSessionStore(db);
const isProd = process.env.NODE_ENV === "production";

type Env = { Variables: { userId: string | null } };
const app = new Hono<Env>();

// --- session middleware: resolves cookie -> userId (or null) ---------------
app.use("*", async (c, next) => {
  const token = getCookie(c, SESSION_COOKIE);
  const result = await validateSessionToken(store, token);
  c.set("userId", result.valid ? result.userId : null);
  await next();
});

function setSessionCookie(c: Context<Env>, token: string) {
  setCookie(c, SESSION_COOKIE, token, {
    httpOnly: true,
    path: "/",
    sameSite: "Lax",
    secure: isProd,
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });
}

app.get("/api/health", (c) => c.json({ ok: true }));

// --- auth -------------------------------------------------------------------
const registerSchema = z.object({
  email: z
    .string()
    .email()
    .transform((e) => e.toLowerCase().trim()),
  password: z.string().min(10, "Password minimal 10 karakter"),
  inviteCode: z.string().min(1),
});

app.post("/api/auth/register", async (c) => {
  const body = registerSchema.safeParse(await c.req.json().catch(() => null));
  if (!body.success)
    return c.json({ error: body.error.issues[0]?.message ?? "Input tidak valid" }, 400);
  const { email, password, inviteCode } = body.data;

  // Closed beta: valid, unused invite code required.
  const invite = await db
    .select()
    .from(inviteCodes)
    .where(and(eq(inviteCodes.code, inviteCode), isNull(inviteCodes.usedBy)))
    .limit(1);
  if (!invite[0]) return c.json({ error: "Kode undangan tidak valid atau sudah dipakai" }, 403);

  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (existing[0]) return c.json({ error: "Email sudah terdaftar" }, 409);

  const userId = nanoid();
  await db.transaction(async (tx) => {
    await tx.insert(users).values({ id: userId, email, passwordHash: hashPassword(password) });
    await tx
      .update(inviteCodes)
      .set({ usedBy: userId, usedAt: new Date() })
      .where(eq(inviteCodes.code, inviteCode));
    await tx.insert(profiles).values({ userId });
    await tx.insert(streaks).values({ userId });
  });

  const token = await createSession(store, userId);
  setSessionCookie(c, token);
  return c.json({ userId }, 201);
});

const loginSchema = z.object({
  email: z
    .string()
    .email()
    .transform((e) => e.toLowerCase().trim()),
  password: z.string().min(1),
});

app.post("/api/auth/login", async (c) => {
  const body = loginSchema.safeParse(await c.req.json().catch(() => null));
  if (!body.success) return c.json({ error: "Input tidak valid" }, 400);
  const { email, password } = body.data;

  const row = (await db.select().from(users).where(eq(users.email, email)).limit(1))[0];
  // Uniform error: never reveal whether the email exists.
  if (!row || !verifyPassword(password, row.passwordHash)) {
    return c.json({ error: "Email atau password salah" }, 401);
  }
  const token = await createSession(store, row.id);
  setSessionCookie(c, token);
  return c.json({ userId: row.id });
});

app.post("/api/auth/logout", async (c) => {
  const token = getCookie(c, SESSION_COOKIE);
  if (token) await destroySession(store, token);
  deleteCookie(c, SESSION_COOKIE, { path: "/" });
  return c.json({ ok: true });
});

app.get("/api/auth/me", async (c) => {
  const userId = c.get("userId");
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  const row = (
    await db
      .select({ id: users.id, email: users.email })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)
  )[0];
  return c.json({ user: row ?? null });
});

// --- protected example: profile read (funnel answers land here later) -------
app.get("/api/profile", async (c) => {
  const userId = c.get("userId");
  if (!userId) return c.json({ error: "Unauthorized" }, 401);
  const row = (await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1))[0];
  return c.json({ profile: row ?? null });
});

const port = Number(process.env.PORT ?? 8787);
serve({ fetch: app.fetch, port }, () => {
  console.log(`[api] listening on :${port}`);
});
