import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductVariant } from '../../../types';

interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  description: string;
}

interface CartStore {
  items: CartItem[];
  coupon: Coupon | null;
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingFee: () => number;
  getTotalAmount: () => number;
}

const AVAILABLE_COUPONS: Record<string, Coupon> = {
  'AGRO50K': {
    code: 'AGRO50K',
    discountAmount: 50000,
    description: 'Giảm 50.000₫ cho đơn hàng từ 500.000₫',
  },
  'VATTU10': {
    code: 'VATTU10',
    discountPercent: 10,
    description: 'Giảm 10% tối đa 100.000₫ cho mọi đơn hàng',
  },
  'FREESHIP': {
    code: 'FREESHIP',
    discountAmount: 30000,
    description: 'Miễn phí vận chuyển 30.000₫',
  }
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,

      addItem: (product, variant, quantity = 1) => {
        const currentItems = get().items;
        const selectedVariant = variant || product.variants[0];
        const variantId = selectedVariant?.id || 'default';
        const variantName = selectedVariant?.name || product.unit;
        const price = selectedVariant?.price || product.price;

        const existingIndex = currentItems.findIndex(
          (item) => item.productId === product.id && item.variantId === variantId
        );

        if (existingIndex > -1) {
          const updatedItems = [...currentItems];
          const item = updatedItems[existingIndex];
          const newQty = item.quantity + quantity;
          const maxStock = selectedVariant?.stock || product.stock || 999;
          item.quantity = Math.min(newQty, maxStock);
          set({ items: updatedItems });
        } else {
          const newItem: CartItem = {
            productId: product.id,
            variantId: variantId,
            name: product.name,
            variantName: variantName,
            thumbnail: product.thumbnail,
            price: price,
            unit: product.unit,
            quantity: Math.min(quantity, selectedVariant?.stock || product.stock || 999),
            stock: selectedVariant?.stock || product.stock || 999,
            categoryType: product.categoryType,
          };
          set({ items: [...currentItems, newItem] });
        }
      },

      updateQuantity: (productId, variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }

        const items = get().items.map((item) => {
          if (item.productId === productId && item.variantId === variantId) {
            return { ...item, quantity: Math.min(quantity, item.stock) };
          }
          return item;
        });

        set({ items });
      },

      removeItem: (productId, variantId) => {
        set({
          items: get().items.filter(
            (item) => !(item.productId === productId && item.variantId === variantId)
          ),
        });
      },

      clearCart: () => {
        set({ items: [], coupon: null });
      },

      applyCoupon: (code) => {
        const cleanCode = code.trim().toUpperCase();
        const found = AVAILABLE_COUPONS[cleanCode];
        if (!found) {
          return { success: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn.' };
        }
        const subtotal = get().getSubtotal();
        if (cleanCode === 'AGRO50K' && subtotal < 500000) {
          return { success: false, message: 'Mã AGRO50K áp dụng cho đơn hàng từ 500.000₫ trở lên.' };
        }

        set({ coupon: found });
        return { success: true, message: `Áp dụng thành công mã ${cleanCode}!` };
      },

      removeCoupon: () => set({ coupon: null }),

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getDiscountAmount: () => {
        const coupon = get().coupon;
        if (!coupon) return 0;
        const subtotal = get().getSubtotal();
        if (coupon.discountAmount) {
          return Math.min(coupon.discountAmount, subtotal);
        }
        if (coupon.discountPercent) {
          const discount = (subtotal * coupon.discountPercent) / 100;
          return Math.min(discount, 100000);
        }
        return 0;
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        // Miễn phí giao hàng cho đơn từ 1.000.000đ
        if (subtotal >= 1000000) return 0;
        return 30000;
      },

      getTotalAmount: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        const discount = get().getDiscountAmount();
        const shipping = get().getShippingFee();
        return Math.max(0, subtotal - discount + shipping);
      },
    }),
    {
      name: 'agro-cart-storage',
    }
  )
);
