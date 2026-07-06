import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import type { Product } from '../../types';

interface Props {
  product: Product;
}

const CATEGORY_STYLES: Record<string, { label: string; className: string }> = {
  ebook: { label: 'E-Book', className: 'bg-blue-100 text-blue-700' },
  software: { label: 'Software', className: 'bg-purple-100 text-purple-700' },
  course: { label: 'Course', className: 'bg-green-100 text-green-700' },
};

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate();
  const category = CATEGORY_STYLES[product.category] ?? {
    label: product.category,
    className: 'bg-gray-100 text-gray-700',
  };

  return (
    <article
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200"
      onClick={() => navigate(`/products/${product.id}`)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/products/${product.id}`)}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.thumbnailUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full w-fit ${category.className}`}>
          {category.label}
        </span>

        <h2 className="text-gray-900 font-semibold text-base leading-snug line-clamp-2">
          {product.name}
        </h2>

        <p className="text-gray-500 text-sm line-clamp-2 flex-1">
          {product.shortDescription}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-indigo-600 font-bold text-lg">
            ${product.price.toFixed(2)}
          </span>
          <Button
            label="Details"
            icon="pi pi-arrow-right"
            iconPos="right"
            size="small"
            text
            className="text-indigo-600 hover:bg-indigo-50 p-button-sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${product.id}`);
            }}
          />
        </div>
      </div>
    </article>
  );
}
