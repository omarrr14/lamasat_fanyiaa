import { motion } from 'framer-motion';
import { Send, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Info Side */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-center lg:text-right"
            >
              <h2 className="text-4xl md:text-6xl font-black text-primary leading-tight">
                فلنبدأ رحلة <span className="text-accent italic">الإبداع</span> سوياً
              </h2>
              <p className="text-lg text-primary/60 max-w-xl mx-auto lg:mx-0 leading-loose">
                لا تتردد في التواصل معنا للحصول على استشارة مجانية أو طلب عرض سعر لمشروعك القادم. فريقنا جاهز لتحويل أفكارك إلى حقيقة ملموسة.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-primary/10">
              <ContactCard
                icon={<Phone className="text-accent" />}
                title="اتصل بنا"
                info="+966 500 000 000"
                delay={0.1}
              />
              <ContactCard
                icon={<MapPin className="text-accent" />}
                title="موقعنا"
                info="المنطقة الصناعية، الرياض"
                delay={0.2}
              />
               <ContactCard
                icon={<Clock className="text-accent" />}
                title="ساعات العمل"
                info="السبت - الخميس: 9ص - 10م"
                delay={0.3}
              />
               <ContactCard
                icon={<Send className="text-accent" />}
                title="واتساب"
                info="ارسل لنا رسالة فورية"
                delay={0.4}
              />
            </div>
          </div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-primary/5 relative"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="الاسم الكامل" type="text" placeholder="مثال: أحمد محمد" />
                <InputField label="رقم الجوال" type="tel" placeholder="+966 5..." />
              </div>
              <InputField label="نوع الخدمة" type="select" options={['غرفة نوم', 'مطبخ', 'ديكورات داخلية', 'أخرى']} />
              <div className="space-y-2 text-right">
                <label className="text-sm font-bold text-primary/60 px-4">تفاصيل الطلب</label>
                <textarea
                  className="w-full bg-cream rounded-2xl p-6 h-32 focus:bg-white focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 text-primary font-medium"
                  placeholder="كيف يمكننا مساعدتك؟"
                ></textarea>
              </div>
              <button className="w-full bg-primary text-white py-5 rounded-2xl text-lg font-black hover:bg-accent transition-all duration-300 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group">
                إرسال الطلب
                <Send className="transition-transform duration-300 group-active:translate-x-1" size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, title, info, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex gap-4 p-4 rounded-2xl hover:bg-white transition-all duration-300 group cursor-pointer"
    >
      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <div className="text-right">
        <p className="text-xs font-bold text-primary/40 uppercase tracking-widest">{title}</p>
        <p className="text-sm font-black text-primary mt-1">{info}</p>
      </div>
    </motion.div>
  );
}

function InputField({ label, type, placeholder, options }) {
  return (
    <div className="space-y-2 text-right">
      <label className="text-sm font-bold text-primary/60 px-4">{label}</label>
      {type === 'select' ? (
        <select className="w-full bg-cream rounded-2xl p-4 px-6 focus:bg-white focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 text-primary font-medium appearance-none">
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-cream rounded-2xl p-4 px-6 focus:bg-white focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 text-primary font-medium"
        />
      )}
    </div>
  );
}
