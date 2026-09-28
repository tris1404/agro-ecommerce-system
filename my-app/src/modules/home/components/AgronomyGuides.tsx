import React from 'react';
import { BookOpen, Calendar, ArrowRight, PhoneCall } from 'lucide-react';

const GUIDES = [
  {
    id: 1,
    title: 'Phòng trừ triệt để bệnh Đạo ôn lá & Lem lép hạt trên lúa vụ Hè Thu',
    summary: 'Hướng dẫn phối trộn thuốc Anvil 5SC và Filia 525SE giai đoạn lúa trổ lẹt xẹt giúp sạch bệnh, sáng hạt và không lo đổ ngã.',
    category: 'Cây Lúa',
    date: '25/09/2026',
    readTime: '5 phút đọc',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Quy trình bón phân NPK cho vườn Sầu Riêng giai đoạn nuôi trái non',
    summary: 'Cách cân đối tỷ lệ Đạm - Lân - Kali kết hợp vi lượng Bo, Kẽm để chống hiện tượng méo trái, rụng trái non và cháy múi.',
    category: 'Cây Ăn Trái',
    date: '20/09/2026',
    readTime: '7 phút đọc',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'Bảo dưỡng và vệ sinh bình xịt điện ắc quy sau mỗi đợt phun thuốc',
    summary: 'Bí quyết giúp bình xịt Kasei và máy Oshima hoạt động bền bỉ trên 5 năm không bị nghẹt béc, không oxy hóa van áp lực.',
    category: 'Cơ Giới Hóa',
    date: '18/09/2026',
    readTime: '4 phút đọc',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
  }
];

export const AgronomyGuides: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-agro-700 font-bold text-xs uppercase tracking-wider block mb-1">
            Góc Chuyên Gia Nông Nghiệp
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Kỹ Thuật Canh Tác & Hướng Dẫn Sử Dụng
          </h2>
        </div>

        <div className="flex items-center gap-2 text-sm text-harvest-700 font-semibold bg-harvest-50 border border-harvest-200 px-4 py-2 rounded-xl">
          <PhoneCall className="w-4 h-4 text-harvest-600" />
          <span>Bác sĩ cây trồng trực tuyến: 1800 6868</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {GUIDES.map((guide) => (
          <article
            key={guide.id}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden bg-slate-100">
              <img
                src={guide.image}
                alt={guide.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-agro-800 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs">
                {guide.category}
              </span>
            </div>

            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-2.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {guide.date}
                  </span>
                  <span>•</span>
                  <span>{guide.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-agro-700 transition line-clamp-2 mb-2 leading-snug">
                  {guide.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {guide.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-agro-700 group-hover:text-agro-900 transition gap-1">
                <span>Đọc hướng dẫn chi tiết</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AgronomyGuides;
