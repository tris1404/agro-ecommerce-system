// Product Category Types
export type MainCategoryType = 'crop_protection' | 'fertilizer' | 'seeds' | 'equipment';

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  icon: string;
  description: string;
  descriptionEn: string;
  type: MainCategoryType;
  subCategories?: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  parentId: string;
}

// Agricultural Technical Specs
export interface CropProtectionSpecs {
  activeIngredients: string; // Hoạt chất (vd: Hexaconazole 50g/l)
  concentration: string;     // Nồng độ / Hàm lượng
  formulation: string;       // Dạng thuốc (EC, SC, WG, WP)
  targetPests: string[];     // Đối tượng phòng trừ (Đạo ôn, lem lép hạt, rầy nâu, sâu cuốn lá)
  applicableCrops: string[]; // Cây trồng áp dụng (Lúa, Sầu riêng, Cam sành, Cà phê)
  dosage: string;            // Liều lượng khuyến cáo (vd: 40-50ml / bình 25 lít nước)
  phi: string;               // Thời gian cách ly (Pre-Harvest Interval) vd: 7 ngày
  toxicityLevel: 'GHS 4' | 'GHS 5' | 'Cẩn thận' | 'Nguy hiểm'; // Băng màu độc tính
}

export interface FertilizerSpecs {
  npkRatio?: string;         // Tỷ lệ N-P-K (vd: 20-20-15+TE)
  organicContent?: string;   // Hàm lượng hữu cơ (OM)
  micronutrients?: string;   // Vi lượng (TE: Bo, Kẽm, Đồng)
  fertilizerType: 'Gốc' | 'Lá' | 'Hữu cơ vi sinh' | 'Vô cơ';
  dosage: string;            // Hướng dẫn bón
  applicableCrops: string[];
}

export interface SeedSpecs {
  purity: string;            // Độ sạch (vd: >= 99%)
  germinationRate: string;   // Tỷ lệ nảy mầm (vd: >= 85%)
  moisture: string;          // Độ ẩm (vd: <= 11%)
  growthDuration: string;    // Thời gian sinh trưởng (vd: 95-100 ngày)
  season: string;            // Mùa vụ thích hợp
  yield: string;             // Năng suất ước tính
}

export interface EquipmentSpecs {
  capacity: string;          // Dung tích bình (vd: 20 Lít)
  powerType: 'Ắc quy điện' | 'Động cơ xăng 2 thì' | 'Động cơ xăng 4 thì' | 'Bình phun tay';
  pressure: string;          // Áp lực phun (vd: 0.15 - 0.4 Mpa)
  batterySpec?: string;      // Thông số ắc quy (vd: 12V 12Ah)
  weight: string;            // Khối lượng
  warrantyMonths: number;    // Thời gian bảo hành
}

export interface ProductVariant {
  id: string;
  name: string;              // Chai 100ml, Can 5 Lít, Bao 25kg, Gói 100g
  price: number;
  originalPrice?: number;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  slug: string;
  sku: string;
  categoryId: string;
  categoryType: MainCategoryType;
  categoryName: string;
  brand: string;             // Bayer, Syngenta, Lộc Trời, Bình Điền, Phú Mỹ, Oshima
  origin: string;            // Việt Nam, Thụy Sỹ, Nhật Bản, Đức
  rating: number;
  reviewCount: number;
  soldCount: number;
  thumbnail: string;
  images: string[];
  shortDescription: string;
  description: string;
  price: number;             // Giá đại diện thấp nhất
  originalPrice?: number;
  discountPercent?: number;
  stock: number;
  unit: string;              // Chai, Gói, Can, Bao, Máy, Bộ
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  variants: ProductVariant[];
  // Dynamic technical specifications
  cropProtectionSpecs?: CropProtectionSpecs;
  fertilizerSpecs?: FertilizerSpecs;
  seedSpecs?: SeedSpecs;
  equipmentSpecs?: EquipmentSpecs;
  instructions?: string;     // Hướng dẫn an toàn & sử dụng
}

// Cart types
export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  variantName: string;
  thumbnail: string;
  price: number;
  unit: string;
  quantity: number;
  stock: number;
  categoryType: MainCategoryType;
}

// Order & Payment Types
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';

export interface OrderItem {
  id: string;
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  thumbnail: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  provinceId: string;
  provinceName: string;
  districtId: string;
  districtName: string;
  wardId: string;
  wardName: string;
  detailAddress: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  orderCode: string;
  userId: string;
  createdAt: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'COD' | 'VNPAY';
  paymentStatus: 'UNPAID' | 'PAID' | 'REFUNDED';
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  status: OrderStatus;
  note?: string;
}

// User Profile Types
export interface UserProfile {
  id: number | string;
  username: string;
  email: string;
  fullName?: string;
  phone?: string;
  avatarUrl?: string;
  roles: string[];
}
