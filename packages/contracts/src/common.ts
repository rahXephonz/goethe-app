import { z } from "zod";

/** Uniform error body returned by every failing API response. */
export const apiErrorResponse = z.object({ error: z.string() });
export type ApiErrorResponse = z.infer<typeof apiErrorResponse>;
