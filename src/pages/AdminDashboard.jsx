import { useEffect, useState } from 'react';
import ProductManager from '../components/admin/ProductManager';
import CouponManager from '../components/admin/CouponManager';
import { Package, Tag, LayoutDashboard } from 'lucide-react';

const ADMIN_USERNAME = 'lamasat_fanyiaa';
const ADMIN_PASSWORD = 'lamasat_fanyiaa8520';
const ADMIN_AUTH_STORAGE_KEY = 'lamasat_admin_authenticated';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem(ADMIN_AUTH_STORAGE_KEY);
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAuthError('');
      setIsAuthenticated(true);
      localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, 'true');
      return;
    }

    setAuthError('اسم المستخدم أو كلمة المرور غير صحيحة');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setAuthError('');
    localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-primary mb-2">تسجيل دخول الإدارة</h1>
          <p className="text-gray-500 mb-6">أدخل بيانات الدخول للوصول إلى لوحة التحكم</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم المستخدم</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                placeholder="اسم المستخدم"
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                placeholder="كلمة المرور"
                autoComplete="current-password"
                required
              />
            </div>

            {authError ? <p className="text-sm text-red-600">{authError}</p> : null}

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              دخول
            </button>
          </form>
        </div>
      </div>
    );
  }

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
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            تسجيل الخروج
          </button>
        </div>
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
