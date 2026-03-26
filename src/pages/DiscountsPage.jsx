import SectionTitle from '../components/ui/SectionTitle';
import DiscountCard from '../components/ui/DiscountCard';
import { discounts } from '../data/mockData';
import { motion } from 'framer-motion';
import { Star, Clock, Zap } from 'lucide-react';

export default function DiscountsPage() {
  return (
    <div className="bg-cream min-h-screen py-24 px-6 md:px-12 pt-40 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionTitle 
          subtitle="عروض وخصومات حصرية" 
          title="افضل جودة بأفضل سعر" 
        />

        {/* Promo Banner */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="relative aspect-video lg:aspect-[3/1] rounded-[3rem] overflow-hidden shadow-2xl shadow-accent/10 border border-accent/20 mb-20 group"
        >
           <img 
             src="/images/IMG-20260323-WA0037.jpg" 
             alt="Luxury Showroom" 
             className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-l from-primary via-primary/60 to-transparent">
              <div className="absolute inset-y-0 right-0 p-12 md:p-20 flex flex-col justify-center text-right text-white space-y-8">
                 <div className="inline-flex items-center gap-3 bg-accent text-primary px-5 py-2 rounded-full w-fit">
                    <Zap size={20} className="fill-current" />
                    <span className="font-black text-sm uppercase tracking-widest">عرض محدود - شهر رمضان</span>
                 </div>
                 <h2 className="text-4xl md:text-6xl font-black leading-tight">
                    وفر حتى <span className="text-accent italic drop-shadow-md underline decoration-accent/40 decoration-wavy underline-offset-8">40%</span> <br />
                    على جميع تصاميم المطابخ
                 </h2>
                 <p className="text-xl text-white/70 max-w-xl font-light">
                    احجز موعدك الآن للمعاينة والقياس مجاناً، واحصل على طقم طاولات ضيافة هدية مع كل مطبخ.
                 </p>
                 <div className="flex gap-4 pt-4">
                    <button className="bg-white text-primary px-10 py-5 rounded-2xl text-lg font-black hover:bg-accent hover:text-white transition-all duration-400 shadow-xl shadow-white/5">
                       احصل على العرض
                    </button>
                    <div className="flex flex-col justify-center text-right pr-4 border-r-2 border-accent/30">
                       <p className="text-accent font-bold text-2xl h-8 flex items-center gap-2">
                          <Clock size={20} />
                          04:22:50
                       </p>
                       <p className="text-white/40 text-xs font-medium uppercase tracking-widest">ينتهي العرض قريباً</p>
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* Grid of Discounts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {discounts.map((promo, idx) => (
             <DiscountCard key={promo.id} {...promo} delay={idx * 0.1} />
          ))}
        </div>

        {/* Loyalty Program Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-24 bg-white rounded-[4rem] shadow-2xl shadow-primary/5 border border-primary/5 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
           <div className="space-y-8">
              <Star size={64} className="text-accent animate-spin-slow" />
              <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight">
                 برنامج <span className="text-accent italic">النخبة</span> للعملاء الدائمين
              </h2>
              <p className="text-xl text-primary/60 leading-relaxed max-w-lg">
                 نقدر ثقتكم بنا، ولهذا قمنا بتصميم برنامج مكافآت حصري يمنحكم خصومات إضافية وهدايا دورية.
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                 <button className="bg-primary text-white border-2 border-primary px-10 py-5 rounded-2xl text-lg font-black hover:bg-transparent hover:text-primary transition-all duration-300 shadow-xl shadow-primary/10">
                    انضم إلينا الآن
                 </button>
                 <button className="border-2 border-primary/10 text-primary px-10 py-5 rounded-2xl text-lg font-bold hover:border-accent hover:text-accent transition-all duration-300">
                    الشروط والأحكام
                 </button>
              </div>
           </div>
           <div className="relative group">
              <div className="absolute inset-0 bg-accent rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
              <img 
                src="/images/IMG-20260323-WA0041.jpg" 
                alt="Elite Furniture" 
                className="w-full relative z-10 rounded-[3rem] shadow-2xl shadow-black/20"
              />
              <div className="absolute -bottom-8 -left-8 bg-white border border-primary/5 p-8 rounded-3xl shadow-2xl z-20 animate-bounce-slow">
                 <p className="text-accent text-3xl font-black mb-1">VIP</p>
                 <p className="text-primary text-sm font-bold uppercase tracking-widest opacity-60 leading-relaxed">أولوية في التصنيع والشحن</p>
              </div>
           </div>
        </motion.section>
      </div>
    </div>
  );
}
