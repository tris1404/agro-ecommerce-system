import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, OrderStatus } from '../../../types';

interface OrderStore {
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'orderCode' | 'createdAt'>) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  getOrderByCode: (orderCode: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getUserOrders: (userId: string) => Order[];
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderCode: 'AGRO-2026-9812',
    userId: 'user-demo',
    createdAt: '2026-09-26T14:30:00Z',
    items: [
      {
        id: 'item-1',
        productId: 'prod-anvil-5sc',
        variantId: 'v-anv-500',
        productName: 'Thuốc trừ nấm bệnh Anvil 5SC Syngenta',
        variantName: 'Chai 500ml',
        thumbnail: 'https://images.unsplash.com/photo-1592417817098-8f3d6910a30b?auto=format&fit=crop&w=600&q=80',
        price: 215000,
        quantity: 3,
        totalPrice: 645000,
      }
    ],
    shippingAddress: {
      fullName: 'Nguyễn Văn Năm',
      phone: '0918123456',
      provinceId: 'tien-giang',
      provinceName: 'Tiền Giang (ĐBSCL)',
      districtId: 'cai-be',
      districtName: 'Huyện Cái Bè',
      wardId: 'dong-hoa-hiep',
      wardName: 'Xã Đông Hòa Hiệp',
      detailAddress: 'Ấp An Lợi, gần cầu Kênh 2',
    },
    paymentMethod: 'COD',
    paymentStatus: 'UNPAID',
    subtotal: 645000,
    shippingFee: 30000,
    discountAmount: 50000,
    totalAmount: 625000,
    status: 'SHIPPING',
    note: 'Giao trong giờ hành chính, gọi trước khi đến',
  },
  {
    id: 'ord-1002',
    orderCode: 'AGRO-2026-9815',
    userId: 'user-demo',
    createdAt: '2026-09-24T09:15:00Z',
    items: [
      {
        id: 'item-2',
        productId: 'prod-npk-dau-trau-202015',
        variantId: 'v-npk-25kg',
        productName: 'Phân bón NPK Đầu Trâu 20-20-15+TE Bình Điền',
        variantName: 'Bao 25kg',
        thumbnail: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80',
        price: 485000,
        quantity: 2,
        totalPrice: 970000,
      }
    ],
    shippingAddress: {
      fullName: 'Trần Thị Mai',
      phone: '0977889900',
      provinceId: 'dak-lak',
      provinceName: 'Đắk Lắk (Cà phê & Sầu riêng)',
      districtId: 'krong-pak',
      districtName: 'Huyện Krông Pắk',
      wardId: 'ea-yong',
      wardName: 'Xã Ea Yông',
      detailAddress: 'Thôn Tân Lập, đường liên xã',
    },
    paymentMethod: 'VNPAY',
    paymentStatus: 'PAID',
    subtotal: 970000,
    shippingFee: 30000,
    discountAmount: 0,
    totalAmount: 1000000,
    status: 'COMPLETED',
  }
];

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: INITIAL_ORDERS,

      createOrder: (orderData) => {
        const id = 'ord-' + Date.now();
        const orderCode = 'AGRO-' + Math.floor(100000 + Math.random() * 900000);
        const newOrder: Order = {
          ...orderData,
          id,
          orderCode,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        return newOrder;
      },

      getOrderById: (orderId) => {
        return get().orders.find((o) => o.id === orderId);
      },

      getOrderByCode: (orderCode) => {
        return get().orders.find((o) => o.orderCode === orderCode);
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status,
                  paymentStatus: status === 'COMPLETED' ? 'PAID' : o.paymentStatus,
                }
              : o
          ),
        }));
      },

      getUserOrders: (userId) => {
        // Return user specific orders or all demo orders if user-demo
        return get().orders;
      },
    }),
    {
      name: 'agro-orders-storage',
    }
  )
);
