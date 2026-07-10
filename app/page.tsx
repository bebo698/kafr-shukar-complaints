"use client";
import React, { useState, useEffect } from 'react';
import { Send, FileText, User, CheckCircle, Mail, Lock, ShieldCheck, QrCode, Camera, Upload } from 'lucide-react';

export default function ComplaintForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    // وظيفة تحويل الصورة لـ Base64 لرفعها للدرايف
    const toBase64 = (file: File) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString().split(',')[1]);
      reader.onerror = error => reject(error);
    });

    try {
      // 1. إضافة البيانات النصية
      params.append('name', formData.get('name') as string);
      params.append('nationalId', formData.get('nationalId') as string);
      params.append('phone', formData.get('phone') as string);
      params.append('address', formData.get('address') as string);
      params.append('requestType', formData.get('requestType') as string);
      params.append('dept', formData.get('dept') as string);
      params.append('subject', formData.get('subject') as string);
      params.append('description', formData.get('description') as string);
      params.append('date', formData.get('date') as string);

      // 2. معالجة الصور (البطاقة والشكوى)
      const idFile = formData.get('idPhoto') as File;
      const compFile = formData.get('complaintPhoto') as File;
      
      if (idFile && idFile.size > 0) {
        const b64 = await toBase64(idFile);
        params.append('idPhoto', b64 as string);
      }
      if (compFile && compFile.size > 0) {
        const b64 = await toBase64(compFile);
        params.append('complaintPhoto', b64 as string);
      }

      // الرابط الجديد الذي أرسلته
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwj-Vwmghy20vkXOaiWFuig4awAIU6x202y_V0S7FPlwnrTRuPJb0ljSf_dqLb6jEfx/exec'; 
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      setSent(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(error);
      alert("عذراً، حدث خطأ أثناء الإرسال. تأكد من حجم الصور وحاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4" dir="rtl">
        <div className="bg-white p-12 rounded-[2rem] shadow-2xl text-center border-t-8 border-[#003366] max-w-md w-full">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
          <h1 className="text-3xl font-black text-[#003366] mb-4">تم تسجيل الشكوى</h1>
          <p className="text-gray-600 font-bold mb-8 text-xl">ستصلك رسالة تأكيد الآن على الواتساب. شكراً لتواصلك معنا.</p>
          <button onClick={() => setSent(false)} className="w-full bg-[#003366] text-white py-4 rounded-2xl font-black text-xl">تقديم طلب جديد</button>
        </div>
      </div>
    );
  }

  // كلاس الحقول (خط أسود سميك)
  const inputClass = "w-full p-5 bg-slate-50 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-black placeholder:font-normal placeholder:text-gray-400";

  return (
    <div className="min-h-screen bg-[#f4f7f9] text-right pb-20" dir="rtl">
      <header className="bg-[#003366] pt-12 pb-20 px-6 text-center border-b-4 border-yellow-500 shadow-xl">
        <h1 className="text-white text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight">منظومة شكاوى مجلس مدينة كفر شكر</h1>
        <div className="bg-yellow-400 text-[#003366] inline-block px-8 py-2 rounded-full font-black italic shadow-lg">نحن هنا لخدمتكم</div>
      </header>

      <main className="max-w-6xl mx-auto px-4 -mt-12">
        <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-16 space-y-16 border border-gray-100">
          
          {/* القسم الأول: بيانات مقدم الطلب */}
          <section className="space-y-10">
             <div className="flex items-center gap-4 border-r-8 border-[#003366] pr-4">
                <User size={32} className="text-[#003366]" />
                <h2 className="text-3xl font-black text-[#003366]">أولاً: بيانات مقدم الطلب</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                   <label className="font-bold text-gray-700 block pr-2">الاسم رباعي *</label>
                   <input name="name" required className={inputClass} placeholder="كما هو في البطاقة" />
                </div>
                <div className="space-y-2">
                   <label className="font-bold text-gray-700 block pr-2">الرقم القومي (14 رقم) *</label>
                   <input name="nationalId" maxLength={14} required className={inputClass} placeholder="14 رقم" />
                </div>
                <div className="space-y-2">
                   <label className="font-bold text-gray-700 block pr-2">رقم الهاتف (واتساب) *</label>
                   <input name="phone" required className={inputClass} placeholder="01xxxxxxxxx" />
                </div>
             </div>
             <div className="space-y-2">
                <label className="font-bold text-gray-700 block pr-2">العنوان بالتفصيل *</label>
                <input name="address" required placeholder="القرية - الشارع - رقم المنزل" className={inputClass} />
             </div>
          </section>

          {/* القسم الثاني: تفاصيل الطلب */}
          <section className="space-y-10">
             <div className="flex items-center gap-4 border-r-8 border-[#003366] pr-4">
                <FileText size={32} className="text-[#003366]" />
                <h2 className="text-3xl font-black text-[#003366]">ثانياً: تفاصيل الطلب</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                   <label className="font-bold text-gray-700 block pr-2">نوع الطلب *</label>
                   <select name="requestType" className={inputClass}>
                      <option>شكوى</option><option>مقترح</option><option>استفسار</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="font-bold text-gray-700 block pr-2">الإدارة المعنية *</label>
                   <select name="dept" required className={inputClass}>
                      <option value="">اختر الإدارة المعنية</option>
                      <option>إدارة النظافة والبيئة</option>
                      <option>إدارة الإشغالات</option>
                      <option>إدارة الطرق والكباري</option>
                      <option>الإدارة الهندسية</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="font-bold text-gray-700 block pr-2">عنوان الموضوع *</label>
                   <input name="subject" required className={inputClass} placeholder="ملخص للشكوى" />
                </div>
             </div>
             <div className="space-y-2">
                <label className="font-bold text-gray-700 block pr-2">شرح الشكوى بالتفصيل *</label>
                <textarea name="description" rows={6} required placeholder="يرجى الكتابة بوضوح لمساعدتنا في سرعة الحل..." className={inputClass + " resize-none"}></textarea>
             </div>
             <div className="w-full md:w-1/3 space-y-2">
                <label className="font-bold text-gray-700 block pr-2">تاريخ الواقعة</label>
                <input name="date" type="date" className={inputClass} />
             </div>
          </section>

          {/* القسم الثالث: المرفقات (صور) */}
          <section className="space-y-10 bg-blue-50/50 p-8 md:p-12 rounded-[2.5rem] border-2 border-dashed border-blue-200">
             <div className="flex items-center gap-4 text-[#003366]">
                <Camera size={32} />
                <h2 className="text-3xl font-black">ثالثاً: المرفقات (صور)</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                   <label className="font-black text-gray-600 block pr-2 text-lg">1. صورة البطاقة الشخصية (وجه) *</label>
                   <div className="relative group">
                      <input type="file" name="idPhoto" accept="image/*" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <div className="p-10 bg-white border-2 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center gap-4 group-hover:border-[#003366] transition-all shadow-sm">
                         <Upload size={40} className="text-gray-400 group-hover:text-[#003366]" />
                         <span className="font-bold text-gray-500">اضغط لرفع صورة البطاقة</span>
                      </div>
                   </div>
                </div>
                <div className="space-y-4">
                   <label className="font-black text-gray-600 block pr-2 text-lg">2. صورة مستند الشكوى (اختياري)</label>
                   <div className="relative group">
                      <input type="file" name="complaintPhoto" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <div className="p-10 bg-white border-2 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center gap-4 group-hover:border-[#003366] transition-all shadow-sm">
                         <Upload size={40} className="text-gray-400 group-hover:text-[#003366]" />
                         <span className="font-bold text-gray-500">اضغط لرفع صورة المستند</span>
                      </div>
                   </div>
                </div>
             </div>
          </section>

          {/* زر الإرسال */}
          <button type="submit" disabled={loading} className="w-full bg-[#003366] hover:bg-blue-900 text-white py-8 rounded-full text-3xl font-black shadow-2xl transition-all transform hover:scale-[1.02] active:scale-95 disabled:bg-gray-400 flex items-center justify-center gap-6">
            {loading ? (
              <span className="flex items-center gap-4 animate-pulse">جاري معالجة البيانات والصور...</span>
            ) : (
              <><Send size={32} className="-rotate-45" /> إرسال الطلب الآن</>
            )}
          </button>
        </form>
      </main>

      <footer className="text-center py-10 text-gray-400 font-bold text-sm bg-white border-t mt-20">
        © 2026 م| عبدالرحمن المرشف - منظومة التحول الرقمي بمجلس مدينة كفر شكر
      </footer>
    </div>
  );
}