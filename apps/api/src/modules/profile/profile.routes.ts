import { Hono } from "hono";
import { runEffect } from "@/http/run-effect.js";
import type { AppEnv } from "@/http/types.js";
import { getProfile } from "./profile.service.js";

export const profileRoutes = new Hono<AppEnv>().get("/", (c) =>
  runEffect(c, getProfile(c.get("userId")), (r) => c.json(r)),
);
