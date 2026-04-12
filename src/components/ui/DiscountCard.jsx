import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';

export default function DiscountCard({ name, oldPrice, newPrice, discount, image, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 border border-primary/5"
    >
      <div className="relative overflow-hidden aspect-[3/2]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-4 bg-white">
        <a 
          href={`https://wa.me/966544099765?text=${encodeURIComponent(`أود طلب العرض: ${name}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-accent/40 text-center"
        >
          اطلب الآن
        </a>
      </div>
    </motion.div>
  );
}
