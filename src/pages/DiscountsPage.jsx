import { useState, useEffect, useMemo } from 'react';
import SectionTitle from '../components/ui/SectionTitle';
import DiscountCard from '../components/ui/DiscountCard';
import { getProducts, getCoupons, getProductsByCoupon } from '../services/api';
import { getImageUrl } from '../lib/utils';
import { motion } from 'framer-motion';
import { Star, Clock, Zap, Loader2, Tag, Copy } from 'lucide-react';

export default function DiscountsPage() {
  const [discountProducts, setDiscountProducts] = useState([]);
   const [activeCoupons, setActiveCoupons] = useState([]);
   const [discountTypeFilter, setDiscountTypeFilter] = useState('all');
   const [sortBy, setSortBy] = useState('highest');
  const [loading, setLoading] = useState(true);

   const isCouponActive = (coupon) => {
      if (!coupon || coupon.isActive === false) return false;
      if (!coupon.expiryDate) return true;
      return new Date(coupon.expiryDate).getTime() > Date.now();
   };

   const getCountdown = (expiryDate) => {
      if (!expiryDate) return 'بدون انتهاء';
      const diff = new Date(expiryDate).getTime() - Date.now();
      if (diff <= 0) return 'انتهى';
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(hours / 24);
      const remHours = hours % 24;
      return days > 0 ? `${days} يوم ${remHours} ساعة` : `${remHours} ساعة`;
   };

  useEffect(() => {
    const fetch = async () => {
      try {
            const [productsRes, couponsRes] = await Promise.allSettled([getProducts(), getCoupons()]);
            const products = productsRes.status === 'fulfilled' ? productsRes.value.data : [];
            const coupons = couponsRes.status === 'fulfilled' ? couponsRes.value.data : [];

            const extractedFromProducts = products
               .flatMap((p) => (Array.isArray(p.productCoupons) ? p.productCoupons : []))
               .map((pc) => pc?.coupon || pc)
               .filter((c) => c && c.code);

            const uniqueCoupons = [...coupons, ...extractedFromProducts].filter(
               (coupon, index, arr) => index === arr.findIndex((c) => c.id === coupon.id || c.code === coupon.code)
            );

            const couponById = uniqueCoupons.reduce((acc, coupon) => {
               if (coupon?.id != null) acc[coupon.id] = coupon;
               return acc;
            }, {});

            const active = uniqueCoupons.filter(isCouponActive);

            const couponProductsResults = await Promise.allSettled(
               active.filter((c) => c.id != null).map((coupon) => getProductsByCoupon(coupon.id))
            );

            const productsByCouponId = {};
            active.filter((c) => c.id != null).forEach((coupon, i) => {
               const res = couponProductsResults[i];
               productsByCouponId[coupon.id] = res?.status === 'fulfilled' && Array.isArray(res.value.data) ? res.value.data : [];
            });

            const activeWithMeta = active.map((coupon) => ({
               ...coupon,
               productsCount: coupon.id != null ? (productsByCouponId[coupon.id]?.length || 0) : 0,
            }));
            setActiveCoupons(activeWithMeta);

            const calcDiscountMeta = (price, coupon) => {
               if (typeof price !== 'number' || !coupon) return null;
               let newPrice = price;
               let discountValue = 0;

               if (coupon.discountType === 1) {
                  discountValue = coupon.discountValue;
                  newPrice = price - (price * (coupon.discountValue / 100));
               } else {
                  discountValue = Math.round((coupon.discountValue / price) * 100);
                  newPrice = price - coupon.discountValue;
               }

               return {
                  newPrice,
                  discount: discountValue,
               };
            };

            const productsMap = products.reduce((acc, p) => {
               if (p?.id != null) acc[p.id] = p;
               return acc;
            }, {});

            const productsFromProductLinks = products
               .filter((p) => Array.isArray(p.productCoupons) && p.productCoupons.length > 0)
               .map((product) => {
                  const couponRef = product.productCoupons[0];
                  const coupon = couponRef?.coupon || couponById[couponRef?.couponId] || couponRef;
                  if (!isCouponActive(coupon) || typeof coupon?.discountType !== 'number' || typeof coupon?.discountValue !== 'number') {
                     return null;
                  }

                  const calc = calcDiscountMeta(product.price, coupon);
                  if (!calc) return null;

                  return {
                     ...product,
                     oldPrice: product.price,
                     newPrice: calc.newPrice,
                     discount: calc.discount,
                     discountType: coupon.discountType,
                     couponCode: coupon.code,
                     expiryDate: coupon.expiryDate,
                     image: getImageUrl(product.imageUrl),
                     description: product.description,
                  };
               })
               .filter(Boolean);

            const productsFromCouponEndpoints = active.flatMap((coupon) => {
               if (coupon?.id == null) return [];
               const linkedProducts = productsByCouponId[coupon.id] || [];

               return linkedProducts
                  .map((linkedProduct) => {
                     const baseProduct = productsMap[linkedProduct.id] || linkedProduct;
                     if (!baseProduct || typeof baseProduct.price !== 'number') return null;

                     const calc = calcDiscountMeta(baseProduct.price, coupon);
                     if (!calc) return null;

                     return {
                        ...baseProduct,
                        oldPrice: baseProduct.price,
                        newPrice: calc.newPrice,
                        discount: calc.discount,
                        discountType: coupon.discountType,
                        couponCode: coupon.code,
                        expiryDate: coupon.expiryDate,
                        image: getImageUrl(baseProduct.imageUrl),
                        description: baseProduct.description,
                     };
                  })
                  .filter(Boolean);
            });

            const mergedByProduct = [...productsFromProductLinks, ...productsFromCouponEndpoints].reduce((acc, item) => {
               const current = acc[item.id];
               if (!current || item.discount > current.discount) {
                  acc[item.id] = item;
               }
               return acc;
            }, {});

            setDiscountProducts(Object.values(mergedByProduct));
      } catch (e) {
        console.error("Failed to fetch discounts", e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

   const copyCouponCode = async (code) => {
      try {
         await navigator.clipboard.writeText(code);
      } catch (e) {
         console.error('Failed to copy coupon code', e);
      }
   };

   const visibleDiscountProducts = useMemo(() => {
      let list = [...discountProducts];

      if (discountTypeFilter === 'percentage') {
         list = list.filter((p) => p.discountType === 1);
      } else if (discountTypeFilter === 'fixed') {
         list = list.filter((p) => p.discountType !== 1);
      }

      if (sortBy === 'highest') {
         list.sort((a, b) => b.discount - a.discount);
      } else if (sortBy === 'lowest') {
         list.sort((a, b) => a.discount - b.discount);
      } else if (sortBy === 'expiry') {
         list.sort((a, b) => new Date(a.expiryDate || 0).getTime() - new Date(b.expiryDate || 0).getTime());
      }

      return list;
   }, [discountProducts, discountTypeFilter, sortBy]);

   const heroCoupon = useMemo(() => {
      if (!activeCoupons.length) return null;

      const couponStrength = (coupon) => {
         if (coupon.discountType === 1) return coupon.discountValue;

         const related = discountProducts.filter((p) => p.couponCode === coupon.code);
         if (related.length > 0) {
            return Math.max(...related.map((p) => p.discount));
         }

         return coupon.discountValue;
      };

      return [...activeCoupons].sort((a, b) => couponStrength(b) - couponStrength(a))[0];
   }, [activeCoupons, discountProducts]);

  return (
    <div className="bg-cream min-h-screen py-24 px-6 md:px-12 pt-40 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionTitle 
          subtitle="عروض وخصومات حصرية" 
          title="افضل جودة بأفضل سعر" 
        />

        {/* Promo Banner */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="relative aspect-video lg:aspect-[3/1] rounded-[3rem] overflow-hidden shadow-2xl shadow-accent/10 border border-accent/20 mb-20 group"
        >
           <img 
             src="/images/IMG-20260323-WA0037.jpg" 
             alt="Luxury Showroom" 
             className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-l from-primary via-primary/60 to-transparent">
              <div className="absolute inset-y-0 right-0 p-12 md:p-20 flex flex-col justify-center text-right text-white space-y-8">
                 <div className="inline-flex items-center gap-3 bg-accent text-primary px-5 py-2 rounded-full w-fit">
                    <Zap size={20} className="fill-current" />
                    <span className="font-black text-sm uppercase tracking-widest">
                      {heroCoupon ? `عرض الكوبون الأقوى - ${heroCoupon.code}` : 'عرض محدود - شهر رمضان'}
                    </span>
                 </div>
                 <h2 className="text-4xl md:text-6xl font-black leading-tight">
                    وفر حتى{' '}
                    <span className="text-accent italic drop-shadow-md underline decoration-accent/40 decoration-wavy underline-offset-8">
                      {heroCoupon
                        ? heroCoupon.discountType === 1
                          ? `${Math.round(heroCoupon.discountValue)}%`
                          : `${Math.round(heroCoupon.discountValue)} ريال`
                        : '40%'}
                    </span>{' '}
                    <br />
                    {heroCoupon ? `على المنتجات المشمولة بكوبون ${heroCoupon.code}` : 'على جميع تصاميم المطابخ'}
                 </h2>
                 <p className="text-xl text-white/70 max-w-xl font-light">
                    {heroCoupon
                      ? `الكوبون متاح الآن على ${heroCoupon.productsCount || 0} منتج. استخدم الكود قبل انتهاء الوقت للحصول على أفضل سعر.`
                      : 'احجز موعدك الآن للمعاينة والقياس مجاناً، واحصل على طقم طاولات ضيافة هدية مع كل مطبخ.'}
                 </p>
                 <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => heroCoupon && copyCouponCode(heroCoupon.code)}
                      className="bg-white text-primary px-10 py-5 rounded-2xl text-lg font-black hover:bg-accent hover:text-white transition-all duration-400 shadow-xl shadow-white/5"
                    >
                       {heroCoupon ? `انسخ الكوبون ${heroCoupon.code}` : 'احصل على العرض'}
                    </button>
                    <div className="flex flex-col justify-center text-right pr-4 border-r-2 border-accent/30">
                       <p className="text-accent font-bold text-2xl h-8 flex items-center gap-2">
                          <Clock size={20} />
                          {heroCoupon ? getCountdown(heroCoupon.expiryDate) : '04:22:50'}
                       </p>
                       <p className="text-white/40 text-xs font-medium uppercase tracking-widest">ينتهي العرض قريباً</p>
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>

            {/* Coupon Cards */}
            {!loading && activeCoupons.length > 0 && (
               <section className="mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {activeCoupons.map((coupon, idx) => (
                        <motion.div
                           key={coupon.id || coupon.code}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.45, delay: idx * 0.06 }}
                           className="bg-white rounded-2xl border border-accent/20 p-5 shadow-md"
                        >
                           <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2 text-accent font-bold">
                                 <Tag size={16} />
                                 <span>كوبون نشط</span>
                              </div>
                              <span className="text-xs text-primary/50">
                                 {coupon.expiryDate ? `ينتهي ${new Date(coupon.expiryDate).toLocaleDateString('ar-EG')}` : 'بدون تاريخ انتهاء'}
                              </span>
                           </div>
                           <div className="text-2xl font-black text-primary mb-3 tracking-wide">{coupon.code}</div>
                           <div className="text-sm text-primary/70 mb-4">
                              {coupon.discountType === 1 ? `خصم ${coupon.discountValue}%` : `خصم ${coupon.discountValue} ريال`}
                           </div>
                           <div className="text-xs text-primary/60 mb-3">
                              المنتجات ضمن العرض: {coupon.productsCount}
                           </div>
                           <div className="text-xs text-red-500 font-bold mb-4 flex items-center gap-1">
                              <Clock size={14} />
                              متبقي: {getCountdown(coupon.expiryDate)}
                           </div>
                           <button
                              onClick={() => copyCouponCode(coupon.code)}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-accent transition-colors"
                           >
                              <Copy size={14} />
                              نسخ الكود
                           </button>
                        </motion.div>
                     ))}
                  </div>
               </section>
            )}

        {/* Grid of Discounts */}
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">
               <h3 className="text-2xl font-black text-primary">المنتجات التي عليها خصومات نشطة</h3>
               <div className="flex gap-3 flex-wrap">
                  <select
                     value={discountTypeFilter}
                     onChange={(e) => setDiscountTypeFilter(e.target.value)}
                     className="px-4 py-2 rounded-xl border border-primary/10 bg-white text-primary font-bold"
                  >
                     <option value="all">كل أنواع الخصم</option>
                     <option value="percentage">خصم نسبة %</option>
                     <option value="fixed">خصم مبلغ ثابت</option>
                  </select>
                  <select
                     value={sortBy}
                     onChange={(e) => setSortBy(e.target.value)}
                     className="px-4 py-2 rounded-xl border border-primary/10 bg-white text-primary font-bold"
                  >
                     <option value="highest">الأعلى خصماً</option>
                     <option value="lowest">الأقل خصماً</option>
                     <option value="expiry">الأقرب انتهاءً</option>
                  </select>
               </div>
            </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
             <div className="col-span-full flex justify-center p-12">
                <Loader2 className="animate-spin text-primary" size={32} />
             </div>
               ) : visibleDiscountProducts.length > 0 ? (
                   visibleDiscountProducts.map((promo, idx) => (
                <DiscountCard 
                   key={promo.id} 
                   {...promo} 
                   delay={idx * 0.1} 
                />
             ))
               ) : (
                   <div className="col-span-full text-center py-12 text-primary/60 font-bold">لا توجد منتجات مطابقة للفلاتر الحالية</div>
               )}
        </div>

        {/* Loyalty Program Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-24 bg-white rounded-[4rem] shadow-2xl shadow-primary/5 border border-primary/5 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
           <div className="space-y-8">
              <Star size={64} className="text-accent animate-spin-slow" />
              <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight">
                 برنامج <span className="text-accent italic">النخبة</span> للعملاء الدائمين
              </h2>
              <p className="text-xl text-primary/60 leading-relaxed max-w-lg">
                 نقدر ثقتكم بنا، ولهذا قمنا بتصميم برنامج مكافآت حصري يمنحكم خصومات إضافية وهدايا دورية.
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                 <button className="bg-primary text-white border-2 border-primary px-10 py-5 rounded-2xl text-lg font-black hover:bg-transparent hover:text-primary transition-all duration-300 shadow-xl shadow-primary/10">
                    انضم إلينا الآن
                 </button>
                 <button className="border-2 border-primary/10 text-primary px-10 py-5 rounded-2xl text-lg font-bold hover:border-accent hover:text-accent transition-all duration-300">
                    الشروط والأحكام
                 </button>
              </div>
           </div>
           <div className="relative group">
              <div className="absolute inset-0 bg-accent rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
              <img 
                src="/images/IMG-20260323-WA0041.jpg" 
                alt="Elite Furniture" 
                className="w-full relative z-10 rounded-[3rem] shadow-2xl shadow-black/20"
              />
              <div className="absolute -bottom-8 -left-8 bg-white border border-primary/5 p-8 rounded-3xl shadow-2xl z-20 animate-bounce-slow">
                 <p className="text-accent text-3xl font-black mb-1">VIP</p>
                 <p className="text-primary text-sm font-bold uppercase tracking-widest opacity-60 leading-relaxed">أولوية في التصنيع والشحن</p>
              </div>
           </div>
        </motion.section>
      </div>
    </div>
  );
}
