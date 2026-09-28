import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, AlertTriangle, Check, Shield } from 'lucide-react';
import { MOCK_PRODUCTS } from '../../../api/mockData';
import { Product } from '../../../types';
import { useToastStore } from '../../../components/common/Toast';

export const AdminProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const showToast = useToastStore((state) => state.showToast);

  const formatCurrency = (amt: number) => new Intl.NumberFormat('vi-VN').format(amt) + '₫';

  const filtered = products.filter((p) => {
    const matchCat = categoryFilter === 'all' || p.categoryId === categoryFilter;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}" khỏi kho?`)) {
      setProducts(products.filter((p) => p.id !== id));
      showToast(`Đã xóa sản phẩm "${name}" thành công!`, 'success');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Quản Lý Sản Phẩm Vật Tư
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Quản lý kho hàng, thông số hoạt chất, quy cách đóng gói và giá bán
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-agro-700 hover:bg-agro-800 text-white rounded-xl text-xs font-bold shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Sản Phẩm Mới</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên, mã SKU, hãng..."
            className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agro-500 bg-slate-50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl border border-slate-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-agro-500"
          >
            <option value="all">Tất cả ngành hàng</option>
            <option value="crop_protection">Thuốc BVTV</option>
            <option value="fertilizer">Phân bón</option>
            <option value="seeds">Hạt giống</option>
            <option value="equipment">Thiết bị xịt</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Sản Phẩm</th>
                <th className="p-4">Mã SKU</th>
                <th className="p-4">Ngành Hàng</th>
                <th className="p-4">Thương Hiệu</th>
                <th className="p-4">Giá Bán</th>
                <th className="p-4">Tồn Kho</th>
                <th className="p-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((product) => {
                const isLowStock = product.stock < 100;

                return (
                  <tr key={product.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.thumbnail}
                          alt=""
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                        />
                        <div className="min-w-0 max-w-xs">
                          <p className="font-bold text-slate-900 truncate">{product.name}</p>
                          <p className="text-[11px] text-slate-400">
                            {product.variants.length} quy cách đóng gói
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-mono font-semibold text-slate-700">
                      {product.sku}
                    </td>

                    <td className="p-4 text-slate-600">
                      {product.categoryName}
                    </td>

                    <td className="p-4 font-semibold text-slate-800">
                      {product.brand}
                    </td>

                    <td className="p-4 font-bold text-agro-800">
                      {formatCurrency(product.price)}
                    </td>

                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 font-bold px-2.5 py-0.5 rounded-full text-[11px] ${
                        isLowStock
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-emerald-50 text-emerald-800'
                      }`}>
                        {isLowStock && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                        {product.stock} {product.unit}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="p-1.5 text-slate-500 hover:text-agro-700 hover:bg-slate-100 rounded-lg transition"
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProductListPage;
