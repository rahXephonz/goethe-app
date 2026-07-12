import { Cause, Effect, Exit, Option } from "effect";

/**
 * Boundary between Effect and React Query. Runs a request Effect and resolves
 * with its value, or rejects with the typed error instance (e.g. ApiError) so
 * React Query surfaces it and components can `instanceof`-check it. Unexpected
 * defects reject with a plain Error.
 */
export async function runRequest<A, E>(effect: Effect.Effect<A, E>): Promise<A> {
  const exit = await Effect.runPromiseExit(effect);
  if (Exit.isSuccess(exit)) return exit.value;
  const failure = Cause.failureOption(exit.cause);
  throw Option.isSome(failure) ? failure.value : new Error(Cause.pretty(exit.cause));
}
