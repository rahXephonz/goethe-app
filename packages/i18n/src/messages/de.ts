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

  "landing.nav.howItWorks": "So funktioniert's",
  "landing.nav.openApp": "App öffnen",
  "landing.nav.language": "Sprache",
  "landing.nav.menu": "Menü",

  "landing.nav.platform": "Plattform",
  "landing.nav.learningPath": "Lernpfad",
  "landing.nav.platform.todaysPlan": "Tagesplan",
  "landing.nav.platform.dailyExam": "Tägliche Prüfung",
  "landing.nav.platform.srsReview": "SRS-Wiederholung",
  "landing.nav.platform.mistakeLog": "Fehlerprotokoll",
  "landing.nav.platform.roadmap": "Roadmap",
  "landing.nav.platform.streak": "Streak",
  "landing.nav.platform.schreiben": "Schreiben-Bewertung",
  "landing.nav.platform.placementTest": "Einstufungstest",
  "landing.nav.platform.aiAssistant": "KI-Assistent",

  "landing.hero.title": "Deutsch lernen in den stillen Stunden.",
  "landing.hero.subtitle":
    "Eine ruhige tägliche Routine — eine Einheit, deine Wiederholungen, eine Prüfung — nur aus dem, was du wirklich gelernt hast. A0 bis B1, frei und offen.",
  "landing.hero.redeemInvite": "Einladungscode einlösen",

  "landing.footer.headline1": "Deutsch, A0 bis B1.",
  "landing.footer.headline2": "Gemacht für den Ausbildungsweg.",
  "landing.footer.cardLead": "goethe.pro ist eine ruhige tägliche Routine",
  "landing.footer.cardRest": "die dich von A0 zu B1 bringt — ein stiller Abend nach dem anderen.",
  "landing.footer.beta": "Frei und offen — Beta mit Einladungscode.",
  "landing.footer.madeWith": "Mit ♥ gemacht für alle, die Deutsch lernen",
};
