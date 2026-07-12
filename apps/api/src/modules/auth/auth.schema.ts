import { Effect } from "effect";
import { z } from "zod";
import { ValidationError } from "@/errors.js";

const registerSchema = z.object({
  email: z
    .string()
    .email()
    .transform((e) => e.toLowerCase().trim()),
  password: z.string().min(10),
  inviteCode: z.string().min(1),
});

const loginSchema = z.object({
  email: z
    .string()
    .email()
    .transform((e) => e.toLowerCase().trim()),
  password: z.string().min(1),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export const parseRegister = (raw: unknown): Effect.Effect<RegisterInput, ValidationError> => {
  const result = registerSchema.safeParse(raw);
  if (result.success) return Effect.succeed(result.data);
  const tooShort = result.error.issues.some(
    (i) => i.path[0] === "password" && i.code === "too_small",
  );
  return Effect.fail(
    new ValidationError({
      messageKey: tooShort ? "api.error.passwordTooShort" : "api.error.invalidInput",
    }),
  );
};

export const parseLogin = (raw: unknown): Effect.Effect<LoginInput, ValidationError> => {
  const result = loginSchema.safeParse(raw);
  return result.success
    ? Effect.succeed(result.data)
    : Effect.fail(new ValidationError({ messageKey: "api.error.invalidInput" }));
};
