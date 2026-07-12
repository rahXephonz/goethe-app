import { SESSION_COOKIE, SESSION_TTL_MS } from "@goethepro/auth";
import type { Context } from "hono";
import { setCookie } from "hono/cookie";
import type { AppEnv } from "./types.js";

const isProd = process.env.NODE_ENV === "production";

/** Set the session cookie with the fixed security attributes. */
export function setSessionCookie(c: Context<AppEnv>, token: string) {
  setCookie(c, SESSION_COOKIE, token, {
    httpOnly: true,
    path: "/",
    sameSite: "Lax",
    secure: isProd,
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });
}
