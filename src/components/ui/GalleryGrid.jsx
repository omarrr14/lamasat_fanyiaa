import { motion } from 'framer-motion';

export default function GalleryGrid({ items }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`group relative overflow-hidden rounded-xl shadow-md cursor-pointer ${
            index === 0 ? 'col-span-2 row-span-2' : ''
          }`}
          style={{ aspectRatio: index === 0 ? '1/1' : '4/3' }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute bottom-0 p-5">
              <p className="text-accent text-xs font-semibold mb-1 uppercase tracking-widest">{item.category}</p>
              <h4 className="text-white text-lg font-bold">{item.title}</h4>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
