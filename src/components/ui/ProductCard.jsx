import { motion } from 'framer-motion';

export default function ProductCard({ product, delay = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          loading="lazy"
        />
        {/* Animated Overlay */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm transform translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <span className="text-xs font-bold text-primary">{product.category}</span>
        </div>
      </div>

      {/* Content Section - BELOW image */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">
          {product.description || 'منتج عالي الجودة مصنوع من أفضل أنواع الأخشاب الطبيعية بتصميم عصري يناسب ذوقك الرفيع.'}
        </p>
        
        {/* Price and Action */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="font-black text-2xl text-accent flex items-center gap-1">
            {product.price} <span className="text-sm font-bold text-gray-400">ر.س</span>
          </div>
          
          <button className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
