import React, { useState } from 'react';
import { Search, Shield, User, Mail, Phone, MapPin } from 'lucide-react';

interface CustomerItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  role: 'ROLE_ADMIN' | 'ROLE_USER';
  orderCount: number;
  totalSpent: number;
  joinedDate: string;
}

const MOCK_CUSTOMERS: CustomerItem[] = [
  {
    id: 'c-1',
    name: 'Nguyễn Văn Năm',
    email: 'nongdan@gmail.com',
    phone: '0918123456',
    location: 'Cái Bè, Tiền Giang',
    role: 'ROLE_USER',
    orderCount: 14,
    totalSpent: 18450000,
    joinedDate: '12/01/2026',
  },
  {
    id: 'c-2',
    name: 'Trần Thị Mai',
    email: 'maitran@gmail.com',
    phone: '0977889900',
    location: 'Krông Pắk, Đắk Lắk',
    role: 'ROLE_USER',
    orderCount: 8,
    totalSpent: 12200000,
    joinedDate: '05/03/2026',
  },
  {
    id: 'c-3',
    name: 'Đại lý Vật tư Nông Nghiệp Phát Đạt',
    email: 'vattuphatdat@gmail.com',
    phone: '0903112233',
    location: 'Thoại Sơn, An Giang',
    role: 'ROLE_USER',
    orderCount: 26,
    totalSpent: 85000000,
    joinedDate: '10/11/2025',
  },
  {
    id: 'c-4',
    name: 'Quản trị viên Hệ Thống',
    email: 'admin@agrocare.vn',
    phone: '18006868',
    location: 'TP. Hồ Chí Minh',
    role: 'ROLE_ADMIN',
    orderCount: 0,
    totalSpent: 0,
    joinedDate: '01/01/2025',
  }
];

export const AdminCustomerListPage: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerItem[]>(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amt: number) => new Intl.NumberFormat('vi-VN').format(amt) + '₫';

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Danh Sách Hộ Nông Dân & Khách Hàng
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Quản lý tài khoản khách hàng, thông tin liên lạc và phân quyền người dùng
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm theo tên nông dân, email, số điện thoại, tỉnh thành..."
          className="w-full sm:w-96 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agro-500 bg-slate-50"
        />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Khách Hàng / Hộ Nông Dân</th>
                <th className="p-4">Địa Bàn Canh Tác</th>
                <th className="p-4">Vai Trò</th>
                <th className="p-4">Số Đơn Đã Mua</th>
                <th className="p-4">Tổng Doanh Số</th>
                <th className="p-4">Ngày Tham Gia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-agro-100 text-agro-800 flex items-center justify-center font-bold text-xs">
                        {customer.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{customer.name}</p>
                        <p className="text-slate-400 text-[11px]">{customer.email} • {customer.phone}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-slate-600 font-medium">
                    {customer.location}
                  </td>

                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 font-bold px-2.5 py-0.5 rounded-full text-[11px] ${
                      customer.role === 'ROLE_ADMIN'
                        ? 'bg-purple-100 text-purple-800 border border-purple-300'
                        : 'bg-emerald-50 text-emerald-800'
                    }`}>
                      {customer.role === 'ROLE_ADMIN' && <Shield className="w-3 h-3" />}
                      {customer.role === 'ROLE_ADMIN' ? 'Quản trị viên' : 'Khách hàng'}
                    </span>
                  </td>

                  <td className="p-4 font-semibold text-slate-900">
                    {customer.orderCount} đơn hàng
                  </td>

                  <td className="p-4 font-black text-agro-800 text-sm">
                    {formatCurrency(customer.totalSpent)}
                  </td>

                  <td className="p-4 text-slate-500">
                    {customer.joinedDate}
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

export default AdminCustomerListPage;
