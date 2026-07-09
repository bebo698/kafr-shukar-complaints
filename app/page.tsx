"use client";
import React, { useState, useEffect } from 'react';
import { Send, FileText, User, CheckCircle } from 'lucide-react';

export default function ComplaintForm() {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // لمنع مشاكل التحميل في Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    // dir="rtl" هي المسؤولة عن قلب الصفحة كلها من اليمين للشمال
    <div className="min-h-screen bg-gray-50 pb-10" dir="rtl">
      
      {/* Header - الهيدر بتوزيع الشعارات (يمين وشمال) */}
      <div className="bg-[#003366] text-white p-6 shadow-lg border-b-4 border-yellow-500">
        <div className="max-w-6xl mx-auto grid grid-cols-3 items-center text-center">
          
          {/* شعار اليمين (images.png) */}
          <div className="flex flex-col items-center">
             <img src="/images.png" alt="محافظة القليوبية" className="w-16 h-16 md:w-20 md:h-20 object-contain bg-white rounded-full p-1" />
             <p className="text-xs mt-2 font-bold">محافظة القليوبية</p>
          </div>

          {/* العنوان في المنتصف */}
          <div className="flex flex-col items-center">
             <h1 className="text-xl md:text-3xl font-bold leading-tight">مجلس مدينة كفر شكر</h1>
             <p className="text-yellow-400 text-sm md:text-lg font-bold mt-1">منظومة الشكاوى والمقترحات الإلكترونية</p>
             <p className="text-xs italic text-blue-200 mt-2 hidden md:block">نحو خدمة أفضل... واستجابة أسرع</p>
          </div>

          {/* شعار الشمال (11.png) */}
          <div className="flex flex-col items-center">
             <img src="/11.png" alt="رئاسة المركز" className="w-16 h-16 md:w-20 md:h-20 object-contain bg-white rounded-full p-1" />
             <p className="text-xs mt-2 font-bold">رئاسة مركز ومدينة</p>
          </div>
          
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 p-4 text-right">
        <form className="space-y-8 bg-white shadow-2xl rounded-xl p-8 border border-gray-200">
          
          {/* القسم الأول: بيانات مقدم الطلب */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b-2 border-blue-100 pb-2">
              <User className="text-[#003366]" />
              <h2 className="text-xl font-bold text-[#003366]">القسم الأول: بيانات مقدم الطلب</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">1. الاسم رباعي *</label>
                <input type="text" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="اكتب اسمك رباعي" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">2. الرقم القومي *</label>
                <input type="text" maxLength={14} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="14 رقم" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">3. رقم الهاتف *</label>
                <input type="tel" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="01012345678" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">4. البريد الإلكتروني *</label>
                <input type="email" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="example@email.com" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">5. العنوان بالتفصيل</label>
                <input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="اكتب عنوانك بالتفصيل" />
              </div>
            </div>
          </section>

          {/* القسم الثاني: بيانات الشكوى */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b-2 border-blue-100 pb-2">
              <FileText className="text-[#003366]" />
              <h2 className="text-xl font-bold text-[#003366]">القسم الثاني: بيانات الشكوى</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-3">6. نوع الطلب *</label>
                <div className="flex gap-6">
                  {['شكوى', 'مقترح', 'استفسار'].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="requestType" value={type} className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700 font-bold">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">7. الإدارة المختصة *</label>
                <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="">اختر الإدارة المختصة</option>
                  <option>إدارة النظافة</option>
                  <option>إدارة الإشغالات</option>
                  <option>إدارة الطرق</option>
                  <option>الإدارة الهندسية</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">8. عنوان الشكوى *</label>
                <input type="text" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="اكتب عنواناً مختصراً" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">9. مكان الشكوى *</label>
                <input type="text" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="حدد مكان حدوث المشكلة" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">10. وصف الشكوى بالتفصيل *</label>
                <textarea rows={4} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="يرجى كتابة تفاصيل الشكوى بشكل واضح ودقيق..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">11. تاريخ الواقعة</label>
                <input type="date" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-right" />
              </div>
            </div>
          </section>

          {/* القسم الثالث: الإقرار */}
          <section className="bg-blue-50 p-6 rounded-lg border border-blue-100">
             <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required className="mt-1 w-5 h-5 text-blue-600 rounded" />
                <span className="text-sm font-bold text-[#003366]">أقر بأن البيانات الواردة صحيحة، وأوافق على استخدامها في إجراءات فحص الشكوى والرد عليها. *</span>
             </label>
          </section>

          {/* زر الإرسال */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#003366] hover:bg-blue-900 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            {loading ? "جاري الإرسال..." : (
              <>
                <Send size={20} />
                إرسال الشكوى
              </>
            )}
          </button>
          <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
            <CheckCircle size={12} /> جميع البيانات محمية وآمنة 🔒
          </p>
        </form>
      </div>

      {/* Footer - الفوتر الصغير */}
      <footer className="max-w-4xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 px-4 text-center">
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-[#003366] font-bold text-xs">نستقبل شكواك على مدار الساعة</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-[#003366] font-bold text-xs">نراجع وندرس الشكاوى بدقة</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-[#003366] font-bold text-xs">نتواصل معك لإطلاعك على المستجدات</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-[#003366] font-bold text-xs">نعمل من أجلك لخدمة أفضل</p>
          </div>
      </footer>
      <p className="text-center mt-6 text-[#003366] font-bold italic">معاً نبني مدينة أفضل</p>
    </div>
  );
}