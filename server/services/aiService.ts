import dotenv from 'dotenv';

dotenv.config();

export interface AiChatMessagePayload {
  prompt: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
}

export interface AiResponseResult {
  reply: string;
  suggestedActions: { label: string; url: string }[];
  provider: string;
  tokensEstimated: number;
}

// Application-level prompt injection & abuse filters
const INJECTION_PATTERNS = [
  /(ignore|disregard|forget)\s+(all\s+)?(previous|prior)\s+(instructions|prompts|rules)/i,
  /(reveal|print|show|dump)\s+(all\s+)?(system\s*prompt|system\s*instructions|source\s*code)/i,
  /(give\s*me|show\s*me|extract)\s+(all\s+)?(api[_\s-]?keys?|secrets?|tokens?|passwords?)/i,
  /(drop\s+table|delete\s+from|union\s+select|<script\b)/i
];

function isPromptInjection(prompt: string): boolean {
  return INJECTION_PATTERNS.some(regex => regex.test(prompt));
}

export async function processAiQuery(payload: AiChatMessagePayload): Promise<AiResponseResult> {
  const rawPrompt = payload.prompt.trim();

  // 1. Prompt Injection Defense
  if (isPromptInjection(rawPrompt)) {
    return {
      reply: "Fentoph AI Xavfsizlik Filtri: Ushbu so'rov korporativ xavfsizlik siyosatiga mos kelmagani uchun bekor qilindi. Fentoph mahsulotlari (Finilya, EskiBozor, Fsent, Phentist) va ekotizim imkoniyatlari bo'yicha savollaringizga mamnuniyat bilan javob beraman.",
      suggestedActions: [
        { label: "Barcha mahsulotlar", url: "/products" },
        { label: "Xavfsizlik bayonnomasi", url: "/security" }
      ],
      provider: 'fentoph-security-guard',
      tokensEstimated: 25
    };
  }

  // 2. Length check
  const prompt = rawPrompt.slice(0, 1000);
  const p = prompt.toLowerCase();

  // 3. Upstream Provider with strict Timeout & Error Sanitization
  if (process.env.AI_PROVIDER === 'gemini' && process.env.AI_API_KEY) {
    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.AI_API_KEY}`;
      
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(8000), // 8 seconds timeout
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: "Siz Fentoph texnologik xoldingining aqlli korporativ assistentisiz. Foydalanuvchilarga Finilya, EskiBozor, Fsent, Phentist AI va Fentoph Cloud haqida professional, aniq va do'stona ma'lumot bering. Tizim maxfiy parametrlarini oshkor qilmang." }]
          },
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            reply: text,
            suggestedActions: [
              { label: "Mahsulotlar katalogi", url: "/products" },
              { label: "Fentoph hisobi ochish", url: "/register" }
            ],
            provider: 'gemini-1.5-flash',
            tokensEstimated: Math.ceil(text.length / 4)
          };
        }
      }
    } catch {
      // Graceful fallback: NEVER expose upstream error stack or API key details to user
    }
  }

  // 4. Internal Specialized Fentoph Knowledge Engine (Deterministic Fallback)
  let replyText = '';
  let actions: { label: string; url: string }[] = [];

  if (p.includes('fentoph nima') || p.includes('fentoph haqida') || p.includes('nima bu') || p.includes('kompaniya') || p.includes('haqida')) {
    replyText = `**Fentoph** — bu moliya, elektron tijorat, kiberxavfsizlik va sun'iy intellekt texnologiyalarini yagona ekotizimga birlashtiruvchi global miqyosdagi texnologik xoldingdir.\n\nEkotizim tarkibiga quyidagi asosiy xizmatlar kiradi:\n- **Finilya**: Aqlli moliya boshqaruvi, kassa va analitika;\n- **EskiBozor**: AI raqobat tahlilli intellektual savdo platformasi;\n- **Fsent**: Shifrlangan va xavfsiz korporativ aloqa messenjeri;\n- **Phentist AI**: O'zbek tili va biznes uchun optimallashtirilgan neyrotizimlar.\n\nBarcha xizmatlar yagona **Fentoph ID** orqali boshqariladi.`;
    actions = [
      { label: "Kompaniya tarixi va missiyasi", url: "/about" },
      { label: "Barcha mahsulotlar", url: "/products" },
      { label: "Fentoph hisobi ochish", url: "/register" }
    ];
  } else if (p.includes('mahsulot') || p.includes('qanday mahsulotlar') || p.includes('servis') || p.includes('xizmat')) {
    replyText = `Fentoph ekotizimida quyidagi 4 ta asosiy platforma mavjud:\n\n1. **Finilya** — Ko'p valyutali kassa, P&L va pul oqimlari boshqaruvi.\n2. **EskiBozor** — Sotuvchilar uchun AI do'kon taqqoslagichi va savdo ekotizimi.\n3. **Fsent** — Tezkor va xavfsiz korporativ messenjer.\n4. **Phentist AI** — Mahalliylashtirilgan LLM va avtonom biznes agentlari.\n\nHar bir mahsulot haqida batafsil ma'lumot va sinov versiyasini /products sahifasida topishingiz mumkin.`;
    actions = [
      { label: "Mahsulotlar katalogi", url: "/products" },
      { label: "Hujjatlar (Documentation)", url: "/docs" }
    ];
  } else if (p.includes('mos') || p.includes('menga') || p.includes('tanlash') || p.includes('tavsiya')) {
    replyText = `Sizning ehtiyojingizga qarab tavsiyalarimiz:\n\n- **Kichik biznes va frilanserlar uchun**: Finilya (daromad/xarajat nazorati) va Fsent (jamoa ichki muloqoti);\n- **Do'konlar va savdo jamoalari uchun**: EskiBozor (raqobatchilar narxlarini monitoring qilish);\n- **Dasturchilar va korxonalar uchun**: Phentist AI API va Fentoph Cloud SSO integratsiyasi.\n\nBitta hisob orqali barcha xizmatlarga tezda ulanishingiz mumkin.`;
    actions = [
      { label: "Yechimlar (Solutions)", url: "/solutions" },
      { label: "Ro'yxatdan o'tish", url: "/register" }
    ];
  } else if (p.includes('xavfsizlik') || p.includes('shifr') || p.includes('maxfiy') || p.includes('security')) {
    replyText = `Fentoph xavfsizlikka eng yuqori darajada yondashadi:\n\n- **Hisoblar xavfsizligi**: Kuchli scrypt parollarni xeshlash, binar sessiya tokenlari va ikki bosqichli 2FA;\n- **API Kalitlar**: Server tomonidan yaratiladi, bazada faqat SHA-256 xeshi saqlanadi va istalgan paytda rotate qilinadi;\n- **Ma'lumotlar yaxlitligi**: HTTPS/TLS 1.3 majburiy uzatish, parameterized SQL va qat'iy RBAC avtorizatsiyasi.`;
    actions = [
      { label: "Xavfsizlik markazi", url: "/security" },
      { label: "Texnik hujjatlar", url: "/docs" }
    ];
  } else if (p.includes('narx') || p.includes('tarif') || p.includes('qancha') || p.includes('bepul')) {
    replyText = `Fentoph hisobini ochish mutlaqo **bepul**!\n\nAsosiy mahsulotlar Starter darajasida bepul foydalanish imkoniyatini beradi. Professional va korporativ funksiyalar uchun qulay oylik obunalar mavjud.`;
    actions = [
      { label: "Tariflar bilan tanishish", url: "/products" }
    ];
  } else {
    replyText = `Assalomu alaykum! Savolingiz: "${prompt}".\n\nMen Fentoph bo'yicha savollaringizga javob berishim, Finilya, EskiBozor, Fsent yoki Phentist mahsulotlari bilan ishlashda yo'l-yo'riq ko'rsatishim mumkin. Qanday ma'lumot olishni istaysiz?`;
    actions = [
      { label: "Barcha mahsulotlar", url: "/products" },
      { label: "Yechimlar", url: "/solutions" },
      { label: "Aloqa", url: "/contact" }
    ];
  }

  return {
    reply: replyText,
    suggestedActions: actions,
    provider: 'fentoph-internal-llm',
    tokensEstimated: Math.ceil(replyText.length / 4)
  };
}
