import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp } from 'lucide-react';
import Button from '../../../components/common/Button';
import { useToastStore } from '../../../components/common/Toast';
import { useAuthStore } from '../../auth/store/authStore';

interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  crop: string;
  likes: number;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Nguyễn Văn Năm',
    location: 'Cái Bè, Tiền Giang',
    rating: 5,
    date: '15/09/2026',
    comment: 'Tôi xịt Anvil đợt lúa trổ lẹt xẹt, lá đòng đứng thẳng và xanh mướt đến tận ngày gặt. Thuốc chính hãng Syngenta tem đầy đủ, giao hàng rất nhanh về tận ấp.',
    crop: 'Lúa Hè Thu (5 hecta)',
    likes: 24,
  },
  {
    id: '2',
    author: 'Trần Thị Mai',
    location: 'Krông Pắk, Đắk Lắk',
    rating: 5,
    date: '08/09/2026',
    comment: 'Hàng chính hãng đóng gói cẩn thận, hạn sử dụng còn đến năm 2028. Kỹ sư tư vấn nhiệt tình cách pha để không bị cháy bông sầu riêng.',
    crop: 'Vườn Sầu Riêng Dona 3 năm',
    likes: 18,
  },
];

export const ProductReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(5);
  const [cropText, setCropText] = useState('');

  const { isAuthenticated, user } = useAuthStore();
  const showToast = useToastStore((state) => state.showToast);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newRev: Review = {
      id: Date.now().toString(),
      author: user?.username || 'Bà con nông dân',
      location: 'Việt Nam',
      rating,
      date: 'Hôm nay',
      comment: commentText.trim(),
      crop: cropText.trim() || 'Cây trồng nông nghiệp',
      likes: 0,
    };

    setReviews([newRev, ...reviews]);
    setCommentText('');
    setCropText('');
    showToast('Cảm ơn bạn đã gửi đánh giá trải nghiệm thực tế!', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Review list */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{rev.author}</span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                    <CheckCircle className="w-3 h-3" />
                    Đã mua hàng chính hãng
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {rev.location} • Canh tác: <strong className="text-slate-600 font-medium">{rev.crop}</strong>
                </div>
              </div>
              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-slate-200'}`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">
              {rev.comment}
            </p>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Đánh giá ngày: {rev.date}</span>
              <button className="flex items-center gap-1 hover:text-agro-700 cursor-pointer">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Hữu ích ({rev.likes})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Review Submission Form */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
        <h4 className="font-bold text-slate-900 text-sm mb-1">Chia Sẻ Trải Nghiệm Mùa Vụ</h4>
        <p className="text-xs text-slate-500 mb-4">
          Nhận xét của bạn sẽ giúp hàng nghìn hộ nông dân khác lựa chọn đúng loại vật tư và liều lượng.
        </p>

        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700">Mức độ hài lòng:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 cursor-pointer text-amber-500 hover:scale-110 transition-transform"
                >
                  <Star className={`w-5 h-5 ${star <= rating ? 'fill-current' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <input
              type="text"
              value={cropText}
              onChange={(e) => setCropText(e.target.value)}
              placeholder="Cây trồng áp dụng (ví dụ: Lúa OM18, Sầu riêng Ri6, Ớt chỉ thiên...)"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-agro-500"
            />
          </div>

          <div>
            <textarea
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Chia sẻ hiệu quả thực tế sau khi sử dụng thuốc/phân bón/máy..."
              className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-agro-500"
              required
            />
          </div>

          <Button type="submit" size="sm" variant="primary">
            Gửi Đánh Giá Của Bạn
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProductReviews;
