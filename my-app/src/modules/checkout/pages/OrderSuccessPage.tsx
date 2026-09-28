import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, PackageCheck, ArrowRight, Home, PhoneCall, Truck } from 'lucide-react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import { useOrderStore } from '../store/orderStore';
import { useI18n } from '../../../i18n';

export const OrderSuccessPage: React.FC = () => {
  const { orderCode } = useParams<{ orderCode: string }>();
  const getOrderByCode = useOrderStore((state) => state.getOrderByCode);
  const { t } = useI18n();

  const order = orderCode ? getOrderByCode(orderCode) : undefined;
  const formatCurrency = (amt: number) => new Intl.NumberFormat('vi-VN').format(amt) + '₫';

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-card text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-4 border-emerald-100 shadow-sm animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t('orderSuccessTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
              {t('orderSuccessDesc')}
            </p>
          </div>

          {/* Order Details Card */}
          {order && (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 text-left text-xs sm:text-sm space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <span className="text-slate-500">Mã đơn hàng:</span>
                <span className="font-mono font-bold text-agro-800 text-base">{order.orderCode}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Người nhận:</span>
                <span className="font-semibold text-slate-900">{order.shippingAddress.fullName} ({order.shippingAddress.phone})</span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-slate-500">Địa chỉ giao:</span>
                <span className="font-medium text-slate-900 text-right max-w-xs">
                  {order.shippingAddress.detailAddress}, {order.shippingAddress.wardName}, {order.shippingAddress.districtName}, {order.shippingAddress.provinceName}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Hình thức thanh toán:</span>
                <span className="font-bold text-slate-900">
                  {order.paymentMethod === 'VNPAY' ? 'Đã thanh toán qua VNPAY' : 'Thanh toán tiền mặt khi nhận hàng (COD)'}
                </span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                <span className="font-bold text-slate-900">Tổng thanh toán:</span>
                <span className="font-black text-agro-800 text-lg">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          )}

          {/* Dispatch Info */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3 text-left">
            <Truck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>
              Đơn hàng sẽ được đóng gói và bàn giao cho đơn vị vận chuyển trong vòng 24h để đảm bảo tiến độ mùa vụ của quý khách.
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
            <Link
              to="/account/orders"
              className="px-6 py-3 bg-agro-700 hover:bg-agro-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-2"
            >
              <PackageCheck className="w-4 h-4" />
              <span>Theo dõi đơn hàng</span>
            </Link>

            <Link
              to="/"
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Về trang chủ</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderSuccessPage;
