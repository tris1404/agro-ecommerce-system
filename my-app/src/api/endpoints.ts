export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    VERIFY: '/auth/verify',
    RESEND: '/auth/resend',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  // User & Profile
  USER: {
    ME: '/users/me',
    UPDATE_PROFILE: '/api/account/profile',
    CHANGE_PASSWORD: '/api/account/change-password',
    ADDRESSES: '/api/account/addresses',
  },
  // Categories & Products
  CATEGORIES: {
    LIST: '/api/categories',
    DETAIL: (id: string | number) => `/api/categories/${id}`,
  },
  PRODUCTS: {
    LIST: '/api/products',
    FEATURED: '/api/products/featured',
    PROMOTIONS: '/api/products/promotions',
    DETAIL: (id: string | number) => `/api/products/${id}`,
    RELATED: (id: string | number) => `/api/products/${id}/related`,
    REVIEWS: (id: string | number) => `/api/products/${id}/reviews`,
  },
  // Cart & Coupon
  CART: {
    GET: '/api/cart',
    UPDATE: '/api/cart',
    APPLY_COUPON: '/api/coupons/apply',
  },
  // Orders & Payment
  ORDERS: {
    CREATE: '/api/orders',
    LIST: '/api/account/orders',
    DETAIL: (id: string | number) => `/api/account/orders/${id}`,
    CANCEL: (id: string | number) => `/api/account/orders/${id}/cancel`,
    VNPAY_CREATE_URL: '/api/payment/vnpay/create-url',
    VNPAY_CALLBACK: '/api/payment/vnpay/callback',
  },
  // Admin Endpoints
  ADMIN: {
    DASHBOARD_STATS: '/api/admin/dashboard/statistics',
    DASHBOARD_CHART: '/api/admin/dashboard/revenue-chart',
    PRODUCTS: '/api/admin/products',
    PRODUCT_DETAIL: (id: string | number) => `/api/admin/products/${id}`,
    UPLOAD_IMAGE: '/api/admin/upload/images',
    ORDERS: '/api/admin/orders',
    ORDER_STATUS: (id: string | number) => `/api/admin/orders/${id}/status`,
    CUSTOMERS: '/api/admin/users',
  }
};
