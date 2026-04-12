import { motion } from 'framer-motion';
import { getImageUrl } from '../../lib/utils';

export default function ProductCard({ product, delay = 0 }) {
  const imageSrc = product.imageUrl ? getImageUrl(product.imageUrl) : product.image;

  // Coupon logic
  const fallbackCoupon = Array.isArray(product.productCoupons) && product.productCoupons.length > 0
    ? (product.productCoupons[0]?.coupon || product.productCoupons[0])
    : null;
  const coupon = product.activeCoupon || fallbackCoupon;
  const hasCoupon = Boolean(
    coupon &&
    typeof coupon.discountType === 'number' &&
    typeof coupon.discountValue === 'number' &&
    coupon.isActive !== false
  );
  let newPrice = product.price;
  let discountValue = 0;
  let discountType = 1;
  let couponCode = '';
  if (hasCoupon) {
    discountType = coupon.discountType;
    couponCode = coupon.code || '';
    if (discountType === 1) {
      discountValue = coupon.discountValue;
      newPrice = product.price - (product.price * (coupon.discountValue / 100));
    } else {
      discountValue = Math.round((coupon.discountValue / product.price) * 100);
      newPrice = product.price - coupon.discountValue;
    }
  }

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
          src={imageSrc} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          loading="lazy"
        />
        {/* Animated Overlay */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Action Section */}
      <div className="p-4 bg-white">
        <a 
          href={`https://wa.me/966544099765?text=${encodeURIComponent(`أود طلب المنتج: ${product.name}`)}`}
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
