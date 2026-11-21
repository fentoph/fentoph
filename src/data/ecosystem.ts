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
    label: 'Kechikish Vaqti (Latency)',
    value: '< 15 ms',
    change: 'Global p99',
    description: 'Sub-millisekundlik kesh va yuqori tezlikdagi API arxitekturasi'
  },
  {
    label: 'Infratuzilma Uptime',
    value: '99.99%',
    change: 'Kafolatlangan SLA',
    description: 'Taqsimlangan zaxira klasterlari va avtomatik tiklanish'
  },
  {
    label: 'Kriptografik Himoya',
    value: 'Signal E2EE',
    change: 'Double Ratchet',
    description: 'Fsent aloqasida Curve25519 va scrypt xotira-og\'ir xeshlash'
  },
  {
    label: 'Yagona Ekotizim',
    value: '5 ta Mahsulot',
    change: 'Fentoph ID (SSO)',
    description: 'Finilya, EskiBozor, Fsent, Phentist va Fentoph Cloud integratsiyasi'
  }
];

export const COMPANY_VALUES = [
  {
    title: 'Haqiqiy Xavfsizlik va Maxfiylik',
    description: 'Foydalanuvchilarimiz ma\'lumotlari hech qachon sotilmaydi yoki suiiste\'mol qilinmaydi. Har bir xizmat Zero-Knowledge va RBAC tamoyillariga asoslangan.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Sinergiya va Yagona Ekotizim',
    description: 'Biz alohida-alohida ajratilgan ilovalar emas, balki bir-birini mustahkamlovchi va vaqtni tejovchi yagona organik texnologik muhit yaratamiz.',
    icon: 'Layers'
  },
  {
    title: 'Haqiqiy Amaliy Sun\'iy Intellekt',
    description: 'AI biz uchun shunchaki marketing emas. Finilya, EskiBozor va Fsent tizimlarida sun\'iy intellekt biznes jarayonlarini aniq optimallashtiradi.',
    icon: 'Sparkles'
  },
  {
    title: 'Xiva, Xorazmdan Global Bozorga',
    description: 'Buyuk allomalar yurti — qadimiy Xiva zaminida zamonaviy intellektual texnologiyalar yaratib, jahon darajasidagi sifat standartini taqdim etamiz.',
    icon: 'Globe'
  }
];

export const TIMELINE: TimelineMilestone[] = [
  {
    year: '2024',
    title: 'Fentoph g\'oyasi va Finilya poydevori',
    description: 'Xiva shahrida kichik biznes va korxonalar uchun zamonaviy raqamli moliya tizimi arxitekturasi loyihalashtirildi.'
  },
  {
    year: '2025',
    title: 'Fsent va Phentist AI laboratoriyasi',
    description: 'Harbiy darajadagi shifrlash protokollari asosida Fsent messenjeri va o\'zbek tili uchun moslashtirilgan AI modellari ishlab chiqildi.'
  },
  {
    year: '2026',
    title: 'EskiBozor va Yagona Fentoph ID (SSO)',
    description: 'Barcha servislar yagona xavfsiz autentifikatsiya markazi ostida birlashtirildi va to\'liq production-ready bosqichga yetkazildi.'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Aslbek Qo\'ziboyev',
    role: 'Asoschi va Bosh Dasturiy Arxitektor (Founder & Lead Architect)',
    bio: 'Fentoph ekotizimining asoschisi, taqsimlangan tizimlar, zamonaviy web texnologiyalari va kiberxavfsizlik muhandisi. Xiva, Xorazm.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    github: 'https://github.com/aslbek-qoziboyev'
  },
  {
    name: 'Fentoph Core Engineering Team',
    role: 'Tizim Arxitekturasi va Backend Muhandislari',
    bio: 'Yuqori unumdorlikdagi mikroxizmatlar, relatsion ma\'lumotlar bazalari, sessiyalar boshqaruvi va API xavfsizligini ta\'minlovchi muhandislar guruhi.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Fentoph AI & Data Lab',
    role: 'Sun\'iy Intellekt va Katta Modellar Bo\'limi',
    bio: 'Phentist AI yadrosi, avtonom agentlar quvuri, biznes jarayonlarini tahlil qilish va semantik qidiruv ustida ishlovchi tadqiqotchilar jamoasi.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Fentoph Security & Privacy Ops',
    role: 'Kiberxavfsizlik va Zero-Trust Nazorati',
    bio: 'Signal Double Ratchet shifrlash, server-side RBAC, brute-force himoyasi va xavfsizlik auditlarini doimiy nazorat qiluvchi xavfsizlik bo\'linmasi.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
  }
];
