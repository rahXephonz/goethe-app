/**
 * SM-2 spaced-repetition scheduler.
 * Spec (build plan item 3): intervals 1 day -> 6 days -> prev * EF.
 * EF starts at 2.5, floor 1.3. "Again" resets interval to 1 and keeps
 * the card in today's queue (requeue flag) until passed.
 */

import { match } from "ts-pattern";

export type Rating = "again" | "hard" | "good" | "easy";

export interface Sm2State {
  /** Ease factor. Starts at 2.5, never below 1.3. */
  ease: number;
  /** Current interval in days. 0 = new card, never reviewed. */
  intervalDays: number;
  /** Number of successful reviews in the current streak (resets on "again"). */
  reps: number;
}

export interface Sm2Result {
  state: Sm2State;
  /** Days until next review. 0 => stays in today's queue. */
  nextIntervalDays: number;
  /** True when the card must be shown again in the same session. */
  requeueToday: boolean;
}

export const INITIAL_SM2_STATE: Sm2State = { ease: 2.5, intervalDays: 0, reps: 0 };

const EASE_FLOOR = 1.3;

/** SM-2 quality mapping: again=2 (fail), hard=3, good=4, easy=5. */
const QUALITY: Record<Rating, number> = { again: 2, hard: 3, good: 4, easy: 5 };

function nextEase(ease: number, rating: Rating): number {
  const q = QUALITY[rating];
  // Classic SM-2 EF update: EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
  const updated = ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  return Math.max(EASE_FLOOR, Number(updated.toFixed(4)));
}

export function review(state: Sm2State, rating: Rating): Sm2Result {
  const ease = nextEase(state.ease, rating);

  if (rating === "again") {
    return {
      state: { ease, intervalDays: 1, reps: 0 },
      nextIntervalDays: 0,
      requeueToday: true,
    };
  }

  const reps = state.reps + 1;

  // Base interval by repetition: 1 day -> 6 days -> previous * ease.
  const base = match(reps)
    .with(1, () => 1)
    .with(2, () => 6)
    .otherwise(() => Math.round(state.intervalDays * ease));

  // Rating modifiers: "hard" dampens (min +1 day), "easy" small bonus, "good" as-is.
  // ("again" already returned above; .otherwise covers it defensively.)
  const adjusted = match(rating)
    .with("hard", () => Math.max(state.intervalDays + 1, Math.round(base * 0.8)))
    .with("easy", () => Math.round(base * 1.15))
    .otherwise(() => base);

  const intervalDays = Math.max(1, adjusted);

  return {
    state: { ease, intervalDays, reps },
    nextIntervalDays: intervalDays,
    requeueToday: false,
  };
}
