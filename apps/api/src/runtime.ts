import { Layer, ManagedRuntime } from "effect";
import { type Database, DatabaseLive } from "@/services/database.js";
import { type Sessions, SessionsLive } from "@/services/session.js";

/** Every service the HTTP layer may require. */
export type AppServices = Database | Sessions;

// Sessions depends on Database; provideMerge wires it and exposes both.
const AppLayer = Layer.provideMerge(SessionsLive, DatabaseLive);

/** Long-lived runtime — builds the DB pool once, runs one Effect per request. */
export const runtime = ManagedRuntime.make(AppLayer);
