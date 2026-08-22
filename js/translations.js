/*! ============================================================================
 *  translations.js -- UI_TRANSLATIONS, nine languages
 *  Copyright (c) 2026 Ahmed Sobhy. All Rights Reserved.
 *
 *  Original architecture, implementation and content. Proprietary — not open
 *  source. Reproduction, redistribution or derivative works are prohibited
 *  without prior written permission. See LICENSE.txt.
 *
 *  Integrity digests for every source file: meta/ownership.json
 *  Permission requests: Ahmedwa70@yahoo.com
 * ========================================================================== */
/**
 * translations.js
 * -----------------------------------------------------------------------
 * UI_TRANSLATIONS holds ONLY interface chrome: navigation labels, section
 * eyebrows/titles (generic, reusable regardless of whose CV this is),
 * buttons, form labels, loading text, status labels.
 *
 * It never holds personal / CV content — that lives in js/data.js
 * (CV_DATA), keyed the opposite way (content -> language) since it's
 * per-item data rather than a fixed set of interface strings.
 *
 * Structure: UI_TRANSLATIONS[languageCode][section][key]
 *
 * To add a language: set it enabled in SUPPORTED_LANGUAGES (data.js),
 * then fill in every key below for that language code, using the "en"
 * block as the reference shape. Nothing else needs to change.
 * -----------------------------------------------------------------------
 */

/* =============================================================================
 * THE TRANSLATION SYSTEM
 * -----------------------------------------------------------------------------
 * Nine complete languages, no partial coverage:
 *
 *   en English    ar العربية (RTL)   zh 中文        es Español    fr Français
 *   tr Türkçe     ko 한국어           ja 日本語      id Bahasa Indonesia
 *
 * TWO STORES, KEYED IN OPPOSITE DIRECTIONS — and that is deliberate:
 *
 *   CV_DATA (data.js)          content -> language    one entry per CV item
 *   UI_TRANSLATIONS (here)     language -> content    one block per language
 *
 * Content grows by item, so it is keyed by item. Interface strings are a fixed
 * set that grows by language, so they are keyed by language. Each shape matches
 * how its data actually changes over time.
 *
 * WHICH STORE DOES A STRING BELONG IN?
 *   Would it still make sense on someone else's CV?  -> here.
 *   Is it about Ahmed Sobhy specifically?            -> CV_DATA.
 * So "Education" and "Send Message" live here; a degree name does not.
 *
 * RESOLUTION
 *   ui(lang, "sections.education.title") in app.js. A missing key falls back to
 *   English and never renders undefined or leaks an internal key to a visitor.
 *
 * ADDING A TENTH LANGUAGE
 *   1. Add the code to SUPPORTED_LANGUAGES in data.js, with the correct `dir`.
 *   2. Add that key to every translation dictionary in CV_DATA.
 *   3. Copy the `en` block below and translate it in full.
 *   4. Non-Latin script? Add font stacks and tuning tokens in style.css.
 *   index.html and app.js need no change at all.
 *
 * COMPLETENESS IS ENFORCED
 *   app.js walks both stores against the English reference and reports every
 *   gap in the console. Development mode only (localhost, file://, ?debug) —
 *   a visitor never sees it.
 *
 * The nine-language content set is original work and is covered by LICENSE.txt.
 * ========================================================================== */

const UI_TRANSLATIONS = {

  en: {
    nav: { home: "Home", about: "About", experience: "Experience", innovation: "Innovation", skills: "Skills", education: "Education", contact: "Contact" },
    sections: {
      academicProfile: { eyebrow: "Professional Identity" },
      highlights: { eyebrow: "At a Glance", title: "Professional Highlights" },
      about: { eyebrow: "About Me", title: "My Story" },
      achievements: { eyebrow: "Professional Impact", title: "Professional Achievements" },
      experience: { eyebrow: "Career Path", title: "Experience Timeline", responsibilities: "Responsibilities", achievements: "Contributions", skills: "Skills Developed" },
      methodology: { eyebrow: "Teaching Approach", title: "Teaching Methodology" },
      innovation: { eyebrow: "Educational Innovation", title: "Innovation & Digital Education" },
      project: { eyebrow: "Flagship Project" },
      skills: { eyebrow: "Competencies", title: "Skills" },
      education: { eyebrow: "Qualifications", title: "Education", description: "Academic background — the degrees and formal qualifications behind the practice." },
      certifications: { eyebrow: "Professional Development", title: "Certifications & Professional Development", description: "Professional development — specialised training and credentials earned alongside the academic path." },
      contact: { eyebrow: "Contact", title: "Let's Connect" }
    },
    actions: { contact: "Get in Touch", downloadCV: "Download CV", learnMore: "Explore the Project", scroll: "Scroll", skipToContent: "Skip to content" },
    theme: { light: "Light mode", dark: "Dark mode" },
    langSwitcher: { label: "Language" },
    loading: { text: "Loading" },
    footer: { copyright: "Copyright", rights: "All Rights Reserved." },
    form: {
      name: "Name", email: "Email", message: "Message", submit: "Send Message",
      namePlaceholder: "Your name", emailPlaceholder: "example@email.com",
      messagePlaceholder: "Write your message here...",
      note: "This form opens your default email app to send the message.",
      success: "Opening your email app…"
    },
    contactMeta: { emailLabel: "Email", locationLabel: "Location", profilesLabel: "Professional Profiles", wechatHint: "Scan to connect on WeChat", wechatAlt: "WeChat QR code for Ahmed Sobhy — open at full size to scan" },
    status: { open: "Open to new opportunities", limited: "Limited availability", closed: "Not currently available" }
  },

  ar: {
    nav: { home: "الرئيسية", about: "نبذة عني", experience: "الخبرة", innovation: "الابتكار", skills: "المهارات", education: "التعليم", contact: "التواصل" },
    sections: {
      academicProfile: { eyebrow: "الهوية المهنية" },
      highlights: { eyebrow: "لمحة سريعة", title: "أبرز الملامح المهنية" },
      about: { eyebrow: "نبذة عني", title: "من أنا" },
      achievements: { eyebrow: "الأثر المهني", title: "الإنجازات المهنية" },
      experience: { eyebrow: "المسيرة المهنية", title: "الخبرة المهنية", responsibilities: "المهام والمسؤوليات", achievements: "الإسهامات", skills: "المهارات المكتسبة" },
      methodology: { eyebrow: "أسلوب التدريس", title: "منهجية التدريس" },
      innovation: { eyebrow: "الابتكار التعليمي", title: "الابتكار والتعليم الرقمي" },
      project: { eyebrow: "مشروع رئيسي" },
      skills: { eyebrow: "الكفاءات", title: "المهارات" },
      education: { eyebrow: "المؤهلات", title: "التعليم", description: "الخلفية الأكاديمية — الدرجات والمؤهلات النظامية التي يقوم عليها العمل." },
      certifications: { eyebrow: "التطوير المهني", title: "الشهادات والتطوير المهني", description: "التطوير المهني — التدريب المتخصص والشهادات المكتسبة إلى جانب المسار الأكاديمي." },
      contact: { eyebrow: "التواصل", title: "لنتواصل" }
    },
    actions: { contact: "تواصل معي", downloadCV: "تحميل السيرة الذاتية", learnMore: "تعرّف على المشروع", scroll: "مرر للأسفل", skipToContent: "تخطَّ إلى المحتوى" },
    theme: { light: "الوضع النهاري", dark: "الوضع الليلي" },
    langSwitcher: { label: "اللغة" },
    loading: { text: "جارٍ التحميل" },
    footer: { copyright: "حقوق النشر", rights: "جميع الحقوق محفوظة." },
    form: {
      name: "الاسم", email: "البريد الإلكتروني", message: "الرسالة", submit: "إرسال الرسالة",
      namePlaceholder: "اسمك", emailPlaceholder: "example@email.com",
      messagePlaceholder: "اكتب رسالتك هنا...",
      note: "يفتح هذا النموذج تطبيق البريد الافتراضي لديك لإرسال الرسالة.",
      success: "جارٍ فتح تطبيق البريد الإلكتروني…"
    },
    contactMeta: { emailLabel: "البريد الإلكتروني", locationLabel: "الموقع", profilesLabel: "الملفات المهنية", wechatHint: "امسح الرمز للتواصل عبر WeChat", wechatAlt: "رمز WeChat الخاص بأحمد صبحي — افتحه بالحجم الكامل لمسحه" },
    status: { open: "متاح لفرص جديدة", limited: "التوفر محدود", closed: "غير متاح حاليًا" }
  },

  zh: {
    nav: { home: "首页", about: "关于我", experience: "工作经历", innovation: "教育创新", skills: "专业技能", education: "教育背景", contact: "联系方式" },
    sections: {
      academicProfile: { eyebrow: "职业身份" },
      highlights: { eyebrow: "概览", title: "职业亮点" },
      about: { eyebrow: "关于我", title: "我的简介" },
      achievements: { eyebrow: "职业影响力", title: "职业成就" },
      experience: { eyebrow: "职业历程", title: "工作经历", responsibilities: "职责", achievements: "贡献", skills: "习得技能" },
      methodology: { eyebrow: "教学理念", title: "教学方法" },
      innovation: { eyebrow: "教育创新", title: "创新与数字化教育" },
      project: { eyebrow: "核心项目" },
      skills: { eyebrow: "专业能力", title: "专业技能" },
      education: { eyebrow: "教育背景", title: "教育背景", description: "学术背景 —— 支撑教学实践的学位与正规学历。" },
      certifications: { eyebrow: "专业发展", title: "专业认证与发展", description: "职业发展 —— 在学术之路之外取得的专项培训与资质认证。" },
      contact: { eyebrow: "联系方式", title: "保持联系" }
    },
    actions: { contact: "联系我", downloadCV: "下载简历", learnMore: "了解该项目", scroll: "向下滚动", skipToContent: "跳到主要内容" },
    theme: { light: "浅色模式", dark: "深色模式" },
    langSwitcher: { label: "语言" },
    loading: { text: "加载中" },
    footer: { copyright: "版权", rights: "版权所有。" },
    form: {
      name: "姓名", email: "电子邮箱", message: "留言", submit: "发送信息",
      namePlaceholder: "您的姓名", emailPlaceholder: "example@email.com",
      messagePlaceholder: "请在此输入您的留言...",
      note: "此表单将打开您的默认邮件应用以发送信息。",
      success: "正在打开您的邮件应用…"
    },
    contactMeta: { emailLabel: "电子邮箱", locationLabel: "所在地", profilesLabel: "职业主页", wechatHint: "扫码添加微信", wechatAlt: "艾哈迈德·索卜希的微信二维码 — 打开大图以扫描" },
    status: { open: "欢迎新的合作机会", limited: "当前可安排的时间有限", closed: "目前暂不可用" }
  },

  es: {
    nav: { home: "Inicio", about: "Sobre mí", experience: "Experiencia", innovation: "Innovación", skills: "Habilidades", education: "Educación", contact: "Contacto" },
    sections: {
      academicProfile: { eyebrow: "Identidad Profesional" },
      highlights: { eyebrow: "De un Vistazo", title: "Aspectos Profesionales Destacados" },
      about: { eyebrow: "Sobre Mí", title: "Mi Trayectoria" },
      achievements: { eyebrow: "Impacto Profesional", title: "Logros Profesionales" },
      experience: { eyebrow: "Trayectoria Profesional", title: "Trayectoria Laboral", responsibilities: "Responsabilidades", achievements: "Contribuciones", skills: "Competencias Desarrolladas" },
      methodology: { eyebrow: "Enfoque Pedagógico", title: "Metodología de Enseñanza" },
      innovation: { eyebrow: "Innovación Educativa", title: "Innovación y Educación Digital" },
      project: { eyebrow: "Proyecto Destacado" },
      skills: { eyebrow: "Competencias", title: "Habilidades" },
      education: { eyebrow: "Formación", title: "Educación", description: "Formación académica — los títulos y las cualificaciones formales que sustentan la práctica." },
      certifications: { eyebrow: "Desarrollo Profesional", title: "Certificaciones y Desarrollo Profesional", description: "Desarrollo profesional — formación especializada y credenciales obtenidas junto al recorrido académico." },
      contact: { eyebrow: "Contacto", title: "Hablemos" }
    },
    actions: { contact: "Contactar", downloadCV: "Descargar CV", learnMore: "Ver el Proyecto", scroll: "Desplázate", skipToContent: "Saltar al contenido" },
    theme: { light: "Modo claro", dark: "Modo oscuro" },
    langSwitcher: { label: "Idioma" },
    loading: { text: "Cargando" },
    footer: { copyright: "Derechos de Autor", rights: "Todos los derechos reservados." },
    form: {
      name: "Nombre", email: "Correo electrónico", message: "Mensaje", submit: "Enviar Mensaje",
      namePlaceholder: "Tu nombre", emailPlaceholder: "ejemplo@correo.com",
      messagePlaceholder: "Escribe tu mensaje aquí...",
      note: "Este formulario abrirá tu aplicación de correo predeterminada para enviar el mensaje.",
      success: "Abriendo tu aplicación de correo…"
    },
    contactMeta: { emailLabel: "Correo electrónico", locationLabel: "Ubicación", profilesLabel: "Perfiles Profesionales", wechatHint: "Escanea para conectar en WeChat", wechatAlt: "Código QR de WeChat de Ahmed Sobhy — ábrelo a tamaño completo para escanear" },
    status: { open: "Disponible para nuevas oportunidades", limited: "Disponibilidad limitada", closed: "No disponible actualmente" }
  },

  fr: {
    nav: { home: "Accueil", about: "À propos", experience: "Expérience", innovation: "Innovation", skills: "Compétences", education: "Formation", contact: "Contact" },
    sections: {
      academicProfile: { eyebrow: "Identité Professionnelle" },
      highlights: { eyebrow: "En Bref", title: "Points Forts Professionnels" },
      about: { eyebrow: "À Propos de Moi", title: "Mon Parcours" },
      achievements: { eyebrow: "Impact Professionnel", title: "Réalisations Professionnelles" },
      experience: { eyebrow: "Parcours Professionnel", title: "Parcours Professionnel", responsibilities: "Responsabilités", achievements: "Contributions", skills: "Compétences Développées" },
      methodology: { eyebrow: "Approche Pédagogique", title: "Méthodologie d'Enseignement" },
      innovation: { eyebrow: "Innovation Éducative", title: "Innovation et Éducation Numérique" },
      project: { eyebrow: "Projet Phare" },
      skills: { eyebrow: "Compétences", title: "Compétences" },
      education: { eyebrow: "Qualifications", title: "Formation", description: "Parcours académique — les diplômes et qualifications formelles qui fondent la pratique." },
      certifications: { eyebrow: "Développement Professionnel", title: "Certifications et Développement Professionnel", description: "Développement professionnel — formations spécialisées et certifications obtenues en parallèle du parcours académique." },
      contact: { eyebrow: "Contact", title: "Restons en Contact" }
    },
    actions: { contact: "Me Contacter", downloadCV: "Télécharger le CV", learnMore: "Découvrir le Projet", scroll: "Défiler", skipToContent: "Aller au contenu" },
    theme: { light: "Mode clair", dark: "Mode sombre" },
    langSwitcher: { label: "Langue" },
    loading: { text: "Chargement" },
    footer: { copyright: "Droits d'Auteur", rights: "Tous droits réservés." },
    form: {
      name: "Nom", email: "E-mail", message: "Message", submit: "Envoyer le Message",
      namePlaceholder: "Votre nom", emailPlaceholder: "exemple@email.com",
      messagePlaceholder: "Écrivez votre message ici...",
      note: "Ce formulaire ouvre votre application de messagerie par défaut pour envoyer le message.",
      success: "Ouverture de votre application de messagerie…"
    },
    contactMeta: { emailLabel: "E-mail", locationLabel: "Localisation", profilesLabel: "Profils Professionnels", wechatHint: "Scannez pour me contacter sur WeChat", wechatAlt: "QR code WeChat d'Ahmed Sobhy — ouvrez-le en grand pour le scanner" },
    status: { open: "Ouvert à de nouvelles opportunités", limited: "Disponibilité limitée", closed: "Non disponible actuellement" }
  },

  tr: {
    nav: { home: "Ana Sayfa", about: "Hakkımda", experience: "Deneyim", innovation: "İnovasyon", skills: "Beceriler", education: "Eğitim", contact: "İletişim" },
    sections: {
      academicProfile: { eyebrow: "Mesleki Kimlik" },
      highlights: { eyebrow: "Bir Bakışta", title: "Mesleki Öne Çıkanlar" },
      about: { eyebrow: "Hakkımda", title: "Benim Hikâyem" },
      achievements: { eyebrow: "Mesleki Etki", title: "Mesleki Başarılar" },
      experience: { eyebrow: "Kariyer Yolculuğu", title: "Deneyim Zaman Çizelgesi", responsibilities: "Sorumluluklar", achievements: "Katkılar", skills: "Kazanılan Beceriler" },
      methodology: { eyebrow: "Öğretim Yaklaşımı", title: "Öğretim Metodolojisi" },
      innovation: { eyebrow: "Eğitimde İnovasyon", title: "İnovasyon ve Dijital Eğitim" },
      project: { eyebrow: "Öne Çıkan Proje" },
      skills: { eyebrow: "Yetkinlikler", title: "Beceriler" },
      education: { eyebrow: "Nitelikler", title: "Eğitim", description: "Akademik geçmiş — uygulamanın dayandığı dereceler ve resmî yeterlilikler." },
      certifications: { eyebrow: "Mesleki Gelişim", title: "Sertifikalar ve Mesleki Gelişim", description: "Mesleki gelişim — akademik yolun yanı sıra kazanılan uzmanlık eğitimleri ve sertifikalar." },
      contact: { eyebrow: "İletişim", title: "İletişime Geçelim" }
    },
    actions: { contact: "İletişime Geç", downloadCV: "Özgeçmişi İndir", learnMore: "Projeyi Keşfet", scroll: "Kaydır", skipToContent: "İçeriğe geç" },
    theme: { light: "Aydınlık Mod", dark: "Karanlık Mod" },
    langSwitcher: { label: "Dil" },
    loading: { text: "Yükleniyor" },
    footer: { copyright: "Telif Hakkı", rights: "Tüm hakları saklıdır." },
    form: {
      name: "Ad", email: "E-posta", message: "Mesaj", submit: "Mesaj Gönder",
      namePlaceholder: "Adınız", emailPlaceholder: "ornek@eposta.com",
      messagePlaceholder: "Mesajınızı buraya yazın...",
      note: "Bu form, mesajı göndermek için varsayılan e-posta uygulamanızı açar.",
      success: "E-posta uygulamanız açılıyor…"
    },
    contactMeta: { emailLabel: "E-posta", locationLabel: "Konum", profilesLabel: "Profesyonel Profiller", wechatHint: "WeChat'te bağlanmak için tarayın", wechatAlt: "Ahmed Sobhy'nin WeChat QR kodu — taramak için tam boyutta açın" },
    status: { open: "Yeni fırsatlara açık", limited: "Sınırlı uygunluk", closed: "Şu anda müsait değil" }
  },

  ko: {
    nav: { home: "홈", about: "소개", experience: "경력", innovation: "혁신", skills: "역량", education: "학력", contact: "연락처" },
    sections: {
      academicProfile: { eyebrow: "전문 정체성" },
      highlights: { eyebrow: "한눈에 보기", title: "주요 전문 성과" },
      about: { eyebrow: "소개", title: "나의 이야기" },
      achievements: { eyebrow: "전문적 성과", title: "주요 성과" },
      experience: { eyebrow: "경력 여정", title: "경력 타임라인", responsibilities: "담당 업무", achievements: "주요 기여", skills: "습득 역량" },
      methodology: { eyebrow: "교수 접근법", title: "교수법" },
      innovation: { eyebrow: "교육 혁신", title: "혁신과 디지털 교육" },
      project: { eyebrow: "대표 프로젝트" },
      skills: { eyebrow: "역량", title: "역량" },
      education: { eyebrow: "자격", title: "학력", description: "학문적 배경 — 교육 실무의 토대가 되는 학위와 공식 자격." },
      certifications: { eyebrow: "전문성 개발", title: "자격증 및 전문성 개발", description: "전문성 개발 — 학문적 경로와 병행하여 취득한 전문 교육과 자격." },
      contact: { eyebrow: "연락처", title: "연락하기" }
    },
    actions: { contact: "연락하기", downloadCV: "이력서 다운로드", learnMore: "프로젝트 살펴보기", scroll: "스크롤", skipToContent: "본문으로 건너뛰기" },
    theme: { light: "라이트 모드", dark: "다크 모드" },
    langSwitcher: { label: "언어" },
    loading: { text: "로딩 중" },
    footer: { copyright: "저작권", rights: "모든 권리 보유." },
    form: {
      name: "이름", email: "이메일", message: "메시지", submit: "메시지 보내기",
      namePlaceholder: "이름을 입력하세요", emailPlaceholder: "example@email.com",
      messagePlaceholder: "메시지를 입력하세요...",
      note: "이 양식을 제출하면 기본 이메일 앱이 열립니다.",
      success: "이메일 앱을 여는 중…"
    },
    contactMeta: { emailLabel: "이메일", locationLabel: "위치", profilesLabel: "전문 프로필", wechatHint: "위챗으로 연결하려면 스캔하세요", wechatAlt: "아흐메드 소브히의 위챗 QR 코드 — 스캔하려면 전체 크기로 여세요" },
    status: { open: "새로운 기회에 열려 있음", limited: "제한적으로 가능", closed: "현재 불가능" }
  },

  ja: {
    nav: { home: "ホーム", about: "プロフィール", experience: "経歴", innovation: "イノベーション", skills: "スキル", education: "学歴", contact: "お問い合わせ" },
    sections: {
      academicProfile: { eyebrow: "プロフェッショナル・アイデンティティ" },
      highlights: { eyebrow: "概要", title: "プロフェッショナル・ハイライト" },
      about: { eyebrow: "私について", title: "プロフィール" },
      achievements: { eyebrow: "実績", title: "主な実績" },
      experience: { eyebrow: "キャリアパス", title: "職務経歴", responsibilities: "職務内容", achievements: "貢献", skills: "習得スキル" },
      methodology: { eyebrow: "指導アプローチ", title: "指導方法" },
      innovation: { eyebrow: "教育イノベーション", title: "イノベーションとデジタル教育" },
      project: { eyebrow: "代表プロジェクト" },
      skills: { eyebrow: "スキル", title: "スキル" },
      education: { eyebrow: "学歴", title: "学歴", description: "学術的背景 — 実践を支える学位と正規の資格。" },
      certifications: { eyebrow: "専門能力開発", title: "資格・専門能力開発", description: "専門性の開発 — 学術的な歩みと並行して取得した専門研修と資格。" },
      contact: { eyebrow: "お問い合わせ", title: "お問い合わせ" }
    },
    actions: { contact: "お問い合わせ", downloadCV: "履歴書をダウンロード", learnMore: "プロジェクトを見る", scroll: "スクロール", skipToContent: "本文へスキップ" },
    theme: { light: "ライトモード", dark: "ダークモード" },
    langSwitcher: { label: "言語" },
    loading: { text: "読み込み中" },
    footer: { copyright: "著作権", rights: "全著作権所有。" },
    form: {
      name: "お名前", email: "メールアドレス", message: "メッセージ", submit: "メッセージを送信",
      namePlaceholder: "お名前を入力", emailPlaceholder: "example@email.com",
      messagePlaceholder: "メッセージを入力してください...",
      note: "このフォームを送信すると、既定のメールアプリが開きます。",
      success: "メールアプリを開いています…"
    },
    contactMeta: { emailLabel: "メールアドレス", locationLabel: "所在地", profilesLabel: "プロフェッショナルプロフィール", wechatHint: "WeChat でつながるにはスキャンしてください", wechatAlt: "アハメド・ソブヒの WeChat QR コード — スキャンするには全画面で開いてください" },
    status: { open: "新しい機会を歓迎します", limited: "対応可能な時間が限られています", closed: "現在対応不可" }
  },

  id: {
    nav: { home: "Beranda", about: "Tentang", experience: "Pengalaman", innovation: "Inovasi", skills: "Keahlian", education: "Pendidikan", contact: "Kontak" },
    sections: {
      academicProfile: { eyebrow: "Identitas Profesional" },
      highlights: { eyebrow: "Sekilas", title: "Sorotan Profesional" },
      about: { eyebrow: "Tentang Saya", title: "Profil Saya" },
      achievements: { eyebrow: "Dampak Profesional", title: "Pencapaian Profesional" },
      experience: { eyebrow: "Perjalanan Karier", title: "Linimasa Pengalaman", responsibilities: "Tanggung Jawab", achievements: "Kontribusi", skills: "Keterampilan yang Dikembangkan" },
      methodology: { eyebrow: "Pendekatan Pengajaran", title: "Metodologi Pengajaran" },
      innovation: { eyebrow: "Inovasi Pendidikan", title: "Inovasi & Pendidikan Digital" },
      project: { eyebrow: "Proyek Unggulan" },
      skills: { eyebrow: "Kompetensi", title: "Keahlian" },
      education: { eyebrow: "Kualifikasi", title: "Pendidikan", description: "Latar belakang akademik — gelar dan kualifikasi formal yang melandasi praktik." },
      certifications: { eyebrow: "Pengembangan Profesional", title: "Sertifikasi & Pengembangan Profesional", description: "Pengembangan profesional — pelatihan khusus dan sertifikasi yang diperoleh seiring jalur akademik." },
      contact: { eyebrow: "Kontak", title: "Mari Terhubung" }
    },
    actions: { contact: "Hubungi Saya", downloadCV: "Unduh CV", learnMore: "Lihat Proyek", scroll: "Gulir", skipToContent: "Lewati ke konten" },
    theme: { light: "Mode Terang", dark: "Mode Gelap" },
    langSwitcher: { label: "Bahasa" },
    loading: { text: "Memuat" },
    footer: { copyright: "Hak Cipta", rights: "Hak cipta dilindungi." },
    form: {
      name: "Nama", email: "Email", message: "Pesan", submit: "Kirim Pesan",
      namePlaceholder: "Nama Anda", emailPlaceholder: "contoh@email.com",
      messagePlaceholder: "Tulis pesan Anda di sini...",
      note: "Formulir ini akan membuka aplikasi email default Anda untuk mengirim pesan.",
      success: "Membuka aplikasi email Anda…"
    },
    contactMeta: { emailLabel: "Email", locationLabel: "Lokasi", profilesLabel: "Profil Profesional", wechatHint: "Pindai untuk terhubung di WeChat", wechatAlt: "Kode QR WeChat Ahmed Sobhy — buka ukuran penuh untuk memindai" },
    status: { open: "Terbuka untuk peluang baru", limited: "Ketersediaan terbatas", closed: "Saat ini tidak tersedia" }
  }
};
