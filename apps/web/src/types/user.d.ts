/**
 * AUTO-GENERATED from @goethepro/contracts — do not edit by hand.
 * Run `pnpm gen:types` after changing a contract schema.
 */

export interface User {
  id: string;
  email: string;
}

export interface MeResponse {
  user: {
    id: string;
    email: string;
  } | null;
}
