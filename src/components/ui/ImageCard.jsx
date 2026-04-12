import { motion } from 'framer-motion';

export default function ImageCard({ image, title, description, delay = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50"
    >
      {/* Image Container */}
      <div className="aspect-[4/5] w-full overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          loading="lazy"
        />
        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Section - BELOW the image */}
      <div className="p-8 space-y-3 bg-white flex flex-col items-start text-right">
        <div className="w-12 h-1 bg-accent/20 rounded-full group-hover:w-20 transition-all duration-500" />
        <h3 className="text-2xl font-black text-primary group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        {description && (
          <p className="text-primary/60 text-base leading-relaxed font-medium">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
