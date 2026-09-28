import axiosClient from '../../../api/axiosClient';
import { API_ENDPOINTS } from '../../../api/endpoints';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../../../api/mockData';
import { Category, Product } from '../../../types';

export interface ProductFilterParams {
  category?: string;
  subCategory?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  targetPest?: string;
  keyword?: string;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'best_seller';
  page?: number;
  limit?: number;
}

export interface PaginatedProducts {
  items: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export const productService = {
  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    try {
      const res = await axiosClient.get<Category[]>(API_ENDPOINTS.CATEGORIES.LIST);
      return res.data;
    } catch {
      return MOCK_CATEGORIES;
    }
  },

  // Get products with filters, search, and pagination
  getProducts: async (params: ProductFilterParams = {}): Promise<PaginatedProducts> => {
    try {
      const res = await axiosClient.get<PaginatedProducts>(API_ENDPOINTS.PRODUCTS.LIST, { params });
      return res.data;
    } catch {
      // Smart Fallback Filter
      let filtered = [...MOCK_PRODUCTS];

      if (params.category && params.category !== 'all') {
        filtered = filtered.filter((p) => p.categoryId === params.category || p.categoryType === params.category);
      }

      if (params.keyword) {
        const q = params.keyword.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q) ||
            p.cropProtectionSpecs?.activeIngredients?.toLowerCase().includes(q) ||
            p.cropProtectionSpecs?.targetPests?.some(pest => pest.toLowerCase().includes(q))
        );
      }

      if (params.brand && params.brand !== 'all') {
        filtered = filtered.filter((p) => p.brand.toLowerCase() === params.brand?.toLowerCase());
      }

      if (params.targetPest && params.targetPest !== 'all') {
        filtered = filtered.filter((p) =>
          p.cropProtectionSpecs?.targetPests?.some(
            (pest) => pest.toLowerCase().includes(params.targetPest!.toLowerCase())
          )
        );
      }

      if (params.minPrice !== undefined) {
        filtered = filtered.filter((p) => p.price >= params.minPrice!);
      }

      if (params.maxPrice !== undefined) {
        filtered = filtered.filter((p) => p.price <= params.maxPrice!);
      }

      // Sort
      if (params.sort === 'price_asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (params.sort === 'price_desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (params.sort === 'best_seller') {
        filtered.sort((a, b) => b.soldCount - a.soldCount);
      } else {
        // newest default
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      }

      const page = params.page || 1;
      const limit = params.limit || 8;
      const startIndex = (page - 1) * limit;
      const total = filtered.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const items = filtered.slice(startIndex, startIndex + limit);

      return {
        items,
        total,
        page,
        totalPages,
      };
    }
  },

  // Get featured products
  getFeaturedProducts: async (): Promise<Product[]> => {
    try {
      const res = await axiosClient.get<Product[]>(API_ENDPOINTS.PRODUCTS.FEATURED);
      return res.data;
    } catch {
      return MOCK_PRODUCTS.filter((p) => p.isFeatured || p.isBestSeller).slice(0, 4);
    }
  },

  // Get single product by id or slug
  getProductById: async (idOrSlug: string): Promise<Product | null> => {
    try {
      const res = await axiosClient.get<Product>(API_ENDPOINTS.PRODUCTS.DETAIL(idOrSlug));
      return res.data;
    } catch {
      const found = MOCK_PRODUCTS.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
      return found || null;
    }
  },

  // Get related products
  getRelatedProducts: async (categoryId: string, currentProductId: string): Promise<Product[]> => {
    try {
      const res = await axiosClient.get<Product[]>(API_ENDPOINTS.PRODUCTS.RELATED(currentProductId));
      return res.data;
    } catch {
      return MOCK_PRODUCTS.filter((p) => p.categoryId === categoryId && p.id !== currentProductId).slice(0, 4);
    }
  },
};
