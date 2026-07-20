"use client";
import React, { useState, useEffect } from 'react';
import { Send, FileText, User, CheckCircle, Mail, Lock, Camera, Upload, MapPin, Calendar, Headphones } from 'lucide-react';

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

  // دالة تحويل الملف إلى نص Base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = new URLSearchParams();

    try {
      // 1. إضافة البيانات النصية الأساسية
      payload.append('name', formData.get('name'));
      payload.append('nationalId', formData.get('nationalId'));
      payload.append('phone', formData.get('phone'));
      payload.append('address', formData.get('address'));
      payload.append('requestType', formData.get('requestType'));
      payload.append('dept', formData.get('dept'));
      payload.append('subject', formData.get('subject'));
      payload.append('location', formData.get('location'));
      payload.append('description', formData.get('description'));
      payload.append('date', formData.get('date'));
      
      // معرفات الواتساب
      payload.append('instance_id', '6A5E5D5C22559');
      payload.append('access_token', '6a4ec34462a98');

      // 2. معالجة الصور (البطاقة والمستند)
      const idFile = formData.get('idPhoto');
      const compFile = formData.get('complaintPhoto');

      if (idFile && idFile.size > 0) {
        const idBase64 = await fileToBase64(idFile);
        payload.append('idPhoto', idBase64);
      }
      
      if (compFile && compFile.size > 0) {
        const compBase64 = await fileToBase64(compFile);
        payload.append('complaintPhoto', compBase64);
      }

      // 3. رابط جوجل سكريبت (تأكد من عمل New Deployment ووضع الرابط هنا)
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyxbB5hzITpe9Uh3oIlfKBZxDfVqBU1GJMr0hC36wBLPmH3wIAv01n_fj5Z5WBJBU86/exec'; 

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // نستخدم no-cors مع جوجل سكريبت لتجنب مشاكل الـ CORS
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(),
      });

      // بمجرد انتهاء الطلب بنجاح (أو حتى في وضع no-cors) نعتبره أُرسل
      setSent(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("عذراً، حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.");
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
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <img src="/11.png" alt="المركز" className="w-24 h-24 md:w-36 md:h-36 object-contain drop-shadow-2xl" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 -mt-12 relative z-20">
        <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] shadow-2xl border-2 border-white p-8 md:p-14 space-y-24">
          
          {/* القسم الأول */}
          <div className="relative border-2 border-slate-100 rounded-[2.5rem] p-8 md:p-12 pt-16">
             <div className="absolute -top-7 right-8 bg-[#003366] text-white px-8 py-3 rounded-2xl flex items-center gap-3 shadow-xl">
                <User size={26} />
                <span className="font-black text-xl">القسم الأول: بيانات مقدم الطلب</span>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-1">
                   <label className={labelClass}>الاسم رباعي *</label>
                   <input name="name" required className={inputClass} placeholder="الاسم كما في البطاقة" />
                </div>
                <div className="space-y-1">
                   <label className={labelClass}>الرقم القومي *</label>
                   <input name="nationalId" maxLength={14} required className={inputClass} placeholder="14 رقم" />
                </div>
                <div className="space-y-1">
                   <label className={labelClass}>رقم الواتساب *</label>
                   <input name="phone" required className={inputClass} placeholder="01xxxxxxxxx" />
                </div>
                <div className="md:col-span-3 space-y-1">
                   <label className={labelClass}>العنوان بالتفصيل *</label>
                   <input name="address" required className={inputClass} placeholder="القرية / المدينة - الشارع" />
                </div>
             </div>
          </div>

          {/* القسم الثاني */}
          <div className="relative border-2 border-slate-100 rounded-[2.5rem] p-8 md:p-12 pt-16">
             <div className="absolute -top-7 right-8 bg-[#003366] text-white px-8 py-3 rounded-2xl flex items-center gap-3 shadow-xl">
                <FileText size={26} />
                <span className="font-black text-xl">القسم الثاني: بيانات الشكوى</span>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="space-y-2">
                   <label className={labelClass}>نوع الطلب *</label>
                   <select name="requestType" required className={inputClass}>
                      <option value="شكوى">شكوى</option>
                      <option value="مقترح">مقترح</option>
                      <option value="استفسار">استفسار</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className={labelClass}>الإدارة المختصة *</label>
                   <select name="dept" required className={inputClass}>
                      <option value="">اختر الإدارة</option>
                      <option value="إدارة النظافة والبيئة">إدارة النظافة والبيئة</option>
                      <option value="إدارة الإشغالات">إدارة الإشغالات</option>
                      <option value="إدارة الطرق">إدارة الطرق</option>
                      <option value="الإدارة الهندسية">الإدارة الهندسية</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className={labelClass}>عنوان الشكوى *</label>
                   <input name="subject" required className={inputClass} />
                </div>
                <div className="md:col-span-2 space-y-2">
                   <label className={labelClass}>وصف الشكوى بالتفصيل *</label>
                   <textarea name="description" rows={4} required className={inputClass + " resize-none"}></textarea>
                </div>
                <div className="space-y-2">
                   <label className={labelClass}>مكان الواقعة *</label>
                   <input name="location" required className={inputClass} />
                </div>
                <div className="space-y-2">
                   <label className={labelClass}>التاريخ</label>
                   <input name="date" type="date" defaultValue={todayDate} className={inputClass} />
                </div>
             </div>
          </div>

          {/* القسم الثالث: المرفقات */}
          <div className="relative border-2 border-slate-100 rounded-[2.5rem] p-8 md:p-12 pt-16 bg-slate-50/30">
             <div className="absolute -top-7 right-8 bg-[#003366] text-white px-8 py-3 rounded-2xl flex items-center gap-3 shadow-xl">
                <Camera size={26} />
                <span className="font-black text-xl">القسم الثالث: المرفقات</span>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                   <label className={labelClass}>صورة البطاقة الشخصية *</label>
                   <div className="relative group bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-10 text-center transition-all hover:border-[#003366]">
                      <input type="file" name="idPhoto" accept="image/*" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <Upload className="mx-auto mb-3 text-slate-300" size={40} />
                      <p className="font-bold text-[#003366]">رفع صورة البطاقة</p>
                   </div>
                </div>
                <div className="space-y-3">
                   <label className={labelClass}>مستند الشكوى (اختياري)</label>
                   <div className="relative group bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-10 text-center transition-all hover:border-[#003366]">
                      <input type="file" name="complaintPhoto" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <Upload className="mx-auto mb-3 text-slate-300" size={40} />
                      <p className="font-bold text-[#003366]">رفع المستند</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="pt-6 flex flex-col items-center">
             <button type="submit" disabled={loading} className="w-full md:w-[600px] bg-[#003366] text-white py-8 rounded-full text-3xl font-black shadow-2xl disabled:bg-slate-400 flex items-center justify-center gap-6">
                {loading ? "جاري الإرسال..." : <><Send size={36} /> إرسال الشكوى</>}
             </button>
          </div>
        </form>
      </main>
      <footer className="text-center py-16 text-[#003366] font-black text-sm">
        © 2026 م| إدارة التحول الرقمي بمجلس مدينة كفر شكر
      </footer>
    </div>
  );
}