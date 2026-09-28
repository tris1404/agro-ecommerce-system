import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  User, 
  PhoneCall, 
  Sprout, 
  Menu, 
  X, 
  ShieldCheck, 
  LogOut, 
  Settings, 
  ClipboardList, 
  Globe 
} from 'lucide-react';
import { useAuthStore } from '../../modules/auth/store/authStore';
import { useCartStore } from '../../modules/cart/store/cartStore';
import { useI18n } from '../../i18n';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuthStore();
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const { language, setLanguage, t } = useI18n();

  const cartItemCount = getTotalItems();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Banner Bar */}
      <div className="bg-agro-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-agro-200">
              <ShieldCheck className="w-3.5 h-3.5 text-agro-400" />
              100% Vật tư nông nghiệp chính hãng - Có kiểm định & VAT
            </span>
            <span className="hidden md:inline-block text-slate-400">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-200">
              <PhoneCall className="w-3 h-3 text-harvest-400" />
              Tư vấn kỹ thuật mùa vụ: <strong className="text-harvest-400 font-semibold ml-1">1800 6868</strong> (Miễn phí)
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center gap-1 text-slate-300">
              <Globe className="w-3.5 h-3.5" />
              <button
                onClick={() => setLanguage('vi')}
                className={`cursor-pointer px-1 py-0.5 rounded transition ${language === 'vi' ? 'font-bold text-white bg-agro-800' : 'hover:text-white'}`}
              >
                VN
              </button>
              <span>/</span>
              <button
                onClick={() => setLanguage('en')}
                className={`cursor-pointer px-1 py-0.5 rounded transition ${language === 'en' ? 'font-bold text-white bg-agro-800' : 'hover:text-white'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-agro-700 flex items-center justify-center text-white shadow-md group-hover:bg-agro-800 transition">
              <Sprout className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-agro-900 group-hover:text-agro-700 transition">
                Agro<span className="text-harvest-600">Care</span>
              </span>
              <span className="block text-[10px] tracking-wider uppercase font-semibold text-slate-500 -mt-1">
                Vật tư & Nông nghiệp
              </span>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-xl relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-4 pr-12 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-agro-600 focus:bg-white transition"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-agro-700 hover:bg-agro-800 text-white rounded-lg flex items-center justify-center transition cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* User actions */}
          <div className="flex items-center space-x-3 md:space-x-5">
            {/* User Dropdown */}
            <div className="relative">
              {isAuthenticated ? (
                <div>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 text-slate-700 hover:text-agro-700 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-agro-100 text-agro-800 flex items-center justify-center font-bold text-xs border border-agro-300">
                      {user?.username?.substring(0, 2).toUpperCase() || 'U'}
                    </div>
                    <span className="hidden md:inline-block text-sm font-medium">
                      {user?.username}
                    </span>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs text-slate-500 font-medium">Đăng nhập với</p>
                        <p className="text-sm font-bold text-slate-900 truncate">{user?.email}</p>
                      </div>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-harvest-700 font-semibold hover:bg-harvest-50"
                        >
                          <Settings className="w-4 h-4" />
                          {t('adminDashboard')}
                        </Link>
                      )}

                      <Link
                        to="/account/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        <ClipboardList className="w-4 h-4 text-slate-500" />
                        {t('orderHistory')}
                      </Link>

                      <Link
                        to="/account/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        <User className="w-4 h-4 text-slate-500" />
                        {t('myProfile')}
                      </Link>

                      <div className="border-t border-slate-100 my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        {t('logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-slate-700 hover:text-agro-700 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition"
                  >
                    {t('login')}
                  </Link>
                  <Link
                    to="/register"
                    className="hidden sm:inline-flex text-sm font-medium text-white bg-agro-700 hover:bg-agro-800 px-3.5 py-1.5 rounded-lg shadow-sm transition"
                  >
                    {t('register')}
                  </Link>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-700 hover:text-agro-700 rounded-xl hover:bg-slate-100 transition flex items-center"
              aria-label={t('cart')}
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-harvest-600 text-white font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 text-slate-700 hover:text-agro-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <form onSubmit={handleSearch} className="mt-3 sm:hidden relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-4 pr-10 py-2 bg-slate-100 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-agro-600 focus:bg-white"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 bg-agro-700 text-white rounded-lg flex items-center justify-center"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Categories Navigation Bar */}
      <nav className="bg-agro-800 text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center space-x-8 text-sm font-medium py-2.5">
            <li>
              <Link to="/products" className="hover:text-emerald-300 transition flex items-center gap-1.5">
                <span>{t('allProducts')}</span>
              </Link>
            </li>
            <li>
              <Link to="/products?category=crop_protection" className="hover:text-emerald-300 transition">
                {t('cropProtection')}
              </Link>
            </li>
            <li>
              <Link to="/products?category=fertilizer" className="hover:text-emerald-300 transition">
                {t('fertilizers')}
              </Link>
            </li>
            <li>
              <Link to="/products?category=seeds" className="hover:text-emerald-300 transition">
                {t('seeds')}
              </Link>
            </li>
            <li>
              <Link to="/products?category=equipment" className="hover:text-emerald-300 transition">
                {t('sprayers')}
              </Link>
            </li>
            <li className="ml-auto text-harvest-300 flex items-center gap-1">
              <span>🌾 Khuyến mãi mùa vụ: Giảm 10% đơn đầu tiên với mã <strong>AGRO50K</strong></span>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2">
          <Link
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-medium hover:text-agro-700"
          >
            {t('allProducts')}
          </Link>
          <Link
            to="/products?category=crop_protection"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-medium hover:text-agro-700"
          >
            {t('cropProtection')}
          </Link>
          <Link
            to="/products?category=fertilizer"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-medium hover:text-agro-700"
          >
            {t('fertilizers')}
          </Link>
          <Link
            to="/products?category=seeds"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-medium hover:text-agro-700"
          >
            {t('seeds')}
          </Link>
          <Link
            to="/products?category=equipment"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-medium hover:text-agro-700"
          >
            {t('sprayers')}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
