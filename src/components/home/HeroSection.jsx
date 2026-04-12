import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = '966544099765';

export default function HeroSection() {
  return (
    <>
      {/* ── Fixed WhatsApp Button ── */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[1000] w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/30 hover:scale-110 hover:shadow-[#25D366]/50 transition-all duration-300"
        aria-label="تواصل عبر واتساب"
      >
        <FaWhatsapp className="w-7 h-7 sm:w-9 sm:h-9 text-white" />
      </a>

      {/* ── Hero Section Main ── */}
      <div className="relative h-[100dvh] min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-primary">
        
        {/* Full-Width Background Image with Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/images/hero.jpeg" 
            alt="اللمسات الفنية - الخلفية الرئيسية" 
            className="w-full h-full object-cover animate-ken-burns"
          />
          {/* Gradients updated for brightness: lower opacity on top/middle */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-primary/50" />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Dynamic Pattern Overlays */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto w-full relative z-20 px-5 sm:px-8 md:px-12 py-8 flex flex-col items-center justify-center">
          
          {/* ── Text Content (Centered Overlay) ── */}
          <div className="max-w-4xl mx-auto text-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="flex flex-col items-center gap-5 sm:gap-7"
            >
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/15 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full backdrop-blur-2xl shadow-xl">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_12px_rgba(204,123,44,0.9)]" />
                <span className="text-accent text-xs sm:text-sm md:text-base font-black tracking-widest uppercase">
                  إتقان الفن وجمال الخشب
                </span>
              </div>

              <h1 className="text-[2.4rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] font-black text-white leading-[1.08] tracking-tight drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
                اللمسات <span className="text-accent italic font-light">الفنية</span>
                <br />
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white/80 block mt-2 font-bold tracking-normal">للصناعات الخشبية</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto font-medium drop-shadow-md">
                نصمم وننفذ أرقى الديكورات الخشبية والجبسية لتعكس فخامة منزلك. خبرة تمتد لسنوات في السوق السعودي العريق.
              </p>

              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <RouterLink
                  to="/products"
                  className="inline-flex items-center gap-2 sm:gap-3 bg-accent text-primary px-6 sm:px-9 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg font-black hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl shadow-accent/30 group"
                >
                  استكشف مجموعتنا
                  <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1.5" />
                </RouterLink>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 sm:px-9 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg font-black hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-xl group"
                >
                  تواصل معنا
                  <FaWhatsapp size={18} className="text-accent" />
                </a>
              </div>

              {/* Stats Preview */}
              <div className="flex justify-center items-center gap-8 sm:gap-14 md:gap-24 pt-5 sm:pt-7 border-t border-white/10 w-full">
                <StatItem number="2018" label="سنة التأسيس" />
                <StatItem number="+2500" label="مشروع منجز" />
                <StatItem number="100%" label="رضا تام" />
              </div>
            </motion.div>
          </div>
          
        </div>

        {/* Floating Label Accent */}
        <div className="absolute bottom-12 left-12 hidden 2xl:block">
           <p className="text-white/5 text-[12rem] font-black uppercase pointer-events-none select-none tracking-tighter leading-none">
             Artistic Touch
           </p>
        </div>
      </div>
    </>
  );
}


function StatItem({ number, label }) {
  return (
    <div className="text-center">
      <p className="text-xl sm:text-2xl md:text-3xl font-black text-accent mb-0.5 tracking-tight">{number}</p>
      <p className="text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-snug whitespace-nowrap">{label}</p>
    </div>
  );
}
