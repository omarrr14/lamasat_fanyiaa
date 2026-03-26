import { useState, useMemo } from 'react';
import SectionTitle from '../components/ui/SectionTitle';
import ProductCard from '../components/ui/ProductCard';
import { products, categories } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search } from 'lucide-react';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = activeCategory === 'الكل' || product.category === activeCategory;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-cream min-h-screen py-24 px-6 md:px-12 pt-40">
      <div className="max-w-7xl mx-auto">
        <SectionTitle 
          subtitle="مجموعتنا الكاملة" 
          title="افتح آفاقاً جديدة لمنزلك" 
        />

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between mb-16 px-4 py-8 bg-white/50 backdrop-blur-md rounded-[3rem] border border-white/40 shadow-xl shadow-primary/5">
           {/* Category Toggles */}
           <div className="flex flex-wrap justify-center gap-3">
             <FilterBtn 
               active={activeCategory === 'الكل'} 
               onClick={() => setActiveCategory('الكل')} 
               text="الكل" 
             />
             {categories.map((cat) => (
               <FilterBtn 
                 key={cat.id} 
                 active={activeCategory === cat.name} 
                 onClick={() => setActiveCategory(cat.name)} 
                 text={cat.name} 
               />
             ))}
           </div>

           {/* Search Bar */}
           <div className="relative w-full lg:max-w-md">
             <input
               type="text"
               placeholder="ابحث عن منتج محدد..."
               className="w-full bg-cream rounded-full p-4 pr-12 focus:bg-white focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 text-primary font-medium"
               value={searchQuery || ''}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
             <div className="absolute top-1/2 right-4 -translate-y-1/2 p-2 bg-primary rounded-full text-white shadow-lg">
                <Search size={18} />
             </div>
           </div>
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-white/20 rounded-3xl"
          >
            <div className="bg-primary/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
               <Search size={40} className="text-primary/20" />
            </div>
            <h3 className="text-2xl font-bold text-primary/40">عذراً، لم نجد نتائج لطلبك</h3>
            <p className="text-primary/30 mt-2 font-medium">جرب البحث بكلمة مفتاحية مختلفة أو فئة أخرى</p>
            <button 
              onClick={() => {setActiveCategory('الكل'); setSearchQuery('');}}
              className="mt-8 text-accent font-bold border-b-2 border-accent hover:text-primary hover:border-primary transition-colors pb-1"
            >
              عرض جميع المنتجات
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function FilterBtn({ active, onClick, text }) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border-2 ${
        active 
        ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105' 
        : 'text-primary border-primary/10 hover:border-accent hover:text-accent hover:bg-accent/5'
      }`}
    >
      {text}
    </button>
  );
}
