import { describe, expect, it } from "vitest";
import { DEFAULT_LOCALE, resolveLocale } from "../src/config";
import { createTranslator } from "../src/core";

describe("resolveLocale", () => {
  it("accepts supported locales", () => {
    expect(resolveLocale("de")).toBe("de");
    expect(resolveLocale("id")).toBe("id");
  });

  it("matches the primary subtag of region tags", () => {
    expect(resolveLocale("en-US")).toBe("en");
    expect(resolveLocale("de-AT")).toBe("de");
  });

  it("falls back to default for unknown/empty input", () => {
    expect(resolveLocale("fr")).toBe(DEFAULT_LOCALE);
    expect(resolveLocale(null)).toBe(DEFAULT_LOCALE);
  });
});

describe("createTranslator", () => {
  it("translates a key for the locale", () => {
    expect(createTranslator("de")("auth.login.title")).toBe("Anmelden");
    expect(createTranslator("id")("auth.login.title")).toBe("Masuk");
  });

  it("interpolates params", () => {
    expect(createTranslator("en")("dashboard.greeting", { email: "a@b.co" })).toBe(
      "Hallo, a@b.co 👋",
    );
  });

  it("falls back to the default locale, then the key itself", () => {
    // en is source of truth; every key exists, so fallback returns the key only
    // for a truly missing key.
    const t = createTranslator("en");
    // @ts-expect-error — unknown key is not a MessageKey
    expect(t("does.not.exist")).toBe("does.not.exist");
  });
});
