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
          <p className="text-gray-600 mb-6">شكراً لتواصلك معنا، تم تسجيل طلبك بنجاح وسنوافيك بالرد عبر الواتساب.</p>
          <button onClick={() => setSent(false)} className="w-full bg-[#003366] text-white font-bold py-3 rounded-lg hover:bg-blue-900 transition-colors">إرسال طلب آخر</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans pb-10 text-right" dir="rtl">
      
      {/* 1. Header Section - مطابق تماماً للصورة */}
      <header className="bg-[#003366] relative pt-8 pb-16 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-start">
          <div className="flex flex-col items-center gap-2">
            <img src="/images.png" alt="Logo Right" className="w-24 h-24 object-contain shadow-lg rounded-full bg-white p-1" />
            <span className="text-white text-xs font-bold">محافظة القليوبية</span>
          </div>
          
          <div className="text-center flex-1 pt-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-2">مجلس مدينة كفر شكر</h1>
            <p className="text-yellow-500 text-lg md:text-2xl font-bold">منظومة الشكاوى والمقترحات الإلكترونية</p>
            <div className="mt-6 inline-flex items-center bg-[#1a4a7a] text-white px-8 py-2 rounded-full border border-blue-400 shadow-inner italic text-sm md:text-base font-medium">
              نحو خدمة أفضل... واستجابة أسرع
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <img src="/11.png" alt="Logo Left" className="w-24 h-24 object-contain shadow-lg rounded-full bg-white p-1" />
            <span className="text-white text-xs font-bold leading-tight">رئاسة مركز ومدينة<br/>كفر شكر</span>
          </div>
        </div>
      </header>

      {/* 2. Welcome Box - الأبيض اللي فيه السايد بار */}
      <main className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="flex flex-col md:flex-row">
            {/* سايد بار أيقونات اليمين */}
            <div className="md:w-64 bg-[#f8fafc] p-6 flex flex-col gap-6 border-l border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded text-[#003366]"><Lock size={18}/></div>
                <span className="text-xs font-bold text-gray-500">سرية تامة للبيانات</span>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="p-2 bg-blue-100 rounded text-[#003366]"><Mail size={18}/></div>
                <span className="text-xs font-bold text-gray-500">إخطاركم برقم الشكوى</span>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="p-2 bg-blue-100 rounded text-[#003366]"><Headphones size={18}/></div>
                <span className="text-xs font-bold text-gray-500">الرد من الإدارة المختصة</span>
              </div>
            </div>

            {/* نص الترحيب */}
            <div className="flex-1 p-8 md:p-12">
              <h3 className="text-2xl font-bold text-[#003366] mb-4">عزيزنا المواطن،</h3>
              <p className="text-gray-600 text-lg leading-relaxed font-medium mb-6">
                يرحب مجلس مدينة كفر شكر باستقبال شكاواكم ومقترحاتكم بهدف تحسين جودة الخدمات المقدمة. 
                سيتم التعامل مع جميع البيانات بسرية تامة، والرد على الشكوى في أقرب وقت ممكن.
              </p>
              <p className="text-red-500 text-sm font-bold border-t border-gray-50 pt-4 italic">الحقول التي تحمل علامة (*) إلزامية.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12 bg-white">
            
            {/* القسم الأول: بيانات مقدم الطلب */}
            <section className="space-y-6">
              <div className="flex justify-end">
                <div className="bg-[#003366] text-white px-8 py-2 rounded-r-full flex items-center gap-3 shadow-md min-w-[280px]">
                  <User size={20}/>
                  <span className="font-bold">القسم الأول: بيانات مقدم الطلب</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">1. الاسم رباعي *</label>
                  <input name="name" required className="w-full p-3 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 outline-none transition bg-[#fcfcfc]" placeholder="اكتب اسمك رباعي" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">2. الرقم القومي *</label>
                  <input name="nationalId" maxLength={14} required className="w-full p-3 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-[#fcfcfc]" placeholder="رقم 14 رقم" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">3. رقم الهاتف *</label>
                  <input name="phone" required className="w-full p-3 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-[#fcfcfc]" placeholder="مثال: 01012345678" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">4. البريد الإلكتروني *</label>
                  <input name="email" type="email" required className="w-full p-3 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-[#fcfcfc]" placeholder="example@email.com" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">5. العنوان</label>
                  <input name="address" className="w-full p-3 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-[#fcfcfc]" placeholder="اكتب عنوانك بالتفصيل" />
                </div>
              </div>
            </section>

            {/* القسم الثاني: بيانات الشكوى */}
            <section className="space-y-6">
              <div className="flex justify-end">
                <div className="bg-[#003366] text-white px-8 py-2 rounded-r-full flex items-center gap-3 shadow-md min-w-[280px]">
                  <FileText size={20}/>
                  <span className="font-bold">القسم الثاني: بيانات الشكوى</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-3">6. نوع الطلب *</label>
                  <div className="flex gap-6">
                    {['شكوى', 'مقترح', 'استفسار'].map((t) => (
                      <label key={t} className="flex items-center gap-2 cursor-pointer font-bold text-gray-600">
                        <input type="radio" name="requestType" value={t} defaultChecked={t==='شكوى'} className="w-4 h-4 text-blue-600" /> {t}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">7. الإدارة المختصة *</label>
                  <select name="dept" required className="w-full p-3 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white font-bold">
                    <option value="">اختر الإدارة المختصة</option>
                    <option>إدارة النظافة والبيئة</option>
                    <option>إدارة الإشغالات</option>
                    <option>الإدارة الهندسية</option>
                    <option>إدارة الطرق</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">8. عنوان الشكوى *</label>
                  <input name="subject" required className="w-full p-3 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-[#fcfcfc]" placeholder="اكتب عنوان مختصر للشكوى" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">9. مكان الشكوى *</label>
                  <input name="location" required className="w-full p-3 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-[#fcfcfc]" placeholder="حدد مكان حدوث المشكلة" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">11. تاريخ الواقعة</label>
                  <input name="date" type="date" className="w-full p-3 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-[#fcfcfc] text-right" />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-sm font-bold text-gray-700 mb-2">10. وصف الشكوى بالتفصيل *</label>
                  <textarea name="description" rows={4} required className="w-full p-3 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-[#fcfcfc]" placeholder="يرجى كتابة تفاصيل الشكوى بشكل واضح ودقيق..."></textarea>
                </div>
              </div>

              {/* حقل إرفاق الملفات - مظهر مطابق للصورة */}
              <div className="mt-8">
                <label className="block text-sm font-bold text-gray-700 mb-2">12. إرفاق صور أو مستندات (اختياري)</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50 flex flex-col items-center gap-2 cursor-pointer hover:bg-blue-50 transition-colors">
                  <div className="bg-blue-600 text-white p-2 rounded-full"><Upload size={24}/></div>
                  <p className="text-blue-700 font-bold">اضغط هنا لرفع الملفات</p>
                  <p className="text-gray-400 text-[10px]">يمكنك رفع أكثر من ملف (صور - مستندات - فيديو) | الحد الأقصى لحجم الملف 10 ميجابايت</p>
                </div>
              </div>
            </section>

            {/* القسم الثالث: الإقرار */}
            <section className="bg-white border-t border-gray-100 pt-8">
              <div className="flex justify-end mb-6">
                <div className="bg-[#003366] text-white px-8 py-2 rounded-r-full flex items-center gap-3 shadow-md min-w-[280px]">
                  <CheckCircle size={20}/>
                  <span className="font-bold">القسم الثالث: الإقرار</span>
                </div>
              </div>
              <label className="flex items-center gap-4 cursor-pointer bg-blue-50 p-6 rounded-lg border border-blue-100 group">
                <input type="checkbox" required className="w-6 h-6 rounded border-gray-300 focus:ring-0" />
                <span className="text-[#003366] font-bold text-lg md:text-xl group-hover:text-blue-900 transition-colors underline-offset-4">
                  أقر بأن البيانات الواردة صحيحة، وأوافق على استخدامها في إجراءات فحص الشكوى والرد عليها. *
                </span>
              </label>
            </section>

            {/* زر الإرسال النهائي */}
            <div className="text-center pt-8">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-[350px] bg-[#003366] hover:bg-blue-900 text-white font-black py-4 rounded-xl shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 text-2xl disabled:bg-gray-400"
              >
                {loading ? "جاري الإرسال..." : (
                  <>
                    <Send size={24} className="rotate-[-45deg]"/> إرسال الشكوى
                  </>
                )}
              </button>
              <p className="mt-4 text-gray-400 text-xs font-bold flex items-center justify-center gap-1">جميع البيانات محمية وآمنة 🔒</p>
            </div>
          </form>
        </div>

        {/* فوتر الأيقونات مطابق للصورة */}
        <div className="mt-12 bg-[#003366] text-white rounded-2xl p-6 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center items-center">
            <div className="flex items-center justify-center gap-3 p-2 border-l border-blue-400/30">
               <div className="border border-blue-400 p-2 rounded-full"><Mail size={20}/></div>
               <div><p className="text-[10px] font-bold">نستقبل شكواك</p><p className="text-[8px] opacity-70">على مدار الساعة</p></div>
            </div>
            <div className="flex items-center justify-center gap-3 p-2 border-l border-blue-400/30">
               <div className="border border-blue-400 p-2 rounded-full"><Search size={20}/></div>
               <div><p className="text-[10px] font-bold">نراجع وندرس</p><p className="text-[8px] opacity-70">الشكاوى بدقة</p></div>
            </div>
            <div className="flex items-center justify-center gap-3 p-2 border-l border-blue-400/30">
               <div className="border border-blue-400 p-2 rounded-full"><Headphones size={20}/></div>
               <div><p className="text-[10px] font-bold">نتواصل معك</p><p className="text-[8px] opacity-70">لإطلاعك على المستجدات</p></div>
            </div>
            <div className="flex items-center justify-center gap-3 p-2">
               <div className="border border-blue-400 p-2 rounded-full"><Heart size={20}/></div>
               <div><p className="text-[10px] font-bold">نعمل من أجلك</p><p className="text-[8px] opacity-70">من أجل خدمة أفضل</p></div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
           <div className="bg-white p-4 rounded shadow-xl border border-gray-100 flex flex-col items-center">
              <QrCode className="w-20 h-20 text-[#003366] mb-1" />
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">المسح الكود للدخول للنموذج</p>
           </div>
           <p className="text-3xl font-black text-[#003366] italic tracking-tighter">معاً نبني مدينة أفضل</p>
        </div>
      </main>

      <footer className="mt-10 py-6 border-t border-gray-200 text-center text-gray-400 text-[10px] font-bold">
        © 2026 مجلس مدينة كفر شكر - منظومة الشكاوى الرقمية
      </footer>
    </div>
  );
}