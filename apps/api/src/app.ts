import { Hono } from "hono";
import { i18nMiddleware, sessionMiddleware } from "@/http/middleware.js";
import type { AppEnv } from "@/http/types.js";
import { authRoutes } from "@/modules/auth/auth.routes.js";
import { healthRoutes } from "@/modules/health/health.routes.js";
import { profileRoutes } from "@/modules/profile/profile.routes.js";

/** Hono app: shared middleware, then feature routers mounted under /api. */
export const app = new Hono<AppEnv>();

app.use("*", i18nMiddleware);
app.use("*", sessionMiddleware);

app.route("/api", healthRoutes);
app.route("/api/auth", authRoutes);
app.route("/api/profile", profileRoutes);
