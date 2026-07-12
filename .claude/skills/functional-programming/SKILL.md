---
name: functional-programming
description: >-
  Use when writing or refactoring any TypeScript in this repo. Enforces the
  project's functional-programming style: pure functions, immutability,
  data-last pipe composition, Option/Result over null-and-throw, and exhaustive
  ts-pattern matching. Names the sanctioned FP libraries (ts-pattern,
  @mobily/ts-belt, effect) and where each belongs.
---

# Functional programming style (goethe.pro)

The owner prefers functional programming. Write new code this way and nudge
refactors toward it — but pragmatically, not dogmatically. Don't rewrite working
code purely for style; apply FP when you touch a file or add logic.

## Core rules

1. **Pure functions by default.** Business logic in `packages/*` must be pure:
   inputs → outputs, no I/O, no hidden mutation, no `Date.now()`/`Math.random()`
   inside — inject clock/seed. This already matches CLAUDE.md (seeded PRNG,
   no LLM in the hot path). Keep it.
2. **Immutability.** No mutating params or shared state. Return new values.
   Prefer `readonly` arrays/props and `as const`. Use `map`/`filter`/`reduce`
   or ts-belt combinators over `for`-loop mutation.
3. **Composition, data-last.** Build behavior by composing small functions with
   `pipe`/`flow`. Favor many tiny named functions over one big imperative block.
4. **No null-and-throw for expected outcomes.** Model "might be absent" as
   `Option` and "might fail" as `Result` (ts-belt) — return them, don't throw.
   Throwing is reserved for genuinely unexpected/invariant violations
   (e.g. the `itemIsServable` hard assert). `me()` returning `null` for a 401 is
   fine at the API boundary; internal logic should thread `Option`/`Result`.
5. **Exhaustive matching.** Use `ts-pattern` `match().with(...).exhaustive()`
   for discriminated unions (vocab/grammar status, exam slot kinds, grading
   outcomes). Exhaustiveness must be compiler-checked — no silent `default`.
6. **Discriminated unions over booleans/optional soup.** Model state as a tagged
   union (`{ kind: "..." }`) and match on it.
7. **Isolate effects at the edges.** DB reads, cookie/session I/O, fetch, and
   LLM calls live in thin app/route layers (`apps/*`). The pure core stays
   effect-free so it's trivially Vitest-testable.

## Sanctioned libraries

- **ts-pattern** — pattern matching + exhaustiveness. Use anywhere you branch on
  a union. First choice, lowest cost.
- **@mobily/ts-belt** — `pipe`, `flow`, `Option`, `Result`, `A`/`D`/`S` (array/
  dict/string) combinators. Default utility belt for the pure `packages/*`
  (kis, rules-engine, exam, content). Fast, tree-shakeable, no runtime baggage.
- **effect** — only for effectful/async orchestration that genuinely benefits
  (typed errors + dependency injection across the API or nightly batch). Do NOT
  pull Effect into the pure daily-loop hot path or the rules engine; ts-belt is
  lighter there. Reach for it deliberately, not by default.

Install per-package only where used, e.g.
`pnpm --filter @goethepro/exam add ts-pattern @mobily/ts-belt`.

## Boundaries / anti-dogma

- Zod schemas, Drizzle query builders, Hono handlers, and React components stay
  idiomatic — don't FP-wrap framework APIs into knots.
- React islands: keep hooks and JSX conventional; apply FP inside helpers/logic,
  not by fighting the component model.
- Don't introduce a monad stack where a plain pure function reads clearer. FP
  here means clarity + testability, not maximal abstraction.
- One FP utility library per concern — don't mix ts-belt `Result` with Effect
  `Either` in the same module.

## Quick reference

```ts
import { match } from "ts-pattern";
import { pipe, A, O } from "@mobily/ts-belt";

// exhaustive union match — compiler errors if a case is missing
const label = (s: VocabStatus) =>
  match(s)
    .with("new", () => "…")
    .with("learning", () => "learning")
    .with("known", () => "known")
    .exhaustive();

// data-last pipe, Option instead of null
const firstServable = (items: readonly Item[]) =>
  pipe(items, A.filter(itemIsServable), A.head); // Option<Item>
```
