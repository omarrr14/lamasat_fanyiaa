import { useState } from 'react';
import ProductManager from '../components/admin/ProductManager';
import CouponManager from '../components/admin/CouponManager';
import { Package, Tag, LayoutDashboard } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50/50">
      {/* Sidebar */}
      <div className="md:w-64 bg-white shadow-lg z-10">
        <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3 text-primary">
                <LayoutDashboard size={28} />
                <h1 className="text-xl font-bold">لوحة التحكم</h1>
            </div>
        </div>
        <nav className="p-4 space-y-2">
            <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === 'products'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                }`}
            >
                <Package size={20} />
                <span className="font-medium">المنتجات</span>
            </button>
            <button
                onClick={() => setActiveTab('coupons')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === 'coupons'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                }`}
            >
                <Tag size={20} />
                <span className="font-medium">الكوبونات</span>
            </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
            {activeTab === 'products' ? <ProductManager /> : <CouponManager />}
        </div>
      </div>
    </div>
  );
}
