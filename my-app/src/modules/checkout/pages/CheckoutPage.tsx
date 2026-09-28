import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CreditCard, 
  Banknote, 
  MapPin, 
  ArrowLeft, 
  CheckCircle, 
  Truck, 
  QrCode 
} from 'lucide-react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { useCartStore } from '../../cart/store/cartStore';
import { useOrderStore } from '../store/orderStore';
import { useAuthStore } from '../../auth/store/authStore';
import { useToastStore } from '../../../components/common/Toast';
import { VIETNAM_PROVINCES } from '../data/vietnamLocations';
import { useI18n } from '../../../i18n';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { user } = useAuthStore();
  const showToast = useToastStore((state) => state.showToast);

  const {
    items,
    coupon,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getTotalAmount,
    clearCart,
  } = useCartStore();

  const createOrder = useOrderStore((state) => state.createOrder);

  // Form State
  const [fullName, setFullName] = useState(user?.fullName || user?.username || '');
  const [phone, setPhone] = useState('0918123456');
  const [provinceId, setProvinceId] = useState(VIETNAM_PROVINCES[0].id);
  const [districtId, setDistrictId] = useState(VIETNAM_PROVINCES[0].districts[0].id);
  const [wardName, setWardName] = useState(VIETNAM_PROVINCES[0].districts[0].wards[0]);
  const [detailAddress, setDetailAddress] = useState('Ấp 1, Kênh Sáng');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'VNPAY'>('COD');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Dynamic provinces & districts
  const currentProvince = VIETNAM_PROVINCES.find((p) => p.id === provinceId) || VIETNAM_PROVINCES[0];
  const currentDistrict = currentProvince.districts.find((d) => d.id === districtId) || currentProvince.districts[0];

  const handleProvinceChange = (pId: string) => {
    setProvinceId(pId);
    const prov = VIETNAM_PROVINCES.find((p) => p.id === pId);
    if (prov && prov.districts.length > 0) {
      setDistrictId(prov.districts[0].id);
      setWardName(prov.districts[0].wards[0] || '');
    }
  };

  const handleDistrictChange = (dId: string) => {
    setDistrictId(dId);
    const dist = currentProvince.districts.find((d) => d.id === dId);
    if (dist && dist.wards.length > 0) {
      setWardName(dist.wards[0] || '');
    }
  };

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shippingFee = getShippingFee();
  const totalAmount = getTotalAmount();

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Vui lòng nhập họ và tên người nhận';
    if (!phone.trim()) {
      errs.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/(0[3|5|7|8|9])+([0-9]{8})\b/.test(phone)) {
      errs.phone = 'Số điện thoại Việt Nam không hợp lệ (10 số)';
    }
    if (!detailAddress.trim()) errs.detailAddress = 'Vui lòng nhập thôn, xóm, số nhà cụ thể';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Vui lòng kiểm tra lại thông tin giao hàng', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API network delay
      await new Promise((r) => setTimeout(r, 800));

      const newOrder = createOrder({
        userId: user?.email || 'user-guest',
        items: items.map((i) => ({
          id: 'item-' + Math.random().toString(36).substring(2, 7),
          productId: i.productId,
          variantId: i.variantId,
          productName: i.name,
          variantName: i.variantName,
          thumbnail: i.thumbnail,
          price: i.price,
          quantity: i.quantity,
          totalPrice: i.price * i.quantity,
        })),
        shippingAddress: {
          fullName,
          phone,
          provinceId,
          provinceName: currentProvince.name,
          districtId,
          districtName: currentDistrict.name,
          wardId: wardName,
          wardName: wardName,
          detailAddress,
        },
        paymentMethod,
        paymentStatus: paymentMethod === 'VNPAY' ? 'PAID' : 'UNPAID',
        subtotal,
        shippingFee,
        discountAmount: discount,
        totalAmount,
        status: 'CONFIRMED',
        note,
      });

      clearCart();
      showToast('Đặt hàng thành công!', 'success');
      navigate(`/order-success/${newOrder.orderCode}`);
    } catch {
      showToast('Đặt hàng thất bại. Vui lòng thử lại.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amt: number) => new Intl.NumberFormat('vi-VN').format(amt) + '₫';

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8fafc]">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Giỏ hàng trống</h2>
          <p className="text-xs text-slate-500 mb-6">Bạn chưa có sản phẩm nào để tiến hành thanh toán.</p>
          <Link to="/products" className="px-5 py-2.5 bg-agro-700 text-white rounded-xl text-xs font-bold">
            Xem sản phẩm
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
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-agro-700 transition mb-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại giỏ hàng</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('checkout')}
            </h1>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Delivery details & Payment method */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery Address Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <MapPin className="w-5 h-5 text-agro-700" />
                <span>1. {t('shippingAddress')}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t('fullName')}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  error={errors.fullName}
                  required
                />
                <Input
                  label={t('phone')}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0918xxxxxx"
                  error={errors.phone}
                  required
                />
              </div>

              {/* Vietnam Province / District / Ward Cascading Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    {t('province')} *
                  </label>
                  <select
                    value={provinceId}
                    onChange={(e) => handleProvinceChange(e.target.value)}
                    className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-agro-500 font-medium"
                  >
                    {VIETNAM_PROVINCES.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    {t('district')} *
                  </label>
                  <select
                    value={districtId}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-agro-500 font-medium"
                  >
                    {currentProvince.districts.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    {t('ward')} *
                  </label>
                  <select
                    value={wardName}
                    onChange={(e) => setWardName(e.target.value)}
                    className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-agro-500 font-medium"
                  >
                    {currentDistrict.wards.map((w, idx) => (
                      <option key={idx} value={w}>{w}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Input
                label={t('detailAddress')}
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                placeholder="Ấp, Thôn, Xóm, Số nhà, Đường..."
                error={errors.detailAddress}
                required
              />

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Ghi chú cho người vận chuyển (Tùy chọn)
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ví dụ: Giao sau 17h, gọi trước khi giao 30 phút..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-agro-500"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <CreditCard className="w-5 h-5 text-agro-700" />
                <span>2. {t('paymentMethod')}</span>
              </h2>

              <div className="space-y-3">
                {/* 1. COD */}
                <label
                  className={`
                    flex items-start gap-4 p-4 rounded-2xl border-2 transition cursor-pointer
                    ${paymentMethod === 'COD'
                      ? 'border-agro-700 bg-agro-50/50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="mt-1 text-agro-700 focus:ring-agro-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-5 h-5 text-agro-700" />
                      <span className="font-bold text-sm text-slate-900">{t('cod')}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Nhận hàng tại nhà hoặc đồng ruộng, kiểm tra tem nhãn và niêm phong rồi mới thanh toán tiền mặt cho nhân viên giao vận.
                    </p>
                  </div>
                </label>

                {/* 2. VNPAY */}
                <label
                  className={`
                    flex items-start gap-4 p-4 rounded-2xl border-2 transition cursor-pointer
                    ${paymentMethod === 'VNPAY'
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="VNPAY"
                    checked={paymentMethod === 'VNPAY'}
                    onChange={() => setPaymentMethod('VNPAY')}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-5 h-5 text-blue-600" />
                      <span className="font-bold text-sm text-slate-900">
                        {t('vnpay')}
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Khuyên Dùng
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Hỗ trợ quét mã VNPAY-QR qua ứng dụng ngân hàng (Vietcombank, Agribank, BIDV, VietinBank...) hoặc thẻ ATM nội địa / Visa / MasterCard.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-5 sticky top-24">
              <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                {t('orderSummary')} ({items.length})
              </h2>

              {/* Items List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.thumbnail}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate">{item.name}</p>
                        <p className="text-[11px] text-slate-500">
                          {item.variantName} × <strong className="text-slate-800">{item.quantity}</strong>
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 flex-shrink-0">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Tiền hàng:</span>
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

              {/* Submit Button */}
              <Button
                type="submit"
                isLoading={isSubmitting}
                variant="accent"
                size="lg"
                className="w-full mt-4"
              >
                {paymentMethod === 'VNPAY' ? 'Thanh Toán Qua VNPAY' : t('orderConfirmation')}
              </Button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-agro-600" />
                <span>Bảo mật đơn hàng 100% - Đổi trả trong 7 ngày</span>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
