import type { Messages } from "./en";

/** German catalog. Typed against `en` — missing/extra keys fail typecheck. */
export const de: Messages = {
  "common.loading": "…",
  "common.appName": "goethe.pro",

  "auth.login.title": "Anmelden",
  "auth.login.email": "E-Mail",
  "auth.login.password": "Passwort",
  "auth.login.submit": "Anmelden",
  "auth.login.submitting": "Wird verarbeitet…",
  "auth.login.error": "Anmeldung fehlgeschlagen",
  "auth.login.noAccount": "Noch kein Konto?",
  "auth.login.registerLink": "Mit Einladungscode registrieren",

  "auth.register.title": "Registrieren (geschlossene Beta)",
  "auth.register.inviteCode": "Einladungscode",
  "auth.register.email": "E-Mail",
  "auth.register.password": "Passwort (min. 10)",
  "auth.register.submit": "Konto erstellen",
  "auth.register.submitting": "Wird verarbeitet…",
  "auth.register.error": "Registrierung fehlgeschlagen",
  "auth.register.haveAccount": "Schon ein Konto?",
  "auth.register.loginLink": "Anmelden",

  "auth.logout": "Abmelden",

  "api.error.invalidInput": "Ungültige Eingabe",
  "api.error.passwordTooShort": "Passwort muss mindestens 10 Zeichen lang sein",
  "api.error.inviteInvalid": "Einladungscode ist ungültig oder bereits verwendet",
  "api.error.emailTaken": "E-Mail ist bereits registriert",
  "api.error.invalidCredentials": "E-Mail oder Passwort ist falsch",
  "api.error.unauthorized": "Nicht autorisiert",
  "api.error.internal": "Etwas ist schiefgelaufen. Bitte erneut versuchen.",

  "dashboard.title": "Dashboard",
  "dashboard.greeting": "Hallo, {email} 👋",
  "dashboard.sessionNote": "Sitzung ist hier validiert",
};
