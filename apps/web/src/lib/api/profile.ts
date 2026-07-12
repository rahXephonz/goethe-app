/** Profile API — requests for the profile domain ONLY. Mirrors `/api/profile`. */
import { api } from "./client";

export type Profile = Record<string, unknown> | null;

export const profileApi = {
  /** GET /api/profile -> current user's profile row. */
  get: () => api.get<{ profile: Profile }>("/profile").then((r) => r.profile),
};
