import React, { useState } from 'react';
import { Eye, Printer, Filter, CheckCircle2, Clock, Truck, Package, XCircle } from 'lucide-react';
import { useOrderStore } from '../../checkout/store/orderStore';
import { OrderStatus } from '../../../types';
import { useToastStore } from '../../../components/common/Toast';

export const AdminOrderListPage: React.FC = () => {
  const { orders, updateOrderStatus } = useOrderStore();
  const [statusFilter, setStatusFilter] = useState<'ALL' | OrderStatus>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const showToast = useToastStore((state) => state.showToast);

  const formatCurrency = (amt: number) => new Intl.NumberFormat('vi-VN').format(amt) + '₫';

  const filteredOrders = orders.filter((o) => {
    const matchStatus = statusFilter === 'ALL' || o.status === statusFilter;
    const matchSearch = o.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.shippingAddress.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.shippingAddress.phone.includes(searchTerm);
    return matchStatus && matchSearch;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    showToast(`Đã cập nhật trạng thái đơn sang "${newStatus}"`, 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Quản Lý Đơn Hàng Nông Dân
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Theo dõi tiến độ điều phối vật tư, xuất kho và bàn giao vận chuyển
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm mã đơn AGRO..., tên người nhận, SĐT..."
          className="w-full sm:w-80 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agro-500 bg-slate-50"
        />

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="text-xs py-2 px-3 rounded-xl border border-slate-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-agro-500 cursor-pointer"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="PENDING">Chờ xác nhận</option>
            <option value="CONFIRMED">Đã xác nhận</option>
            <option value="PROCESSING">Đang chuẩn bị</option>
            <option value="SHIPPING">Đang vận chuyển</option>
            <option value="COMPLETED">Hoàn thành</option>
            <option value="CANCELLED">Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Mã Đơn</th>
                <th className="p-4">Khách Hàng / Hộ Nông Dân</th>
                <th className="p-4">Địa Chỉ Giao</th>
                <th className="p-4">Thanh Toán</th>
                <th className="p-4">Tổng Tiền</th>
                <th className="p-4">Trạng Thái Đơn</th>
                <th className="p-4 text-right">In / Xem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4">
                    <span className="font-mono font-bold text-agro-900 block">
                      {order.orderCode}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </td>

                  <td className="p-4">
                    <p className="font-bold text-slate-900">{order.shippingAddress.fullName}</p>
                    <p className="text-slate-500 text-[11px]">{order.shippingAddress.phone}</p>
                  </td>

                  <td className="p-4 max-w-xs text-slate-600 truncate">
                    {order.shippingAddress.wardName}, {order.shippingAddress.districtName}, {order.shippingAddress.provinceName}
                  </td>

                  <td className="p-4">
                    <span className="font-semibold text-slate-800 block">
                      {order.paymentMethod === 'VNPAY' ? 'VNPAY' : 'COD (Tiền mặt)'}
                    </span>
                    <span className={`text-[10px] font-bold ${order.paymentStatus === 'PAID' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {order.paymentStatus === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </span>
                  </td>

                  <td className="p-4 font-black text-agro-800 text-sm">
                    {formatCurrency(order.totalAmount)}
                  </td>

                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className={`text-[11px] font-bold py-1 px-2.5 rounded-lg border focus:outline-none cursor-pointer ${
                        order.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                        order.status === 'SHIPPING' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                        order.status === 'CANCELLED' ? 'bg-red-50 text-red-800 border-red-300' :
                        'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      <option value="PENDING">Chờ xác nhận</option>
                      <option value="CONFIRMED">Đã xác nhận</option>
                      <option value="PROCESSING">Đang chuẩn bị</option>
                      <option value="SHIPPING">Đang vận chuyển</option>
                      <option value="COMPLETED">Hoàn thành</option>
                      <option value="CANCELLED">Hủy đơn</option>
                    </select>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => window.print()}
                      className="p-1.5 text-slate-500 hover:text-agro-700 hover:bg-slate-100 rounded-lg transition cursor-pointer inline-flex items-center gap-1"
                      title="In hóa đơn xuất kho"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderListPage;
