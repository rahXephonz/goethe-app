import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";

export * from "./schema.js";
export { schema };

export type Db = ReturnType<typeof createDb>;

export function createDb(
  url = process.env.DATABASE_URL ?? "postgres://goethepro:goethepro@localhost:5432/goethepro",
) {
  const client = postgres(url, { max: 10 });
  return drizzle(client, { schema });
}
