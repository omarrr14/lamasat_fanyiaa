import { motion } from 'framer-motion';
import { ArrowLeft, PlayCircle } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative h-[90vh] md:h-[100vh] w-full flex items-center overflow-hidden bg-primary px-6 md:px-12 pt-20">
      {/* Background with decorative patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 -left-20 w-80 h-80 border-2 border-accent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 border-2 border-accent rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
        {/* Text Content */}
        <div className="flex flex-col justify-center text-center lg:text-right">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-sm md:text-base font-semibold tracking-widest uppercase">
                إتقان الفن وجمال الخشب
              </span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[1.15]">
              اللمسات <span className="text-accent italic font-light drop-shadow-sm">الفنية</span> <br />
              <span className="text-4xl md:text-6xl text-white/90">للصناعات الخشبية</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto lg:mx-0">
               نصنع لك من الخشب لوحات فنية تزين منزلك، بجودة تضاهي العالمية وتصاميم تعكس ذوقك الرفيع. غرف نوم، مطابخ، وديكورات مخصصة.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6">
              <button className="bg-accent text-primary px-10 py-5 rounded-2xl text-lg font-black hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl shadow-accent/20 flex items-center gap-3 group">
                استكشف مجموعتنا
                <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-2" size={24} />
              </button>
              
              <button className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group">
                <PlayCircle size={60} strokeWidth={1.5} className="text-accent group-hover:scale-110 transition-transform duration-300" />
                <span className="font-bold text-lg border-b border-accent/30 pb-1 group-hover:border-accent group-hover:bg-accent/5 px-2 rounded-md transition-all">شاهد قصة نجاحنا</span>
              </button>
            </div>
          </motion.div>

          {/* Stats Section Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 pt-20 mt-12 border-t border-white/5"
          >
            <StatItem number="15+" label="سنة خبرة" />
            <StatItem number="2.5k+" label="مشروع منجز" />
            <StatItem number="100%" label="رضا العملاء" />
          </motion.div>
        </div>

        {/* Visual Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
           <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 aspect-[4/5] border border-white/10 group">
             <img 
               src="/images/IMG-20260323-WA0037.jpg" 
               alt="Modern Furniture" 
               className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
             />
             <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary p-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700">
               <p className="text-accent font-bold mb-2">تصميم مميز</p>
               <h3 className="text-white text-3xl font-black">جناح ملكي - قصر اليمامة</h3>
               <p className="text-white/60 mt-4 font-bold border-b border-accent/30 inline-block pb-1 cursor-pointer hover:border-accent">شاهد التفاصيل</p>
             </div>
          </div>
          
          {/* Floating Card */}
          <div className="absolute -bottom-10 -right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl max-w-xs animate-bounce-slow">
            <p className="text-accent font-black text-2xl mb-1 tracking-tighter">أحدث الصيحات</p>
            <p className="text-white text-sm font-medium leading-relaxed opacity-80">نعتمد في تصنيعنا على أفضل أنواع الخشب الطبيعي المستورد لنضمن لعملائنا المتانة والفخامة.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatItem({ number, label }) {
  return (
    <div className="text-right">
      <p className="text-3xl md:text-4xl font-black text-accent mb-2 tracking-tighter">{number}</p>
      <p className="text-white/40 text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed">{label}</p>
    </div>
  );
}
