import { JobPosition } from '../types';

export const CAREER_POSITIONS: JobPosition[] = [
  {
    id: 'sr-frontend-engineer',
    title: 'Senior Frontend Engineer (React / Next.js / TypeScript)',
    department: 'Mahsulot va Muhandislik',
    location: 'Xiva, Xorazm / Masofaviy (Gibrid)',
    type: 'Full-time',
    experience: '4+ yil',
    salary: '$2,500 - $4,200',
    description: 'Fentoph ekotizimining flagman mahsulotlari (Finilya va Fsent) uchun o\'ta tezkor, zamonaviy va silliq foydalanuvchi interfeyslarini yaratish.',
    requirements: [
      'React 18/19, Next.js App Router, TypeScript bilan chuqur tajriba',
      'Tailwind CSS, murakkab animatsiyalar va dizayn tizimlari bilan ishlash',
      'WebSockets, real-vaqt sinxronizatsiyasi va oflayn keshlash tajribasi',
      'Toza kod, komponent arxitekturasi va test yozish ko\'nikmasi'
    ],
    responsibilities: [
      'Finilya va Fsent veb ilovalari arxitekturasini ishlab chiqish',
      'Dizaynerlar bilan birga ilg\'or UI/UX komponentlarini yaratish',
      'Yuklanish tezligini va Core Web Vitals ko\'rsatkichlarini optimallashtirish'
    ],
    benefits: [
      'Valyutada to\'lanadigan yuqori oylik maosh',
      'MacBook Pro M3 Max kompyuteri',
      'Oila uchun xususiy tibbiy sug\'urta',
      'Moslashuvchan ish tartibi (Gibrid/Masofaviy)'
    ],
    active: true
  },
  {
    id: 'sr-backend-go-engineer',
    title: 'Senior Backend / Distributed Systems Engineer (Go / Rust)',
    department: 'Infratuzilma va Xavfsizlik',
    location: 'Xiva, Xorazm / Masofaviy (Gibrid)',
    type: 'Full-time',
    experience: '5+ yil',
    salary: '$3,000 - $5,000',
    description: 'Har sekundda yuz minglab so\'rovlarni qayta ishlovchi yuqori yuklamali mikroxizmatlar va Fsent xabarlar protokolini rivojlantirish.',
    requirements: [
      'Golang yoki Rust tilida yuqori yuklamali tizimlar qurish bo\'yicha mustahkam tajriba',
      'PostgreSQL, Redis, Kafka, gRPC, Docker va Kubernetes bilan professional ishlash',
      'Kriptografik algoritmlar, ma\'lumotlar xavfsizligi va taqsimlangan tranzaksiyalar bo\'yicha bilim'
    ],
    responsibilities: [
      'Fentoph ID va Fsent protokollarining yuqori barqarorligini ta\'minlash',
      'Ma\'lumotlar bazalarini sharding qilish va kechikish vaqtini 15ms dan past ushlash',
      'Xavfsizlik auditlari va penetratsion testlarda qatnashish'
    ],
    benefits: [
      'Kompaniya aksiyalari optsioni (ESOP)',
      'Yuqori kvartal bonuslari',
      'Xalqaro konferensiyalarga sayohat grantlari',
      'Sport klubiga abonement'
    ],
    active: true
  },
  {
    id: 'ai-research-scientist',
    title: 'AI Research Scientist / LLM Engineer (Phentist Core)',
    department: 'Phentist AI Laboratoriyasi',
    location: 'Xiva, Xorazm (Ofis / Gibrid)',
    type: 'Full-time',
    experience: '3+ yil',
    salary: '$3,000 - $5,500',
    description: 'O\'zbek tili va biznes tahlillari uchun ixtisoslashgan neyrotarmoqlar va avtonom agentlarni o\'qitish va tadqiq qilish.',
    requirements: [
      'PyTorch, Hugging Face, vLLM va GPU klasterlari bilan ishlash tajribasi',
      'Fine-tuning, LoRA, RLHF va RAG arxitekturalarini chuqur tushunish',
      'Matematika, statistika yoki kompyuter fanlari bo\'yicha magistrlik darajasi afzallik beradi'
    ],
    responsibilities: [
      'Phentist-4 modelini yangi korpuslar asosida takomillashtirish',
      'EskiBozor va Finilya uchun ixtisoslashgan aqlli agentlarni yaratish',
      'Inference tezligi va resurs sarfini optimallashtirish'
    ],
    benefits: [
      'Eng kuchli GPU klasterlariga kirish (NVIDIA H100)',
      'Ilmiy tadqiqotlar va nashrlar uchun grantlar',
      'Bepul ovqatlanish va qulay dam olish xonasi',
      'Yillik premium tibbiy paket'
    ],
    active: true
  },
  {
    id: 'lead-product-designer',
    title: 'Lead Product Designer (UI/UX & Design Systems)',
    department: 'Dizayn',
    location: 'Xiva, Xorazm / Gibrid',
    type: 'Full-time',
    experience: '4+ yil',
    salary: '$2,200 - $3,800',
    description: 'Fentoph brendi va barcha mahsulotlarning yagona vizual tili va mukammal foydalanuvchi tajribasini boshqarish.',
    requirements: [
      'Figma-da keng qamrovli Dizayn Tizimlari (Design System) yaratish tajribasi',
      'Foydalanuvchi tadqiqotlari (User Research) va prototiplash ko\'nikmasi',
      'Murakkab moliyaviy va tahliliy interfeyslarni soddalashtirish mahorati'
    ],
    responsibilities: [
      'Fentoph dizayn tizimini saqlash va yangi komponentlar kiritish',
      'Mahsulot menejerlari va dasturchilar bilan yonma-yon ishlash',
      'Micro-interactions va animatsiyalarni loyihalash'
    ],
    benefits: [
      'Eng so\'nggi dizayn vositalari (Figma, Spline, Principle litsenziyalari)',
      '4K monitorlar va Apple uskunalari',
      'Erkin ijodiy muhit',
      'Karyeraviy tezkor o\'sish'
    ],
    active: true
  }
];
