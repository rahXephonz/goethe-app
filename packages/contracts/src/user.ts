import { z } from "zod";

/** Public user entity — the fields the API ever exposes. */
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});
export type User = z.infer<typeof userSchema>;

/** GET /api/auth/me */
export const meResponse = z.object({ user: userSchema.nullable() });
export type MeResponse = z.infer<typeof meResponse>;
