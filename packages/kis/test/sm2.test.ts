import { describe, expect, it } from "vitest";
import { INITIAL_SM2_STATE, review, type Sm2State } from "../src/sm2.js";

describe("SM-2 scheduler", () => {
  it("first good review -> 1 day", () => {
    const r = review(INITIAL_SM2_STATE, "good");
    expect(r.nextIntervalDays).toBe(1);
    expect(r.state.reps).toBe(1);
  });

  it("second good review -> 6 days", () => {
    const first = review(INITIAL_SM2_STATE, "good");
    const second = review(first.state, "good");
    expect(second.nextIntervalDays).toBe(6);
  });

  it("third good review -> prev * ease", () => {
    let s = review(INITIAL_SM2_STATE, "good");
    s = review(s.state, "good");
    const third = review(s.state, "good");
    expect(third.nextIntervalDays).toBe(Math.round(6 * s.state.ease));
  });

  it("again resets reps, requeues today, interval back to 1", () => {
    let s = review(INITIAL_SM2_STATE, "good");
    s = review(s.state, "good");
    const failed = review(s.state, "again");
    expect(failed.requeueToday).toBe(true);
    expect(failed.nextIntervalDays).toBe(0);
    expect(failed.state.reps).toBe(0);
    expect(failed.state.intervalDays).toBe(1);
  });

  it("ease never drops below 1.3 under repeated failure", () => {
    let state: Sm2State = INITIAL_SM2_STATE;
    for (let i = 0; i < 50; i++) state = review(state, "again").state;
    expect(state.ease).toBeGreaterThanOrEqual(1.3);
  });

  it("hard grows slower than good", () => {
    let a: Sm2State = INITIAL_SM2_STATE;
    let b: Sm2State = INITIAL_SM2_STATE;
    for (let i = 0; i < 4; i++) {
      a = review(a, "good").state;
      b = review(b, "hard").state;
    }
    expect(b.intervalDays).toBeLessThan(a.intervalDays);
  });

  it("intervals are always >= 1 day on success", () => {
    let state: Sm2State = INITIAL_SM2_STATE;
    const ratings = ["hard", "good", "easy", "hard", "hard", "good"] as const;
    for (const r of ratings) {
      const res = review(state, r);
      expect(res.nextIntervalDays).toBeGreaterThanOrEqual(1);
      state = res.state;
    }
  });
});
