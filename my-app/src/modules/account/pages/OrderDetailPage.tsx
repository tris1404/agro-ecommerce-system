import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Package, 
  Truck, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  Printer 
} from 'lucide-react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import AccountSidebar from '../components/AccountSidebar';
import { useOrderStore } from '../../checkout/store/orderStore';
import { OrderStatus } from '../../../types';

const STEPS: { status: OrderStatus; label: string; icon: React.ReactNode }[] = [
  { status: 'PENDING', label: 'Chờ xác nhận', icon: <Clock className="w-4 h-4" /> },
  { status: 'CONFIRMED', label: 'Đã xác nhận', icon: <CheckCircle2 className="w-4 h-4" /> },
  { status: 'PROCESSING', label: 'Đóng gói', icon: <Package className="w-4 h-4" /> },
  { status: 'SHIPPING', label: 'Đang vận chuyển', icon: <Truck className="w-4 h-4" /> },
  { status: 'COMPLETED', label: 'Hoàn thành', icon: <CheckCircle2 className="w-4 h-4" /> },
];

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const getOrderById = useOrderStore((state) => state.getOrderById);

  const order = id ? getOrderById(id) : undefined;
  const formatCurrency = (amt: number) => new Intl.NumberFormat('vi-VN').format(amt) + '₫';

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8fafc]">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy đơn hàng</h2>
          <Link to="/account/orders" className="text-xs text-agro-700 font-bold hover:underline">
            Quay lại lịch sử đơn hàng
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate step index
  const statusOrder = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPING', 'COMPLETED'];
  const currentStepIndex = statusOrder.indexOf(order.status);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <AccountSidebar />
          </div>

          <div className="lg:col-span-9 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-8">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="space-y-1">
                  <Link
                    to="/account/orders"
                    className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-agro-700 font-medium mb-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Lịch sử đơn hàng</span>
                  </Link>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Chi Tiết Đơn Hàng: <span className="text-agro-800 font-mono">{order.orderCode}</span>
                  </h1>
                  <p className="text-xs text-slate-400">
                    Đặt lúc: {new Date(order.createdAt).toLocaleString('vi-VN')}
                  </p>
                </div>

                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>In hóa đơn</span>
                </button>
              </div>

              {/* 5-Step Order Journey Progress Bar */}
              {order.status !== 'CANCELLED' ? (
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">
                    Hành Trình Giao Hàng
                  </h3>
                  <div className="relative flex items-center justify-between max-w-2xl mx-auto px-4">
                    {/* Connecting line */}
                    <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 -z-0">
                      <div
                        className="h-full bg-agro-700 transition-all duration-500"
                        style={{
                          width: `${(Math.max(0, currentStepIndex) / (STEPS.length - 1)) * 100}%`,
                        }}
                      ></div>
                    </div>

                    {STEPS.map((step, idx) => {
                      const isDone = currentStepIndex >= idx;
                      const isCurrent = currentStepIndex === idx;

                      return (
                        <div key={step.status} className="relative z-10 flex flex-col items-center">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition shadow-sm ${
                              isDone
                                ? 'bg-agro-700 text-white'
                                : 'bg-white border-2 border-slate-300 text-slate-400'
                            } ${isCurrent ? 'ring-4 ring-agro-200' : ''}`}
                          >
                            {step.icon}
                          </div>
                          <span
                            className={`text-[11px] font-semibold mt-2 text-center max-w-[80px] leading-tight ${
                              isDone ? 'text-agro-900 font-bold' : 'text-slate-400'
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-red-50 text-red-800 rounded-2xl border border-red-200 text-xs font-semibold text-center">
                  Đơn hàng này đã bị hủy bỏ.
                </div>
              )}

              {/* Shipping & Payment Meta */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                    <MapPin className="w-4 h-4 text-agro-700" />
                    <span>Địa Chỉ Nhận Hàng</span>
                  </h4>
                  <p className="font-bold text-slate-800">
                    {order.shippingAddress.fullName} - {order.shippingAddress.phone}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {order.shippingAddress.detailAddress}, {order.shippingAddress.wardName}, {order.shippingAddress.districtName}, {order.shippingAddress.provinceName}
                  </p>
                  {order.note && (
                    <p className="text-slate-500 pt-1 italic">Ghi chú: "{order.note}"</p>
                  )}
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                    <CreditCard className="w-4 h-4 text-agro-700" />
                    <span>Phương Thức Thanh Toán</span>
                  </h4>
                  <p className="font-semibold text-slate-800">
                    {order.paymentMethod === 'VNPAY' ? 'Thanh toán trực tuyến VNPAY' : 'Thanh toán tiền mặt khi nhận hàng (COD)'}
                  </p>
                  <p className="text-slate-600">
                    Trạng thái: <strong className={order.paymentStatus === 'PAID' ? 'text-emerald-700' : 'text-amber-700'}>
                      {order.paymentStatus === 'PAID' ? 'Đã thanh toán đủ' : 'Chưa thanh toán (Thanh toán khi nhận)'}
                    </strong>
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Danh Sách Vật Tư Đặt Mua</h3>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                  {order.items.map((item) => (
                    <div key={item.id} className="p-4 flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-sm text-slate-900">{item.productName}</p>
                          <p className="text-slate-500">Quy cách: {item.variantName}</p>
                          <p className="text-slate-500 font-medium">{formatCurrency(item.price)} × {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-slate-900">
                        {formatCurrency(item.totalPrice)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Summary */}
              <div className="max-w-xs ml-auto space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Tiền hàng:</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(order.subtotal)}</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Mã giảm giá:</span>
                    <span>-{formatCurrency(order.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Phí vận chuyển:</span>
                  <span className="font-semibold text-slate-900">
                    {order.shippingFee === 0 ? 'Miễn phí' : formatCurrency(order.shippingFee)}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-bold">
                  <span className="text-slate-900">Tổng thanh toán:</span>
                  <span className="text-xl font-black text-agro-800">{formatCurrency(order.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderDetailPage;
