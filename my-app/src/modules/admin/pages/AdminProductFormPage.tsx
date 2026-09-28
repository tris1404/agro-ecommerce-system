import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, ShieldAlert, Sprout, Wheat, Wrench } from 'lucide-react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../../../api/mockData';
import { MainCategoryType, Product } from '../../../types';
import { useToastStore } from '../../../components/common/Toast';

export const AdminProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  const isEditing = Boolean(id);

  // Form states
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [categoryId, setCategoryId] = useState<MainCategoryType>('crop_protection');
  const [brand, setBrand] = useState('Syngenta');
  const [origin, setOrigin] = useState('Việt Nam');
  const [price, setPrice] = useState('100000');
  const [stock, setStock] = useState('100');
  const [unit, setUnit] = useState('Chai');
  const [thumbnail, setThumbnail] = useState('https://images.unsplash.com/photo-1592417817098-8f3d6910a30b?auto=format&fit=crop&w=600&q=80');
  const [shortDesc, setShortDesc] = useState('');
  const [desc, setDesc] = useState('');

  // Dynamic Agricultural Technical Specs
  // 1. Crop Protection
  const [activeIngredients, setActiveIngredients] = useState('Hexaconazole 50g/L');
  const [formulation, setFormulation] = useState('SC (Huyền phù đậm đặc)');
  const [targetPests, setTargetPests] = useState('Đạo ôn, Khô vằn, Lem lép hạt');
  const [dosage, setDosage] = useState('40-50ml cho bình 25 lít nước');
  const [phi, setPhi] = useState('14 ngày');

  // 2. Fertilizer
  const [npkRatio, setNpkRatio] = useState('20-20-15+TE');
  const [organicContent, setOrganicContent] = useState('');

  // 3. Seeds
  const [germinationRate, setGerminationRate] = useState('≥ 85%');
  const [growthDuration, setGrowthDuration] = useState('100 ngày');

  // 4. Equipment
  const [capacity, setCapacity] = useState('20 Lít');
  const [powerType, setPowerType] = useState<'Ắc quy điện' | 'Động cơ xăng 2 thì' | 'Động cơ xăng 4 thì' | 'Bình phun tay'>('Ắc quy điện');

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      const found = MOCK_PRODUCTS.find((p) => p.id === id);
      if (found) {
        setName(found.name);
        setSku(found.sku);
        setCategoryId(found.categoryType);
        setBrand(found.brand);
        setOrigin(found.origin);
        setPrice(found.price.toString());
        setStock(found.stock.toString());
        setUnit(found.unit);
        setThumbnail(found.thumbnail);
        setShortDesc(found.shortDescription);
        setDesc(found.description);

        if (found.cropProtectionSpecs) {
          setActiveIngredients(found.cropProtectionSpecs.activeIngredients);
          setFormulation(found.cropProtectionSpecs.formulation);
          setTargetPests(found.cropProtectionSpecs.targetPests.join(', '));
          setDosage(found.cropProtectionSpecs.dosage);
          setPhi(found.cropProtectionSpecs.phi);
        }
        if (found.fertilizerSpecs) {
          setNpkRatio(found.fertilizerSpecs.npkRatio || '');
          setOrganicContent(found.fertilizerSpecs.organicContent || '');
        }
        if (found.seedSpecs) {
          setGerminationRate(found.seedSpecs.germinationRate);
          setGrowthDuration(found.seedSpecs.growthDuration);
        }
        if (found.equipmentSpecs) {
          setCapacity(found.equipmentSpecs.capacity);
          setPowerType(found.equipmentSpecs.powerType);
        }
      }
    }
  }, [id, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      showToast(isEditing ? 'Cập nhật sản phẩm thành công!' : 'Tạo sản phẩm mới thành công!', 'success');
      navigate('/admin/products');
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isEditing ? 'Chỉnh Sửa Thông Tin Sản Phẩm' : 'Thêm Mới Sản Phẩm Vật Tư'}
            </h1>
            <p className="text-xs text-slate-500">
              Cập nhật quy cách, giá bán và đặc tính nông học theo chuẩn GHS
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
          <h2 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
            1. Thông Tin Cơ Bản
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Tên sản phẩm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Thuốc trừ nấm bệnh Anvil 5SC"
              required
            />
            <Input
              label="Mã SKU sản phẩm"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="SYN-ANV-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Ngành Hàng *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value as any)}
                className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-agro-500"
              >
                <option value="crop_protection">Thuốc Bảo Vệ Thực Vật</option>
                <option value="fertilizer">Phân Bón Dinh Dưỡng</option>
                <option value="seeds">Hạt Giống & Lúa Giống</option>
                <option value="equipment">Thiết Bị Phun Xịt</option>
              </select>
            </div>

            <Input
              label="Thương hiệu / Hãng"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Syngenta, Bayer, Bình Điền..."
              required
            />

            <Input
              label="Xuất xứ"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Thụy Sỹ, Việt Nam, Nhật Bản..."
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Giá bán đại diện (₫)"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <Input
              label="Số lượng tồn kho"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
            <Input
              label="Đơn vị tính"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Chai, Gói, Can, Bao, Máy..."
              required
            />
          </div>

          <Input
            label="Ảnh đại diện (URL)"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="https://..."
            required
          />

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Mô tả tóm tắt ngắn (Hiển thị ngoài card)
            </label>
            <textarea
              rows={2}
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="Đặc trị đạo ôn, lem lép hạt..."
              className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-agro-500"
            />
          </div>
        </div>

        {/* Dynamic Agricultural Specs Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
          <h2 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
            {categoryId === 'crop_protection' && <ShieldAlert className="w-4 h-4 text-emerald-600" />}
            {categoryId === 'fertilizer' && <Sprout className="w-4 h-4 text-green-600" />}
            {categoryId === 'seeds' && <Wheat className="w-4 h-4 text-amber-600" />}
            {categoryId === 'equipment' && <Wrench className="w-4 h-4 text-blue-600" />}
            <span>2. Thông Số Nông Học Đặc Thù</span>
          </h2>

          {/* 1. Crop Protection Dynamic Fields */}
          {categoryId === 'crop_protection' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Hoạt chất chính"
                value={activeIngredients}
                onChange={(e) => setActiveIngredients(e.target.value)}
                placeholder="Hexaconazole 50g/l..."
              />
              <Input
                label="Dạng thuốc (Formulation)"
                value={formulation}
                onChange={(e) => setFormulation(e.target.value)}
                placeholder="SC, EC, WG, WP..."
              />
              <Input
                label="Đối tượng phòng trừ (phân cách bằng dấu phẩy)"
                value={targetPests}
                onChange={(e) => setTargetPests(e.target.value)}
                placeholder="Đạo ôn, Khô vằn, Lem lép hạt..."
              />
              <Input
                label="Liều lượng khuyến cáo"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="40-50ml / bình 25 lít nước..."
              />
              <Input
                label="Thời gian cách ly (PHI)"
                value={phi}
                onChange={(e) => setPhi(e.target.value)}
                placeholder="7 ngày, 14 ngày..."
              />
            </div>
          )}

          {/* 2. Fertilizer Dynamic Fields */}
          {categoryId === 'fertilizer' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Tỷ lệ N-P-K"
                value={npkRatio}
                onChange={(e) => setNpkRatio(e.target.value)}
                placeholder="20-20-15+TE..."
              />
              <Input
                label="Hàm lượng hữu cơ (OM)"
                value={organicContent}
                onChange={(e) => setOrganicContent(e.target.value)}
                placeholder="70% Axit Humic..."
              />
            </div>
          )}

          {/* 3. Seeds Dynamic Fields */}
          {categoryId === 'seeds' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Tỷ lệ nảy mầm"
                value={germinationRate}
                onChange={(e) => setGerminationRate(e.target.value)}
                placeholder="≥ 85%..."
              />
              <Input
                label="Thời gian sinh trưởng"
                value={growthDuration}
                onChange={(e) => setGrowthDuration(e.target.value)}
                placeholder="100 - 105 ngày..."
              />
            </div>
          )}

          {/* 4. Equipment Dynamic Fields */}
          {categoryId === 'equipment' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Dung tích bình chứa"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="20 Lít, 25 Lít..."
              />
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Nguồn động lực
                </label>
                <select
                  value={powerType}
                  onChange={(e) => setPowerType(e.target.value as any)}
                  className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-300 bg-white font-medium"
                >
                  <option value="Ắc quy điện">Ắc quy điện 12V</option>
                  <option value="Động cơ xăng 2 thì">Động cơ xăng 2 thì</option>
                  <option value="Động cơ xăng 4 thì">Động cơ xăng 4 thì</option>
                  <option value="Bình phun tay">Bình phun gạt tay</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3 pt-2">
          <Link
            to="/admin/products"
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
          >
            Hủy Bỏ
          </Link>
          <Button type="submit" isLoading={isSubmitting} variant="primary" size="md">
            <Save className="w-4 h-4 mr-1.5" />
            <span>{isEditing ? 'Lưu Thay Đổi' : 'Thêm Sản Phẩm'}</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductFormPage;
