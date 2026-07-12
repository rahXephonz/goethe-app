import { createDb, type Db } from "@goethepro/db";
import { Context, Layer } from "effect";

/** DI handle for the Drizzle database. Provided once by the app runtime. */
export class Database extends Context.Tag("Database")<Database, Db>() {}

export const DatabaseLive = Layer.sync(Database, () => createDb());
