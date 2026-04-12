import { motion } from 'framer-motion';
import SectionTitle from '../components/ui/SectionTitle';
import { FaWhatsapp } from 'react-icons/fa';
import { Sparkles, Gift, Tag } from 'lucide-react';

const WHATSAPP_NUMBER = '966544099765';

const discountBanners = [
  { 
    id: 1, 
    image: '/images/الخصومات.jpeg', 
    title: 'عرض الأثاث الحديث', 
    description: 'خصم حصرى 30% على جميع قطع الأثاث المودرن' 
  }
];

export default function DiscountsPage() {
  return (
    <div className="bg-cream min-h-screen py-24 px-6 md:px-12 pt-40 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionTitle 
          subtitle="عروضنا الحصرية" 
          title="خصومات لا تفوت على أرقى التصاميم" 
        />

        {/* Banners Gallery */}
        <div className="space-y-16">
          {discountBanners.map((banner, idx) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group"
            >
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700 z-10 hidden md:block text-right">
                <div className="flex items-center gap-3 text-accent mb-2 justify-end">
                  <span className="font-bold tracking-widest uppercase">{banner.title}</span>
                  <Tag size={20} />
                </div>
                <h3 className="text-white text-3xl font-black">{banner.description}</h3>
              </div>
              
              <img 
                src={banner.image} 
                alt={banner.title} 
                className="w-full h-auto object-cover transition-transform duration-[4s] group-hover:scale-105"
              />
              
              {/* Mobile overlay (always visible) */}
              <div className="md:hidden absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-right">
                 <h3 className="text-white text-xl font-black">{banner.title}</h3>
                 <p className="text-accent text-sm font-bold">{banner.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
           <HighlightCard 
             icon={<Sparkles className="text-accent" size={32} />} 
             title="تصاميم حصرية" 
             desc="كل قطعة نصنعها هى تحفة فنية فريدة" 
           />
           <HighlightCard 
             icon={<Gift className="text-accent" size={32} />} 
             title="هدايا مع كل طلب" 
             desc="احصل على هدايا قيمة عند طلبك" 
           />
           <HighlightCard 
             icon={<FaWhatsapp className="text-accent" size={32} />} 
             title="خدمة عملاء 24/7" 
             desc="نحن هنا للإجابة على جميع استفساراتكم" 
           />
        </div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-20 bg-primary rounded-[4rem] text-center space-y-8 shadow-2xl shadow-primary/20 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight relative z-10">
            اغتنم الفرصة الآن واحصل على <br /> <span className="text-accent">أفضل الأسعار</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-light relative z-10">
            تواصل معنا مباشرة عبر واتساب للحصول على عرض سعر دقيق لمشروعك خلال دقائق.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-accent text-primary px-12 py-5 rounded-2xl text-xl font-black hover:bg-white hover:scale-105 transition-all duration-300 shadow-2xl shadow-accent/20 relative z-10"
          >
            تواصل معنا الآن
            <FaWhatsapp size={28} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

function HighlightCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-primary/5 text-center space-y-4 border border-primary/5 hover:translate-y-[-10px] transition-transform duration-300">
      <div className="flex justify-center mb-6">{icon}</div>
      <h4 className="text-2xl font-black text-primary">{title}</h4>
      <p className="text-primary/50 font-bold text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
