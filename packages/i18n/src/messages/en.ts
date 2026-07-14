/** English catalog — the SOURCE OF TRUTH. Its keys type every other locale. */
export const en = {
  "common.loading": "…",
  "common.appName": "goethe.pro",

  "auth.login.title": "Sign in",
  "auth.login.email": "Email",
  "auth.login.password": "Password",
  "auth.login.submit": "Sign in",
  "auth.login.submitting": "Processing…",
  "auth.login.error": "Sign-in failed",
  "auth.login.noAccount": "No account yet?",
  "auth.login.registerLink": "Register with an invite code",

  "auth.register.title": "Register (closed beta)",
  "auth.register.inviteCode": "Invite code",
  "auth.register.email": "Email",
  "auth.register.password": "Password (min. 10)",
  "auth.register.submit": "Create account",
  "auth.register.submitting": "Processing…",
  "auth.register.error": "Registration failed",
  "auth.register.haveAccount": "Already have an account?",
  "auth.register.loginLink": "Sign in",

  "auth.logout": "Log out",

  "api.error.invalidInput": "Invalid input",
  "api.error.passwordTooShort": "Password must be at least 10 characters",
  "api.error.inviteInvalid": "Invite code is invalid or already used",
  "api.error.emailTaken": "Email is already registered",
  "api.error.invalidCredentials": "Email or password is incorrect",
  "api.error.unauthorized": "Unauthorized",
  "api.error.internal": "Something went wrong. Please try again.",

  "dashboard.title": "Dashboard",
  "dashboard.greeting": "Hallo, {email} 👋",
  "dashboard.sessionNote": "Session is validated in here",

  "landing.nav.howItWorks": "How it works",
  "landing.nav.openApp": "Open App",
  "landing.nav.language": "Language",
  "landing.nav.menu": "Menu",

  "landing.nav.platform": "Platform",
  "landing.nav.learningPath": "Learning Path",
  "landing.nav.platform.todaysPlan": "Today's Plan",
  "landing.nav.platform.dailyExam": "Daily Exam",
  "landing.nav.platform.srsReview": "SRS Review",
  "landing.nav.platform.mistakeLog": "Mistake Log",
  "landing.nav.platform.roadmap": "Roadmap",
  "landing.nav.platform.streak": "Streak",
  "landing.nav.platform.schreiben": "Schreiben Grading",
  "landing.nav.platform.placementTest": "Placement Test",
  "landing.nav.platform.aiAssistant": "AI Assistant",

  "landing.hero.title": "Learn German in the quiet hours.",
  "landing.hero.subtitle":
    "A calm daily loop — one unit, your reviews, one exam — built only from what you have actually learned. A0 to B1, free and open.",
  "landing.hero.redeemInvite": "Redeem invite",

  "landing.footer.headline1": "German, A0 to B1.",
  "landing.footer.headline2": "Built for the Ausbildung route.",
  "landing.footer.cardLead": "goethe.pro is a calm daily loop",
  "landing.footer.cardRest": "that takes you from A0 to B1 — one quiet evening at a time.",
  "landing.footer.beta": "Free and open — invite-gated beta.",
  "landing.footer.madeWith": "Made with ♥ for everyone learning German",
} as const;

/** Every message key in the app. Other catalogs must satisfy this exactly. */
export type MessageKey = keyof typeof en;
export type Messages = Record<MessageKey, string>;
