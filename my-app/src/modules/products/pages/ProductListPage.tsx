import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, ChevronRight, Search, RotateCcw, Home } from 'lucide-react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import ProductCard from '../components/ProductCard';
import ProductFilterSidebar from '../components/ProductFilterSidebar';
import { productService } from '../services/productService';
import { Product } from '../../../types';
import { ToastContainer } from '../../../components/common/Toast';
import { useI18n } from '../../../i18n';

export const ProductListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useI18n();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedPest, setSelectedPest] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'best_seller'>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Products Data
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const keyword = searchParams.get('keyword') || '';

  // Synchronize category from URL if changed
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // Fetch Products based on all active filters
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      // Map price range string to numbers
      let minPrice: number | undefined;
      let maxPrice: number | undefined;

      if (priceRange === 'under_100k') {
        maxPrice = 100000;
      } else if (priceRange === '100k_500k') {
        minPrice = 100000;
        maxPrice = 500000;
      } else if (priceRange === '500k_1m') {
        minPrice = 500000;
        maxPrice = 1000000;
      } else if (priceRange === 'over_1m') {
        minPrice = 1000000;
      }

      try {
        const res = await productService.getProducts({
          category: selectedCategory === 'all' ? undefined : selectedCategory,
          brand: selectedBrand === 'all' ? undefined : selectedBrand,
          targetPest: selectedPest === 'all' ? undefined : selectedPest,
          keyword: keyword || undefined,
          minPrice,
          maxPrice,
          sort: sortBy,
          page: currentPage,
          limit: 8,
        });

        setProducts(res.items);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory, selectedBrand, selectedPest, priceRange, sortBy, currentPage, keyword]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedPest('all');
    setPriceRange('all');
    setSortBy('newest');
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="flex items-center gap-1 hover:text-agro-700 transition">
            <Home className="w-3.5 h-3.5" />
            <span>Trang chủ</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">Danh mục sản phẩm</span>
          {keyword && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-agro-700 font-medium">Tìm kiếm: "{keyword}"</span>
            </>
          )}
        </nav>

        {/* Title & Sorting Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {keyword
                ? `Kết quả tìm kiếm cho "${keyword}"`
                : selectedCategory === 'crop_protection'
                ? 'Thuốc Bảo Vệ Thực Vật'
                : selectedCategory === 'fertilizer'
                ? 'Phân Bón Dinh Dưỡng'
                : selectedCategory === 'seeds'
                ? 'Hạt Giống & Lúa Giống'
                : selectedCategory === 'equipment'
                ? 'Thiết Bị Phun Xịt'
                : 'Tất Cả Vật Tư Nông Nghiệp'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Hiển thị <strong className="text-slate-800">{total}</strong> sản phẩm chất lượng cao
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Bộ lọc</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 hidden sm:inline">{t('sortBy')}:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-agro-500 cursor-pointer"
              >
                <option value="newest">{t('sortNewest')}</option>
                <option value="best_seller">{t('sortBestSeller')}</option>
                <option value="price_asc">{t('sortPriceAsc')}</option>
                <option value="price_desc">{t('sortPriceDesc')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <ProductFilterSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={(c) => { setSelectedCategory(c); setCurrentPage(1); }}
              selectedBrand={selectedBrand}
              onSelectBrand={(b) => { setSelectedBrand(b); setCurrentPage(1); }}
              selectedPest={selectedPest}
              onSelectPest={(p) => { setSelectedPest(p); setCurrentPage(1); }}
              priceRange={priceRange}
              onSelectPriceRange={(pr) => { setPriceRange(pr); setCurrentPage(1); }}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="bg-white rounded-2xl p-4 border border-slate-200 animate-pulse h-80">
                    <div className="bg-slate-200 aspect-square rounded-xl mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 flex justify-center items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Trang trước
                    </button>

                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-9 h-9 rounded-lg text-xs font-bold transition cursor-pointer ${
                            currentPage === pageNum
                              ? 'bg-agro-800 text-white'
                              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Trang sau
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Không tìm thấy sản phẩm phù hợp
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
                  Rất tiếc, không có sản phẩm nào thỏa mãn các tiêu chí lọc hiện tại. Quý khách vui lòng thử bỏ bớt bộ lọc hoặc tìm kiếm với từ khóa khác.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-agro-700 hover:bg-agro-800 text-white rounded-xl text-xs font-bold shadow-sm transition cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Xóa bộ lọc và xem tất cả</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          ></div>
          <div className="relative ml-auto w-full max-w-xs bg-white h-full overflow-y-auto p-5 shadow-2xl z-10">
            <ProductFilterSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={(c) => { setSelectedCategory(c); setMobileFilterOpen(false); }}
              selectedBrand={selectedBrand}
              onSelectBrand={(b) => { setSelectedBrand(b); setMobileFilterOpen(false); }}
              selectedPest={selectedPest}
              onSelectPest={(p) => { setSelectedPest(p); setMobileFilterOpen(false); }}
              priceRange={priceRange}
              onSelectPriceRange={(pr) => { setPriceRange(pr); setMobileFilterOpen(false); }}
              onReset={() => { handleResetFilters(); setMobileFilterOpen(false); }}
            />
          </div>
        </div>
      )}

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ProductListPage;
