/**
 * Tier-1 question generators.
 * Every generator produces items whose answer key is CORRECT BY CONSTRUCTION
 * and whose distractors are WRONG BY CONSTRUCTION. No LLM anywhere.
 */

export type Gender = "m" | "f" | "n";

export interface Noun {
  id: string;
  lemma: string; // "Tisch"
  gender: Gender; // m -> der, f -> die, n -> das
  translationId: string; // "meja"
}

export type Person = "ich" | "du" | "er_sie_es" | "wir" | "ihr" | "sie_Sie";

export interface RegularVerb {
  id: string;
  infinitive: string; // "lernen"
  stem: string; // "lern"
  translationId: string; // "belajar"
}

export interface GeneratedQuestion {
  /** Stable id derived from generator + inputs, so the same question dedupes. */
  id: string;
  type: "article" | "conjugation" | "word_order";
  grammarRuleId: string;
  depVocabIds: string[];
  prompt: string;
  options: string[]; // shuffled, contains exactly one correct
  key: string; // the correct option
  explanationTemplateId: string;
}

// ---------------------------------------------------------------------------
// Deterministic PRNG so generation is reproducible (seed -> same exam).
// ---------------------------------------------------------------------------
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(arr: readonly T[], rand: () => number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const a = out[i]!;
    out[i] = out[j]!;
    out[j] = a;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Generator 1: definite article (Nominativ). Rule: der/die/das by gender.
// ---------------------------------------------------------------------------
const ARTICLE: Record<Gender, string> = { m: "der", f: "die", n: "das" };

export function articleQuestion(noun: Noun, seed = 1): GeneratedQuestion {
  const key = ARTICLE[noun.gender];
  const distractors = Object.values(ARTICLE).filter((a) => a !== key);
  const rand = mulberry32(seed);
  return {
    id: `article:${noun.id}`,
    type: "article",
    grammarRuleId: "art-def-nom",
    depVocabIds: [noun.id],
    prompt: `___ ${noun.lemma}`,
    options: shuffle([key, ...distractors], rand),
    key,
    explanationTemplateId: "tpl-art-def-nom",
  };
}

// ---------------------------------------------------------------------------
// Generator 2: present-tense conjugation of regular (schwach) verbs.
// Endings: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en.
// -t/-d stems (arbeiten, reden) insert -e- before -st/-t (du arbeitest).
// ---------------------------------------------------------------------------
const ENDINGS: Record<Person, string> = {
  ich: "e",
  du: "st",
  er_sie_es: "t",
  wir: "en",
  ihr: "t",
  sie_Sie: "en",
};
const PERSON_LABEL: Record<Person, string> = {
  ich: "ich",
  du: "du",
  er_sie_es: "er/sie/es",
  wir: "wir",
  ihr: "ihr",
  sie_Sie: "sie/Sie",
};

export function conjugate(verb: RegularVerb, person: Person): string {
  const needsE =
    /[td]$/.test(verb.stem) && (person === "du" || person === "er_sie_es" || person === "ihr");
  return verb.stem + (needsE ? "e" : "") + ENDINGS[person];
}

export function conjugationQuestion(
  verb: RegularVerb,
  person: Person,
  seed = 1,
): GeneratedQuestion {
  const key = conjugate(verb, person);
  // Distractors: correct conjugations of OTHER persons -> guaranteed wrong for this person.
  const others = (Object.keys(ENDINGS) as Person[])
    .filter((p) => p !== person)
    .map((p) => conjugate(verb, p));
  const uniqueWrong = [...new Set(others)].filter((w) => w !== key).slice(0, 3);
  const rand = mulberry32(seed);
  return {
    id: `conj:${verb.id}:${person}`,
    type: "conjugation",
    grammarRuleId: "verb-praesens-regular",
    depVocabIds: [verb.id],
    prompt: `${PERSON_LABEL[person]} ___ (${verb.infinitive})`,
    options: shuffle([key, ...uniqueWrong], rand),
    key,
    explanationTemplateId: "tpl-verb-praesens-regular",
  };
}

// ---------------------------------------------------------------------------
// Generator 3: verb-second (V2) word order.
// Given subject / finite verb / complement, the correct main clause is
// S V C. Distractors violate V2 or verb-final incorrectly.
// ---------------------------------------------------------------------------
export interface ClauseParts {
  subject: string; // "ich"
  finiteVerb: string; // "lerne"
  complement: string; // "Deutsch"
  depVocabIds: string[];
}

export function wordOrderQuestion(parts: ClauseParts, seed = 1): GeneratedQuestion {
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const key = `${cap(parts.subject)} ${parts.finiteVerb} ${parts.complement}.`;
  const wrong = [
    `${cap(parts.subject)} ${parts.complement} ${parts.finiteVerb}.`, // verb-final in a main clause
    `${cap(parts.finiteVerb)} ${parts.subject} ${parts.complement}.`, // verb-first (yes/no question order)
  ];
  const rand = mulberry32(seed);
  return {
    id: `v2:${parts.subject}:${parts.finiteVerb}:${parts.complement}`,
    type: "word_order",
    grammarRuleId: "syntax-v2-main-clause",
    depVocabIds: parts.depVocabIds,
    prompt: "Susun kalimat yang benar:",
    options: shuffle([key, ...wrong], rand),
    key,
    explanationTemplateId: "tpl-syntax-v2",
  };
}
