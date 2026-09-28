import React from 'react';
import { Product } from '../../../types';
import { ShieldAlert, Sprout, Wheat, Wrench } from 'lucide-react';

interface TechSpecsTableProps {
  product: Product;
}

export const TechSpecsTable: React.FC<TechSpecsTableProps> = ({ product }) => {
  const { cropProtectionSpecs, fertilizerSpecs, seedSpecs, equipmentSpecs, categoryType } = product;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          {categoryType === 'crop_protection' && <ShieldAlert className="w-4 h-4 text-emerald-600" />}
          {categoryType === 'fertilizer' && <Sprout className="w-4 h-4 text-green-600" />}
          {categoryType === 'seeds' && <Wheat className="w-4 h-4 text-amber-600" />}
          {categoryType === 'equipment' && <Wrench className="w-4 h-4 text-blue-600" />}
          <span>Bảng Thông Số Kỹ Thuật Nông Nghiệp</span>
        </h3>
        <span className="text-xs bg-slate-200/80 text-slate-700 px-2.5 py-0.5 rounded-full font-medium">
          Mã SKU: {product.sku}
        </span>
      </div>

      <div className="divide-y divide-slate-100 text-xs sm:text-sm">
        {/* Common specs */}
        <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
          <span className="text-slate-500 font-medium">Hãng sản xuất / Thương hiệu</span>
          <span className="col-span-2 text-slate-900 font-semibold">{product.brand}</span>
        </div>

        <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
          <span className="text-slate-500 font-medium">Xuất xứ</span>
          <span className="col-span-2 text-slate-900 font-semibold">{product.origin}</span>
        </div>

        {/* 1. Crop Protection Specs */}
        {cropProtectionSpecs && (
          <>
            <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
              <span className="text-slate-500 font-medium">Hoạt chất chính</span>
              <span className="col-span-2 text-emerald-800 font-bold">{cropProtectionSpecs.activeIngredients}</span>
            </div>

            <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
              <span className="text-slate-500 font-medium">Hàm lượng & Dạng thuốc</span>
              <span className="col-span-2 text-slate-900">{cropProtectionSpecs.concentration} - {cropProtectionSpecs.formulation}</span>
            </div>

            <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
              <span className="text-slate-500 font-medium">Đối tượng phòng trừ</span>
              <div className="col-span-2 flex flex-wrap gap-1.5">
                {cropProtectionSpecs.targetPests.map((pest, i) => (
                  <span key={i} className="bg-red-50 text-red-700 font-medium px-2 py-0.5 rounded border border-red-200 text-xs">
                    {pest}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
              <span className="text-slate-500 font-medium">Cây trồng áp dụng</span>
              <span className="col-span-2 text-slate-900">{cropProtectionSpecs.applicableCrops.join(', ')}</span>
            </div>

            <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
              <span className="text-slate-500 font-medium">Liều lượng khuyến cáo</span>
              <span className="col-span-2 text-slate-900 font-medium">{cropProtectionSpecs.dosage}</span>
            </div>

            <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
              <span className="text-slate-500 font-medium">Thời gian cách ly (PHI)</span>
              <span className="col-span-2 text-amber-700 font-semibold">{cropProtectionSpecs.phi} trước ngày thu hoạch</span>
            </div>

            <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
              <span className="text-slate-500 font-medium">Băng màu độc tính GHS</span>
              <span className="col-span-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-md border border-blue-300">
                  {cropProtectionSpecs.toxicityLevel} (Ít độc - an toàn cho thiên địch)
                </span>
              </span>
            </div>
          </>
        )}

        {/* 2. Fertilizer Specs */}
        {fertilizerSpecs && (
          <>
            {fertilizerSpecs.npkRatio && (
              <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
                <span className="text-slate-500 font-medium">Tỷ lệ N-P-K</span>
                <span className="col-span-2 text-emerald-800 font-bold">{fertilizerSpecs.npkRatio}</span>
              </div>
            )}

            {fertilizerSpecs.organicContent && (
              <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
                <span className="text-slate-500 font-medium">Hàm lượng hữu cơ</span>
                <span className="col-span-2 text-slate-900 font-semibold">{fertilizerSpecs.organicContent}</span>
              </div>
            )}

            {fertilizerSpecs.micronutrients && (
              <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
                <span className="text-slate-500 font-medium">Vi lượng (TE)</span>
                <span className="col-span-2 text-slate-900">{fertilizerSpecs.micronutrients}</span>
              </div>
            )}

            <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
              <span className="text-slate-500 font-medium">Phân loại phân bón</span>
              <span className="col-span-2 text-slate-900">Phân bón {fertilizerSpecs.fertilizerType}</span>
            </div>

            <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
              <span className="text-slate-500 font-medium">Hướng dẫn liều lượng bón</span>
              <span className="col-span-2 text-slate-900">{fertilizerSpecs.dosage}</span>
            </div>
          </>
        )}

        {/* 3. Seed Specs */}
        {seedSpecs && (
          <>
            <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
              <span className="text-slate-500 font-medium">Độ thuần & Độ sạch</span>
              <span className="col-span-2 text-slate-900 font-semibold">{seedSpecs.purity}</span>
            </div>

            <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
              <span className="text-slate-500 font-medium">Tỷ lệ nảy mầm</span>
              <span className="col-span-2 text-emerald-700 font-bold">{seedSpecs.germinationRate}</span>
            </div>

            <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
              <span className="text-slate-500 font-medium">Thời gian sinh trưởng</span>
              <span className="col-span-2 text-slate-900">{seedSpecs.growthDuration}</span>
            </div>

            <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
              <span className="text-slate-500 font-medium">Mùa vụ thích hợp</span>
              <span className="col-span-2 text-slate-900">{seedSpecs.season}</span>
            </div>

            <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
              <span className="text-slate-500 font-medium">Năng suất ước tính</span>
              <span className="col-span-2 text-harvest-700 font-bold">{seedSpecs.yield}</span>
            </div>
          </>
        )}

        {/* 4. Equipment Specs */}
        {equipmentSpecs && (
          <>
            <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
              <span className="text-slate-500 font-medium">Dung tích bình chứa</span>
              <span className="col-span-2 text-slate-900 font-bold">{equipmentSpecs.capacity}</span>
            </div>

            <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
              <span className="text-slate-500 font-medium">Nguồn năng lượng / Động cơ</span>
              <span className="col-span-2 text-slate-900 font-semibold">{equipmentSpecs.powerType}</span>
            </div>

            <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
              <span className="text-slate-500 font-medium">Áp lực phun</span>
              <span className="col-span-2 text-slate-900">{equipmentSpecs.pressure}</span>
            </div>

            {equipmentSpecs.batterySpec && (
              <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
                <span className="text-slate-500 font-medium">Thông số ắc quy / Pin</span>
                <span className="col-span-2 text-slate-900">{equipmentSpecs.batterySpec}</span>
              </div>
            )}

            <div className="grid grid-cols-3 p-4 hover:bg-slate-50/50">
              <span className="text-slate-500 font-medium">Chính sách bảo hành</span>
              <span className="col-span-2 text-blue-700 font-bold">{equipmentSpecs.warrantyMonths} tháng chính hãng</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TechSpecsTable;
