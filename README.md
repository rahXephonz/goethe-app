# goethe.pro — Monorepo

Architecture behind goethe.pro

## Layout
```
apps/web              Astro 5 SSR — UI, server-side cookie-auth middleware
apps/api              Hono — auth + business routes (thin; logic lives in packages)
packages/auth         Sessions & password hashing (pure, store-agnostic, tested)
packages/kis          SM-2 scheduler + KIS status transitions (tested)
packages/rules-engine Tier-1 generators, keys correct by construction (tested)
packages/db           Drizzle schema + client + migrations
packages/prompts      Model routing config + LLM output contracts (Zod)
scripts/              seed-invites.ts (closed-beta codes)
```

## Auth model
Opaque 256-bit token in an `httpOnly` `SameSite=Lax` cookie; **only SHA-256(token) stored**.
Sliding 30-day expiration. scrypt password hashing (node:crypto, no native deps).
Astro middleware validates the cookie **directly against the DB** via `@goethepro/auth`
(no HTTP hop per page load). Registration is invite-gated (closed beta).

Single origin in dev: browser -> Astro :4321, Vite proxies `/api` -> Hono :8787,
so API-set cookies are first-party. Mirror with a reverse proxy in prod.

## Run
```bash
docker compose up -d            # postgres :5432 + languagetool :8010
cp .env.example .env
pnpm install
pnpm db:generate && pnpm db:migrate
pnpm tsx scripts/seed-invites.ts 5
pnpm dev                        # web :4321 + api :8787
```

## Test / typecheck
```bash
pnpm test        # kis (16) + rules-engine (8) + auth (10)
pnpm typecheck
```
