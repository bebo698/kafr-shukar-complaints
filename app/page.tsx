"use client";
import React, { useState, useEffect } from 'react';
import { Send, FileText, User, CheckCircle, Mail, Lock, Headphones, ShieldCheck, QrCode } from 'lucide-react';

export default function ComplaintForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);

  // حماية من خطأ الـ Hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      nationalId: formData.get('nationalId'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      type: formData.get('requestType'),
      dept: formData.get('dept'),
      subject: formData.get('subject'),
      description: formData.get('description'),
      date: formData.get('date'),
    };

    try {
      // الرابط الجديد الخاص بك
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwJXkbz4O-hxlyb-1dWUD7q1ZSIGpBaNiVU_2tcTX2sYuvNo3h5haHvwR9RsNR0QLgF/exec'; 
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // ضروري جداً لتجنب مشاكل الـ CORS مع جوجل
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(data),
      });

      setSent(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      alert("حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4" dir="rtl">
        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center border-t-8 border-[#003366] max-w-md w-full">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#003366] mb-2">تم استلام شكواكم</h1>
          <p className="text-gray-600 font-bold mb-6">شكراً لتواصلك معنا. سيتم مراجعة طلبك والرد عليك عبر الواتساب فور تحديث الحالة.</p>
          <button onClick={() => setSent(false)} className="w-full bg-[#003366] text-white font-bold py-3 rounded-xl hover:bg-blue-900 transition-all shadow-lg">إرسال طلب جديد</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans pb-10 text-right" dir="rtl">
      
      {/* 1. الهيدر الرسمي (الشعارات يمين وشمال) */}
      <header className="bg-[#003366] border-b-4 border-yellow-500 shadow-2xl relative pt-8 pb-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-row justify-between items-center">
          
          {/* شعار اليمين */}
          <div className="flex flex-col items-center gap-2">
            <img src="/images.png" alt="شعار المحافظة" className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-lg" />
            <span className="text-white text-[10px] md:text-sm font-bold">محافظة القليوبية</span>
          </div>
          
          {/* العنوان في المنتصف */}
          <div className="text-center flex-1 px-4">
            <h1 className="text-white text-2xl md:text-5xl font-black mb-2 leading-tight">مجلس مدينة كفر شكر</h1>
            <p className="text-yellow-400 text-sm md:text-2xl font-bold italic tracking-wide">منظومة الشكاوى والمقترحات الإلكترونية</p>
            <div className="mt-6 inline-block bg-[#004080] text-white px-6 md:px-10 py-2 rounded-full border border-blue-400/50 shadow-inner italic text-xs md:text-lg font-bold">
              نحو خدمة أفضل... واستجابة أسرع
            </div>
          </div>

          {/* شعار الشمال */}
          <div className="flex flex-col items-center gap-2 text-center">
            <img src="/11.png" alt="شعار رئاسة المركز" className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-lg" />
            <span className="text-white text-[10px] md:text-sm font-bold leading-tight">رئاسة مركز ومدينة<br/>كفر شكر</span>
          </div>
        </div>
      </header>

      {/* 2. الصندوق الأبيض الرئيسي */}
      <main className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="flex flex-col md:flex-row">
            
            {/* سايد بار المعلومات (على اليمين) */}
            <div className="md:w-64 bg-slate-50 p-8 flex flex-col gap-8 border-l border-gray-100 items-start">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-700"><Lock size={20}/></div>
                <span className="text-xs font-bold text-gray-500">سرية تامة للبيانات</span>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-6">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-700"><Mail size={20}/></div>
                <span className="text-xs font-bold text-gray-500">إخطاركم برقم الشكوى</span>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-6">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-700"><ShieldCheck size={20}/></div>
                <span className="text-xs font-bold text-gray-500">الرد من الإدارة المختصة</span>
              </div>
            </div>

            {/* نص الترحيب */}
            <div className="flex-1 p-8 md:p-12">
              <h3 className="text-3xl font-black text-[#003366] mb-4 underline decoration-yellow-500 decoration-4 underline-offset-8">عزيزنا المواطن،</h3>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-bold">
                يررحب مجلس مدينة كفر شكر باستقبال شكاواكم ومقترحاتكم بهدف تحسين جودة الخدمات المقدمة. 
                نؤكد لكم أن جميع البيانات يتم التعامل معها بسرية تامة، وسيتم الرد عليكم في أقرب وقت ممكن.
              </p>
              <p className="text-red-600 font-bold text-sm mt-8 italic flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                الحقول التي تحمل علامة (*) إلزامية.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">
            
            {/* القسم الأول: بيانات مقدم الطلب */}
            <section className="space-y-8 text-right">
              <div className="flex justify-start">
                <div className="bg-[#003366] text-white px-10 py-3 rounded-l-full flex items-center gap-3 shadow-lg min-w-[320px]">
                  <User size={24}/>
                  <span className="text-xl font-bold">القسم الأول: بيانات مقدم الطلب</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2 text-right">
                  <label className="block text-sm font-black text-gray-700 pr-2">1. الاسم رباعي *</label>
                  <input name="name" required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50/50 font-bold text-right" placeholder="اكتب اسمك رباعي" />
                </div>
                <div className="space-y-2 text-right">
                  <label className="block text-sm font-black text-gray-700 pr-2">2. الرقم القومي *</label>
                  <input name="nationalId" maxLength={14} required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50 font-bold text-right" placeholder="14 رقم" />
                </div>
                <div className="space-y-2 text-right">
                  <label className="block text-sm font-black text-gray-700 pr-2">3. رقم الهاتف *</label>
                  <input name="phone" required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50 font-bold text-right" placeholder="2010xxxxxxxx" />
                </div>
                <div className="md:col-span-3 space-y-2 text-right">
                  <label className="block text-sm font-black text-gray-700 pr-2">4. العنوان بالتفصيل *</label>
                  <input name="address" required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50 font-bold text-right" placeholder="اكتب عنوانك بالتفصيل" />
                </div>
              </div>
            </section>

            {/* القسم الثاني: بيانات الشكوى */}
            <section className="space-y-8 text-right">
              <div className="flex justify-start">
                <div className="bg-[#003366] text-white px-10 py-3 rounded-l-full flex items-center gap-3 shadow-lg min-w-[320px]">
                  <FileText size={24}/>
                  <span className="text-xl font-bold">القسم الثاني: بيانات الشكوى</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2 text-right">
                  <label className="block text-sm font-black text-gray-700 pr-2">5. نوع الطلب *</label>
                  <div className="flex gap-8 py-3 px-4 bg-gray-50 rounded-xl">
                    {['شكوى', 'مقترح', 'استفسار'].map((t) => (
                      <label key={t} className="flex items-center gap-2 cursor-pointer font-bold text-[#003366]">
                        <input type="radio" name="requestType" value={t} defaultChecked={t==='شكوى'} className="w-5 h-5" /> {t}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-right">
                  <label className="block text-sm font-black text-gray-700 pr-2">6. الإدارة المختصة *</label>
                  <select name="dept" required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-bold text-right">
                    <option value="">اختر الإدارة</option>
                    <option>إدارة النظافة والبيئة</option>
                    <option>إدارة الإشغالات</option>
                    <option>الإدارة الهندسية</option>
                    <option>إدارة الطرق</option>
                  </select>
                </div>

                <div className="space-y-2 text-right">
                  <label className="block text-sm font-black text-gray-700 pr-2">7. عنوان الشكوى *</label>
                  <input name="subject" required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50 font-bold text-right" placeholder="عنوان مختصر" />
                </div>

                <div className="md:col-span-3 space-y-2 text-right">
                  <label className="block text-sm font-black text-gray-700 pr-2">8. وصف الشكوى بالتفصيل *</label>
                  <textarea name="description" rows={5} required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50 font-bold text-right" placeholder="يرجى كتابة التفاصيل بوضوح..."></textarea>
                </div>

                <div className="space-y-2 text-right">
                  <label className="block text-sm font-black text-gray-700 pr-2">9. تاريخ الواقعة</label>
                  <input name="date" type="date" className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50 font-bold text-right" />
                </div>
              </div>
            </section>

            {/* الإقرار */}
            <section className="bg-yellow-50 p-8 rounded-3xl border border-yellow-200 shadow-inner">
               <label className="flex items-start gap-4 cursor-pointer">
                  <input type="checkbox" required className="mt-1 w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-0" />
                  <span className="text-[#003366] font-black text-lg md:text-xl leading-relaxed underline decoration-yellow-500 decoration-4 underline-offset-8">
                    أقر بأن كافة البيانات الواردة صحيحة، وأوافق على استخدامها في إجراءات فحص الشكوى والرد عليها. *
                  </span>
               </label>
            </section>

            <button type="submit" disabled={loading} className="w-full md:w-[400px] mx-auto bg-[#003366] hover:bg-blue-900 text-white font-black py-5 rounded-full shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-4 text-2xl disabled:bg-gray-400">
               {loading ? "جاري الإرسال..." : "إرسال الشكوى الآن"}
            </button>
          </form>
        </div>

        {/* كود QR والختام */}
        <div className="mt-16 flex flex-col items-center gap-6 pb-20 text-center">
           <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center group hover:scale-105 transition-transform">
              <QrCode size={90} className="text-[#003366] mb-2" />
              <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">المسح للدخول للمنظومة</p>
           </div>
           <p className="text-4xl md:text-6xl font-black text-[#003366] italic underline decoration-yellow-500 decoration-8 underline-offset-[16px]">معاً نبني مدينة أفضل</p>
        </div>
      </main>

      <footer className="py-8 border-t border-gray-200 text-center text-gray-400 text-[10px] font-bold">
        © 2026 مجلس مدينة كفر شكر - منظومة الخدمات الرقمية المتكاملة
      </footer>
    </div>
  );
}