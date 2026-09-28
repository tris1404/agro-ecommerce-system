import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sprout, Wheat, Wrench, ArrowRight } from 'lucide-react';
import { MOCK_CATEGORIES } from '../../../api/mockData';
import { useI18n } from '../../../i18n';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  crop_protection: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
  fertilizer: <Sprout className="w-8 h-8 text-green-600" />,
  seeds: <Wheat className="w-8 h-8 text-amber-600" />,
  equipment: <Wrench className="w-8 h-8 text-blue-600" />,
};

const CATEGORY_COLORS: Record<string, { bg: string; border: string; hover: string }> = {
  crop_protection: { bg: 'bg-emerald-50', border: 'border-emerald-200', hover: 'hover:border-emerald-400' },
  fertilizer: { bg: 'bg-green-50', border: 'border-green-200', hover: 'hover:border-green-400' },
  seeds: { bg: 'bg-amber-50', border: 'border-amber-200', hover: 'hover:border-amber-400' },
  equipment: { bg: 'bg-blue-50', border: 'border-blue-200', hover: 'hover:border-blue-400' },
};

export const CategoryGrid: React.FC = () => {
  const { t, language } = useI18n();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-agro-700 font-bold text-xs uppercase tracking-wider block mb-1">
            Ngành Hàng Vật Tư
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('featuredCategories')}
          </h2>
        </div>
        <Link
          to="/products"
          className="text-sm font-semibold text-agro-700 hover:text-agro-800 flex items-center gap-1 group"
        >
          <span>Xem tất cả danh mục</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_CATEGORIES.map((cat) => {
          const colors = CATEGORY_COLORS[cat.id] || { bg: 'bg-slate-50', border: 'border-slate-200', hover: 'hover:border-slate-400' };
          const icon = CATEGORY_ICONS[cat.id] || <Sprout className="w-8 h-8 text-agro-600" />;

          return (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className={`
                group p-6 rounded-2xl border ${colors.bg} ${colors.border} ${colors.hover}
                shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between
              `}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-agro-800 transition">
                  {language === 'en' ? cat.nameEn : cat.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                  {language === 'en' ? cat.descriptionEn : cat.description}
                </p>
              </div>

              {/* Subcategories list */}
              <div className="pt-3 border-t border-slate-200/60">
                <div className="flex flex-wrap gap-1.5">
                  {cat.subCategories?.slice(0, 3).map((sub) => (
                    <span
                      key={sub.id}
                      className="text-[11px] bg-white/80 text-slate-700 px-2 py-0.5 rounded-md font-medium border border-slate-200/80"
                    >
                      {language === 'en' ? sub.nameEn : sub.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryGrid;
