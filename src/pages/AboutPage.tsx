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
  Building2
} from 'lucide-react';

interface AboutPageProps {
  setActiveTab?: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = () => {
  const { navigate } = useRouter();

  return (
    <div className="space-y-24 pb-24 pt-8">
      
      {/* Hero */}
      <section className="text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-mono mb-4">
          <Users className="w-3.5 h-3.5" />
          Fentoph Group Tarixi va Missiyasi
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Kelajak Texnologiyalarini Shakllantiruvchi Jamoa
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          Bizning missiyamiz — murakkab moliyaviy, savdo va aloqa jarayonlarini 
          sun'iy intellekt va yuqori xavfsizlik orqali soddalashtirish hamda har bir 
          inson va korxonaga erkinlik berishdir.
        </p>
      </section>

      {/* Metrics Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
          {ECOSYSTEM_METRICS.map((m, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-white font-mono">{m.value}</div>
              <div className="text-xs sm:text-sm font-semibold text-cyan-400">{m.label}</div>
              <div className="text-[11px] text-slate-500">{m.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">Bizning Hikoyamiz</span>
            <h2 className="text-3xl font-extrabold text-white">
              Yagona G'oyadan Global Ekotizimga
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
            <div className="relative rounded-3xl overflow-hidden border border-slate-700 p-2 bg-gradient-to-br from-blue-600/30 to-cyan-500/30">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                alt="Fentoph Team"
                className="w-full h-80 sm:h-96 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline (Roadmap) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">Bosqichlar</span>
          <h2 className="text-3xl font-extrabold text-white mt-1">Fentoph Rivojlanish Xaritasi</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {TIMELINE.map((item, idx) => (
            <div key={idx} className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <span className="text-3xl font-black font-mono text-cyan-400">{item.year}</span>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">Rahbariyat</span>
          <h2 className="text-3xl font-extrabold text-white mt-1">Fentoph Yetakchilari</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <div key={idx} className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden space-y-4 pb-6">
              <div className="h-56 w-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-5 space-y-1">
                <h4 className="text-base font-bold text-white">{member.name}</h4>
                <div className="text-xs text-cyan-400 font-mono">{member.role}</div>
                <p className="text-xs text-slate-400 pt-1 line-clamp-2">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
