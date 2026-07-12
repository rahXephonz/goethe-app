/**
 * AUTO-GENERATED from @goethepro/contracts — do not edit by hand.
 * Run `pnpm gen:types` after changing a contract schema.
 */

export interface RegisterRequest {
  email: string;
  password: string;
  inviteCode: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  userId: string;
}

export interface LogoutResponse {
  ok: true;
}
