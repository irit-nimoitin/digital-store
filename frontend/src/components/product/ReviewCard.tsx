import StarRating from '../common/StarRating';
import type { ProductReview } from '../../types';

interface Props {
  review: ProductReview;
}

export default function ReviewCard({ review }: Props) {
  const formattedDate = new Date(review.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm">
            {review.author.charAt(0).toUpperCase()}
          </div>
          <span className="font-semibold text-gray-800 text-sm">{review.author}</span>
        </div>
        <span className="text-xs text-gray-400">{formattedDate}</span>
      </div>

      <StarRating rating={review.rating} />

      <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
    </div>
  );
}
