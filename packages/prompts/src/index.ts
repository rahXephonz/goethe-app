import { z } from "zod";

/**
 * Model routing (architecture §8): workloads -> model ids, config not code.
 * Swap Tier-2 to any open model via inference API by changing one string.
 */
export const MODEL_ROUTING = {
  tier2Generation: process.env.MODEL_TIER2 ?? "claude-haiku-4-5-20251001",
  tier2Solver: process.env.MODEL_TIER2_SOLVER ?? "claude-haiku-4-5-20251001",
  schreibenGrader: process.env.MODEL_GRADER ?? "claude-sonnet-4-6",
  tanyaGrammatik: process.env.MODEL_TUTOR ?? "claude-sonnet-4-6",
  roadmap: process.env.MODEL_ROADMAP ?? "claude-sonnet-4-6",
} as const;

/** Schreiben grader output contract — parse-fail rate is a logged metric. */
export const gradingResultSchema = z.object({
  corrections: z.array(
    z.object({
      start: z.number().int().nonnegative(),
      end: z.number().int().nonnegative(),
      errorType: z.enum(["article", "case", "conjugation", "word_order", "spelling", "semantic"]),
      fix: z.string(),
      /** Mechanical errors reference a curated template; semantic may freestyle. */
      explanationTemplateId: z.string().nullable(),
      freestyleExplanationId: z.string().nullable(),
      ruleId: z.string(),
    }),
  ),
  criteria: z.object({
    erfuellung: z.number().min(0).max(5),
    kohaerenz: z.number().min(0).max(5),
    wortschatz: z.number().min(0).max(5),
    strukturen: z.number().min(0).max(5),
  }),
  tip: z.string(),
});
export type GradingResult = z.infer<typeof gradingResultSchema>;
