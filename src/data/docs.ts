import { DocArticle } from '../types';

export const DOCS_ARTICLES: DocArticle[] = [
  {
    id: 'quickstart',
    slug: 'quickstart',
    section: 'Kirish',
    title: 'Fentoph Ekotizimi bilan Ishni Boshlash (Quickstart)',
    description: 'Fentoph platformasi, Fentoph ID va mahsulotlar API kalitlarini olish bo\'yicha 5 daqiqalik qo\'llanma.',
    updatedAt: '2026-11-10',
    content: [
      'Fentoph platformasiga xush kelibsiz! Ushbu hujjat orqali siz Fentoph ekotizimining asosiy tamoyillari, Fentoph ID yaratish va dasturchilar API kalitlarini qanday qo\'lga kiritishni bilib olasiz.',
      'Fentoph — Finilya (moliya), EskiBozor (savdo), Fsent (messenjer) va Phentist (AI) xizmatlarini yagona OAuth 2.1 shlyuzi ostida birlashtiruvchi markazlashgan bulut infratuzilmasidir.',
      'Dasturiy ta\'minotingizni Fentoph API bilan bog\'lash uchun dastlab shaxsiy kabinetingizdan (Fentoph Dashboard) "Production Server Token" yaratib olishingiz zarur.'
    ],
    codeSnippets: [
      {
        lang: 'bash',
        title: 'cURL orqali API Holatini Tekshirish',
        code: `curl -X GET "https://api.fentoph.com/v1/health" \\
  -H "Authorization: Bearer fp_live_YOUR_API_KEY" \\
  -H "Accept: application/json"`
      },
      {
        lang: 'json',
        title: 'Muvaffaqiyatli Server Javobi (200 OK)',
        code: `{
  "status": "healthy",
  "version": "2026.4.1",
  "timestamp": "2026-11-12T13:00:00Z",
  "services": {
    "finilya": "online",
    "eskibozor": "online",
    "fsent": "online",
    "phentist": "online"
  }
}`
      }
    ]
  },
  {
    id: 'authentication',
    slug: 'authentication',
    section: 'Autentifikatsiya',
    title: 'Fentoph ID va OAuth 2.1 Autentifikatsiyasi',
    description: 'OAuth 2.1, PKCE va OpenID Connect (OIDC) orqali foydalanuvchilarni xavfsiz tizimga kiritish.',
    updatedAt: '2026-11-08',
    content: [
      'Fentoph ID barcha ilovalaringiz uchun xavfsiz va markazlashgan autentifikatsiya provayderi (IdP) vazifasini o\'taydi.',
      'Xavfsizlikni eng yuqori darajada ta\'minlash uchun faqat Authorization Code Flow with PKCE (Proof Key for Code Exchange) protokoli qo\'llab-quvvatlanadi.',
      'Autentifikatsiyadan o\'tgach, ilovangizga foydalanuvchining unikal Fentoph ID-si, to\'liq ismi va elektron pochtasini o\'z ichiga olgan kriptografik JWT (JSON Web Token) qaytariladi.'
    ],
    codeSnippets: [
      {
        lang: 'typescript',
        title: 'TypeScript / Node.js da Token Tasdiqlash',
        code: `import { verifyFentophToken } from '@fentoph/sdk-auth';

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token topilmadi' });

  try {
    const userPayload = await verifyFentophToken(token, {
      clientId: process.env.FENTOPH_CLIENT_ID
    });
    req.user = userPayload; // { fentophId: 'user@fmail.com', email: 'user@fmail.com' }
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Yaroqsiz token' });
  }
}`
      }
    ]
  },
  {
    id: 'finilya-api',
    slug: 'finilya-api',
    section: 'Mahsulotlar',
    title: 'Finilya Moliya API va Tranzaksiya Webhooklari',
    description: 'Biznes kassa aylanmalari, P&L tahlili va to\'lov tranzaksiyalarini dasturiy boshqarish.',
    updatedAt: '2026-11-05',
    content: [
      'Finilya API orqali kompaniyangiz ichki ERP, CRM yoki veb-saytidan yangi daromad va xarajatlarni to\'g\'ridan-to\'g\'ri kassa hisobiga kiritishingiz mumkin.',
      'Webhooklar orqali har safar yangi to\'lov amalga oshirilganda yoki belgilangan byudjet limiti oshib ketganda sizning serveringizga bir lahzada bildirishnoma yuboriladi.'
    ],
    codeSnippets: [
      {
        lang: 'bash',
        title: 'Yangi Tranzaksiya Kiritish (POST /v1/transactions)',
        code: `curl -X POST "https://api.fentoph.com/v1/finilya/transactions" \\
  -H "Authorization: Bearer fp_live_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 4500000,
    "currency": "UZS",
    "type": "income",
    "category": "Savdo Tushumi",
    "wallet_id": "wal_toshkent_kassa_01",
    "description": "Buyurtma #8942 to\\'lovi",
    "metadata": { "client_id": "usr_9921" }
  }'`
      }
    ]
  },
  {
    id: 'eskibozor-merchant-api',
    slug: 'eskibozor-merchant-api',
    section: 'Mahsulotlar',
    title: 'EskiBozor Sotuvchi va Mahsulotlar API',
    description: 'Do\'kon tovarlarini ommaviy sinxronlash, buyurtmalar qabuli va AI narxlar tahlili.',
    updatedAt: '2026-11-01',
    content: [
      'EskiBozor Merchant API orqali 1C yoki shaxsiy ombor tizimingizdagi minglab mahsulotlarni avtomatik sinxronlashingiz mumkin.',
      'Shuningdek, AI do\'kon taqqoslash modulidan raqobatchilar narxlari o\'zgarishi haqidagi ma\'lumotlarni JSON formatida olishingiz mumkin.'
    ],
    codeSnippets: [
      {
        lang: 'json',
        title: 'AI Raqobat Tahlili Javobi (GET /v1/eskibozor/analytics)',
        code: `{
  "store_id": "str_apex_uz",
  "category": "Elektronika",
  "average_market_price": 2400000,
  "your_price": 2550000,
  "ai_recommendation": {
    "action": "decrease_price",
    "recommended_price": 2390000,
    "projected_sales_increase_pct": 32.5,
    "recommended_ad_package": "1000_views_30000_uzs"
  }
}`
      }
    ]
  },
  {
    id: 'fsent-protocol',
    slug: 'fsent-protocol',
    section: 'Mahsulotlar',
    title: 'Fsent Double Ratchet Shifrlash Protokoli',
    description: 'Fsent xabarlar protokolining kriptografik me\'morchiligi va Zero-Knowledge kafolatlari.',
    updatedAt: '2026-10-28',
    content: [
      'Fsent xabarlar xavfsizligida jahon standarti hisoblangan Signal Double Ratchet protokoliga tayanadi.',
      'Har bir jo\'natilgan yangi xabar alohida vaqtinchalik simmetrik kalit (AES-256 GCM) bilan shifrlanadi. Bu degani, agar bir dona kalit qandaydir yo\'l bilan fosh bo\'lsa ham, oldingi va keyingi xabarlarni ochish imkonsiz (Forward Secrecy va Break-in Recovery).',
      'Serverlar faqat shifrlangan baytlarni saqlamay tranzit qiladi. Hech qanday shaxsiy kalit serverda yaratilmaydi yoki saqlanmaydi.'
    ]
  },
  {
    id: 'phentist-sdk',
    slug: 'phentist-sdk',
    section: 'API & SDK',
    title: 'Phentist AI Python va Node.js SDK',
    description: 'Phentist-4 Neural Core modeli bilan ishlash, streaming va RAG agentlarini ishga tushirish.',
    updatedAt: '2026-11-04',
    content: [
      'Phentist SDK orqali siz bir necha qator kod bilan o\'zbek tilidagi eng aniq katta til modelini o\'z loyihangizga qo\'shishingiz mumkin.',
      'OpenAI-mos sintaksisga ega bo\'lgani tufayli mavjud kod bazangizni atigi `baseURL` va `apiKey`ni o\'zgartirish orqali Fentoph Phentist-ga o\'tkaza olasiz.'
    ],
    codeSnippets: [
      {
        lang: 'python',
        title: 'Python orqali Phentist-4 Modeliga So\'rov',
        code: `from fentoph import PhentistClient

client = PhentistClient(api_key="fp_live_YOUR_KEY")

response = client.chat.create(
    model="phentist-4-pro",
    messages=[
        {"role": "system", "content": "Sen Fentoph moliyaviy tahlilchisisan."},
        {"role": "user", "content": "Kompaniyaning oylik kassa aylanmasini qanday oshirish mumkin?"}
    ],
    temperature=0.3
)

print(response.choices[0].message.content)`
      }
    ]
  },
  {
    id: 'changelog',
    slug: 'changelog',
    section: 'Qo\'llanmalar',
    title: 'Fentoph Ekotizimi Versiyalar Tarixi (Changelog)',
    description: 'Fentoph platformasi va uning barcha mahsulotlarining so\'nggi yangilanishlari.',
    updatedAt: '2026-11-12',
    content: [
      'v2026.4.1 (12 Noyabr 2026): Fentoph Yagona Ekotizim portali to\'liq ishga tushirildi. Finilya, EskiBozor, Fsent va Phentist yagona SSO orqali birlashtirildi.',
      'v2026.3.8: Phentist-4 Neural Core yangilanishi: o\'zbek tili lug\'at boyligi 3 barobarga oshirildi va javob berish kechikishi 42ms ga tushirildi.',
      'v2026.2.0: Fsent korporativ messenjeri uchun 5GB fayl uzatish va audio-matn transkripsiyasi joriy etildi.',
      'v2026.1.0: EskiBozor AI do\'kon taqqoslash moduli va Finilya v24.14 chiqarildi.'
    ]
  }
];
