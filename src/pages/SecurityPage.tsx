import React from 'react';
import { useRouter } from '../context/RouterContext';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Server, 
  CheckCircle2, 
  AlertTriangle,
  FileCheck,
  ArrowRight,
  Clock,
  Layers,
  Cpu
} from 'lucide-react';

export const SecurityPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5" />
          Fentoph Trust, Security & Compliance
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Xavfsizlik va Maxfiylik Bayonnomasi
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Biz marketing va'dalaridan xoli, amalda joriy etilgan kriptografik standartlar va 
          shaffof threat model asosida ishlovchi ishonchli arxitekturani quramiz.
        </p>
      </div>

      {/* SECTION 1: ACTIVELY IMPLEMENTED SECURITY CONTROLS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Amalda Joriy Etilgan Xavfsizlik Funksiyalari (Production Active)
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Hozirda to'liq ishlayotgan texnologiyalar</h2>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
            VERIFIED ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Account & Password Security */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Scrypt Parol Himoyasi & 2FA</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Parollar GPU/ASIC hujumlariga chidamli xotira-og'ir `scrypt` algoritmi va kriptografik 16-baytli tuz (salt) bilan xeshlanadi. Parollarni tekshirishda timing attack-dan himoyalangan doimiy vaqtli taqqoslash ishlatiladi.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Scrypt xotira-og'ir xeshlash</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Timing-Safe Equal tekshiruv</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Server-side sessiya muddati</li>
            </ul>
          </div>

          {/* Email Verification & API Keys */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Kriptografik Tokenlar & API Keys</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tasdiqlash kodlari kriptografik tasodifiy generator orqali hosil qilinadi, bazada SHA-256 xeshi saqlanadi va 15 daqiqadan so'ng avtomatik bekor bo'ladi. API kalitlar serverda faqat bir marta ko'rsatiladi va xesh ko'rinishida saqlanadi.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Bir martalik (Single-Use) kodlar</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> SHA-256 xeshli API kalitlar</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Lahzalik API Key Revoke & Rotate</li>
            </ul>
          </div>

          {/* RBAC & Network Security */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Server RBAC & Audit Log</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Barcha boshqaruv yo'llari server darajasida USER, ADMIN, SUPER_ADMIN rollari bilan to'silgan. Muhim harakatlar (kirish, parolni yangilash, API kalit yaratish, maqolalar) o'zgartirib bo'lmas AuditLog jadvaliga yoziladi.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Backend-enforced RBAC tekshiruv</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> IP va vaqt bilan to'liq Audit Log</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Rate Limiting & Input Sanitization</li>
            </ul>
          </div>

        </div>
      </div>

      {/* SECTION 2: ROADMAP & ARCHITECTURAL TARGETS (HONEST DISCLOSURE) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Arxitektura Maqsadlari va Rejalashtirilgan Xususiyatlar (Roadmap)
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Ishlab chiqilayotgan chuqur shifrlash protokollari</h2>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono border border-amber-500/20">
            IN DEVELOPMENT
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Cpu className="w-4 h-4" /> Fsent Messenjeri Uchun: Double Ratchet & Curve25519
            </div>
            <h4 className="text-base font-bold text-white">Signal Protokoli Asosidagi Oxirigacha Shifrlash (End-to-End)</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Fsent korporativ messenjeri uchun har bir xabar almashinuvida yangi sessiya kalitini hosil qiluvchi Double Ratchet algoritmi va Curve25519 kalitlar almashinuvi hozirda alohida mikroxizmat sifatida dasturlanmoqda. Joriy web platformada bu protokol faqat arxitektura standarti sifatida ko'rsatilgan va mobil clientlar bilan integratsiya qilinmoqda.
            </p>
            <div className="text-[11px] font-mono text-slate-400">
              Holati: Alfa sinov bosqichida • Release: 2026 Q3
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Layers className="w-4 h-4" /> Maxfiylik Uchun: Zero-Knowledge Relay Klasterlari
            </div>
            <h4 className="text-base font-bold text-white">Metadata Saqlanmaydigan Tranzit Tugunlar</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Foydalanuvchi aloqalarining metadatasini ham yashiruvchi Zero-Knowledge relay infratuzilmasi bizning uzoq muddatli texnologik xaritamizga (Roadmap) kiritilgan. Biz serverlarimizda ochiq log saqlamaslik siyosatini qo'llab-quvvatlaymiz, biroq to'liq ZK kriptografik isboti rejalashtirilgan bosqich hisoblanadi.
            </p>
            <div className="text-[11px] font-mono text-slate-400">
              Holati: Arxitektura loyihalash • Target: 2026 Q4
            </div>
          </div>

        </div>
      </div>

      {/* Honest Scope & Best Practices Notice */}
      <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold">
          <AlertTriangle className="w-4 h-4" />
          Fentoph Shaffoflik Tamoyili
        </div>
        <h3 className="text-xl font-bold text-white">Biz faqat haqiqatda mavjud xavfsizlikni taqdim etamiz</h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Fentoph o'z platformalarida soxta marketing va'dalari yoki mavjud bo'lmagan xavfsizlik funksiyalarini bor deb ko'rsatmaydi. 
          Bizning veb arxitekturamiz qat'iy OWASP Top-10 tavsiyalariga (CSRF, XSS, Parameterized SQL Queries, Timing-attack resistance) 
          va O'zbekiston Respublikasining «Shaxsga doir ma'lumotlar to'g'risida»gi qonuni talablariga muvofiq ishlab chiqilgan.
        </p>

        <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
          <span>• OWASP Top-10 Himoyasi</span>
          <span>• Parameterized SQL Injection Prevention</span>
          <span>• Strict Rate Limiting & DoS Mitigation</span>
          <span>• Single-Use Cryptographic Tokens</span>
        </div>
      </div>

      {/* Bug Bounty Program */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">Tadqiqotchilar Uchun</span>
          <h3 className="text-2xl font-bold text-white">Vulnerability Disclosure & Mas'uliyatli Xabar Berish</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Agar siz bizning tizimlarimizda xavfsizlik zaifligini aniqlasangiz, uni mas'uliyat bilan xavfsizlik xizmatimizga xabar qiling. 
            Biz har bir tasdiqlangan va asosli hisobotni ko'rib chiqamiz hamda munosib rag'batlantiramiz.
          </p>
        </div>

        <button
          onClick={() => navigate('/contact')}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs whitespace-nowrap transition-colors flex items-center gap-2"
        >
          Zaiflik haqida xabar berish <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
