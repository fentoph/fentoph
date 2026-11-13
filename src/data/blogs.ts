import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'fentoph-vision-2026',
    title: 'Fentoph Ekotizimi: Nega barcha xizmatlar bir nuqtada birlashishi kerak?',
    slug: 'fentoph-vision-2026',
    excerpt: 'Raqamli tarqoqlik davri yakunlanmoqda. Fentoph qanday qilib moliya, savdo, xavfsiz aloqa va sun\'iy intellektni yagona ekotizimga jamlayotgani haqida bosh direktorimizning strategik maqolasi.',
    content: [
      'Zamonaviy dunyoda har bir inson o\'nlab turli ilovalar bilan ishlaydi: bittasi moliya uchun, bittasi xaridlar, yana biri xabarlar uchun. Har birida alohida login, alohida parol, alohida to\'lovlar va chalkashliklar.',
      'Biz Fentoph-ga asos solganimizda asosiy falsafamiz bitta edi: inson hayoti va biznesini texnologiya yordamida osonlashtirish. Finilya, EskiBozor, Fsent va Phentist o\'rtasidagi sinergiya aynan shuni ta\'minlaydi.',
      'Masalan, EskiBozor-dagi do\'kon egasi Finilya orqali o\'z daromad va xarajatlarini avtomatik ko\'radi, Phentist AI unga qaysi tovarlarni ko\'proq keltirish kerakligini aytadi, Fsent orqali esa xaridorlar bilan shifrlangan kanal orqali bir soniyada gaplashadi.',
      'Bu shunchaki alohida dasturlar to\'plami emas, balki bir-biri bilan uzviy bog\'langan aqlli ekotizimdir. Fentoph ID orqali siz barcha bu eshiklarni bitta kalit bilan ochasiz.'
    ],
    category: 'Strategiya va Falsafa',
    author: {
      name: 'Sherzodbek Aliyev',
      role: 'Bosh ijrochi direktor (CEO)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Fentoph Group asoschisi va texnologik ekotizimlar me\'mori.'
    },
    date: '10 Noyabr, 2026',
    readTime: '5 daqiqa',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    tags: ['Ekotizim', 'Kelajak', 'Innovatsiya', 'Fentoph'],
    likes: 342,
    featured: true,
    published: true,
    comments: [
      {
        id: 'c1',
        author: 'Rustam Karimov',
        content: 'Finilya va EskiBozor sinergiyasi haqiqatan ham juda zarur edi! Ishlaringizga omad.',
        date: 'Kecha, 14:20'
      },
      {
        id: 'c2',
        author: 'Nodira Umarova',
        content: 'Fsent messenjeri xavfsizligi bo\'yicha batafsil yozilgani ajoyib bo\'libdi.',
        date: 'Bugun, 09:15'
      }
    ]
  },
  {
    id: 'finilya-ai-financial-freedom',
    title: 'Finilya v24.14: Sun\'iy intellekt sizning moliyangizni qanday tejamkor qiladi?',
    slug: 'finilya-ai-financial-freedom',
    excerpt: 'Yangi Finilya algoritmlari har bir xaridni avtomatik tasniflaydi, yashirin xarajatlarni aniqlaydi va yiliga 20% gacha mablag\'ni ortiqcha sarflanishdan asrab qoladi.',
    content: [
      'Ko\'pchilik insonlar oylik daromadi qayerga ketib qolganini tushunmay qoladi. Buning sababi katta xaridlar emas, balki kundan kunga bilinmaydigan mayda chiqimlar.',
      'Finilya v24.14 da taqdim etilgan yangi "Intellektual Moliyaviy Maslahatchi" foydalanuvchining sarf-xarajat odatlarini o\'rganib, unga moslashtirilgan byudjet rejasini tuzadi.',
      'Shuningdek, kompaniyalar uchun bir tugma orqali pul oqimi (Cash Flow) tahlili va debitorlik-kreditorlik qarzlar monitoringi endi Telegram bot orqali ham to\'liq ishlamoqda.',
      'Natijada, sinov guruhimizdagi 1,000 dan ortiq foydalanuvchilar dastlabki 3 oyda o\'zlarining erkin jamg\'armalarini o\'rtacha 24 foizga oshirishga muvaffaq bo\'lishdi.'
    ],
    category: 'FinTex va Moliya',
    author: {
      name: 'Diyorbek Rahimov',
      role: 'Finilya bosh mahsulot yetakchisi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'FinTech mahsulotlari va kassa tahlillari mutaxassisi.'
    },
    date: '6 Noyabr, 2026',
    readTime: '4 daqiqa',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    tags: ['Finilya', 'Byudjet', 'AI Moliya', 'Tejamkorlik'],
    likes: 215,
    published: true,
    comments: []
  },
  {
    id: 'eskibozor-ai-market-analytics',
    title: 'EskiBozor: Kichik do\'konlar sun\'iy intellekt yordamida yirik brendlar bilan qanday bellashmoqda?',
    slug: 'eskibozor-ai-market-analytics',
    excerpt: 'EskiBozor platformasidagi sotuvchilar AI do\'kon solishtirish moduli orqali o\'z narxlari va konversiyalarini optimallashtirib, sotuvlarini 35% ga oshirdi.',
    content: [
      'Elektron tijoratda eng katta to\'siq — bu raqobatni to\'g\'ri baholay olmaslik va reklama byudjetini behuda sovurishdir.',
      'EskiBozor tizimidagi Phentist AI moduli do\'kondagi har bir tovar kartochkasini skanerlaydi: fotosuratlar sifati, tavsif to\'liqligi, narxlar raqobatbardoshligi va mijozlar talabini o\'rganadi.',
      'Sotuvchiga aniq tavsiya beriladi: "Sizning mahsulotingiz narxi o\'rtacha ko\'rsatkichdan 7% yuqori, agar uni 190,000 so\'mga tushirsangiz va 30,000 so\'mlik reklama paketini yoqsangiz, savdo hajmi 2 barobar oshadi".',
      'Bu algoritm yuzlab o\'zbek tadbirkorlariga bozorga tezroq moslashish va o\'z do\'konlarini daromadli qilish imkonini berdi.'
    ],
    category: 'E-Commerce',
    author: {
      name: 'Malika Karimova',
      role: 'EskiBozor Ekotizim Rahbari',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      bio: 'Mahsulot dizayni va foydalanuvchi tajribasi direktori.'
    },
    date: '1 Noyabr, 2026',
    readTime: '6 daqiqa',
    coverImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
    tags: ['EskiBozor', 'AI Savdo', 'Marketplace', 'Biznes'],
    likes: 189,
    published: true,
    comments: []
  },
  {
    id: 'fsent-zero-knowledge-security',
    title: 'Nol-Kechikish va 100% Maxfiylik: Fsent xabarlar arxitekturasi qanday ishlaydi?',
    slug: 'fsent-zero-knowledge-security',
    excerpt: 'Nega korporativ sirlar ochiq messenjerlarda qolmasligi kerak? Fsent-ning xavfsizlik protokollari va shifrlash me\'morchiligi haqida batafsil texnik tahlil.',
    content: [
      'Bugungi kunda har qanday kompaniya uchun ma\'lumotlar xavfsizligi eng birinchi o\'rinda turadi. Tijoriy sirlar, moliyaviy hisobotlar va mijozlar ro\'yxati sizdirilishi korxonalarni sindirishi mumkin.',
      'Fsent ikki qavatli xavfsizlik protokoliga asoslangan: Double Ratchet algoritmi har bir yangi xabar uchun yangi vaqtinchalik kriptografik kalit hosil qiladi.',
      'Serverlarimiz hatto xabarlarning kimdan kimga ketganligidan boshqa ma\'lumotni saqlamaydi (Zero-Knowledge Architecture). Xabar sizning qurilmangizda shifrlanadi va faqat qabul qiluvchining qurilmasidagina ochiladi.',
      'Kechikish vaqti esa 15 millisekunddan kam. Bu xavfsizlik uchun tezlikdan voz kechmaslik kerakligining eng yaxshi isbotidir.'
    ],
    category: 'Texnologiya va Xavfsizlik',
    author: {
      name: 'Azizbek Saidov',
      role: 'Bosh Xavfsizlik Arxitektori (CISO)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      bio: 'Taqsimlangan tizimlar va amaliy kriptografiya bo\'yicha mutaxassis.'
    },
    date: '28 Oktyabr, 2026',
    readTime: '5 daqiqa',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Fsent', 'Kiberxavfsizlik', 'Shifrlash', 'Maxfiylik'],
    likes: 412,
    published: true,
    comments: []
  },
  {
    id: 'phentist-llm-uzbek-language',
    title: 'Phentist AI: O\'zbek tili uchun moslashtirilgan sun\'iy intellekt nima uchun muhim?',
    slug: 'phentist-llm-uzbek-language',
    excerpt: 'Mahalliy kontekst, biznes tili va madaniy nuanslarni chuqur tushunadigan Phentist tili modellari mahalliy kompaniyalarga qanday kuch bermoqda?',
    content: [
      'Global neyrotarmoq modellari ingliz tilida ajoyib natija ko\'rsatsa-da, o\'zbek tilining morfologiyasi, so\'zlashuv iboralari va qonunchilik terminlarini to\'liq hisobga ololmaydi.',
      'Phentist jamoasi o\'tgan 2 yil davomida millionlab rasmiy hujjatlar, badiiy adabiyotlar, iqtisodiy tahlillar va biznes yozishmalar asosida korpus yig\'ib chiqdi.',
      'Endilikda Phentist-4 modeli orqali o\'zbek tilidagi shartnomalarni 10 soniyada tahlil qilish, soliq va hisob-kitob savollariga aniq javob olish hamda mijozlar bilan tabiiy tilda muloqot qilish mumkin.',
      'Bu o\'zbek texnologiya sohasining xalqaro maydondagi mustaqilligi va o\'ziga xosligining ramzidir.'
    ],
    category: 'Sun\'iy Intellekt',
    author: {
      name: 'Farrux Zokirov',
      role: 'AI Research Lead',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      bio: 'Neyrotarmoqlar va katta til modellari tadqiqotchisi.'
    },
    date: '22 Oktyabr, 2026',
    readTime: '7 daqiqa',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tags: ['Phentist', 'Sun\'iy Intellekt', 'O\'zbek Tili', 'LLM'],
    likes: 298,
    published: true,
    comments: []
  }
];
