export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: 'fintech' | 'ecommerce' | 'security' | 'ai' | 'cloud';
  categoryLabel: string;
  badge: string;
  status: 'Production' | 'Live' | 'Active' | 'Ecosystem Core';
  year: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  techStack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  image: string;
  accentColor: string;
  accentBg: string;
  liveUrl?: string;
  docsUrl?: string;
  featured: boolean;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'finilya',
    title: 'Finilya OS',
    subtitle: 'Aqlli Moliya & Korporativ Kassa Boshqaruvi',
    tagline: 'Biznes va jismoniy shaxslar uchun ko\'p valyutali real-vaqt moliyaviy tahlil platformasi',
    category: 'fintech',
    categoryLabel: 'FinTex va Moliya',
    badge: 'Flagman FinTech',
    status: 'Production',
    year: '2024 - 2026',
    overview: 'Finilya — O\'zbekiston va mintaqa bizneslari uchun yaratilgan yangi avlod operatsion moliyaviy tizimi. U an\'anaviy murakkab buxgalteriya jadvallari o\'rniga real-vaqt rejimida P&L, Cash Flow tahlili, ko\'p valyutali kassa va AI asosida xarajatlar bashoratini taqdim etadi.',
    problem: 'Kichik va o\'rta korxonalar, tadbirkorlar va frilanserlar o\'z daromad va xarajatlarini ko\'pincha Excel jadvallari yoki qog\'oz daftarlarda yuritib kelgan, bu esa kassa uzilishlariga va moliyaviy yo\'qotishlarga sabab bo\'lardi.',
    solution: 'Fentoph jamoasi ko\'p valyutali (UZS, USD, EUR, RUB, AED) kassa boshqaruvi, Telegram orqali 2 soniyada kiritish va sun\'iy intellekt orqali xarajatlarni toifalashtiruvchi markazlashgan tizimni ishlab chiqdi.',
    architecture: [
      'Multi-tenant taqsimlangan relatsion ma\'lumotlar bazasi',
      'Real-vaqt kassa sinxronizatsiyasi va valyuta kurslari kesh mexanizmi',
      'Bank darajasidagi 256-bitli AES GCM shifrlash va rolli boshqaruv (RBAC)',
      'Telegram Bot webhook arxitekturasi va biometrik kirish'
    ],
    techStack: ['React 19', 'TypeScript', 'TailwindCSS', 'Node.js', 'PostgreSQL / SQLite', 'Redis', 'Telegram Bot API'],
    metrics: [
      { label: 'Faol foydalanuvchilar', value: '45,000+' },
      { label: 'Oylik tejalgan vaqt', value: '18 soat/oy' },
      { label: 'Xarajat qisqarishi', value: '24%' },
      { label: 'Qo\'llab-quvvatlangan valyuta', value: '25+' }
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-emerald-500 to-teal-700',
    accentBg: 'rgba(16, 185, 129, 0.15)',
    liveUrl: 'https://finilya.uz',
    docsUrl: '/docs/finilya-api',
    featured: true
  },
  {
    id: 'eskibozor',
    title: 'EskiBozor Marketplace',
    subtitle: 'AI Raqobat Tahlilli Aqlli Tijorat Platformasi',
    tagline: 'Sotuvchilar uchun konversiya optimizatori va xaridorlar uchun kafolatlangan xarid',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce va Savdo',
    badge: 'AI Tijorat',
    status: 'Live',
    year: '2025 - 2026',
    overview: 'EskiBozor — sun\'iy intellekt orqali do\'kon ko\'rsatkichlarini raqobatchilar bilan taqqoslovchi, avtomatlashtirilgan narx strategiyasi va Escrow kafolatlangan to\'lovlarni taqdim etuvchi zamonaviy marketplace.',
    problem: 'Onlayn bozorda savdo qiluvchi tadbirkorlar raqobatchilarning narxlari va talab o\'zgarishini kuzatishga ko\'p vaqt sarflardi, xaridorlarda esa firibgarlik xavotiri tufayli ishonch yetishmasdi.',
    solution: 'Phentist AI algoritmlari orqali avtomatik do\'kon solishtirish, 1,000 ko\'rishlik maqsadli ichki reklama va xavfsiz Escrow to\'lov xizmati integratsiya qilindi.',
    architecture: [
      'Yuqori yuklamali mikroxizmatlar va mahsulotlar kesh qatlami',
      'Phentist AI Market Intelligence analitik modeli',
      'Payme, Click, Uzum orqali kafolatlangan Escrow to\'lov shlyuzi',
      'Finilya bilan to\'g\'ridan-to\'g\'ri sinxronizatsiya: savdo tushumlari avtomatik kassa balansiga tushadi'
    ],
    techStack: ['Next.js', 'FastAPI', 'Python', 'TailwindCSS', 'Escrow Gateway', 'Vector Search', 'Redis'],
    metrics: [
      { label: 'Kunlik savdo hajmi', value: '820M+ UZS' },
      { label: 'Ro\'yxatdan o\'tgan do\'konlar', value: '3,200+' },
      { label: 'Konversiya o\'sishi', value: '+35%' },
      { label: 'Escrow himoyasi', value: '100%' }
    ],
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-amber-500 to-orange-600',
    accentBg: 'rgba(245, 158, 11, 0.15)',
    liveUrl: 'https://eskibozor.uz',
    docsUrl: '/docs/eskibozor-merchant-api',
    featured: true
  },
  {
    id: 'fsent',
    title: 'Fsent Messenger',
    subtitle: 'Zero-Latency Harbiy Darajadagi Shifrlangan Aloqa',
    tagline: 'Korxonalar va jamoalar uchun 100% Zero-Knowledge shaxsiy aloqa va video platforma',
    category: 'security',
    categoryLabel: 'Kiberxavfsizlik va Aloqa',
    badge: 'Xavfsiz Protokol',
    status: 'Production',
    year: '2025 - 2026',
    overview: 'Fsent — Signal Double Ratchet shifrlash protokoli asosida qurilgan nol-kechikishli (<15ms) korporativ aloqa maydoni. Serverlar hatto kim kimga yozayotganini tahlil qilmaydi va hech qanday metadata loglarini saqlamaydi.',
    problem: 'An\'anaviy korporativ messenjerlar (Slack, Teams, Telegram) ma\'lumotlarni ochiq yoki markaziy serverlarda kalitlar bilan saqlaydi, bu esa korporativ sirlar sizib chiqishi xavfini tug\'diradi.',
    solution: 'Fsent foydalanuvchi qurilmasida bevosita Curve25519 va AES-256 bilan har bir xabar uchun alohida aylanma kalitlar hosil qiluvchi Zero-Knowledge arxitekturasini yaratdi.',
    architecture: [
      'Signal Double Ratchet va Curve25519 kalit almashinuvi',
      'WebRTC orqali to\'g\'ridan-to\'g\'ri P2P shifrlangan audio/video oqimi',
      'Global Edge WebSocket klasteri (< 15ms tranzit kechikishi)',
      'O\'zini-o\'zi avtomatik yo\'q qiluvchi xabarlar va skrinshot blokirovkasi'
    ],
    techStack: ['Rust', 'WebRTC', 'WebSocket', 'Curve25519', 'AES-256 GCM', 'React Native', 'Electron'],
    metrics: [
      { label: 'Yetkazish kechikishi', value: '< 15ms' },
      { label: 'Kunlik shifrlangan xabar', value: '1.4M+' },
      { label: 'Maksimal fayl uzatish', value: '5 GB' },
      { label: 'Zero-Knowledge kafolati', value: '100%' }
    ],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-blue-500 to-indigo-600',
    accentBg: 'rgba(59, 130, 246, 0.15)',
    docsUrl: '/docs/fsent-protocol',
    featured: true
  },
  {
    id: 'phentist',
    title: 'Phentist AI Core',
    subtitle: 'O\'zbek Tili & Biznes Uchun Maxsus Neyrotarmoqlar',
    tagline: 'Korxona ichki ma\'lumotlari ustida ishlovchi avtonom agentlar va LLM laboratoriyasi',
    category: 'ai',
    categoryLabel: 'Sun\'iy Intellekt va Neyrotarmoqlar',
    badge: 'AI Core',
    status: 'Live',
    year: '2025 - 2026',
    overview: 'Phentist — Fentoph ekotizimining intellektual poydevori. U O\'zbekiston qonunchiligi, mahalliy biznes tili, moliya bashoratlari va korporativ hujjat aylanishini avtomatlashtirishga ixtisoslashgan katta til modelidir.',
    problem: 'Global AI modellari (ChatGPT, Claude) o\'zbek tilining grammatik va terminologik nozikliklarini, mahalliy soliq va hisob-kitob qoidalarini to\'liq tushunmaydi va maxfiy ma\'lumotlar xavfsizligini ta\'minlamaydi.',
    solution: 'Fentoph tadqiqot laboratoriyasi o\'zbek tilidagi katta korpus asosida o\'qitilgan Phentist-4 Neural Core va korxonalar uchun xavfsiz RAG (Retrieval-Augmented Generation) tizimini ishlab chiqdi.',
    architecture: [
      'Phentist-4 Transformer Transformer-based arxitekturasi (128k kontekst oynasi)',
      'vLLM va TensorRT-LLM orqali 95 token/sekund yuqori tezlikli inferensiya',
      'Korporativ ma\'lumotlar uchun lokal Vector DB va semantik qidiruv quvuri',
      'OpenAI-mos REST va Streaming WebSocket API interfeysi'
    ],
    techStack: ['PyTorch', 'Transformers', 'vLLM', 'FastAPI', 'Qdrant / Milvus', 'Python SDK'],
    metrics: [
      { label: 'Inferensiya tezligi', value: '95 tok/s' },
      { label: 'Oylik so\'rovlar', value: '500M+ tok' },
      { label: 'Aniqlik ko\'rsatkichi', value: '99.4%' },
      { label: 'Kontekst hajmi', value: '128k' }
    ],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-purple-500 to-pink-600',
    accentBg: 'rgba(168, 85, 247, 0.15)',
    docsUrl: '/docs/phentist-sdk',
    featured: true
  },
  {
    id: 'fentoph-id',
    title: 'Fentoph ID (SSO & Cloud)',
    subtitle: 'Yagona Xavfsiz Autentifikatsiya va Bulut Shlyuzi',
    tagline: 'OAuth 2.0 PKCE, Zero-Trust xavfsizlik va butun Fentoph mahsulotlari uchun bitta hisob',
    category: 'cloud',
    categoryLabel: 'Yagona Bulut va SSO',
    badge: 'Infratuzilma',
    status: 'Ecosystem Core',
    year: '2026',
    overview: 'Fentoph ID (`fentophid.vercel.app`) butun Fentoph ekotizimini yagona raqamli pasport bilan ta\'minlaydi. 1-Click SSO orqali foydalanuvchilar Finilya, EskiBozor, Fsent va korporativ portallarga bir zumda xavfsiz ulanadi.',
    problem: 'Har bir alohida platforma uchun yangi hisob ochish, parollarni eslab qolish va alohida sessiyalarni boshqarish foydalanuvchi tajribasini yomonlashtirib, xavfsizlik teshiklarini keltirib chiqarar edi.',
    solution: 'OAuth 2.0 va OpenID Connect (OIDC) protokollari bilan jihozlangan, SHA-256 PKCE (`S256`) bilan himoyalangan va 2FA (TOTP) qo\'llab-quvvatlovchi zamonaviy identitet serveri yaratildi.',
    architecture: [
      'OAuth 2.0 / OIDC avtorizatsiya va token almashinuv endpointlari',
      'Kriptografik SHA-256 PKCE code_challenge / code_verifier himoyasi',
      'Birinchi tomon (First-Party) ilovalari uchun avtomatik xavfsiz kirish',
      'TOTP 2FA, brute-force rate limiter va xavfsiz cookie sessiyalari'
    ],
    techStack: ['Next.js Edge', 'TypeScript', 'Supabase Auth & DB', 'OAuth 2.0', 'PKCE', 'WebCrypto API'],
    metrics: [
      { label: 'Autentifikatsiya vaqti', value: '< 200ms' },
      { label: 'Uptime ko\'rsatkichi', value: '99.99%' },
      { label: 'Himoyalangan sessiyalar', value: '100k+' },
      { label: 'Xavfsizlik darajasi', value: 'Zero-Trust' }
    ],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-cyan-500 to-blue-600',
    accentBg: 'rgba(6, 182, 212, 0.15)',
    liveUrl: 'https://fentophid.vercel.app',
    docsUrl: '/docs/fentoph-id-sso',
    featured: true
  }
];
