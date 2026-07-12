import { Hono } from "hono";
import type { AppEnv } from "@/http/types.js";

export const healthRoutes = new Hono<AppEnv>().get("/health", (c) => c.json({ ok: true }));
