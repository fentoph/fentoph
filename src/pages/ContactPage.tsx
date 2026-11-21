import React, { useState } from 'react';
import { FAQS_DATA } from '../data/faqs';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  Clock,
  Globe2,
  Loader2
} from 'lucide-react';
import { apiClient } from '../services/apiClient';
import { useToast } from '../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { addToast } = useToast();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Hamkorlik va Mahsulotlar');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await apiClient.submitContact({ name, email, subject, message });
      setSubmitted(true);
      addToast('Murojaatingiz qabul qilindi. Tez orada bog\'lanamiz!', 'success');
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setMessage('');
      }, 5000);
    } catch (err: any) {
      addToast(err?.message || 'Xabar yuborishda xatolik yuz berdi.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-24 pb-24 pt-8">
      
      {/* Header */}
      <section className="text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-mono mb-4">
          <PhoneCall className="w-3.5 h-3.5" />
          Muloqot va Qo'llab-quvvatlash
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Biz Bilan Bog'laning
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          Savollaringiz bormi yoki biznes hamkorlik o'rnatmoqchimisiz? 
          Bizning mutaxassislarimiz sizga 24/7 yordam berishga tayyor.
        </p>
      </section>

      {/* Grid: Contact Info + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white">Bosh Ofis Ma'lumotlari</h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Fentoph Group HQ:</span>
                    Xiva shahri, Xorazm viloyati, Ichan Qal'a / IT Park Xiva Markazi
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Elektron pochta:</span>
                    <a href="mailto:info@fentoph.com" className="text-cyan-400 hover:underline">info@fentoph.com</a> (Umumiy)<br />
                    <a href="mailto:dev@fentoph.com" className="text-cyan-400 hover:underline">dev@fentoph.com</a> (Dasturchilar)
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <PhoneCall className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Telefon:</span>
                    +998 (71) 200-88-99
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Ish vaqti:</span>
                    Dushanba — Shanba: 09:00 - 19:00 (Qo'llab-quvvatlash 24/7)
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div className="pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Operatorlarimiz hozir onlayn. O'rtacha javob vaqti: 4 daqiqa.
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-900/80 border border-slate-800 p-8 sm:p-10 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">To'g'ridan-to'g'ri Xabar Yuborish</h3>
            <p className="text-xs text-slate-400 mb-6">
              Murojaatingiz tegishli bo'limga lahzada yetkaziladi.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Xabaringiz muvaffaqiyatli yetkazildi!</h4>
                <p className="text-xs text-slate-300">
                  Fentoph mutaxassisi tez orada ko'rsatilgan elektron pochta orqali javob qaytaradi.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Ismingiz:</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Sardor"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Elektron pochta:</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="siz@pochta.uz"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Mavzu:</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Hamkorlik va Mahsulotlar">Biznes Hamkorlik va Ekotizimga Ulanish</option>
                    <option value="Finilya Yordam">Finilya bo'yicha savol yoki yordam</option>
                    <option value="EskiBozor Sotuvchi">EskiBozor platformasida do'kon ochish</option>
                    <option value="Fsent Korporativ">Fsent korporativ server o'rnatish</option>
                    <option value="Phentist AI">Phentist AI API integratsiyasi</option>
                    <option value="Boshqa">Boshqa taklif yoki savol</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Xabar matni:</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Qanday yordam bera olamiz? Batafsil yozing..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Yuborilmoqda...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Xabarni Yuborish
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-mono uppercase">
            <HelpCircle className="w-4 h-4" /> Ko'p Beriladigan Savollar
          </div>
          <h2 className="text-3xl font-extrabold text-white">Tez-tez So'raladigan Savollar (FAQ)</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Fentoph ekotizimi, Fentoph hisobi va mahsulotlar bo'yicha eng muhim ma'lumotlar.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:text-cyan-300 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-slate-800">
                      {faq.category}
                    </span>
                    {faq.question}
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
