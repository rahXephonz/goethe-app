import type { Locale } from "../config";
import { de } from "./de";
import { en, type Messages } from "./en";
import { id } from "./id";

/** All catalogs keyed by locale. Static imports -> bundled, edge-safe (no fs). */
export const dictionaries: Record<Locale, Messages> = { en, id, de };

export type { MessageKey, Messages } from "./en";
