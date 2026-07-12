import {
  type LoginRequest,
  loginRequest,
  type RegisterRequest,
  registerRequest,
} from "@goethepro/contracts/auth";
import { Effect } from "effect";
import { ValidationError } from "@/errors.js";

// Request shapes are validated against the shared contracts; email is
// normalized server-side so lookups and storage are case-insensitive.
export type { LoginRequest as LoginInput, RegisterRequest as RegisterInput };

const normalizeEmail = (email: string) => email.toLowerCase().trim();

export const parseRegister = (raw: unknown): Effect.Effect<RegisterRequest, ValidationError> => {
  const result = registerRequest.safeParse(raw);

  if (result.success)
    return Effect.succeed({ ...result.data, email: normalizeEmail(result.data.email) });
  const tooShort = result.error.issues.some(
    (i) => i.path[0] === "password" && i.code === "too_small",
  );
  return Effect.fail(
    new ValidationError({
      messageKey: tooShort ? "api.error.passwordTooShort" : "api.error.invalidInput",
    }),
  );
};

export const parseLogin = (raw: unknown): Effect.Effect<LoginRequest, ValidationError> => {
  const result = loginRequest.safeParse(raw);
  return result.success
    ? Effect.succeed({ ...result.data, email: normalizeEmail(result.data.email) })
    : Effect.fail(new ValidationError({ messageKey: "api.error.invalidInput" }));
};
