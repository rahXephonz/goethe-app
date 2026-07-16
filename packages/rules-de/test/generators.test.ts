import { describe, expect, it } from "vitest";
import {
  articleQuestion,
  conjugate,
  conjugationQuestion,
  mulberry32,
  type Noun,
  type Person,
  type RegularVerb,
  wordOrderQuestion,
} from "../src/generators.js";

const tisch: Noun = { id: "n-tisch", lemma: "Tisch", gender: "m", translationId: "meja" };
const lampe: Noun = { id: "n-lampe", lemma: "Lampe", gender: "f", translationId: "lampu" };
const buch: Noun = { id: "n-buch", lemma: "Buch", gender: "n", translationId: "buku" };

const lernen: RegularVerb = {
  id: "v-lernen",
  infinitive: "lernen",
  stem: "lern",
  translationId: "belajar",
};
const arbeiten: RegularVerb = {
  id: "v-arbeiten",
  infinitive: "arbeiten",
  stem: "arbeit",
  translationId: "bekerja",
};

describe("article generator", () => {
  it("keys are correct by construction", () => {
    expect(articleQuestion(tisch).key).toBe("der");
    expect(articleQuestion(lampe).key).toBe("die");
    expect(articleQuestion(buch).key).toBe("das");
  });
  it("exactly one correct option among options", () => {
    const q = articleQuestion(tisch);
    expect(q.options.filter((o) => o === q.key)).toHaveLength(1);
    expect(new Set(q.options).size).toBe(q.options.length);
  });
  it("is deterministic for the same seed", () => {
    expect(articleQuestion(tisch, 42)).toEqual(articleQuestion(tisch, 42));
  });
});

describe("conjugation generator", () => {
  it("regular endings", () => {
    expect(conjugate(lernen, "ich")).toBe("lerne");
    expect(conjugate(lernen, "du")).toBe("lernst");
    expect(conjugate(lernen, "er_sie_es")).toBe("lernt");
    expect(conjugate(lernen, "wir")).toBe("lernen");
    expect(conjugate(lernen, "ihr")).toBe("lernt");
    expect(conjugate(lernen, "sie_Sie")).toBe("lernen");
  });
  it("-t stems insert e (arbeiten)", () => {
    expect(conjugate(arbeiten, "du")).toBe("arbeitest");
    expect(conjugate(arbeiten, "er_sie_es")).toBe("arbeitet");
    expect(conjugate(arbeiten, "ihr")).toBe("arbeitet");
    expect(conjugate(arbeiten, "ich")).toBe("arbeite");
  });
  it("no distractor equals the key, options unique (property, all persons x verbs)", () => {
    const persons: Person[] = ["ich", "du", "er_sie_es", "wir", "ihr", "sie_Sie"];
    for (const verb of [lernen, arbeiten]) {
      for (const p of persons) {
        const q = conjugationQuestion(verb, p, 7);
        expect(q.options).toContain(q.key);
        expect(q.options.filter((o) => o === q.key)).toHaveLength(1);
        expect(new Set(q.options).size).toBe(q.options.length);
      }
    }
  });
});

describe("word order generator", () => {
  it("key is V2, distractors violate V2", () => {
    const q = wordOrderQuestion({
      subject: "ich",
      finiteVerb: "lerne",
      complement: "Deutsch",
      depVocabIds: ["v-lernen"],
    });
    expect(q.key).toBe("Ich lerne Deutsch.");
    expect(q.options).toContain("Ich Deutsch lerne.");
    expect(q.options).toContain("Lerne ich Deutsch.");
  });
});

describe("prng", () => {
  it("mulberry32 is deterministic", () => {
    const a = mulberry32(123);
    const b = mulberry32(123);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });
});
