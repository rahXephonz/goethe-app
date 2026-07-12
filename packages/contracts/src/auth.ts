import { z } from "zod";

/** POST /api/auth/register body. */
export const registerRequest = z.object({
  email: z.string().email(),
  password: z.string().min(10),
  inviteCode: z.string().min(1),
});
export type RegisterRequest = z.infer<typeof registerRequest>;

/** POST /api/auth/login body. */
export const loginRequest = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export type LoginRequest = z.infer<typeof loginRequest>;

/** POST /api/auth/{register,login} success. */
export const authResponse = z.object({ userId: z.string() });
export type AuthResponse = z.infer<typeof authResponse>;

/** POST /api/auth/logout success. */
export const logoutResponse = z.object({ ok: z.literal(true) });
export type LogoutResponse = z.infer<typeof logoutResponse>;
