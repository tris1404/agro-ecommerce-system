import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, ArrowLeft, Check } from 'lucide-react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import { useCartStore } from '../store/cartStore';
import { useToastStore } from '../../../components/common/Toast';
import { useI18n } from '../../../i18n';

export const CartPage: React.FC = () => {
  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();
  const { t } = useI18n();

  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    coupon,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getTotalAmount,
  } = useCartStore();

  const showToast = useToastStore((state) => state.showToast);

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shippingFee = getShippingFee();
  const totalAmount = getTotalAmount();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode);
    if (res.success) {
      showToast(res.message, 'success');
      setCouponCode('');
    } else {
      showToast(res.message, 'error');
    }
  };

  const formatCurrency = (amt: number) => new Intl.NumberFormat('vi-VN').format(amt) + '₫';

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8fafc]">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-5 shadow-xs">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {t('cartEmpty')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
            Bà con chưa chọn loại vật tư nào vào giỏ. Hãy tham khảo các sản phẩm thuốc BVTV, phân bón và hạt giống mùa vụ mới của chúng tôi.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-agro-700 hover:bg-agro-800 text-white rounded-xl text-sm font-bold shadow-sm transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('continueShopping')}</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
          {t('cart')} ({items.length} mặt hàng)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items Table Left */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card">
              <div className="divide-y divide-slate-100">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Thumbnail & Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 bg-slate-50 flex-shrink-0"
                      />
                      <div className="space-y-1">
                        <Link
                          to={`/products/${item.productId}`}
                          className="font-bold text-sm text-slate-900 hover:text-agro-700 transition line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-slate-500 font-medium">
                          Quy cách: <span className="text-slate-800 font-semibold">{item.variantName}</span>
                        </p>
                        <p className="text-xs font-bold text-agro-800">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Selector & Subtotal */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer font-bold text-sm"
                        >
                          -
                        </button>
                        <span className="w-10 text-center text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer font-bold text-sm"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right min-w-[90px]">
                        <span className="font-extrabold text-sm text-slate-900 block">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="p-2 text-slate-400 hover:text-red-600 transition cursor-pointer"
                        title="Xóa khỏi giỏ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Actions Row */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs">
                <Link to="/products" className="font-semibold text-agro-700 hover:text-agro-900 flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t('continueShopping')}</span>
                </Link>
                <button
                  onClick={clearCart}
                  className="text-slate-500 hover:text-red-600 cursor-pointer"
                >
                  Xóa tất cả sản phẩm
                </button>
              </div>
            </div>

            {/* Free shipping progress alert */}
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-4 text-xs text-emerald-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  {subtotal >= 1000000
                    ? '🎉 Chúc mừng! Đơn hàng của bạn đã đủ điều kiện Miễn phí vận chuyển.'
                    : `Mua thêm ${formatCurrency(1000000 - subtotal)} để được Miễn phí giao hàng về tận xã.`}
                </span>
              </div>
            </div>
          </div>

          {/* Order Summary & Voucher Right */}
          <div className="lg:col-span-4 space-y-6">
            {/* Voucher Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-harvest-600" />
                <span>Mã Giảm Giá / Voucher Mùa Vụ</span>
              </h3>

              {coupon ? (
                <div className="p-3 bg-harvest-50 rounded-xl border border-harvest-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-harvest-900">{coupon.code}</span>
                    <p className="text-[11px] text-harvest-700">{coupon.description}</p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 font-bold hover:underline cursor-pointer ml-2"
                  >
                    Gỡ bỏ
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Nhập AGRO50K hoặc VATTU10"
                    className="flex-1 text-xs uppercase px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agro-500 font-semibold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-agro-700 hover:bg-agro-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Áp dụng
                  </button>
                </form>
              )}

              {/* Sample coupons tip */}
              <div className="text-[11px] text-slate-400 space-y-1">
                <p>Mã gợi ý: <strong className="text-slate-600">AGRO50K</strong> (giảm 50k cho đơn từ 500k), <strong className="text-slate-600">FREESHIP</strong></p>
              </div>
            </div>

            {/* Bill Calculation Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
              <h3 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100">
                {t('cartTotal')}
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Tạm tính tiền hàng:</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Mã giảm giá ({coupon?.code}):</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>{t('shippingFee')}:</span>
                  <span className="font-semibold text-slate-900">
                    {shippingFee === 0 ? <span className="text-emerald-600">Miễn phí</span> : formatCurrency(shippingFee)}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900">Tổng thanh toán:</span>
                  <span className="text-2xl font-black text-agro-800">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full mt-4 py-3.5 bg-harvest-600 hover:bg-harvest-700 text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-harvest-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('checkout')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
