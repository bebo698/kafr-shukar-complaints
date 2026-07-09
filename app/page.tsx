"use client";
import React, { useState, useEffect } from 'react';
import { Send, FileText, User, CheckCircle, Mail, Lock, Headphones, ShieldCheck, QrCode } from 'lucide-react';

export default function ComplaintForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);

  // حماية من خطأ الـ Hydration لضمان توافق السيرفر مع المتصفح
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
      // رابط جوجل شيت الجديد الخاص بك
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwJXkbz4O-hxlyb-1dWUD7q1ZSIGpBaNiVU_2tcTX2sYuvNo3h5haHvwR9RsNR0QLgF/exec'; 
      
      // إرسال البيانات (استخدام text/plain يضمن تخطي مشاكل الـ CORS مع جوجل)
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(data),
      });

      setSent(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(error);
      alert("عذراً، حدث خطأ أثناء الإرسال. يرجى التأكد من اتصال الإنترنت والمحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4" dir="rtl">
        <div className="bg-white p-12 rounded-[2rem] shadow-2xl text-center border-t-8 border-[#003366] max-w-md w-full">
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-[#003366] mb-4">تم الاستلام بنجاح</h1>
          <p className="text-gray-600 font-bold text-lg leading-relaxed mb-8">نشكركم على ثقتكم.. تم تسجيل شكواكم في منظومة مجلس مدينة كفر شكر بنجاح. سيتم مراجعة الطلب وإفادتكم بالرد عبر الواتساب فوراً.</p>
          <button onClick={() => setSent(false)} className="w-full bg-[#003366] text-white font-black py-4 rounded-2xl shadow-xl hover:bg-blue-900 transition-all transform active:scale-95">إرسال طلب جديد</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7f9] font-sans pb-20 text-right" dir="rtl">
      
      {/* 1. الهيدر الرسمي - توزيع الشعارات يمين وشمال */}
      <header className="bg-[#003366] border-b-4 border-yellow-500 shadow-2xl relative pt-8 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-6xl mx-auto flex flex-row justify-between items-center relative z-10">
          
          {/* شعار اليمين - images.png */}
          <div className="flex flex-col items-center gap-2">
            <img src="/images.png" alt="شعار المحافظة" className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-xl" />
            <span className="text-white text-[10px] md:text-sm font-bold">محافظة القليوبية</span>
          </div>
          
          {/* العنوان المركزي */}
          <div className="text-center flex-1 px-4">
            <h1 className="text-white text-2xl md:text-5xl font-black mb-2 tracking-tight leading-tight">مجلس مدينة كفر شكر</h1>
            <p className="text-yellow-400 text-sm md:text-2xl font-bold italic tracking-wide">منظومة الشكاوى والمقترحات الإلكترونية</p>
            <div className="mt-6 inline-block bg-[#004080] text-white px-6 md:px-10 py-2 rounded-full border border-blue-400/50 shadow-inner italic text-xs md:text-lg font-bold">
              نحو خدمة أفضل... واستجابة أسرع
            </div>
          </div>

          {/* شعار الشمال - 11.png */}
          <div className="flex flex-col items-center gap-2 text-center">
            <img src="/11.png" alt="شعار رئاسة المركز" className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-xl" />
            <span className="text-white text-[10px] md:text-sm font-bold leading-tight">رئاسة مركز ومدينة<br/>كفر شكر</span>
          </div>
        </div>
      </header>

      {/* 2. الصندوق الأبيض الرئيسي - يضم السايد بار اليمنى */}
      <main className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="flex flex-col md:flex-row">
            
            {/* السايد بار اليمنى (أيقونات المعلومات) */}
            <div className="md:w-72 bg-slate-50 p-8 flex flex-col gap-10 border-l border-gray-100 items-start">
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-700 group-hover:bg-[#003366] group-hover:text-white transition-all"><Lock size={24}/></div>
                <span className="text-sm font-black text-gray-500">سرية تامة للبيانات</span>
              </div>
              <div className="flex items-center gap-4 group border-t border-gray-200 pt-8 w-full">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-700 group-hover:bg-[#003366] group-hover:text-white transition-all"><Mail size={24}/></div>
                <span className="text-sm font-black text-gray-500">إخطاركم برقم الشكوى</span>
              </div>
              <div className="flex items-center gap-4 group border-t border-gray-200 pt-8 w-full">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-700 group-hover:bg-[#003366] group-hover:text-white transition-all"><ShieldCheck size={24}/></div>
                <span className="text-sm font-black text-gray-500">الرد من الإدارة المختصة</span>
              </div>
            </div>

            {/* محتوى الترحيب */}
            <div className="flex-1 p-8 md:p-14">
              <h3 className="text-4xl font-black text-[#003366] mb-6 underline decoration-yellow-500 decoration-8 underline-offset-[12px]">عزيزنا المواطن،</h3>
              <p className="text-gray-600 text-xl leading-relaxed font-medium">
                يرحب مجلس مدينة كفر شكر باستقبال شكاواكم ومقترحاتكم بهدف تحسين جودة الخدمات المقدمة. 
                نؤكد لكم أن جميع البيانات يتم التعامل معها بسرية تامة، وسيتم الرد على سيادتكم في أقرب وقت ممكن.
              </p>
              <div className="mt-10 flex items-center gap-2 text-red-600 font-black text-sm p-3 bg-red-50 rounded-lg border border-red-100 w-fit">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                الحقول التي تحمل علامة (*) إلزامية.
              </div>
            </div>
          </div>

          {/* نموذج البيانات */}
          <form onSubmit={handleSubmit} className="p-8 md:p-14 pt-4 space-y-16">
            
            {/* القسم الأول: بيانات مقدم الطلب */}
            <section className="space-y-8">
              <div className="flex justify-start">
                <div className="bg-[#003366] text-white px-10 py-3 rounded-l-full flex items-center gap-4 shadow-lg min-w-[350px]">
                  <User size={28}/>
                  <span className="text-2xl font-bold uppercase tracking-wider">القسم الأول: بيانات مقدم الطلب</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="space-y-3">
                  <label className="block text-sm font-black text-gray-700 pr-2">1. الاسم رباعي *</label>
                  <input name="name" required className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all font-bold shadow-inner text-right" placeholder="اكتب اسمك رباعي كما في البطاقة" />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-black text-gray-700 pr-2">2. الرقم القومي *</label>
                  <input name="nationalId" maxLength={14} required className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none font-bold shadow-inner text-right" placeholder="14 رقم" />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-black text-gray-700 pr-2">3. رقم الهاتف (واتساب) *</label>
                  <input name="phone" required className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none font-bold shadow-inner text-right" placeholder="01012345678" />
                </div>
                <div className="md:col-span-3 space-y-3">
                  <label className="block text-sm font-black text-gray-700 pr-2">4. العنوان بالتفصيل *</label>
                  <input name="address" required className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none font-bold shadow-inner text-right" placeholder="القرية / المدينة - الشارع - رقم المنزل" />
                </div>
              </div>
            </section>

            {/* القسم الثاني: بيانات الشكوى */}
            <section className="space-y-8">
              <div className="flex justify-start">
                <div className="bg-[#003366] text-white px-10 py-3 rounded-l-full flex items-center gap-4 shadow-lg min-w-[350px]">
                  <FileText size={28}/>
                  <span className="text-2xl font-bold uppercase tracking-wider">القسم الثاني: بيانات الشكوى</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="space-y-3">
                  <label className="block text-sm font-black text-gray-700 pr-2">5. نوع الطلب المقدم *</label>
                  <div className="flex gap-10 p-5 bg-gray-50 rounded-2xl shadow-inner border border-gray-100">
                    {['شكوى', 'مقترح', 'استفسار'].map((t) => (
                      <label key={t} className="flex items-center gap-3 cursor-pointer font-black text-[#003366]">
                        <input type="radio" name="requestType" value={t} defaultChecked={t==='شكوى'} className="w-6 h-6 text-blue-600 focus:ring-0" /> {t}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-black text-gray-700 pr-2">6. الإدارة المختصة *</label>
                  <select name="dept" required className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none font-bold shadow-inner text-right appearance-none">
                    <option value="">اختر الإدارة المعنية</option>
                    <option>إدارة النظافة والبيئة</option>
                    <option>إدارة الإشغالات</option>
                    <option>إدارة الطرق والكباري</option>
                    <option>الإدارة الهندسية</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-black text-gray-700 pr-2">7. عنوان الموضوع *</label>
                  <input name="subject" required className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none font-bold shadow-inner text-right" placeholder="ملخص سريع لمحتوى الشكوى" />
                </div>

                <div className="md:col-span-3 space-y-3">
                  <label className="block text-sm font-black text-gray-700 pr-2">8. وصف الشكوى بالتفصيل *</label>
                  <textarea name="description" rows={6} required className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none font-bold shadow-inner text-right resize-none" placeholder="يرجى كتابة كافة التفاصيل لمساعدتنا في سرعة الحل..."></textarea>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-black text-gray-700 pr-2">9. تاريخ الواقعة</label>
                  <input name="date" type="date" className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none font-bold shadow-inner text-right" />
                </div>
              </div>
            </section>

            {/* القسم الثالث: الإقرار */}
            <section className="bg-yellow-50 p-10 rounded-[2.5rem] border-2 border-yellow-200 shadow-inner">
               <label className="flex items-start gap-6 cursor-pointer">
                  <input type="checkbox" required className="mt-1 w-8 h-8 rounded border-gray-300 text-blue-600 focus:ring-0" />
                  <span className="text-[#003366] font-black text-xl leading-relaxed md:text-2xl underline decoration-yellow-500 decoration-8 underline-offset-[14px]">
                    أقر بأن كافة البيانات الواردة صحيحة، وأوافق على استخدامها في إجراءات فحص الشكوى والرد عليها من قبل الجهات المختصة. *
                  </span>
               </label>
            </section>

            {/* زر الإرسال */}
            <div className="flex flex-col items-center gap-6 pt-10">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-[500px] bg-[#003366] hover:bg-blue-900 text-white font-black py-6 rounded-full shadow-[0_20px_50px_rgba(0,51,102,0.3)] transition-all transform hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-6 text-3xl disabled:bg-gray-400 disabled:scale-100"
              >
                {loading ? "جاري المعالجة..." : (
                  <>
                    <Send size={32} className="rotate-[-45deg]"/> إرسال الشكوى الآن
                  </>
                )}
              </button>
              <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">نظام آمن ومشفر بالكامل 🔒</p>
            </div>
          </form>
        </div>

        {/* كود QR والجملة الختامية */}
        <div className="mt-20 flex flex-col items-center gap-8 pb-20 text-center">
           <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col items-center group transition-all hover:border-blue-200">
              <QrCode size={110} className="text-[#003366] mb-3" />
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">بوابة شكاوى المواطنين الرقمية</p>
           </div>
           <h2 className="text-5xl md:text-7xl font-black text-[#003366] italic underline decoration-yellow-500 decoration-[12px] underline-offset-[20px] tracking-tighter">معاً نبني مدينة أفضل</h2>
        </div>
      </main>

      <footer className="py-10 border-t border-gray-200 text-center text-gray-400 text-xs font-bold bg-white">
        © 2026   م| عبدالرحمن المرشف على منظومة مجلس مدينة كفر شكر - منظومة التحول الرقمي بجمهورية مصر العربية
      </footer>
    </div>
  );
}