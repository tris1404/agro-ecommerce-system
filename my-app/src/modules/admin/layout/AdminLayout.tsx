import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  ExternalLink, 
  Sprout, 
  Menu, 
  X, 
  LogOut, 
  Bell, 
  Plus 
} from 'lucide-react';
import { useAuthStore } from '../../auth/store/authStore';
import { ToastContainer } from '../../../components/common/Toast';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/admin', end: true, label: 'Bảng Điều Khiển', icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: '/admin/products', end: false, label: 'Quản Lý Sản Phẩm', icon: <Package className="w-5 h-5" /> },
    { to: '/admin/orders', end: false, label: 'Quản Lý Đơn Hàng', icon: <ShoppingBag className="w-5 h-5" /> },
    { to: '/admin/customers', end: false, label: 'Danh Sách Khách Hàng', icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-950 border-r border-slate-800 p-5 justify-between">
        <div className="space-y-8">
          {/* Logo */}
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-agro-700 flex items-center justify-center text-white shadow-md">
              <Sprout className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white">
                Agro<span className="text-harvest-500">Care</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Portal Quản Trị
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition
                  ${isActive
                    ? 'bg-agro-800 text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-3 pt-6 border-t border-slate-800">
          <Link
            to="/"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-900 transition"
          >
            <ExternalLink className="w-4 h-4 text-emerald-400" />
            <span>Xem Website Bán Hàng</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 transition cursor-pointer text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] text-slate-800">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
              Hệ thống Quản Trị Vật Tư Nông Nghiệp
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/admin/products/new"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-agro-700 hover:bg-agro-800 text-white rounded-xl text-xs font-bold shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm sản phẩm</span>
            </Link>

            {/* Admin Profile */}
            <div className="flex items-center gap-2.5 pl-4 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-agro-800 text-white flex items-center justify-center font-bold text-xs">
                A
              </div>
              <div className="hidden sm:block text-left text-xs">
                <p className="font-bold text-slate-900">{user?.username || 'Quản trị viên'}</p>
                <p className="text-[10px] text-emerald-700 font-semibold uppercase">Admin Role</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative w-64 bg-slate-950 text-white h-full p-5 flex flex-col justify-between z-10 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-black tracking-tight text-white">
                  Agro<span className="text-harvest-500">Care</span>
                </span>
                <button onClick={() => setSidebarOpen(false)} className="p-1 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1.5">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition
                      ${isActive
                        ? 'bg-agro-800 text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                      }
                    `}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-800">
              <Link
                to="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2 text-xs text-slate-400"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Xem Website Bán Hàng</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AdminLayout;
