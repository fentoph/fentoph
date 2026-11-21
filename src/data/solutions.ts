import { Solution } from '../types';

export const SOLUTIONS_DATA: Solution[] = [
  {
    id: 'fintech-digital-banking',
    title: 'Raqamli Moliya va Biznes Pul Oqimlari',
    subtitle: 'Kompaniyalar va tadbirkorlar uchun shaffof moliyaviy nazorat va avtomatlashtirish',
    category: 'Moliya va Bankchilik',
    summary: 'Kichik va o\'rta korxonalar o\'z kassa aylanmasi, P&L va valyuta tushumlarini bitta platformada real vaqt rejimida boshqarishi uchun yechim.',
    problem: [
      'Moliyaviy ma\'lumotlar turli Excel fayllar, bank ilovalari va qog\'oz daftarlarda tarqoq holatda.',
      'Haqiqiy sof foyda va debitorlik qarzlarini hisoblash oylik buxgalteriya hisobotigacha kechikadi.',
      'Valyuta kurslarining o\'zgarishi va yashirin xarajatlar tufayli rejalashtirilmagan zararlar kelib chiqadi.'
    ],
    solution: [
      'Finilya va Fentoph Cloud orqali barcha bank hisoblari, kassa va hamyonlar bitta boshqaruv panelida birlashadi.',
      'P&L va Cash Flow ko\'rsatkichlari avtomatik shakllanadi va har soniyada yangilanib turadi.',
      'Telegram bot va mobil bildirishnomalar orqali xodimlar xarajatlarni lahzada kiritadi va ortiqcha xarajatlarning oldi olinadi.'
    ],
    architectureOverview: 'Banklar va to\'lov tizimlari Open Banking API orqali Fentoph xavfsiz shifrlash shlyuziga ulanadi. Phentist AI moliyaviy tahlil dvigateli tranzaksiyalarni qayta ishlaydi va Finilya panelida vizual hisobotlarni hosil qiladi.',
    benefits: [
      { title: '90% Tejalgan Vaqt', desc: 'Buxgalteriya jadvallarini qo\'lda yuritish zarurati yo\'qoladi', icon: 'Clock' },
      { title: '24% Xarajatlarni Qisqartirish', desc: 'Yashirin va takroriy chiqimlarni sun\'iy intellekt orqali aniqlash', icon: 'TrendingDown' },
      { title: 'To\'liq Shaffoflik', desc: 'Kompaniya rahbari istalgan paytda kassa holatini telefonida ko\'ra oladi', icon: 'Eye' }
    ],
    caseStudy: {
      client: 'Apex Retail Distribution (Xiva, Xorazm)',
      metrics: [
        { label: 'Oylik tejamkorlik', value: '42,000,000 UZS' },
        { label: 'Hisobot tezligi', value: '1 kundan 3 soniyaga' },
        { label: 'Kassa aniqligi', value: '99.9%' }
      ],
      quote: 'Finilya va Fentoph ekotizimiga o\'tganimizdan so\'ng, 14 ta savdo nuqtamizdagi kassa va pul qoldiqlarini real vaqtda nazorat qilishga erishdik.',
      author: 'Bobur Mirzayev, Bosh moliya direktori'
    },
    connectedProducts: ['finilya', 'fentoph-cloud', 'phentist']
  },
  {
    id: 'ai-ecommerce-retail',
    title: 'AI Bilan Qurollangan Intellektual Elektron Tijorat',
    subtitle: 'Sotuvchilar uchun bozor raqobat tahlili va yuqori konversiyali savdo infratuzilmasi',
    category: 'E-Commerce va Savdo',
    summary: 'Raqamli do\'kon egalari, ishlab chiqaruvchilar va distribyutorlar uchun savdolarni sun\'iy intellekt orqali 2 baravargacha oshirish yechimi.',
    problem: [
      'Mahalliy sotuvchilar raqobatchilar qanday narx qo\'yayotganini va bozor talabini qo\'lda kuzatishga ojiz.',
      'Reklama byudjetlari noto\'g\'ri yo\'naltiriladi va maqsadli xaridorlarga yetib bormaydi.',
      'Buyurtmalar qabuli va to\'lovlar xavfsizligi kafolatlanmagani sababli mijozlar ishonchsizlik bilan qaraydi.'
    ],
    solution: [
      'EskiBozor marketplace va Phentist AI yordamida do\'kondagi har bir tovar kartochkasi raqobat tahlilidan o\'tkaziladi.',
      'Sotuvchiga tovar narxini qanday o\'zgartirish va 1000 ko\'rishlik reklamani qayerga yo\'naltirish bo\'yicha aniq tavsiyalar beriladi.',
      'Kafolatlangan Escrow to\'lov tizimi orqali xaridor tovarini olmaguncha mablag\' xavfsiz muzlatiladi.'
    ],
    architectureOverview: 'EskiBozor savdo platformasi real vaqtda bozor narxlarini indekslaydi. Phentist intellektual tahlil modeli sotuvchining konversiya voronkasini baholaydi va Finilya kassa hisobiga avtomatik kirim qiladi.',
    benefits: [
      { title: '+35% Savdo O\'sishi', desc: 'AI tavsiyalari asosida to\'g\'ri narx belgilash tufayli konversiya keskin oshadi', icon: 'TrendingUp' },
      { title: 'Minimal Reklama Xarajati', desc: '1000 ko\'rish uchun atigi 30,000 so\'mlik aniq auditoriyaga reklama', icon: 'Target' },
      { title: 'Xavfsiz Tranzaksiyalar', desc: 'Xaridor va sotuvchi huquqlari 100% himoyalangan', icon: 'ShieldCheck' }
    ],
    caseStudy: {
      client: 'ModaUz Brand Store',
      metrics: [
        { label: 'Savdolar o\'sishi', value: '+54%' },
        { label: 'Qaytarilgan tovarlar', value: '-18%' },
        { label: 'Mijozlar reytingi', value: '4.95 / 5.0' }
      ],
      quote: 'EskiBozor-dagi AI tahlili qaysi kiyim modellariga talab yuqori ekanligini oldindan ko\'rsatib berdi va ortiqcha tovar qoldiqlaridan qutulishimizga yordam berdi.',
      author: 'Zarina Shukurova, Brend asoschisi'
    },
    connectedProducts: ['eskibozor', 'finilya', 'phentist']
  },
  {
    id: 'secure-enterprise-comms',
    title: 'Harbiy Darajada Shifrlangan Korporativ Aloqa',
    subtitle: 'Nol-kechikishli va Zero-Knowledge maxfiylik protokoli bilan jamoaviy messenjer',
    category: 'Kiberxavfsizlik va Aloqa',
    summary: 'Korxona ichki sirlari, tijoriy shartnomalar va moliyaviy fayllarning ommaviy messenjerlarda qolib ketishi xavfini butunlay bartaraf etuvchi tizim.',
    problem: [
      'Kompaniya xodimlari tijoriy sirlarni himoyalanmagan ommaviy messenjerlarda muhokama qilishga majbur.',
      'Katta hajmdagi fayllarni uzatishda server limitlari va fayllar sizib chiqishi (leak) xavfi yuqori.',
      'Sobiq xodimlar ishdan ketgandan keyin ham korporativ yozishmalarga kirish imkoniga ega bo\'lib qoladi.'
    ],
    solution: [
      'Fsent Signal Double Ratchet protokoli asosida to\'liq End-to-End shifrlashni ta\'minlaydi.',
      'Fentoph SSO orqali xodim ishdan bo\'shatilganda barcha qurilmalardan korporativ fayllar va chatlar avtomatik o\'chiriladi.',
      '5GB gacha bo\'lgan har qanday arxiv va hujjatlar o\'ta tezkorlik bilan uzatiladi.'
    ],
    architectureOverview: 'Mijoz qurilmasi Curve25519 kalitlar juftligini yaratadi. Server faqat shifrlangan baytlarni tranzit qiladi va hech qanday kalit yoki ochiq matn saqlamaydi (Zero-Knowledge arxitekturasi).',
    benefits: [
      { title: '100% Maxfiylik', desc: 'Hech kim — hatto Fentoph muhandislari ham xabarlarni o\'qiy olmaydi', icon: 'Lock' },
      { title: '< 15ms Kechikish', desc: 'Dunyo bo\'ylab yuqori tezlikdagi aloqa', icon: 'Zap' },
      { title: 'Markazlashgan Nazorat', desc: 'Fentoph ID orqali xodimlar va kanallarni bir daqiqada boshqarish', icon: 'Users' }
    ],
    caseStudy: {
      client: 'LegalTech Partners Uzbekistan',
      metrics: [
        { label: 'Himoyalangan hujjatlar', value: '120,000+' },
        { label: 'Xavfsizlik buzilishlari', value: '0 ta' },
        { label: 'Xodimlar qamrovi', value: '250+ advokatlar' }
      ],
      quote: 'Mijozlarimiz bilan bo\'lgan sud hujjatlari va maxfiy bitimlarni Fsent orqali yuboramiz. Bu bizga 100% xotirjamlik beradi.',
      author: 'Jamshid Fayziyev, Bosh hamkor'
    },
    connectedProducts: ['fsent', 'fentoph-cloud']
  },
  {
    id: 'enterprise-ai-agents',
    title: 'Avtonom Sun\'iy Intellekt Agentlari va Tahliliy Neyrotarmoqlar',
    subtitle: 'Mahalliy kontekst va o\'zbek tilini chuqur tushunuvchi Phentist LLM yadrosi',
    category: 'Sun\'iy Intellekt',
    summary: 'Kompaniyangizning mijozlar xizmati, hujjatlar tahlili va biznes qarorlarini 24/7 ishlaydigan aqlli AI agentlariga topshiring.',
    problem: [
      'Mavjud xalqaro AI modellari o\'zbek tili grammatikasi, qonunchilik hujjatlari va mahalliy biznes atamalarini xato talqin qiladi.',
      'Mijozlar bilan aloqa bo\'limi va call-centerlar har kuni bir xil savollarga javob berish bilan band.',
      'Korporativ ma\'lumotlar xalqaro AI serverlariga yuborilganda maxfiylik yo\'qolishi mumkin.'
    ],
    solution: [
      'Phentist AI laboratoriyasi tomonidan o\'zbek tili va qonunchiligi asosida o\'qitilgan Phentist-4 modeli.',
      'Kompaniyangizning ichki bazasiga ulangan shaxsiy RAG yordamchisi: mijozlarga kechayu-kunduz 2 soniyada aniq javob beradi.',
      'Nol ma\'lumot saqlash (Zero Data Retention) qoidasi: ma\'lumotlaringiz hech qachon boshqa modellarni o\'qitish uchun ishlatilmaydi.'
    ],
    architectureOverview: 'REST va Streaming WebSocket orqali Phentist-4 Neural Core bilan bog\'lanish. Shaxsiy korporativ ma\'lumotlar xavfsiz vektor bazalarida (Vector Database) indekslanadi va so\'rov bo\'yicha kontekstga qo\'shiladi.',
    benefits: [
      { title: '3.8x Samaradorlik', desc: 'Rutin topshiriqlar va hujjat tahlili avtomatlashtiriladi', icon: 'Cpu' },
      { title: '95 Token/Sekund', desc: 'Kechikishlarsiz bir zumda javob berish tezligi', icon: 'Zap' },
      { title: 'Mahalliy Kontekst', desc: 'O\'zbek tili morfologiyasini to\'liq tushunuvchi yagona professional model', icon: 'Globe' }
    ],
    caseStudy: {
      client: 'SmartLogistics Central Asia',
      metrics: [
        { label: 'Avtomatlashtirilgan so\'rovlar', value: '78%' },
        { label: 'Javob berish vaqti', value: '1.8 soniya' },
        { label: 'Tejalgan operatsion xarajat', value: '35%' }
      ],
      quote: 'Phentist AI agenti kuniga 5,000 dan ortiq yuk tashuvchilarning so\'rovlarini o\'zbek va rus tillarida xatosiz qayta ishlamoqda.',
      author: 'Ulug\'bek Sattorov, Texnologik innovatsiyalar rahbari'
    },
    connectedProducts: ['phentist', 'fentoph-cloud']
  },
  {
    id: 'unified-cloud-identity',
    title: 'Yagona Bulutli Autentifikatsiya va Korporativ SSO',
    subtitle: 'Barcha platformalar va korporativ ilovalar uchun bitta xavfsiz login shlyuzi',
    category: 'Infratuzilma va SSO',
    summary: 'Kompaniya xodimlari va mijozlariga barcha ichki va tashqi Fentoph mahsulotlariga yagona identifikator (Fentoph ID) orqali xavfsiz kirish imkonini yaratish.',
    problem: [
      'Foydalanuvchilar o\'nlab turli xizmatlar uchun parollarni eslab qolishga qiynaladi va oddiy parollar qo\'yadi.',
      'Dasturchilar har bir yangi loyihada autentifikatsiya, 2FA va sessiyalarni noldan yozishga ko\'p vaqt sarflaydi.',
      'Sessiyalar nazoratsiz qolib, hisoblarni o\'g\'irlash xavfi ortadi.'
    ],
    solution: [
      'Fentoph Cloud OAuth 2.1 va OpenID Connect protokollari asosida tayyor autentifikatsiya provayderini taqdim etadi.',
      'Bir martalik Fentoph ID orqali Finilya, EskiBozor, Fsent va mijozning shaxsiy ilovalariga bir zumda kirish.',
      'Markazlashgan boshqaruv paneli: faol qurilmalarni ko\'rish, 2FA-ni majburiy qilish va API tokenlarni boshqarish.'
    ],
    architectureOverview: 'Cryptographic JWT + Refresh Token rotatsiyasi. SOC2 Type II va ISO 27001 xavfsizlik standartlariga to\'liq muvofiq taqsimlangan klaster.',
    benefits: [
      { title: '< 80ms Kirish Tezligi', desc: 'Foydalanuvchini kutdirmaydigan tezkor autentifikatsiya', icon: 'Zap' },
      { title: 'Zero Password Leaks', desc: 'Parollar xeshlangan va tuzlangan holda saqlanadi', icon: 'ShieldCheck' },
      { title: 'Tezkor API Integratsiya', desc: 'Istalgan frontend yoki mobil ilovaga 15 daqiqada ulanadi', icon: 'Code' }
    ],
    caseStudy: {
      client: 'EduCore Academy Ecosystem',
      metrics: [
        { label: 'Uланган foydalanuvchilar', value: '85,000+' },
        { label: 'Uptime', value: '99.99%' },
        { label: 'Kirish muammolari', value: '-92%' }
      ],
      quote: 'Fentoph ID SSO shlyuzini o\'rnatganimizdan so\'ng, o\'quvchilarimiz barcha platformalarimizga bitta parol bilan qulay kiradigan bo\'ldi.',
      author: 'Shahzod Eshmatov, Texnik direktor'
    },
    connectedProducts: ['fentoph-cloud', 'finilya', 'eskibozor', 'fsent', 'phentist']
  }
];
