import { describe, expect, it } from "vitest";
import {
  itemIsServable,
  onCardCreated,
  onGrammarProgress,
  onVocabReview,
  unlockGrammar,
  type VocabTracking,
} from "../src/status.js";

describe("vocab status transitions", () => {
  it("card creation puts word in learning", () => {
    expect(onCardCreated().status).toBe("learning");
  });

  it("promotes to known only with 3 consecutive correct AND interval >= 7", () => {
    let t = onCardCreated();
    t = onVocabReview(t, true, 1); // 1 correct, interval 1
    t = onVocabReview(t, true, 6); // 2 correct, interval 6
    expect(t.status).toBe("learning"); // interval still < 7
    t = onVocabReview(t, true, 15); // 3 correct, interval 15
    expect(t.status).toBe("known");
  });

  it("does not promote with 3 correct but short interval", () => {
    let t = onCardCreated();
    t = onVocabReview(t, true, 1);
    t = onVocabReview(t, true, 3);
    t = onVocabReview(t, true, 5);
    expect(t.status).toBe("learning");
  });

  it("a wrong answer resets the correct streak", () => {
    let t = onCardCreated();
    t = onVocabReview(t, true, 1);
    t = onVocabReview(t, true, 6);
    t = onVocabReview(t, false, 1);
    t = onVocabReview(t, true, 6);
    t = onVocabReview(t, true, 15);
    expect(t.status).toBe("learning"); // only 2 consecutive since fail
    t = onVocabReview(t, true, 30);
    expect(t.status).toBe("known");
  });

  it("demotes known -> learning after 2 consecutive fails", () => {
    let t: VocabTracking = {
      status: "known",
      consecutiveCorrect: 5,
      consecutiveWrong: 0,
      intervalDays: 30,
    };
    t = onVocabReview(t, false, 1);
    expect(t.status).toBe("known");
    t = onVocabReview(t, false, 1);
    expect(t.status).toBe("learning");
  });
});

describe("grammar status transitions", () => {
  it("unlock moves locked -> in_progress", () => {
    expect(
      unlockGrammar({ status: "locked", drillAccuracy: 0, chapterMarkedDone: false }).status,
    ).toBe("in_progress");
  });

  it("completes only with chapter done AND accuracy >= 0.8", () => {
    let g = unlockGrammar({ status: "locked", drillAccuracy: 0, chapterMarkedDone: false });
    g = onGrammarProgress(g, 0.75, true);
    expect(g.status).toBe("in_progress");
    g = onGrammarProgress(g, 0.85, false);
    expect(g.status).toBe("in_progress");
    g = onGrammarProgress(g, 0.85, true);
    expect(g.status).toBe("completed");
  });
});

describe("servability constraint", () => {
  const inv = { vocabIds: new Set(["w1", "w2"]), grammarIds: new Set(["g1"]) };
  it("serves items fully inside the inventory", () => {
    expect(itemIsServable(inv, ["w1"], ["g1"])).toBe(true);
  });
  it("rejects items with any out-of-inventory dependency", () => {
    expect(itemIsServable(inv, ["w1", "w3"], ["g1"])).toBe(false);
    expect(itemIsServable(inv, ["w1"], ["g2"])).toBe(false);
  });
});
