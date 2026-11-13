import { Product } from '../types';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'finilya',
    name: 'Finilya',
    tagline: 'Yangi avlod aqlli moliya va sarmoyalar operatsion tizimi',
    category: 'fintech',
    categoryLabel: 'FinTex va Moliya',
    badge: 'Flagman',
    description: 'Shaxsiy va korporativ byudjet, ko\'p valyutali kassa boshqaruvi, avtomatlashtirilgan P&L hisoboti va AI xarajatlar tahlili platformasi.',
    longDescription: 'Finilya — shaxsiy kapitallarni ko\'paytirish va korxona pul oqimlarini (Cash Flow) real vaqt rejimida boshqarish imkonini beruvchi to\'liq moliyaviy ekotizim. U murakkab buxgalteriya jadvallarini sodda, vizual va sun\'iy intellekt bilan qurollangan intuitiv interfeysga aylantiradi.',
    iconName: 'Wallet',
    color: 'from-emerald-500 to-teal-700',
    accentBg: 'rgba(16, 185, 129, 0.1)',
    features: [
      'Multi-valyuta va kassa hisobi (UZS, USD, EUR, RUB, AED)',
      'AI asosida sarf-xarajatlarni avtomatik toifalashtirish va bashoratlash',
      'Kompaniyalar uchun real vaqt rejimida P&L (daromad/zarar) va pul oqimi hisoboti',
      'Telegram bot orqali 2 soniyada xarajat va tushumlarni kiritish',
      'Kategoriya byudjeti cheklovlari va limit buzilishi haqida xabarnomalar',
      'Oila a\'zolari va jamoa uchun ko\'p foydalanuvchili kirish huquqlari',
      'Bank darajasidagi 256-bitli AES shifrlash va xavfsiz zaxira nusxalash'
    ],
    specs: [
      { label: 'Platforma', value: 'Web, iOS, Android, Telegram Bot' },
      { label: 'Versiya', value: 'v24.14 (Next-gen)' },
      { label: 'Xavfsizlik', value: 'AES-256 GCM, End-to-End' },
      { label: 'Valyutalar', value: '25+ xalqaro valyutalar' },
      { label: 'API & Webhooks', value: 'REST, GraphQL, Webhooks qo\'llab-quvvatlanadi' }
    ],
    targetAudience: 'Frilanserlar, Xususiy investorlar, Kichik va o\'rta biznes egalari, Moliya direktorlari',
    demoMetrics: [
      { label: 'O\'rtacha tejalgan vaqt', value: '18 soat/oy' },
      { label: 'Xarajatlarni qisqartirish', value: '24%' },
      { label: 'Faol foydalanuvchilar', value: '45,000+' }
    ],
    status: 'Faol',
    linkUrl: 'https://finilya.uz',
    docsSlug: 'finilya-api',
    screenshots: [
      {
        title: 'Boshqaruv Paneli (Dashboard)',
        desc: 'Barcha kassa va hisobvaraqlardagi umumiy qoldiq, oylik dinamika va valyuta kurslari.',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80'
      },
      {
        title: 'P&L va Cash Flow Tahlili',
        desc: 'Kompaniyaning operatsion rentabelligi va oylar kesimidagi sof foyda hisoboti.',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    plans: [
      {
        name: 'Starter',
        price: 'Bepul',
        period: 'abadiy',
        description: 'Shaxsiy byudjet va kundalik xarajatlarni hisobga olish uchun',
        features: [
          '3 tagacha hamyon / kassa',
          'Cheksiz tranzaksiyalar kiritish',
          'Asosiy kategoriyalar tahlili',
          'Telegram bot integratsiyasi',
          'Eksport: Excel & CSV'
        ]
      },
      {
        name: 'Pro Moliya',
        price: '49,000 UZS',
        period: 'oyiga',
        badge: 'Tavsiya etiladi',
        highlight: true,
        description: 'Frilanserlar va individual tadbirkorlar uchun to\'liq tahliliy paket',
        features: [
          'Cheksiz hamyonlar va ko\'p valyutalilik',
          'AI Moliyaviy Maslahatchi va bashoratlar',
          'Toifalar bo\'yicha qat\'iy byudjet limitlari',
          'Qarzlar va majburiyatlar monitoringi',
          '24/7 tezkor qo\'llab-quvvatlash'
        ]
      },
      {
        name: 'Business & Team',
        price: '290,000 UZS',
        period: 'oyiga',
        description: 'Kompaniyalar, korporativ kassa va jamoaviy boshqaruv uchun',
        features: [
          '10 tagacha jamoa a\'zosi va rollar',
          'Avtomatik P&L va Cash Flow hisobotlari',
          'Bank schyotlari bilan integratsiya',
          'Fentoph Cloud API kalitlari',
          'Maxsus hisobchi menejer'
        ]
      }
    ],
    faqs: [
      {
        q: 'Finilya orqali real bank hisoblarini ulash mumkinmi?',
        a: 'Ha, Finilya Fentoph ID xavfsiz protokoli orqali bank ko\'chirmalarini (Open Banking) xavfsiz yuklash va integratsiya qilish imkonini beradi.'
      },
      {
        q: 'Mening moliyaviy ma\'lumotlarim qanchalik maxfiy saqlanadi?',
        a: 'Barcha ma\'lumotlar 256-bitli AES shifrlash orqali saqlanadi. Hech bir uchinchi shaxs yoki reklama beruvchi sizning moliyaviy faoliyatingizni ko\'ra olmaydi.'
      }
    ]
  },
  {
    id: 'eskibozor',
    name: 'EskiBozor',
    tagline: 'AI raqobat tahlili bilan ta\'minlangan intellektual onlayn marketplace',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce va Savdo',
    badge: 'AI Savdo',
    description: 'Sotuvchilar va xaridorlarni birlashtiruvchi, AI yordamida do\'kon ko\'rsatkichlarini raqobatchilar bilan solishtirib takomillashtiruvchi innovatsion bozor.',
    longDescription: 'EskiBozor — shunchaki tovarlar e\'lonlar doskasi emas, balki sun\'iy intellekt yordamida savdolarni oshirishga ixtisoslashgan aqlli tijorat maydoni. U sotuvchilarga tovarlar narxini optimallashtirish, raqobatchilar faolligini o\'rganish va 1000 ko\'rish uchun maqsadli ichki reklamani yoqish imkonini beradi.',
    iconName: 'ShoppingBag',
    color: 'from-amber-500 to-orange-600',
    accentBg: 'rgba(245, 158, 11, 0.1)',
    features: [
      'AI Do\'kon Solishtirish: kamchiliklar va sotuv o\'sish imkoniyatlarini aniqlash',
      'Buyer & Seller uchun tabaqalashtirilgan profillar (Oddiy, Pro, Plus)',
      '1,000 ta ko\'rish uchun 30,000 so\'mlik maqsadli ichki reklama mexanizmi',
      'Kafolatlangan xavfsiz bitim (Escrow to\'lov himoyasi)',
      'Sotuvchilar uchun 150MB gacha yuqori sifatli fotosuratlar yuklash',
      'Finilya bilan to\'g\'ridan-to\'g\'ri bog\'lanish: savdo tushumlari avtomatik kassa balansiga tushadi',
      'Bir lahzali buyurtma xabarnomalari (Telegram va Fsent orqali)'
    ],
    specs: [
      { label: 'Domen integratsiyasi', value: '.uz, .io, .com' },
      { label: 'AI Analitika', value: 'Phentist Market Intelligence Core' },
      { label: 'Komissiya', value: '5% dan 20% gacha (tarifga bog\'liq)' },
      { label: 'To\'lov tizimlari', value: 'Payme, Click, Uzum, Bank kartalari' }
    ],
    targetAudience: 'Do\'kon egalari, Ishlab chiqaruvchilar, Dilerlar, Qulay xarid qiluvchi jismoniy shaxslar',
    demoMetrics: [
      { label: 'Kunlik savdolar hajmi', value: '820M+ so\'m' },
      { label: 'Do\'konlar soni', value: '3,200+' },
      { label: 'Konversiya o\'sishi', value: '+35%' }
    ],
    status: 'Faol',
    linkUrl: 'https://eskibozor.uz',
    docsSlug: 'eskibozor-merchant-api',
    screenshots: [
      {
        title: 'Sotuvchi Kabineti va AI Tavsiyalar',
        desc: 'Do\'kon mahsulotlari statistikasi, ko\'rishlar va narxlar bo\'yicha AI takliflari.',
        url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    plans: [
      {
        name: 'Oddiy Sotuvchi',
        price: '0 UZS',
        period: 'bepul boshlash',
        description: 'Yangi boshlayotgan do\'konlar uchun',
        features: [
          '100 tagacha mahsulot joylash',
          '20MB umumiy rasm xotirasi',
          '20% savdo komissiyasi',
          'Standart sotuvchi nishoni',
          'Savatga saqlash: 50 ta mahsulot'
        ]
      },
      {
        name: 'Pro Sotuvchi',
        price: '149,000 UZS',
        period: 'oyiga',
        badge: 'Eng foydali',
        highlight: true,
        description: 'Faol savdo qiluvchi bizneslar uchun',
        features: [
          '150 tagacha mahsulot joylash',
          '50MB rasm xotirasi',
          '10% gacha pasaytirilgan komissiya',
          'AI Raqobat tahlili va narxlar tavsiyasi',
          'Pro Seller verified nishoni',
          '15 martagacha tovar ma\'lumotlarini yangilash'
        ]
      },
      {
        name: 'Plus Verified',
        price: '390,000 UZS',
        period: 'oyiga',
        description: 'Katta brendlar va rasmiy distribyutorlar uchun',
        features: [
          '300+ mahsulotlar',
          '150MB media xotirasi',
          'Faqat 5% minimal komissiya',
          'Barcha 8/8 rasmlarni to\'liq ko\'rsatish',
          '1000 ko\'rishlik reklama uchun 30% chegirma',
          'Shaxsiy akkaunt kuratori'
        ]
      }
    ],
    faqs: [
      {
        q: 'Do\'kon ochish uchun nimalar talab qilinadi?',
        a: 'Fentoph hisobingiz orqali 1 daqiqada kirasiz, do\'kon nomi va STIR yoki shaxsiy ma\'lumotlaringizni kiritib mahsulot yuklashni boshlaysiz.'
      },
      {
        q: 'AI taqqoslash xizmati qanday ishlaydi?',
        a: 'Tizim sizning tovarlaringiz narxi va xususiyatlarini bozordagi boshqa do\'konlar bilan solishtiradi va mijozlar talabini tahlil qilib, sotuvni oshiruvchi tavsiyalar beradi.'
      }
    ]
  },
  {
    id: 'fsent',
    name: 'Fsent',
    tagline: 'O\'ta tezkor shifrlangan aloqa va korporativ messenjer',
    category: 'communication',
    categoryLabel: 'Aloqa va Xabar Almashish',
    badge: 'Xavfsiz Protokol',
    description: 'Korxonalar va jamoalar uchun mo\'ljallangan nol-kechikishli (<15ms), 100% shifrlangan maxfiy xabarlar, katta hajmli fayllar va video aloqa tizimi.',
    longDescription: 'Fsent — xavfsizlik va maxfiylikni eng oliy qadriyat deb biluvchi texnologik jamoalar uchun yaratilgan. Signal Double Ratchet shifrlash protokoli har bir yangi xabar uchun alohida kalit hosil qiladi. Serverlar hatto kim kimga qachon yozayotganini tahlil qilmaydigan Zero-Knowledge tamoyilida ishlaydi.',
    iconName: 'MessageSquare',
    color: 'from-blue-500 to-indigo-600',
    accentBg: 'rgba(59, 130, 246, 0.1)',
    features: [
      'Signal protokoli asosidagi harbiy darajadagi End-to-End shifrlash',
      'Nol-kechikishli (Zero-Latency) arxitektura: xabar yetib borish vaqti < 15ms',
      '5GB gacha har qanday formatdagi hujjat va arxivlarni to\'liq tezlikda uzatish',
      'AI asosidagi xabarlar qisqartmasi (Smart Meeting & Channel Summary)',
      'Ovozli xabarlarni bir zumda aniq o\'zbek va inglizcha matnga aylantirish',
      'O\'zini-o\'zi avtomatik yo\'q qiluvchi xabarlar va skrinshot cheklovi',
      'Web, Desktop (macOS, Windows, Linux) va Mobil (iOS, Android) sinxronligi'
    ],
    specs: [
      { label: 'Kechikish (Latency)', value: '< 15ms (Global CDN)' },
      { label: 'Kriptografiya', value: 'Double Ratchet + Curve25519 + AES-256' },
      { label: 'Fayl limiti', value: '5GB gacha (Pro)' },
      { label: 'Maxfiylik', value: '100% Zero-Knowledge & No-Logs' }
    ],
    targetAudience: 'IT kompaniyalar, Banklar, Yuridik firmalar, Masofaviy jamoalar, Maxfiylikni istovchi shaxslar',
    demoMetrics: [
      { label: 'Yetkazib berish tezligi', value: '99.98% < 0.2s' },
      { label: 'Kunlik xabarlar', value: '1.4M+' },
      { label: 'Maxfiylik darajasi', value: '100% Zero-Knowledge' }
    ],
    status: 'Faol',
    docsSlug: 'fsent-protocol',
    screenshots: [
      {
        title: 'Shifrlangan Ishchi Kanallar',
        desc: 'Jamoaviy muhokamalar, vazifalar va biriktirilgan xavfsiz fayllar oqimi.',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    plans: [
      {
        name: 'Personal',
        price: '0 UZS',
        period: 'bepul',
        description: 'Shaxsiy xavfsiz muloqot va do\'stlar bilan aloqa uchun',
        features: [
          'To\'liq E2E shifrlangan shaxsiy chatlar',
          '1GB gacha fayllar yuborish',
          'O\'zini-o\'zi yo\'q qiluvchi xabarlar',
          'Mobil va Desktop ilovalar'
        ]
      },
      {
        name: 'Team Workspace',
        price: '29,000 UZS',
        period: 'foydalanuvchi/oy',
        badge: 'Jamoalar uchun',
        highlight: true,
        description: 'Kichik va o\'rta korxonalar uchun korporativ aloqa maydoni',
        features: [
          'Cheksiz korporativ ishchi kanallar',
          '5GB gacha fayl almashinuvi',
          'AI Ovozni matnga aylantirish va qisqartirish',
          'Fentoph SSO orqali xodimlarni bir zumda qo\'shish',
          'Ekranni xavfsiz ulashish va HD audio/video qo\'ng\'iroqlar'
        ]
      },
      {
        name: 'Enterprise On-Prem',
        price: 'Muzokara',
        period: 'yillik shartnoma',
        description: 'Banklar va davlat tashkilotlari uchun shaxsiy serverga o\'rnatish',
        features: [
          'Kompaniyangizning shaxsiy serveriga joylashtirish',
          'To\'liq mustaqil kriptografik kalitlar nazorati',
          'DLP (Data Loss Prevention) qoidalari',
          'Maxsus xavfsizlik auditi va 99.999% SLA'
        ]
      }
    ],
    faqs: [
      {
        q: 'Fsent serverlarida xabarlar saqlanadimi?',
        a: 'Yo\'q. Zero-Knowledge arxitekturasi tufayli xabarlar faqat jo\'natuvchi va qabul qiluvchi qurilmasida saqlanadi. Serverlar faqat shifrlangan baytlarni tranzit qiladi.'
      }
    ]
  },
  {
    id: 'phentist',
    name: 'Phentist AI',
    tagline: 'Sun\'iy intellekt agentlari, neyrotarmoqlar va chuqur tahlil laboratoriyasi',
    category: 'ai',
    categoryLabel: 'Sun\'iy Intellekt va Neyrotarmoqlar',
    badge: 'AI Core',
    description: 'Biznes jarayonlarini avtomatlashtiruvchi, bozor tahlili qiluvchi va o\'zbek tilida ixtisoslashgan aqlli agentlarni ishga tushiruvchi Fentoph AI yadrosi.',
    longDescription: 'Phentist — Fentoph ekotizimining intellektual poydevori. U Finilya moliya bashoratlari, EskiBozor savdo optimallashtirish algoritmlari va korporativ mijozlarning ichki hujjat aylanishini avtomatlashtirish uchun maxsus moslashtirilgan katta til modellarini (LLM) taklif qiladi.',
    iconName: 'Cpu',
    color: 'from-purple-500 to-pink-600',
    accentBg: 'rgba(168, 85, 247, 0.1)',
    features: [
      'O\'zbek va xalqaro tillarda yuqori aniqlikdagi ixtisoslashgan neyromodellar',
      'Avtonom biznes agentlari: mijozlar xizmati, savdo tahlilchisi, moliya yordamchisi',
      'Kompaniyangiz ma\'lumotlar bazasi ustiga xavfsiz RAG (Retrieval-Augmented Generation) ulash',
      'Yuqori aniqlikdagi bashoratli tahlillar (Predictive Analytics)',
      'Oson integratsiya uchun qulay REST & Python SDK',
      'Kompaniya ichki ma\'lumotlarining xavfsizligi: kiritilgan ma\'lumotlar qayta o\'qitilmaydi'
    ],
    specs: [
      { label: 'Model arxitekturasi', value: 'Phentist-4 Neural Core' },
      { label: 'Kontekst oynasi', value: '128k tokenlar' },
      { label: 'Javob tezligi', value: '95 token/sekund' },
      { label: 'API Protokoli', value: 'OpenAI-mos REST & Streaming WebSocket' }
    ],
    targetAudience: 'Dasturchilar, Enterprise kompaniyalar, Startaplar, Tadqiqotchilar',
    demoMetrics: [
      { label: 'Muvaffaqiyatli so\'rovlar', value: '99.4%' },
      { label: 'Qayta ishlangan tokenlar', value: '500M+/oy' },
      { label: 'Samaradorlik o\'sishi', value: '3.8x' }
    ],
    status: 'Faol',
    docsSlug: 'phentist-sdk',
    screenshots: [
      {
        title: 'Phentist AI Playground',
        desc: 'Agentlarni sozlash, prompt muhandisligi va real vaqtda test qilish maydoni.',
        url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    plans: [
      {
        name: 'Developer Starter',
        price: '0 UZS',
        period: 'bepul',
        description: 'Dasturchilar va startaplar uchun sinov kvotasi',
        features: [
          'Har oy 10,000 bepul kredit/tokenlar',
          'Phentist-4 Standard modeli',
          'REST API kirish',
          'Jamiyat tomonidan qo\'llab-quvvatlash'
        ]
      },
      {
        name: 'Pro AI',
        price: '$19 / oy',
        period: 'oyiga',
        badge: 'Kengaytirilgan',
        highlight: true,
        description: 'Haqiqiy mahsulotlar va ishlab chiqarish ilovalari uchun',
        features: [
          '500,000 tokenlar / oyiga',
          'Phentist-4 Neural Pro (eng yuqori aniqlik)',
          '95 token/sekund ustuvor tezlik',
          'Custom RAG va hujjat yuklash imkoniyati',
          'Texnik API yordam'
        ]
      },
      {
        name: 'Enterprise Dedicated',
        price: 'Muzokara',
        period: 'yillik shartnoma',
        description: 'Katta hajmdagi korporativ infratuzilma uchun',
        features: [
          'Alohida ajratilgan GPU klasteri',
          'Kompaniyangiz ma\'lumotlarida shaxsiy Fine-Tuning',
          'Nol ma\'lumot saqlash kafolati (Zero Data Retention)',
          '99.99% kafolatlangan SLA'
        ]
      }
    ],
    faqs: [
      {
        q: 'Phentist boshqa AI modellardan nimasi bilan farq qiladi?',
        a: 'Phentist ayniqsa o\'zbek tilining nozik jihatlari, O\'zbekiston qonunchiligi, mahalliy biznes hisob-kitoblari va Fentoph ekotizim ma\'lumotlarini chuqur tushunishga o\'rgatilgan.'
      }
    ]
  },
  {
    id: 'fentoph-cloud',
    name: 'Fentoph Cloud & ID',
    tagline: 'Yagona hisob (SSO), autentifikatsiya va xavfsiz bulut infratuzilmasi',
    category: 'infrastructure',
    categoryLabel: 'Infratuzilma va Xavfsizlik',
    badge: 'Birlashtiruvchi Qatlam',
    description: 'Barcha Fentoph mahsulotlariga yagona kalit bilan kirish, OAuth 2.1 / OIDC autentifikatsiyasi, global profil va xavfsiz API boshqaruvi.',
    longDescription: 'Fentoph ID barcha mustaqil platformalarni yagona garmonik tizimga aylantiradi. Bir marta hisob yaratish orqali foydalanuvchi Finilya, EskiBozor, Fsent va yangi kelajak loyihalariga bir soniyada xavfsiz ulanadi.',
    iconName: 'ShieldCheck',
    color: 'from-cyan-500 to-blue-600',
    accentBg: 'rgba(6, 182, 212, 0.1)',
    features: [
      'Yagona autentifikatsiya (Single Sign-On - SSO)',
      'Ikki bosqichli xavfsizlik (2FA TOTP va SMS tasdiqlash)',
      'Dasturchilar uchun API Kalitlar va Webhook boshqaruvi',
      'Faol qurilmalar va sessiyalarni bir joydan monitoring qilish',
      'GDPR va mahalliy qonunchilikka 100% mos ma\'lumotlar himoyasi',
      '99.99% kafolatlangan xizmat ko\'rsatish barqarorligi (SLA)'
    ],
    specs: [
      { label: 'Protokol', value: 'OAuth 2.1, OpenID Connect, PKCE' },
      { label: 'Uptime', value: '99.99%' },
      { label: 'Xavfsizlik', value: 'SOC2 Type II, ISO 27001 me\'yorlariga muvofiq' },
      { label: 'Sessiya boshqaruvi', value: 'Kriptografik JWT + Refresh token rotatsiyasi' }
    ],
    targetAudience: 'Barcha Fentoph foydalanuvchilari, Hamkorlar, Korporativ mijozlar',
    demoMetrics: [
      { label: 'Autentifikatsiya vaqti', value: '< 80ms' },
      { label: 'Himoyalangan hisoblar', value: '150,000+' },
      { label: 'Xavfsizlik darajasi', value: '99.99%' }
    ],
    status: 'Faol',
    docsSlug: 'fentoph-id-sso',
    screenshots: [
      {
        title: 'Fentoph Central ID Hub',
        desc: 'Xavfsizlik, faol sessiyalar va barcha ulangan servislar nazorat markazi.',
        url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    plans: [
      {
        name: 'Standard ID',
        price: '0 UZS',
        period: 'bepul',
        description: 'Barcha Fentoph foydalanuvchilari uchun standart',
        features: [
          'Barcha Fentoph mahsulotlariga SSO kirish',
          '2FA ikki bosqichli autentifikatsiya',
          'Faol qurilmalarni nazorat qilish',
          '2 tagacha shaxsiy API kalit'
        ]
      },
      {
        name: 'Organization IdP',
        price: 'Muzokara',
        period: 'korporativ',
        description: 'Katta kompaniyalar uchun korporativ SSO va LDAP integratsiyasi',
        features: [
          'SAML 2.0 / Active Directory integratsiyasi',
          'Kengaytirilgan audit jurnallari (SIEM eksport)',
          'Cheksiz API tokenlar va tezlik cheklovlarini oshirish',
          'Maxsus xavfsizlik konsyerji'
        ]
      }
    ],
    faqs: [
      {
        q: 'Fentoph ID nima uchun qulay?',
        a: 'Siz Finilya, EskiBozor yoki Fsent uchun alohida ro\'yxatdan o\'tmaysiz. Bitta hisob orqali barcha xizmatlar avtomatik ulanadi va sinxron ishlaydi.'
      }
    ]
  }
];
