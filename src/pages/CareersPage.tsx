import React, { useState } from 'react';
import { JobPosition } from '../types';
import { CAREER_POSITIONS } from '../data/careers';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Send,
  Zap,
  Coffee,
  HeartPulse,
  Laptop,
  Loader2
} from 'lucide-react';
import { apiClient } from '../services/apiClient';
import { useToast } from '../context/ToastContext';

export const CareersPage: React.FC = () => {
  const { addToast } = useToast();
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantTelegram, setApplicantTelegram] = useState('');
  const [applicantResume, setApplicantResume] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await apiClient.applyJob({
        jobId: selectedJob.id,
        fullName: applicantName,
        email: applicantEmail,
        phone: applicantTelegram,
        portfolioUrl: applicantResume
      });
      setIsSuccess(true);
      addToast('Arizangiz muvaffaqiyatli qabul qilindi!', 'success');
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedJob(null);
        setApplicantName('');
        setApplicantEmail('');
        setApplicantTelegram('');
        setApplicantResume('');
      }, 3000);
    } catch (err: any) {
      addToast(err?.message || 'Ariza topshirishda xatolik yuz berdi.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-24 pb-24 pt-8">
      
      {/* Hero */}
      <section className="text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-mono mb-4">
          <Briefcase className="w-3.5 h-3.5" />
          Fentoph Karyera Markazi
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Biz Bilan Birga Kelajakni Quring
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          Biz eng iqtidorli muhandislar, dizaynerlar va tadqiqotchilarni 
          O'zbekistonda hamda global miqyosda jahon darajasidagi mahsulotlar yaratishga chorlaymiz.
        </p>
      </section>

      {/* Perks / Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Yuqori Maosh & Bonuslar', desc: 'Valyutada belgilangan raqobatbardosh oylik maosh va choraklik KPI bonuslar', icon: <DollarSign className="w-5 h-5 text-emerald-400" /> },
            { title: 'Moslashuvchan Ish Tartibi', desc: 'Xivadagi qulay ofis yoki xohishingizga ko\'ra gibrid / masofaviy ishlash', icon: <Laptop className="w-5 h-5 text-cyan-400" /> },
            { title: 'Eng So\'nggi Texnika', desc: 'Eng yangi Apple Silicon MacBook Pro va ish uchun zarur barcha zamonaviy uskunalar', icon: <Zap className="w-5 h-5 text-amber-400" /> },
            { title: 'Tibbiy Sug\'urta & Sog\'liq', desc: 'Xodim va uning oilasi uchun to\'liq qamrovli xususiy tibbiy sug\'urta paketi', icon: <HeartPulse className="w-5 h-5 text-red-400" /> },
          ].map((p, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mb-3">
                {p.icon}
              </div>
              <h4 className="text-sm font-bold text-white">{p.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">Bo'sh Ish O'rinlari</span>
          <h2 className="text-3xl font-extrabold text-white mt-1">Ochiq Vakansiyalar</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {CAREER_POSITIONS.map((job) => (
            <div
              key={job.id}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-cyan-400 text-xs font-mono border border-blue-500/20">
                    {job.department}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
                    {job.salary}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.type} • {job.experience}</span>
                </div>
                <p className="text-xs text-slate-300 max-w-2xl pt-1">{job.description}</p>
              </div>

              <button
                onClick={() => setSelectedJob(job)}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors self-start md:self-auto"
              >
                Ariza topshirish <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0e1625] border border-slate-700 p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Vakansiyaga Ariza</h3>
                <p className="text-xs text-cyan-400 font-mono mt-0.5">{selectedJob.title}</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isSuccess ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Arizangiz qabul qilindi!</h4>
                <p className="text-xs text-slate-400">
                  Fentoph HR jamoasi rezyumeingizni ko'rib chiqib, 24 soat ichida Telegram orqali siz bilan bog'lanadi.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">To'liq ism-familiyangiz:</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Sardor Aliyev"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Elektron pochta:</label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="sardor@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Telegram username:</label>
                    <input
                      type="text"
                      required
                      value={applicantTelegram}
                      onChange={(e) => setApplicantTelegram(e.target.value)}
                      placeholder="@username"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Portfolio yoki Rezyume havolasi (GitHub / LinkedIn / PDF):</label>
                  <input
                    type="url"
                    required
                    value={applicantResume}
                    onChange={(e) => setApplicantResume(e.target.value)}
                    placeholder="https://linkedin.com/in/... yoki github.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" /> Arizani yuborish
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
