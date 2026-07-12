import type { SessionStore } from "@goethepro/auth";
import { Context, Effect, Layer } from "effect";
import { drizzleSessionStore } from "@/db/session-store.js";
import { Database } from "./database.js";

/** DI handle for the session store. Derived from the Database service. */
export class Sessions extends Context.Tag("Sessions")<Sessions, SessionStore>() {}

export const SessionsLive = Layer.effect(Sessions, Effect.map(Database, drizzleSessionStore));
