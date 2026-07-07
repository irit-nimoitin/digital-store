import { useParams, Link } from 'react-router-dom';
import { Message } from 'primereact/message';
import { Skeleton } from 'primereact/skeleton';
import AddToCartButton from '../components/product/AddToCartButton';
import ReviewCard from '../components/product/ReviewCard';
import StarRating from '../components/common/StarRating';
import { useProduct } from '../hooks/useProducts';

const CATEGORY_STYLES: Record<string, { label: string; className: string }> = {
  ebook:    { label: 'E-Book',   className: 'bg-blue-100 text-blue-700' },
  software: { label: 'Software', className: 'bg-purple-100 text-purple-700' },
  course:   { label: 'Course',   className: 'bg-green-100 text-green-700' },
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProduct(id ?? '');

  const avgRating =
    product && product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
      : null;

  const category = product ? (CATEGORY_STYLES[product.category] ?? { label: product.category, className: 'bg-gray-100 text-gray-700' }) : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium mb-6 transition-colors"
      >
        <i className="pi pi-arrow-left" />
        Back to Products
      </Link>

      {isError && (
        <Message
          severity="error"
          text="Product not found or failed to load."
          className="w-full mb-6"
        />
      )}

      {isLoading && (
        <div className="flex flex-col lg:flex-row gap-8">
          <Skeleton width="100%" height="400px" className="rounded-2xl lg:w-1/2" />
          <div className="flex flex-col gap-4 flex-1">
            <Skeleton width="30%" height="28px" />
            <Skeleton width="80%" height="36px" />
            <Skeleton width="40%" height="24px" />
            <Skeleton width="100%" height="80px" />
            <Skeleton width="50%" height="48px" />
          </div>
        </div>
      )}

      {product && (
        <>
          <div className="flex flex-col lg:flex-row gap-8 mb-10">
            <div className="lg:w-1/2">
              <img
                src={product.thumbnailUrl}
                alt={product.name}
                className="w-full rounded-2xl object-cover shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-4 flex-1">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full w-fit ${category?.className}`}>
                {category?.label}
              </span>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {avgRating !== null && (
                <div className="flex items-center gap-2">
                  <StarRating rating={Math.round(avgRating)} />
                  <span className="text-sm text-gray-500">
                    {avgRating.toFixed(1)} ({product.reviews.length} review{product.reviews.length !== 1 ? 's' : ''})
                  </span>
                </div>
              )}

              <p className="text-gray-500 text-base">{product.shortDescription}</p>

              <p className="text-3xl font-bold text-indigo-600">
                ${product.price.toFixed(2)}
              </p>

              <AddToCartButton product={product} />
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">About this product</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {product.longDescription}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Reviews ({product.reviews.length})
            </h2>
            {product.reviews.length === 0 ? (
              <p className="text-gray-400 italic">No reviews yet.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {product.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
