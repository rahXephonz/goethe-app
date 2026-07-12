/** Profile API — requests for the profile domain ONLY. Mirrors `/api/profile`. */
import { Effect } from "effect";
import { type ApiError, request } from "@/lib/api/client";
import type { Profile, ProfileResponse } from "@/types/profile";

export const profileApi = {
  /** GET /api/profile -> current user's profile row (or null). */
  get: (): Effect.Effect<Profile | null, ApiError> =>
    request<ProfileResponse>("/profile").pipe(Effect.map((r) => r.profile)),
};
