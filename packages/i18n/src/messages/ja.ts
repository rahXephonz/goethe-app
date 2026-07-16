import type { Messages } from "./en";

export const ja: Messages = {
  "common.loading": "…",
  "common.appName": "linguaa.app",

  "auth.login.title": "ログイン",
  "auth.login.email": "メールアドレス",
  "auth.login.password": "パスワード",
  "auth.login.submit": "ログイン",
  "auth.login.submitting": "処理中…",
  "auth.login.error": "ログインに失敗しました",
  "auth.login.noAccount": "まだアカウントをお持ちでないですか？",
  "auth.login.registerLink": "招待コードで登録",

  "auth.register.title": "登録（クローズドベータ）",
  "auth.register.inviteCode": "招待コード",
  "auth.register.email": "メールアドレス",
  "auth.register.password": "パスワード（10文字以上）",
  "auth.register.submit": "アカウントを作成",
  "auth.register.submitting": "処理中…",
  "auth.register.error": "登録に失敗しました",
  "auth.register.haveAccount": "すでにアカウントをお持ちですか？",
  "auth.register.loginLink": "ログイン",

  "auth.logout": "ログアウト",

  "api.error.invalidInput": "入力が無効です",
  "api.error.passwordTooShort": "パスワードは10文字以上で入力してください",
  "api.error.inviteInvalid": "招待コードが無効か、すでに使用されています",
  "api.error.emailTaken": "このメールアドレスはすでに登録されています",
  "api.error.invalidCredentials": "メールアドレスまたはパスワードが正しくありません",
  "api.error.unauthorized": "認証されていません",
  "api.error.internal": "問題が発生しました。もう一度お試しください。",

  "dashboard.title": "ダッシュボード",
  "dashboard.greeting": "こんにちは、{email} さん 👋",
  "dashboard.sessionNote": "ここでセッションが確認されています",

  "dashboard.languages.title": "学習中の言語",
  "dashboard.languages.subtitle":
    "学びたい言語を選択してください。複数の言語を同時に学習できます。",
  "dashboard.languages.enroll": "学習を始める",
  "dashboard.languages.enrolled": "受講中 — {level}",
  "dashboard.languages.error": "登録できませんでした。もう一度お試しください。",

  "landing.nav.howItWorks": "仕組み",
  "landing.nav.openApp": "アプリを開く",
  "landing.nav.language": "言語",
  "landing.nav.menu": "メニュー",

  "landing.nav.platform": "プラットフォーム",
  "landing.nav.learningPath": "学習ロードマップ",
  "landing.nav.platform.todaysPlan": "今日の学習プラン",
  "landing.nav.platform.dailyExam": "デイリー試験",
  "landing.nav.platform.srsReview": "SRS復習",
  "landing.nav.platform.mistakeLog": "間違いノート",
  "landing.nav.platform.roadmap": "ロードマップ",
  "landing.nav.platform.streak": "連続学習",
  "landing.nav.platform.writingFeedback": "作文フィードバック",
  "landing.nav.platform.placementTest": "レベルチェックテスト",
  "landing.nav.platform.aiAssistant": "AIアシスタント",

  "landing.hero.title": "静かな時間に、言語を学ぼう。",
  "landing.hero.subtitle":
    "毎日の穏やかな学習サイクル。1つのユニット、復習、そして1回の試験。実際に学んだ内容だけをもとに学習が進みます、初心者から無料で学べます。",
  "landing.hero.joinWaitlist": "ウェイトリストに参加",

  "landing.philosophy.title": "継続はプレッシャーではなく、穏やかさから生まれると信じています。",
  "landing.philosophy.subtitle":
    "linguaa.appは高度なAIを穏やかな夜の習慣に組み込みます。Daily Loopが、無理なく学び続けられるよう支えます。",
  "landing.philosophy.learn.title": "吸収する",
  "landing.philosophy.learn.body": "新しい教材を、理解しやすい小さな単位で取り入れます。",
  "landing.philosophy.review.title": "練習する",
  "landing.philosophy.review.body": "忍耐強く賢いAIパートナーと、すぐに実践します。",
  "landing.philosophy.reflect.title": "休む",
  "landing.philosophy.reflect.body":
    "穏やかにアプリを閉じ、眠っている間に脳が記憶を整理するのを待ちます。",
  "landing.philosophy.master.title": "身につける",
  "landing.philosophy.master.body":
    "進歩は静かに訪れます。毎日続けることが力になる — 急がず、確かな深さで。",

  "landing.earlyAccess.title": "先行アクセスを取得",
  "landing.earlyAccess.subtitle": "招待をリクエストして、最初の静かなレッスンを始めましょう。",
  "landing.earlyAccess.emailPlaceholder": "メールアドレス",
  "landing.earlyAccess.joinWaitlist": "ウェイトリストに参加",

  "landing.faq.title": "よくある質問",
  "landing.faq.subtitle": "linguaa.appでの学習と、穏やかな毎日の習慣づくりについてお答えします。",
  "landing.faq.ai.question": "AIは会話の文脈を理解できますか？",
  "landing.faq.ai.answer":
    "はい。練習とフィードバックでは、レッスン内容、現在のレベル、学習中の言語を文脈として使用します。",
  "landing.faq.time.question": "毎日どのくらい学習すればよいですか？",
  "landing.faq.time.answer":
    "1つのレッスン、復習、短いデイリー試験を含めて、静かな15〜20分ほどで十分です。",
  "landing.faq.beginner.question": "まったくの初心者でも始められますか？",
  "landing.faq.beginner.answer":
    "はい。現在のレベルから始まり、新しい語彙と文法を少しずつ取り入れる学習ロードマップです。",
  "landing.faq.languages.question": "どの言語を学べますか？",
  "landing.faq.languages.answer":
    "現在の学習モジュールはドイツ語です。英語と日本語は今後のモジュールとして準備中です。",
  "landing.faq.dailyLoop.question": "Daily Loopとは何ですか？",
  "landing.faq.dailyLoop.answer":
    "1つのレッスン、間隔反復による復習、学習済みの内容から作られる1つの試験を順番に行う仕組みです。",
  "landing.faq.cost.question": "linguaa.appは無料ですか？",
  "landing.faq.cost.answer":
    "現在のクローズドベータは無料の招待制で、少人数の初期ユーザーから学びながら改善しています。",
  "landing.faq.progress.question": "進捗はどのように測定されますか？",
  "landing.faq.progress.answer":
    "完了したレッスン、復習の成績、試験結果から測定します。十分なデータが集まるまではスコアを表示しません。",

  "landing.learningPath.title": "静かな学びの道のり",
  "landing.learningPath.subtitle": "一気に速く進むのではなく、着実な進歩を大切に。",
  "landing.learningPath.step1.days": "1〜14日目",
  "landing.learningPath.step1.title": "静かな始まり",
  "landing.learningPath.step1.body":
    "基礎と自信を築く時期。リアルタイムで話すプレッシャーなく、基本構造を学びます。",
  "landing.learningPath.step2.days": "15〜45日目",
  "landing.learningPath.step2.title": "やさしい会話",
  "landing.learningPath.step2.body":
    "コーヒーを注文する、趣味について話すといった実際の日常シーンで、AIと練習を始めます。",
  "landing.learningPath.step3.days": "45日目〜",
  "landing.learningPath.step3.title": "自立したループ",
  "landing.learningPath.step3.body":
    "自然なコンテンツに親しみ、頭の中で翻訳せずに目標言語で考え始める段階です。",

  "landing.footer.title": "新しい言語を学ぼう。",
  "landing.footer.subtitle": "穏やかな毎日の学習サイクル。",
  "landing.footer.cardLead": "linguaa.app は",
  "landing.footer.cardRest":
    "初心者から自立した言語運用まで、静かな毎日の積み重ねで導く学習プラットフォームです。",
  "landing.footer.beta": "無料・オープンな招待制ベータ版。",
  "landing.footer.madeWith": "♥ 言語学習者のために作られました",
};
