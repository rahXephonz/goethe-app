/** Auth API — requests for the auth domain ONLY. Mirrors `/api/auth/*` on Hono. */
import { Effect } from "effect";
import { type ApiError, request } from "@/lib/api/client";
import type { AuthResponse, LoginRequest, LogoutResponse, RegisterRequest } from "@/types/auth";
import type { MeResponse, User } from "@/types/user";

export const authApi = {
  /** GET /api/auth/me -> current user, or `null` when unauthenticated (401). */
  me: (): Effect.Effect<User | null, ApiError> =>
    request<MeResponse>("/auth/me").pipe(
      Effect.map((r) => r.user),
      Effect.catchIf(
        (e) => e.status === 401,
        () => Effect.succeed(null),
      ),
    ),

  /** POST /api/auth/login */
  login: (body: LoginRequest): Effect.Effect<AuthResponse, ApiError> =>
    request<AuthResponse>("/auth/login", { method: "POST", body }),

  /** POST /api/auth/register */
  register: (body: RegisterRequest): Effect.Effect<AuthResponse, ApiError> =>
    request<AuthResponse>("/auth/register", { method: "POST", body }),

  /** POST /api/auth/logout */
  logout: (): Effect.Effect<LogoutResponse, ApiError> =>
    request<LogoutResponse>("/auth/logout", { method: "POST" }),
};
