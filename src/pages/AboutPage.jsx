import SectionTitle from '../components/ui/SectionTitle';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Award, Users, Trophy } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen py-24 px-6 md:px-12 pt-40 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-32">
        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative"
           >
              {/* Overlapping Images */}
              <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl shadow-primary/10 border-8 border-white group">
                 <img 
                   src="https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80" 
                   alt="Master Craftsman" 
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] group-hover:opacity-0 transition-opacity duration-1000" />
              </div>
              <div className="absolute -bottom-12 -left-12 w-2/3 rounded-3xl overflow-hidden aspect-video shadow-2xl border-4 border-white z-10 animate-float">
                 <img 
                   src="https://images.unsplash.com/photo-1536640712247-c05afa5e2bc4?auto=format&fit=crop&q=80" 
                   alt="Workshop" 
                   className="w-full h-full object-cover"
                 />
              </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="space-y-8"
           >
              <div className="inline-block bg-accent px-5 py-2 rounded-full text-primary text-xs font-black tracking-widest uppercase shadow-sm">
                 تاريخنا وقصتنا
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-primary leading-[1.1]">
                 نحن نكتب قصة <span className="text-accent italic drop-shadow-sm">الخشب</span> بأيدي الخبراء
              </h1>
              <p className="text-xl text-primary/60 leading-relaxed font-medium">
                 بدأت رحلتنا قبل أكثر من ١٥ عاماً بشغف بسيط: تحويل قطع الخشب الصامتة إلى تحف فنية تنبض بالحياة. اليوم، نحن فخورون بأن نكون الاسم الموثوق في المملكة العربية السعودية لكل ما يخص الصناعات الخشبية.
              </p>
              <p className="text-lg text-primary/40 leading-relaxed max-w-xl">
                 نحن نجمع بين التقنيات الحديثة واللمسة اليدوية الأصيلة، لنضمن لعملائنا منتجات لا تتأثر بمرور الزمن وتبقى شاهدة على الرقي والفخامة.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-primary/5">
                 <StatItem number="15+" label="سنة من العطاء" />
                 <StatItem number="3000+" label="عميل سعيد" />
              </div>
           </motion.div>
        </section>

        {/* Vision & Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <AboutCard 
             icon={<Target size={48} className="text-accent group-hover:scale-110 transition-transform duration-500" />} 
             title="رؤيتنا"
             desc="أن نكون الشركة الرائدة عالمياً في تقديم حلول الأثاث الخشبي المخصص، وتغيير مفهوم الصناعة من خلال الابتكار المستدام والتصاميم الملهمة."
             delay={0.1}
           />
           <AboutCard 
             icon={<Eye size={48} className="text-accent group-hover:scale-110 transition-transform duration-500" />} 
             title="رسالتنا"
             desc="تقديم أعلى معايير الجودة والحرفية في كل منتج، وتوفير تجربة استثنائية لعملائنا من خلال الاهتمام بأدق التفاصيل وتحقيق أفكارهم على أرض الواقع."
             delay={0.2}
           />
        </section>

        {/* Core Values */}
        <section className="bg-primary p-20 rounded-[4rem] relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/20 transition-all duration-700" />
           <div className="relative z-10 space-y-20">
              <div className="text-center space-y-6">
                 <h2 className="text-4xl md:text-6xl font-black text-white">قيمنا <span className="text-accent italic">الأساسية</span></h2>
                 <p className="text-white/40 max-w-2xl mx-auto text-lg uppercase tracking-widest font-bold">المبادئ التي تقود كل قرار نتخذه</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                 <ValueItem icon={<ShieldCheck size={32} />} title="الجودة المطلقة" desc="لا مساومة على جودة المواد والتنفيذ" />
                 <ValueItem icon={<Award size={32} />} title="التميز" desc="نسعى دائماً لتجاوز التوقعات" />
                 <ValueItem icon={<Users size={32} />} title="الاحترافية" desc="فريق عمل مدرب على أعلى مستوى" />
                 <ValueItem icon={<Trophy size={32} />} title="المصداقية" desc="الالتزام التام بالمواعيد والمواصفات" />
              </div>
           </div>
        </section>

        {/* Team CTA */}
        <section className="text-center py-10">
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="bg-white p-20 rounded-[4rem] shadow-2xl shadow-accent/5 border border-accent/20 space-y-10"
           >
              <h2 className="text-4xl md:text-6xl font-black text-primary leading-tight">جاهز للبدء في مشروعك؟</h2>
              <p className="text-xl text-primary/60 max-w-2xl mx-auto leading-loose">انضم لآلاف العملاء الذين اختاروا التميز مع "اللمسات الفنية". نحن هنا لجعل المساحة الخاصة بك أكثر فخامة.</p>
              <button className="bg-primary text-white border-4 border-transparent px-16 py-6 rounded-2xl text-xl font-black hover:bg-transparent hover:text-primary hover:border-primary transition-all duration-500 shadow-2xl shadow-primary/20">
                 تحدث مع خبيرنا الآن
              </button>
           </motion.div>
        </section>
      </div>
    </div>
  );
}

function StatItem({ number, label }) {
  return (
    <div className="text-right">
       <p className="text-4xl md:text-6xl font-black text-accent mb-2 tracking-tighter drop-shadow-sm">{number}</p>
       <p className="text-primary/40 text-sm font-bold uppercase tracking-widest leading-relaxed">{label}</p>
    </div>
  );
}

function AboutCard({ icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-primary/5 border border-primary/5 hover:border-accent/40 transition-all duration-500 group"
    >
       <div className="mb-8">{icon}</div>
       <h3 className="text-3xl font-black text-primary mb-6">{title}</h3>
       <p className="text-lg text-primary/60 leading-relaxed font-medium">{desc}</p>
    </motion.div>
  );
}

function ValueItem({ icon, title, desc }) {
  return (
    <div className="text-right space-y-6 group">
       <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-500 transform group-hover:-translate-y-2">
          {icon}
       </div>
       <div className="space-y-2">
          <h4 className="text-white text-xl font-bold tracking-tight">{title}</h4>
          <p className="text-white/30 text-sm leading-relaxed">{desc}</p>
       </div>
    </div>
  );
}
