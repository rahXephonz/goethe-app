/** Auth API — requests for the auth domain ONLY. Mirrors `/api/auth/*` on Hono. */
import { ApiError, api } from "./client";

export type AuthUser = { id: string; email: string };

export type LoginInput = { email: string; password: string };
export type RegisterInput = { email: string; password: string; inviteCode: string };

export const authApi = {
  /** GET /api/auth/me -> current user, or `null` when unauthenticated (401). */
  me: () =>
    api
      .get<{ user: AuthUser | null }>("/auth/me")
      .then((r) => r.user)
      .catch((e) => {
        if (e instanceof ApiError && e.status === 401) return null;
        throw e;
      }),

  /** POST /api/auth/login */
  login: (input: LoginInput) => api.post<{ userId: string }>("/auth/login", input),

  /** POST /api/auth/register */
  register: (input: RegisterInput) => api.post<{ userId: string }>("/auth/register", input),

  /** POST /api/auth/logout */
  logout: () => api.post<{ ok: true }>("/auth/logout"),
};
