"use client";
import React, { useState, useEffect } from 'react';
import { Send, FileText, User, CheckCircle, Mail, Lock, ShieldCheck, Camera, Upload, Info, Headphones, Star, MapPin, Calendar } from 'lucide-react';

export default function ComplaintForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    setMounted(true);
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    setTodayDate(formattedDate);
  }, []);

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
      // إضافة معرفات الواتساب مباشرة إلى البيانات المرسلة بدلاً من الرابط
      // هذا هو الأسلوب الصحيح
      params.append('instance_id', '6A4F8091C1D77');
      params.append('access_token', '6a4ec34462a98');

      params.append('name', formData.get('name') as string);
      params.append('nationalId', formData.get('nationalId') as string);
      params.append('phone', formData.get('phone') as string);
      params.append('address', formData.get('address') as string);
      params.append('requestType', formData.get('requestType') as string);
      params.append('dept', formData.get('dept') as string);
      params.append('subject', formData.get('subject') as string);
      params.append('location', formData.get('location') as string);
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

      // تم تبسيط الرابط ليشير فقط إلى الـ Script النظيفة
      // يجب استبدال هذا الرابط بالرابط النهائي الجديد بعد نشر الـ Script المحدثة
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwj-Vwmghy20vkXOaiWFuig4awAIU6x202y_V0S7FPlwnrTRuPJb0ljSf_dqLb6jEfx/exec'; 
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // تم الإبقاء عليها، لكن البيانات تُرسل الآن بشكل صحيح
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

  const inputClass = "w-full p-4 bg-white border-2 border-slate-200 rounded-xl focus:border-[#003366] outline-none font-bold text-black placeholder:font-normal placeholder:text-slate-400 transition-all";
  const labelClass = "block font-black text-[#003366] mb-2 pr-1 text-sm md:text-base";

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfaf1] p-4" dir="rtl">
        <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl text-center border-t-8 border-[#d4af37] max-w-md w-full">
          <CheckCircle className="w-20 h-20 text-[#d4af37] mx-auto mb-6" />
          <h1 className="text-3xl font-black text-[#003366] mb-4">تم الاستلام بنجاح</h1>
          <p className="text-gray-600 font-bold mb-8 text-xl">ستصلك رسالة تأكيد فورية عبر الواتساب. شكراً لتواصلك معنا.</p>
          <button onClick={() => setSent(false)} className="w-full bg-[#003366] text-white py-4 rounded-2xl font-black text-xl">تقديم طلب جديد</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfaf1] text-right pb-20" dir="rtl">
      
      <header className="relative bg-[#003366] pt-12 pb-24 border-b-8 border-[#d4af37] shadow-xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-6 flex flex-row justify-between items-center relative z-10">
          
          <div className="flex flex-col items-center gap-3">
            <img src="/images.png" alt="القليوبية" className="w-24 h-24 md:w-36 md:h-36 object-contain drop-shadow-2xl" />
           </div>

          <div className="text-center flex-1">
            <h1 className="text-[#d4af37] text-4xl md:text-7xl font-black mb-2 tracking-tighter drop-shadow-sm">مجلس مدينة كفر شكر</h1>
            <p className="text-white text-xl md:text-3xl font-bold italic opacity-90">بوابة الشكاوى والمقترحات الرقمية</p>
            <div className="mt-6 inline-block bg-white/10 text-white px-8 py-2 rounded-full border border-white/20 backdrop-blur-sm font-bold text-sm md:text-lg italic">
               نحو خدمة أفضل... واستجابة أسرع
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <img src="/11.png" alt="المركز" className="w-24 h-24 md:w-36 md:h-36 object-contain drop-shadow-2xl" />
           </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 -mt-12 relative z-20">
        
        <div className="bg-white rounded-[2.5rem] shadow-2xl border-2 border-white overflow-hidden mb-16 flex flex-col md:flex-row">
           <div className="p-10 flex flex-col justify-center flex-1">
              <h2 className="text-[#003366] text-4xl font-black mb-6 italic">عزيزنا المواطن،</h2>
              <p className="text-slate-700 font-bold text-xl leading-relaxed">
                يرحب مجلس مدينة كفر شكر باستقبال شكاواكم ومقترحاتكم. تهدف هذه المنظومة للتيسير عليكم في تقديم الطلبات وسرعة الاستجابة لها. سيتم التعامل مع جميع البيانات بسرية تامة.
              </p>
           </div>
           <div className="bg-[#fdfaf1] p-10 flex flex-col justify-center gap-8 border-r border-slate-100 md:w-80">
              <div className="flex items-center gap-4 text-[#003366] font-bold"><Lock size={22}/><span className="text-sm">سرية تامة للبيانات</span></div>
              <div className="flex items-center gap-4 text-[#003366] font-bold"><Mail size={22}/><span className="text-sm">إخطاركم برقم الشكوى</span></div>
              <div className="flex items-center gap-4 text-[#003366] font-bold"><Headphones size={22}/><span className="text-sm">الرد من الإدارة المختصة</span></div>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] shadow-2xl border-2 border-white p-8 md:p-14 space-y-24">
          
          <div className="relative border-2 border-slate-100 rounded-[2.5rem] p-8 md:p-12 pt-16">
             <div className="absolute -top-7 right-8 bg-[#003366] text-white px-8 py-3 rounded-2xl flex items-center gap-3 shadow-xl">
                <User size={26} />
                <span className="font-black text-xl">القسم الأول: بيانات مقدم الطلب</span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-1">
                   <label className={labelClass}>1. الاسم رباعي *</label>
                   <input name="name" required className={inputClass} placeholder="اكتب اسمك كما في البطاقة" />
                </div>
                <div className="space-y-1">
                   <label className={labelClass}>2. الرقم القومي *</label>
                   <input name="nationalId" maxLength={14} required className={inputClass} placeholder="14 رقم" />
                </div>
                <div className="space-y-1">
                   <label className={labelClass}>3. رقم الهاتف (واتساب) *</label>
                   <input name="phone" required className={inputClass} placeholder="01xxxxxxxxx" />
                </div>
                <div className="md:col-span-3 space-y-1">
                   <label className={labelClass}>4. العنوان بالتفصيل *</label>
                   <input name="address" required className={inputClass} placeholder="القرية / المدينة - الشارع - رقم المنزل" />
                </div>
             </div>
          </div>

          <div className="relative border-2 border-slate-100 rounded-[2.5rem] p-8 md:p-12 pt-16">
             <div className="absolute -top-7 right-8 bg-[#003366] text-white px-8 py-3 rounded-2xl flex items-center gap-3 shadow-xl">
                <FileText size={26} />
                <span className="font-black text-xl">القسم الثاني: بيانات الشكوى</span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="space-y-2">
                   <label className={labelClass}>6. نوع الطلب *</label>
                   <div className="flex gap-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      {['شكوى', 'مقترح', 'استفسار'].map((t) => (
                        <label key={t} className="flex items-center gap-2 cursor-pointer font-bold text-[#003366]">
                           <input type="radio" name="requestType" value={t} defaultChecked={t==='شكوى'} className="w-5 h-5 accent-[#003366]" /> {t}
                        </label>
                      ))}
                   </div>
                </div>

                <div className="space-y-2">
                   <label className={labelClass}>7. الإدارة المختصة *</label>
                   <select name="dept" required className={inputClass}>
                      <option value="">اختر الإدارة المعنية</option>
                      <option>إدارة النظافة والبيئة</option>
                      <option>إدارة الإشغالات</option>
                      <option>إدارة الطرق والكباري</option>
                      <option>الإدارة الهندسية</option>
                      <option> المركز التنكولوجي</option>
                      <option>الحوكمة والمراجعة الداخلية </option>
                      <option> مكتب رئيس المدينة</option>
                      <option> البيئة</option>
                      <option> الأدارة الهندسية</option>
                   </select>
                </div>

                <div className="space-y-2">
                   <label className={labelClass}>8. عنوان الشكوى *</label>
                   <input name="subject" required className={inputClass} placeholder="اكتب عنواناً مختصراً" />
                </div>

                <div className="space-y-2">
                   <label className={labelClass}>9. مكان الشكوى *</label>
                   <div className="relative">
                      <input name="location" required className={inputClass} placeholder="مكان حدوث المشكلة" />
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                   </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                   <label className={labelClass}>10. وصف الشكوى بالتفصيل *</label>
                   <textarea name="description" rows={4} required className={inputClass + " resize-none"} placeholder="يرجى كتابة تفاصيل الشكوى بوضوح..."></textarea>
                </div>

                <div className="space-y-2">
                   <label className={labelClass}>11. تاريخ الواقعة</label>
                   <div className="relative">
                      <input name="date" type="date" defaultValue={todayDate} className={inputClass} />
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                   </div>
                </div>
             </div>
          </div>

          <div className="relative border-2 border-slate-100 rounded-[2.5rem] p-8 md:p-12 pt-16 bg-slate-50/30">
             <div className="absolute -top-7 right-8 bg-[#003366] text-white px-8 py-3 rounded-2xl flex items-center gap-3 shadow-xl">
                <Camera size={26} />
                <span className="font-black text-xl">القسم الثالث: المرفقات</span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                   <label className={labelClass}>12. إرفاق صورة البطاقة الشخصية *</label>
                   <div className="relative group bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-10 text-center transition-all hover:border-[#003366]">
                      <input type="file" name="idPhoto" accept="image/*" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <Upload className="mx-auto mb-3 text-slate-300 group-hover:text-[#003366]" size={40} />
                      <p className="font-bold text-[#003366]">اضغط هنا لرفع صورة البطاقة</p>
                   </div>
                </div>
                <div className="space-y-3">
                   <label className={labelClass}>13.    إرفاق مستند الشكوى  *  </label>
                   <div className="relative group bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-10 text-center transition-all hover:border-[#003366]">
                      <input type="file" name="complaintPhoto" accept="image/*" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <Upload className="mx-auto mb-3 text-slate-300 group-hover:text-[#003366]" size={40} />
                      <p className="font-bold text-[#003366]">اضغط هنا لرفع المستندات</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="pt-6 flex flex-col items-center">
             <button type="submit" disabled={loading} className="w-full md:w-[600px] bg-[#003366] hover:bg-blue-900 text-white py-8 rounded-full text-3xl font-black shadow-2xl transition-all transform hover:scale-[1.02] active:scale-95 disabled:bg-slate-400 flex items-center justify-center gap-6">
                {loading ? "جاري الإرسال..." : <><Send size={36} className="-rotate-45" /> إرسال الشكوى الآن</>}
             </button>
             <p className="mt-6 text-slate-400 font-bold italic">نظام آمن ومشفر بالكامل 🔒</p>
          </div>

        </form>
      </main>

      <footer className="text-center py-16 text-[#003366] font-black text-sm">
        © 2026 م| إدارة التحول الرقمي بمجلس مدينة كفر شكر - محافظة القليوبية
      </footer>
    </div>
  );
}