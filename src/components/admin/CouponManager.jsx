import { useState, useEffect } from 'react';
import { 
  getCoupons, createCoupon, updateCoupon, deleteCoupon, 
  assignCouponToProducts, removeCouponFromProducts, getProducts, getProductsByCoupon
} from '../../services/api';
import { Pencil, Trash2, Plus, X, Loader2, Link2 } from 'lucide-react';

export default function CouponManager() {
  const [coupons, setCoupons] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingAssignments, setLoadingAssignments] = useState(false);
  const [modalType, setModalType] = useState(null); // 'create', 'edit', 'assign'
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  
  const [formData, setFormData] = useState({
    code: '',
    discountValue: '',
    discountType: 1, // 1 for Percentage, 2 for Fixed
    expiryDate: '',
    isActive: true
  });

  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [originalProductIds, setOriginalProductIds] = useState([]);

  useEffect(() => {
    fetchCoupons();
    fetchProducts();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await getCoupons();
      setCoupons(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching coupons:', error);
      setError('فشل في تحميل الكوبونات، يرجى التحقق من اتصال الخادم');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCouponProducts = async (couponId) => {
    setLoadingAssignments(true);
    try {
        const response = await getProductsByCoupon(couponId);
        const assignedIds = Array.isArray(response.data) ? response.data.map(p => p.id) : [];
        setSelectedProductIds(assignedIds);
        setOriginalProductIds(assignedIds);
    } catch (error) {
        console.error('Error fetching coupon products:', error);
        setSelectedProductIds([]);
        setOriginalProductIds([]);
    } finally {
        setLoadingAssignments(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        discountValue: Number(formData.discountValue),
        discountType: Number(formData.discountType),
        expiryDate: new Date(formData.expiryDate).toISOString()
      };

      if (modalType === 'edit') {
        await updateCoupon(selectedCoupon.id, payload);
      } else {
        await createCoupon(payload);
      }
      await fetchCoupons();
      closeModal();
    } catch (error) {
      console.error('Error saving coupon:', error);
      alert('Failed to save coupon');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await deleteCoupon(id);
        setCoupons(prev => prev.filter(c => c.id !== id));
      } catch (error) {
        console.error('Error deleting coupon:', error);
      }
    }
  };

  const handleAssignSubmit = async () => {
    if (!selectedCoupon) return;
    setLoading(true);
    try {
        const toAssign = selectedProductIds.filter(id => !originalProductIds.includes(id));
        const toRemove = originalProductIds.filter(id => !selectedProductIds.includes(id));

        if (toAssign.length > 0) {
          await assignCouponToProducts(selectedCoupon.id, toAssign);
        }
        
        if (toRemove.length > 0) {
          await removeCouponFromProducts(selectedCoupon.id, toRemove);
        }

        alert('تم تحديث المنتجات بنجاح');
        closeModal();
    } catch (error) {
        console.error('Error assigning products:', error);
        alert('فشل في تعيين المنتجات');
    } finally {
        setLoading(false);
    }
  };

  const openFormModal = (coupon = null) => {
    if (coupon) {
      setModalType('edit');
      setSelectedCoupon(coupon);
      setFormData({
        code: coupon.code,
        discountValue: coupon.discountValue,
        discountType: coupon.discountType,
        expiryDate: coupon.expiryDate ? coupon.expiryDate.split('T')[0] : '',
        isActive: coupon.isActive
      });
    } else {
      setModalType('create');
      setSelectedCoupon(null);
      setFormData({
        code: '',
        discountValue: '',
        discountType: 1,
        expiryDate: '',
        isActive: true
      });
    }
  };

  const openAssignModal = (coupon) => {
    setModalType('assign');
    setSelectedCoupon(coupon);
    fetchCouponProducts(coupon.id);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedCoupon(null);
    setSelectedProductIds([]);
    setOriginalProductIds([]);
  };

  if (loading && !modalType && coupons.length === 0) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-primary" size={48} />
        </div>
      );
  }

  if (error && !modalType && coupons.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center h-64 text-center space-y-4">
          <p className="text-red-500 font-bold text-lg">{error}</p>
          <button 
             onClick={() => { setLoading(true); fetchCoupons(); }}
             className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
          >
             إعادة المحاولة
          </button>
        </div>
      );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">إدارة الكوبونات</h2>
        <button
          onClick={() => openFormModal()}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          إنشاء كوبون
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
        <table className="w-full text-right">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="p-4 font-semibold">الكود</th>
              <th className="p-4 font-semibold">القيمة</th>
              <th className="p-4 font-semibold">النوع</th>
              <th className="p-4 font-semibold">تاريخ الانتهاء</th>
              <th className="p-4 font-semibold">الحالة</th>
              <th className="p-4 font-semibold">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {coupons.map(coupon => (
              <tr key={coupon.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-mono font-bold text-primary">{coupon.code}</td>
                <td className="p-4">{coupon.discountValue}</td>
                <td className="p-4 text-sm">
                  {coupon.discountType === 1 ? 'نسبة مئوية' : 'مبلغ ثابت'}
                </td>
                <td className="p-4 text-sm">
                  {coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString('ar-EG') : '-'}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${coupon.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {coupon.isActive ? 'نشط' : 'غير نشط'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openAssignModal(coupon)}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors flex items-center gap-1"
                      title="تعيين منتجات"
                    >
                      <Link2 size={18} />
                      <span className="text-xs font-bold hidden md:inline">ربط منتجات</span>
                    </button>
                    <button
                      onClick={() => openFormModal(coupon)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      title="تعديل"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(coupon.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="حذف"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalType && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-xl font-bold text-primary mb-6">
              {modalType === 'assign' ? 'تعيين المنتجات للكوبون' : (modalType === 'edit' ? 'تعديل الكوبون' : 'إنشاء كوبون جديد')}
            </h3>

            {modalType === 'assign' ? (
              <div className="space-y-4">
                {loadingAssignments ? (
                    <div className="flex justify-center p-4">
                        <Loader2 className="animate-spin text-primary" size={32} />
                    </div>
                ) : (
                <>
                <p className="text-sm text-gray-600 mb-2">
                    الكود: <span className="font-bold">{selectedCoupon?.code}</span>
                    <br/>
                    اختر المنتجات التي ينطبق عليها هذا الكوبون:
                </p>
                <div className="border rounded-lg max-h-60 overflow-y-auto divide-y bg-gray-50">
                  {products.length === 0 && <p className="p-3 text-center text-gray-500">لا توجد منتجات متاحة</p>}
                  {products.map(product => (
                    <label key={product.id} className="flex items-center p-3 hover:bg-white cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary accent-primary"
                        checked={selectedProductIds.includes(product.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProductIds([...selectedProductIds, product.id]);
                          } else {
                            setSelectedProductIds(selectedProductIds.filter(id => id !== product.id));
                          }
                        }}
                      />
                      <span className="mr-3 text-sm font-medium text-gray-700">{product.name}</span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={handleAssignSubmit}
                  disabled={loading}
                  className="w-full bg-primary/95 text-white py-2 rounded-lg font-bold hover:bg-primary transition-colors mt-4 shadow-lg disabled:opacity-70 flex justify-center"
                >
                  {loading ? <Loader2 className="animate-spin" /> : 'حفظ التعيينات'}
                </button>
                </>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">كود الكوبون</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">نوع الخصم</label>
                        <select
                            name="discountType"
                            value={formData.discountType}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        >
                            <option value={1}>نسبة مئوية (%)</option>
                            <option value={2}>مبلغ ثابت</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">قيمة الخصم</label>
                        <input
                            type="number"
                            name="discountValue"
                            value={formData.discountValue}
                            onChange={handleInputChange}
                            required
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        />
                    </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الانتهاء</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-gray-700">الكوبون نشط</label>
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {loading && <Loader2 className="animate-spin" size={20} />}
                    {modalType === 'edit' ? 'حفظ التغييرات' : 'إنشاء الكوبون'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}