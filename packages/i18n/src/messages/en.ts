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
} as const;

/** Every message key in the app. Other catalogs must satisfy this exactly. */
export type MessageKey = keyof typeof en;
export type Messages = Record<MessageKey, string>;
