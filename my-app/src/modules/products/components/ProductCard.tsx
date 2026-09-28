import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Check, Shield } from 'lucide-react';
import { Product } from '../../../types';
import { useCartStore } from '../../cart/store/cartStore';
import { useToastStore } from '../../../components/common/Toast';
import { useI18n } from '../../../i18n';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);
  const { t } = useI18n();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem(product, product.variants[0], 1);
    showToast(`Đã thêm "${product.name}" vào giỏ hàng`, 'success');
    setTimeout(() => setIsAdding(false), 600);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + '₫';
  };

  // Extract key technical badge
  const techBadge = 
    product.cropProtectionSpecs?.activeIngredients ||
    product.fertilizerSpecs?.npkRatio ||
    (product.seedSpecs?.germinationRate ? `Nảy mầm: ${product.seedSpecs?.germinationRate}` : null) ||
    product.equipmentSpecs?.powerType;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail with Link */}
      <Link to={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-slate-50">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount Tag */}
        {product.discountPercent && product.discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-red-600 text-white font-extrabold text-xs px-2 py-0.5 rounded-md shadow-sm">
            -{product.discountPercent}%
          </div>
        )}

        {/* Genuine Badge */}
        <div className="absolute top-2.5 right-2.5 bg-agro-900/80 backdrop-blur-xs text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
          <Shield className="w-3 h-3" />
          <span>Chính hãng</span>
        </div>

        {/* Brand Tag bottom left of image */}
        <div className="absolute bottom-2 left-2.5 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-semibold text-slate-700 shadow-xs">
          {product.brand}
        </div>
      </Link>

      {/* Product Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category & Tech highlight */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span className="text-agro-700 font-medium">{product.categoryName}</span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-semibold text-slate-700">{product.rating}</span>
            <span className="text-slate-400 text-[11px]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <Link to={`/products/${product.slug}`} className="block flex-1 group/title">
          <h3 className="font-semibold text-sm text-slate-900 line-clamp-2 group-hover/title:text-agro-700 transition leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Key Agricultural Spec Snippet */}
        {techBadge && (
          <div className="mt-2 text-[11px] text-slate-600 bg-slate-100 rounded px-2 py-1 line-clamp-1">
            <span className="font-medium text-slate-700">Đặc tính: </span>
            {techBadge}
          </div>
        )}

        {/* Price & Action row */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-agro-800">
                {formatCurrency(product.price)}
              </span>
              <span className="text-xs text-slate-400">/{product.unit}</span>
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Quick Add to Cart button */}
          <button
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className={`
              w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs
              ${product.stock <= 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : isAdding
                ? 'bg-emerald-600 text-white'
                : 'bg-agro-50 hover:bg-agro-700 text-agro-700 hover:text-white border border-agro-200 hover:border-transparent'
              }
            `}
            title={t('addToCart')}
            aria-label={t('addToCart')}
          >
            {isAdding ? <Check className="w-4 h-4 animate-in zoom-in" /> : <ShoppingCart className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
