import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCw, CreditCard } from 'lucide-react';
import { useI18n } from '../../i18n';

export const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      {/* Service Value Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-agro-900/80 border border-agro-700/50 flex items-center justify-center text-agro-400 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base mb-1">100% Chính Hãng</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nguồn gốc rõ ràng từ Syngenta, Bayer, Bình Điền, Lộc Trời có tem chống giả.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-agro-900/80 border border-agro-700/50 flex items-center justify-center text-agro-400 flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base mb-1">Giao Tận Ruộng Vườn</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Vận chuyển hỏa tốc đến tận thôn, xóm, ấp cho bà con kịp lịch thời vụ.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-agro-900/80 border border-agro-700/50 flex items-center justify-center text-agro-400 flex-shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base mb-1">Đổi Trả Trong 7 Ngày</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bao đổi trả nếu sản phẩm rách bao bì, quá hạn sử dụng hoặc lỗi kỹ thuật máy.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-agro-900/80 border border-agro-700/50 flex items-center justify-center text-agro-400 flex-shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base mb-1">Thanh Toán Linh Hoạt</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hỗ trợ trả tiền mặt khi nhận hàng (COD) hoặc thanh toán online qua cổng VNPAY an toàn.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-agro-700 flex items-center justify-center text-white">
              <Sprout className="w-5 h-5 text-emerald-300" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              Agro<span className="text-harvest-500">Care</span>
            </span>
          </Link>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            Hệ thống phân phối vật tư nông nghiệp hàng đầu Việt Nam. Đồng hành cùng hàng triệu hộ nông dân xây dựng mùa màng bội thu, nông sản sạch và đạt chuẩn xuất khẩu.
          </p>
          <div className="space-y-2 text-xs text-slate-400 pt-2">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-agro-400 flex-shrink-0" />
              <span>Khu Nông Nghiệp Công Nghệ Cao, TP. Hồ Chí Minh</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-harvest-400 flex-shrink-0" />
              <span>Hotline kỹ sư nông học: 1800 6868 (07:00 - 20:00)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>hotro@agrocare.vn</span>
            </div>
          </div>
        </div>

        {/* Categories Column */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Danh Mục Vật Tư</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/products?category=crop_protection" className="hover:text-emerald-400 transition">
                Thuốc trừ sâu & rầy
              </Link>
            </li>
            <li>
              <Link to="/products?category=crop_protection" className="hover:text-emerald-400 transition">
                Thuốc trừ nấm bệnh
              </Link>
            </li>
            <li>
              <Link to="/products?category=fertilizer" className="hover:text-emerald-400 transition">
                Phân bón NPK & Hữu cơ
              </Link>
            </li>
            <li>
              <Link to="/products?category=seeds" className="hover:text-emerald-400 transition">
                Lúa giống ST25 xác nhận
              </Link>
            </li>
            <li>
              <Link to="/products?category=equipment" className="hover:text-emerald-400 transition">
                Máy xịt thuốc Oshima
              </Link>
            </li>
          </ul>
        </div>

        {/* Farmer Support Column */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Hỗ Trợ Bà Con</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#guide" className="hover:text-emerald-400 transition">Hướng dẫn pha thuốc đúng cách</a></li>
            <li><a href="#safety" className="hover:text-emerald-400 transition">Quy tắc an toàn bảo hộ (GHS)</a></li>
            <li><a href="#shipping" className="hover:text-emerald-400 transition">Chính sách giao hàng về xã</a></li>
            <li><a href="#vnpay" className="hover:text-emerald-400 transition">Hướng dẫn thanh toán VNPAY</a></li>
            <li><a href="#faq" className="hover:text-emerald-400 transition">Câu hỏi thường gặp</a></li>
          </ul>
        </div>

        {/* Payment & Security */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Thanh Toán & Xác Thực</h4>
          <div className="space-y-3">
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 flex items-center gap-3">
              <span className="text-sm font-bold text-white tracking-wider">VNPAY</span>
              <span className="text-[11px] text-slate-400">Cổng thanh toán quốc gia</span>
            </div>
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 flex items-center gap-3">
              <span className="text-sm font-bold text-emerald-400">COD</span>
              <span className="text-[11px] text-slate-400">Nhận hàng rồi mới thanh toán</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <p>© 2026 AgroCare E-Commerce. All rights reserved. Hệ thống phân phối vật tư nông nghiệp chính hãng.</p>
        <div className="flex gap-4">
          <a href="#privacy" className="hover:text-slate-400">Chính sách bảo mật</a>
          <a href="#terms" className="hover:text-slate-400">Điều khoản sử dụng</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
