import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// Auth (architecture §4 Flow A; server-side cookie sessions)
// ---------------------------------------------------------------------------
export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(), // nanoid
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(), // scrypt: salt:hash (hex)
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("users_email_ux").on(t.email)],
);

export const sessions = pgTable(
  "sessions",
  {
    /** SHA-256 hash of the opaque token. Raw token never touches the DB. */
    tokenHash: text("token_hash").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("sessions_user_idx").on(t.userId)],
);

export const inviteCodes = pgTable("invite_codes", {
  code: text("code").primaryKey(),
  createdBy: text("created_by"),
  usedBy: text("used_by").references(() => users.id),
  usedAt: timestamp("used_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Profile (funnel answers = goal setup; plan item 8)
// ---------------------------------------------------------------------------
// `ausbildung` = German vocational training path (kept intentionally as a
// distinct goal); the rest are generic English goals.
export const goalEnum = pgEnum("goal", ["ausbildung", "study", "work", "family", "other"]);
// German vocational sectors the learner targets (domain terms), plus `unknown`.
export const fieldEnum = pgEnum("field", ["pflege", "gastronomie", "handwerk", "it", "unknown"]);

export const profiles = pgTable("profiles", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  goal: goalEnum("goal"),
  field: fieldEnum("field"),
  timeline: text("timeline"), // <6m | 6-12m | 1-2y | unknown
  minutesPerDay: integer("minutes_per_day"),
  reminderSlot: text("reminder_slot"), // morning | noon | night
  challenges: jsonb("challenges").$type<string[]>(),
  placedSublevel: text("placed_sublevel"), // A0, A1.1, ...
  targetLevel: text("target_level"), // B1 | B2
});

// ---------------------------------------------------------------------------
// KIS: vocab + grammar inventories (architecture §3; kis package logic)
// ---------------------------------------------------------------------------
export const vocabItems = pgTable(
  "vocab_items",
  {
    id: text("id").primaryKey(),
    lemma: text("lemma").notNull(),
    pos: text("pos").notNull(), // noun | verb | adj | ...
    gender: text("gender"), // m|f|n for nouns
    plural: text("plural"),
    verbStem: text("verb_stem"),
    translationId: text("translation_id").notNull(), // Indonesian
    cefr: text("cefr").notNull(),
    exampleDe: text("example_de"),
  },
  (t) => [index("vocab_lemma_idx").on(t.lemma)],
);

export const vocabStatusEnum = pgEnum("vocab_status", ["new", "learning", "known"]);

export const userVocab = pgTable(
  "user_vocab",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    vocabId: text("vocab_id")
      .notNull()
      .references(() => vocabItems.id),
    status: vocabStatusEnum("status").notNull().default("learning"),
    // SM-2 state (packages/kis/sm2.ts)
    ease: real("ease").notNull().default(2.5),
    intervalDays: integer("interval_days").notNull().default(0),
    reps: integer("reps").notNull().default(0),
    dueAt: timestamp("due_at", { withTimezone: true }).notNull().defaultNow(),
    consecutiveCorrect: integer("consecutive_correct").notNull().default(0),
    consecutiveWrong: integer("consecutive_wrong").notNull().default(0),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.vocabId] }),
    index("user_vocab_due_idx").on(t.userId, t.dueAt),
  ],
);

export const grammarItems = pgTable("grammar_items", {
  id: text("id").primaryKey(), // e.g. "art-def-nom"
  chapterRef: text("chapter_ref"), // Grammatik Aktiv mapping
  cefrSublevel: text("cefr_sublevel").notNull(),
  titleId: text("title_id").notNull(), // Indonesian title
  explanationTemplateId: text("explanation_template_id").notNull(),
});

export const grammarStatusEnum = pgEnum("grammar_status", ["locked", "in_progress", "completed"]);

export const userGrammar = pgTable(
  "user_grammar",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    grammarId: text("grammar_id")
      .notNull()
      .references(() => grammarItems.id),
    status: grammarStatusEnum("status").notNull().default("locked"),
    drillAccuracy: real("drill_accuracy").notNull().default(0),
    chapterMarkedDone: boolean("chapter_marked_done").notNull().default(false),
  },
  (t) => [primaryKey({ columns: [t.userId, t.grammarId] })],
);

// ---------------------------------------------------------------------------
// Item bank (three-tier model, architecture §2). Tier-1 items are generated
// at runtime by the rules engine and are NOT stored here; this bank holds
// Tier-2 (batch-generated, solver-verified) items.
// ---------------------------------------------------------------------------
export const itemStatusEnum = pgEnum("item_status", ["active", "quarantined"]);

export const itemBank = pgTable(
  "item_bank",
  {
    id: text("id").primaryKey(),
    tier: integer("tier").notNull(), // 2 for now
    type: text("type").notNull(), // vocab_context | mini_lesen | hoeren
    payload: jsonb("payload").notNull(), // { stem, options, key, gloss, passage? }
    depVocabIds: jsonb("dep_vocab_ids").$type<string[]>().notNull(),
    depGrammarIds: jsonb("dep_grammar_ids").$type<string[]>().notNull(),
    cefrSublevel: text("cefr_sublevel").notNull(),
    serveCount: integer("serve_count").notNull().default(0),
    correctCount: integer("correct_count").notNull().default(0),
    reportCount: integer("report_count").notNull().default(0),
    status: itemStatusEnum("status").notNull().default("active"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("item_bank_level_idx").on(t.cefrSublevel, t.status)],
);

// ---------------------------------------------------------------------------
// Attempts + mistake log (feeds redemption questions, skill scores, item stats)
// ---------------------------------------------------------------------------
export const attempts = pgTable(
  "attempts",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    itemId: text("item_id"), // bank id, or rules-engine generated id
    itemTier: integer("item_tier").notNull(),
    context: text("context").notNull(), // exam | drill | review
    answer: text("answer").notNull(),
    correct: boolean("correct").notNull(),
    ms: integer("ms"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("attempts_user_idx").on(t.userId, t.createdAt)],
);

export const mistakeLog = pgTable(
  "mistake_log",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    itemId: text("item_id"),
    errorType: text("error_type"),
    redeemedAt: timestamp("redeemed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("mistakes_user_idx").on(t.userId, t.redeemedAt)],
);

// ---------------------------------------------------------------------------
// Roadmap + streaks
// ---------------------------------------------------------------------------
export const roadmapUnits = pgTable(
  "roadmap_units",
  {
    id: text("id").primaryKey(),
    ordinal: integer("ordinal").notNull(),
    cefrSublevel: text("cefr_sublevel").notNull(),
    source: text("source").notNull(), // nicos_weg | grammatik_aktiv
    sourceRef: text("source_ref").notNull(),
    unlocksVocabIds: jsonb("unlocks_vocab_ids").$type<string[]>().notNull(),
    unlocksGrammarIds: jsonb("unlocks_grammar_ids").$type<string[]>().notNull(),
  },
  (t) => [uniqueIndex("roadmap_ordinal_ux").on(t.ordinal)],
);

export const userRoadmapProgress = pgTable(
  "user_roadmap_progress",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    unitId: text("unit_id")
      .notNull()
      .references(() => roadmapUnits.id),
    completedAt: timestamp("completed_at", { withTimezone: true }),
  },
  (t) => [primaryKey({ columns: [t.userId, t.unitId] })],
);

export const streaks = pgTable("streaks", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  current: integer("current").notNull().default(0),
  longest: integer("longest").notNull().default(0),
  lastEarnedOn: text("last_earned_on"), // YYYY-MM-DD in user tz
  freezeUsedInMonth: text("freeze_used_in_month"), // YYYY-MM
});
