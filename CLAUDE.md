# CLAUDE.md — goethe.pro

> Drop this file at the repo root. Also copy `deutsch-app-build-plan.md` and
> `deutsch-app-architecture.md` into `docs/` — they are the product spec and
> system spec. When this file and those docs conflict, the docs win.

## What this is
Web app for Everyones learning German A0→B1 (Ausbildung route). Closed free
beta, friends & family, invite-code gated. Owner is user #1 and studies with it
daily. Stack: pnpm monorepo — Astro 5 SSR (`apps/web`) + Hono (`apps/api`) +
Postgres/Drizzle. Server-side cookie sessions, hand-rolled (no auth library, no JWT).

## Non-negotiable invariants (never violate, never "temporarily" bypass)
1. **KIS constraint:** every question/exercise served may only use vocab with
   status `learning|known` and grammar `in_progress|completed`, plus ≤2 new
   items, explicitly flagged and glossed. Enforced via `itemIsServable()` in
   `@goethepro/kis`. Log + assert this at exam assembly; a violation is a bug,
   not a degradation.
2. **No LLM calls in the daily-loop hot path.** Today's Plan, Daily Exam
   assembly, SRS review, grading of objective items = SQL + pure functions
   only. LLM lives in: nightly batch (Tier 2), Schreiben grading, Tanya
   Grammatik, Sprechen, roadmap generation (once/user).
3. **Three-tier content model** (docs/architecture §2): Tier 1 = rules-engine,
   keys correct by construction; Tier 2 = batch-generated into `item_bank`,
   solver-verified before insert, never generated live; Tier 3 = rubric-grounded
   free-response grading with the §8 QA stack (LanguageTool cross-check,
   per-rule Everyone explanation templates, injected-error benchmark gates:
   FPR <5%, mechanical recall >90%).
4. **Auth model:** opaque 256-bit token, only SHA-256 stored, httpOnly +
   SameSite=Lax cookie, sliding 30-day expiry, scrypt. Single origin (web
   proxies `/api` → Hono). Never introduce JWT, never store raw tokens.
5. **Honesty rules:** hero number is a labeled estimate range, never a point;
   no fabricated testimonials/logos; loading steps map to real work; skill
   scores show "belum cukup data" under 5 items, never a fake number.
6. **UI language is English** (casual-baku, like the existing pages).
   German content is the study material; explanations contrast with Everyone.

## Conventions
- Business logic lives in `packages/*` (pure, tested with Vitest); apps are
  thin route/UI layers. New logic → new/existing package + tests FIRST.
- TypeScript strict, `noUncheckedIndexedAccess`, ESM everywhere.
- Rules-engine generators must be deterministic (seeded PRNG) with
  property-style tests proving: key always present exactly once, distractors
  never equal key, options unique.
- Drizzle schema in `packages/db/src/schema.ts`; `pnpm db:generate && pnpm db:migrate`.
- Commands: `pnpm dev` (web :4321 + api :8787), `pnpm test`, `pnpm typecheck`,
  `docker compose up -d` (postgres :5432, languagetool :8010),
  `pnpm tsx scripts/seed-invites.ts N`.

## Current state (already built & tested — 34 tests green)
- `@goethepro/kis`: SM-2 (1→6→×EF, floor 1.3, again→requeue) + status
  transitions (learning→known: 3 consecutive correct AND interval ≥7d;
  known→learning: 2 consecutive fails) + `itemIsServable()`.
- `@goethepro/rules-engine`: article (der/die/das), present-tense regular
  conjugation (incl. -t/-d stem e-insertion), V2 word order. Seeded PRNG.
- `@goethepro/auth`: sessions + scrypt, store-agnostic `SessionStore`.
- `@goethepro/db`: full schema per architecture §3, first migration generated.
- `apps/api`: register (invite-gated, transactional), login (uniform error),
  logout, me, profile. `apps/web`: middleware auth, login/register/dashboard.
- `@goethepro/prompts`: model routing config + `gradingResultSchema` (Zod).

## Build order (from docs/deutsch-app-build-plan.md — follow it, don't reorder)
Week 1 remaining: roadmap seed → Today's Plan → SRS review UI → auto card gen →
Daily Exam assembly → streak → mistake log.
Week 2: onboarding funnel (10 screens, spec'd in plan item 8) → placement test →
roadmap generator → Schreiben grader (+ §8 QA benchmark BEFORE it ships).
Deferred/Phase 2 items stay deferred. If scope pressure hits, cut order:
Hören gen → photo-to-deck → Sprechen → Tanya Grammatik. Never cut Week 1.

---
---

# KICKOFF PROMPT (paste this as the first message in Claude Code)

Read CLAUDE.md, docs/deutsch-app-build-plan.md, and
docs/deutsch-app-architecture.md fully before writing any code.

Task: complete build-plan Week 1, in this order.

1. **Roadmap seed (plan item 1, architecture risk #2).** Create
   `packages/content` with the A0→A1.1 slice of the roadmap as typed data:
   the first ~10 `roadmap_units` (Nicos Weg A1 episodes 1–10 mapped to
   Grammatik Aktiv chapters), each unit listing `unlocksVocabIds` and
   `unlocksGrammarIds`, plus the corresponding `vocab_items` rows (~120 words
   with gender/plural/stem metadata the rules-engine needs, Everyone
   translations) and `grammar_items` rows. Write a `scripts/seed-content.ts`
   that upserts it. I will review this data manually — flag any word where
   you are uncertain about gender/plural instead of guessing silently.

2. **Exam assembly (plan item 5, architecture Flow B).** New package
   `packages/exam`: pure function `assembleExam(inventory, bankItems, mistakes,
   seed)` → 10 questions (4 vocab 70/30 learning/known, 3 grammar, 2 mini-Lesen
   from bank, 1 redemption), Tier-1 slots filled via `@goethepro/rules-engine`,
   every item passed through `itemIsServable` with a hard assert. Property
   tests: never serves out-of-inventory content, deterministic per seed,
   handles sparse banks (A0 cold start: fall back to more Tier-1). Then a
   `POST /api/exam/today` route + grading endpoint that writes `attempts`,
   `mistake_log`, updates `user_vocab` via `@goethepro/kis`, and the streak
   (pass ≥70%, one retake with fresh seed, freeze logic per plan item 6).

3. **Today's Plan page (plan item 2)** in `apps/web`: server-rendered
   checklist (next roadmap unit, due reviews count, exam, placeholder
   Schreiben slot) with progress ring; pick Solid or Preact for the exam +
   SRS islands (justify the choice in one paragraph, then commit).

Definition of done: `pnpm test` green including new property tests,
`pnpm typecheck` clean, and I can run the full loop locally — open dashboard,
see Today's Plan, take a generated exam, pass it, watch the streak go to 1.
Work package by package; show me the roadmap seed data for review before
building on top of it.