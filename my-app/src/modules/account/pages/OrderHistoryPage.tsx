import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle2, Truck, XCircle, ChevronRight, Eye } from 'lucide-react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import AccountSidebar from '../components/AccountSidebar';
import { useOrderStore } from '../../checkout/store/orderStore';
import { useAuthStore } from '../../auth/store/authStore';
import { OrderStatus } from '../../../types';
import { useI18n } from '../../../i18n';

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode }> = {
  PENDING: { label: 'Chờ xác nhận', color: 'bg-amber-100 text-amber-800 border-amber-300', icon: <Clock className="w-3.5 h-3.5" /> },
  CONFIRMED: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-800 border-blue-300', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  PROCESSING: { label: 'Đang chuẩn bị hàng', color: 'bg-indigo-100 text-indigo-800 border-indigo-300', icon: <Package className="w-3.5 h-3.5" /> },
  SHIPPING: { label: 'Đang vận chuyển', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: <Truck className="w-3.5 h-3.5" /> },
  COMPLETED: { label: 'Hoàn thành', color: 'bg-green-100 text-green-900 border-green-300', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  CANCELLED: { label: 'Đã hủy', color: 'bg-red-100 text-red-800 border-red-300', icon: <XCircle className="w-3.5 h-3.5" /> },
};

export const OrderHistoryPage: React.FC = () => {
  const { user } = useAuthStore();
  const { orders } = useOrderStore();
  const { t } = useI18n();

  const [activeTab, setActiveTab] = useState<'ALL' | OrderStatus>('ALL');

  const filteredOrders = activeTab === 'ALL'
    ? orders
    : orders.filter((o) => o.status === activeTab);

  const formatCurrency = (amt: number) => new Intl.NumberFormat('vi-VN').format(amt) + '₫';

  const tabs: { id: 'ALL' | OrderStatus; label: string }[] = [
    { id: 'ALL', label: 'Tất cả' },
    { id: 'CONFIRMED', label: 'Đã xác nhận' },
    { id: 'SHIPPING', label: 'Đang giao' },
    { id: 'COMPLETED', label: 'Hoàn thành' },
    { id: 'CANCELLED', label: 'Đã hủy' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <AccountSidebar />
          </div>

          {/* Orders Main Content */}
          <div className="lg:col-span-9 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-4">
                {t('orderHistory')}
              </h1>

              {/* Status Tabs */}
              <div className="flex border-b border-slate-200 overflow-x-auto gap-2 pb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      px-4 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 cursor-pointer
                      ${activeTab === tab.id
                        ? 'bg-agro-800 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Orders List */}
              <div className="mt-6 space-y-4">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => {
                    const statusInfo = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;

                    return (
                      <div
                        key={order.id}
                        className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition shadow-xs space-y-4"
                      >
                        {/* Order Header */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-sm text-agro-800">
                              {order.orderCode}
                            </span>
                            <span className="text-xs text-slate-400">
                              {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.color}`}>
                              {statusInfo.icon}
                              <span>{statusInfo.label}</span>
                            </span>
                          </div>
                        </div>

                        {/* Order Items Snippet */}
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between text-xs gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <img
                                  src={item.thumbnail}
                                  alt=""
                                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                                />
                                <div className="min-w-0">
                                  <p className="font-semibold text-slate-900 truncate">{item.productName}</p>
                                  <p className="text-slate-500">{item.variantName} × {item.quantity}</p>
                                </div>
                              </div>
                              <span className="font-bold text-slate-800 flex-shrink-0">
                                {formatCurrency(item.totalPrice)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Footer & Actions */}
                        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div>
                            <span className="text-slate-500">Hình thức thanh toán: </span>
                            <strong className="text-slate-800">
                              {order.paymentMethod === 'VNPAY' ? 'VNPAY Online' : 'Tiền mặt khi nhận hàng (COD)'}
                            </strong>
                          </div>

                          <div className="flex items-center gap-4">
                            <div>
                              <span className="text-slate-500">Tổng tiền: </span>
                              <span className="text-base font-black text-agro-800">
                                {formatCurrency(order.totalAmount)}
                              </span>
                            </div>

                            <Link
                              to={`/account/orders/${order.id}`}
                              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Chi tiết</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                    <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">Không có đơn hàng nào trong trạng thái này.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
