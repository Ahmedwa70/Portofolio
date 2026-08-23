/*! ============================================================================
 *  data.js -- CV_DATA, the single source of truth
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
 * data.js
 * -----------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH for all personal / CV content.
 *
 * Every piece of text a visitor reads about Ahmed Sobhy lives here as a
 * translation dictionary: { en:"...", ar:"...", zh:"...", es:"...",
 * fr:"...", tr:"...", ko:"...", ja:"...", id:"..." }.
 *
 * Official / factual data that should NOT be translated (proper name,
 * institution names, years, email, phone numbers) is kept as a plain
 * string or array — never wrapped in a language dictionary.
 *
 * UI chrome (nav labels, button text, form labels, loading text) does
 * NOT live here — see js/translations.js (UI_TRANSLATIONS).
 *
 * To update the CV: edit the values below and save. Every language
 * updates automatically wherever that field is rendered. Nothing in
 * index.html, style.css or app.js ever needs to change.
 * -----------------------------------------------------------------------
 */

// ---------------------------------------------------------------------
// Canonical language configuration — the ONLY place language codes and
// their metadata are defined. Every other file/module reads from here.
// ---------------------------------------------------------------------
const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English",          dir: "ltr", enabled: true },
  { code: "ar", label: "العربية",           dir: "rtl", enabled: true },
  { code: "zh", label: "中文",              dir: "ltr", enabled: true },
  { code: "es", label: "Español",          dir: "ltr", enabled: true },
  { code: "fr", label: "Français",         dir: "ltr", enabled: true },
  { code: "tr", label: "Türkçe",           dir: "ltr", enabled: true },
  { code: "ko", label: "한국어",            dir: "ltr", enabled: true },
  { code: "ja", label: "日本語",            dir: "ltr", enabled: true },
  { code: "id", label: "Bahasa Indonesia", dir: "ltr", enabled: true }
];

const CV_DATA = {

  // =======================================================================
  // Personal — official / factual, NOT translated (except "location",
  // a short display label which is translated for readability)
  // =======================================================================
  personal: {
    name: {
      en: "Ahmed Sobhy", ar: "أحمد صبحي", zh: "Ahmed Sobhy",
      es: "Ahmed Sobhy", fr: "Ahmed Sobhy", tr: "Ahmed Sobhy",
      ko: "Ahmed Sobhy", ja: "Ahmed Sobhy", id: "Ahmed Sobhy"
    },
    photo: "assets/images/profile.jpg",
    photoAlt: {
      en: "Portrait of Ahmed Sobhy, International Arabic Language Educator",
      ar: "صورة شخصية لأحمد صبحي، مدرس لغة عربية دولي",
      zh: "艾哈迈德·索卜希肖像，国际阿拉伯语教育者",
      es: "Retrato de Ahmed Sobhy, Educador Internacional de Lengua Árabe",
      fr: "Portrait d'Ahmed Sobhy, Éducateur International en Langue Arabe",
      tr: "Ahmed Sobhy'nin portresi, Uluslararası Arapça Eğitimcisi",
      ko: "아흐메드 소브히의 초상, 국제 아랍어 교육자",
      ja: "アハメド・ソブヒの肖像、国際アラビア語教育者",
      id: "Potret Ahmed Sobhy, Pendidik Bahasa Arab Internasional"
    },
    email: "Ahmedwa70@yahoo.com",
    phone: [
      // TODO: add real numbers, e.g. "+20 100 000 0000"
    ],
    location: {
      en: "China", ar: "الصين", zh: "中国", es: "China", fr: "Chine",
      tr: "Çin", ko: "중국", ja: "中国", id: "Tiongkok"
    },
    // Professional profiles rendered in the Contact section. An entry is
    // shown ONLY when enabled === true AND url is non-empty — so a
    // half-filled or paused profile leaves no gap in the layout, and the
    // whole block disappears when nothing qualifies.
    //
    // To add a platform later: add an entry here (and one icon path under
    // ICONS in app.js keyed by the same name). No other code changes —
    // the renderer walks whatever keys exist.
    //
    // "label" is a brand name, so it stays a plain string and is never
    // translated — same rule as institution names and years.
    social: {
      // --- Link profiles: rendered as a row of links. Need a `url`. ---
      linkedin: {
        enabled: true,
        url: "https://www.linkedin.com/in/ahmedwa70/",
        label: "LinkedIn"
      },
      whatsapp: {
        enabled: true,
        // The number inside the wa.me url is the full international form,
        // digits only, with no "+" and no spaces.
        url: "https://wa.me/14088001660",
        label: "WhatsApp"
      },

      // --- QR channel: rendered as its own block, not as a link. ---
      // WeChat has no public profile url, so it carries `qr` instead of
      // `url`. That difference is what routes it away from the link row:
      // renderSocialProfiles() only picks up entries that have a url.
      //
      // Export your personal code from WeChat (Me -> My QR Code -> Save)
      // and place it at the path below. Empty until then, so the block
      // stays hidden.
      wechat: {
        enabled: true,
        // 730x730 PNG, 5 KB. Cropped from the WeChat export to remove the
        // excess white beyond the code's quiet zone, then reduced to pure
        // black and white — the margins are now an even 65px on all four
        // sides, which is exactly the 4 modules ISO/IEC 18004 requires.
        qr: "assets/images/wechat-qr.png",
        // The one channel with an official local name rather than a mere
        // transliteration: 微信 is the original Chinese product, "WeChat"
        // the international one, and 위챗 is standard in Korean. Everywhere
        // else — Japanese included — the Latin form is what a native reader
        // expects, and it is what each language's own hint text already uses.
        label: {
          en: "WeChat", ar: "WeChat", zh: "微信", es: "WeChat",
          fr: "WeChat", tr: "WeChat", ko: "위챗", ja: "WeChat",
          id: "WeChat"
        }
      }
    },
    // One PDF per language. Empty string = not yet provided; the
    // download button falls back to English, then hides itself if
    // neither exists. Never referenced by path anywhere except here.
    cvFiles: {
      en: "", ar: "", zh: "", es: "", fr: "", tr: "", ko: "", ja: "", id: ""
    }
  },

  // =======================================================================
  // Hero
  // =======================================================================
  hero: {
    eyebrow: {
      en: "Academic Profile", ar: "الملف الأكاديمي", zh: "学术简介",
      es: "Perfil Académico", fr: "Profil Académique", tr: "Akademik Profil",
      ko: "학술 프로필", ja: "アカデミックプロフィール", id: "Profil Akademik"
    },
    // title1 and title2 are two INDEPENDENT professional titles, one per
    // line — not two halves of a single sentence. app.js joins them with
    // " · " for <title>/og:title/jobTitle, so each must read correctly on
    // its own. The Arabic title2 keeps its leading "و" because Arabic
    // joins the two roles grammatically.
    // Two independent professional titles, one per line. Each is the SHORT
    // professional form used in that language, not a literal translation of
    // the English: a hero headline that wraps to five or seven lines loses
    // its hierarchy, and the specialisation ("for non-native speakers") is
    // already stated in hero.description and in the highlights below.
    //
    // title1 alone becomes the <title> and og:title (see app.js), which is
    // what keeps them inside the ~60-character limit search engines show.
    title1: {
      en: "Arabic Language Educator",
      ar: "معلم لغة عربية للناطقين بغيرها",
      zh: "国际阿拉伯语教育者",
      es: "Educador de Lengua Árabe",
      fr: "Enseignant d'Arabe",
      tr: "Arapça Dil Eğitmeni",
      ko: "아랍어 교육자",
      ja: "アラビア語教育者",
      id: "Pendidik Bahasa Arab"
    },
    title2: {
      en: "Digital Learning Experience Designer",
      ar: "ومصمم تجارب تعلم رقمية",
      zh: "数字化学习体验设计师",
      // The established professional term in each language rather than a
      // descriptive rendering of the English: "concepteur pédagogique" is
      // what a French reader recognises as this job, and it costs a line less.
      es: "Diseñador de Aprendizaje Digital",
      fr: "Concepteur Pédagogique Numérique",
      tr: "Dijital Öğrenme Tasarımcısı",
      ko: "디지털 학습 경험 디자이너",
      ja: "デジタル学習体験デザイナー",
      id: "Perancang Pengalaman Belajar Digital"
    },
    description: {
      en: "An international Arabic language educator specializing in teaching Arabic to non-native speakers — particularly international learners from diverse cultural backgrounds — while developing innovative digital learning solutions.",
      ar: "مدرس لغة عربية دولي متخصص في تعليم العربية للناطقين بغيرها، وخاصة المتعلمين الدوليين من مختلف الخلفيات الثقافية، مع تطوير حلول تعليمية رقمية مبتكرة.",
      zh: "一位国际阿拉伯语教育专家，专注于为非母语学习者——尤其是来自不同文化背景的国际学生——教授阿拉伯语，同时致力于开发创新的数字化学习方案。",
      es: "Educador internacional de lengua árabe especializado en la enseñanza del árabe a hablantes no nativos —en particular, estudiantes internacionales de orígenes culturales diversos— mientras desarrolla soluciones de aprendizaje digital innovadoras.",
      fr: "Enseignant international de langue arabe, spécialisé dans l'enseignement de l'arabe aux locuteurs non natifs — en particulier aux apprenants internationaux issus de milieux culturels variés — tout en développant des solutions d'apprentissage numérique innovantes.",
      tr: "Ana dili Arapça olmayan öğrencilere — özellikle farklı kültürel geçmişlere sahip uluslararası öğrencilere — Arapça öğretiminde uzmanlaşmış, aynı zamanda yenilikçi dijital öğrenme çözümleri geliştiren uluslararası bir Arapça dil eğitmeni.",
      ko: "비원어민, 특히 다양한 문화적 배경을 가진 국제 학습자를 대상으로 아랍어 교육을 전문으로 하며, 혁신적인 디지털 학습 솔루션을 개발하는 국제 아랍어 교육 전문가입니다.",
      ja: "非母語話者、特に多様な文化的背景を持つ国際的な学習者を対象にアラビア語教育を専門とし、革新的なデジタル学習ソリューションの開発にも取り組む国際アラビア語教育者です。",
      id: "Pendidik bahasa Arab internasional yang berfokus pada pengajaran bahasa Arab untuk penutur non-native — khususnya pelajar internasional dari berbagai latar belakang budaya — sekaligus mengembangkan solusi pembelajaran digital yang inovatif."
    }
  },

  // =======================================================================
  // Academic Profile strip
  // =======================================================================
  academicProfile: {
    line: {
      en: "Arabic Language Educator  ·  Educational Technology Creator  ·  Cross-cultural Learning Specialist",
      ar: "مدرّس لغة عربية دولي  ·  مبتكر في تكنولوجيا التعليم  ·  متخصص في التعلم متعدد الثقافات",
      zh: "阿拉伯语教育专家  ·  教育科技创造者  ·  跨文化学习专家",
      es: "Educador de Lengua Árabe  ·  Creador de Tecnología Educativa  ·  Especialista en Aprendizaje Intercultural",
      fr: "Enseignant de Langue Arabe  ·  Créateur de Technologie Éducative  ·  Spécialiste de l'Apprentissage Interculturel",
      tr: "Arapça Dil Eğitmeni  ·  Eğitim Teknolojisi Geliştiricisi  ·  Kültürlerarası Öğrenme Uzmanı",
      ko: "아랍어 교육 전문가  ·  에듀테크 개발자  ·  다문화 학습 전문가",
      ja: "アラビア語教育者 · 教育テクノロジー開発者 · 異文化学習スペシャリスト",
      id: "Pendidik Bahasa Arab  ·  Pencipta Teknologi Pendidikan  ·  Spesialis Pembelajaran Lintas Budaya"
    }
  },

  // =======================================================================
  // About
  // =======================================================================
  about: {
    paragraphs: {
      en: [
        "I have spent years teaching Arabic to non-native speakers, working directly with learners from a wide range of linguistic and cultural backgrounds, each bringing a different way of approaching a new language.",
        "I understand the real challenges of learning Arabic as a second language — from its writing system and phonetics to grammar and cultural context — and I design every lesson around that understanding rather than a one-size-fits-all template.",
        "I combine modern teaching methods with educational technology to build interactive learning experiences, moving beyond rote memorization to make learning Arabic feel like genuine communication rather than a theoretical exercise."
      ],
      ar: [
        "أعمل مدرسًا للغة العربية للناطقين بغيرها منذ سنوات، وقد أتاح لي هذا المسار التعامل المباشر مع متعلمين من خلفيات لغوية وثقافية متنوعة حول العالم، لكل منهم طريقة تفكير مختلفة في اكتساب لغة جديدة.",
        "أفهم جيدًا التحديات التي تواجه متعلم العربية كلغة ثانية، من نظام الكتابة والصوتيات إلى القواعد والسياق الثقافي، وأصمم دروسي بناءً على هذا الفهم لا على قالب تعليمي واحد يناسب الجميع.",
        "أدمج بين أساليب التدريس الحديثة والتكنولوجيا التعليمية لبناء تجارب تعلم تفاعلية، بعيدًا عن الحفظ التقليدي، تجعل تعلم العربية عملية تواصل حي أكثر منها درسًا نظريًا."
      ],
      zh: [
        "多年来，我一直从事阿拉伯语作为第二语言的教学工作，直接接触来自世界各地、语言和文化背景各异的学习者，每个人理解新语言的方式都不尽相同。",
        "我深知非母语者学习阿拉伯语所面临的真正挑战——从书写系统、语音到语法和文化背景——我依据这种理解设计每一堂课，而不是套用一成不变的教学模板。",
        "我将现代教学方法与教育科技相结合，打造互动式学习体验，摆脱死记硬背的传统方式，让学习阿拉伯语更像是一场真实的交流，而非枯燥的理论课。"
      ],
      es: [
        "Llevo años enseñando árabe a hablantes no nativos, trabajando directamente con estudiantes de una amplia variedad de orígenes lingüísticos y culturales, cada uno con una forma distinta de abordar un nuevo idioma.",
        "Comprendo los verdaderos desafíos de aprender árabe como segunda lengua —desde su sistema de escritura y fonética hasta la gramática y el contexto cultural— y diseño cada clase a partir de esa comprensión, en lugar de aplicar una plantilla única para todos.",
        "Combino métodos de enseñanza modernos con tecnología educativa para crear experiencias de aprendizaje interactivas, dejando atrás la memorización mecánica para que aprender árabe se sienta como una comunicación real y no como un ejercicio teórico."
      ],
      fr: [
        "Depuis plusieurs années, j'enseigne l'arabe à des locuteurs non natifs, en travaillant directement avec des apprenants d'horizons linguistiques et culturels très variés, chacun abordant une nouvelle langue à sa manière.",
        "Je comprends les véritables défis de l'apprentissage de l'arabe en tant que langue seconde — de son système d'écriture et de sa phonétique à sa grammaire et son contexte culturel — et je conçois chaque cours à partir de cette compréhension, plutôt que d'appliquer un modèle unique.",
        "J'associe des méthodes d'enseignement modernes à la technologie éducative pour créer des expériences d'apprentissage interactives, en allant au-delà de la mémorisation mécanique afin que l'apprentissage de l'arabe ressemble à une véritable communication plutôt qu'à un exercice théorique."
      ],
      tr: [
        "Yıllardır ana dili Arapça olmayan öğrencilere Arapça öğretiyorum; dünyanın dört bir yanından, dil ve kültürel geçmişleri birbirinden çok farklı öğrencilerle doğrudan çalışıyorum ve her biri yeni bir dile farklı bir şekilde yaklaşıyor.",
        "Arapçayı ikinci dil olarak öğrenmenin gerçek zorluklarını iyi biliyorum — yazı sistemi ve fonetikten dilbilgisine ve kültürel bağlama kadar — ve her dersi herkese uyan tek bir şablona göre değil, bu anlayış üzerine tasarlıyorum.",
        "Modern öğretim yöntemlerini eğitim teknolojisiyle birleştirerek etkileşimli öğrenme deneyimleri oluşturuyorum; ezber yerine, Arapça öğrenmeyi teorik bir alıştırmadan çok gerçek bir iletişim deneyimi haline getiriyorum."
      ],
      ko: [
        "저는 오랫동안 비원어민을 대상으로 아랍어를 가르쳐 왔으며, 언어적·문화적 배경이 매우 다양한 전 세계 학습자들과 직접 소통해 왔습니다. 각 학습자는 새로운 언어에 접근하는 방식이 저마다 다릅니다.",
        "저는 아랍어를 제2언어로 배우는 데 따르는 실제적인 어려움—문자 체계와 발음부터 문법, 문화적 맥락까지—을 잘 이해하고 있으며, 획일적인 틀이 아니라 이러한 이해를 바탕으로 매 수업을 설계합니다.",
        "저는 현대적인 교수법과 교육 기술을 결합해 상호작용적인 학습 경험을 만듭니다. 단순 암기를 넘어, 아랍어 학습이 이론적인 연습이 아니라 진정한 소통처럼 느껴지도록 합니다."
      ],
      ja: [
        "私は長年にわたり、非母語話者にアラビア語を教えてきました。世界各地の、言語的・文化的背景が大きく異なる学習者と直接向き合い、それぞれが新しい言語に対して異なるアプローチを持っていることを実感してきました。",
        "文字体系や発音から文法、文化的背景に至るまで、第二言語としてアラビア語を学ぶ際の本質的な難しさを理解しており、画一的なテンプレートではなく、その理解に基づいて一つひとつの授業を設計しています。",
        "現代的な教授法と教育テクノロジーを組み合わせ、双方向的な学習体験を構築しています。単なる暗記にとどまらず、アラビア語学習が理論的な練習ではなく本物のコミュニケーションのように感じられることを目指しています。"
      ],
      id: [
        "Selama bertahun-tahun saya mengajar bahasa Arab kepada penutur non-native, bekerja langsung dengan pelajar dari beragam latar belakang bahasa dan budaya, yang masing-masing memiliki cara berbeda dalam mempelajari bahasa baru.",
        "Saya memahami tantangan nyata dalam mempelajari bahasa Arab sebagai bahasa kedua — mulai dari sistem tulisan dan fonetik hingga tata bahasa dan konteks budaya — dan saya merancang setiap pelajaran berdasarkan pemahaman tersebut, bukan mengikuti satu templat yang sama untuk semua orang.",
        "Saya memadukan metode pengajaran modern dengan teknologi pendidikan untuk membangun pengalaman belajar yang interaktif, melampaui hafalan semata agar belajar bahasa Arab terasa seperti komunikasi yang nyata, bukan sekadar latihan teoretis."
      ]
    }
  },

  // =======================================================================
  // Professional highlights — quick-scan credibility strip.
  // "value" is a short display string (a real count, or a qualitative word
  // when no honest number exists — never a fabricated metric). Rendered
  // between the Academic Profile strip and the About section.
  // =======================================================================
  highlights: [
    {
      // Counted from this year rather than written as a fixed number, so the
      // figure stays true on its own — app.js renders (current year - this).
      // 2016 is when the international teaching role began; see exp1.
      //
      // Replaced the previous "9+": the open-ended form reads as marketing on
      // an academic profile, and its "+" was the one value on the page whose
      // glyphs the bidi algorithm reordered in Arabic.
      id: "hl1", valueSinceYear: 2016,
      label: {
        en: "Years of Teaching Experience", ar: "سنوات من التدريس", zh: "教学经验年限", es: "Años de Experiencia Docente",
        fr: "Années d'Expérience en Enseignement", tr: "Yıllık Öğretmenlik Deneyimi", ko: "교육 경력(년)",
        ja: "指導経験年数", id: "Tahun Pengalaman Mengajar"
      },
      description: {
        en: "Experience teaching Arabic as a foreign language and working with non-native Arabic learners.",
        ar: "خبرة في تدريس اللغة العربية كلغة أجنبية والعمل مع متعلمين غير ناطقين بها.",
        zh: "拥有将阿拉伯语作为外语教学的经验，长期与非母语学习者合作。",
        es: "Experiencia enseñando árabe como lengua extranjera y trabajando con estudiantes no nativos.",
        fr: "Expérience dans l'enseignement de l'arabe langue étrangère auprès d'apprenants non natifs.",
        tr: "Arapçayı yabancı dil olarak öğretme ve ana dili Arapça olmayan öğrencilerle çalışma deneyimi.",
        ko: "아랍어를 외국어로 가르치며 비원어민 학습자와 함께한 경험.",
        ja: "外国語としてのアラビア語を、非母語話者に指導してきた経験。",
        id: "Pengalaman mengajar bahasa Arab sebagai bahasa asing dan bekerja dengan pelajar non-native."
      }
    },
    {
      id: "hl2", value: {
        en: "Global", ar: "عالمي", zh: "全球", es: "Global", fr: "International",
        tr: "Küresel", ko: "글로벌", ja: "グローバル", id: "Global"
      },
      label: {
        en: "International Classroom Experience", ar: "خبرة تدريس دولية", zh: "国际化课堂经验", es: "Experiencia en Aulas Internacionales",
        fr: "Expérience en Classes Internationales", tr: "Uluslararası Sınıf Deneyimi", ko: "국제적인 강의실 경험",
        ja: "国際的な指導経験", id: "Pengalaman Kelas Internasional"
      },
      description: {
        en: "Teaching Arabic to students from diverse cultural and linguistic backgrounds.",
        ar: "تدريس اللغة العربية لطلاب من خلفيات ثقافية ولغوية متنوعة.",
        zh: "为来自不同文化和语言背景的学生教授阿拉伯语。",
        es: "Enseñanza de árabe a estudiantes de orígenes culturales y lingüísticos diversos.",
        fr: "Enseignement de l'arabe à des étudiants d'origines culturelles et linguistiques variées.",
        tr: "Farklı kültürel ve dilsel geçmişlere sahip öğrencilere Arapça öğretimi.",
        ko: "다양한 문화적·언어적 배경을 가진 학생들에게 아랍어를 가르칩니다.",
        ja: "多様な文化的・言語的背景を持つ学習者にアラビア語を指導。",
        id: "Mengajar bahasa Arab kepada siswa dari latar belakang budaya dan bahasa yang beragam."
      }
    },
    {
      id: "hl3", value: "3",
      label: {
        en: "Educational Contexts", ar: "سياقات تعليمية متعددة", zh: "多元教育场景", es: "Contextos Educativos",
        fr: "Contextes Éducatifs", tr: "Farklı Eğitim Ortamları", ko: "다양한 교육 현장",
        ja: "多様な教育現場", id: "Konteks Pendidikan yang Beragam"
      },
      description: {
        en: "University teaching in China, private Arabic instruction, and digital educational content development.",
        ar: "التدريس الجامعي في الصين، والتدريس الخاص للغة العربية، وتطوير محتوى تعليمي رقمي.",
        zh: "涵盖中国的大学教学、私人阿拉伯语教学以及数字教育内容开发。",
        es: "Docencia universitaria en China, clases particulares de árabe y desarrollo de contenido educativo digital.",
        fr: "Enseignement universitaire en Chine, cours particuliers d'arabe et développement de contenu pédagogique numérique.",
        tr: "Çin'de üniversite düzeyinde öğretim, özel Arapça dersleri ve dijital eğitim içeriği geliştirme.",
        ko: "중국에서의 대학 강의, 개인 아랍어 교습, 디지털 교육 콘텐츠 개발.",
        ja: "中国での大学指導、個人向けアラビア語指導、デジタル教育コンテンツの開発。",
        id: "Pengajaran di universitas di Tiongkok, les privat bahasa Arab, dan pengembangan konten pendidikan digital."
      }
    },
    {
      id: "hl4", value: {
        en: "Creator", ar: "مبتكر", zh: "创立者", es: "Creador", fr: "Créateur",
        tr: "Kurucu", ko: "창시자", ja: "創設者", id: "Pencipta"
      },
      label: {
        en: "Educational Innovation", ar: "ابتكار تعليمي", zh: "教育创新", es: "Innovación Educativa",
        fr: "Innovation Pédagogique", tr: "Eğitimde Yenilik", ko: "교육 혁신",
        ja: "教育イノベーション", id: "Inovasi Pendidikan"
      },
      description: {
        en: "Creator of the Interactive Arabic Learning System — combining interactive lessons, speaking activities, and classroom technology.",
        ar: "مبتكر نظام التعلم التفاعلي للغة العربية — يجمع بين الدروس التفاعلية وأنشطة المحادثة وتقنيات الفصل الدراسي.",
        zh: "阿拉伯语互动学习系统的创立者——融合互动课程、口语活动与课堂技术。",
        es: "Creador del Sistema Interactivo de Aprendizaje de Árabe, que combina lecciones interactivas, actividades orales y tecnología en el aula.",
        fr: "Créateur du Système d'Apprentissage Interactif de l'Arabe, alliant leçons interactives, activités orales et technologie en classe.",
        tr: "Etkileşimli dersleri, konuşma etkinliklerini ve sınıf teknolojisini bir araya getiren İnteraktif Arapça Öğrenme Sistemi'nin yaratıcısı.",
        ko: "인터랙티브 레슨, 말하기 활동, 교실 기술을 결합한 '대화형 아랍어 학습 시스템'의 창시자.",
        ja: "インタラクティブなレッスン、スピーキング活動、教室テクノロジーを組み合わせた「アラビア語対話型学習システム」の創設者。",
        id: "Pencipta Sistem Pembelajaran Interaktif Bahasa Arab — memadukan pelajaran interaktif, aktivitas berbicara, dan teknologi kelas."
      }
    },
    {
      // Was the plain string "AR · EN · ZH", which showed untranslated in all
      // nine languages and overflowed its tile (290px of text in a 201px
      // column). The three languages are already named in the description
      // below, so the codes were redundant as well as too wide.
      id: "hl5", value: {
        en: "3 Languages", ar: "ثلاث لغات", zh: "三种语言", es: "3 Idiomas",
        fr: "3 Langues", tr: "3 Dil", ko: "3개 언어", ja: "3言語", id: "3 Bahasa"
      },
      label: {
        en: "Multilingual Communication", ar: "تواصل متعدد اللغات", zh: "多语言沟通能力", es: "Comunicación Multilingüe",
        fr: "Communication Multilingue", tr: "Çok Dilli İletişim", ko: "다국어 소통 능력",
        ja: "多言語コミュニケーション", id: "Komunikasi Multibahasa"
      },
      description: {
        en: "Confident communication across multicultural environments in Arabic, English, and Chinese.",
        ar: "القدرة على التواصل بثقة في بيئات متعددة الثقافات باللغات العربية والإنجليزية والصينية.",
        zh: "能够自信地在多元文化环境中使用阿拉伯语、英语和中文进行沟通。",
        es: "Capacidad de comunicarse con confianza en entornos multiculturales en árabe, inglés y chino.",
        fr: "Capacité à communiquer avec assurance dans des environnements multiculturels en arabe, anglais et chinois.",
        tr: "Arapça, İngilizce ve Çince ile çok kültürlü ortamlarda kendinden emin iletişim kurabilme.",
        ko: "아랍어, 영어, 중국어로 다문화 환경에서 자신 있게 소통할 수 있는 능력.",
        ja: "アラビア語・英語・中国語で異文化環境においても自信を持ってコミュニケーションできる能力。",
        id: "Mampu berkomunikasi dengan percaya diri di lingkungan multikultural dalam bahasa Arab, Inggris, dan Mandarin."
      }
    }
  ],

  // =======================================================================
  // Professional achievements
  // =======================================================================
  achievements: [
    {
      id: "ach1", icon: "years",
      title: { en: "Years of Experience", ar: "سنوات من الخبرة", zh: "多年教学经验", es: "Años de Experiencia", fr: "Années d'Expérience", tr: "Yıllara Dayanan Deneyim", ko: "다년간의 경력", ja: "長年の指導経験", id: "Bertahun-tahun Pengalaman" },
      description: {
        en: "Accumulated experience teaching Arabic to non-native speakers.",
        ar: "خبرة متراكمة في تدريس اللغة العربية للناطقين بغيرها.",
        zh: "在阿拉伯语作为第二语言教学方面积累了丰富经验。",
        es: "Experiencia acumulada enseñando árabe a hablantes no nativos.",
        fr: "Expérience cumulée dans l'enseignement de l'arabe aux locuteurs non natifs.",
        tr: "Ana dili Arapça olmayan öğrencilere Arapça öğretiminde birikmiş deneyim.",
        ko: "비원어민 대상 아랍어 교육 경험이 축적되어 있습니다.",
        ja: "非母語話者へのアラビア語指導における豊富な経験。",
        id: "Pengalaman yang terkumpul dalam mengajar bahasa Arab kepada penutur non-native."
      }
    },
    {
      id: "ach2", icon: "globe",
      title: { en: "International Environment", ar: "بيئة تدريس دولية", zh: "国际化教学环境", es: "Entorno Internacional", fr: "Environnement International", tr: "Uluslararası Ortam", ko: "국제적인 교육 환경", ja: "国際的な指導環境", id: "Lingkungan Internasional" },
      description: {
        en: "Teaching learners from diverse nationalities and cultural backgrounds.",
        ar: "تدريس متعلمين من جنسيات وخلفيات ثقافية متعددة.",
        zh: "为来自不同国籍与文化背景的学习者授课。",
        es: "Enseñanza a estudiantes de diversas nacionalidades y orígenes culturales.",
        fr: "Enseignement auprès d'apprenants de nationalités et de cultures variées.",
        tr: "Farklı milliyet ve kültürel geçmişlere sahip öğrencilere ders verme.",
        ko: "다양한 국적과 문화적 배경을 가진 학습자를 가르칩니다.",
        ja: "多様な国籍・文化的背景を持つ学習者への指導。",
        id: "Mengajar pelajar dari berbagai kebangsaan dan latar belakang budaya."
      }
    },
    {
      id: "ach3", icon: "content",
      title: { en: "Educational Content", ar: "تطوير محتوى تعليمي", zh: "教育内容开发", es: "Contenido Educativo", fr: "Contenu Pédagogique", tr: "Eğitim İçeriği", ko: "교육 콘텐츠 개발", ja: "教育コンテンツ開発", id: "Konten Pendidikan" },
      description: {
        en: "Designing materials and lessons built around international learners' needs.",
        ar: "تصميم مواد ودروس تراعي احتياجات المتعلم الدولي.",
        zh: "围绕国际学习者的需求设计教材与课程。",
        es: "Diseño de materiales y clases centrados en las necesidades de estudiantes internacionales.",
        fr: "Conception de supports et de cours adaptés aux besoins des apprenants internationaux.",
        tr: "Uluslararası öğrencilerin ihtiyaçlarına göre materyal ve ders tasarımı.",
        ko: "국제 학습자의 필요에 맞춘 교재와 수업을 설계합니다.",
        ja: "国際的な学習者のニーズに合わせた教材・授業の設計。",
        id: "Merancang materi dan pelajaran yang disesuaikan dengan kebutuhan pelajar internasional."
      }
    },
    {
      id: "ach4", icon: "system",
      title: { en: "Digital Learning Systems", ar: "أنظمة تعلم رقمية", zh: "数字化学习系统", es: "Sistemas de Aprendizaje Digital", fr: "Systèmes d'Apprentissage Numérique", tr: "Dijital Öğrenme Sistemleri", ko: "디지털 학습 시스템", ja: "デジタル学習システム", id: "Sistem Pembelajaran Digital" },
      description: {
        en: "Building interactive solutions that bring technology into language teaching.",
        ar: "بناء حلول تفاعلية تدمج التكنولوجيا في تعليم اللغة.",
        zh: "构建将科技融入语言教学的互动解决方案。",
        es: "Creación de soluciones interactivas que integran la tecnología en la enseñanza de idiomas.",
        fr: "Création de solutions interactives intégrant la technologie à l'enseignement des langues.",
        tr: "Teknolojiyi dil öğretimine entegre eden etkileşimli çözümler geliştirme.",
        ko: "언어 교육에 기술을 접목한 상호작용형 솔루션을 구축합니다.",
        ja: "言語教育にテクノロジーを取り入れた双方向型ソリューションの構築。",
        id: "Membangun solusi interaktif yang menghadirkan teknologi ke dalam pengajaran bahasa."
      }
    },
    {
      id: "ach5", icon: "culture",
      title: { en: "Cross-cultural Communication", ar: "تواصل عبر الثقافات", zh: "跨文化沟通", es: "Comunicación Intercultural", fr: "Communication Interculturelle", tr: "Kültürlerarası İletişim", ko: "다문화 소통", ja: "異文化コミュニケーション", id: "Komunikasi Lintas Budaya" },
      description: {
        en: "Practical experience communicating effectively across cultures.",
        ar: "خبرة عملية في التواصل الفعّال بين ثقافات مختلفة.",
        zh: "具备跨文化高效沟通的实践经验。",
        es: "Experiencia práctica en la comunicación eficaz entre culturas.",
        fr: "Expérience pratique d'une communication efficace entre les cultures.",
        tr: "Farklı kültürler arasında etkili iletişim konusunda pratik deneyim.",
        ko: "문화 간 효과적인 소통에 대한 실무 경험을 갖추고 있습니다.",
        ja: "異文化間で効果的にコミュニケーションを行う実践的な経験。",
        id: "Pengalaman praktis dalam berkomunikasi secara efektif lintas budaya."
      }
    }
  ],

  // =======================================================================
  // Experience timeline — "period" is a factual date range, kept plain.
  // "achievements" arrays are reserved for future quantified highlights.
  // =======================================================================
  experience: [
    {
      id: "exp1", icon: "language", period: "2016 — 2026",
      position: { en: "International Arabic Language Instructor", ar: "مدرس لغة عربية دولي", zh: "国际阿拉伯语教师", es: "Instructor Internacional de Lengua Árabe", fr: "Instructeur International de Langue Arabe", tr: "Uluslararası Arapça Dil Eğitmeni", ko: "국제 아랍어 강사", ja: "国際アラビア語講師", id: "Instruktur Bahasa Arab Internasional" },
      organization: { en: "China", ar: "الصين", zh: "中国", es: "China", fr: "Chine", tr: "Çin", ko: "중국", ja: "中国", id: "Tiongkok" },
      location: { en: "China", ar: "الصين", zh: "中国", es: "China", fr: "Chine", tr: "Çin", ko: "중국", ja: "中国", id: "Tiongkok" },
      summary: {
        en: "Teaching Arabic as a Foreign Language to international, non-native learners in China, with an emphasis on learner-centered course design. Combines communicative teaching methods with purpose-built interactive materials to make language acquisition practical and engaging rather than purely theoretical.",
        ar: "تدريس اللغة العربية كلغة أجنبية لمتعلمين دوليين غير ناطقين بها في الصين، مع التركيز على تصميم المقررات وفق احتياجات المتعلم. يجمع هذا الدور بين أساليب التدريس التواصلية ومواد تفاعلية مُعدّة خصيصًا لجعل اكتساب اللغة تجربة عملية وجذابة لا مجرد تمرين نظري.",
        zh: "在中国为国际非母语学习者教授阿拉伯语作为外语，注重以学习者为中心的课程设计。将交际教学法与专门开发的互动教材相结合，使语言习得成为实用而有吸引力的体验，而非单纯的理论训练。",
        es: "Enseñanza de árabe como lengua extranjera a estudiantes internacionales no nativos en China, con énfasis en un diseño de curso centrado en el alumno. Combina métodos de enseñanza comunicativa con materiales interactivos diseñados a medida para que la adquisición del idioma sea práctica y motivadora, no meramente teórica.",
        fr: "Enseignement de l'arabe langue étrangère à des apprenants internationaux non natifs en Chine, avec un accent sur une conception de cours centrée sur l'apprenant. Allie des méthodes d'enseignement communicatives à des supports interactifs conçus sur mesure pour rendre l'acquisition de la langue concrète et engageante plutôt que purement théorique.",
        tr: "Çin'de uluslararası, ana dili Arapça olmayan öğrencilere yabancı dil olarak Arapça öğretimi; öğrenci merkezli ders tasarımına özel önem verilmektedir. İletişimsel öğretim yöntemlerini, amaca özel hazırlanmış etkileşimli materyallerle birleştirerek dil edinimini salt teorik bir alıştırma olmaktan çıkarıp pratik ve ilgi çekici hale getirir.",
        ko: "중국에서 비원어민 국제 학습자를 대상으로 아랍어를 외국어로 가르치며, 학습자 중심의 강의 설계를 중시합니다. 의사소통 중심 교수법과 목적에 맞게 제작된 상호작용형 교재를 결합해 언어 습득을 단순한 이론 학습이 아닌 실용적이고 몰입감 있는 경험으로 만듭니다.",
        ja: "中国において、非母語話者である国際的な学習者を対象に外国語としてのアラビア語を指導。学習者中心のコース設計を重視し、コミュニカティブな教授法と、目的に応じて独自に開発した双方向型教材を組み合わせることで、言語習得を単なる理論的な練習ではなく、実践的で魅力的な体験にしている。",
        id: "Mengajar bahasa Arab sebagai bahasa asing kepada pelajar internasional non-native di Tiongkok, dengan penekanan pada desain kursus yang berpusat pada pelajar. Memadukan metode pengajaran komunikatif dengan materi interaktif yang dirancang khusus agar pemerolehan bahasa terasa praktis dan menarik, bukan sekadar latihan teoretis."
      },
      responsibilities: {
        en: [
          "Teaching Arabic language skills — speaking, listening, reading, and writing.",
          "Designing classroom activities that encourage communication and practical language use.",
          "Creating educational materials adapted to learners' needs and proficiency levels.",
          "Supporting students from diverse cultural and linguistic backgrounds.",
          "Integrating technology into language learning activities."
        ],
        ar: [
          "تدريس مهارات اللغة العربية — المحادثة والاستماع والقراءة والكتابة.",
          "تصميم أنشطة صفية تشجع على التواصل والاستخدام العملي للغة.",
          "إعداد مواد تعليمية تتناسب مع احتياجات المتعلمين ومستوياتهم.",
          "دعم الطلاب من خلفيات ثقافية ولغوية متنوعة.",
          "دمج التكنولوجيا في أنشطة تعلم اللغة."
        ],
        zh: [
          "教授阿拉伯语听、说、读、写各项技能。",
          "设计鼓励交流与实际语言运用的课堂活动。",
          "编制适应学习者需求与水平的教学材料。",
          "支持来自不同文化和语言背景的学生。",
          "将科技融入语言学习活动。"
        ],
        es: [
          "Enseñanza de las destrezas del árabe: expresión oral, comprensión auditiva, lectura y escritura.",
          "Diseño de actividades de aula que fomentan la comunicación y el uso práctico del idioma.",
          "Elaboración de materiales didácticos adaptados a las necesidades y niveles de los estudiantes.",
          "Apoyo a estudiantes de orígenes culturales y lingüísticos diversos.",
          "Integración de la tecnología en las actividades de aprendizaje del idioma."
        ],
        fr: [
          "Enseignement des compétences en arabe : expression orale, compréhension, lecture et écriture.",
          "Conception d'activités de classe favorisant la communication et l'usage pratique de la langue.",
          "Élaboration de supports pédagogiques adaptés aux besoins et niveaux des apprenants.",
          "Accompagnement d'étudiants d'origines culturelles et linguistiques variées.",
          "Intégration de la technologie dans les activités d'apprentissage linguistique."
        ],
        tr: [
          "Arapça konuşma, dinleme, okuma ve yazma becerilerinin öğretimi.",
          "İletişimi ve dilin pratik kullanımını teşvik eden sınıf içi etkinlikler tasarlama.",
          "Öğrencilerin ihtiyaç ve seviyelerine uygun eğitim materyalleri hazırlama.",
          "Farklı kültürel ve dilsel geçmişlere sahip öğrencilere destek olma.",
          "Dil öğrenme etkinliklerine teknolojiyi entegre etme."
        ],
        ko: [
          "말하기, 듣기, 읽기, 쓰기 등 아랍어 능력 교육.",
          "소통과 실제적인 언어 사용을 장려하는 수업 활동 설계.",
          "학습자의 필요와 수준에 맞는 교육 자료 제작.",
          "다양한 문화적·언어적 배경을 가진 학생 지원.",
          "언어 학습 활동에 기술을 접목."
        ],
        ja: [
          "話す・聞く・読む・書くというアラビア語の技能指導。",
          "コミュニケーションと実践的な言語使用を促す授業活動の設計。",
          "学習者のニーズと習熟度に合わせた教材の作成。",
          "多様な文化的・言語的背景を持つ学生へのサポート。",
          "言語学習活動へのテクノロジーの統合。"
        ],
        id: [
          "Mengajarkan keterampilan bahasa Arab — berbicara, menyimak, membaca, dan menulis.",
          "Merancang aktivitas kelas yang mendorong komunikasi dan penggunaan bahasa secara praktis.",
          "Menyusun materi pembelajaran yang disesuaikan dengan kebutuhan dan tingkat kemampuan pelajar.",
          "Mendukung siswa dari latar belakang budaya dan bahasa yang beragam.",
          "Mengintegrasikan teknologi ke dalam kegiatan pembelajaran bahasa."
        ]
      },
      achievements: {
        en: [
          "Built sustained experience teaching within an international educational environment.",
          "Developed interactive Arabic learning resources for non-native speakers.",
          "Applied technology-enhanced methods to strengthen classroom engagement.",
          "Created learning experiences tailored to learners from diverse backgrounds."
        ],
        ar: [
          "بناء خبرة ممتدة في التدريس ضمن بيئة تعليمية دولية.",
          "تطوير موارد تفاعلية لتعلّم اللغة العربية لغير الناطقين بها.",
          "تطبيق أساليب معزَّزة بالتكنولوجيا لتعزيز التفاعل الصفي.",
          "تصميم تجارب تعلّم تراعي تنوّع خلفيات المتعلمين."
        ],
        zh: [
          "在国际化教育环境中积累了持续的教学经验。",
          "为非母语学习者开发了互动式阿拉伯语学习资源。",
          "运用科技辅助教学法以增强课堂互动。",
          "为不同背景的学习者打造量身定制的学习体验。"
        ],
        es: [
          "Consolidó una experiencia docente sostenida en un entorno educativo internacional.",
          "Desarrolló recursos interactivos para el aprendizaje del árabe dirigidos a hablantes no nativos.",
          "Aplicó métodos potenciados por la tecnología para reforzar la participación en el aula.",
          "Diseñó experiencias de aprendizaje adaptadas a estudiantes de orígenes diversos."
        ],
        fr: [
          "A développé une expérience d'enseignement durable dans un environnement éducatif international.",
          "A conçu des ressources interactives pour l'apprentissage de l'arabe destinées aux locuteurs non natifs.",
          "A appliqué des méthodes technologiques pour renforcer l'engagement en classe.",
          "A élaboré des expériences d'apprentissage adaptées à des apprenants d'origines diverses."
        ],
        tr: [
          "Uluslararası bir eğitim ortamında kalıcı öğretmenlik deneyimi kazandı.",
          "Ana dili Arapça olmayanlar için etkileşimli Arapça öğrenme kaynakları geliştirdi.",
          "Sınıf içi katılımı güçlendirmek için teknoloji destekli yöntemler uyguladı.",
          "Farklı geçmişlere sahip öğrencilere özel öğrenme deneyimleri tasarladı."
        ],
        ko: [
          "국제적인 교육 환경에서 지속적인 교육 경력을 쌓았습니다.",
          "비원어민을 위한 상호작용형 아랍어 학습 자료를 개발했습니다.",
          "수업 참여도를 높이기 위해 기술 기반 교수법을 적용했습니다.",
          "다양한 배경의 학습자에 맞춘 학습 경험을 설계했습니다."
        ],
        ja: [
          "国際的な教育環境において継続的な指導経験を築いた。",
          "非母語話者向けの双方向型アラビア語学習教材を開発した。",
          "テクノロジーを活用した手法を取り入れ、授業への参加意欲を高めた。",
          "多様な背景を持つ学習者に合わせた学習体験を設計した。"
        ],
        id: [
          "Membangun pengalaman mengajar yang berkelanjutan dalam lingkungan pendidikan internasional.",
          "Mengembangkan sumber belajar bahasa Arab interaktif untuk penutur non-native.",
          "Menerapkan metode berbasis teknologi untuk memperkuat keterlibatan di kelas.",
          "Merancang pengalaman belajar yang disesuaikan untuk pelajar dari latar belakang beragam."
        ]
      },
      skills: {
        en: ["Teaching Arabic as a Foreign Language (TAFL)", "Learner-Centered Curriculum Design", "Cross-Cultural Classroom Communication", "Educational Technology Integration"],
        ar: ["تدريس العربية كلغة أجنبية", "تصميم مناهج محورها المتعلم", "تواصل صفي عبر الثقافات", "دمج التكنولوجيا التعليمية"],
        zh: ["阿拉伯语作为外语教学", "以学习者为中心的课程设计", "跨文化课堂沟通", "教育技术整合"],
        es: ["Enseñanza de Árabe como Lengua Extranjera", "Diseño Curricular Centrado en el Alumno", "Comunicación Intercultural en el Aula", "Integración de Tecnología Educativa"],
        fr: ["Enseignement de l'Arabe Langue Étrangère", "Conception de Programmes Centrés sur l'Apprenant", "Communication Interculturelle en Classe", "Intégration des Technologies Éducatives"],
        tr: ["Yabancı Dil Olarak Arapça Öğretimi", "Öğrenci Merkezli Müfredat Tasarımı", "Kültürlerarası Sınıf İletişimi", "Eğitim Teknolojisi Entegrasyonu"],
        ko: ["외국어로서의 아랍어 교육", "학습자 중심 교육과정 설계", "다문화 교실 커뮤니케이션", "교육 기술 통합"],
        ja: ["外国語としてのアラビア語教育", "学習者中心のカリキュラム設計", "異文化間の教室コミュニケーション", "教育テクノロジーの統合"],
        id: ["Pengajaran Bahasa Arab sebagai Bahasa Asing", "Desain Kurikulum Berpusat pada Pelajar", "Komunikasi Lintas Budaya di Kelas", "Integrasi Teknologi Pendidikan"]
      }
    },
    {
      id: "exp2", icon: "book", period: "2013 — 2015",
      position: { en: "Arabic Language Teacher", ar: "مدرس لغة عربية", zh: "阿拉伯语教师", es: "Profesor de Lengua Árabe", fr: "Professeur de Langue Arabe", tr: "Arapça Öğretmeni", ko: "아랍어 교사", ja: "アラビア語教師", id: "Guru Bahasa Arab" },
      organization: { en: "Al-Arish, Egypt", ar: "العريش، مصر", zh: "埃及阿里什", es: "Al-Arish, Egipto", fr: "Al-Arish, Égypte", tr: "El-Ariş, Mısır", ko: "이집트 알아리시", ja: "エジプト・アル＝アリーシュ", id: "Al-Arish, Mesir" },
      location: { en: "Al-Arish, Egypt", ar: "العريش، مصر", zh: "埃及阿里什", es: "Al-Arish, Egipto", fr: "Al-Arish, Égypte", tr: "El-Ariş, Mısır", ko: "이집트 알아리시", ja: "エジプト・アル＝アリーシュ", id: "Al-Arish, Mesir" },
      summary: {
        en: "Provided private Arabic language instruction for young learners in Al-Arish, Egypt, focused on building strong foundational literacy and communication skills through personalized, learner-paced lessons.",
        ar: "تقديم دروسًا خصوصية في اللغة العربية لمتعلمين صغار السن، مع التركيز على بناء أساس متين لمهارات القراءة والكتابة والتواصل من خلال دروس فردية تراعي وتيرة كل متعلم.",
        zh: "在埃及阿里什为年幼学习者提供阿拉伯语私人教学，通过个性化、按学习者节奏进行的课程，帮助其打下扎实的读写与沟通基础。",
        es: "Impartió clases particulares de árabe a alumnos jóvenes en Al-Arish, Egipto, centradas en desarrollar una base sólida de alfabetización y comunicación mediante lecciones personalizadas y adaptadas al ritmo de cada estudiante.",
        fr: "A dispensé des cours particuliers d'arabe à de jeunes apprenants à Al-Arish, en Égypte, en mettant l'accent sur la construction de bases solides en lecture, écriture et communication grâce à des leçons personnalisées, au rythme de chaque élève.",
        tr: "Mısır'ın El-Ariş kentinde küçük yaştaki öğrencilere özel Arapça dersleri verdi; kişiselleştirilmiş ve öğrencinin kendi hızında ilerlediği derslerle güçlü bir okuma-yazma ve iletişim temeli oluşturmaya odaklandı.",
        ko: "이집트 알아리시에서 어린 학습자를 대상으로 아랍어 개인 지도를 진행했으며, 학습자 개개인의 속도에 맞춘 맞춤형 수업을 통해 탄탄한 읽기·쓰기 및 의사소통 기초를 다지는 데 주력했습니다.",
        ja: "エジプト・アル＝アリーシュにて、低年齢の学習者を対象にアラビア語の個人指導を実施。学習者一人ひとりのペースに合わせた個別レッスンを通じて、読み書きとコミュニケーションの確かな基礎力の育成に注力した。",
        id: "Memberikan les privat bahasa Arab untuk pelajar usia dini di Al-Arish, Mesir, dengan fokus membangun dasar literasi dan komunikasi yang kuat melalui pelajaran yang dipersonalisasi sesuai kecepatan masing-masing pelajar."
      },
      responsibilities: {
        en: ["Preparing lessons adapted to each learner's level and pace.", "Improving reading, writing, and communication skills.", "Creating a supportive, encouraging learning environment."],
        ar: ["إعداد دروس تتناسب مع مستوى ووتيرة كل متعلم.", "تحسين مهارات القراءة والكتابة والتواصل.", "تهيئة بيئة تعلّم داعمة ومحفِّزة."],
        zh: ["按照每位学习者的水平与节奏备课。", "提升学生的阅读、写作与沟通能力。", "营造支持性且富有鼓励氛围的学习环境。"],
        es: ["Preparación de lecciones adaptadas al nivel y ritmo de cada alumno.", "Mejora de las destrezas de lectura, escritura y comunicación.", "Creación de un entorno de aprendizaje motivador y de apoyo."],
        fr: ["Préparation de leçons adaptées au niveau et au rythme de chaque élève.", "Amélioration des compétences en lecture, écriture et communication.", "Création d'un environnement d'apprentissage bienveillant et stimulant."],
        tr: ["Her öğrencinin seviyesine ve hızına uygun ders hazırlama.", "Okuma, yazma ve iletişim becerilerini geliştirme.", "Destekleyici ve teşvik edici bir öğrenme ortamı oluşturma."],
        ko: ["학습자의 수준과 속도에 맞춘 수업 준비.", "읽기, 쓰기, 의사소통 능력 향상.", "지지적이고 격려가 되는 학습 환경 조성."],
        ja: ["学習者一人ひとりのレベルとペースに合わせた授業準備。", "読み書き・コミュニケーション能力の向上。", "支援的で前向きな学習環境の構築。"],
        id: ["Menyiapkan pelajaran yang disesuaikan dengan tingkat dan kecepatan masing-masing pelajar.", "Meningkatkan keterampilan membaca, menulis, dan berkomunikasi.", "Menciptakan lingkungan belajar yang suportif dan memotivasi."]
      },
      achievements: {
        en: ["Adapted instruction consistently to each learner's individual pace and needs.", "Built foundational Arabic literacy skills through sustained, personalized teaching."],
        ar: ["مواءمة التدريس باستمرار مع وتيرة واحتياجات كل متعلم.", "بناء مهارات القراءة والكتابة الأساسية بالعربية عبر تدريس فردي مستمر."],
        zh: ["持续根据每位学习者的节奏与需求调整教学。", "通过持续的个性化教学，帮助学生打下阿拉伯语读写基础。"],
        es: ["Adaptó la enseñanza de forma constante al ritmo y las necesidades de cada alumno.", "Desarrolló competencias básicas de lectoescritura en árabe mediante una enseñanza personalizada y sostenida."],
        fr: ["A constamment adapté l'enseignement au rythme et aux besoins de chaque élève.", "A développé les compétences de base en lecture-écriture arabe grâce à un enseignement personnalisé et soutenu."],
        tr: ["Öğretimi her öğrencinin bireysel hızına ve ihtiyaçlarına göre sürekli uyarladı.", "Sürekli ve kişiselleştirilmiş öğretimle temel Arapça okuma-yazma becerilerini kazandırdı."],
        ko: ["학습자 개개인의 속도와 필요에 맞춰 지속적으로 지도 방식을 조정했습니다.", "지속적이고 맞춤화된 지도를 통해 기초적인 아랍어 문해력을 길렀습니다."],
        ja: ["学習者一人ひとりのペースとニーズに合わせて指導を継続的に調整した。", "継続的かつ個別的な指導を通じて、基礎的なアラビア語の読み書き能力を育成した。"],
        id: ["Secara konsisten menyesuaikan pengajaran dengan kecepatan dan kebutuhan masing-masing pelajar.", "Membangun keterampilan literasi dasar bahasa Arab melalui pengajaran yang personal dan berkelanjutan."]
      },
      skills: {
        en: ["Personalized Instruction", "Foundational Literacy Teaching", "Learner-Paced Lesson Planning"],
        ar: ["تدريس فردي مخصّص", "تعليم مهارات القراءة والكتابة الأساسية", "تخطيط دروس وفق وتيرة المتعلم"],
        zh: ["个性化教学", "基础读写教学", "按学习者节奏规划课程"],
        es: ["Enseñanza Personalizada", "Alfabetización Inicial", "Planificación de Lecciones al Ritmo del Alumno"],
        fr: ["Enseignement Personnalisé", "Enseignement de la Littératie de Base", "Planification de Leçons au Rythme de l'Élève"],
        tr: ["Kişiselleştirilmiş Öğretim", "Temel Okuryazarlık Eğitimi", "Öğrenci Hızına Göre Ders Planlama"],
        ko: ["맞춤형 지도", "기초 문해력 교육", "학습자 속도별 수업 설계"],
        ja: ["個別指導", "基礎的な読み書き指導", "学習者のペースに合わせた授業計画"],
        id: ["Pengajaran yang Dipersonalisasi", "Pengajaran Literasi Dasar", "Perencanaan Pelajaran Sesuai Kecepatan Pelajar"]
      }
    },
    {
      id: "exp3", icon: "computer", period: "2014 — 2016",
      position: { en: "Computer Teacher & Quality Management Assistant", ar: "مدرس حاسب آلي ومساعد إدارة جودة", zh: "计算机教师兼质量管理助理", es: "Profesor de Informática y Asistente de Gestión de Calidad", fr: "Professeur d'Informatique et Assistant en Gestion de la Qualité", tr: "Bilgisayar Öğretmeni ve Kalite Yönetimi Asistanı", ko: "컴퓨터 교사 겸 품질관리 보조", ja: "コンピュータ教師 兼 品質管理アシスタント", id: "Guru Komputer & Asisten Manajemen Mutu" },
      organization: { en: "Al-Arish, Egypt", ar: "العريش، مصر", zh: "埃及阿里什", es: "Al-Arish, Egipto", fr: "Al-Arish, Égypte", tr: "El-Ariş, Mısır", ko: "이집트 알아리시", ja: "エジプト・アル＝アリーシュ", id: "Al-Arish, Mesir" },
      location: { en: "Al-Arish, Egypt", ar: "العريش، مصر", zh: "埃及阿里什", es: "Al-Arish, Egipto", fr: "Al-Arish, Égypte", tr: "El-Ariş, Mısır", ko: "이집트 알아리시", ja: "エジプト・アル＝アリーシュ", id: "Al-Arish, Mesir" },
      summary: {
        en: "Taught computer science fundamentals while contributing to quality management processes at a school in Al-Arish, Egypt — an early foundation for combining technology with structured educational practice.",
        ar: "تقديم دروس في أساسيات علوم الحاسب مع المشاركة في عمليات إدارة الجودة في مدرسة سينا سكول — وهي مرحلة مبكرة أرست أساسًا للجمع بين التكنولوجيا والممارسة التعليمية المنظمة.",
        zh: "在埃及阿里什一所学校教授计算机科学基础知识，同时参与质量管理相关工作——为日后将科技与规范化教育实践相结合奠定了早期基础。",
        es: "Impartió los fundamentos de informática y colaboró en los procesos de gestión de calidad de una escuela en Al-Arish, Egipto, sentando una base temprana para combinar la tecnología con una práctica educativa estructurada.",
        fr: "A enseigné les fondamentaux de l'informatique tout en participant aux processus de gestion de la qualité dans une école d'Al-Arish, en Égypte — une base précoce pour associer technologie et pratique pédagogique structurée.",
        tr: "Mısır'ın El-Ariş kentindeki bir okulda temel bilgisayar bilimleri dersleri verirken kalite yönetimi süreçlerine de katkı sağladı; bu deneyim, teknolojiyi yapılandırılmış eğitim uygulamalarıyla birleştirmenin erken bir temelini oluşturdu.",
        ko: "이집트 알아리시의 한 학교에서 컴퓨터 과학 기초를 가르치는 동시에 품질관리 업무에도 참여했으며, 이는 기술과 체계적인 교육 실천을 결합하는 초기 토대가 되었습니다.",
        ja: "エジプト・アル＝アリーシュの学校でコンピュータ科学の基礎を指導しながら、品質管理プロセスにも従事。テクノロジーと体系立った教育実践を組み合わせる、後の礎となった時期。",
        id: "Mengajar dasar-dasar ilmu komputer sekaligus berkontribusi dalam proses manajemen mutu di sebuah sekolah di Al-Arish, Mesir — menjadi fondasi awal dalam memadukan teknologi dengan praktik pendidikan yang terstruktur."
      },
      responsibilities: {
        en: ["Teaching computer skills and digital literacy fundamentals.", "Supporting students' digital literacy development.", "Participating in school quality-management activities.", "Using technology to improve everyday educational processes."],
        ar: ["تدريس مهارات الحاسب وأساسيات المعرفة الرقمية.", "دعم تطوير المعرفة الرقمية لدى الطلاب.", "المشاركة في أنشطة إدارة الجودة بالمدرسة.", "استخدام التكنولوجيا لتحسين العمليات التعليمية اليومية."],
        zh: ["教授计算机技能与数字素养基础。", "支持学生数字素养的发展。", "参与学校质量管理相关活动。", "运用科技改善日常教育流程。"],
        es: ["Enseñanza de habilidades informáticas y alfabetización digital básica.", "Apoyo al desarrollo de la alfabetización digital de los alumnos.", "Participación en actividades de gestión de calidad de la escuela.", "Uso de la tecnología para mejorar los procesos educativos cotidianos."],
        fr: ["Enseignement des compétences informatiques et des bases de la littératie numérique.", "Accompagnement des élèves dans le développement de leur littératie numérique.", "Participation aux activités de gestion de la qualité de l'école.", "Utilisation de la technologie pour améliorer les processus pédagogiques quotidiens."],
        tr: ["Bilgisayar becerileri ve temel dijital okuryazarlık eğitimi verme.", "Öğrencilerin dijital okuryazarlık gelişimini destekleme.", "Okulun kalite yönetimi faaliyetlerine katılma.", "Günlük eğitim süreçlerini iyileştirmek için teknolojiyi kullanma."],
        ko: ["컴퓨터 활용 능력 및 디지털 리터러시 기초 교육.", "학생들의 디지털 리터러시 향상 지원.", "학교 품질관리 활동 참여.", "일상적인 교육 과정 개선을 위한 기술 활용."],
        ja: ["コンピュータスキルおよびデジタルリテラシーの基礎指導。", "生徒のデジタルリテラシー向上の支援。", "学校の品質管理活動への参加。", "日常の教育プロセス改善のためのテクノロジー活用。"],
        id: ["Mengajarkan keterampilan komputer dan literasi digital dasar.", "Mendukung pengembangan literasi digital siswa.", "Berpartisipasi dalam kegiatan manajemen mutu sekolah.", "Menggunakan teknologi untuk meningkatkan proses pendidikan sehari-hari."]
      },
      achievements: {
        en: ["Supported the integration of technology into everyday classroom practice.", "Contributed to school-wide quality-management initiatives."],
        ar: ["دعم دمج التكنولوجيا في الممارسة الصفية اليومية.", "المساهمة في مبادرات إدارة الجودة على مستوى المدرسة."],
        zh: ["支持将科技融入日常课堂实践。", "为全校范围的质量管理举措作出贡献。"],
        es: ["Apoyó la integración de la tecnología en la práctica diaria del aula.", "Contribuyó a iniciativas de gestión de calidad a nivel de toda la escuela."],
        fr: ["A soutenu l'intégration de la technologie dans la pratique quotidienne en classe.", "A contribué à des initiatives de gestion de la qualité à l'échelle de l'école."],
        tr: ["Teknolojinin günlük sınıf uygulamalarına entegrasyonunu destekledi.", "Okul genelindeki kalite yönetimi girişimlerine katkı sağladı."],
        ko: ["일상적인 수업 활동에 기술을 접목하는 것을 지원했습니다.", "학교 차원의 품질관리 이니셔티브에 기여했습니다."],
        ja: ["日常の授業実践へのテクノロジー導入を支援した。", "学校全体の品質管理の取り組みに貢献した。"],
        id: ["Mendukung integrasi teknologi ke dalam praktik kelas sehari-hari.", "Berkontribusi pada inisiatif manajemen mutu di seluruh sekolah."]
      },
      skills: {
        en: ["Digital Literacy Instruction", "Quality Management Processes", "Technology Integration in Education"],
        ar: ["تعليم المعرفة الرقمية", "عمليات إدارة الجودة", "دمج التكنولوجيا في التعليم"],
        zh: ["数字素养教学", "质量管理流程", "教育中的技术整合"],
        es: ["Enseñanza de Alfabetización Digital", "Procesos de Gestión de Calidad", "Integración Tecnológica en la Educación"],
        fr: ["Enseignement de la Littératie Numérique", "Processus de Gestion de la Qualité", "Intégration Technologique dans l'Éducation"],
        tr: ["Dijital Okuryazarlık Eğitimi", "Kalite Yönetimi Süreçleri", "Eğitimde Teknoloji Entegrasyonu"],
        ko: ["디지털 리터러시 교육", "품질관리 프로세스", "교육 내 기술 통합"],
        ja: ["デジタルリテラシー指導", "品質管理プロセス", "教育におけるテクノロジー統合"],
        id: ["Pengajaran Literasi Digital", "Proses Manajemen Mutu", "Integrasi Teknologi dalam Pendidikan"]
      }
    },
    {
      id: "exp4", icon: "design", period: "2010 — 2014",
      position: { en: "Graphic Designer", ar: "مصمم جرافيك", zh: "平面设计师", es: "Diseñador Gráfico", fr: "Graphiste", tr: "Grafik Tasarımcı", ko: "그래픽 디자이너", ja: "グラフィックデザイナー", id: "Desainer Grafis" },
      organization: { en: "Cairo, Egypt", ar: "القاهرة، مصر", zh: "埃及开罗", es: "El Cairo, Egipto", fr: "Le Caire, Égypte", tr: "Kahire, Mısır", ko: "이집트 카이로", ja: "エジプト・カイロ", id: "Kairo, Mesir" },
      location: { en: "Cairo, Egypt", ar: "القاهرة، مصر", zh: "埃及开罗", es: "El Cairo, Egipto", fr: "Le Caire, Égypte", tr: "Kahire, Mısır", ko: "이집트 카이로", ja: "エジプト・カイロ", id: "Kairo, Mesir" },
      summary: {
        en: "Designed promotional and broadcast visual content for clients in Cairo, Egypt — building a foundation in visual communication and digital media production later applied to educational content design.",
        ar: "تصميم محتوى بصريًا ترويجيًا وتلفزيونيًا لعملاء في القاهرة — مما أرسى أساسًا في التواصل البصري وإنتاج الوسائط الرقمية، طُبِّق لاحقًا في تصميم المحتوى التعليمي.",
        zh: "在埃及开罗为客户设计宣传及电视播出用视觉内容——为日后应用于教育内容设计的视觉传达与数字媒体制作能力奠定了基础。",
        es: "Diseñó contenido visual promocional y para emisión televisiva destinado a clientes en El Cairo, Egipto, sentando una base en comunicación visual y producción de medios digitales que aplicaría más tarde al diseño de contenido educativo.",
        fr: "A conçu du contenu visuel promotionnel et télévisuel pour des clients au Caire, en Égypte — posant les bases d'une expertise en communication visuelle et production de médias numériques, appliquée plus tard à la conception de contenus pédagogiques.",
        tr: "Mısır'ın Kahire kentinde müşteriler için tanıtım ve yayın amaçlı görsel içerikler tasarladı; bu deneyim, daha sonra eğitim içeriği tasarımına uygulanan görsel iletişim ve dijital medya üretimi konusunda bir temel oluşturdu.",
        ko: "이집트 카이로에서 고객을 위한 홍보 및 방송용 영상 콘텐츠를 디자인했으며, 이는 이후 교육 콘텐츠 디자인에 적용된 시각 커뮤니케이션 및 디지털 미디어 제작 역량의 토대가 되었습니다.",
        ja: "エジプト・カイロにて、クライアント向けの販促・放送用ビジュアルコンテンツを制作。後に教育コンテンツ設計へと応用されることになる、ビジュアルコミュニケーションとデジタルメディア制作の基礎を築いた。",
        id: "Merancang konten visual promosi dan siaran untuk klien di Kairo, Mesir — membangun fondasi dalam komunikasi visual dan produksi media digital yang kelak diterapkan pada desain konten pendidikan."
      },
      responsibilities: {
        en: ["Designing promotional materials for client campaigns.", "Creating visual content for print and broadcast use.", "Supporting media production projects from concept to delivery."],
        ar: ["تصميم مواد ترويجية لحملات العملاء.", "إنتاج محتوى بصري للطباعة والبث التلفزيوني.", "دعم مشاريع الإنتاج الإعلامي من الفكرة حتى التسليم."],
        zh: ["为客户宣传活动设计推广材料。", "制作用于印刷与电视播出的视觉内容。", "支持媒体制作项目从构思到交付的全过程。"],
        es: ["Diseño de materiales promocionales para campañas de clientes.", "Creación de contenido visual para uso impreso y televisivo.", "Apoyo a proyectos de producción de medios, desde el concepto hasta la entrega."],
        fr: ["Conception de supports promotionnels pour les campagnes clients.", "Création de contenus visuels pour l'impression et la diffusion télévisée.", "Accompagnement de projets de production média, du concept à la livraison."],
        tr: ["Müşteri kampanyaları için tanıtım materyalleri tasarlama.", "Baskı ve yayın kullanımı için görsel içerik oluşturma.", "Medya prodüksiyon projelerini konseptten teslimata kadar destekleme."],
        ko: ["고객 캠페인을 위한 홍보물 디자인.", "인쇄 및 방송용 시각 콘텐츠 제작.", "기획부터 완성까지 미디어 제작 프로젝트 지원."],
        ja: ["クライアントのキャンペーン向け販促物のデザイン。", "印刷・放送用ビジュアルコンテンツの制作。", "企画から納品までのメディア制作プロジェクトの支援。"],
        id: ["Merancang materi promosi untuk kampanye klien.", "Membuat konten visual untuk keperluan cetak dan siaran.", "Mendukung proyek produksi media dari konsep hingga penyelesaian."]
      },
      achievements: {
        en: ["Produced visual and broadcast content for a range of client campaigns.", "Developed a visual-communication foundation later applied to educational media."],
        ar: ["إنتاج محتوى بصري وتلفزيوني لمجموعة متنوعة من حملات العملاء.", "بناء أساس في التواصل البصري طُبِّق لاحقًا في الوسائط التعليمية."],
        zh: ["为多个客户宣传活动制作了视觉与电视内容。", "打造了后来应用于教育媒体的视觉传达基础。"],
        es: ["Produjo contenido visual y televisivo para diversas campañas de clientes.", "Desarrolló una base en comunicación visual aplicada posteriormente a medios educativos."],
        fr: ["A produit du contenu visuel et télévisuel pour diverses campagnes clients.", "A développé une base en communication visuelle appliquée par la suite aux médias éducatifs."],
        tr: ["Çeşitli müşteri kampanyaları için görsel ve yayın içeriği üretti.", "Daha sonra eğitim medyasına uygulanan bir görsel iletişim temeli geliştirdi."],
        ko: ["다양한 고객 캠페인을 위한 영상 및 방송 콘텐츠를 제작했습니다.", "이후 교육 미디어에 적용된 시각 커뮤니케이션 기반을 다졌습니다."],
        ja: ["さまざまなクライアントキャンペーン向けにビジュアル・放送コンテンツを制作した。", "後に教育メディアへと応用されるビジュアルコミュニケーションの基礎を築いた。"],
        id: ["Menghasilkan konten visual dan siaran untuk berbagai kampanye klien.", "Membangun fondasi komunikasi visual yang kemudian diterapkan pada media pendidikan."]
      },
      skills: {
        en: ["Visual Communication Design", "Digital Media Production", "Creative Project Delivery"],
        ar: ["تصميم التواصل البصري", "إنتاج الوسائط الرقمية", "تسليم المشاريع الإبداعية"],
        zh: ["视觉传达设计", "数字媒体制作", "创意项目交付"],
        es: ["Diseño de Comunicación Visual", "Producción de Medios Digitales", "Entrega de Proyectos Creativos"],
        fr: ["Conception de Communication Visuelle", "Production de Médias Numériques", "Livraison de Projets Créatifs"],
        tr: ["Görsel İletişim Tasarımı", "Dijital Medya Üretimi", "Yaratıcı Proje Teslimatı"],
        ko: ["시각 커뮤니케이션 디자인", "디지털 미디어 제작", "크리에이티브 프로젝트 완수"],
        ja: ["ビジュアルコミュニケーションデザイン", "デジタルメディア制作", "クリエイティブプロジェクトの遂行"],
        id: ["Desain Komunikasi Visual", "Produksi Media Digital", "Penyelesaian Proyek Kreatif"]
      }
    }
  ],

  // =======================================================================
  // Teaching methodology
  // =======================================================================
  methodology: {
    philosophy: {
      en: "Learning a language is not just memorizing words and rules — it is communication, confidence, cultural understanding, and a meaningful interactive experience.",
      ar: "تعلم اللغة ليس مجرد حفظ الكلمات والقواعد، بل هو تواصل وثقة وفهم ثقافي وتجربة تفاعلية ذات معنى.",
      zh: "学习一门语言不仅仅是记忆单词和语法规则，更是一种沟通、自信、文化理解，以及有意义的互动体验。",
      es: "Aprender un idioma no es solo memorizar palabras y reglas: es comunicación, confianza, comprensión cultural y una experiencia interactiva con sentido.",
      fr: "Apprendre une langue, ce n'est pas seulement mémoriser des mots et des règles — c'est de la communication, de la confiance, une compréhension culturelle et une expérience interactive porteuse de sens.",
      tr: "Bir dili öğrenmek yalnızca kelime ve kural ezberlemek değildir — iletişim, özgüven, kültürel anlayış ve anlamlı bir etkileşimli deneyimdir.",
      ko: "언어를 배운다는 것은 단어와 규칙을 암기하는 것이 아니라, 소통과 자신감, 문화적 이해, 그리고 의미 있는 상호작용 경험입니다.",
      ja: "言語を学ぶということは、単語や文法規則を暗記することではありません。それはコミュニケーションであり、自信であり、文化的理解であり、意味のある双方向的な体験です。",
      id: "Belajar bahasa bukan sekadar menghafal kata dan aturan — melainkan komunikasi, kepercayaan diri, pemahaman budaya, dan pengalaman interaktif yang bermakna."
    },
    items: [
      {
        id: "meth1", icon: "chat",
        name: { en: "Communicative Language Teaching", ar: "التعليم التواصلي", zh: "交际教学法", es: "Enseñanza Comunicativa de Idiomas", fr: "Approche Communicative", tr: "İletişimsel Dil Öğretimi", ko: "의사소통 중심 교수법", ja: "コミュニカティブ・アプローチ", id: "Pengajaran Bahasa Komunikatif" },
        description: {
          en: "Treating language as a tool for real communication, not rote rules.",
          ar: "التركيز على اللغة كأداة تواصل حقيقي لا كقواعد حفظ.",
          zh: "将语言视为真实沟通的工具，而非机械的规则。",
          es: "Tratar el idioma como una herramienta de comunicación real, no un conjunto de reglas memorizadas.",
          fr: "Considérer la langue comme un outil de communication réelle, et non comme un ensemble de règles à mémoriser.",
          tr: "Dili ezberlenen kurallar değil, gerçek iletişim aracı olarak ele alma.",
          ko: "언어를 암기해야 할 규칙이 아니라 실제 소통의 도구로 다룹니다.",
          ja: "言語を暗記すべき規則としてではなく、実際のコミュニケーションの手段として扱う。",
          id: "Memperlakukan bahasa sebagai alat komunikasi yang nyata, bukan sekadar aturan hafalan."
        }
      },
      {
        id: "meth2", icon: "student",
        name: { en: "Student-centered Learning", ar: "التعلم المتمحور حول الطالب", zh: "以学生为中心", es: "Aprendizaje Centrado en el Estudiante", fr: "Apprentissage Centré sur l'Apprenant", tr: "Öğrenci Merkezli Öğrenme", ko: "학습자 중심 학습", ja: "学習者中心の学び", id: "Pembelajaran Berpusat pada Pelajar" },
        description: {
          en: "Building each lesson around the individual learner's needs and goals.",
          ar: "تصميم الدرس حول احتياجات كل متعلم وأهدافه.",
          zh: "围绕每位学习者的需求与目标设计课程。",
          es: "Diseñar cada clase en torno a las necesidades y objetivos de cada estudiante.",
          fr: "Construire chaque cours autour des besoins et des objectifs propres à chaque apprenant.",
          tr: "Her dersi bireysel öğrencinin ihtiyaç ve hedefleri etrafında tasarlama.",
          ko: "각 학습자의 필요와 목표를 중심으로 수업을 구성합니다.",
          ja: "一人ひとりの学習者のニーズと目標を中心に授業を組み立てる。",
          id: "Merancang setiap pelajaran berdasarkan kebutuhan dan tujuan masing-masing pelajar."
        }
      },
      {
        id: "meth3", icon: "activity",
        name: { en: "Interactive Classroom Activities", ar: "أنشطة صفية تفاعلية", zh: "课堂互动活动", es: "Actividades Interactivas en el Aula", fr: "Activités Interactives en Classe", tr: "Etkileşimli Sınıf Etkinlikleri", ko: "상호작용형 교실 활동", ja: "双方向型の授業活動", id: "Aktivitas Kelas Interaktif" },
        description: {
          en: "Practical exercises that reinforce real understanding and use.",
          ar: "تمارين ومواقف عملية تعزز الفهم والاستخدام الفعلي.",
          zh: "通过实践练习强化真正的理解与运用。",
          es: "Ejercicios prácticos que refuerzan la comprensión y el uso real del idioma.",
          fr: "Des exercices pratiques qui renforcent la compréhension et l'usage réel de la langue.",
          tr: "Gerçek anlayışı ve kullanımı pekiştiren pratik alıştırmalar.",
          ko: "실제 이해와 활용을 강화하는 실습형 연습.",
          ja: "実際の理解と運用を強化する実践的な練習。",
          id: "Latihan praktis yang memperkuat pemahaman dan penggunaan bahasa yang sesungguhnya."
        }
      },
      {
        id: "meth4", icon: "mic",
        name: { en: "Speaking-focused Practice", ar: "التركيز على المحادثة", zh: "注重口语训练", es: "Práctica Centrada en la Expresión Oral", fr: "Pratique Axée sur l'Oral", tr: "Konuşmaya Odaklı Pratik", ko: "말하기 중심 연습", ja: "スピーキング重視の練習", id: "Latihan Berfokus pada Berbicara" },
        description: {
          en: "Building confidence to speak Arabic from the very first lessons.",
          ar: "بناء الثقة في التحدث بالعربية منذ الدروس الأولى.",
          zh: "从第一堂课开始建立说阿拉伯语的自信。",
          es: "Generar confianza para hablar árabe desde las primeras clases.",
          fr: "Développer la confiance pour parler arabe dès les premiers cours.",
          tr: "İlk derslerden itibaren Arapça konuşma özgüveni oluşturma.",
          ko: "첫 수업부터 아랍어로 말하는 자신감을 키웁니다.",
          ja: "最初の授業からアラビア語を話す自信を育てる。",
          id: "Membangun kepercayaan diri berbicara bahasa Arab sejak pelajaran pertama."
        }
      },
      {
        id: "meth5", icon: "tech",
        name: { en: "Technology-enhanced Learning", ar: "تعلم مدعوم بالتكنولوجيا", zh: "科技赋能学习", es: "Aprendizaje Potenciado por la Tecnología", fr: "Apprentissage Assisté par la Technologie", tr: "Teknoloji Destekli Öğrenme", ko: "기술 접목 학습", ja: "テクノロジーを活用した学習", id: "Pembelajaran Berbasis Teknologi" },
        description: {
          en: "Using digital tools to enrich the learning experience.",
          ar: "استخدام أدوات رقمية لإثراء تجربة التعلم.",
          zh: "运用数字工具丰富学习体验。",
          es: "Uso de herramientas digitales para enriquecer la experiencia de aprendizaje.",
          fr: "Utilisation d'outils numériques pour enrichir l'expérience d'apprentissage.",
          tr: "Öğrenme deneyimini zenginleştirmek için dijital araçlar kullanma.",
          ko: "디지털 도구를 활용해 학습 경험을 풍부하게 합니다.",
          ja: "デジタルツールを用いて学習体験を豊かにする。",
          id: "Menggunakan alat digital untuk memperkaya pengalaman belajar."
        }
      }
    ]
  },

  // =======================================================================
  // Educational innovation
  // =======================================================================
  innovation: {
    description: {
      en: "Combining Arabic language pedagogy with technology to create modern learning experiences.",
      ar: "الجمع بين علم تدريس اللغة العربية والتكنولوجيا لبناء تجارب تعلم حديثة.",
      zh: "将阿拉伯语教学法与科技相结合，打造现代化的学习体验。",
      es: "Combinar la pedagogía de la lengua árabe con la tecnología para crear experiencias de aprendizaje modernas.",
      fr: "Associer la pédagogie de la langue arabe à la technologie pour créer des expériences d'apprentissage modernes.",
      tr: "Modern öğrenme deneyimleri oluşturmak için Arapça dil pedagojisini teknoloji ile birleştirme.",
      ko: "아랍어 교수법과 기술을 결합하여 현대적인 학습 경험을 만듭니다.",
      ja: "アラビア語教授法とテクノロジーを組み合わせ、現代的な学習体験を創出する。",
      id: "Memadukan pedagogi bahasa Arab dengan teknologi untuk menciptakan pengalaman belajar modern."
    },
    areas: [
      { id: "inn1", icon: "layout", name: { en: "Interactive Learning Design", ar: "تصميم التعلم التفاعلي", zh: "互动学习设计", es: "Diseño de Aprendizaje Interactivo", fr: "Conception d'Apprentissage Interactif", tr: "Etkileşimli Öğrenme Tasarımı", ko: "상호작용형 학습 설계", ja: "双方向型学習デザイン", id: "Desain Pembelajaran Interaktif" } },
      { id: "inn2", icon: "digital", name: { en: "Digital Lesson Systems", ar: "أنظمة الدروس الرقمية", zh: "数字化课程系统", es: "Sistemas de Lecciones Digitales", fr: "Systèmes de Cours Numériques", tr: "Dijital Ders Sistemleri", ko: "디지털 수업 시스템", ja: "デジタル授業システム", id: "Sistem Pelajaran Digital" } },
      { id: "inn3", icon: "classroom", name: { en: "Classroom Technology", ar: "تكنولوجيا الفصل الدراسي", zh: "课堂科技应用", es: "Tecnología en el Aula", fr: "Technologie en Classe", tr: "Sınıf Teknolojisi", ko: "교실 기술", ja: "教室テクノロジー", id: "Teknologi Kelas" } },
      { id: "inn4", icon: "app", name: { en: "Language Learning Applications", ar: "تطبيقات تعلم اللغة", zh: "语言学习应用程序", es: "Aplicaciones de Aprendizaje de Idiomas", fr: "Applications d'Apprentissage des Langues", tr: "Dil Öğrenme Uygulamaları", ko: "언어 학습 애플리케이션", ja: "言語学習アプリケーション", id: "Aplikasi Pembelajaran Bahasa" } }
    ]
  },

  // =======================================================================
  // Flagship project
  // =======================================================================
  project: {
    id: "project1", icon: "spark",
    name: {
      en: "Interactive Arabic Learning System", ar: "نظام تعلم العربية التفاعلي", zh: "阿拉伯语互动学习系统",
      es: "Sistema Interactivo de Aprendizaje de Árabe", fr: "Système Interactif d'Apprentissage de l'Arabe",
      tr: "Etkileşimli Arapça Öğrenme Sistemi", ko: "인터랙티브 아랍어 학습 시스템",
      ja: "インタラクティブ・アラビア語学習システム", id: "Sistem Pembelajaran Bahasa Arab Interaktif"
    },
    description: {
      en: "A digital learning system designed to transform Arabic language acquisition through interactive lessons, speaking practice, modern classroom techniques, and evolving teaching methods — built for learners of every nationality.",
      ar: "نظام تعليمي رقمي مصمم لتحويل تعلم اللغة العربية من خلال الدروس التفاعلية، وأنشطة التحدث، وتقنيات الصف الحديثة، وأساليب التعليم المتطورة — موجّه للمتعلمين من مختلف الجنسيات.",
      zh: "一套数字化学习系统，通过互动课程、口语练习、现代课堂技术与不断演进的教学方法，革新阿拉伯语学习方式——面向来自各国的学习者。",
      es: "Un sistema de aprendizaje digital diseñado para transformar la adquisición del árabe mediante lecciones interactivas, práctica oral, técnicas modernas de aula y métodos de enseñanza en evolución, pensado para estudiantes de cualquier nacionalidad.",
      fr: "Un système d'apprentissage numérique conçu pour transformer l'acquisition de l'arabe grâce à des cours interactifs, une pratique orale, des techniques de classe modernes et des méthodes d'enseignement évolutives — pensé pour des apprenants de toutes nationalités.",
      tr: "Etkileşimli dersler, konuşma pratiği, modern sınıf teknikleri ve gelişen öğretim yöntemleriyle Arapça dil edinimini dönüştürmek için tasarlanmış, her milliyetten öğrenci için geliştirilmiş dijital bir öğrenme sistemi.",
      ko: "상호작용형 수업, 말하기 연습, 현대적인 교실 기법, 그리고 발전하는 교수법을 통해 아랍어 습득 방식을 혁신하기 위해 설계된 디지털 학습 시스템으로, 모든 국적의 학습자를 위해 만들어졌습니다.",
      ja: "双方向型のレッスン、スピーキング練習、現代的な教室技法、進化し続ける教授法を通じてアラビア語習得のあり方を変えることを目指して設計されたデジタル学習システムで、あらゆる国籍の学習者のために構築されています。",
      id: "Sistem pembelajaran digital yang dirancang untuk mengubah cara pemerolehan bahasa Arab melalui pelajaran interaktif, latihan berbicara, teknik kelas modern, dan metode pengajaran yang terus berkembang — dibangun untuk pelajar dari segala kebangsaan."
    },
    features: {
      en: ["Interactive video lessons", "Speaking practice activities", "Progress tracking", "Culturally relevant content"],
      ar: ["دروس فيديو تفاعلية", "أنشطة تدريب على المحادثة", "متابعة التقدم", "محتوى مراعٍ للتنوع الثقافي"],
      zh: ["互动视频课程", "口语练习活动", "学习进度跟踪", "贴合文化背景的内容"],
      es: ["Lecciones en vídeo interactivas", "Actividades de práctica oral", "Seguimiento del progreso", "Contenido culturalmente relevante"],
      fr: ["Cours vidéo interactifs", "Activités de pratique orale", "Suivi de la progression", "Contenu culturellement pertinent"],
      tr: ["Etkileşimli video dersler", "Konuşma pratiği etkinlikleri", "İlerleme takibi", "Kültürel açıdan uygun içerik"],
      ko: ["인터랙티브 영상 수업", "말하기 연습 활동", "학습 진도 추적", "문화적으로 적합한 콘텐츠"],
      ja: ["双方向型動画レッスン", "スピーキング練習アクティビティ", "学習進捗の記録", "文化的に配慮されたコンテンツ"],
      id: ["Pelajaran video interaktif", "Aktivitas latihan berbicara", "Pelacakan kemajuan belajar", "Konten yang relevan secara budaya"]
    },
    technologies: {
      en: ["Interactive Learning", "Educational Technology", "Arabic Language"],
      ar: ["التعلم التفاعلي", "تكنولوجيا التعليم", "اللغة العربية"],
      zh: ["互动学习", "教育科技", "阿拉伯语"],
      es: ["Aprendizaje Interactivo", "Tecnología Educativa", "Lengua Árabe"],
      fr: ["Apprentissage Interactif", "Technologie Éducative", "Langue Arabe"],
      tr: ["Etkileşimli Öğrenme", "Eğitim Teknolojisi", "Arapça Dili"],
      ko: ["인터랙티브 학습", "교육 기술", "아랍어"],
      ja: ["双方向型学習", "教育テクノロジー", "アラビア語"],
      id: ["Pembelajaran Interaktif", "Teknologi Pendidikan", "Bahasa Arab"]
    },
    status: {
      en: "Actively developed and used with students", ar: "قيد التطوير المستمر ومستخدم فعليًا مع الطلاب",
      zh: "持续开发中，并已实际应用于学生教学", es: "En desarrollo activo y en uso con estudiantes",
      fr: "En développement actif et utilisé avec les étudiants", tr: "Aktif olarak geliştiriliyor ve öğrencilerle kullanılıyor",
      ko: "지속적으로 개발 중이며 실제 학생들과 함께 사용 중", ja: "現在も開発が続けられており、実際の学生と共に活用されています",
      id: "Terus dikembangkan secara aktif dan digunakan bersama para pelajar"
    }
  },

  // =======================================================================
  // Skills
  // =======================================================================
  skills: [
    { id: "skill1", icon: "language", name: { en: "Arabic Language Teaching", ar: "تعليم اللغة العربية", zh: "阿拉伯语教学", es: "Enseñanza de la Lengua Árabe", fr: "Enseignement de la Langue Arabe", tr: "Arapça Dil Öğretimi", ko: "아랍어 교육", ja: "アラビア語教育", id: "Pengajaran Bahasa Arab" } },
    { id: "skill2", icon: "globe", name: { en: "Teaching Arabic as a Foreign Language", ar: "تعليم العربية كلغة أجنبية", zh: "阿拉伯语作为外语教学", es: "Enseñanza del Árabe como Lengua Extranjera", fr: "Enseignement de l'Arabe Langue Étrangère", tr: "Yabancı Dil Olarak Arapça Öğretimi", ko: "외국어로서의 아랍어 교육", ja: "外国語としてのアラビア語指導", id: "Pengajaran Bahasa Arab sebagai Bahasa Asing" } },
    { id: "skill3", icon: "method", name: { en: "Non-native Speaker Methodology", ar: "منهجية تعليم الناطقين بغير العربية", zh: "非母语者教学法", es: "Metodología para Hablantes No Nativos", fr: "Méthodologie pour Locuteurs Non Natifs", tr: "Ana Dili Arapça Olmayanlar İçin Metodoloji", ko: "비원어민 학습자 교수법", ja: "非母語話者向け指導法", id: "Metodologi untuk Penutur Non-Native" } },
    { id: "skill4", icon: "curriculum", name: { en: "Curriculum Design", ar: "تصميم المناهج", zh: "课程设计", es: "Diseño Curricular", fr: "Conception de Programmes", tr: "Müfredat Tasarımı", ko: "교육과정 설계", ja: "カリキュラムデザイン", id: "Desain Kurikulum" } },
    { id: "skill5", icon: "classroom", name: { en: "Classroom Management", ar: "إدارة الصف", zh: "课堂管理", es: "Gestión del Aula", fr: "Gestion de Classe", tr: "Sınıf Yönetimi", ko: "교실 관리", ja: "クラスマネジメント", id: "Manajemen Kelas" } },
    { id: "skill6", icon: "tech", name: { en: "Educational Technology", ar: "تكنولوجيا التعليم", zh: "教育科技", es: "Tecnología Educativa", fr: "Technologie Éducative", tr: "Eğitim Teknolojisi", ko: "교육 기술", ja: "教育テクノロジー", id: "Teknologi Pendidikan" } },
    { id: "skill7", icon: "interactive", name: { en: "Interactive Learning Design", ar: "تصميم التعلم التفاعلي", zh: "互动学习设计", es: "Diseño de Aprendizaje Interactivo", fr: "Conception d'Apprentissage Interactif", tr: "Etkileşimli Öğrenme Tasarımı", ko: "상호작용형 학습 설계", ja: "双方向型学習デザイン", id: "Desain Pembelajaran Interaktif" } },
    { id: "skill8", icon: "communication", name: { en: "Communication Skills", ar: "مهارات التواصل", zh: "沟通能力", es: "Habilidades de Comunicación", fr: "Compétences en Communication", tr: "İletişim Becerileri", ko: "커뮤니케이션 능력", ja: "コミュニケーション能力", id: "Keterampilan Komunikasi" } },
    { id: "skill9", icon: "solve", name: { en: "Problem Solving", ar: "حل المشكلات", zh: "问题解决能力", es: "Resolución de Problemas", fr: "Résolution de Problèmes", tr: "Problem Çözme", ko: "문제 해결 능력", ja: "問題解決能力", id: "Pemecahan Masalah" } },
    { id: "skill10", icon: "content", name: { en: "Digital Content Creation", ar: "صناعة المحتوى الرقمي", zh: "数字内容制作", es: "Creación de Contenido Digital", fr: "Création de Contenu Numérique", tr: "Dijital İçerik Üretimi", ko: "디지털 콘텐츠 제작", ja: "デジタルコンテンツ制作", id: "Pembuatan Konten Digital" } }
  ],

  // =======================================================================
  // Education — institution names and years are official/plain.
  // "location" and "description" are translated for readability.
  // =======================================================================
  education: [
    {
      id: "edu2", year: "2021",
      institution: { en: "Arabic Institute for Studies", ar: "المعهد العربي للدراسات", zh: "Arabic Institute for Studies", es: "Arabic Institute for Studies", fr: "Arabic Institute for Studies", tr: "Arabic Institute for Studies", ko: "Arabic Institute for Studies", ja: "Arabic Institute for Studies", id: "Arabic Institute for Studies" },
      location: { en: "Egypt", ar: "مصر", zh: "埃及", es: "Egipto", fr: "Égypte", tr: "Mısır", ko: "이집트", ja: "エジプト", id: "Mesir" },
      degree: { en: "Diploma in Arabic Language for Non-Native Speakers", ar: "دبلومة تعليم اللغة العربية للناطقين بغيرها", zh: "非母语者阿拉伯语教学文凭", es: "Diplomado en Lengua Árabe para No Nativos", fr: "Diplôme d'Arabe pour Locuteurs Non Natifs", tr: "Ana Dili Arapça Olmayanlar için Arapça Dili Diploması", ko: "비원어민을 위한 아랍어 디플로마", ja: "非母語話者向けアラビア語ディプロマ", id: "Diploma Bahasa Arab untuk Penutur Non-Native" },
      description: {
        en: "Specialized training in teaching methodology for non-native Arabic learners.",
        ar: "تدريب متخصص في منهجية تدريس العربية للمتعلمين غير الناطقين بها.",
        zh: "针对非母语阿拉伯语学习者教学法的专业培训。",
        es: "Formación especializada en metodología de enseñanza para estudiantes de árabe no nativos.",
        fr: "Formation spécialisée en méthodologie d'enseignement pour apprenants non natifs de l'arabe.",
        tr: "Ana dili Arapça olmayan öğrenciler için öğretim metodolojisinde uzmanlaşmış eğitim.",
        ko: "비원어민 아랍어 학습자를 위한 교수법 전문 교육.",
        ja: "非母語話者のアラビア語学習者向け指導法に特化した専門教育。",
        id: "Pelatihan khusus dalam metodologi pengajaran untuk pelajar bahasa Arab non-native."
      }
    },
    {
      id: "edu3", year: "2021",
      institution: { en: "Arabic Institute for Studies", ar: "المعهد العربي للدراسات", zh: "Arabic Institute for Studies", es: "Arabic Institute for Studies", fr: "Arabic Institute for Studies", tr: "Arabic Institute for Studies", ko: "Arabic Institute for Studies", ja: "Arabic Institute for Studies", id: "Arabic Institute for Studies" },
      location: { en: "Egypt", ar: "مصر", zh: "埃及", es: "Egipto", fr: "Égypte", tr: "Mısır", ko: "이집트", ja: "エジプト", id: "Mesir" },
      degree: { en: "Mini Master in Teaching Arabic Language for Non-Native Speakers", ar: "ماجستير مصغر في تعليم اللغة العربية للناطقين بغيرها", zh: "非母语者阿拉伯语教学 Mini Master 学位", es: "Mini Máster en Enseñanza de Árabe para No Nativos", fr: "Mini Master en Enseignement de l'Arabe pour Non Natifs", tr: "Ana Dili Arapça Olmayanlar için Arapça Öğretimi Mini Yüksek Lisans", ko: "비원어민을 위한 아랍어 교육 미니 석사", ja: "非母語話者向けアラビア語教育 ミニマスター", id: "Mini Master Pengajaran Bahasa Arab untuk Non-Native" },
      description: {
        en: "Advanced professional qualification in Arabic language pedagogy.",
        ar: "مؤهل مهني متقدم في تدريس اللغة العربية.",
        zh: "阿拉伯语教学法方面的高级专业资格。",
        es: "Cualificación profesional avanzada en pedagogía de la lengua árabe.",
        fr: "Qualification professionnelle avancée en pédagogie de la langue arabe.",
        tr: "Arapça dil pedagojisinde ileri düzey mesleki yeterlilik.",
        ko: "아랍어 교수법 분야의 고급 전문 자격.",
        ja: "アラビア語教授法における上級専門資格。",
        id: "Kualifikasi profesional lanjutan dalam pedagogi bahasa Arab."
      }
    },
    {
      id: "edu5", year: "2017",
      institution: { en: "New York (Online)", ar: "نيويورك (عن بُعد)", zh: "New York (Online)", es: "New York (Online)", fr: "New York (Online)", tr: "New York (Online)", ko: "New York (Online)", ja: "New York (Online)", id: "New York (Online)" },
      location: { en: "United States", ar: "الولايات المتحدة", zh: "美国", es: "Estados Unidos", fr: "États-Unis", tr: "Amerika Birleşik Devletleri", ko: "미국", ja: "アメリカ合衆国", id: "Amerika Serikat" },
      degree: { en: "MBA, Business Administration", ar: "MBA في إدارة الأعمال", zh: "工商管理 MBA", es: "MBA en Administración de Empresas", fr: "MBA en Administration des Affaires", tr: "İşletme Yönetimi MBA", ko: "MBA (경영학)", ja: "経営管理 MBA", id: "MBA Administrasi Bisnis" },
      description: { en: "", ar: "", zh: "", es: "", fr: "", tr: "", ko: "", ja: "", id: "" }
    },
    {
      id: "edu4", year: "2017",
      institution: { en: "Cambridge Training College", ar: "كلية كامبريدج للتدريب", zh: "Cambridge Training College", es: "Cambridge Training College", fr: "Cambridge Training College", tr: "Cambridge Training College", ko: "Cambridge Training College", ja: "Cambridge Training College", id: "Cambridge Training College" },
      location: { en: "United Kingdom", ar: "المملكة المتحدة", zh: "英国", es: "Reino Unido", fr: "Royaume-Uni", tr: "Birleşik Krallık", ko: "영국", ja: "イギリス", id: "Britania Raya" },
      degree: { en: "Advanced Training Diploma in Business Administration", ar: "دبلومة متقدمة في إدارة الأعمال", zh: "工商管理高级培训文凭", es: "Diplomado Avanzado en Administración de Empresas", fr: "Diplôme Avancé en Administration des Affaires", tr: "İşletme Yönetiminde İleri Eğitim Diploması", ko: "경영학 고급 연수 디플로마", ja: "経営管理上級研修ディプロマ", id: "Diploma Pelatihan Lanjutan Administrasi Bisnis" },
      description: { en: "", ar: "", zh: "", es: "", fr: "", tr: "", ko: "", ja: "", id: "" }
    },
    {
      id: "edu1", year: "2013",
      institution: { en: "Beni Suef University", ar: "جامعة بني سويف", zh: "Beni Suef University", es: "Beni Suef University", fr: "Beni Suef University", tr: "Beni Suef University", ko: "Beni Suef University", ja: "Beni Suef University", id: "Beni Suef University" },
      location: { en: "Egypt", ar: "مصر", zh: "埃及", es: "Egipto", fr: "Égypte", tr: "Mısır", ko: "이집트", ja: "エジプト", id: "Mesir" },
      degree: { en: "Bachelor of Industrial Education", ar: "بكالوريوس التعليم الصناعي", zh: "工业教育学学士学位", es: "Licenciatura en Educación Industrial", fr: "Licence en Éducation Industrielle", tr: "Endüstriyel Eğitim Lisans Derecesi", ko: "산업교육학 학사", ja: "産業教育学 学士", id: "Sarjana Pendidikan Industri" },
      description: { en: "", ar: "", zh: "", es: "", fr: "", tr: "", ko: "", ja: "", id: "" }
    }
  ],

  // =======================================================================
  // Certifications — same underlying qualifications as Education,
  // presented as highlight cards. Institution names kept official/plain.
  // =======================================================================
  certifications: [
    {
      id: "cert1", year: "2021",
      institution: { en: "Arabic Institute for Studies", ar: "المعهد العربي للدراسات", zh: "Arabic Institute for Studies", es: "Arabic Institute for Studies", fr: "Arabic Institute for Studies", tr: "Arabic Institute for Studies", ko: "Arabic Institute for Studies", ja: "Arabic Institute for Studies", id: "Arabic Institute for Studies" },
      name: { en: "Diploma in Arabic Language for Non-Native Speakers", ar: "دبلومة تعليم اللغة العربية للناطقين بغيرها", zh: "非母语者阿拉伯语教学文凭", es: "Diplomado en Lengua Árabe para No Nativos", fr: "Diplôme d'Arabe pour Locuteurs Non Natifs", tr: "Ana Dili Arapça Olmayanlar için Arapça Dili Diploması", ko: "비원어민을 위한 아랍어 디플로마", ja: "非母語話者向けアラビア語ディプロマ", id: "Diploma Bahasa Arab untuk Penutur Non-Native" },
      description: {
        en: "Specialized training in teaching methodology for non-native Arabic learners.",
        ar: "تدريب متخصص في منهجية تدريس العربية للمتعلمين غير الناطقين بها.",
        zh: "针对非母语阿拉伯语学习者教学法的专业培训。",
        es: "Formación especializada en metodología de enseñanza para estudiantes de árabe no nativos.",
        fr: "Formation spécialisée en méthodologie d'enseignement pour apprenants non natifs de l'arabe.",
        tr: "Ana dili Arapça olmayan öğrenciler için öğretim metodolojisinde uzmanlaşmış eğitim.",
        ko: "비원어민 아랍어 학습자를 위한 교수법 전문 교육.",
        ja: "非母語話者のアラビア語学習者向け指導法に特化した専門教育。",
        id: "Pelatihan khusus dalam metodologi pengajaran untuk pelajar bahasa Arab non-native."
      }
    },
    {
      id: "cert2", year: "2021",
      institution: { en: "Arabic Institute for Studies", ar: "المعهد العربي للدراسات", zh: "Arabic Institute for Studies", es: "Arabic Institute for Studies", fr: "Arabic Institute for Studies", tr: "Arabic Institute for Studies", ko: "Arabic Institute for Studies", ja: "Arabic Institute for Studies", id: "Arabic Institute for Studies" },
      name: { en: "Mini Master in Teaching Arabic Language for Non-Native Speakers", ar: "ماجستير مصغر في تعليم اللغة العربية للناطقين بغيرها", zh: "非母语者阿拉伯语教学 Mini Master 学位", es: "Mini Máster en Enseñanza de Árabe para No Nativos", fr: "Mini Master en Enseignement de l'Arabe pour Non Natifs", tr: "Ana Dili Arapça Olmayanlar için Arapça Öğretimi Mini Yüksek Lisans", ko: "비원어민을 위한 아랍어 교육 미니 석사", ja: "非母語話者向けアラビア語教育 ミニマスター", id: "Mini Master Pengajaran Bahasa Arab untuk Non-Native" },
      description: {
        en: "Advanced professional qualification in Arabic language pedagogy.",
        ar: "مؤهل مهني متقدم في تدريس اللغة العربية.",
        zh: "阿拉伯语教学法方面的高级专业资格。",
        es: "Cualificación profesional avanzada en pedagogía de la lengua árabe.",
        fr: "Qualification professionnelle avancée en pédagogie de la langue arabe.",
        tr: "Arapça dil pedagojisinde ileri düzey mesleki yeterlilik.",
        ko: "아랍어 교수법 분야의 고급 전문 자격.",
        ja: "アラビア語教授法における上級専門資格。",
        id: "Kualifikasi profesional lanjutan dalam pedagogi bahasa Arab."
      }
    },
    {
      id: "cert3", year: "2017",
      institution: { en: "New York (Online)", ar: "نيويورك (عن بُعد)", zh: "New York (Online)", es: "New York (Online)", fr: "New York (Online)", tr: "New York (Online)", ko: "New York (Online)", ja: "New York (Online)", id: "New York (Online)" },
      name: { en: "MBA, Business Administration", ar: "MBA في إدارة الأعمال", zh: "工商管理 MBA", es: "MBA en Administración de Empresas", fr: "MBA en Administration des Affaires", tr: "İşletme Yönetimi MBA", ko: "MBA (경영학)", ja: "経営管理 MBA", id: "MBA Administrasi Bisnis" },
      description: { en: "", ar: "", zh: "", es: "", fr: "", tr: "", ko: "", ja: "", id: "" }
    },
    {
      id: "cert4", year: "2017",
      institution: { en: "Cambridge Training College, UK", ar: "كلية كامبريدج للتدريب، المملكة المتحدة", zh: "Cambridge Training College, UK", es: "Cambridge Training College, UK", fr: "Cambridge Training College, UK", tr: "Cambridge Training College, UK", ko: "Cambridge Training College, UK", ja: "Cambridge Training College, UK", id: "Cambridge Training College, UK" },
      name: { en: "Advanced Training Diploma in Business Administration", ar: "دبلومة متقدمة في إدارة الأعمال", zh: "工商管理高级培训文凭", es: "Diplomado Avanzado en Administración de Empresas", fr: "Diplôme Avancé en Administration des Affaires", tr: "İşletme Yönetiminde İleri Eğitim Diploması", ko: "경영학 고급 연수 디플로마", ja: "経営管理上級研修ディプロマ", id: "Diploma Pelatihan Lanjutan Administrasi Bisnis" },
      description: { en: "", ar: "", zh: "", es: "", fr: "", tr: "", ko: "", ja: "", id: "" }
    }
  ],

  // =======================================================================
  // Contact — email/phone/social/availability stay plain (see "personal").
  // Only the personalized invitation message is translated.
  // =======================================================================
  contact: {
    description: {
      en: "Interested in academic collaboration, teaching opportunities, or educational content development? I'd love to hear from you.",
      ar: "مهتم بالتعاون الأكاديمي أو التدريس أو تطوير محتوى تعليمي؟ يسعدني التواصل.",
      zh: "对学术合作、教学机会或教育内容开发感兴趣？欢迎与我联系。",
      es: "¿Interesado en colaboración académica, oportunidades de enseñanza o desarrollo de contenido educativo? Me encantaría saber de ti.",
      fr: "Intéressé par une collaboration académique, une opportunité d'enseignement ou le développement de contenu pédagogique ? N'hésitez pas à me contacter.",
      tr: "Akademik iş birliği, öğretmenlik fırsatları veya eğitim içeriği geliştirme konularıyla mı ilgileniyorsunuz? Sizden haber almaktan mutluluk duyarım.",
      ko: "학술 협력, 강의 기회, 또는 교육 콘텐츠 개발에 관심이 있으신가요? 언제든 연락 주시면 감사하겠습니다.",
      ja: "学術的な協力、指導の機会、教育コンテンツ開発などにご関心がございましたら、ぜひご連絡ください。",
      id: "Tertarik dengan kolaborasi akademik, peluang mengajar, atau pengembangan konten pendidikan? Saya senang mendengar kabar dari Anda."
    },
    availability: "open" // "open" | "limited" | "closed" — label text lives in UI_TRANSLATIONS.status
  },

  // =======================================================================
  // Footer
  // =======================================================================
  footer: {
    tagline: {
      en: "International Arabic language educator — bridging teaching, culture, and technology.",
      ar: "مدرس لغة عربية دولي — يجمع بين التعليم والثقافة والتكنولوجيا.",
      zh: "国际阿拉伯语教育专家 — 融合教学、文化与科技。",
      es: "Educador internacional de lengua árabe — uniendo enseñanza, cultura y tecnología.",
      fr: "Enseignant international de langue arabe — à la croisée de l'enseignement, de la culture et de la technologie.",
      tr: "Uluslararası Arapça dil eğitmeni — öğretimi, kültürü ve teknolojiyi bir araya getiriyor.",
      ko: "국제 아랍어 교육 전문가 — 교육과 문화, 기술을 잇습니다.",
      ja: "国際アラビア語教育者 — 教育・文化・テクノロジーをつなぐ。",
      id: "Pendidik bahasa Arab internasional — menjembatani pengajaran, budaya, dan teknologi."
    }
  },

  // Reserved for future expansion — populate without touching any code.
  testimonials: [],
  publications: [],
  courses: [],
  researchInterests: [],
  speakingEngagements: [],
  blogArticles: [],
  videos: []
};
