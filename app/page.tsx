"use client";
import React, { useState, useEffect } from 'react';
import { Send, FileText, User, CheckCircle, Mail, Lock, Headphones, ShieldCheck, QrCode } from 'lucide-react';

export default function ComplaintForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);

  // لمنع أخطاء الـ Hydration (التزامن بين السيرفر والمتصفح)
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
      // الرابط الجديد الذي أرسلته (نسخة الـ exec)
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwhkatHUsyN-Tu014AHsFs558ahKUDb47tIAHIQygfhxe9Q3dClHHlsjcbtS3F0wL_-/exec'; 
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // ضروري جداً عند الإرسال لجوجل سكريبت
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

  // شاشة النجاح
  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4" dir="rtl">
        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center border-t-8 border-[#003366] max-w-md w-full">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#003366] mb-2">تم الإرسال بنجاح</h1>
          <p className="text-gray-600 mb-6 font-bold leading-relaxed">شكراً لتواصلك معنا. تم تسجيل طلبك في منظومة شكاوى كفر شكر، وسيصلك رد عبر الواتساب فور تحديث الحالة من قبل الإدارة المختصة.</p>
          <button onClick={() => setSent(false)} className="w-full bg-[#003366] text-white font-bold py-3 rounded-xl hover:bg-blue-900 transition-colors">إرسال طلب آخر</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans pb-10 text-right" dir="rtl">
      
      {/* 1. الهيدر الرسمي - توزيع الشعارات يمين ووسط وشمال */}
      <header className="bg-[#003366] relative pt-8 pb-16 px-4 border-b-4 border-yellow-500 shadow-2xl">
        <div className="max-w-6xl mx-auto flex flex-row justify-between items-center">
          
          {/* شعار اليمين - images.png */}
          <div className="flex flex-col items-center gap-2">
            <img src="/images.png" alt="محافظة القليوبية" className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-lg" />
            <span className="text-white text-[10px] md:text-sm font-bold">محافظة القليوبية</span>
          </div>
          
          {/* العنوان المركزي */}
          <div className="text-center flex-1 px-4">
            <h1 className="text-white text-2xl md:text-5xl font-black mb-2 leading-tight">مجلس مدينة كفر شكر</h1>
            <p className="text-yellow-400 text-sm md:text-2xl font-bold italic">منظومة الشكاوى والمقترحات الإلكترونية</p>
            <div className="mt-6 inline-block bg-[#004080] text-white px-6 md:px-10 py-2 rounded-full border border-blue-400/50 shadow-inner italic text-xs md:text-lg font-bold">
              نحو خدمة أفضل... واستجابة أسرع
            </div>
          </div>

          {/* شعار الشمال - 11.png */}
          <div className="flex flex-col items-center gap-2 text-center">
            <img src="/11.png" alt="رئاسة المركز" className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-lg" />
            <span className="text-white text-[10px] md:text-sm font-bold leading-tight">رئاسة مركز ومدينة<br/>كفر شكر</span>
          </div>
        </div>
      </header>

      {/* 2. الصندوق الرئيسي - السايد بار اليمنى ونص الترحيب */}
      <main className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="flex flex-col md:flex-row">
            
            {/* سايد بار الأيقونات (على اليمين) */}
            <div className="md:w-64 bg-[#f8fafc] p-8 flex flex-col gap-8 border-l border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-700"><Lock size={20}/></div>
                <span className="text-xs font-bold text-gray-500">سرية تامة للبيانات</span>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-50 pt-6">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-700"><Mail size={20}/></div>
                <span className="text-xs font-bold text-gray-500">إخطاركم برقم الشكوى</span>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-50 pt-6">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-700"><ShieldCheck size={20}/></div>
                <span className="text-xs font-bold text-gray-500">الرد من الإدارة المختصة</span>
              </div>
            </div>

            {/* نص الترحيب */}
            <div className="flex-1 p-8 md:p-12">
              <h3 className="text-3xl font-black text-[#003366] mb-4 underline decoration-yellow-500 decoration-4 underline-offset-8">عزيزنا المواطن،</h3>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-bold">
                يرحب مجلس مدينة كفر شكر باستقبال شكاواكم ومقترحاتكم بهدف تحسين جودة الخدمات المقدمة. 
                سيتم التعامل مع جميع البيانات بسرية تامة، والرد على الشكوى في أقرب وقت ممكن.
              </p>
              <p className="text-red-600 font-bold text-sm mt-8 italic flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                الحقول التي تحمل علامة (*) إلزامية.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">
            
            {/* القسم الأول: بيانات مقدم الطلب */}
            <section className="space-y-8">
              <div className="flex justify-start">
                <div className="bg-[#003366] text-white px-10 py-3 rounded-l-full flex items-center gap-3 shadow-lg min-w-[320px]">
                  <User size={24}/>
                  <span className="text-xl font-bold">القسم الأول: بيانات مقدم الطلب</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-black">1. الاسم رباعي *</label>
                  <input name="name" required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50/50 font-bold" placeholder="اكتب اسمك رباعي" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-black">2. الرقم القومي *</label>
                  <input name="nationalId" maxLength={14} required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50 font-bold" placeholder="رقم 14 رقم" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-black">3. رقم الهاتف (واتساب) *</label>
                  <input name="phone" required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50 font-bold" placeholder="مثال: 01012345678" />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-black">4. العنوان بالتفصيل *</label>
                  <input name="address" required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50 font-bold" placeholder="اكتب عنوانك بالتفصيل" />
                </div>
              </div>
            </section>

            {/* القسم الثاني: بيانات الشكوى */}
            <section className="space-y-8">
              <div className="flex justify-start">
                <div className="bg-[#003366] text-white px-10 py-3 rounded-l-full flex items-center gap-3 shadow-lg min-w-[320px]">
                  <FileText size={24}/>
                  <span className="text-xl font-bold">القسم الثاني: بيانات الشكوى</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 font-black">5. نوع الطلب *</label>
                  <div className="flex gap-8 py-2">
                    {['شكوى', 'مقترح', 'استفسار'].map((t) => (
                      <label key={t} className="flex items-center gap-2 cursor-pointer font-bold text-[#003366]">
                        <input type="radio" name="requestType" value={t} defaultChecked={t==='شكوى'} className="w-5 h-5" /> {t}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-black">6. الإدارة المختصة *</label>
                  <select name="dept" required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-bold">
                    <option value="">اختر الإدارة المختصة</option>
                    <option>إدارة النظافة والبيئة</option>
                    <option>إدارة الإشغالات</option>
                    <option>الإدارة الهندسية</option>
                    <option>إدارة الطرق</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-black">7. عنوان الشكوى *</label>
                  <input name="subject" required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50 font-bold" placeholder="عنوان مختصر للشكوى" />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-black">8. وصف الشكوى بالتفصيل *</label>
                  <textarea name="description" rows={5} required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50 font-bold" placeholder="يرجى كتابة تفاصيل الشكوى بوضوح ودقة..."></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-black">9. تاريخ الواقعة</label>
                  <input name="date" type="date" className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50 font-bold text-right" />
                </div>
              </div>
            </section>

            {/* القسم الثالث: الإقرار */}
            <section className="bg-yellow-50 p-8 rounded-3xl border border-yellow-200 shadow-inner">
               <label className="flex items-start gap-4 cursor-pointer">
                  <input type="checkbox" required className="mt-1 w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-0" />
                  <span className="text-[#003366] font-black text-lg md:text-xl leading-relaxed underline decoration-yellow-500 underline-offset-8">
                    أقر بأن كافة البيانات الواردة صحيحة، وأوافق على استخدامها في إجراءات فحص الشكوى والرد عليها. *
                  </span>
               </label>
            </section>

            {/* زر الإرسال */}
            <div className="flex justify-center pt-8">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-[450px] bg-[#003366] hover:bg-blue-900 text-white font-black py-5 rounded-full shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-4 text-2xl disabled:bg-gray-400"
              >
                {loading ? "جاري الإرسال..." : (
                  <>
                    <Send size={24} className="rotate-[-45deg]"/> إرسال الشكوى
                  </>
                )}
              </button>
            </div>
            <p className="text-center text-gray-400 text-xs font-bold italic tracking-widest mt-4">جميع البيانات مشفرة وآمنة وفقاً لمعايير الخصوصية 🔒</p>
          </form>
        </div>

        {/* كود QR والختام */}
        <div className="mt-16 flex flex-col items-center gap-6 pb-20 text-center">
           <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center group hover:scale-105 transition-transform cursor-help">
              <QrCode size={90} className="text-[#003366] mb-2" />
              <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none">المسح للدخول للمنظومة</p>
           </div>
           <p className="text-4xl md:text-6xl font-black text-[#003366] italic underline decoration-yellow-500 decoration-8 underline-offset-[16px]">معاً نبني مدينة أفضل</p>
        </div>
      </main>

      <footer className="py-8 border-t border-gray-200 text-center text-gray-400 text-[10px] font-bold">
        © 2026 مجلس مدينة كفر شكر - محافظة القليوبية - منظومة الخدمات الرقمية
      </footer>
    </div>
  );
}