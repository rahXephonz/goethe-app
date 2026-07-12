/**
 * AUTO-GENERATED from @goethepro/contracts — do not edit by hand.
 * Run `pnpm gen:types` after changing a contract schema.
 */

export interface Profile {
  userId: string;
  goal: ("ausbildung" | "study" | "work" | "family" | "other") | null;
  field: ("pflege" | "gastronomie" | "handwerk" | "it" | "unknown") | null;
  timeline: string | null;
  minutesPerDay: number | null;
  reminderSlot: string | null;
  challenges: string[] | null;
  placedSublevel: string | null;
  targetLevel: string | null;
}

export interface ProfileResponse {
  profile: {
    userId: string;
    goal: ("ausbildung" | "study" | "work" | "family" | "other") | null;
    field: ("pflege" | "gastronomie" | "handwerk" | "it" | "unknown") | null;
    timeline: string | null;
    minutesPerDay: number | null;
    reminderSlot: string | null;
    challenges: string[] | null;
    placedSublevel: string | null;
    targetLevel: string | null;
  } | null;
}
