import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  AlertTriangle, 
  ArrowUpRight, 
  Package, 
  Eye, 
  ChevronRight 
} from 'lucide-react';
import { useOrderStore } from '../../checkout/store/orderStore';
import { MOCK_PRODUCTS } from '../../../api/mockData';

export const DashboardPage: React.FC = () => {
  const { orders } = useOrderStore();
  const formatCurrency = (amt: number) => new Intl.NumberFormat('vi-VN').format(amt) + '₫';

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0) + 128450000;
  const recentOrders = orders.slice(0, 5);
  const lowStockProducts = MOCK_PRODUCTS.filter((p) => p.stock < 100);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Bảng Điều Khiển Quản Trị
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Theo dõi doanh thu mùa vụ, tình trạng xuất nhập kho vật tư và đơn hàng trực tuyến
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Revenue */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
            <span className="font-semibold uppercase tracking-wider">Doanh Thu Vụ Này</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {formatCurrency(totalRevenue)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% so với cùng kỳ năm trước</span>
          </div>
        </div>

        {/* KPI 2: Total Orders */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
            <span className="font-semibold uppercase tracking-wider">Tổng Đơn Hàng</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {orders.length + 38} Đơn
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
            <span>Có <strong className="text-agro-700">12 đơn</strong> đang giao về các xã</span>
          </div>
        </div>

        {/* KPI 3: Farmers & Customers */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
            <span className="font-semibold uppercase tracking-wider">Hộ Nông Dân / Đại Lý</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            1,248 Hộ
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-indigo-600">
            <span>+35 tài khoản đăng ký mới tuần này</span>
          </div>
        </div>

        {/* KPI 4: Low Stock Alert */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
            <span className="font-semibold uppercase tracking-wider">Cảnh Báo Tồn Kho</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 tracking-tight">
            {lowStockProducts.length} Sản Phẩm
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-700 font-medium">
            <span>Máy xịt Oshima & ST25 sắp hết hàng</span>
          </div>
        </div>
      </div>

      {/* Revenue Trend Visual Chart */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Biểu Đồ Doanh Thu Theo Tháng (Triệu Đồng)</h2>
            <p className="text-xs text-slate-400">Doanh thu tăng mạnh vào các đợt xuống giống vụ Đông Xuân & Hè Thu</p>
          </div>
          <span className="text-xs font-semibold text-agro-700 bg-agro-50 px-2.5 py-1 rounded-md border border-agro-200">
            Năm 2026
          </span>
        </div>

        {/* SVG Bar Chart Visualization */}
        <div className="h-56 flex items-end justify-between gap-2 pt-6 px-2">
          {[
            { month: 'T1', val: 45, full: '45 Tr' },
            { month: 'T2', val: 38, full: '38 Tr' },
            { month: 'T3', val: 72, full: '72 Tr' },
            { month: 'T4', val: 95, full: '95 Tr' },
            { month: 'T5', val: 60, full: '60 Tr' },
            { month: 'T6', val: 82, full: '82 Tr' },
            { month: 'T7', val: 78, full: '78 Tr' },
            { month: 'T8', val: 110, full: '110 Tr' },
            { month: 'T9', val: 128, full: '128.4 Tr' },
          ].map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition font-bold">
                {bar.full}
              </span>
              <div
                className="w-full bg-agro-100 hover:bg-agro-600 rounded-t-lg transition-all duration-300 relative group-hover:scale-y-105"
                style={{ height: `${(bar.val / 130) * 160}px` }}
              ></div>
              <span className="text-xs font-bold text-slate-600">{bar.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column: Recent Orders + Best Sellers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders (Col 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Đơn Hàng Gần Đây Cần Xử Lý</h2>
            <Link to="/admin/orders" className="text-xs font-bold text-agro-700 hover:underline">
              Xem tất cả
            </Link>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {recentOrders.map((ord) => (
              <div key={ord.id} className="py-3 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-agro-900">{ord.orderCode}</span>
                    <span className="text-slate-400">• {ord.shippingAddress.fullName}</span>
                  </div>
                  <p className="text-slate-500 mt-0.5">
                    {ord.shippingAddress.provinceName} • {ord.items.length} mặt hàng
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-bold text-slate-900 block">{formatCurrency(ord.totalAmount)}</span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Best Sellers (Col 5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Top Vật Tư Bán Chạy Nhất</h2>
            <Link to="/admin/products" className="text-xs font-bold text-agro-700 hover:underline">
              Kho hàng
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_PRODUCTS.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 text-xs">
                <img src={p.thumbnail} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 truncate">{p.name}</p>
                  <p className="text-slate-500">Đã bán: <strong className="text-agro-800">{p.soldCount}</strong> {p.unit}</p>
                </div>
                <span className="font-bold text-slate-900">{formatCurrency(p.price)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
