"use client";
import React, { useState, useEffect } from 'react';
import { Send, FileText, User, CheckCircle, Mail, Lock, Headphones, Search, MessageSquare, Heart, ShieldCheck, QrCode, Upload } from 'lucide-react';

export default function ComplaintForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);

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
      email: formData.get('email'),
      type: formData.get('requestType'),
      dept: formData.get('dept'),
      subject: formData.get('subject'),
      description: formData.get('description'),
      date: formData.get('date'),
    };

    try {
      // الرابط النهائي الخاص بك
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwh2Rt740Ab4DVOzmLqbd_etA8Q0wSaJLfToE5Z6GXM_1EAg-f5bdPcPlecsSyGp8TD/exec'; 
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data),
      });

      setSent(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      alert("حدث خطأ في الإرسال");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4" dir="rtl">
        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center border-t-8 border-[#003366] max-w-md w-full">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#003366] mb-2">تم الإرسال بنجاح</h1>
          <p className="text-gray-600 mb-6">تم تسجيل طلبكم بنجاح. سنوافيكم بالرد عبر الواتساب فور مراجعة الإدارة المختصة.</p>
          <button onClick={() => setSent(false)} className="w-full bg-[#003366] text-white font-bold py-3 rounded-lg hover:bg-blue-900 transition-colors">إرسال طلب آخر</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans pb-10 text-right" dir="rtl">
      
      {/* 1. Header Section - مطابق تماماً للصورة (يمين - وسط - شمال) */}
      <header className="bg-[#003366] relative pt-8 pb-16 px-4 border-b-4 border-yellow-500 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-row justify-between items-center">
          {/* شعار اليمين (images.png) */}
          <div className="flex flex-col items-center gap-2">
            <img src="/images.png" alt="لوجو المحافظة" className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-md" />
            <span className="text-white text-[10px] md:text-sm font-bold">محافظة القليوبية</span>
          </div>
          
          {/* العنوان المركزي */}
          <div className="text-center flex-1 px-4">
            <h1 className="text-white text-2xl md:text-5xl font-extrabold mb-2 leading-tight">مجلس مدينة كفر شكر</h1>
            <p className="text-yellow-500 text-base md:text-2xl font-bold">منظومة الشكاوى والمقترحات الإلكترونية</p>
            <div className="mt-6 inline-flex items-center bg-[#004080] text-white px-6 md:px-10 py-2 rounded-full border border-blue-400/50 shadow-inner italic text-xs md:text-lg font-medium">
              نحو خدمة أفضل... واستجابة أسرع
            </div>
          </div>

          {/* شعار الشمال (11.png) */}
          <div className="flex flex-col items-center gap-2 text-center">
            <img src="/11.png" alt="لوجو المركز" className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-md" />
            <span className="text-white text-[10px] md:text-sm font-bold leading-tight">رئاسة مركز ومدينة<br/>كفر شكر</span>
          </div>
        </div>
      </header>

      {/* 2. Main Box - الصندوق اللي فيه السايد بار اليمنى */}
      <main className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="flex flex-col md:flex-row">
            
            {/* سايد بار الأيقونات (على اليمين في RTL) */}
            <div className="md:w-64 bg-[#f8fafc] p-8 flex flex-col gap-8 border-l border-gray-100 items-start">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-xl shadow-sm text-blue-700"><Lock size={20}/></div>
                <span className="text-xs font-bold text-gray-500">سرية تامة للبيانات</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-xl shadow-sm text-blue-700"><Mail size={20}/></div>
                <span className="text-xs font-bold text-gray-500">إخطاركم برقم الشكوى</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-xl shadow-sm text-blue-700"><Headphones size={20}/></div>
                <span className="text-xs font-bold text-gray-500">الرد من الإدارة المختصة</span>
              </div>
            </div>

            {/* نص الترحيب (على اليسار في RTL) */}
            <div className="flex-1 p-8 md:p-12 text-right">
              <h3 className="text-3xl font-bold text-[#003366] mb-4">عزيزنا المواطن،</h3>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium mb-6">
                يرحب مجلس مدينة كفر شكر باستقبال شكاواكم ومقترحاتكم بهدف تحسين جودة الخدمات المقدمة. 
                سيتم التعامل مع جميع البيانات بسرية تامة، والرد على الشكوى في أقرب وقت ممكن.
              </p>
              <p className="text-red-600 font-bold text-sm border-t border-gray-50 pt-4 italic">الحقول التي تحمل علامة (*) إلزامية.</p>
            </div>
          </div>

          {/* الفورم الفعلي */}
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
                  <label className="block text-sm font-bold text-gray-700 mb-2">1. الاسم رباعي *</label>
                  <input name="name" required className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50/50" placeholder="اكتب اسمك رباعي" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">2. الرقم القومي *</label>
                  <input name="nationalId" maxLength={14} required className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50" placeholder="رقم 14 رقم" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">3. رقم الهاتف (واتساب) *</label>
                  <input name="phone" required className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50" placeholder="مثال: 01012345678" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">4. البريد الإلكتروني *</label>
                  <input name="email" type="email" required className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50" placeholder="example@email.com" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">5. العنوان</label>
                  <input name="address" className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50" placeholder="اكتب عنوانك بالتفصيل" />
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
                <div className="md:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-3">6. نوع الطلب *</label>
                  <div className="flex gap-8 py-2">
                    {['شكوى', 'مقترح', 'استفسار'].map((t) => (
                      <label key={t} className="flex items-center gap-2 cursor-pointer font-bold text-[#003366]">
                        <input type="radio" name="requestType" value={t} defaultChecked={t==='شكوى'} className="w-5 h-5" /> {t}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">7. الإدارة المختصة *</label>
                  <select name="dept" required className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white font-bold">
                    <option value="">اختر الإدارة المختصة</option>
                    <option>إدارة النظافة والبيئة</option>
                    <option>إدارة الإشغالات</option>
                    <option>الإدارة الهندسية</option>
                    <option>إدارة الطرق</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">8. عنوان الشكوى *</label>
                  <input name="subject" required className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50" placeholder="عنوان الشكوى" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">9. مكان الشكوى *</label>
                  <input name="location" required className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50" placeholder="حدد مكان حدوث المشكلة" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">11. تاريخ الواقعة</label>
                  <input name="date" type="date" className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50 text-right" />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-sm font-bold text-gray-700 mb-2">10. وصف الشكوى بالتفصيل *</label>
                  <textarea name="description" rows={5} required className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50" placeholder="يرجى كتابة تفاصيل الشكوى بوضوح..."></textarea>
                </div>
              </div>

              {/* حقل إرفاق الملفات */}
              <div className="mt-8">
                <label className="block text-sm font-bold text-gray-700 mb-2">12. إرفاق صور أو مستندات (اختياري)</label>
                <div className="border-2 border-dashed border-blue-200 rounded-2xl p-10 text-center bg-gray-50 flex flex-col items-center gap-3 cursor-pointer hover:bg-blue-50 transition-all group">
                  <div className="bg-blue-600 text-white p-3 rounded-full group-hover:scale-110 transition-transform"><Upload size={28}/></div>
                  <p className="text-[#003366] font-bold text-lg">اضغط هنا لرفع الملفات</p>
                  <p className="text-gray-400 text-xs italic">يمكنك رفع أكثر من ملف (صور - مستندات - فيديو) | الحد الأقصى 10 ميجابايت</p>
                </div>
              </div>
            </section>

            {/* القسم الثالث: الإقرار */}
            <section className="bg-white pt-6">
              <div className="flex justify-start mb-6">
                <div className="bg-[#003366] text-white px-10 py-3 rounded-l-full flex items-center gap-3 shadow-lg min-w-[320px]">
                  <ShieldCheck size={24}/>
                  <span className="text-xl font-bold">القسم الثالث: الإقرار</span>
                </div>
              </div>
              <label className="flex items-center gap-4 cursor-pointer bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <input type="checkbox" required className="w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-0" />
                <span className="text-[#003366] font-bold text-lg leading-relaxed underline-offset-4">
                  أقر بأن كافة البيانات الواردة صحيحة، وأوافق على استخدامها في إجراءات فحص الشكوى والرد عليها. *
                </span>
              </label>
            </section>

            {/* زر الإرسال */}
            <div className="flex justify-center pt-8">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-[400px] bg-[#003366] hover:bg-blue-900 text-white font-black py-5 rounded-2xl shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4 text-2xl disabled:bg-gray-400"
              >
                {loading ? "جاري الإرسال..." : (
                  <>
                    <Send size={24} className="rotate-[-45deg]"/> إرسال الشكوى
                  </>
                )}
              </button>
            </div>
            <p className="text-center text-gray-400 text-xs font-bold">جميع البيانات محمية ومؤمنة 🔒</p>
          </form>
        </div>

        {/* الفوتر بالأيقونات */}
        <div className="mt-12 bg-[#003366] text-white rounded-[2.5rem] p-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center items-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-blue-400/30">
            <div className="flex flex-col items-center gap-2 py-4">
               <Mail size={24} className="text-yellow-400 mb-1"/>
               <p className="text-sm font-bold uppercase tracking-wide">نستقبل شكواك</p>
               <p className="text-[10px] opacity-70">على مدار الساعة</p>
            </div>
            <div className="flex flex-col items-center gap-2 py-4">
               <Search size={24} className="text-yellow-400 mb-1"/>
               <p className="text-sm font-bold uppercase tracking-wide">نراجع وندرس</p>
               <p className="text-[10px] opacity-70">الشكاوى بدقة</p>
            </div>
            <div className="flex flex-col items-center gap-2 py-4">
               <MessageSquare size={24} className="text-yellow-400 mb-1"/>
               <p className="text-sm font-bold uppercase tracking-wide">نتواصل معك</p>
               <p className="text-[10px] opacity-70">لإطلاعك على المستجدات</p>
            </div>
            <div className="flex flex-col items-center gap-2 py-4">
               <Heart size={24} className="text-yellow-400 mb-1"/>
               <p className="text-sm font-bold uppercase tracking-wide">نعمل من أجلك</p>
               <p className="text-[10px] opacity-70">من أجل خدمة أفضل</p>
            </div>
          </div>
        </div>

        {/* QR Code والختام */}
        <div className="mt-12 flex flex-col items-center gap-6 pb-20 text-center">
           <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center group hover:scale-105 transition-transform">
              <QrCode size={90} className="text-[#003366] mb-2" />
              <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">المسح للدخول للمنظومة</p>
           </div>
           <p className="text-4xl font-black text-[#003366] italic underline decoration-yellow-500 decoration-8 underline-offset-[12px]">معاً نبني مدينة أفضل</p>
        </div>
      </main>

      <footer className="py-6 border-t border-gray-200 text-center text-gray-400 text-[10px] font-bold">
        © 2026 مجلس مدينة كفر شكر - منظومة الخدمات الرقمية المتكاملة
      </footer>
    </div>
  );
}