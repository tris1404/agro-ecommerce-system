import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Truck, Headphones } from 'lucide-react';
import { useI18n } from '../../../i18n';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  link: string;
  bgGradient: string;
  image: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    tag: 'MÙA VỤ BỘI THU 2026',
    title: 'Giải Pháp Bảo Vệ Cây Trồng Toàn Diện',
    subtitle: 'Thuốc trừ sâu, trừ bệnh nấm chính hãng Syngenta, Bayer, Lộc Trời giúp cây khỏe, lá đòng xanh bền bỉ đến tận ngày gặt.',
    link: '/products?category=crop_protection',
    bgGradient: 'from-agro-950 via-agro-900 to-agro-800',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910a30b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    tag: 'DINH DƯỠNG NÂNG TẦM NĂNG SUẤT',
    title: 'Phân Bón NPK & Hữu Cơ Cao Cấp',
    subtitle: 'Đầu Trâu Bình Điền, DAP Phú Mỹ và phân bón lá vi lượng kích rễ, nuôi trái bóng tròn, tăng độ ngọt cho cây ăn trái.',
    link: '/products?category=fertilizer',
    bgGradient: 'from-emerald-950 via-emerald-900 to-teal-900',
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    tag: 'CÔNG NGHỆ CƠ GIỚI HÓA',
    title: 'Máy Xịt Đeo Vai & Bình Điện 20L',
    subtitle: 'Áp lực phun sương cực mạnh, tiết kiệm 30% lượng thuốc, độ bền động cơ Oshima vượt trội suốt mùa vụ.',
    link: '/products?category=equipment',
    bgGradient: 'from-slate-950 via-slate-900 to-agro-950',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useI18n();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 shadow-xl">
      <div className={`transition-all duration-700 bg-gradient-to-r ${slide.bgGradient} min-h-[460px] md:min-h-[500px] flex items-center`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Content Left */}
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-block bg-harvest-500/20 border border-harvest-400/40 text-harvest-300 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full">
              {slide.tag}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              {slide.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              {slide.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to={slide.link}
                className="bg-harvest-600 hover:bg-harvest-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-harvest-600/30 transition flex items-center gap-2 cursor-pointer"
              >
                <span>{t('shopNow')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products"
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs font-semibold text-sm px-6 py-3.5 rounded-xl border border-white/20 transition"
              >
                {t('viewCatalog')}
              </Link>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>100% Chính hãng</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-harvest-400 flex-shrink-0" />
                <span>Giao tận ruộng</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Tư vấn kỹ thuật</span>
              </div>
            </div>
          </div>

          {/* Image Right */}
          <div className="lg:col-span-5 hidden lg:flex justify-center items-center">
            <div className="relative w-80 h-80 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl transform rotate-1 hover:rotate-0 transition duration-500">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl text-slate-900 shadow-md">
                <span className="text-[11px] font-bold text-agro-700 uppercase tracking-wider block">Cam kết chất lượng</span>
                <span className="text-xs font-semibold">Được hơn 50.000+ nhà nông tin cậy vụ mùa này</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition border border-white/10 cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition border border-white/10 cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === currentSlide ? 'w-8 bg-harvest-500' : 'w-2 bg-white/40'}`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
