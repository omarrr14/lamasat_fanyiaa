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
               <div className="relative rounded-[3.5rem] overflow-hidden aspect-[4/5] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.6)] border-4 border-white group">
                  <img 
                    src="/images/قصتنا وبدايتنا.jpeg" 
                    alt="Master Craftsman" 
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                  />
               </div>
               <div className="absolute -bottom-12 -left-12 w-2/3 rounded-3xl overflow-hidden aspect-video shadow-2xl border-4 border-white z-10 animate-float">
                  <img 
                    src="/images/kitchen4.jpg" 
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
                  عن الشركة
               </div>
               <h1 className="text-5xl md:text-7xl font-black text-primary leading-[1.1]">
                  نحن نكتب قصة <span className="text-accent italic drop-shadow-sm">الخشب</span> بأيدي الخبراء
               </h1>
               <p className="text-xl text-primary/60 leading-relaxed font-medium">
                  شركة اللمسات الفنية للصناعات الخشبية هي شركة مقرها الرياض، تأسست لتنفرد بجودتها وقوتها بالسوق السعودي. نحن متخصصون في تقديم خدمات التصميم والتنفيذ لجميع الأعمال الخشبية مثل الأثاث، والأبواب، والخزائن، والنجارة، والمطابخ، وإطارات الأبواب.
               </p>
               <p className="text-lg text-primary/40 leading-relaxed max-w-xl">
                  نحن في هذا المجال منذ عام 2018، ونزود منطقة الرياض بأعمال خشبية عالية الجودة تتراوح من الديكورات الداخلية والخارجية إلى خزائن الأثاث والنوافذ والأبواب وخدمات النجارة الاحترافية. هدفنا هو تزويد العملاء بمنتجات استثنائية مع الحفاظ على الكفاءة في الإنتاج.
               </p>
               
               <div className="grid grid-cols-2 gap-8 pt-8 border-t border-primary/5">
                  <StatItem number="2018" label="سنة التأسيس" />
                  <StatItem number="2500+" label="مشروع منجز" />
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
              desc="مهمتنا هي ابتكار منتجات استثنائية ذات جودة عالية في التصنيع تكون جذابة وعملية للغاية، كما نقدم لعملائنا مشورة الخبراء حول كل جانب من جوانب مشروعهم من المفهوم الأولي إلى التنفيذ."
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

        {/* Location Map */}
        <section className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center space-y-4"
          >
            <div className="inline-block bg-accent px-5 py-2 rounded-full text-primary text-xs font-black tracking-widest uppercase shadow-sm">
              موقعنا
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-primary">
              زورونا في <span className="text-accent italic">معرضنا</span>
            </h2>
            <p className="text-xl text-primary/50 max-w-2xl mx-auto leading-relaxed font-medium">
               الرياض، المملكة العربية السعودية
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.25)] border-4 border-white group"
            style={{ height: '500px' }}
          >
            {/* Gradient overlay bar at top */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-cream to-transparent z-10 pointer-events-none" />
            
            <iframe
              title="موقع شركة اللمسات الفنية"
              src="https://maps.google.com/maps?q=24.6264801,46.868103&z=17&output=embed&hl=ar"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'saturate(1.1) contrast(1.05)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating info card */}
            <div className="absolute bottom-6 right-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 border border-accent/20 max-w-xs text-right">
              <p className="text-primary font-black text-lg leading-tight mb-1">شركة اللمسات الفنية</p>
              <p className="text-primary/50 text-sm font-medium mb-3">المنطقة الصناعية، الرياض</p>
              <a
                href="https://www.google.com/maps/place/24%C2%B037'35.3%22N+46%C2%B052'05.2%22E/@24.6264801,46.8655281,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-primary text-sm font-black px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
              >
                <span>افتح في خرائط جوجل</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </motion.div>
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
