import React from 'react';
import { useRouter } from '../context/RouterContext';
import { COMPANY_VALUES, TIMELINE, TEAM_MEMBERS, ECOSYSTEM_METRICS } from '../data/ecosystem';
import { 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Globe, 
  Rocket, 
  CheckCircle2, 
  ArrowRight,
  MapPin,
  Building2,
  Linkedin,
  Github,
  Award,
  Zap,
  Target,
  HeartHandshake
} from 'lucide-react';

interface AboutPageProps {
  setActiveTab?: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = () => {
  const { navigate } = useRouter();

  return (
    <div className="space-y-24 pb-24 pt-10 text-slate-100 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-cyan-500/10 to-indigo-600/15 blur-[130px] pointer-events-none rounded-full -z-10"></div>

      {/* Hero */}
      <section className="text-center max-w-4xl mx-auto px-4 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-cyan-400 text-xs font-mono shadow-sm">
          <Users className="w-3.5 h-3.5" />
          Fentoph Group Tarixi va Missiyasi
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Kelajak Texnologiyalarini Shakllantiruvchi Jamoa
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
          Bizning missiyamiz — murakkab moliyaviy, savdo va aloqa jarayonlarini 
          sun'iy intellekt va yuqori kiberxavfsizlik orqali soddalashtirish hamda har bir 
          inson va korxonaga erkinlik berishdir.
        </p>
      </section>

      {/* Ecosystem Metrics Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl backdrop-blur-md">
          {ECOSYSTEM_METRICS.map((m, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-2xl sm:text-4xl font-black text-white font-mono bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {m.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-cyan-400">{m.label}</div>
              <div className="text-[11px] text-slate-400">{m.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" /> Bizning Hikoyamiz
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Yagona G'oyadan Global Texnologik Ekotizimga
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Fentoph 2023-yilda yosh, shijoatli dasturchilar va moliya mutaxassislari jamoasi tomonidan tashkil etilgan. Dastlab biz Finilya loyihasi bilan kichik biznes va frilanserlar uchun hisob-kitobni osonlashtirishni boshlagan edik.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Tez orada tushundikki, tadbirkorlarga faqat moliya dasturi kifoya qilmaydi: ularga tovarlarini sotish uchun aqlli bozor (EskiBozor), maxfiy aloqa uchun tezkor xabarlar (Fsent) va avtomatlashtirish uchun kuchli AI yadrosi (Phentist) zarur edi.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Bugungi kunda Fentoph — bu barcha bu texnologiyalarni bitta xavfsiz hisob (Fentoph ID) ostida birlashtirgan mustahkam xoldingdir.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 p-2 bg-gradient-to-br from-blue-600/30 to-cyan-500/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                alt="Fentoph Team"
                className="w-full h-80 sm:h-96 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Asosiy Qadriyatlarimiz
          </span>
          <h2 className="text-3xl font-extrabold text-white">Prinsiplarimiz va Standartlarimiz</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {COMPANY_VALUES.map((val, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-cyan-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">{val.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership & Engineering Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Muhandislar va Rahbariyat
          </span>
          <h2 className="text-3xl font-extrabold text-white">Fentoph Jamoasi</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <div key={idx} className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 space-y-4 text-center hover:border-cyan-500/30 transition-all hover:-translate-y-1">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-2xl mx-auto object-cover border-2 border-cyan-500/20 shadow-md"
              />
              <div>
                <h3 className="font-bold text-white text-base">{member.name}</h3>
                <p className="text-xs text-cyan-400 font-mono mt-0.5">{member.role}</p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline (Roadmap) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Bosqichlar
          </span>
          <h2 className="text-3xl font-extrabold text-white">Fentoph Rivojlanish Xaritasi</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {TIMELINE.map((item, idx) => (
            <div key={idx} className="relative p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
              <span className="text-3xl font-black font-mono text-cyan-400">{item.year}</span>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Global Presence & Headquarters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
              Bosh Ofis va R&D Markaz
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Xivadan Butun Dunyoga
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Fentoph bosh ofisi va muhandislik markazi qadimiy va boy madaniyatga ega Xiva shahrida (Xorazm viloyati) joylashgan bo'lib, xalqaro bozorlar uchun yuqori texnologik yechimlarni ishlab chiqishga yo'naltirilgan.
            </p>
          </div>

          <button
            onClick={() => navigate('/contact')}
            className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm whitespace-nowrap transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/25"
          >
            Ofis bilan bog'lanish <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
