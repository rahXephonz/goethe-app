/**
 * Known Inventory System — status transitions.
 * This is the single source of truth for "what does this user know".
 * Spec (build plan F0):
 *   Vocab:   new -> learning (card created)
 *            learning -> known (>=3 consecutive correct AND interval >= 7 days)
 *            known -> learning (2 consecutive fails demote)
 *   Grammar: locked -> in_progress (roadmap reaches chapter)
 *            in_progress -> completed (chapter done AND drill accuracy >= 80%)
 */

export type VocabStatus = "new" | "learning" | "known";
export type GrammarStatus = "locked" | "in_progress" | "completed";

export interface VocabTracking {
  status: VocabStatus;
  consecutiveCorrect: number;
  consecutiveWrong: number;
  intervalDays: number;
}

const PROMOTE_CONSECUTIVE = 3;
const PROMOTE_MIN_INTERVAL_DAYS = 7;
const DEMOTE_CONSECUTIVE_FAILS = 2;

export function onCardCreated(): VocabTracking {
  return { status: "learning", consecutiveCorrect: 0, consecutiveWrong: 0, intervalDays: 0 };
}

/**
 * Apply a review outcome to vocab tracking state.
 * `intervalDays` must be the interval AFTER the SM-2 update.
 */
export function onVocabReview(
  t: VocabTracking,
  correct: boolean,
  intervalDays: number,
): VocabTracking {
  if (correct) {
    const consecutiveCorrect = t.consecutiveCorrect + 1;
    const promoted =
      t.status === "learning" &&
      consecutiveCorrect >= PROMOTE_CONSECUTIVE &&
      intervalDays >= PROMOTE_MIN_INTERVAL_DAYS;

    return {
      status: promoted ? "known" : t.status,
      consecutiveCorrect,
      consecutiveWrong: 0,
      intervalDays,
    };
  }
  const consecutiveWrong = t.consecutiveWrong + 1;
  const demoted = t.status === "known" && consecutiveWrong >= DEMOTE_CONSECUTIVE_FAILS;
  return {
    status: demoted ? "learning" : t.status,
    consecutiveCorrect: 0,
    consecutiveWrong,
    intervalDays,
  };
}

export interface GrammarTracking {
  status: GrammarStatus;
  drillAccuracy: number; // 0..1 over the chapter's drill set
  chapterMarkedDone: boolean;
}

const GRAMMAR_COMPLETE_ACCURACY = 0.8;

export function unlockGrammar(t: GrammarTracking): GrammarTracking {
  return t.status === "locked" ? { ...t, status: "in_progress" } : t;
}

export function onGrammarProgress(
  t: GrammarTracking,
  drillAccuracy: number,
  chapterMarkedDone: boolean,
): GrammarTracking {
  const next = { ...t, drillAccuracy, chapterMarkedDone };
  if (
    t.status === "in_progress" &&
    chapterMarkedDone &&
    drillAccuracy >= GRAMMAR_COMPLETE_ACCURACY
  ) {
    next.status = "completed";
  }
  return next;
}

/** The hard constraint every generator/selector must respect. */
export interface KnownInventory {
  vocabIds: ReadonlySet<string>; // status learning|known
  grammarIds: ReadonlySet<string>; // status in_progress|completed
}

/** True iff an item's dependencies are fully answerable by this user today. */
export function itemIsServable(
  inv: KnownInventory,
  depVocabIds: readonly string[],
  depGrammarIds: readonly string[],
): boolean {
  return (
    depVocabIds.every((id) => inv.vocabIds.has(id)) &&
    depGrammarIds.every((id) => inv.grammarIds.has(id))
  );
}
