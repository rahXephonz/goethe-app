/** Generate N invite codes for the closed beta. Run: pnpm tsx scripts/seed-invites.ts 10 */
import { randomBytes } from "node:crypto";
import { createDb, inviteCodes } from "@goethepro/db";

const n = Number(process.argv[2] ?? 5);
const db = createDb();
const codes = Array.from({ length: n }, () => `DE-${randomBytes(4).toString("hex").toUpperCase()}`);
await db.insert(inviteCodes).values(codes.map((code) => ({ code })));
console.log(codes.join("\n"));
process.exit(0);
