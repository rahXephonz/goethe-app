/**
 * Generate the frontend's per-domain response/request types from the shared
 * zod contracts. One `.d.ts` per domain lands in apps/web/src/types, so the web
 * app depends on plain types (no zod in the browser bundle) that can never
 * drift from the API. Run with `pnpm gen:types` after changing a contract.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as auth from "@goethepro/contracts/auth";
import * as common from "@goethepro/contracts/common";
import * as profile from "@goethepro/contracts/profile";
import * as user from "@goethepro/contracts/user";
import { compile } from "json-schema-to-typescript";
import type { ZodTypeAny } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "../apps/web/src/types");

/** domain file -> exported TypeName -> its zod schema. */
const domains: Record<string, Record<string, ZodTypeAny>> = {
  auth: {
    RegisterRequest: auth.registerRequest,
    LoginRequest: auth.loginRequest,
    AuthResponse: auth.authResponse,
    LogoutResponse: auth.logoutResponse,
  },
  user: {
    User: user.userSchema,
    MeResponse: user.meResponse,
  },
  profile: {
    Profile: profile.profileSchema,
    ProfileResponse: profile.profileResponse,
  },
  common: {
    ApiErrorResponse: common.apiErrorResponse,
  },
};

const HEADER = `/**
 * AUTO-GENERATED from @goethepro/contracts — do not edit by hand.
 * Run \`pnpm gen:types\` after changing a contract schema.
 */
`;

async function generate() {
  await mkdir(OUT_DIR, { recursive: true });

  for (const [domain, schemas] of Object.entries(domains)) {
    const blocks: string[] = [];
    for (const [name, schema] of Object.entries(schemas)) {
      const jsonSchema = zodToJsonSchema(schema, name);
      const ts = await compile(jsonSchema as Parameters<typeof compile>[0], name, {
        bannerComment: "",
        additionalProperties: false,
      });
      blocks.push(ts.trim());
    }
    const file = join(OUT_DIR, `${domain}.d.ts`);
    await writeFile(file, `${HEADER}\n${blocks.join("\n\n")}\n`);
    console.log(`generated types/${domain}.d.ts (${Object.keys(schemas).length} types)`);
  }
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
