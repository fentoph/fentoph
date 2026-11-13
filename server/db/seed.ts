import crypto from 'crypto';
import dotenv from 'dotenv';
import { db, initDatabase } from './database';
import { hashPassword } from '../services/authService';

dotenv.config();

export function runSeed() {
  console.log('--- Initializing Database & Running Seed ---');
  initDatabase();

  const isProd = process.env.NODE_ENV === 'production';

  // 1. User Seeding Policy:
  // In PRODUCTION: ZERO users and ZERO default passwords seeded!
  // In DEVELOPMENT: Only seeded if explicitly enabled via SEED_DEV_USERS=true
  const userCount = (db.prepare('SELECT COUNT(*) as c FROM users').get() as any).c;
  if (!isProd && process.env.SEED_DEV_USERS === 'true' && userCount === 0) {
    console.log('⚠️ [DEV ONLY] Seeding development demo accounts because SEED_DEV_USERS=true...');
    const adminId = 'usr_dev_admin';
    const userId = 'usr_dev_user';
    const adminPass = hashPassword('DevAdminSecret2026!');
    const userPass = hashPassword('DevUserSecret2026!');

    db.prepare(`
      INSERT INTO users (id, fentoph_id, email, username, password_hash, role, email_verified, two_factor_enabled, created_at, updated_at)
      VALUES 
        (?, 'FP-994200', 'dev.admin@fentoph.local', 'dev_admin', ?, 'SUPER_ADMIN', 1, 1, datetime('now'), datetime('now')),
        (?, 'FP-102941', 'dev.user@fentoph.local', 'dev_user', ?, 'USER', 1, 0, datetime('now'), datetime('now'))
    `).run(adminId, adminPass, userId, userPass);

    db.prepare(`
      INSERT INTO profiles (id, user_id, full_name, phone, bio, avatar_url, preferences_json, created_at, updated_at)
      VALUES 
        ('prf_dev_admin', ?, 'Fentoph Dev Administrator', '+998 71 200 00 00', 'Local development admin account.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', '{"language":"uz","theme":"dark"}', datetime('now'), datetime('now')),
        ('prf_dev_user', ?, 'Jasurbek Oripov (Dev)', '+998 90 123 45 67', 'Local development test account.', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80', '{"language":"uz","theme":"dark"}', datetime('now'), datetime('now'))
    `).run(adminId, userId);
  } else if (isProd && userCount === 0) {
    console.log('🔒 [PRODUCTION] Zero default users seeded. Use `npm run admin:bootstrap` to securely initialize the first Super Admin.');
  }

  // 2. Initial Ecosystem Products (if not already seeded)
  const productCount = (db.prepare('SELECT COUNT(*) as c FROM products').get() as any).c;
  if (productCount === 0) {
    const products = [
      {
        id: 'prod_finilya',
        slug: 'finilya',
        name: 'Finilya',
        tagline: 'Biznes va shaxsiy moliya uchun aqlli intellektual kassa',
        description: 'Finilya — bu korxonalar va frilanserlar uchun pul oqimlari, ko\'p valyutali hisob-kitoblar, soliq hisoboti va real vaqtli P&L tahlillarini yagona platformada birlashtiruvchi zamonaviy moliya tizimidir.',
        badge: 'Flagman',
        category: 'Fintech',
        status: 'available',
        icon_name: 'Wallet',
        features: [
          'Multi-valyutali aqlli kassa (UZS, USD, EUR, RUB, USDT)',
          'Avtomatlashtirilgan P&L (Daromad va Zarar) hisobotlari',
          'Telegram bot orqali tezkor tushum bildirishnomalari',
          'Xodimlar uchun rolli kassa cheklovlari va kassa yopilishi',
          'Bank hisoblari va to\'lov agregatorlari API integratsiyasi'
        ],
        plans: [
          { name: 'Starter', price: 0, desc: 'Frilanserlar va yangi boshlovchi bizneslar uchun', features: ['1 ta kassa', '3 xil valyuta', 'Oylik 100 tagacha tranzaksiya'], popular: 0, cta: 'Bepul Boshlash' },
          { name: 'Pro Business', price: 49000, desc: 'O\'suvchi do\'konlar va xizmat ko\'rsatish jamoalari uchun', features: ['Cheksiz kassalar', 'Barcha valyutalar', 'To\'liq P&L va soliq hisoboti', 'Telegram kassa boti'], popular: 1, cta: 'Pro-ga O\'tish' },
          { name: 'Enterprise', price: 199000, desc: 'Katta korxonalar va filiallar tarmog\'i uchun', features: ['Filiallararo konsolidatsiya', 'Maxsus API kvotalari', '24/7 shaxsiy menejer va SLA'], popular: 0, cta: 'Aloqaga Chiqish' }
        ]
      },
      {
        id: 'prod_eskibozor',
        slug: 'eskibozor',
        name: 'EskiBozor',
        tagline: 'AI raqobat tahlilli intellektual savdo platformasi',
        description: 'EskiBozor — bu an\'anaviy bozorlar va zamonaviy e-commerce savdogarlarini birlashtiruvchi, real vaqtda raqobatchilar narxlarini taqqoslovchi va optimal sotuv strategiyalarini tavsiya etuvchi aqlli marketplace platformasi.',
        badge: 'Yangi',
        category: 'E-Commerce',
        status: 'available',
        icon_name: 'ShoppingBag',
        features: [
          'Raqobatchilar narxini avtomatik monitoring qilish va AI tavsiyalar',
          'Tezkor elektron do\'kon yaratish (Telegram WebApp va Web)',
          'Yetkazib berish xizmatlari bilan integratsiyalashgan logistika tizimi',
          'To\'g\'ridan-to\'g\'ri mijoz bilan shifrlangan chat aloqasi',
          'Qulay to\'lov tizimlari (Payme, Click, Uzum, Naqd)'
        ],
        plans: [
          { name: 'Seller Basic', price: 0, desc: 'Yakka tartibdagi tadbirkorlar uchun', features: ['50 tagacha tovar joylash', 'Do\'kon mini-sayti', 'Buyurtmalar bildirishnomasi'], popular: 0, cta: 'Do\'kon Ochish' },
          { name: 'Merchant Pro', price: 69000, desc: 'Faol savdogarlar va distribyutorlar uchun', features: ['Cheksiz tovarlar', 'AI narx tavsiyasi', 'Prioritet qidiruvda ko\'rinish'], popular: 1, cta: 'Sotuvni Oshirish' }
        ]
      },
      {
        id: 'prod_fsent',
        slug: 'fsent',
        name: 'Fsent',
        tagline: 'Xavfsiz va shifrlangan korporativ aloqa messenjeri',
        description: 'Fsent — bu korporativ jamoalar va shaxslar uchun maxfiylikni eng yuqori o\'ringa qo\'yuvchi xabar almashish platformasidir. Xabarlar serverlarda shifrlangan holda o\'tadi va begona ko\'zlardan himoyalangan.',
        badge: 'Xavfsiz',
        category: 'Security',
        status: 'available',
        icon_name: 'ShieldCheck',
        features: [
          'Oxirigacha (End-to-End) shifrlangan matn va fayl almashinuvi',
          'O\'z-o\'zini yo\'q qiluvchi xabarlar va ekran tasviridan himoya',
          'Jamoaviy korporativ audio va video konferensiyalar',
          'Serverda ochiq metadata saqlanmaydigan maxfiy infratuzilma',
          'Barcha qurilmalar o\'rtasida lahzalik sinxronizatsiya'
        ],
        plans: [
          { name: 'Personal', price: 0, desc: 'Shaxsiy xavfsiz muloqot uchun', features: ['Cheksiz 1-ga-1 chatlar', '100MB gacha fayl uzatish', 'Avtomatik xabar tozalash'], popular: 0, cta: 'Yuklab Olish' },
          { name: 'Team Enterprise', price: 39000, desc: 'Maxfiy korporativ jamoalar uchun', features: ['Kompaniya domeni bilan guruhlar', '10GB himoyalangan bulut xotirasi', 'Audit log va boshqaruv paneli'], popular: 1, cta: 'Jamoani Ulash' }
        ]
      },
      {
        id: 'prod_phentist',
        slug: 'phentist',
        name: 'Phentist AI',
        tagline: 'O\'zbek tili va biznes uchun moslashtirilgan neyromodellar',
        description: 'Phentist AI — bu korporativ tahlil, mijozlarga xizmat ko\'rsatish, matn yaratish va avtonom biznes jarayonlarini boshqarish uchun mo\'ljallangan ilg\'or sun\'iy intellekt modeli va API platformasidir.',
        badge: 'AI Core',
        category: 'Artificial Intelligence',
        status: 'in_development',
        icon_name: 'Cpu',
        features: [
          'O\'zbek va qardosh tillarda tabiiy muloqot va tushunish',
          'Korporativ ma\'lumotlar bazasi ustida ishlovchi RAG arxitekturasi',
          'REST va Streaming API orqali tizimlarga oson ulanish',
          'Avtomatlashtirilgan mijozlar qo\'llab-quvvatlash agentlari',
          'Yuqori aniqlikdagi biznes analitika va prognozlash'
        ],
        plans: [
          { name: 'Developer Free', price: 0, desc: 'Loyihalar sinovi va o\'rganish uchun', features: ['Oylik 10,000 token', 'Standart model kirishi', 'API Documentation'], popular: 0, cta: 'API Kalit Olish' },
          { name: 'Scale Tier', price: 99000, desc: 'Ishlab chiqarish ilovalari va botlar uchun', features: ['500,000 token', 'Yuqori tezlikdagi Phentist-4 modeli', 'Prioritet server navbati'], popular: 1, cta: 'Ulanish' }
        ]
      }
    ];

    for (const p of products) {
      db.prepare(`
        INSERT INTO products (id, slug, name, tagline, description, badge, category, status, icon_name, features_json, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      `).run(p.id, p.slug, p.name, p.tagline, p.description, p.badge, p.category, p.status, p.icon_name, JSON.stringify(p.features));

      for (const pl of p.plans) {
        const planId = `plan_${crypto.randomBytes(4).toString('hex')}`;
        db.prepare(`
          INSERT INTO product_plans (id, product_id, name, price_uzs, period, description, features_json, popular, cta_label)
          VALUES (?, ?, ?, ?, 'oyiga', ?, ?, ?, ?)
        `).run(planId, p.id, pl.name, pl.price, pl.desc, JSON.stringify(pl.features), pl.popular, pl.cta);
      }
    }
  }

  // 3. Blog Categories
  const categoryCount = (db.prepare('SELECT COUNT(*) as c FROM blog_categories').get() as any).c;
  if (categoryCount === 0) {
    const categories = [
      { id: 'cat_tech', name: 'Texnologiya va Dasturlash', slug: 'tech', desc: 'Arxitektura va yangi texnologiyalar' },
      { id: 'cat_fintech', name: 'Fintech va Moliya', slug: 'fintech', desc: 'Raqamli kassa va xalqaro to\'lovlar' },
      { id: 'cat_security', name: 'Kiberxavfsizlik', slug: 'security', desc: 'Shifrlash va maxfiylik bayonnomalari' },
      { id: 'cat_ai', name: 'Sun\'iy Intellekt', slug: 'ai', desc: 'LLM va biznes uchun sun\'iy ong' }
    ];

    for (const c of categories) {
      db.prepare('INSERT INTO blog_categories (id, name, slug, description) VALUES (?, ?, ?, ?)').run(c.id, c.name, c.slug, c.desc);
    }
  }

  // 4. Initial Articles
  const blogCount = (db.prepare('SELECT COUNT(*) as c FROM blog_posts').get() as any).c;
  if (blogCount === 0) {
    const posts = [
      {
        id: 'post_1',
        slug: 'fentoph-vision-2026',
        title: 'Fentoph Ekotizimi: Nega barcha xizmatlar bir nuqtada birlashishi kerak?',
        excerpt: 'Moliya, savdo, aloqa va sun\'iy intellektning bitta himoyalangan Fentoph ID ostida sinxronlashuvi korxonalar unumdorligini qanday oshiradi?',
        content: `Zamonaviy biznes dunyosida tarqoqlik — eng katta to'siqlardan biridir. Hisob-kitoblar bir ilovada, mijozlar bilan muloqot boshqa kanalda, tovarlar ombori esa mutlaqo uchinchi dasturda saqlanishi ma'lumotlar yo'qolishiga va xatoliklarga olib keladi.

Fentoph ushbu muammoni tubdan hal qilish maqsadida Finilya, EskiBozor, Fsent va Phentist mahsulotlarini yagona xavfsizlik va kirish nuqtasi — Fentoph ID ostida birlashtirdi.

### Birlashgan ekotizimning afzalliklari:
1. **Yagona Autentifikatsiya**: Xodimlar yoki foydalanuvchilar har bir xizmat uchun alohida parollar eslab qolishga majbur emas.
2. **Real Vaqtda Ma'lumot Almashinuvi**: Finilya kassasidagi tushumlar zudlik bilan korxona dashboardida aks etadi.
3. **Kiberxavfsizlik Standartlari**: Barcha aloqalar yagona xavfsizlik arxitekturasi bilan himoyalanadi.`,
        cover_image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        category_id: 'cat_tech',
        author_name: 'Fentoph Jamoasi',
        published_at: '2026-11-10',
        featured: 1,
        tags: ['Ekotizim', 'Arxitektura', 'FentophID']
      },
      {
        id: 'post_2',
        slug: 'fsent-security-architecture',
        title: 'Korporativ maxfiylik va zamonaviy shifrlash tamoyillari',
        excerpt: 'Fsent messenjeri serverlarida foydalanuvchi yozishmalari nima sababdan ochiq holda saqlanmaydi? Tranzit shifrlash qanday ishlaydi?',
        content: `Kiberhujumlar va ma'lumotlar sizib chiqishi har bir zamonaviy kompaniya uchun jiddiy xavf hisoblanadi. Fsent platformasi ushbu tahdidlarga javoban xabarlarni tranzit paytida to'liq shifrlash standartlariga tayanadi.

Serverlar faqat shifrlangan ma'lumot paketlarini manzilga yetkazib berish bilan shug'ullanadi. Xabarlarni dekodlash kalitlari esa faqat suhbatdoshlarning shaxsiy qurilmalarida saqlanadi.`,
        cover_image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        category_id: 'cat_security',
        author_name: 'Kiberxavfsizlik Bo\'limi',
        published_at: '2026-11-08',
        featured: 0,
        tags: ['Xavfsizlik', 'Shifrlash', 'Fsent']
      }
    ];

    for (const post of posts) {
      db.prepare(`
        INSERT INTO blog_posts (id, slug, title, excerpt, content, cover_image, category_id, author_id, author_name, published_at, featured, status, views_count)
        VALUES (?, ?, ?, ?, ?, ?, ?, NULL, ?, ?, ?, 'published', 142)
      `).run(post.id, post.slug, post.title, post.excerpt, post.content, post.cover_image, post.category_id, post.author_name, post.published_at, post.featured);

      for (const tagName of post.tags) {
        const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]/g, '-');
        let tagRecord = db.prepare('SELECT id FROM blog_tags WHERE slug = ?').get(tagSlug) as any;
        if (!tagRecord) {
          const tagId = `tag_${crypto.randomBytes(3).toString('hex')}`;
          db.prepare('INSERT INTO blog_tags (id, name, slug) VALUES (?, ?, ?)').run(tagId, tagName, tagSlug);
          tagRecord = { id: tagId };
        }
        db.prepare('INSERT OR IGNORE INTO blog_post_tags (post_id, tag_id) VALUES (?, ?)').run(post.id, tagRecord.id);
      }
    }
  }

  // 5. Jobs
  const jobCount = (db.prepare('SELECT COUNT(*) as c FROM jobs').get() as any).c;
  if (jobCount === 0) {
    const jobs = [
      {
        id: 'job_1',
        slug: 'senior-fullstack-engineer',
        title: 'Senior Full-Stack Muhandis (Node.js & React)',
        department: 'Muhandislik',
        location: 'Toshkent / Masofaviy',
        type: 'To\'liq stavka',
        experience: '4+ yil',
        desc: 'Fentoph ekotizimining asosiy mikroxizmatlari, Finilya kassa arxitekturasi va yagona autentifikatsiya platformasini rivojlantirish uchun yetakchi muhandis qidirmoqdamiz.',
        reqs: ['Node.js, TypeScript va React bilan 4+ yillik chuqur tajriba', 'Yuqori yuklamali ma\'lumotlar bazalari (SQL, NoSQL) arxitekturasini bilish', 'RESTful va WebSocket arxitekturalarini loyihalash ko\'nikmasi'],
        resps: ['Fentoph xizmatlarining backend va frontend qismini ishlab chiqish', 'Kod sifatini tekshirish va yosh dasturchilarga mentorlik qilish', 'Yuqori mavjudlik va xavfsizlik talablariga rioya qilish'],
        benefits: ['Raqobatbardosh oylik maosh (tajribaga qarab)', 'Eng so\'nggi MacBook Pro va ish jihozlari', 'Bepul tushlik va shinam ofis', 'Kompaniya optsionlari']
      },
      {
        id: 'job_2',
        slug: 'ai-nlp-researcher',
        title: 'AI / NLP Tadqiqotchi Muhandis',
        department: 'Sun\'iy Intellekt',
        location: 'Toshkent, O\'zbekiston',
        type: 'To\'liq stavka',
        experience: '2+ yil',
        desc: 'Phentist AI modelining o\'zbek tili korpusini kengaytirish, fine-tuning va RAG arxitekturalarini takomillashtirish bo\'yicha iqtidorli mutaxassisni jamoamizga chorlaymiz.',
        reqs: ['PyTorch yoki TensorFlow bilan amaliy tajriba', 'LLM modellari bilan ishlash va transformerlar arxitekturasini tushunish', 'O\'zbek tili morfologiyasi va grammatikasi bo\'yicha tushuncha'],
        resps: ['Phentist modelini korxona vazifalariga moslashtirish', 'Ma\'lumotlar to\'plami va sifatini nazorat qilish', 'AI yechimlarni production muhitiga integratsiya qilish'],
        benefits: ['GPU klasterlariga to\'g\'ridan-to\'g\'ri kirish', 'Xalqaro konferensiyalarda ishtirok etish imkoniyati', 'Kasbiy o\'sish va qulay muhit']
      }
    ];

    for (const j of jobs) {
      db.prepare(`
        INSERT INTO jobs (id, slug, title, department, location, type, experience, description, requirements_json, responsibilities_json, benefits_json, active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
      `).run(j.id, j.slug, j.title, j.department, j.location, j.type, j.experience, j.desc, JSON.stringify(j.reqs), JSON.stringify(j.resps), JSON.stringify(j.benefits));
    }
  }

  // 6. Solutions
  const solutionCount = (db.prepare('SELECT COUNT(*) as c FROM solutions').get() as any).c;
  if (solutionCount === 0) {
    const solutions = [
      {
        id: 'sol_smb',
        slug: 'kichik-biznes-va-savdo',
        title: 'Kichik Biznes va Do\'konlar uchun Yagona Boshqaruv',
        category: 'Biznes Yechimlari',
        desc: 'Finilya kassa hisoboti va EskiBozor savdo platformasini birlashtirib, sotuvlarni 35% ga oshirish va kassa kamomadlarini butunlay bartaraf etish.',
        features: ['Kassa va ombor hisobotini yagona joyda ko\'rish', 'Mijozlarga Telegram orqali chek jo\'natish', 'Bozor narxlarini real vaqtda kuzatish']
      },
      {
        id: 'sol_enterprise',
        slug: 'korporativ-xavfsizlik-va-aloqa',
        title: 'Yirik Korxonalar uchun Kiberxavfsiz Aloqa va Ma\'lumotlar Boshqaruvi',
        category: 'Korxona va IT',
        desc: 'Fsent shifrlangan messenjeri va Fentoph ID yagona SSO tizimi orqali korporativ maxfiy ma\'lumotlar sizib chiqishini 100% oldini olish.',
        features: ['Maxsus serverga o\'rnatish imkoniyati', 'Qat\'iy rolli boshqaruv va audit loglari', 'Barcha xodimlar uchun yagona 2FA autentifikatsiya']
      }
    ];

    for (const s of solutions) {
      db.prepare(`
        INSERT INTO solutions (id, slug, title, category, description, features_json)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(s.id, s.slug, s.title, s.category, s.desc, JSON.stringify(s.features));
    }
  }

  console.log('Seed completed successfully!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runSeed();
}
