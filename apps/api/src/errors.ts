import type { MessageKey } from "@goethepro/i18n";
import { Data, Match } from "effect";
import type { ContentfulStatusCode } from "hono/utils/http-status";

/**
 * Domain errors as tagged, yieldable Effect errors. Handlers never build HTTP
 * responses from these directly — `toHttpError` is the single mapping point, so
 * status codes and message keys stay consistent as the surface grows.
 */
export class ValidationError extends Data.TaggedError("ValidationError")<{
  readonly messageKey: MessageKey;
}> {}
export class InviteInvalid extends Data.TaggedError("InviteInvalid")<Record<string, never>> {}
export class EmailTaken extends Data.TaggedError("EmailTaken")<Record<string, never>> {}
export class InvalidCredentials extends Data.TaggedError("InvalidCredentials")<
  Record<string, never>
> {}
export class Unauthorized extends Data.TaggedError("Unauthorized")<Record<string, never>> {}

export type DomainError =
  | ValidationError
  | InviteInvalid
  | EmailTaken
  | InvalidCredentials
  | Unauthorized;

export interface HttpError {
  readonly status: ContentfulStatusCode;
  readonly messageKey: MessageKey;
}

/** Total, exhaustive mapping from a domain error to its HTTP shape. */
export const toHttpError = (error: DomainError): HttpError =>
  Match.value(error).pipe(
    Match.tag("ValidationError", (e) => ({ status: 400, messageKey: e.messageKey }) as HttpError),
    Match.tag(
      "InviteInvalid",
      () => ({ status: 403, messageKey: "api.error.inviteInvalid" }) as HttpError,
    ),
    Match.tag(
      "EmailTaken",
      () => ({ status: 409, messageKey: "api.error.emailTaken" }) as HttpError,
    ),
    Match.tag(
      "InvalidCredentials",
      () => ({ status: 401, messageKey: "api.error.invalidCredentials" }) as HttpError,
    ),
    Match.tag(
      "Unauthorized",
      () => ({ status: 401, messageKey: "api.error.unauthorized" }) as HttpError,
    ),
    Match.exhaustive,
  );
