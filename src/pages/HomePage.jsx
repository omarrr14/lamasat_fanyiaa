import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import SectionTitle from '../components/ui/SectionTitle';
import ImageCard from '../components/ui/ImageCard';
import GalleryGrid from '../components/ui/GalleryGrid';
import ContactSection from '../components/home/ContactSection';
import ProductCard from '../components/ui/ProductCard';
import { categories, featuredProjects } from '../data/mockData';
import { getProducts } from '../services/api';
import { Shield, Sparkles, Zap, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (e) {
        console.error("Failed to fetch products", e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-col">
      <HeroSection />

      {/* Services Preview */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            subtitle="خدماتنا المتميزة" 
            title="كل ما تحتاجه لمنزل عصري" 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <ImageCard 
                key={cat.id} 
                image={cat.image} 
                title={cat.name} 
                description={cat.description} 
                delay={idx * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Amazing Products Preview */}
      <section className="py-24 px-6 md:px-12 bg-cream/30">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            subtitle="جديدنا" 
            title="منتجات تخطف الأنظار" 
          />
          {loading ? (
             <div className="flex justify-center p-12">
                <Loader2 className="animate-spin text-primary" size={32} />
             </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product, idx) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                delay={idx * 0.1}
              />
            ))}
          </div>
          )}
          <div className="text-center mt-16">
            <Link to="/products" className="inline-block bg-primary text-white px-10 py-4 rounded-2xl text-lg font-black hover:bg-accent hover:text-white transition-all duration-300 shadow-xl shadow-primary/5">
              تصفح كل المنتجات
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] grayscale invert" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl"
           >
             <img 
               src="/images/IMG-20260323-WA0029.jpg" 
               alt="Craftsmanship" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]" />
           </motion.div>

           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="space-y-8"
           >
              <div className="inline-block bg-accent px-4 py-1.5 rounded-full text-primary text-xs font-bold tracking-widest uppercase mb-2">
                قصتنا وبدايتنا
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                أكثر من مجرد <span className="text-accent italic">صناعة</span>.. إنها شغف بالتفاصيل
              </h2>
              <p className="text-xl text-white/60 leading-relaxed font-light">
                منذ انطلاقتنا في "اللمسات الفنية"، وضعنا نصب أعيننا هدفاً واحداً: أن نكون الشريك الأول لكل من يبحث عن التميز والفخامة في عالم الأثاث الخشبي.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                 <FeatureItem 
                   icon={<Shield className="text-accent" />} 
                   title="جودة استثنائية" 
                   desc="نستخدم أجود أنواع الأخشاب الطبيعية" 
                 />
                 <FeatureItem 
                   icon={<Sparkles className="text-accent" />} 
                   title="تصميم إبداعي" 
                   desc="تصاميم حصرية تناسب ذوقك الرفيع" 
                 />
                 <FeatureItem 
                   icon={<Zap className="text-accent" />} 
                   title="دقة التنفيذ" 
                   desc="بأيدي أمهر الحرفيين والخبراء" 
                 />
              </div>

              <Link to="/about" className="inline-flex items-center gap-4 text-white font-bold text-lg group pt-4">
                اعرف المزيد عنا 
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
           </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 px-6 md:px-12 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            subtitle="معرض أعمالنا" 
            title="فخامة تتحدث عن نفسها" 
          />
          <GalleryGrid items={featuredProjects} />
          
          <div className="text-center mt-16">
            <button className="bg-white border-2 border-primary text-primary px-10 py-4 rounded-2xl text-lg font-black hover:bg-primary hover:text-white transition-all duration-300 shadow-xl shadow-primary/5">
              مشاهدة جميع المشاريع
            </button>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}

function FeatureItem({ icon, title, desc }) {
  return (
    <div className="flex gap-4 group">
      <div className="mt-1 transition-transform group-hover:scale-110">{icon}</div>
      <div className="text-right">
        <h4 className="text-white font-bold text-lg mb-1">{title}</h4>
        <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
