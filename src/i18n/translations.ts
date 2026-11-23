export type Language = 'uz' | 'en' | 'ru';

export interface TranslationDictionary {
  [key: string]: {
    uz: string;
    en: string;
    ru: string;
  };
}

export const TRANSLATIONS: TranslationDictionary = {
  // Navigation
  'nav.products': {
    uz: 'Mahsulotlar',
    en: 'Products',
    ru: 'Продукты'
  },
  'nav.solutions': {
    uz: 'Yechimlar',
    en: 'Solutions',
    ru: 'Решения'
  },
  'nav.portfolio': {
    uz: 'Portfolio',
    en: 'Portfolio',
    ru: 'Портфолио'
  },
  'nav.founder': {
    uz: 'Asoschi',
    en: 'Founder',
    ru: 'Основатель'
  },
  'nav.company': {
    uz: 'Kompaniya',
    en: 'Company',
    ru: 'Компания'
  },
  'nav.about': {
    uz: 'Biz haqimizda',
    en: 'About Us',
    ru: 'О нас'
  },
  'nav.blog': {
    uz: 'Yangiliklar & Blog',
    en: 'News & Blog',
    ru: 'Новости и блог'
  },
  'nav.careers': {
    uz: 'Karyera',
    en: 'Careers',
    ru: 'Карьера'
  },
  'nav.contact': {
    uz: 'Aloqa & Ofis',
    en: 'Contact & Office',
    ru: 'Контакты и офис'
  },
  'nav.docs': {
    uz: 'Hujjatlar (API)',
    en: 'Docs (API)',
    ru: 'Документация'
  },
  'nav.security': {
    uz: 'Xavfsizlik',
    en: 'Security',
    ru: 'Безопасность'
  },
  'nav.search': {
    uz: 'Qidiruv...',
    en: 'Search...',
    ru: 'Поиск...'
  },
  'nav.aiAssistant': {
    uz: 'AI Yordamchi',
    en: 'AI Assistant',
    ru: 'ИИ-помощник'
  },
  'nav.signIn': {
    uz: 'Kirish',
    en: 'Sign In',
    ru: 'Войти'
  },
  'nav.createAccount': {
    uz: 'Ro\'yxatdan o\'tish',
    en: 'Create Account',
    ru: 'Регистрация'
  },
  'nav.dashboard': {
    uz: 'Kabinet (Dashboard)',
    en: 'Dashboard',
    ru: 'Панель управления'
  },
  'nav.admin': {
    uz: 'Admin Panel',
    en: 'Admin Panel',
    ru: 'Панель администратора'
  },
  'nav.logout': {
    uz: 'Chiqish',
    en: 'Log Out',
    ru: 'Выйти'
  },

  // Hero Section
  'hero.badge': {
    uz: 'Fentoph 2026.4 • Kelajak Raqamli Ekotizimi',
    en: 'Fentoph 2026.4 • Next-Gen Digital Ecosystem',
    ru: 'Fentoph 2026.4 • Цифровая экосистема будущего'
  },
  'hero.title': {
    uz: 'FENTOPH GROUP',
    en: 'FENTOPH GROUP',
    ru: 'FENTOPH GROUP'
  },
  'hero.subtitle': {
    uz: 'Kelajak Texnologiyalari va Intellektual Ekotizim Xoldingi',
    en: 'Next-Gen Technologies & Intelligent Ecosystem Holding',
    ru: 'Холдинг передовых технологий и интеллектуальной экосистемы'
  },
  'hero.description': {
    uz: 'Biznes va jamiyat uchun zamonaviy moliya operatsiyalari, intellektual onlayn savdo, harbiy darajada shifrlangan aloqa va avtonom AI agentlarini birlashtiruvchi milliy mustaqil platforma.',
    en: 'A sovereign platform uniting modern financial operations, intelligent commerce, military-grade encrypted communication, and autonomous AI agents.',
    ru: 'Суверенная платформа, объединяющая финансовые операции, интеллектуальную коммерцию, шифрованную связь военного уровня и автономных ИИ-агентов.'
  },
  'hero.viewPortfolio': {
    uz: 'Portfolioni Ko\'rish',
    en: 'View Portfolio',
    ru: 'Смотреть портфолио'
  },
  'hero.meetFounder': {
    uz: 'Asoschi Haqida',
    en: 'Meet the Founder',
    ru: 'Об основателе'
  },
  'hero.loginWithId': {
    uz: 'Fentoph ID SSO',
    en: 'Fentoph ID SSO',
    ru: 'Вход через Fentoph ID'
  },
  'hero.uptime': {
    uz: '99.99% Uptime SLA',
    en: '99.99% Uptime SLA',
    ru: '99.99% доступность SLA'
  },
  'hero.zeroKnowledge': {
    uz: 'Zero-Knowledge Kriptografiya',
    en: 'Zero-Knowledge Cryptography',
    ru: 'Zero-Knowledge криптография'
  },
  'hero.productsCount': {
    uz: '5+ Production Mahsulotlar',
    en: '5+ Production Products',
    ru: '5+ активных продуктов'
  },
  'hero.location': {
    uz: 'Xiva, Xorazm R&D Markazi',
    en: 'Khiva, Khorezm R&D Center',
    ru: 'R&D Центр в Хиве, Хорезм'
  },

  // Portfolio
  'portfolio.badge': {
    uz: 'Fentoph Texnologik Portfoliyasi',
    en: 'Fentoph Technology Portfolio',
    ru: 'Технологическое портфолио Fentoph'
  },
  'portfolio.heading': {
    uz: 'Haqiqiy Mahsulotlar va Yechimlar',
    en: 'Real Products & Solutions',
    ru: 'Реальные продукты и решения'
  },
  'portfolio.subheading': {
    uz: 'Fentoph jamoasi tomonidan noldan loyihalashtirilgan, real korxonalar va foydalanuvchilar xizmatidagi flagman tizimlar.',
    en: 'Flagship systems designed from scratch by the Fentoph team, powering real businesses and users.',
    ru: 'Флагманские системы, спроектированные с нуля командой Fentoph для бизнеса и пользователей.'
  },
  'portfolio.viewFull': {
    uz: 'To\'liq Portfolio Sahifasi',
    en: 'Full Portfolio Page',
    ru: 'Полная страница портфолио'
  },
  'portfolio.caseStudy': {
    uz: 'Batafsil Case Study',
    en: 'Detailed Case Study',
    ru: 'Подробный кейс'
  },
  'portfolio.liveLink': {
    uz: 'Jonli Havola',
    en: 'Live Site',
    ru: 'Сайт'
  },
  'portfolio.platform': {
    uz: 'Platforma',
    en: 'Platform',
    ru: 'Платформа'
  },

  // Founder Section
  'founder.badge': {
    uz: 'Fentoph Rahbariyati va Arxitekturasi',
    en: 'Fentoph Leadership & Architecture',
    ru: 'Руководство и архитектура Fentoph'
  },
  'founder.name': {
    uz: 'Aslbek Qo\'ziboyev',
    en: 'Aslbek Koziboev',
    ru: 'Аслбек Козибоев'
  },
  'founder.title': {
    uz: 'Asoschi va Bosh Tizim Arxitektori',
    en: 'Founder & Chief Systems Architect',
    ru: 'Основатель и главный системный архитектор'
  },
  'founder.desc': {
    uz: 'Fentoph ekotizimining asoschisi va bosh dasturiy arxitektori. Xiva shahrida tug\'ilib, Finilya, Fsent va Phentist AI kabi yirik tizimlarni yaratishdan boshlab bugungi kunda 5 ta mustaqil mahsulotdan iborat texnologik xoldingga asos solgan.',
    en: 'Founder and lead architect of Fentoph ecosystem. Born in Khiva, he architected Finilya, Fsent, and Phentist AI, building a tech holding of 5 sovereign products.',
    ru: 'Основатель и главный архитектор экосистемы Fentoph. Родился в Хиве, создал Finilya, Fsent и Phentist AI, основав холдинг из 5 независимых продуктов.'
  },
  'founder.goToPage': {
    uz: 'Asoschi Sahifasiga O\'tish',
    en: 'Visit Founder Page',
    ru: 'Перейти на страницу основателя'
  },
  'founder.companyHistory': {
    uz: 'Kompaniya Tarixi',
    en: 'Company History',
    ru: 'История компании'
  },

  // Footer
  'footer.brief': {
    uz: 'FENTOPH TEXNIK HABARLARI',
    en: 'FENTOPH ENGINEERING BRIEF',
    ru: 'ТЕХНИЧЕСКИЙ ДАЙДЖЕСТ FENTOPH'
  },
  'footer.briefDesc': {
    uz: 'Kompaniyaning eng so\'nggi texnik yangiliklari, arxitektura tahlillari va xavfsizlik yangilanishlaridan xabardor bo\'ling.',
    en: 'Stay updated with the latest engineering insights, architecture teardowns, and security notices.',
    ru: 'Будьте в курсе последних инженерных инсайтов, архитектурных решений и обновлений безопасности.'
  },
  'footer.subscribe': {
    uz: 'Obuna',
    en: 'Subscribe',
    ru: 'Подписаться'
  },
  'footer.subscribed': {
    uz: 'A\'zo bo\'lindi',
    en: 'Subscribed',
    ru: 'Вы подписаны'
  },
  'footer.emailPlaceholder': {
    uz: 'Elektron pochta manzilingiz...',
    en: 'Your email address...',
    ru: 'Ваш адрес эл. почты...'
  },
  'footer.rights': {
    uz: 'Barcha huquqlar himoyalangan.',
    en: 'All rights reserved.',
    ru: 'Все права защищены.'
  },
  'footer.privacy': {
    uz: 'Maxfiylik Siyosati',
    en: 'Privacy Policy',
    ru: 'Политика конфиденциальности'
  },
  'footer.terms': {
    uz: 'Foydalanish Shartlari',
    en: 'Terms of Service',
    ru: 'Условия использования'
  },
  'footer.cookies': {
    uz: 'Cookie Siyosati',
    en: 'Cookie Policy',
    ru: 'Политика cookies'
  },
  'footer.securityCenter': {
    uz: 'Xavfsizlik Markazi',
    en: 'Security Center',
    ru: 'Центр безопасности'
  }
};
