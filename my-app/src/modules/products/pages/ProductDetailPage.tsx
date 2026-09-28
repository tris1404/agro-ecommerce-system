import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  PhoneCall, 
  ChevronRight, 
  Home, 
  ShoppingCart, 
  Zap, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import TechSpecsTable from '../components/TechSpecsTable';
import ProductReviews from '../components/ProductReviews';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/productService';
import { Product, ProductVariant } from '../../../types';
import { useCartStore } from '../../cart/store/cartStore';
import { useToastStore } from '../../../components/common/Toast';
import { useI18n } from '../../../i18n';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('specs');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    const loadProduct = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const found = await productService.getProductById(slug);
        if (found) {
          setProduct(found);
          setSelectedVariant(found.variants[0] || null);
          setSelectedImage(found.thumbnail);
          setQuantity(1);

          // Fetch related products
          const related = await productService.getRelatedProducts(found.categoryId, found.id);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error('Failed to load product detail:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8fafc]">
        <Header />
        <div className="flex-1 max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="animate-spin w-10 h-10 border-4 border-agro-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-sm text-slate-500 font-medium">Đang tải thông tin kỹ thuật sản phẩm...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8fafc]">
        <Header />
        <div className="flex-1 max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Không tìm thấy sản phẩm</h2>
          <p className="text-sm text-slate-500 mb-6">Sản phẩm có thể đã ngừng kinh doanh hoặc đường dẫn không đúng.</p>
          <Link to="/products" className="px-5 py-2.5 bg-agro-700 text-white rounded-xl text-xs font-bold">
            Xem danh mục sản phẩm
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const originalPrice = selectedVariant?.originalPrice || product.originalPrice;
  const currentStock = selectedVariant ? selectedVariant.stock : product.stock;

  const handleAddToCart = () => {
    if (!product || currentStock <= 0) return;
    addItem(product, selectedVariant || undefined, quantity);
    showToast(`Đã thêm ${quantity} ${selectedVariant?.name || product.unit} vào giỏ hàng!`, 'success');
  };

  const handleBuyNow = () => {
    if (!product || currentStock <= 0) return;
    addItem(product, selectedVariant || undefined, quantity);
    navigate('/checkout');
  };

  const formatCurrency = (amt: number) => new Intl.NumberFormat('vi-VN').format(amt) + '₫';

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <Link to="/" className="flex items-center gap-1 hover:text-agro-700 transition">
            <Home className="w-3.5 h-3.5" />
            <span>Trang chủ</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to={`/products?category=${product.categoryId}`} className="hover:text-agro-700 transition">
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900 truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Overview Section (Gallery + Details) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 shadow-card mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Gallery Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs">
                <img
                  src={selectedImage || product.thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                {product.discountPercent && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-md shadow-sm">
                    -{product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Thumbnails list */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  <button
                    onClick={() => setSelectedImage(product.thumbnail)}
                    className={`w-18 h-18 rounded-xl overflow-hidden border-2 flex-shrink-0 cursor-pointer ${
                      selectedImage === product.thumbnail ? 'border-agro-600 ring-2 ring-agro-200' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={product.thumbnail} alt="" className="w-full h-full object-cover" />
                  </button>
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-18 h-18 rounded-xl overflow-hidden border-2 flex-shrink-0 cursor-pointer ${
                        selectedImage === img ? 'border-agro-600 ring-2 ring-agro-200' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust badges below gallery */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Chính hãng 100%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-agro-600 flex-shrink-0" />
                  <span>Giao nhanh về xã</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Bao đổi trả 7 ngày</span>
                </div>
              </div>
            </div>

            {/* Right: Info & Purchase Column */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-agro-700 bg-agro-50 px-2.5 py-1 rounded-md border border-agro-200">
                    {product.brand}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">Xuất xứ: {product.origin}</span>
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  {product.name}
                </h1>

                {/* Rating & Sold */}
                <div className="flex items-center gap-4 mt-3 text-xs">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-slate-800 text-sm">{product.rating}</span>
                    <span className="text-slate-400">({product.reviewCount} đánh giá từ nhà nông)</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500">
                    Đã bán: <strong className="text-slate-800 font-semibold">{product.soldCount}</strong>
                  </span>
                </div>

                {/* Price Display */}
                <div className="mt-5 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-baseline gap-3">
                  <span className="text-3xl font-black text-agro-800 tracking-tight">
                    {formatCurrency(currentPrice)}
                  </span>
                  {originalPrice && originalPrice > currentPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      {formatCurrency(originalPrice)}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-slate-500">
                    / {selectedVariant?.name || product.unit}
                  </span>
                </div>

                {/* Short description */}
                <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Packaging Variants Selection */}
                {product.variants.length > 0 && (
                  <div className="mt-6">
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                      Quy Cách Đóng Gói:
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {product.variants.map((v) => {
                        const isSelected = selectedVariant?.id === v.id;
                        return (
                          <button
                            key={v.id}
                            onClick={() => {
                              setSelectedVariant(v);
                              setQuantity(1);
                            }}
                            className={`
                              px-3.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-2
                              ${isSelected
                                ? 'bg-agro-50 border-agro-700 text-agro-800 ring-2 ring-agro-200'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                              }
                            `}
                          >
                            <span>{v.name}</span>
                            <span className="text-[11px] text-slate-400 font-normal">({formatCurrency(v.price)})</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-agro-700" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity and Stock */}
                <div className="mt-6 flex items-center gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      {t('quantity')}:
                    </label>
                    <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white w-32 shadow-xs">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer font-bold"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={currentStock}
                        value={quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1;
                          setQuantity(Math.max(1, Math.min(val, currentStock)));
                        }}
                        className="w-12 h-10 text-center text-sm font-bold text-slate-900 focus:outline-none border-x border-slate-200"
                      />
                      <button
                        onClick={() => setQuantity((q) => Math.min(currentStock, q + 1))}
                        disabled={quantity >= currentStock}
                        className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="pt-5 text-xs text-slate-500">
                    Kho sẵn có: <strong className="text-slate-800 font-semibold">{currentStock}</strong> {product.unit}
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={currentStock <= 0}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-agro-50 hover:bg-agro-100 text-agro-800 border-2 border-agro-700 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5 text-agro-700" />
                  <span>{t('addToCart')}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={currentStock <= 0}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-harvest-600 hover:bg-harvest-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md hover:shadow-harvest-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Zap className="w-5 h-5 fill-current" />
                  <span>{t('buyNow')}</span>
                </button>
              </div>

              {/* Hotline Consulting Banner */}
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>Cần tư vấn hoạt chất & liều lượng xịt cho vườn nhà?</span>
                </div>
                <a href="tel:18006868" className="font-bold text-emerald-800 hover:underline">
                  Gọi 1800 6868
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Details: Description | Tech Specs | Reviews */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card mb-12">
          {/* Tab Headers */}
          <div className="flex border-b border-slate-200 bg-slate-50/70 px-4 sm:px-8">
            <button
              onClick={() => setActiveTab('specs')}
              className={`py-4 px-4 sm:px-6 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-agro-700 text-agro-800 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t('specs')}
            </button>

            <button
              onClick={() => setActiveTab('desc')}
              className={`py-4 px-4 sm:px-6 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                activeTab === 'desc'
                  ? 'border-agro-700 text-agro-800 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t('description')} & Hướng Dẫn
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-4 sm:px-6 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                activeTab === 'reviews'
                  ? 'border-agro-700 text-agro-800 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t('reviews')} ({product.reviewCount})
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-6 sm:p-8">
            {activeTab === 'specs' && <TechSpecsTable product={product} />}

            {activeTab === 'desc' && (
              <div className="space-y-6 max-w-4xl text-slate-700 text-xs sm:text-sm leading-relaxed">
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">Đặc Tính Kỹ Thuật Nổi Bật</h3>
                  <p className="whitespace-pre-line">{product.description}</p>
                </div>

                {product.instructions && (
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900">
                    <h4 className="font-bold flex items-center gap-2 mb-2 text-amber-950">
                      <AlertTriangle className="w-4 h-4 text-amber-700" />
                      <span>{t('instructions')}</span>
                    </h4>
                    <p className="text-xs leading-relaxed">{product.instructions}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && <ProductReviews />}
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
              {t('relatedProducts')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
