import React from 'react';
import { Filter, RotateCcw, ShieldCheck, Sprout, Wheat, Wrench } from 'lucide-react';
import { MOCK_CATEGORIES } from '../../../api/mockData';
import { useI18n } from '../../../i18n';

interface FilterSidebarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  selectedPest: string;
  onSelectPest: (pest: string) => void;
  priceRange: string;
  onSelectPriceRange: (range: string) => void;
  onReset: () => void;
}

const BRANDS = ['Syngenta', 'Bayer', 'Bình Điền', 'Hợp Trí', 'Hồ Quang Trí', 'Rạng Đông', 'Oshima', 'Kasei'];
const PESTS = ['Đạo ôn', 'Khô vằn', 'Lem lép hạt', 'Thán thư', 'Rỉ sắt', 'Rầy nâu', 'Bọ trĩ'];
const PRICE_RANGES = [
  { id: 'all', label: 'Tất cả mức giá' },
  { id: 'under_100k', label: 'Dưới 100.000₫' },
  { id: '100k_500k', label: '100.000₫ - 500.000₫' },
  { id: '500k_1m', label: '500.000₫ - 1.000.000₫' },
  { id: 'over_1m', label: 'Trên 1.000.000₫' },
];

export const ProductFilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  selectedPest,
  onSelectPest,
  priceRange,
  onSelectPriceRange,
  onReset,
}) => {
  const { t, language } = useI18n();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
          <Filter className="w-4 h-4 text-agro-700" />
          <span>{t('filterBy')}</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-agro-700 flex items-center gap-1 font-medium cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{t('resetFilter')}</span>
        </button>
      </div>

      {/* 1. Category Tree */}
      <div>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
          Ngành Hàng
        </h4>
        <div className="space-y-1.5">
          <button
            onClick={() => onSelectCategory('all')}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer flex items-center justify-between ${
              selectedCategory === 'all'
                ? 'bg-agro-800 text-white font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>Tất cả ngành hàng</span>
          </button>

          {MOCK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                selectedCategory === cat.id
                  ? 'bg-agro-800 text-white font-semibold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{language === 'en' ? cat.nameEn : cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Price Range */}
      <div>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
          {t('priceRange')}
        </h4>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((pr) => (
            <label
              key={pr.id}
              className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-agro-800 cursor-pointer p-1"
            >
              <input
                type="radio"
                name="priceRange"
                value={pr.id}
                checked={priceRange === pr.id}
                onChange={() => onSelectPriceRange(pr.id)}
                className="text-agro-700 focus:ring-agro-500"
              />
              <span>{pr.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Brands */}
      <div>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
          Thương Hiệu Uy Tín
        </h4>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onSelectBrand('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition cursor-pointer ${
              selectedBrand === 'all'
                ? 'bg-agro-700 text-white border-agro-700'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            Tất cả
          </button>
          {BRANDS.map((brand) => (
            <button
              key={brand}
              onClick={() => onSelectBrand(brand)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition cursor-pointer ${
                selectedBrand === brand
                  ? 'bg-agro-700 text-white border-agro-700'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Target Pests (for Crop Protection) */}
      <div>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
          Phòng Trừ Dịch Hại
        </h4>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onSelectPest('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition cursor-pointer ${
              selectedPest === 'all'
                ? 'bg-emerald-700 text-white border-emerald-700'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            Tất cả
          </button>
          {PESTS.map((pest) => (
            <button
              key={pest}
              onClick={() => onSelectPest(pest)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition cursor-pointer ${
                selectedPest === pest
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {pest}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilterSidebar;
