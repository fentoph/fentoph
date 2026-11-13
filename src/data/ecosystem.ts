export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  github?: string;
}

export interface Metric {
  label: string;
  value: string;
  change: string;
  description: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
}

export const ECOSYSTEM_METRICS: Metric[] = [
  {
    label: 'Faol Foydalanuvchilar',
    value: '150,000+',
    change: '+42% bu chorakda',
    description: 'Finilya, EskiBozor va Fsent bo\'ylab ro\'yxatdan o\'tganlar'
  },
  {
    label: 'Platforma Uptime',
    value: '99.99%',
    change: 'Kafolatlangan SLA',
    description: 'Yuqori darajadagi uzluksiz infratuzilma'
  },
  {
    label: 'Kunlik Tranzaksiyalar',
    value: '1.2M+',
    change: 'Real-vaqt tizimi',
    description: 'Moliya va xaridlar oqimi xavfsiz qayta ishlanadi'
  },
  {
    label: 'Shifrlangan Xabarlar',
    value: '50M+',
    change: '100% maxfiy',
    description: 'Fsent protokoli orqali uzatilgan xabarlar'
  }
];

export const COMPANY_VALUES = [
  {
    title: 'Xavfsizlik va Maxfiylik Birinchi O\'rinda',
    description: 'Foydalanuvchilarimizning ma\'lumotlari hech qachon uchinchi shaxslarga sotilmaydi yoki suiiste\'mol qilinmaydi. Har bir arxitektura Zero-Knowledge tamoyilida qurilgan.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Sinergiya va Yagona Ekotizim',
    description: 'Biz alohida ilovalar yaratmaymiz — biz bir-birini to\'ldiruvchi, kuchaytiruvchi va vaqtni tejovchi yagona organik texnologik olam quramiz.',
    icon: 'Layers'
  },
  {
    title: 'Sun\'iy Intellekt Amaliyotda',
    description: 'AI faqat quruq marketing so\'zi emas. Finilya, EskiBozor va Fsent tizimlarida sun\'iy intellekt real foyda keltiradi va xarajatlarni qisqartiradi.',
    icon: 'Sparkles'
  },
  {
    title: 'O\'zbekiston va Global Bozor',
    description: 'Mahalliy madaniyat, til va qonunchilikka 100% moslashgan holda, xalqaro miqyosdagi eng yuqori standartlarga javob beradigan sifat yaratamiz.',
    icon: 'Globe'
  }
];

export const TIMELINE: TimelineMilestone[] = [
  {
    year: '2023',
    title: 'Fentoph g\'oyasining tug\'ilishi',
    description: 'Yagona ekotizim g\'oyasi asosida Finilya prototipi ustida dastlabki ishlar boshlandi.'
  },
  {
    year: '2024',
    title: 'Finilya va Fsent MVP ishga tushirildi',
    description: 'Dastlabki 10,000 foydalanuvchilar qamrab olindi, harbiy darajadagi shifrlash protokoli joriy qilindi.'
  },
  {
    year: '2025',
    title: 'EskiBozor va Phentist AI laboratoriyasi',
    description: 'Elektron tijoratda AI tahlili orqali sotuvchilarga yangi imkoniyatlar yaratildi va o\'zbek tilidagi LLM ishlab chiqildi.'
  },
  {
    year: '2026',
    title: 'Fentoph ID va Yagona Ekotizim',
    description: 'Barcha platformalar yagona hisob (SSO) ostida birlashtirildi, 150K+ faol auditoriyaga erishildi.'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Sherzodbek Aliyev',
    role: 'Asoschi va Bosh Ijrochi Direktor (CEO)',
    bio: 'Texnologiya va ekotizimlar yaratish bo\'yicha 10+ yillik tajribaga ega strateg.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Azizbek Saidov',
    role: 'Bosh Texnologiya Direktori (CTO)',
    bio: 'Taqsimlangan tizimlar, kriptografiya va yuqori yuklamali infratuzilma mutaxassisi.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Malika Karimova',
    role: 'Bosh Mahsulot Dizayneri (Head of Product & Design)',
    bio: 'Oddiylik, nafosat va intuitiv interfeyslar orqali millionlab foydalanuvchilar qalbini zabt etuvchi dizayner.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Farrux Zokirov',
    role: 'Sun\'iy Intellekt bo\'limi rahbari (Head of AI)',
    bio: 'Katta til modellari, neyrotarmoqlar va avtonom agentlar bo\'yicha tadqiqotchi.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'
  }
];
