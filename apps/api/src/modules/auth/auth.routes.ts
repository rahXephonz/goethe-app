import { SESSION_COOKIE } from "@goethepro/auth";
import { Effect } from "effect";
import { Hono } from "hono";
import { deleteCookie, getCookie } from "hono/cookie";
import { setSessionCookie } from "@/http/cookies.js";
import { runEffect } from "@/http/run-effect.js";
import type { AppEnv } from "@/http/types.js";
import { runtime } from "@/runtime.js";
import { parseLogin, parseRegister } from "./auth.schema.js";
import { currentUser, loginUser, logout, registerUser } from "./auth.service.js";

export const authRoutes = new Hono<AppEnv>()
  .post("/register", async (c) => {
    const raw = await c.req.json().catch(() => null);
    return runEffect(c, Effect.flatMap(parseRegister(raw), registerUser), (r) => {
      setSessionCookie(c, r.token);
      return c.json({ userId: r.userId }, 201);
    });
  })
  .post("/login", async (c) => {
    const raw = await c.req.json().catch(() => null);
    return runEffect(c, Effect.flatMap(parseLogin(raw), loginUser), (r) => {
      setSessionCookie(c, r.token);
      return c.json({ userId: r.userId });
    });
  })
  .post("/logout", async (c) => {
    const token = getCookie(c, SESSION_COOKIE);
    await runtime.runPromise(logout(token));
    deleteCookie(c, SESSION_COOKIE, { path: "/" });
    return c.json({ ok: true });
  })
  .get("/me", (c) => runEffect(c, currentUser(c.get("userId")), (r) => c.json(r)));
