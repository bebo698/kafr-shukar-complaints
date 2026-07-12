"use client";
import React, { useState, useEffect } from 'react';
import { Send, FileText, User, CheckCircle, Mail, Lock, ShieldCheck, Camera, Upload, Info } from 'lucide-react';

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

    const toBase64 = (file: File) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString().split(',')[1]);
      reader.onerror = error => reject(error);
    });

    try {
      params.append('name', formData.get('name') as string);
      params.append('nationalId', formData.get('nationalId') as string);
      params.append('phone', formData.get('phone') as string);
      params.append('address', formData.get('address') as string);
      params.append('requestType', formData.get('requestType') as string);
      params.append('dept', formData.get('dept') as string);
      params.append('subject', formData.get('subject') as string);
      params.append('description', formData.get('description') as string);
      params.append('date', formData.get('date') as string);

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

      // الرابط الجديد الخاص بك
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
      alert("عذراً، حدث خطأ أثناء الإرسال.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full p-5 bg-white border-2 border-[#e5e7eb] rounded-2xl focus:border-[#d4af37] outline-none font-bold text-black placeholder:font-normal";

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfaf1] p-4" dir="rtl">
        <div className="bg-white p-12 rounded-[2rem] shadow-2xl text-center border-t-8 border-[#d4af37] max-w-md w-full">
          <CheckCircle className="w-20 h-20 text-[#d4af37] mx-auto mb-6" />
          <h1 className="text-3xl font-black text-[#003366] mb-4">تم تسجيل طلبكم</h1>
          <p className="text-gray-600 font-bold mb-8 text-xl">ستصلكم رسالة تأكيد الآن على الواتساب. شكراً لتواصلكم معنا.</p>
          <button onClick={() => setSent(false)} className="w-full bg-[#003366] text-white py-4 rounded-2xl font-black">تقديم طلب جديد</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfaf1] text-right pb-20 border-[16px] border-[#d4af37]/20" dir="rtl">
      
      {/* الهيدر مع الشعارات */}
      <header className="bg-[#003366] py-10 px-6 border-b-4 border-[#d4af37] relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-row justify-between items-center relative z-10">
          <div className="flex flex-col items-center gap-2">
            <img src="/images.png" alt="شعار المحافظة" className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-xl" />
            <span className="text-white text-[10px] md:text-sm font-bold">محافظة القليوبية</span>
          </div>
          <div className="text-center flex-1 px-4">
            <h1 className="text-[#d4af37] text-2xl md:text-5xl font-black mb-2 tracking-tight">رئاسة مركز ومدينة كفر شكر</h1>
            <p className="text-white text-sm md:text-2xl font-bold">بوابة الشكاوى والمقترحات الإلكترونية</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <img src="/11.png" alt="شعار المركز" className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-xl" />
            <span className="text-white text-[10px] md:text-sm font-bold">مجلس مدينة كفر شكر</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 -mt-8 relative z-20">
        
        {/* رسالة التنويه */}
        <div className="bg-[#fff9e6] border-2 border-[#d4af37] p-6 rounded-3xl mb-10 flex items-start gap-4 shadow-xl">
           <Info className="text-[#d4af37] shrink-0" size={32} />
           <p className="text-[#003366] font-black text-lg md:text-xl leading-relaxed">
             هذه المنظومة مخصصة لخدمة المواطنين الكرام، وتهدف إلى التيسير عليكم في تقديم الشكاوى والمقترحات وتلقي الردود بشكل أسرع تماشياً مع رؤية مصر للتحول الرقمي.
           </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-16 space-y-16 border-t-[12px] border-[#d4af37]">
          
          <section className="space-y-10">
             <div className="flex items-center gap-4 bg-[#fdfaf1] p-4 rounded-2xl border-r-8 border-[#d4af37]">
                <User size={32} className="text-[#003366]" />
                <h2 className="text-3xl font-black text-[#003366]">بيانات مقدم الطلب</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <input name="name" required className={inputClass} placeholder="الاسم رباعي *" />
                <input name="nationalId" maxLength={14} required className={inputClass} placeholder="الرقم القومي (14 رقم) *" />
                <input name="phone" required className={inputClass} placeholder="رقم الواتساب *" />
             </div>
             <input name="address" required placeholder="العنوان بالتفصيل (القرية - الشارع) *" className={inputClass} />
          </section>

          <section className="space-y-10">
             <div className="flex items-center gap-4 bg-[#fdfaf1] p-4 rounded-2xl border-r-8 border-[#d4af37]">
                <FileText size={32} className="text-[#003366]" />
                <h2 className="text-3xl font-black text-[#003366]">تفاصيل الشكوى</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <select name="requestType" className={inputClass}>
                   <option>شكوى</option><option>مقترح</option><option>استفسار</option>
                </select>
                <select name="dept" required className={inputClass}>
                   <option value="">اختر الإدارة المعنية</option>
                   <option>إدارة النظافة والبيئة</option>
                   <option>إدارة الإشغالات</option>
                   <option>إدارة الطرق والكباري</option>
                   <option>الإدارة الهندسية</option>
                </select>
                <input name="subject" required className={inputClass} placeholder="عنوان الموضوع *" />
             </div>
             <textarea name="description" rows={6} required placeholder="اشرح الشكوى بالتفصيل هنا..." className={inputClass + " resize-none"}></textarea>
             <input name="date" type="date" className={inputClass} />
          </section>

          <section className="space-y-10 bg-[#fdfaf1] p-8 md:p-12 rounded-[2.5rem] border-2 border-dashed border-[#d4af37]/40">
             <div className="flex items-center gap-4 text-[#003366]">
                <Camera size={32} />
                <h2 className="text-3xl font-black">المرفقات والصور</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                   <label className="font-black text-[#003366] block pr-2 text-lg">1. صورة البطاقة الشخصية *</label>
                   <div className="relative group bg-white p-10 border-2 border-dashed border-gray-300 rounded-3xl text-center group-hover:border-[#d4af37]">
                      <input type="file" name="idPhoto" accept="image/*" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <Upload size={40} className="text-gray-400 mx-auto mb-2" />
                      <span className="font-bold text-gray-500">ارفع صورة البطاقة</span>
                   </div>
                </div>
                <div className="space-y-4">
                   <label className="font-black text-[#003366] block pr-2 text-lg">2. صورة مستند الشكوى</label>
                   <div className="relative group bg-white p-10 border-2 border-dashed border-gray-300 rounded-3xl text-center group-hover:border-[#d4af37]">
                      <input type="file" name="complaintPhoto" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <Upload size={40} className="text-gray-400 mx-auto mb-2" />
                      <span className="font-bold text-gray-500">ارفع صورة المستند</span>
                   </div>
                </div>
             </div>
          </section>

          <button type="submit" disabled={loading} className="w-full bg-[#003366] hover:bg-blue-900 text-white py-8 rounded-full text-3xl font-black shadow-[0_20px_50px_rgba(0,51,102,0.3)] transition-all transform hover:scale-[1.02] active:scale-95 disabled:bg-gray-400 flex items-center justify-center gap-6">
            {loading ? "جاري معالجة البيانات والصور..." : <><Send size={32} className="-rotate-45" /> إرسال الشكوى الآن</>}
          </button>
        </form>
      </main>

      <footer className="text-center py-10 text-[#003366] font-black text-sm">
        © 2026 م| عبدالرحمن المرشف - إدارة التحول الرقمي بمجلس مدينة كفر شكر
      </footer>
    </div>
  );
}