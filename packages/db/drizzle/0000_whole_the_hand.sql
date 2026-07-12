CREATE TYPE "public"."field" AS ENUM('pflege', 'gastronomie', 'handwerk', 'it', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."goal" AS ENUM('ausbildung', 'study', 'work', 'family', 'other');--> statement-breakpoint
CREATE TYPE "public"."grammar_status" AS ENUM('locked', 'in_progress', 'completed');--> statement-breakpoint
CREATE TYPE "public"."item_status" AS ENUM('active', 'quarantined');--> statement-breakpoint
CREATE TYPE "public"."vocab_status" AS ENUM('new', 'learning', 'known');--> statement-breakpoint
CREATE TABLE "attempts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"item_id" text,
	"item_tier" integer NOT NULL,
	"context" text NOT NULL,
	"answer" text NOT NULL,
	"correct" boolean NOT NULL,
	"ms" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grammar_items" (
	"id" text PRIMARY KEY NOT NULL,
	"chapter_ref" text,
	"cefr_sublevel" text NOT NULL,
	"title_id" text NOT NULL,
	"explanation_template_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invite_codes" (
	"code" text PRIMARY KEY NOT NULL,
	"created_by" text,
	"used_by" text,
	"used_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "item_bank" (
	"id" text PRIMARY KEY NOT NULL,
	"tier" integer NOT NULL,
	"type" text NOT NULL,
	"payload" jsonb NOT NULL,
	"dep_vocab_ids" jsonb NOT NULL,
	"dep_grammar_ids" jsonb NOT NULL,
	"cefr_sublevel" text NOT NULL,
	"serve_count" integer DEFAULT 0 NOT NULL,
	"correct_count" integer DEFAULT 0 NOT NULL,
	"report_count" integer DEFAULT 0 NOT NULL,
	"status" "item_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mistake_log" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"item_id" text,
	"error_type" text,
	"redeemed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"user_id" text PRIMARY KEY NOT NULL,
	"goal" "goal",
	"field" "field",
	"timeline" text,
	"minutes_per_day" integer,
	"reminder_slot" text,
	"challenges" jsonb,
	"placed_sublevel" text,
	"target_level" text
);
--> statement-breakpoint
CREATE TABLE "roadmap_units" (
	"id" text PRIMARY KEY NOT NULL,
	"ordinal" integer NOT NULL,
	"cefr_sublevel" text NOT NULL,
	"source" text NOT NULL,
	"source_ref" text NOT NULL,
	"unlocks_vocab_ids" jsonb NOT NULL,
	"unlocks_grammar_ids" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"token_hash" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "streaks" (
	"user_id" text PRIMARY KEY NOT NULL,
	"current" integer DEFAULT 0 NOT NULL,
	"longest" integer DEFAULT 0 NOT NULL,
	"last_earned_on" text,
	"freeze_used_in_month" text
);
--> statement-breakpoint
CREATE TABLE "user_grammar" (
	"user_id" text NOT NULL,
	"grammar_id" text NOT NULL,
	"status" "grammar_status" DEFAULT 'locked' NOT NULL,
	"drill_accuracy" real DEFAULT 0 NOT NULL,
	"chapter_marked_done" boolean DEFAULT false NOT NULL,
	CONSTRAINT "user_grammar_user_id_grammar_id_pk" PRIMARY KEY("user_id","grammar_id")
);
--> statement-breakpoint
CREATE TABLE "user_roadmap_progress" (
	"user_id" text NOT NULL,
	"unit_id" text NOT NULL,
	"completed_at" timestamp with time zone,
	CONSTRAINT "user_roadmap_progress_user_id_unit_id_pk" PRIMARY KEY("user_id","unit_id")
);
--> statement-breakpoint
CREATE TABLE "user_vocab" (
	"user_id" text NOT NULL,
	"vocab_id" text NOT NULL,
	"status" "vocab_status" DEFAULT 'learning' NOT NULL,
	"ease" real DEFAULT 2.5 NOT NULL,
	"interval_days" integer DEFAULT 0 NOT NULL,
	"reps" integer DEFAULT 0 NOT NULL,
	"due_at" timestamp with time zone DEFAULT now() NOT NULL,
	"consecutive_correct" integer DEFAULT 0 NOT NULL,
	"consecutive_wrong" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "user_vocab_user_id_vocab_id_pk" PRIMARY KEY("user_id","vocab_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vocab_items" (
	"id" text PRIMARY KEY NOT NULL,
	"lemma" text NOT NULL,
	"pos" text NOT NULL,
	"gender" text,
	"plural" text,
	"verb_stem" text,
	"translation_id" text NOT NULL,
	"cefr" text NOT NULL,
	"example_de" text
);
--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invite_codes" ADD CONSTRAINT "invite_codes_used_by_users_id_fk" FOREIGN KEY ("used_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mistake_log" ADD CONSTRAINT "mistake_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "streaks" ADD CONSTRAINT "streaks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_grammar" ADD CONSTRAINT "user_grammar_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_grammar" ADD CONSTRAINT "user_grammar_grammar_id_grammar_items_id_fk" FOREIGN KEY ("grammar_id") REFERENCES "public"."grammar_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roadmap_progress" ADD CONSTRAINT "user_roadmap_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roadmap_progress" ADD CONSTRAINT "user_roadmap_progress_unit_id_roadmap_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."roadmap_units"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_vocab" ADD CONSTRAINT "user_vocab_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_vocab" ADD CONSTRAINT "user_vocab_vocab_id_vocab_items_id_fk" FOREIGN KEY ("vocab_id") REFERENCES "public"."vocab_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "attempts_user_idx" ON "attempts" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "item_bank_level_idx" ON "item_bank" USING btree ("cefr_sublevel","status");--> statement-breakpoint
CREATE INDEX "mistakes_user_idx" ON "mistake_log" USING btree ("user_id","redeemed_at");--> statement-breakpoint
CREATE UNIQUE INDEX "roadmap_ordinal_ux" ON "roadmap_units" USING btree ("ordinal");--> statement-breakpoint
CREATE INDEX "sessions_user_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_vocab_due_idx" ON "user_vocab" USING btree ("user_id","due_at");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_ux" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "vocab_lemma_idx" ON "vocab_items" USING btree ("lemma");