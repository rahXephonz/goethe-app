import { z } from "zod";

/** Onboarding-funnel goal. Mirrors the DB `goal` enum. */
export const goal = z.enum(["ausbildung", "study", "work", "family", "other"]);
/** Target Ausbildung field. Mirrors the DB `field` enum. */
export const field = z.enum(["pflege", "gastronomie", "handwerk", "it", "unknown"]);

/** The user's profile row (funnel answers). Columns are nullable until filled. */
export const profileSchema = z.object({
  userId: z.string(),
  goal: goal.nullable(),
  field: field.nullable(),
  timeline: z.string().nullable(),
  minutesPerDay: z.number().int().nullable(),
  reminderSlot: z.string().nullable(),
  challenges: z.array(z.string()).nullable(),
  placedSublevel: z.string().nullable(),
  targetLevel: z.string().nullable(),
});
export type Profile = z.infer<typeof profileSchema>;

/** GET /api/profile */
export const profileResponse = z.object({ profile: profileSchema.nullable() });
export type ProfileResponse = z.infer<typeof profileResponse>;
