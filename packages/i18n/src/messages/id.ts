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

  "landing.nav.howItWorks": "Cara kerja",
  "landing.nav.openApp": "Buka Aplikasi",
  "landing.nav.language": "Bahasa",
  "landing.nav.menu": "Menu",

  "landing.nav.platform": "Platform",
  "landing.nav.learningPath": "Jalur Belajar",
  "landing.nav.platform.todaysPlan": "Rencana Hari Ini",
  "landing.nav.platform.dailyExam": "Ujian Harian",
  "landing.nav.platform.srsReview": "Review SRS",
  "landing.nav.platform.mistakeLog": "Catatan Kesalahan",
  "landing.nav.platform.roadmap": "Roadmap",
  "landing.nav.platform.streak": "Streak",
  "landing.nav.platform.schreiben": "Penilaian Schreiben",
  "landing.nav.platform.placementTest": "Tes Penempatan",
  "landing.nav.platform.aiAssistant": "Asisten AI",

  "landing.hero.title": "Belajar bahasa Jerman di jam-jam tenang.",
  "landing.hero.subtitle":
    "Rutinitas harian yang tenang — satu unit, review-mu, satu ujian — dibangun hanya dari yang benar-benar sudah kamu pelajari. A0 sampai B1, gratis dan terbuka.",
  "landing.hero.redeemInvite": "Tukar kode undangan",

  "landing.footer.headline1": "Bahasa Jerman, A0 sampai B1.",
  "landing.footer.headline2": "Dibuat untuk jalur Ausbildung.",
  "landing.footer.cardLead": "goethe.pro adalah rutinitas harian yang tenang",
  "landing.footer.cardRest": "yang membawamu dari A0 ke B1 — satu malam tenang setiap harinya.",
  "landing.footer.beta": "Gratis dan terbuka — beta dengan kode undangan.",
  "landing.footer.madeWith": "Dibuat dengan ♥ untuk semua yang belajar bahasa Jerman",
};
