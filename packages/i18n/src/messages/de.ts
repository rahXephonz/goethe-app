import type { Messages } from "./en";

/** German catalog. Typed against `en` — missing/extra keys fail typecheck. */
export const de: Messages = {
  "common.loading": "…",
  "common.appName": "linguaa.app",

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

  "dashboard.languages.title": "Deine Sprachen",
  "dashboard.languages.subtitle":
    "Wähle, was du lernen möchtest — auch mehrere Sprachen sind möglich.",
  "dashboard.languages.enroll": "Jetzt lernen",
  "dashboard.languages.enrolled": "Eingeschrieben — {level}",
  "dashboard.languages.error": "Einschreibung fehlgeschlagen. Bitte erneut versuchen.",

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
  "landing.nav.platform.writingFeedback": "Schreib-Feedback",
  "landing.nav.platform.placementTest": "Einstufungstest",
  "landing.nav.platform.aiAssistant": "KI-Assistent",

  "landing.hero.title": "Eine Sprache lernen in den stillen Stunden.",
  "landing.hero.subtitle":
    "Eine ruhige tägliche Routine — eine Einheit, deine Wiederholungen, eine Prüfung — nur aus dem, was du wirklich gelernt hast, frei und offen.",
  "landing.hero.joinWaitlist": "Warteliste beitreten",

  "landing.philosophy.title": "Wir glauben, dass Beständigkeit aus Ruhe entsteht, nicht aus Druck.",
  "landing.philosophy.subtitle":
    "linguaa.app bettet fortschrittliche KI in eine ruhige Abendroutine ein. Unser Daily Loop sorgt dafür, dass du dich nie überfordert fühlst.",
  "landing.philosophy.learn.title": "Aufnehmen",
  "landing.philosophy.learn.body":
    "Nimm neuen Lernstoff in kleinen, leicht verdaulichen Portionen auf.",
  "landing.philosophy.review.title": "Üben",
  "landing.philosophy.review.body":
    "Wende ihn direkt mit einem geduldigen, intelligenten KI-Partner an.",
  "landing.philosophy.reflect.title": "Ausruhen",
  "landing.philosophy.reflect.body":
    "Schließe die App ganz in Ruhe. Lass dein Gehirn die Erinnerungen im Schlaf verarbeiten.",
  "landing.philosophy.master.title": "Meistern",
  "landing.philosophy.master.body":
    "Fortschritt, der leise kommt. Das tägliche Dranbleiben macht die Arbeit — ohne Eile, mit stetiger Tiefe.",

  "landing.earlyAccess.title": "Jetzt frühen Zugang sichern",
  "landing.earlyAccess.subtitle":
    "Fordere eine Einladung an und starte deine erste stille Lektion.",
  "landing.earlyAccess.emailPlaceholder": "Deine E-Mail-Adresse",
  "landing.earlyAccess.joinWaitlist": "Warteliste beitreten",

  "landing.faq.title": "Häufig gestellte Fragen",
  "landing.faq.subtitle":
    "Praktische Antworten zum Lernen mit linguaa.app und zu einer ruhigen täglichen Gewohnheit.",
  "landing.faq.ai.question": "Kann die KI den Kontext eines Gesprächs verstehen?",
  "landing.faq.ai.answer":
    "Ja. Übungen und Feedback berücksichtigen die Lektion, dein aktuelles Niveau und die Sprache, die du lernst.",
  "landing.faq.time.question": "Wie viel Zeit sollte ich täglich einplanen?",
  "landing.faq.time.answer":
    "Etwa 15–20 ruhige Minuten reichen für eine Lektion, fällige Wiederholungen und eine kurze tägliche Prüfung.",
  "landing.faq.beginner.question": "Kann ich ganz ohne Vorkenntnisse anfangen?",
  "landing.faq.beginner.answer":
    "Ja. Der Lernpfad beginnt auf deinem aktuellen Niveau und führt Wortschatz und Grammatik schrittweise ein.",
  "landing.faq.languages.question": "Welche Sprachen kann ich lernen?",
  "landing.faq.languages.answer":
    "Deutsch ist das aktive Lernmodul. Englisch und Japanisch werden als zukünftige Module vorbereitet.",
  "landing.faq.dailyLoop.question": "Was ist der Daily Loop?",
  "landing.faq.dailyLoop.answer":
    "Eine konzentrierte Abfolge aus einer Lektion, Wiederholungen mit Spaced Repetition und einer Prüfung aus bereits Gelerntem.",
  "landing.faq.cost.question": "Ist linguaa.app kostenlos?",
  "landing.faq.cost.answer":
    "Die aktuelle geschlossene Beta ist kostenlos und einladungsbasiert, während wir mit einer kleinen frühen Gruppe lernen.",
  "landing.faq.progress.question": "Wie wird mein Fortschritt gemessen?",
  "landing.faq.progress.answer":
    "Er basiert auf abgeschlossenen Lektionen, Wiederholungen und Prüfungen. Bewertungen bleiben verborgen, bis genügend Daten vorliegen.",

  "landing.learningPath.title": "Deine ruhige lernreise",
  "landing.learningPath.subtitle": "Fokus auf stetigen Fortschritt, nicht auf Tempo.",
  "landing.learningPath.step1.days": "TAG 1-14",
  "landing.learningPath.step1.title": "Der stille Anfang",
  "landing.learningPath.step1.body":
    "Baue Grundlagen und Selbstvertrauen auf. Lerne die Grundstruktur, ohne Druck, in Echtzeit sprechen zu müssen.",
  "landing.learningPath.step2.days": "TAG 15-45",
  "landing.learningPath.step2.title": "Sanfte Gespräche",
  "landing.learningPath.step2.body":
    "Übe mit KI in echten Alltagsszenarien wie Kaffee bestellen oder über Hobbys sprechen.",
  "landing.learningPath.step3.days": "AB TAG 45",
  "landing.learningPath.step3.title": "Eigenständiger Ablauf",
  "landing.learningPath.step3.body":
    "Genieße es, echte Inhalte zu konsumieren, und beginne, in der Zielsprache zu denken, ohne im Kopf zu übersetzen.",

  "landing.footer.title": "Eine neue Sprache lernen.",
  "landing.footer.subtitle": "Eine ruhige tägliche Routine.",
  "landing.footer.cardLead": "linguaa.app ist eine ruhige tägliche Routine",
  "landing.footer.cardRest":
    "die dich vom Anfänger zum selbstständigen Lernen bringt — ein stiller Abend nach dem anderen.",
  "landing.footer.beta": "Frei und offen — Beta mit Einladungscode.",
  "landing.footer.madeWith": "Mit ♥ gemacht für alle, die Sprachen lernen",
};
