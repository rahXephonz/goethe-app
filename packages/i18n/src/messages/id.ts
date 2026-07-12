import type { Messages } from "./en";

/** Indonesian catalog. Typed against `en` — missing/extra keys fail typecheck. */
export const id: Messages = {
  "common.loading": "…",
  "common.appName": "goethe.pro",

  "auth.login.title": "Masuk",
  "auth.login.email": "Email",
  "auth.login.password": "Password",
  "auth.login.submit": "Masuk",
  "auth.login.submitting": "Memproses…",
  "auth.login.error": "Gagal masuk",
  "auth.login.noAccount": "Belum punya akun?",
  "auth.login.registerLink": "Daftar pakai kode undangan",

  "auth.register.title": "Daftar (beta tertutup)",
  "auth.register.inviteCode": "Kode undangan",
  "auth.register.email": "Email",
  "auth.register.password": "Password (min. 10)",
  "auth.register.submit": "Buat akun",
  "auth.register.submitting": "Memproses…",
  "auth.register.error": "Gagal daftar",
  "auth.register.haveAccount": "Sudah punya akun?",
  "auth.register.loginLink": "Masuk",

  "auth.logout": "Keluar",

  "api.error.invalidInput": "Input tidak valid",
  "api.error.passwordTooShort": "Password minimal 10 karakter",
  "api.error.inviteInvalid": "Kode undangan tidak valid atau sudah dipakai",
  "api.error.emailTaken": "Email sudah terdaftar",
  "api.error.invalidCredentials": "Email atau password salah",
  "api.error.unauthorized": "Tidak diizinkan",
  "api.error.internal": "Terjadi kesalahan. Coba lagi.",

  "dashboard.title": "Dasbor",
  "dashboard.greeting": "Hallo, {email} 👋",
  "dashboard.sessionNote": "Sesi tervalidasi di sini",
};
