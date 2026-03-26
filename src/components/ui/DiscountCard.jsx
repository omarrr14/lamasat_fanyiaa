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
        {/* Discount Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-accent text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
          <Tag size={14} />
          خصم {discount}%
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-6 space-y-3">
        <h3 className="text-xl font-bold text-primary">{name}</h3>
        {description && <p className="text-sm text-primary/60 leading-relaxed">{description}</p>}
        <div className="flex items-end gap-4 pt-2">
          <div>
            <p className="text-sm text-primary/40 line-through">{oldPrice.toLocaleString()} ريال</p>
            <p className="text-2xl font-bold text-accent">{newPrice.toLocaleString()} <span className="text-sm font-normal">ريال</span></p>
          </div>
          <div className="mr-auto bg-green-50 text-green-700 font-semibold text-sm px-3 py-1.5 rounded-full">
            وفّر {(oldPrice - newPrice).toLocaleString()} ريال
          </div>
        </div>
        <button className="w-full mt-4 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-accent transition-colors duration-300 tracking-wide">
          اطلب الآن
        </button>
      </div>
    </motion.div>
  );
}
