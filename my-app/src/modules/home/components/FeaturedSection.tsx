import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { Product } from '../../../types';
import { productService } from '../../products/services/productService';
import ProductCard from '../../products/components/ProductCard';
import { useI18n } from '../../../i18n';

export const FeaturedSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'crop_protection' | 'fertilizer' | 'seeds' | 'equipment'>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await productService.getProducts({
          category: activeTab === 'all' ? undefined : activeTab,
          limit: 8,
          sort: 'best_seller',
        });
        setProducts(res.items);
      } catch (err) {
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeTab]);

  const tabs = [
    { id: 'all', label: t('allProducts') },
    { id: 'crop_protection', label: t('cropProtection') },
    { id: 'fertilizer', label: t('fertilizers') },
    { id: 'seeds', label: t('seeds') },
    { id: 'equipment', label: t('sprayers') },
  ];

  return (
    <section className="bg-slate-100/60 py-16 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-harvest-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 fill-current" />
              <span>Sản Phẩm Được Mua Nhiều Nhất</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('featuredProducts')}
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer
                  ${activeTab === tab.id
                    ? 'bg-agro-800 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-4 border border-slate-200 animate-pulse h-80">
                <div className="bg-slate-200 aspect-square rounded-xl mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">Không tìm thấy sản phẩm nào trong danh mục này.</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <Link
            to={activeTab === 'all' ? '/products' : `/products?category=${activeTab}`}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-agro-800 font-semibold text-sm px-6 py-3 rounded-xl border border-slate-300 shadow-xs hover:shadow transition"
          >
            <span>Xem thêm sản phẩm {activeTab !== 'all' ? `ngành ${tabs.find(t=>t.id===activeTab)?.label}` : ''}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
