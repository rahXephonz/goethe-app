import type { Messages } from "./en";

/** Indonesian catalog. Typed against `en` — missing/extra keys fail typecheck. */
export const id: Messages = {
  "common.loading": "…",
  "common.appName": "linguaa.app",

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
  "dashboard.greeting": "Halo, {email} 👋",
  "dashboard.sessionNote": "Sesi tervalidasi di sini",

  "dashboard.languages.title": "Bahasamu",
  "dashboard.languages.subtitle": "Pilih yang ingin kamu pelajari — boleh lebih dari satu.",
  "dashboard.languages.enroll": "Mulai belajar",
  "dashboard.languages.enrolled": "Terdaftar — {level}",
  "dashboard.languages.error": "Gagal mendaftar. Coba lagi.",

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
  "landing.nav.platform.writingFeedback": "Umpan Balik Menulis",
  "landing.nav.platform.placementTest": "Tes Penempatan",
  "landing.nav.platform.aiAssistant": "Asisten AI",

  "landing.hero.title": "Belajar bahasa di jam-jam tenang.",
  "landing.hero.subtitle":
    "Rutinitas harian yang tenang — satu unit, review-mu, satu ujian — dibangun hanya dari yang benar-benar sudah kamu pelajari, gratis dan terbuka.",
  "landing.hero.joinWaitlist": "Gabung daftar tunggu",

  "landing.philosophy.title": "Kami percaya konsistensi lahir dari ketenangan, bukan tekanan.",
  "landing.philosophy.subtitle":
    "linguaa.app membungkus teknologi AI canggih ke dalam rutinitas malam yang tenang. Sistem Daily Loop kami memastikan Anda tidak pernah kewalahan.",
  "landing.philosophy.learn.title": "Serap",
  "landing.philosophy.learn.body": "Terima materi baru dalam porsi kecil yang mudah dicerna.",
  "landing.philosophy.review.title": "Latihan",
  "landing.philosophy.review.body": "Terapkan langsung dengan partner AI yang sabar dan cerdas.",
  "landing.philosophy.reflect.title": "Istirahat",
  "landing.philosophy.reflect.body":
    "Tutup aplikasi dengan tenang. Biarkan otak memproses memori saat tidur.",
  "landing.philosophy.master.title": "Kuasai",
  "landing.philosophy.master.body":
    "Kemajuan yang datang diam-diam. Hadir setiap hari yang bekerja — tanpa terburu-buru, hanya kedalaman yang stabil.",

  "landing.earlyAccess.title": "Dapatkan akses awal",
  "landing.earlyAccess.subtitle": "Ajukan kode undangan dan mulai pelajaran tenang pertamamu.",
  "landing.earlyAccess.emailPlaceholder": "Alamat emailmu",
  "landing.earlyAccess.joinWaitlist": "Gabung daftar tunggu",

  "landing.faq.title": "Pertanyaan yang sering diajukan",
  "landing.faq.subtitle":
    "Jawaban praktis tentang belajar dengan linguaa.app dan membangun kebiasaan harian yang tenang.",
  "landing.faq.ai.question": "Apakah AI dapat memahami konteks percakapan?",
  "landing.faq.ai.answer":
    "Ya. Latihan dan umpan balik menggunakan materi pelajaran, level saat ini, dan bahasa yang Anda pelajari sebagai konteks.",
  "landing.faq.time.question": "Berapa waktu yang ideal untuk belajar setiap hari?",
  "landing.faq.time.answer":
    "Sekitar 15–20 menit yang tenang cukup untuk satu pelajaran, review terjadwal, dan ujian harian singkat.",
  "landing.faq.beginner.question": "Apakah bisa digunakan oleh pemula dari nol?",
  "landing.faq.beginner.answer":
    "Bisa. Jalur belajar dimulai dari level Anda saat ini dan memperkenalkan kosakata serta tata bahasa secara bertahap.",
  "landing.faq.languages.question": "Bahasa apa saja yang dapat dipelajari?",
  "landing.faq.languages.answer":
    "Bahasa Jerman adalah modul belajar yang aktif. Bahasa Inggris dan Jepang sedang disiapkan sebagai modul berikutnya.",
  "landing.faq.dailyLoop.question": "Apa itu Daily Loop?",
  "landing.faq.dailyLoop.answer":
    "Daily Loop adalah urutan fokus berupa satu pelajaran, review dengan pengulangan berjarak, dan satu ujian dari materi yang sudah dipelajari.",
  "landing.faq.cost.question": "Apakah linguaa.app gratis?",
  "landing.faq.cost.answer":
    "Beta tertutup saat ini gratis dan menggunakan kode undangan sembari kami belajar dari kelompok kecil pengguna awal.",
  "landing.faq.progress.question": "Bagaimana kemajuan belajar diukur?",
  "landing.faq.progress.answer":
    "Kemajuan berasal dari pelajaran yang selesai, hasil review, dan percobaan ujian. Skor disembunyikan sampai datanya cukup.",

  "landing.learningPath.title": "Peta perjalanan tenangmu",
  "landing.learningPath.subtitle": "Fokus pada progres bertahap, bukan kecepatan instan.",
  "landing.learningPath.step1.days": "HARI 1-14",
  "landing.learningPath.step1.title": "Awal yang Tenang",
  "landing.learningPath.step1.body":
    "Membangun pondasi dan kepercayaan diri. Mempelajari struktur dasar tanpa tekanan untuk berbicara secara real-time.",
  "landing.learningPath.step2.days": "HARI 15-45",
  "landing.learningPath.step2.title": "Percakapan Santai",
  "landing.learningPath.step2.body":
    "Mulai berlatih dengan AI dalam skenario nyata kehidupan sehari-hari seperti memesan kopi atau membicarakan hobi.",
  "landing.learningPath.step3.days": "HARI 45+",
  "landing.learningPath.step3.title": "Alur Mandiri",
  "landing.learningPath.step3.body":
    "Kenyamanan mengonsumsi konten asli dan mulai berpikir dalam bahasa target tanpa menerjemahkan di kepala.",

  "landing.footer.title": "Belajar bahasa baru.",
  "landing.footer.subtitle": "Satu rutinitas harian yang tenang.",
  "landing.footer.cardLead": "linguaa.app adalah rutinitas harian yang tenang",
  "landing.footer.cardRest":
    "yang membawamu dari pemula ke mandiri — satu malam tenang setiap harinya.",
  "landing.footer.beta": "Gratis dan terbuka — beta dengan kode undangan.",
  "landing.footer.madeWith": "Dibuat dengan ♥ untuk semua pembelajar bahasa",
};
